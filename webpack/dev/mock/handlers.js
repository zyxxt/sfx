let _ = require('lodash');

module.exports = {
    init: init,
    off: off
};

function off (proxy, handlers) {
    Object.keys(handlers).forEach(eventName => {
        proxy.off(eventName, handlers[eventName]);
    });
}

function init(proxy, opts) {
    let handlers = getProxyEventHandlers(opts);

    _.forIn(handlers, function (handler, eventName) {
        proxy.on(eventName, handlers[eventName]);
    });

    return handlers;
}

function getProxyEventHandlers(opts) {
    // https://github.com/nodejitsu/node-http-proxy#listening-for-proxy-events
    let proxyEvents = ['error', 'proxyReq', 'proxyReqWs', 'proxyRes', 'open', 'close'];
    let handlers = {};

    _.forEach(proxyEvents, function (event) {
        // all handlers for the http-proxy events are prefixed with 'on'.
        // loop through options and try to find these handlers
        // and add them to the handlers object for subscription in init().
        let eventName = _.camelCase('on ' + event);
        let fnHandler = _.get(opts, eventName);

        if (_.isFunction(fnHandler)) {
            handlers[event] = fnHandler;
        }
    });

    // add default error handler in absence of error handler
    if (!_.isFunction(handlers.error)) {
        handlers.error = defaultErrorHandler;
    }

    // add default close handler in absence of close handler
    if (!_.isFunction(handlers.close)) {
        handlers.close = logClose;
    }

    return handlers;
}

function defaultErrorHandler(err, req, res) {
    let host = (req.headers && req.headers.host);
    let code = err.code;

    if (res.writeHead && !res.headersSent) {
        if (/HPE_INVALID/.test(code)) {
            res.writeHead(502);
        } else {
            switch (code) {
                case 'ECONNRESET':
                case 'ENOTFOUND':
                case 'ECONNREFUSED':
                    res.writeHead(504);
                    break;
                default:
                    res.writeHead(500);
            }
        }
    }

    res.end('Error occured while trying to proxy to: ' + host + req.url);
}

function logClose(req, socket, head) {
    // view disconnected websocket connections
}
