
支持的配置项如下：

    const NODE_ENV = process.env.NODE_ENV; // production, development
    module.exports = {

        version: '1.0',
        
        // 输出所有调试日志 INFO DEBUG
        logLevel: 'DEBUG',

        eslint: {

            // 指明需要 eslint 的目录
            files: ['src']
        },

        sourceMap: 'source-map',
        uglify: false,


        // webpack 的入口配置
        entry: {
            app: [ './src/home/mod_launch/fire.js']
        },
        // webpack 输出配置
        output: {
            // 打包输出的目录
            path: path.resolve(__dirname, './dist'),
            // 网站的根路径，比如BBC产品线：/bbc/，DC产品线：/dc/ui/，
            publicPath: '/',
            // 合并后生成的JS的文件全名格式
            filename: `${STATIC_DIRECTORY}/js/[name].[hash].js`,
            // chunk文件的命名格式
            chunkFilename: `${STATIC_DIRECTORY}/js/[name].[hash].js`
        },

        // 第三方代码单独打包，相比CommonsChunkPlugin的优秀在于可以手动指明合并哪些模块
        thirdEntry: {
            vueAll: [ 'vue', 'vue-resource' ]
        },
        thirdDist: THIRD_DIRECTORY,
        staticDirectory: STATIC_DIRECTORY, // 静态资源目录，比如字体、一些大图片等

        // 入口html文件配置，由于是单页，一般只配置login.html, index.html即可，可参考： https://github.com/jantimon/html-webpack-plugin
        htmlPluginOptions: [
            {
                filename: 'index.html', // 生成的文件
                template: 'src/index.html', // 源文件
                favicon:'src/favicon.ico',
                chunks: [ manifest', 'vendor', 'app' ], // 自动注入哪些chunk，跟entry对应
                inject: true, // 把chunks注入到html里去
                chunksSortMode: 'dependency',
                // 以下这块可注入到HTML文件中，形式如："<%= htmlWebpackPlugin.options.data.rakKey %>", "<%= htmlWebpackPlugin.options.data.NODE_ENV %>"
                // 只会全词匹配替换HTML文件中的，js变量则要通过 webpack.DefinePlugin 处理，可参考plugins配置
                data: {
                    rsaKey: 'test',
                    NODE_ENV: NODE_ENV
                }
            }
        ],
        // 本地调试相关配置
        dev: {
            host: '',
            port: 8090,
            https: true,
            mockDirectory: 'mock', // 测试数据存放目录
            // URL 跟本地路径的对应关系，有内置类型：ac af hci acdc bbc，也可以自定义函数实现，返回一个真实的本地文件即可
            mockMapping: 'bbc',
            proxyTable: {
                '/bbc': {

                    target: 'http://1.1.1.1', // 目标地址，比如 http://localhost/bbc => https://1.1.1.1/bbc
                    // 发送到目标服务器时添加自定义头部
                    headers: {
                        host: '1.1.1.1'
                    },
                    onProxyReq: undefined, // proxy 定制，转发到目标服务器前可以hook到本地json
                    onProxyRes: undefined // 代理数据返回时触发，可以修改后台返回的数据，比如统一添加http头部等
                }
            }
        }
    };
