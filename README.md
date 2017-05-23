# sfx

> 脚手架，支持打包、本地调试、测试相关功能，主要封装了`webpack2`，内置提供了常用的`loader`，`plugins`等

## 使用场景

- 快速初始化项目框架代码，无需手动拷贝框架文件
- 业务代码与打包部署分离，编写业务时只需关心业务逻辑，不再需要去关心合并压缩、目录存放等问题
- 使用包管理，方便引入第三方库代码，无须在项目时单独维护第三方代码
- 完美兼容`webpack`
- 针对`Extjs`提供`IE8`支持

## 安装

    git clone --origin sf --branch sf git@200.200.151.26:sfx/sfx.git
    cd sfx
    yarn install
    npm link

> 尽量都用`yarn`作为包加载器吧，这个速度相比`npm`会快很多，可参考：[快速、可靠、安全的依赖管理工具](https://yarn.bootcss.com/docs/install.html)

上面命令执行成功后，便可全局使用`sfx`，可通过`sfx --help`查看已经支持的功能（*更多功能还在继续完善*）

![sfx --help](http://200.200.151.26/blog/wp-content/uploads/2017/05/intro.png)

## 使用例子

脚手架运行时，需要在项目的根目录下面先创建一个`sfx.config.js`配置文件，`sfx`运行时会自动读取该文件，该文件主要功能是扩展内置的`webpack`配置。

### 简单的配置：

    const NODE_ENV = process.env.NODE_ENV; // production, development
    module.exports = {
        version: '1.0',
        eslint: {
            // 具体配置可以参考以下链接: http://eslint.org/docs/developer-guide/nodejs-api#cliengine
            // 指明需要 eslint 的目录
            files: ['src']
        },
        sourceMap: 'source-map',
        uglify: false, // 是否启用压缩
        logLevel: 'DEBUG', // 输出所有调试日志 INFO DEBUG
        // webpack 的入口配置
        entry: {
            app: [ './src/home/mod_launch/fire.js']
        },
        // 第三方代码单独打包，相比CommonsChunkPlugin的优秀在于可以手动指明合并哪些模块
        thirdEntry: {
            vueAll: [ 'vue', 'vue-resource' ]
        },
        thirdDist: THIRD_DIRECTORY,
        staticDirectory: STATIC_DIRECTORY, // 静态资源目录，比如字体、一些大图片等
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

`sfx`的大部分配置是`webpack`本身的配置，比如：`entry`, `output`, 脚手架的作用是把`webpack`大部分配置先封装好，正常使用时无需像`webpack`一样配置那么多，特别是对于各种文件加载器`loader`, `sfx`内部几乎把常用的都涵盖到了，比如：`babel-loader`, `jshint-loader`, `style-loader`等等，如果需要自定义，`sfx.config.js`本身也可以支持扩展，如下：

    module.exports = {
        ...
        loaders (nodeEnv, loaders) {
            loaders.push({
                test: /\.(tpl)$/,
                loader: '@sxf/tpl-loader',
                exclude: /node_modules/
            });
            return loaders;
        }
    };

> 当然，由于是额外的`loader`，你还需要在自己的项目目录安装这些依赖包

    cd your-project
    yarn add @sxf/tpl-loader -D
    // npm install @sfx/tpl-loader -D


### 集成webpack

如上面的例子一样，`sfx`的大部分配置其实就是`webpack`本身的配置，目前支持的`webpack`配置如下：

- `entry`
- `output`
- `loaders (module.rules)` 
- `resolve`
- `devtool`
- `externals`
- `plugins`

### 其它配置

- `version`
- `eslint`
- `uglify`
- `keepStructure`
- `logLevel`
- `thirdEntry`
- `thirdDist`
- `staticDirectory`
- `htmlPluginOptions`
- `dev`

以上参数不清楚的，可以详细参考[帮助文档](./docs/index.html)