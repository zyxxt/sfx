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

exports.run = () => {

    console.log(
        '  Tip:\n' +
        '  Built third parts file...\n'
    );

    let spinner = ora('building for third parts...');
    spinner.start();

    var assetsPath = path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist);
    
    rm('-rf', assetsPath);
    mkdir('-p', assetsPath);


    return new Promise(function (resolve, reject) {
        webpack(webpackConfig(), function (err, stats) {
            spinner.stop();
            if (err) {
                reject(err);
            };
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
