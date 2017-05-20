# sfx

> 脚手架，支持打包、本地调试、测试相关功能，主要封装了`webpack2`，内置提供了常用的`loader`，`plugins`等

## 安装

    git clone --origin sf --branch sf git@200.200.151.26:sfx/sfx.git
    cd sfx
    yarn install
    npm link

尽量都用

上面命令执行成功后，便可全局使用`sfx`，可通过`sfx --help`查看已经支持的功能（*更多功能还在继续完善*）

![sfx --help](http://200.200.151.26/blog/wp-content/uploads/2017/05/intro.png)

## 使用方式

脚手架运行时，需要在项目的根目录下面先创建一个`sfx.config.js`配置文件，脚手架会