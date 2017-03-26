/**
 * Created by zhangyuantao on 2017/3/9.
 */

require('shelljs/global');
process.env.NODE_ENV = 'develop';

let ora = require('ora');
let webpack = require('webpack');

let fs = require('fs');
let path = require('path');
let http = require('http');
let https = require('https');

let express = require('express');
let opn = require('opn');

let SFX_CONFIG = require('../../lib/config');
let webpackConfig = require('./webpack.config.dev.js');

function createServer (app) {
    let server;
    if (SFX_CONFIG.https) {
        server = https.createServer({
            key: fs.readFileSync(path.join(__dirname, './ca/server-key.key')),
            cert: fs.readFileSync(path.join(__dirname, './ca/server-cert.crt'))
        }, app);
    } else {
        server = http.createServer(app);
    }
    return server;
}

function createApp () {

    let app = express();
    let compiler = webpack(webpackConfig);

    let devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: SFX_CONFIG.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });
    let hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' });
            cb();
        })
    });


// handle fallback for HTML5 history API
    app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
    app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
    app.use(hotMiddleware);

    return app;
}



exports.run = () => {
    let app = createApp();
    let server = createServer(app);
    let port = SFX_CONFIG.port;
    let host = SFX_CONFIG.host;
    server.listen(port, host, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        let uri = (config.dev.https ? 'https://' : 'http://') + (host || 'localhost') + ':' + port;
        console.log('Listening at ' + uri + '\n');
        opn(uri);
    });

};
