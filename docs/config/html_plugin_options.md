`html`文件自动注入，启用后，会自动加载`html-webpack-plugin`插件，可把`webpack`生成的`entry`动态插入到`html`文件里面，即给`html`提供了动态扩展的能力，配置可参考：[https://github.com/jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

    module.exports = {
        htmlPluginOptions: [
            {
                // 生成的文件
                filename: '_index.html',

                // 源文件
                template: 'src/_index.html',

                favicon: 'src/favicon.ico',

                // 自动注入哪些chunk，跟entry对应
                chunks: [
                    'manifest',
                    'vendor',
                    'ext_all',
                    'override_all',
                    'framework_all',
                    'mod_common'
                ],
                chunksSortMode: function (...chunks) {
                    let chunkNames = chunks.map(map => map.names[0]);
                    return module.exports.htmlPluginOptions[0].chunks.indexOf(chunkNames[0]) - module.exports.htmlPluginOptions[0].chunks.indexOf(chunkNames[1]);
                },

                inject: true,

                // 压缩选项
                minify: {
                    removeComments: false,
                    collapseWhitespace: false,
                    removeAttributeQuotes: false
                },

                // 这块可注入到HTML文件中，形式如："<%= htmlWebpackPlugin.options.data.abcdefg %>", "<%= htmlWebpackPlugin.options.data.NODE_ENV %>"
                // 只会全词匹配替换HTML文件中的，js文件中的变量则要通过 webpack.DefinePlugin 处理，可参考plugins配置
                data: {
                    abcdefg: 'test'
                    NODE_ENV: 'production'
                }
            }
        ]
    };

假设有存在的一个`html`文件如下：

    <html>
    <body>
        <p><%= htmlWebpackPlugin.options.data.abcdefg %></p>
        <script>
            window.debug = "<%= htmlWebpackPlugin.options.data.abcdefg %>" === "development";
        </script>
    </body>
    </html>

最终打包后，生成的`html`文件如下：

    <html>
    <body>
        <p>test</p>
        <script>
            window.debug = false;
        </script>
        <script type="text/javascript" src="/ui/static/js/manifest.9447792ffe39eabe1f89.js"></script>
        <script type="text/javascript" src="/ui/static/js/vendor.9447792ffe39eabe1f89.js"></script>
        <script type="text/javascript" src="/ui/static/js/ext_all.9447792ffe39eabe1f89.js"></script>
        <script type="text/javascript" src="/ui/static/js/override_all.9447792ffe39eabe1f89.js"></script>
        <script type="text/javascript" src="/ui/static/js/framework_all.9447792ffe39eabe1f89.js"></script>
        <script type="text/javascript" src="/ui/static/js/mod_common.9447792ffe39eabe1f89.js"></script>
    </body>
    </html>

!> <% htmlWebpackPlugin.options.data.xxx %> 该功能是字符串匹配，只会处理`html`文件

其它的配置项可以参考：
![http://200.200.151.26/blog/wp-content/uploads/2017/06/RTX截图未命名2.png](http://200.200.151.26/blog/wp-content/uploads/2017/06/RTX截图未命名2.png)