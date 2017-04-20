/**
 * Created by zhangyuantao on 2017/3/6.
 */

let cssLoaders = require('./css_loaders');

module.exports = function (options) {
    let output = [];
    let loaders = cssLoaders(options);
    for (let extension in loaders) {
        let loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        });
    }
    return output;
};

