/**
 * Created by zhangyuantao on 2017/3/7.
 */

var path = require('path');
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
        if (err) throw err;
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: true,
                chunks: false,
                chunkModules: false
            }) + '\n');
    });
};

