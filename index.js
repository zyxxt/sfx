/**
 * Created by zhangyuantao on 2017/2/26.
 */


let eslint = require('./eslint/lint');
let logger = require('./util/logger');

let thirdTask = require('./webpack/third_part');
let devTask = require('./webpack/dev');
let prodTask = require('./webpack/prod');


exports.init = function (template) {};

exports.build = function () {
    thirdTask.run().then(() => {
        prodTask.run();
    });
};

exports.dev = function () {
    devTask.run();
};

exports.eslint = function (...args) {
    eslint.run(...args);

};





