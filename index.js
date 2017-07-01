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

exports.build = function (tasks) {
    const THIRD = 'thirdParts';
    const PROJECT = 'project';
    if (!tasks || !tasks.length) {
        tasks = [
            THIRD,
            PROJECT
        ];
    }
    console.log(`build task: ${tasks}`);
    let _build = () => {
        if (tasks.length) {
            let task = tasks.shift();
            switch (task) {
                case THIRD:
                    task = require(WEBPACK_THIRD_PATH);
                    break;
                case PROJECT:
                    task = require(WEBPACK_PRODUCTION);
                    break;
                default:
                    console.error(`task not found. only support: ${THIRD}`, `${PROJECT}`);
                    process.exit(-1);
            }
            let promise = task.run();
            if (tasks.length) {
                promise.then(() => {
                    _build();
                });
            }
            return promise;
        }
    };
    return _build();
};

exports.dev = function (address) {
    let devTask = require(WEBPACK_DEVELOPMENT);
    devTask.run(address);
};

exports.eslint = function (files) {
    let eslint = require(ESLINT_PATH);
    eslint.run(files);

};





