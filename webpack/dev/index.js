/**
 * Created by zhangyuantao on 2017/3/9.
 */

require('shelljs/global');
process.env.NODE_ENV = 'development';

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
    let compiler = webpack(webpackConfig());

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


    // 第三方库代码
    let thirdPartsPath = path.posix.join(SFX_CONFIG.output.publicPath, SFX_CONFIG.thirdDist);
    app.use(thirdPartsPath, express.static(path.resolve(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist)));

    return app;
}



exports.run = () => {
    let app = createApp();
    let server = createServer(app);
    let host = SFX_CONFIG.dev.host;
    let port = SFX_CONFIG.dev.port;
    server.listen(port, host, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        let uri = (SFX_CONFIG.dev.https ? 'https://' : 'http://') + (host || 'localhost') + ':' + port + SFX_CONFIG.output.publicPath;
        console.log('Listening at ' + uri + '\n');
        opn(uri);
    });

};
