`webpack`打包时默认会把对应`entry`依赖的文件全都打包在一起，看下面的例子：

    // webpack.config.js
    module.exports = {
        entry: {
            app1: [
                'src/home/mod_page1
            ],
            app2: [
                'src/home/mod_page2
            ]
        }
    };

    // page1
    let $ = require('jquery');
    module.exports = {...}

    // page2
    let $ = require('jquery');
    module.exports = {...};

对于上面的两个页面，都会依赖`jquery`，根据`webpack`的打包规则，默认会把所有依赖的文件全都打包在一起，这样会导致一个很严重的问题，生成的`app1.js`、`app2.js`都会把`jquery`打包到自身的文件中去，对于这种问题，下面介绍几种方法，对这些第三方的模块代码进行打包。不同的方式都要相应的优缺点，可以根据产品线情况自行处理

- [CommonsChunkPlugin](webpack/common?CommonsChunkPlugin)
- [DllReferencePlugin](webpack/common?DllReferencePlugin)
- [output/libraryTarget](webpack/common?libraryTarget)

## CommonsChunkPlugin

这种是最常见的打包方式，使用方式如下：

    // webpack.config.js
    module.exports = {
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module, count) {
                    // 可以根据路径或者模块引用次数，是否要单独提取
                    return count > 1;
                }
            }),
            // 把webpack相关runtime文件再次提取
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor']
            })
        ]
    };

该插件会根据`minChunks`配置，把公共代码单独提取，生成一个`vendor`文件。对于`minChunks`配置可以根据路径、引用次数等方式，判断是否要打包，比如下面的判断可以把引用`node_modules/`目录的`js`文件都认为是第三方代码，单独合在一起

    minChunks: function (module) {
        return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
                path.join(__dirname, '../node_modules')
            ) === 0
        )
    }

!> 生成的`vendor.js`文件需要在模块加载前就先加载

### 优点

该方案优点是配置简单，引用这个插件就可以把所有公共代码打包在一起，跟业务代码分离

### 缺点

有一个很严重的缺点：**只能有一个vendor.js**，无法再对`vendor.js`进行分片，全部第三方代码只能打包在一起。如果引入的第三方代码过多，会导致`vendor.js`文件相当大，按`webpack`的规定超过`300K`的代码就要优化改进。

### 适应场景

第三方代码不多时可简单配置生效

## DllReferencePlugin

该方案是类似`windows`的动态链接库`dll`的实现，打包时分两步：

1. 首先把第三方代码单独打包成一个dll
2. 业务代码打包时指定引用这些dll文件

举个例子：

    // webapck.dll.config.js
    module.exports = {
        entry: {
            jquery_all: [
                'jquery',
                'src/home/mod_plugins/a',
                'src/home/mod_plugins/b',
            ]
        },
        plugins: [
            new webpack.DllPlugin({
                name: '[name]',
                path: path.join(dist, 'thirdFolder', './[name]_manifest.json'),
                context: path.join(dist, 'thirdFolder')
            })
        ]
    };

    // webpack.config.js
    module.exports = {
        plugins: [
            new webpack.DllReferencePlugin({
                context: path.join(dist, 'thirdFolder'),
                manifest: require(path.join(dist, 'thirdFolder', './jquery_all_manifest.json')),
                name: 'jquery_all'
            })
        ]
    };

`webpack.dll.config.js`打包时会把`jquery`和它的插件都打包在一起，打包后会生成以下两个文件：

- jquery_all.js
- jquery_all_manifest.json

`jquery_all_manifest.json`会记录每个文件对于的`chunkid`，格式如下：

    {
        name: 'jquery_all',
        content: {
            './node_modules/jquery/dist/jquery.js': { id: 0 },
            './src/home/mod_plugins/a': { id: 1 },
            './src/home/mod_plugins/b': { id: 2 },
        }
    }

`webpack.config.js`打包时需要引入`manifest.json`文件，当业务代码`requrey('jquery')`时可以通过上面的`id`自动定位，用这种方式可以完全手动控制把第三方代码单独打包

!> 打包出来的第三方模块`jquery_all.js`必须手动在业务代码之前加载，比如可以在`html`里手动用`<script>`引入。例如：

    <html>
    <head>
        <script type="text/javascript" src="./3parts/jquery_all.js"></script>
    </head>
    </html>

### 优点

该方案可以手动控制各个第三方模块，配置粒度很细，完全把第三方代码的打包合并方式交给开发者自己控制

### 缺点

配置繁琐，需要自己手动控制。而且该方案打包时需要分两步执行，即需要调用`webpack`执行两次才行，对于`webpack-dev-server`本地调试时，需要先打第三包才可运行。而且对于第三方代码如果有改动时都需要重新打包，本地调试时无法实时动态编译

### 适应场景

`node_modules/`下面的文件都可以用这种方式打包，即不会变动的代码、开发人员也不会去手动改源码的代码

## libraryTarget

该方案是把第三方的代码打成一个支持`umd`的库，业务代码可以直接引入该库即可使用。该方案类似上面的`DllReferencePlugin`，仍然是分两步执行：

1. 首先把第三方代码单独提取打包成一个`umd`格式的文件
2. 业务代码时不可以直接使用第三方的代码，而是引入上面打出来的文件

举个例子：

    // webpack.umd.jquery.config.js
    module.exports = {
        entry: {
            myjQuery: [
                'src/home/mod_common/jquery/index'
            ]
        },
        output: {
            libraryTarget: 'umd',
            library: 'myjQuery'
        }
    };

    // home/mod_common/jquery/index.js
    let $ = require('jquery');
    let echart = require('echart');
    module.exports = { $, echart };

    // page1.js
    let { $ } = require('third/myJquery.js');
    
`webpack.umd.jquery.config.js`即把第三方代码都重新打包发布，打包成`umd`的形式可以兼容`amd`、`cmd`、全局变量等方式引用。

### 优点

相比`DllReferencePlugin`，该方案生成的文件直接用`<script>`标签引入即可使用，也可以直接做为全局变量使用

### 缺点

业务代码引用时必须要改原来的`require`，打包时仍然要分成两步执行

### 适应场景

自己写的库函数，比如`util`目录等，打包后不仅自己可以直接使用，其它项目也可以直接拷贝便可使用。

## 配合使用

通过上面的对比可以清晰知道这三个方案的优缺点，使用时一般会同时使用，以产品线`BBC`为例，项目上引用了以下代码：

- jquery
- highchart
- echart
- SFVueComponent
- wind-dom
- popper
- ...

这么多的第三方代码要怎么合理打包呢？

1. 首先，对于`jquery`、`highchart`、`echart`这些大头，永远都不会自动去改动的代码，使用`DllReferencePlugin`的方式，单独打成`dll`模块
2. 其次，对于`wind-dom`等这类第三方小代码直接使用`CommonsChunkPlugin`方案，打成一个`vendor`文件
3. `SFVueComponent`这个是我们自己实现的一个组件库，就不会跟业务代码打包在一起，而是打成一个独立的`umd`包，这样其它产品线如果有需要可以直接拷贝使用

?> 如果你觉得上面的配置繁琐，推荐使用我们的脚手架[sfx](http://200.200.151.26:800/sfx/sfx)，内部专门对第三方代码作了配置处理，只需要配置第三方代码入口即可。