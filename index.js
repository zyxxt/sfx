/**
 * Created by zhangyuantao on 2017/2/26.
 */


let eslint = require('./eslint/lint');
let prodTask = require('./webpack/prod');

exports.init = function (template) {};

exports.run = function (action) {

    prodTask.run();

};


exports.eslint = function (...args) {
    eslint.run(...args);

};





