/**
 * Created by zhangyuantao on 2017/3/7.
 */

let path = require('path');
let fs = require('fs');
let logger = require('log4js').getLogger('production');
require('shelljs/global');
process.env.NODE_ENV = 'production';

let ora = require('ora');
let webpack = require('webpack');
const SFX_CONFIG = require('../../lib/config');
let webpackConfig = require('./webpack.config.prod.js');

exports.run = () => {

    console.log(
        '  Tip:\n' +
        '  Built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    );

    let spinner = ora('building for production...');
    spinner.start();

    // 拷贝静态资源目录
    var assetsPath = path.join(SFX_CONFIG.output.path, SFX_CONFIG.staticDirectory);
    rm('-rf', assetsPath);
    mkdir('-p', assetsPath);
    cp('-R', 'static/*', assetsPath);

    webpack(webpackConfig(), function (err, stats) {
        spinner.stop();
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

        if (SFX_CONFIG.ie8) {
            logger.warn('fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie!');
            logger.warn('fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie!');
            logger.warn('fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie! fuck ie!');
            let dir = path.join(SFX_CONFIG.output.path, SFX_CONFIG.staticDirectory, 'js');
            fs.readdirSync(dir).forEach(file => {
                if (!/\.js$/.test(file)) {
                    return;
                }
                logger.info(`change keyword: ${path.join(dir, file)}`);
                let result = require('babel-core').transform(fs.readFileSync(path.join(dir, file)), {
                    plugins: [
                        "transform-es3-property-literals",
                        "transform-es3-member-expression-literals"
                    ]
                });
                fs.writeFileSync(path.join(dir, file), result.code);
            });
        }
    });
};

