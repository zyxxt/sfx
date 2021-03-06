

## 需求分析

出于公司精品化的需求，但是对于目前前端的开发是达不到公司要求的，从开发到最终上线，前端的效率不算快，对于某些产品线前端的开发效率可能会成为瓶颈。而且公司目前使用的技术栈结构比较复杂，从开发调试到打包上线，没有统一的平台处理，都是各个产品线内部自己实现，特别是`AF`、`AC`这类老产品线，连前端代码的打包都是跟后台代码耦合在一起的，UI完全无法独立。

!> 为了提高前端从开发到部署上线整个过程的效率，解决开发调试过程中遇到共性问题，针对公司内部已经在使用的各类方案，提出以下最急需解决的问题。`sfx`脚手架最终目标即是解决这些问题，提供统一的开发环境。

- **框架代码移植**

自从公司推行精品化后，产品线突然多了很多，但每到一个新产品线时都要重新搭建UI目录，移植UI框架等，这个过程经常出错，特别是对框架代码不熟悉时，会浪费大量的时间

!> 框架移植完后，还需要根据产品线实际情况做一定的修改，没有一定经验框架代码几乎是改不动的

- **前端代码怎么打包**

前端代码打包时主要要考虑的问题如下：

1. 代码合并压缩
2. 线上代码压缩后怎么调试
3. 代码合并策略是什么，哪些代码合并在一起

对于第一个问题，目前公司采用的方案很多，比如`AF`使用`ant`脚本压缩；`AC`使用`php`在UI加载`js`代码时再做合并压缩处理；`VT`使用`sfis`方案是打包时用`grunt-uglify`插件处理

对于第二个问题，**目前公司所有产品线都没有处理**。上线后的代码全是压缩合并后，没有一定经验的人几乎是无法查问题，需要添加`map`文件才可以解决这类问题

