/**
 * Created by zhangyuantao on 2017/3/9.
 */

require('shelljs/global');

process.env.NODE_ENV = 'development';

let ora = require('ora');
let webpack = require('webpack');
let logger = require('log4js').getLogger('dev');

let fs = require('fs');
let path = require('path');
let http = require('http');
let https = require('https');
let url = require('url');

let express = require('express');
let opn = require('opn');

let SFX_CONFIG = require('../../lib/config');
let webpackConfig = require('./webpack.config.dev.js');
let mockMiddleware = require('./mock/proxy_middleware');
let mockProxyTable = require('./mock/proxy_table')();

const PROJECT_ROOT = process.cwd();

function createServer (app) {
    logger.info('create server');
    let server;
    if (SFX_CONFIG.dev.https) {
        server = https.createServer({
            key: fs.readFileSync(path.join(__dirname, './ca/server-key.key')),
            cert: fs.readFileSync(path.join(__dirname, './ca/server-cert.crt'))
        }, app);
    } else {
        server = http.createServer(app);
    }
    return server;
}

function createApp (webpackConfig) {
    logger.info('create express app');
    let app = express();
    let compiler = webpack(webpackConfig/*, function (err, stats) {
        if (err) {
            throw err;
        }
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: true,
                chunks: false,
                chunkModules: false
            }) + '\n');
    }*/);

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
    // 访问目录时自动退化
    // app.use(require('connect-history-api-fallback')());

    // serve webpack bundle output
    app.use(devMiddleware);

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);

    // 代理转发
    logger.info('create mock proxy');
    Object.keys(mockProxyTable).forEach(context => {
        let options = mockProxyTable[context];
        if (typeof options === 'string') {
            options = { target: options }
        }
        logger.info(`context: ${context}, target: ${options.target}`);
        app.use(mockMiddleware(context, options));
    });


    // 第三方库代码
    let thirdPartsPath = path.posix.join(SFX_CONFIG.output.publicPath, SFX_CONFIG.thirdDist);
    app.use(thirdPartsPath, express.static(path.resolve(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist)));

    // 静态资源目录
    if (SFX_CONFIG.staticDirectory) {
        let staticPath = path.posix.join(SFX_CONFIG.output.publicPath, SFX_CONFIG.staticDirectory);
        app.use(staticPath, express.static(path.resolve(PROJECT_ROOT, SFX_CONFIG.staticDirectory)));
    }
    

    return app;
}

function run (webpackConfig) {
    let app = createApp(webpackConfig);
    let server = createServer(app);
    let host = SFX_CONFIG.dev.host;
    let port = SFX_CONFIG.dev.port;
    server.listen(port, host, function (err) {
        if (err) {
            logger.error(err);
            return;
        }
        let uri = (SFX_CONFIG.dev.https ? 'https://' : 'http://') + (host || 'localhost') + ':' + port + SFX_CONFIG.output.publicPath;
        logger.info('Listening at ' + uri + '\n');

        if (SFX_CONFIG.dev.autoOpenBrowser !== false) {
            opn(uri);
        }

        if (typeof SFX_CONFIG.dev.afterCreateServer === 'function') {
            SFX_CONFIG.dev.afterCreateServer(server, app);
        }
    });
}

function prepareDevConfig (address) {
    let option = url.parse(address);
    SFX_CONFIG.dev.https = option.protocol === 'https';
    SFX_CONFIG.dev.port = option.port;
    SFX_CONFIG.output.publicPath = option.pathname;
}

exports.run = (address) => {
    logger.info('start run dev server');
    if (address) {
        prepareDevConfig(address);
    }
    let config = webpackConfig();
    if (typeof SFX_CONFIG.dev.beforeCreateServer === 'function') {
        Promise.resolve(SFX_CONFIG.dev.beforeCreateServer(config))
            .then(config => {
                run(config);
            })
            .catch((err) => {
                logger.error(err);
                run(config);
            });
    } else {
        run(config);
    }

};
