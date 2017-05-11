/**
 * Created by zhangyuantao on 2017/2/26.
 */

const ESLINT_PATH = './eslint/lint';
const TEMPLATE_INIT_PATH = './template/init';
const WEBPACK_THIRD_PATH = './webpack/third_part';
const WEBPACK_PRODUCTION = './webpack/prod';
const WEBPACK_DEVELOPMENT = './webpack/dev';

exports.init = function (template, option) {
    let templateTask = require(TEMPLATE_INIT_PATH);
    templateTask.run(template, option);
};

exports.build = function () {
    let thirdTask = require(WEBPACK_THIRD_PATH);
    
    thirdTask.run().then(() => {
        let prodTask = require(WEBPACK_PRODUCTION);
        prodTask.run();
    });
};

exports.dev = function (address) {
    let devTask = require(WEBPACK_DEVELOPMENT);
    devTask.run(address);
};

exports.eslint = function (files) {
    let eslint = require(ESLINT_PATH);
    eslint.run(files);

};





