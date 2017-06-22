
## 封装Webpack

首先从`webpack`的实现说起，可以看下面的图：

![webpack内部流程图](http://200.200.151.26/blog/wp-content/uploads/2017/06/webpack内部流程图.jpg)

`Webpack`作为一个模块加载器，它把所有的资源都认为是一个模块，它不会区别是`js`文件还是`css`、或者是图片资源，对它来说全都没有区别。那么打包时是怎么控制这些资源的加载的呢？

?> 对每类资源文件都需要一个相应的`loader`配置去控制它的加载方式，可以参考：[webpack简介](/webpack/webpack)，例如：

    {
        test: /\.js$/,
        loader: path.resolve(__dirname, '../node_modules/babel-loader'),
        query: {
            compact: false
        },
        include: PROJECT_ROOT,
        exclude: /node_modules/
    }

这样每种资源文件要添加相应的配置，会导致整个配置非常长，`sfx`的封装就是把常用的`loader`都添加进来，并且还要提供接口让开发才自己修改

!> 开发者在项目中自己添加的`webpack`配置最终都会使用`webpack-merge`到内部中

`sfx`对于`webpack`这类配置的配置方式都没变化，仍然保持`webpack`本身的配置方式，而且也会提供函数的方式，可以修改内部的默认配置

    module.exports = {
        loaders (nodeEnv, loaders) {
            laoders.push({
                test: /\.(tpl)$/,
                loader: '@sxf/tpl-loader',
                exclude: /node_modules/
            });
            return loaders;
        }
    };

关键实现如下：

    function getSfxConfig (key, defaultValue) {
        let ret = defaultValue;
        let sfxConfig = SFX_CONFIG[key];
        if (typeof sfxConfig === 'function') {
            ret = sfxConfig(process.env.NODE_ENV, defaultValue, path.resolve(__dirname, '../node_modules'));
        } else if (typeof sfxConfig !== 'undefined') {
            ret = sfxConfig;
        }
        return ret;
    }

`sfx`支持所有的`webpack`配置如下，都要可以采用以上的方式进行修改

- `entry`
- `output`
- `loaders (module.rules)` 
- `resolve`
- `devtool`
- `externals`
- `plugins`

## 本地调试实现

![数据mock代理层](http://200.200.151.26/blog/wp-content/uploads/2017/06/proxy.png)

本地服务器预研时确定采用`Express.js`，整个代理层作为它的一个中间件，对所有请求所转发，根据配置的策略转发给后台，或者是直接使用项目中的`mock`数据。

为了方便开发人员跟不同的后台人员联调，代理需要可以直接根据URL，转发到不同的后台CGI，本地服务器运行时需要把这个信息注入，目前比较好的改法是直接在`ajax`请求这里挂钩子，伪代码如下：

    var REMOTE_KEY = 'remote';
    var HTTP_HEADER_KEY = 'dev-remote-addr';
    var reg = new RegExp("(^|&)" + REMOTE_KEY + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var remoteAddr = r && r[2] && decodeURIComponent(r[2]);
    if (remoteAddr) {
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            var ret = open.apply(this, arguments);
            this.setRequestHeader(HTTP_HEADER_KEY, remoteAddr);
            return ret;
        };
    }

然后在中间件这里判断`dev-remote-addr`这个头部字段再做转发，转发前先去判断是否启用本地代理，伪代码如下：

    app.use((req, res, next) => {
        if (!checkMock(req)) {
            return next();
        }
        let remote = getRemoteAddr();
        mock(req, res remote);
    });

项目中创建mock文件，用于判断是否需要启用本地调试，伪代码：

    // 项目目录结构
    - project/
        - mock/
            - cgi-bin/
                test.cgi.js
                xxx.cgi.js

    // test.cgi.js内容
    exports.mockData = option = > {
        let method = option.method;
        let reqData = JSON.stringify(option.data);
        switch (reqData.opr) {
            case 'list':
                return {
                    success: true,
                    data: []
                };
            default:
                // 返回false表示不转发
                return false;
        }
    };
    
?> 这样就可以做到不需要改动任何业务的代码，自动根据`mockData`的返回值判断是否要进行代理，返回`false`的话，则自动转发到相应的后台CGI处理

## 框架模板

主体流程如下：

1. 获取用户输入的框架模板配置
2. 从内置模块中拷贝文件，拷贝过程中把相应的配置插槽更新

对于第一步，可以使用`co-promote`的开源库，获取用户在命令行中的输入内容，伪代码如下：

    function *stdIn () {
        let option = {};
        while (true) {
            option.projectName = yield prompt(`Project name: (${option.projectName}) `, option.projectName);
            option.version = yield prompt(`version: (${option.version}) `, option.version);
            option.description = yield prompt(`description: (${option.description}) `, option.description);
            console.log('\n', JSON.stringify(option, true, JSON_SPACE_LENGTH));
            let sure = yield prompt('is this OK? (y/n)', 'y');
            if (sure !== 'n' && sure !== 'N') {
                break;
            }
        }
        return option;
    }

    co(function * () {
        let options = yield stdIn();
        copyFile(options);
        process.exit();
    });

