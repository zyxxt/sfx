/**
 * Created by ued on 2017/2/15.
 */

import uuid from 'src/util/uuid';
import logger from 'src/util/logger';

function createForm (url, options = {}) {
    let form = document.createElement('form');
    form.action = url;
    form.method = options.method || 'post';
    form.style.display = 'none';
    form.enctype = 'application/x-www-form-urlencoded';

    let input = document.createElement('input');
    let field;
    input.type = 'hidden';

    //设置表单参数
    let params = options.params;
    if (typeof params === 'string') {
        field = input.cloneNode(false);
        field.name = 'params';
        field.value = encodeURIComponent(params);
        form.appendChild(field);
    } else {
        for (let name in params) {
            if (params.hasOwnProperty(name)) {
                field = input.cloneNode(false);
                field.name = name;
                field.value = encodeURIComponent(typeof params[name] === 'object' ? JSON.stringify(params[name]) : params[name]);
                form.appendChild(field);
            }
        }
    }

    return form;
}

function createIFrame (url, options) {
    let iframe = document.createElement('iframe');
    let iframeName = 'post_iframe_' + uuid('iframe');
    iframe.id = iframeName;

    // 创建一个隐藏的iframe
    iframe.setAttribute('name', iframeName);
    iframe.setAttribute('frameBorder', 0);
    iframe.setAttribute('width', 0);
    iframe.setAttribute('height', 0);
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    iframe.style.width = '0px';
    iframe.style.height = '0px';

    let isCrossDomain = false;

    // 先把iframe添加进来，再绑定onload事件，这样可以避免第一次插入时触发onload
    document.body.appendChild(iframe);
    iframe.onload = function () {
        let res;
        let page = this;
        if (options.cb) {
            if (isCrossDomain) {
                res = iframe.contentWindow.name;
                if (/^test_iframe_\d+$/.test(res)) {

                    // 说明后台没有正常返回数据，没有把name更改成功
                    // 这个情况应该是https证书问题导致
                    res = '';
                }
            } else {
                let doc;
                try {
                    doc = page.contentDocument;
                    res = doc.body.innerText || doc.body.textContent;
                } catch (e) {

                    // 跨域处理，后台必须要自己把结果放到window.name里面
                    // UI只需要改下href即可
                    isCrossDomain = true;
                    iframe.contentWindow.location.href = 'blank.html';
                    return;
                }
            }

            try {
                res = JSON.parse(res);
            } catch (e) {
                logger.error('[form] [request] parse json error');
            }
            if (typeof res === 'string') {
                options.cb({ success: false, message: res });
            } else {
                res = res || {};
                res.success = !!res.success;
                options.cb(res);
            }
        }

        if (!options.newTab) {
            document.body.removeChild(iframe);
        }
    };
    return iframe;
}

function request (url, options = {}) {
    return new Promise(function (resolve, reject) {
        let callback = options.cb;
        options.cb = function (jsonData) {
            if (jsonData && jsonData.success) {
                resolve(jsonData);
            } else {
                reject(jsonData);
            }
            if (typeof callback === 'function') {
                callback(jsonData);
            }
        };
        let form = createForm(url, options);
        if (options.newTab === true) {
            form.target = '_blank';
        } else {
            let iframe = createIFrame(url, options);
            form.target = iframe.id;
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    });
}

function downloadFile (url, options) {
    request(url, options);
}

export {
    request,
    downloadFile
};
