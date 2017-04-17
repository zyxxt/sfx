/**
 * Created by ued on 2016/10/31.
 * 统一封装ajax请求
 */

import Vue from 'vue';
import VueResource from 'vue-resource';
import logger from './logger';

let inited = false;
const CSRF_KEY = 'CSRFPreventionToken';
const NO_AUTHORIZATION = 401;

/**
 * 初始化 vue-resource 一些统一的配置
 */
export function init () {
    if (inited) {
        return;
    }
    inited = true;

    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true;

    // 所有请求自动加上/bbc前缀，业务代码里请求有两种方式：
    // 1、this.$http.get('/test/url') 这种方式相对于整个对路径，不会自动加上root前缀
    // 2、this.$http.get('test/url') 会自动加上root前缀，即 /bbc/test/url
    //Vue.http.options.root = '/bbc';
    Vue.http.options.root = '';

    // 统一加上csrf头部信息
    Vue.http.headers.common[CSRF_KEY] = 'test_token';

    // hook，数据自动转成json后再交给业务处理
    Vue.http.interceptors.push((request, next) => {

        // 把所有请求都以 / 结尾
        request.url = fixURL(request.url);

        // 后台返回的数据格式统一解析成json
        next((response) => {

            // 如果被waf拦住了，跳转到登录页面吧
            if (checkReLogin(response)) {
                reLogin();
                return;
            }

            // 解决后台没有返回content-type时，responseType识别成application/xml的问题，这里添加规避处理
            if (!response.bodyText && typeof Blob !== 'undefined' && response.body instanceof Blob) {

                response.bodyText = new Promise((resolve) => {
                    let reader = new FileReader();

                    reader.readAsText(response.body);
                    reader.onload = () => {
                        resolve(reader.result);
                    };

                });
            }

            return jsonResponse(response);
        });
    });

}

/**
 * 后台数据格式统一解析成json
 * @param {Object} response 响应内容
 * @returns {Promise}       返回Promise
 */
function jsonResponse (response) {
    return response.json().then((jsonData) => {

        // 格式化成json成功
        logger.log('[ajax] [response==>json] success: %o. %o', response, jsonData);

        // 提供多jsonData，方便业务直接调用
        response.jsonData = jsonData;

        // 前后台协商好，要有success才认为是真正的成功
        // 要不认为reject
        if (jsonData.success === false || jsonData.success === 0 || jsonData.success === 'false') {

            logger.warn('[ajax] [response==>json] jsonData.success: false', response, jsonData);

            // 在vue-resource内部状态中此标志作为resolve, reject标志
            // 可以看 function Http (options) {} 内部实现
            response.ok = false;
        }
        return response;

    }, (error) => {

        // 格式化json失败
        logger.warn('[ajax] [response==>json] error: %o. %o', response, error);

        // 提供jsonData，接口保持跟成功的一致
        response.jsonData = {
            success: false,
            msg: response.body || response.data
        };
        return response;
    });
}

/**
 * BBC 统一对发的请求URL作处理：
 * 除了static静态文件、login请求外，其它请求都自动要以 / 结尾
 * @param {String} url 待请求的 url
 * @returns {string}   转化为实际的 url
 */
function fixURL (url = '') {
    let ignoreList = [
        /^\/static/,
        /^login$/,
        /^\/cluster/
    ];

    for (let i = 0; i < ignoreList.length; i++) {
        let ignoreReg = ignoreList[i];
        if (ignoreReg.test(url)) {
            return url;
        }
    }

    if (url.slice(-1) !== '/' && url.indexOf('?') === -1) {
        url = url + '/';
    }

    return url;
}

/**
 * 检测下是否无权限访问
 * @param {Object} res     response 响应
 * @returns {boolean}      是否401
 */
function checkReLogin (res) {
    if (res && !res.ok && res.status === NO_AUTHORIZATION) {
        return true;
    }
    return false;
}

/**
 * 跳转到登录页面
 */
function reLogin () {
    if (process.env.NODE_ENV === 'development') {
        window.location.href = './login.html';
    } else {
        window.location.href = './login';
    }
}
