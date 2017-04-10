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

    // webpack 的入口配置
    entry: {
        app: [
            './src/home/index.js'
        ]
    },

    // 第三方代码单独打包
    thirdEntry: {
        vueAll: [
            'vue'
        ]
    },
    thirdDist: THIRD_DIRECTORY,

    // webpack 输出配置
    output: {

        // 打包输出的目录
        path: ASSETS_ROOT,

        // 网站的根路径，比如BBC产品线：/bbc/，DC产品线：/dc/ui/
        publicPath: '/sfx/examples/vue/dist/',

        // 合并后生成的JS的文件全名格式
        filename: `${STATIC_DIRECTORY}/js/[name].[chunkhash].js`,

        // chunk文件的命名格式
        chunkFilename: `${STATIC_DIRECTORY}/js/[name].[chunkhash].js`
    },

    // 是否启用压缩
    uglify: false,

    // 入口html文件配置，由于是单页，一般只配置login.html, index.html即可
    htmlPluginOptions: [
        {
            // 生成的文件
            filename: 'index.html',

            // 源文件
            template: 'src/index.html',

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

    develop: {

        host: '',
        port: 8090,
        https: true,

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
