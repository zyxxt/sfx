?> `webpack.entry`入口配置，`webpack`会根据入口，把它依赖的文件打包在一起，具体可参考：[https://webpack.js.org/configuration/entry-context/#entry](https://webpack.js.org/configuration/entry-context/#entry)

    module.exports = {
        ext_all: [
            './src/ac/ext_all.js'
        ],
        framework_all: [
            './src/ac/framework_all.js'
        ],
        override_all: [
            './src/ac/override_all.js'
        ],
        mod_common: [
            './src/home/mod_common/index.js'
        ],
        mod_login: [
            './src/home/mod_login/index.js'
        ]
    };

`webpack`内部是根据`require`关键字，把入口的文件打在一起，对于动态加载的模块代码，需要用`require.ensure`加载，不需要在`entry`这里配置，比如：

    switch (moduleName) {
        case 'home/mod_index/index':
            require.ensure([], require => callback(require('home/mod_index/index')), 'mod_index');
            break;
        case 'home/mod_user/index':
            require.ensure([], require => callback(require('home/mod_user/index')), 'mod_user');
            break;
    }

业务代码可以根据不同的模块动态加载代码，`webpack`本身会自动识别，把这些异步加载的代码也打包，可看下面的截图：

![http://200.200.151.26/blog/wp-content/uploads/2017/06/RTX截图未命名3.png](http://200.200.151.26/blog/wp-content/uploads/2017/06/RTX截图未命名3.png)

!> 对于所有需要异步加载的模块，都要在代码里面手动指明，`require`接口是不可以传入动态参数的，但有下面这种情况例外

- 动态加载的文件相对于当前文件只有一级目录引用

可以举个例子：

    - mod_manager
        - sn/
            index.js
        - ha/
            index.js
        index.js

    // mod_manager/index.js 的内容如下
    let mod = 'sn';
    require(`./${mod}/index.js`);

对于上面这种情况，`webpack`内部会自动尝试把`mod_manager/`目录上面的所有子目录都打包在一起，执行时`webpack`可以动态找到相应的模块。

!> 除了上面这种情况，其它动态引用的方式都是不可行的，必须显式指明具体的模块名