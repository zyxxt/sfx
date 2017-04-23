/**
 * Created by zhangyuantao on 2017/4/23.
 */

let _ = require('lodash');
let httpProxy = require('http-proxy');
let contextMatcher = require('./context_matcher');
let configFactory = require('./config_factory');
let handlers = require('./handlers');

const HTTP_HEADER_KEY = 'dev-remote-addr';

function getRemoteAddr (req) {
    let headers = req.headers;
    let remoteAddr = headers[HTTP_HEADER_KEY];
    if (remoteAddr) {
        return remoteAddr;
    }
}

function shouldSendToProxy (context, req) {
    let path = (req.originalUrl || req.url);
    return contextMatcher.match(context, path, req);
}

function createConfig (context, req, options) {
    let target = getRemoteAddr(req);
    if (target) {
        options.target = target;
    }
    return configFactory.createConfig(context, options);

}

function createProxyOptions (req, config) {
    let proxyOptions = config.options;
    req.url = (req.originalUrl || req.url);
    return _.cloneDeep(proxyOptions);
}

function addEventListeners (proxy, proxyOptions, lastEventObj) {
    if (lastEventObj) {
        handlers.off(proxy, lastEventObj);
    }
    return handlers.init(proxy, proxyOptions);
}

module.exports = (context, options) => {

    let proxyOptions;
    let config;
    let proxy = httpProxy.createProxyServer({});
    let lastEventObj;

    proxy.on('error', (err, req, res) => {
        let hostname = (req.headers && req.headers.host) || (req.hostname || req.host);     // (websocket) || (node0.10 || node 4/5)
        let target = proxyOptions.target.host || proxyOptions.target;
        let errReference = 'https://nodejs.org/api/errors.html#errors_common_system_errors'; // link to Node Common Systems Errors page

        console.error('[HPM] Error occurred while trying to proxy request %s from %s to %s (%s) (%s)', req.url, hostname, target, err.code, errReference);
    });

    return (req, res, next) => {
        console.log(`[Request] ${req.method}: ${req.path}`);
        console.log(`[Request] headers: ${JSON.stringify(req.headers, true, 4)}`);

        config = createConfig(context, req, options);
        if (!shouldSendToProxy(config.context, req, config)) {
            next();
            return;
        }
        proxyOptions = createProxyOptions(req, config);
        lastEventObj = addEventListeners(proxy, proxyOptions, lastEventObj);

        proxy.web(req, res, proxyOptions);
    };

};
