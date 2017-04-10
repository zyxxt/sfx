/**
 * Created by zhangyuantao on 2017/2/26.
 */


let eslint = require('./eslint/lint');

let thirdTask = require('./webpack/third_part');
let prodTask = require('./webpack/prod');


exports.init = function (template) {};

exports.run = function (action) {
    thirdTask.run().then(() => {
        prodTask.run();
    });


};


exports.eslint = function (...args) {
    eslint.run(...args);

};





