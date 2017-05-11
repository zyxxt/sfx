/**
 * Created by zhangyuantao on 2017/3/7.
 */

require('shelljs/global');
process.env.NODE_ENV = 'production';

let path = require('path');
let fs = require('fs');
let logger = require('../../util/logger').getLogger('production');
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

        if (stats.hasErrors()) {
            process.exit(1);
        }

        if (SFX_CONFIG.ie8) {
            logger.warn('fuck ie! transform es3 keyword!');
            let dir = path.join(SFX_CONFIG.output.path, SFX_CONFIG.staticDirectory, 'js');
            let transformID = setInterval(() => {
                if (!fs.existsSync(dir)) {
                    return;
                }
                clearInterval(transformID);
                fs.readdirSync(dir).forEach(file => {
                    if (!/\.js$/.test(file)) {
                        return;
                    }
                    let result = require('babel-core').transform(fs.readFileSync(path.join(dir, file)), {
                        plugins: [
                            "transform-es3-property-literals",
                            "transform-es3-member-expression-literals"
                        ]
                    });
                    fs.writeFileSync(path.join(dir, file), result.code);
                    logger.info(`${path.join(dir, file)}. done`);
                });
                logger.warn('fuck ie! transform es3 success');
            }, 100);
        }
    });
};

