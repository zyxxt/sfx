
## 使用方式

    sfx init [options] <template>

## 框架目录结构

公司存在的框架结构复杂凌乱，不同产品线内部都不统一，经常出现跨项目组移文件后跑不起来的问题，经过公司多个项目开发整理了下面这一套完整的框架结构，以后公司所有的框架都按此目录结构处理。

    - project-name
        - lib/                              // 打包需要依赖的可执行工具，比如: nodejs, yarn
            + node-v7.2.0-linux-x64/
            + yarn-0.21.3-linux-x86_64/
        - mock/                             // 本地调试时需要加载的本地文件
            - cgi-bin/
                  login.cgi.js              // 作为一个 nodejs 模块加载，需要导出 exports.mockData
                  ...
        - src/                              // 项目相关代码都放在此目录
            - home/                         // 项目具体业务代码，按模块目录分
                - mod_index/                // 某个入口模块
                      index.js              // 需要作为 webpack.entry 入口引入
                - mod_login/
                      index.js
                + mod_.../
            - common/                       // 项目相关通用样式、库、组件等，可方便移植
                - css/
                      normalize.css
                      main.css
                - util/                     // 库函数
                    + validation/           // 验证
                    + validations/
                      rsa.js                // 具体库函数
                      ajax.js
                      ...
                - widget/                   // 组件，跟业务无关，方便其它项目移植 
                    + tree/
                    + paging_bar/
                    + ...
              _login.html                   // 登录页面
              _index.html                   // 首页，由于是单页面，只需要一个首页即可
              favicon.ico                   // 浏览器地址栏图标
              robots.txt                    // 防止爬虫
              index.php                     // 上面_开头的html文件是UI专用，发布包后台需要读取返回
        - static/                           // 静态资源目录，打包会整个目录拷贝，生成的js文件也会放这目录
            + fontawesome/
            + ...
        + node_modules/                     // node 包
        + dist/                             // 打包后会自动生成，不需要关注
          .babelrc                          // babel 配置文件
          .editorconfig                     // 编辑器IDE配置
          .eslintignore                     // eslint 排除
          .eslintrc.js                      // eslint 配置文件
          .npmrc                            // 指定内部源 http://200.200.151.26:7001/
          .yarnrc                           // 指定内部源 http://200.200.151.26:7001/
          yarn.lock                         // 固定版本号，防止包版本不一致引发其它问题
          npm-shrinkwrap.json               // 固定版本号，防止包版本不一致引发其它问题
          package.json                      // node 配置
          sfx.config.js                     // sfx 配置文件
          install.sh                        // 打包脚本
          Makefile                          // 调用install.sh

上面这块即是一个完整项目应该具有的框架结构，以后所有新项目都必须采用上面的结构，这样方便代码管理与维护，也方便代码移植等

!> 当然不需要的目录是可以删除掉的，但是总体结构不允许再做改变

## 内置模板

- [vue_simple](#vue_simple)
- vue_onepage
- ac
- ...

### vue_simple

仅提供一个简单的`vue`例子，学习使用

### vue_onepage

`BBC`项目主体结构，适用采用`vue`的单页面，内部已经集成组件库[sf-vue-component](http://200.200.151.26:800/sf-vue/sf-vue-component)，是一套完整的项目，只需要关心具体的业务代码即可。

### ac

`AC运营平台`项目主体结构，适用采用`Extjs`, `SF框架`的单页面，兼容`IE8`
