/**
 * Created by zhangyuantao on 2017/4/10.
 */

require('shelljs/global');
process.env.NODE_ENV = 'production';

let ora = require('ora');
let path= require('path');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config.3parts.js');
let SFX_CONFIG = require('../../lib/config');
let logger = require('log4js').getLogger('3parts');

exports.run = () => {
    logger.info('Built third parts file...');

    let assetsPath = path.resolve(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist);
    logger.info(`clean third parts folder: ${assetsPath}`);
    rm('-rf', assetsPath);
    mkdir('-p', assetsPath);
    logger.info('clean success');

    let spinner = ora('building for third parts...');
    spinner.start();
    return new Promise(function (resolve, reject) {
        webpack(webpackConfig(), function (err, stats) {
            spinner.stop();
            if (err) {
                reject(err);
            }
            process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: true,
                    chunks: false,
                    chunkModules: false
                }) + '\n');
            
            resolve();
        });
    });

};
