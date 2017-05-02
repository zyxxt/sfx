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

    // 保持原有的目录结构，会自动保留图片相关文件
    keepStructure: false,

    // 输出所有调试日志 DEBUG INFO
    logLevel: 'INFO',

    // webpack 的入口配置
    entry: {
        app: [
            './src/home/mod_launch/fire.js'
        ],
        login: [
            './src/home/mod_launch/login.js'
        ]
    },

    // 第三方代码单独打包
    thirdEntry: {
        vueAll: [
            'vue',
            'vuex',
            'vue-router',
            'vue-resource'
        ],
        chartsAll: [
            'echarts',
            'highcharts'
        ],
        babelRuntime: [
            'babel-polyfill',
            'core-js'
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
        filename: `${STATIC_DIRECTORY}/js/[name].[hash].js`,

        // chunk文件的命名格式
        chunkFilename: `${STATIC_DIRECTORY}/js/[name].[hash].js`
    },

    // 入口html文件配置，由于是单页，一般只配置login.html, index.html即可
    htmlPluginOptions: [
        {

            // 生成的文件
            filename: 'index.html',

            // 源文件
            template: 'index.html',

            // favicon:'favicon.ico',

            // 自动注入哪些chunk，跟entry对应
            chunks: [
                'manifest',
                'vendor',
                'app'
            ],

            inject: true,

            // 压缩选项
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: false
            },
            chunksSortMode: 'dependency',

            // 这块可注入到HTML文件中，形式如："<%= htmlWebpackPlugin.options.data.rakKey %>", "<%= htmlWebpackPlugin.options.data.NODE_ENV %>"
            // 只会全词匹配替换HTML文件中的，js变量则要通过 webpack.DefinePlugin 处理，可参考plugins配置
            data: {
                rsaKey: 'test',
                NODE_ENV: NODE_ENV
            }
        },
        {
            filename: 'login.html',
            template: 'login.html',
            chunks: [
                'manifest',
                'vendor',
                'login'
            ],
            inject: true,
            chunksSortMode: 'dependency',
            data: {
                NODE_ENV: NODE_ENV
            }
        }
    ],

    dev: {

        host: '',

        port: 8091,

        https: false,

        // 测试数据存放目录
        mockDirectory: 'mock',

        // URL 跟本地路径的对应关系，有内置类型：ac af hci acdc bbc，也可以自定义函数实现，返回一个真实的本地文件即可
        mockMapping: 'bbc',

        // mockMapping (options) {
        //
        // },

        proxyTable: {
            '/bbc': {

                // 目标地址，比如 http://localhost/bbc => https://1.1.1.1/bbc
                target: 'http://1.1.1.1',

                // 关闭证书错误提醒
                secure: false,

                // 日志提示
                logLevel: 'debug',

                // 发送到目标服务器时添加自定义头部
                headers: {
                    host: '1.1.1.1'
                },

                // proxy 定制，转发到目标服务器前可以hook到本地json
                onProxyReq: undefined,

                // 代理数据返回时触发，可以修改后台返回的数据，比如统一添加http头部等
                onProxyRes: undefined
            }
        },

        // 勾子，本地服务器开启时，可以再次修改webpack中的配置项
        beforeCreateServer (webpackConfig) {
            return webpackConfig;
        },

        afterCreateServer () {

        }

    }

};
