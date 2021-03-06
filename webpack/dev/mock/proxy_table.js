/**
 * Created by ued on 2017/4/22.
 */

let hook = require('./hook');
let logger = require('log4js').getLogger('proxy_table');
const SFX_CONFIG = require('../../../lib/config');

function onProxyReq (proxyReq, req, res, options) {
    logger.info(`onProxyReq: mock proxy matched. ${proxyReq.method}: ${proxyReq.path}`);
    logger.debug(`onProxyReq headers: ${JSON.stringify(proxyReq._headers, true, 4)}`);

    // 上传请求不处理
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('boundary') !== -1) {
        return;
    }
    hook(proxyReq, req, res, options);
}

function onProxyRes (proxyRes, req, res, options) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    logger.debug(`[Proxy Response] headers: ${JSON.stringify(proxyRes.headers, true, 4)}`);

    if (Array.isArray(proxyRes.headers["set-cookie"])) {
        proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map(cookie => {
            let arr = cookie.split(/\s*;\s*/);
            let ret = [];
            arr.forEach(item => {
                if (!/^domain=/.test(item)) {
                    ret.push(item);
                }
            });
            return ret.join('; ');
        });
    }

}

module.exports = () => {
    let table = {

    };

    for (let cgiPath in SFX_CONFIG.dev.proxyTable) {
        if (!SFX_CONFIG.dev.proxyTable.hasOwnProperty(cgiPath)) {
            break;
        }
        table[cgiPath] = Object.assign({

            // 目标地址，比如 http://localhost/cgiPath => https://1.1.1.1/cgiPath
            target: 'http://1.1.1.1',

            // 关闭证书错误提醒
            secure: false,

            // 发送到目标服务器时添加自定义头部
            headers: {

            },

            // proxy 定制，转发到目标服务器前可以hook到本地json
            onProxyReq: undefined,

            // 代理数据返回时触发，可以修改后台返回的数据，比如统一添加http头部等
            onProxyRes: undefined

        }, SFX_CONFIG.dev.proxyTable[cgiPath]);

        let oldReqHook = table[cgiPath].onProxyReq;
        table[cgiPath].onProxyReq = function (...args) {
            onProxyReq(...args);
            if (typeof oldReqHook === 'function') {
                oldReqHook(...args);
            }
        };
        let oldResHook  = table[cgiPath].onProxyRes;
        table[cgiPath].onProxyRes = function (...args) {
            onProxyRes(...args);
            if (typeof oldResHook === 'function') {
                oldResHook(...args);
            }
        };

    }

    return table;

};