![没有map文件无法调试](http://200.200.151.26/blog/wp-content/uploads/2017/06/RTX截图未命名5.png)

对于第三个问题，老产品线比如`AF`、`AC`使用`deps`，需要第添加一个文件，都要添加一个重名的`deps`文件指明它的依赖列表；`sfis`的方式则可以自动分析依赖，但由于它的策略是按照目录结构打包，业务代码需要自己控制不能出现目录则的相互依赖

`AF`、`AC`使用`deps`，每次添加一个新文件都要自己再添加相应的`deps`

    // AdminPage.js
    var Grid = SF.grid.AdminGrid;
    ...

    // page.deps 文件
    name: SF.AdminPage
    SF.grid.AdminGrid

`sfis`按目录打包合并，看下面的例子，`a.js`、`b.js`本身之间完全没有相互依赖，正常应该都是要可以正常加载才对，但是由于`sfis`是按照`mod_aaa/`、`mod_bbb/`这两个目录打包的，导致最终打包后出现循环引用！

    // mod_aaa/a.js
    var moduleB = requre('../mod_bbb/bbb.js);

    // mod_bbb/b.js
    var moduleA = require('../mod_aaa/aaa.js');

!> 对于这几个打包相关问题各个产品线都有自己一套方案，但是却是无法通用，每次新到一个产品线都要先熟悉一下打包，要不连代码都跑不起来

- **代码组织管理**

前端代码结构没有统一标准，有些产品线还是跟后台脚本耦合在一起，后期维护麻烦，根据不同的产品线主要存在以下问题

1. 怎么处理js依赖关系模块化加载
2. UI框架目录结构怎么组织
3. 重复性的第三方代码太多，业务代码跟第三方代码分离

对于第一个问题，`HCI`使用相对比较好的`cmd`模块加载方案，只是打包时自己小心控制循环引用即可，其它还算是比较先进，但是`AF`、`AC`这类老产品就乱成一团，有使用`deps`加载，也有使用`Extjs4`本身的加载功能，完全无法通用

对于第二个问题，UI框架没有统一的标准，代码能跑起来就没人管了，结构不合理导致新手找文件都是一个难题，比如`AC`前端的`js`代码就有**600多个文件**

第三个问题最严重，目前公司所有产品线的前端代码中，第三方库代码都是跟业务代码混合在一起的，而且经常出来有人为了解决某个需要直接就去改第三方代码里的源代码，导致该第三方库完全没法升级。为了使用某个库的新功能又重新引入了一个不同版本的库，比如`Highcharts`，单单`AC`就有三个版本同时存在！

!> 第三方代码跟业务代码的耦合导致代码的维护性差，要从根源上解决这个问题，就必须把代码结构定义好，禁止把第三方代码放在项目内部，第三方代码应该单独维护

- **前端本地调试，跟后台CGI解耦**

前端代码可以脱离后台CGI，单独跑起来，这样方便开发人员自己本地调度，而且对于UI相关的测试后期都可以不依赖后台环境，UI成为一个独立的APP，可以随时运行，也方便其它人调试移植代码

- **代码单元测试、自动化测试**

目前整个公司的前端的代码都是没有跑过任何测试代码的，代码质量纯粹靠开发人员自己保障，对于一些核心代码，比如框架代码，很容易出来改动引发。需要有一套完善的方案保证代码质量。单元测试、自动化测试、覆盖率分析这几个对代码质量有很大的提升作用

- **代码质量检查**

公司目前对JS代码质量比较松，目前也只有`HCI`、`AC`的代码有通过`jshint`进行代码质量扫描，但该工具有一定的局限性，它本身只有内置的某些规则，无法进行自定义的扩展。经常出现低级错误工具却扫描不出来的问题

## 预研目标

1. 对比分析`grunt`、`glup`、`webpack`等常用的打包方式，跟目前公司使用的`sfis`对比选择一个更加适合公司产品线打包方案
2. 方便管理业务代码与引入的第三方库代码
3. 集成本地调试功能，使得业务逻辑可以完全独立于后台CGI
4. 集成测试功能，可对核心代码做测试并生成覆盖率分析

## 可行性分析

### Grunt VS Glup VS Webpack

这三个是目前前端比较成熟的构建工具，个自都有自己的优缺点跟适应场景，但其实这三个放在一起对比是不公平的，下面这张图主要列出了他们的区别

![构建工具VS编译模块方案对比](http://200.200.151.26/blog/wp-content/uploads/2017/06/v2-ae9253e557d902369b1beaed998061cb_r.jpg)

- TaskRunner
`Gulp`、`Grunt`和`Make(常见于c/cpp）`、`Ant`、`Maven`、`Gradle（Java/Android）`、`Rake`、`Thor（Ruby）`一样，都是是Task Runner。用来将一些繁琐的task自动化并处理任务的依赖关系。

?> `Glup`跟`Grunt`的主要区别在于：`Grunt`是一个任务执行完后再接着执行下一个任务，一般前一个任务执行完后，输出的结果作为下一个任务的输入，效率相对比较慢。`Glup`则采用数据流的方式串行执行，相比`Grunt`的效率提升比较明显

这类构建工具配置简单，对应的插件也比较完善，如果是一个简单的页面，简单的配置即可配置起来，但是对于公司的产品，动辄好几万行代码的管理，想要完善配置起来相当困难

参考目前公司使用的`sfis`解决方案，它本身是基于`Grunt`配置起来的，但是由于公司业务的复杂，整个社区没有完善的插件供我们实现，该解决方案大量代码是我们自己实现，导致目前扩展性相当差，几乎没人能维护起来

- 模块化解决方案
`Webpack`、`Browserify`这类工具是提供整套的模块化解决方案，由于它们本身插件相当完善，同样也可以作为一个构建工具使用，只是相对`Grunt`、`Glup`它的配置复杂，当然它的功能也非常完善，特别适合单页面开发，我们公司大部分页面就是采用单页面开发的。而且`Webpack`起步比较晚，吸收了其它构建工具的大量优点，目前几乎没有短板

?> 结合公司的产品线，由于以下几点考虑最终选择`Webpack`作为整个架手架中代码打包的核心，针对它的复杂的配置作改进，使其作为公司的打包方案

1. 适合单页面开发
2. 本身是一个模块化加载器，任何资源都认为是一个模块处理，不需要用户自己配置即可分析出所有依赖关系，开发者只需要指明入口即可把入口依赖的文件打包在一起，可配置性强
3. 完善的插件系统，`sfis`当初自己实现的大部分功能还有相应的插件实现，对公司已有的产品迁移成本低
4. 提供缓存功能，可增量打包

### sourceMap方便调试

使用`Webpack`打包后的代码可以启用该功能，虽然代码都是合并压缩的，但是在浏览器调试时可以查看到原始文件的内容，如下：

![生成map](http://200.200.151.26/blog/wp-content/uploads/2017/06/RTX截图未命名4.png)

虽然代码都是压缩过的，但是浏览器可以识别出原始文件，方便调试定位问题

![调试有map的js文件](http://200.200.151.26/blog/wp-content/uploads/2017/06/QQ五笔截图未命名2.png)

### 本地调试

本地PC启动一个静态资源服务器，单纯加载`js`、`css`或者静态资源文件，然后对于某一些请求，比喻`*.php`作代理，转发给具体的后台程序，对于这个想法参考了目前常用的静态服务器，最终选型`Express`，可以参考：[Express.js](https://expressjs.com/)

    let app = new Express();
    app.use('/', path.join(__dirname, 'dist'));
    app.use((req, res, next) => {
        // 这里可通过判断不同的请求返回不同的处理
        // 如果是静态资源可以直接调用next();返回即可
    });

从上面的例子可以看出`Express`非常的简单，但同时它也提供相应的接口，可以控制请求的返回内容，这样就可以简单实现一个本地调试的服务器，可以通过策略控制对于某些请求才转发给CGI，其它请求直接返回本地PC的资源文件即可，本地修改的任何代码都不再需要上传到相应的服务器上面，在本地就可以看到效果

### 测试

测试分单元测试和自动化业务代码测试，单元测试一般针对比较核心的功能，比喻框架代码、组件代码，可以极大的减少改动引发，自动化测试目标是解放测试人员，由于另一个UI是完全独立的APP，这样理论上是可以完全在本地PC上面编码测试代码，自动调用浏览器进行全自动化的测试

#### 单元测试

由于使用了上面已经决定使用`Webpack`，所以单元测试时最好也要可以无缝兼容`Webpack`才可以，所以选择网官提供的`karma`+`mocha`+`chai`的解决方案，可以参考：[karma-webpack](https://github.com/webpack/karma-webpack)，该方案自动集成`Webpack`，几乎无需添加什么配置，就可以测试业务代码，参考网官上的例子：

    module.exports = function (config) {
        config.set({

            // to run in additional browsers:
            // 1. install corresponding karma launcher
            //    http://karma-runner.github.io/0.13/config/browsers.html
            // 2. add it to the `browsers` array below.
            browsers: ['PhantomJS'],
            frameworks: ['mocha', 'sinon-chai'],
            reporters: ['spec', 'coverage'],
            files: files,
            preprocessors: preprocessors,
            webpack: webpackConfig,
            webpackMiddleware: {
                noInfo: true
            },
            coverageReporter: {
                dir: './coverage',
                reporters: [
                    { type: 'lcov', subdir: '.' },
                    { type: 'text-summary' }
                ]
            }
        });
    };

!> 该方案还提供了覆盖率分析工具，在单元测试的过程中，会自动生成覆盖率分析文档，

#### 自动化测试

对于UI自动化，目前整个前端业界都没有比较成熟的解决方案，主要是投入产出比比较低，几乎没有大的公司在推这个，对于我们公司业务代码作自动化测试意义不大，但对于复杂组件相当有必要。公司内部的UI组件相当复杂，组件的独立性使得自动化测试可以很大减少人力成本

目前相对成熟的解决方案是使用：`nightwatch`，可以参考：[http://nightwatchjs.org/](http://nightwatchjs.org/)，具体的实现原理如下：

1. 首先通过本地调试功能，在本地PC开启`chrome`浏览器
2. `nightwatch`通过跟`chrome`通讯，可以直接操作页面内部的dom节点
3. 通过操作dom节点的变化判断是否是预期的结果

可以参考下面的例子：

    module.exports = {
        'default e2e tests': function (browser) {

            // automatically uses dev Server port from /config.index.js
            // default: http://localhost:8080
            // see nightwatch.conf.js
            let devServer = browser.globals.devServerURL;
            browser
                .url(devServer)
                .waitForElementVisible('#body', INTERVAL)
                .assert.elementPresent('#nav')
                .assert.elementPresent('#main')
                .end();
        }
    };

### eslint

> 可扩展的JS代码质量扫描工具，可参考：[http://eslint.org/](http://eslint.org/)

它本身的内置规则将近200条，而且支持自定义规则，可以通过插件的方式把`checklist`的大部分规则都覆盖全，比如：

    function checkLastSegment (node) {
        // report problem for function if last code path segment is reachable
    }

    module.exports = {
        meta: { ... },
        create: function(context) {
            // declare the state of the rule
            return {
                ReturnStatement: function(node) {
                    // at a ReturnStatement node while going down
                },
                // at a function expression node while going up:
                "FunctionExpression:exit": checkLastSegment,
                "ArrowFunctionExpression:exit": checkLastSegment,
                onCodePathStart: function (codePath, node) {
                    // at the start of analyzing a code path
                },
                onCodePathEnd: function(codePath, node) {
                    // at the end of analyzing a code path
                }
            };
        }
    };

### 代码组织管理 

重新定义一套完整的UI目录结构，项目中只维护它西峰的业务代码，第三方代码都使用`npm`包加载的方式，不再跟业务代码耦合在一起，比如：`npm install highcharts`，这样就会自动从官网下载最新的`highcharts`源代码，并且会自动放在根目录的`node_modules`目录当中

    - project/
        - node_modules
            + highcharts/
            + jquery/
            + ...

业务代码使用时直接使用`let highcharts = require('highcharts')`即可直接加载访问，该功能`Webpack`本身支持相应的配置

?> 用这种方式可以把第三方代码完全隔离，不再需要在业务代码中维护

!> 推荐使用`yarn`替换`npm`，`yarn`安装后会记录该模块的版本号，这样可以保证多人使用时版本号都是一致的，如果仍然使用`npm`，则务毕使用`shrinkwrap`锁定版本号

#### 打包

第三方代码不再项目上维护后，那打包要怎么处理，打包时仍然需要考虑这个总是，可以参考另外一个文档：[webpack公共代码打包](/webpack/common)，

#### 目录结构

[目录结构例子](/api/init)

### 脚手架cli功能

框架代码拷贝，目前已经有比较成熟的解决方案`yeoman`，可以通过不同的配置生成不同的框架代码，我们的不需要它那么复杂，可参考它重新实现一个简单的即可，原理如下：

1. 通过命令行的方式，让用户填入需要的框架信息
2. 根据用户的输入，从内置的框架模板中获取相应的代码
3. 把代码生成到用户指定的目录即可

整个功能其实就是对手动拷贝并修改做成自动化的形式处理，防止开发者自己犯错。只需要把内置框架模板提供好即可


?> 至此，上面的所有目标都有相应的解决方案可以实现，说明我们的`sfx`是可实现的，需要有详细的设计把上面所有功能整合在一起即可