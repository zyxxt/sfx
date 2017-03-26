/**
 * Created by zhangyuantao on 2017/3/6.
 */

let path = require('path');

module.exports = {

    version: '1.0',

    // build时生成的目录
    assetsRoot: path.resolve(__dirname, './dist'),

    // build时生成的所有静态资源的目录，目录下面会有js, css, img, font等
    assetsSubDirectory: 'static',

    // 第三方框架代码放到公共目录
    assets3PartsDirectory: '3parts',

    eslint: {
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

    output: {
        path: './dist',
        publicPath: '/sfx/examples/vue/dist/',
        filename: '[name].js',
        chunkFilename: 'static/js/[name].js'
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
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }
    ]



};
