/**
 * Created by zhangyuantao on 2017/3/6.
 */

let path = require('path');

// build时生成的目录
const ASSETS_ROOT = path.resolve(__dirname, './dist');

// build时生成的所有静态资源的目录，目录下面会有js, css, img, font等
const STATIC_DIRECTORY = 'static';

// 第三方框架代码放到公共目录
const THIRD_DIRECTORY = '3parts';

const NODE_ENV = process.env.NODE_ENV;

module.exports = {

    version: '1.0',

    eslint: {

        // 具体配置可以参考以下链接
        // http://eslint.org/docs/developer-guide/nodejs-api#cliengine

        // 指明需要 eslint 的目录
        files: [
            'src'
        ]
    },

    sourceMap: 'source-map',

    // 是否启用压缩
    uglify: false,

    // webpack 的入口配置
    entry (nodeEnv) {
        if (nodeEnv === 'development') {
            return {
                example: [
                    './examples/index.js'
                ]
            };
        } else if (nodeEnv === 'production') {
            return {
                widgets: './src/index'
            };
        }
    },

    resolve (nodeEnv, resolve) {
        return Object.assign({}, resolve, {
            alias: {
                'vue$': 'vue/dist/vue',
                'src': path.resolve(__dirname, 'src'),
                'sf-vue-component': path.resolve(__dirname, 'src/index')
            }
        });
    },

    // 第三方代码单独打包
    thirdEntry: {
        vueAll: [
            'vue',
            'vuex',
            'vue-resource',
            'vue-router'
        ],
        chartAll: [
            'echarts',
            'highcharts'
        ],
        babelRuntime: [
            'babel-polyfill',
            'core-js'/*,
            './node_modules/css-loader/lib/css-base.js',
            './node_modules/vue-style-loader/addStyles.js'*/
        ]
    },
    thirdDist: THIRD_DIRECTORY,

    staticDirectory: STATIC_DIRECTORY,

    // webpack 输出配置
    output: {

        // 打包输出的目录
        path: ASSETS_ROOT,

        // 网站的根路径，比如BBC产品线：/bbc/，DC产品线：/dc/ui/
        publicPath: '/',

        // 合并后生成的JS的文件全名格式
        filename: NODE_ENV === 'production' ? `${STATIC_DIRECTORY}/js/[name].js` : `${STATIC_DIRECTORY}/js/[name].[hash].js`,

        // chunk文件的命名格式
        chunkFilename: NODE_ENV === 'production' ? `${STATIC_DIRECTORY}/js/[name].js` : `${STATIC_DIRECTORY}/js/[name].[hash].js`,

        libraryTarget: NODE_ENV === 'production' ? 'umd' : undefined,
        library: NODE_ENV === 'production' ? 'SFVueComponent' : undefined
    },

    externals (nodeEnv) {
        if (nodeEnv === 'production') {
            return {
                'vue': {
                    // window
                    root: 'Vue',
                    // Commonjs (strict)
                    commonjs: 'vue',
                    // Commonjs (node.js)
                    commonjs2: 'vue',
                    // amd
                    amd: 'vue'
                },
                'vue-resource': 'umd vue-resource',
                'vue-router': 'umd vue-router',
                'echarts': 'umd echarts',
                'highcharts': 'umd highcharts'
            };
        }
    },


    // 入口html文件配置，由于是单页，一般只配置login.html, index.html即可
    htmlPluginOptions: [
        {
            // 生成的文件
            filename: 'index.html',

            // 源文件
            template: 'examples/index.html',

            inject: true,

            // 压缩选项
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
            },
            chunksSortMode: 'dependency'
        }
    ],

    plugins (nodeEnv, plugins, sfxModulesPath) {
        let webpack = require(path.resolve(sfxModulesPath, 'webpack'));
        let HtmlWebpackPlugin = require(path.resolve(sfxModulesPath, 'html-webpack-plugin'));

        if (nodeEnv === 'production') {
            for (let index = 0; index < plugins.length; index++) {
                if (plugins[index] instanceof webpack.optimize.CommonsChunkPlugin || plugins[index] instanceof HtmlWebpackPlugin) {
                    plugins.splice(index, 1);
                    index--;
                }
            }
        }
        return plugins;
    },

    dev: {

        host: '',
        port: 8090,
        https: false,

        beforeCreateServer () {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
        },

        afterCreateServer () {

        }

    }

};
