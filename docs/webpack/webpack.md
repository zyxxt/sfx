
`webpack`是一个现代的`JavaScript`应用程序的模块打包器(module bundler)。当`webpack`处理应用程序时，它会递归地构建一个依赖关系图表`(dependency graph)`，其中包含应用程序需要的每个模块，然后将所有这些模块打包成少量的`bundle`由浏览器加载。

![http://200.200.151.26/blog/wp-content/uploads/2017/06/QQ五笔截图未命名.png](http://200.200.151.26/blog/wp-content/uploads/2017/06/QQ五笔截图未命名.png)

?> `webpack`会根据依赖关系，把相关联的所有资源文件打包在一起，整个过程无须手动处理，只需要需要一个入口`entry`

它主要包含下面四个核心概念：

- [入口（entry）](webpack/webpack?id=入口（entry）)
- [输出（output）](webpack/webpack?id=输出（output）)
- [loader](webpack/webpack?id=loader)
- [插件（plugins）](webpack/webpack?id=插件（plugins）)

## 入口（entry）

配置`webpack`的打包入口文件

看下面的例子：

    module.exports = {
        entry: {
            app: [
                './src/home/mod_launch/index.js'
            ]
        }
    };

执行时，`webpack`会自动分析`./src/home/mod_launch/index.js`的依赖关系，它会把所有依赖的文件打包生成`app.js`，详情可参考：[https://webpack.js.org/configuration/entry-context/#entry](https://webpack.js.org/configuration/entry-context/#entry)

## 输出（output）

配置打包输出时文件的目录格式等

看下面的例子：

    module.exports = {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[hash].js'
        }
    };

执行后，会在`dist`目录生成类似`js/app.we43432jh432.js`的文件，该文件直接用`html`引入即可运行。详情可参考：[https://webpack.js.org/configuration/output/](https://webpack.js.org/configuration/output/)

## loader

文件加载器，需要把不同格式的文件，比如`html`、`css`等文件转化成模块，这样才可被`webpack`识别，作为模块添加到依赖图表中

看下面的例子：

    module.exports = {
        module: {
            rules: [{
                text: /\.css$/,
                use: 'style-loader'
            }]
        }
    };

对于常用的资源文件都已经有相应的加载器了，只需要配置好即可。当然有额外需要也可以自己实现，比如lxj写的[tpl-loader](http://200.200.151.26:7005/package/@sxf/tpl-loader)，详情可参考：[https://webpack.js.org/configuration/module/#module-rules](https://webpack.js.org/configuration/module/#module-rules)

## 插件（plugins）

可对`webpack`打包过程整个生命周期进行扩展，比如打包后压缩等功能都可以通过扩展实现

看下面的例子：

module.exports = {
    module.exports = {
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
    };
};

详情可参考：[https://webpack.js.org/configuration/plugins/](https://webpack.js.org/configuration/plugins/)
