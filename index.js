/**
 * Created by zhangyuantao on 2017/2/26.
 */

const ESLINT_PATH = './eslint/lint';
const WEBPACK_THIRD_PATH = './webpack/third_part';
const WEBPACK_PRODUCTION = './webpack/prod';
const WEBPACK_DEVELOPMENT = './webpack/dev';

exports.init = function (template) {

};

exports.build = function () {
    let thirdTask = require(WEBPACK_THIRD_PATH);
    
    thirdTask.run().then(() => {
        let prodTask = require(WEBPACK_PRODUCTION);
        prodTask.run();
    });
};

exports.dev = function () {
    let devTask = require(WEBPACK_DEVELOPMENT);
    devTask.run();
};

exports.eslint = function (...args) {
    let eslint = require(ESLINT_PATH);
    eslint.run(...args);

};





