/**
 * Created by zhangyuantao on 2017/3/6.
 */

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');

module.exports = function (options) {
    options = options || {};

    // generate loader string to be used with extract text plugin
    function generateLoaders (loaders) {

        let sourceLoader = loaders.map(function (loader) {
            let extraParamChar;

            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&';
            } else {
                loader = loader + '-loader';
                extraParamChar = '?';
            }
            loader = path.join(__dirname, '../../node_modules/', loader);
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
        }).join('!');

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: [sourceLoader],
                fallback: options.vueLoader ? path.join(__dirname, '../../node_modules/vue-style-loader') : undefined
            });
            // return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
        } else {
            return options.vueLoader ? [path.join(__dirname, '../../node_modules/vue-style-loader'), sourceLoader].join('!') : sourceLoader;
        }
    }

    // http://vuejs.github.io/vue-loader/configurations/extract-css.html
    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    };
};
