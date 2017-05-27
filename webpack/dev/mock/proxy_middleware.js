/**
 * Created by zhangyuantao on 2017/4/23.
 */

let _ = require('lodash');
let url = require('url');
let httpProxy = require('http-proxy');
let logger = require('log4js').getLogger('proxy_table');
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

    if (options.target) {
        let urlOption = url.parse(options.target);
        options.headers = options.headers || {};
        options.headers.host = urlOption.host || urlOption.hostname;
        if (!options.headers['Cache-Control']) {
            options.headers['Cache-Control'] = 'no-cache, no-store';
        }
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
        let hostname = (req.headers && req.headers.host) || (req.hostname || req.host);
        let target = proxyOptions.target.host || proxyOptions.target;

        logger.error(`Error occurred while trying to proxy request ${req.url} from ${hostname} to ${target}. code: ${err.code}`);
    });

    return (req, res, next) => {
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
