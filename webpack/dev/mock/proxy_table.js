/**
 * Created by ued on 2017/4/22.
 */

let hook = require('./hook');
let console = require('log4js')('proxy_table');
const SFX_CONFIG = require('../lib/config');

function onProxyReq (proxyReq, req, res, options) {
    console.log(`[Proxy Request] ${proxyReq.method}: ${proxyReq.path}`);
    console.debug(`[Proxy Request] headers: ${JSON.stringify(proxyReq._headers, true, 4)}`);

    hook(proxyReq, req, res, options);
}

function onProxyRes (proxyRes, req, res, options) {
    console.log(`[Proxy Response] ${proxyRes.method}: ${proxyRes.path}`);
    console.debug(`[Proxy Response] headers: ${JSON.stringify(proxyRes.headers, true, 4)}`);
}

module.exports = () => {
    let table = {

    };

    for (let cgiPath in SFX_CONFIG.dev.proxyTable) {
        if (!SFX_CONFIG.dev.proxyTable.hasOwnProperty(cgiPath)) {
            break;
        }
        table[cgiPath] = Object.assign({

            // 关闭证书错误提醒
            secure: false,

            // 日志提示
            logLevel: 'debug',

            // 发送到目标服务器时添加自定义头部
            headers: {

            },

            // proxy 定制，转发到目标服务器前可以hook到本地json
            onProxyReq: undefined,

            // 代理数据返回时触发，可以修改后台返回的数据，比如统一添加http头部等
            onProxyRes: undefined

        }, SFX_CONFIG.dev.proxyTable[cgiPath]);
        
        table[cgiPath].onProxyReq = function () {
            onProxyReq();
            if (typeof table[cgiPath].onProxyReq === 'function') {
                table[cgiPath].onProxyReq();
            }
        };
        table[cgiPath].onProxyRes = function () {
            onProxyRes();
            if (typeof table[cgiPath].onProxyRes === 'function') {
                table[cgiPath].onProxyRes();
            }
        };

    }

    return table;

};
