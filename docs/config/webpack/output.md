?> `webpack.output`输出配置，指示`webpack`如何去输出、以及在哪里输出你的`bundle`、`asset`和其他你所打包或使用`webpack`载入的任何内容。具体可参考：[https://webpack.js.org/configuration/output/](https://webpack.js.org/configuration/output/)

    const ASSETS_ROOT = path.resolve(__dirname, './dist');
    module.exports = {
        output: {
            // 打包输出的目录
            path: ASSETS_ROOT,

            // 网站的根路径，比如BBC产品线：/bbc/，DC产品线：/ui/
            publicPath: `/${OUTPUT}/`,

            // 合并后生成的JS的文件全名格式
            filename: `${STATIC_DIRECTORY}/js/[name].[hash].js`,

            // chunk文件的命名格式
            chunkFilename: `${STATIC_DIRECTORY}/js/[name].[chunkhash].js`
        }
    };

上面是一个最常用的例子，`webpack`可配置项较多，可参考官方的文档配置
