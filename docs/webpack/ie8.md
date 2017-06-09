
为了提升整个前端的开发效率，目前已经在很多产品线上面使用`ES6`编写代码，`ES6`虽然好用，效率又高，但是对于公司的老产品线，要兼容到`IE8`，`ES6`则完全无法用起来，即使有`babel`这种神器可以把`ES6`代码转换成`ES5`兼容大部分浏览器，但仍然支持不了`IE8`

## 问题列表

1. JS关键字，比如`export`、`catch` ...

比如下面的代码在IE8都是会报错，无法执行：
```
let p = new Promise(...);
// catch 是关键字，导致报错
p.catch(() => { ... });
```
2. `Object.defineProperty`等`ES5`相关接口都不能用
```
Object.defineProperty(...)
Object.getOwnPropertyDescriptor(...)
```
3. 函数定义冲突
```
function add () {
    ...
}
let o = {
    add: function add () {
        // 这里的函数定义在IE8下面会把上面的覆盖掉
    }
};
```

!> 上面这类问题虽然写业务代码时可以自己避免，但是`webpack`默认打包出来的代码都会有这类问题

目前网上没有一个完善的解决方案，比如：`es3ify-loader`，该方案会导致生成的`map`文件跟源代码文件对应不了。

## sfx解决方案

### babel转化业务代码

首先解决的是`babel`转化`ES6`遇到的问题，可以参考下面这个`.babelrc`

    {
        "presets": [
            [
                "es2015",
                {
                    "modules": false,
                    "loose": true
                }
            ],
            "stage-0"
        ],
        "plugins": [
            "transform-es3-property-literals",
            "transform-es3-member-expression-literals",
            [
                "transform-es2015-modules-commonjs",
                {
                    "strict": false,
                    "loose": true
                }
            ],
            [
                "transform-strict-mode",
                {
                    "strict": false
                }
            ]
        ],
        "comments": false
    }

上面的配置解决了以下问题：

1. `modules: false`不再使用`ES6`的模块加载方式，业务代码只允许使用`module.exports`这种方式进行模块加载
2. `loose: true`不再使用`Object.xxx`这类接口的转化，可以看这里的例子
3. `strict: false`不再使用`strict`模式，该模式会导致`chrome`、`firefox`下面有些语法无法执行
4. `transform-es3-property-literals`、`transform-es3-member-expression-literals`这两个插件可把`JS`本身的关键字添加双引号，比如：`p.catch()` => `p["catch"]()`

通过上面的配置后，会发现所有业务代码都是正常的了，但是会发现在`IE8`上面仍然是无法跑进来的，问题出在`webpack`上。

`webpack`打包除了转化业务代码时，本身也会注入一部分代码，这部分代码如下：

![http://200.200.151.26/blog/wp-content/uploads/2017/06/QQ五笔截图未命名1.png](http://200.200.151.26/blog/wp-content/uploads/2017/06/QQ五笔截图未命名1.png)

其中，`webpack`本身使用了`Promise`、`export`等关键字，这部分代码`babel`是无法转化的。

### sfx转化webpack代码

当`webpack`完成打包后，再次把`JS`关键字做转化，代码如下：

    fs.readdirSync(dir).forEach(file => {
        if (!/\.js$/.test(file)) {
            return;
        }
        let result = require('babel-core').transform(fs.readFileSync(path.join(dir, file)), {
            plugins: [
                "transform-es3-property-literals",
                "transform-es3-member-expression-literals"
            ]
        });
        fs.writeFileSync(path.join(dir, file), result.code);
    });

转化完后，所有的代码都已经不包含`JS`关键字

### polyfill

下来还有另外一个问题`Promise`、`Map`、`Set`等这类接口现代浏览器本身都已经支持，但是低版本浏览器仍然支持不了，还需要添加相应的`polyfill`、`shim`。需要在所有`JS`加载前先把加载这类文件，看下面例子：

    <html>
    <head>
    <script type="text/javascript" src="./static/es6_polyfill/polyfill.js"></script>
    <script type="text/javascript" src="./static/es5_shim/es5-shim.min.js"></script>
    <script type="text/javascript" src="./static/es5_shim/es5-sham.min.js"></script>
    </head>
    </html>

到此，所有浏览器都可以兼容`ES6`写的代码。

?> 如果你觉得上面的配置繁琐，推荐使用我们的脚手架[sfx](http://200.200.151.26:800/sfx/sfx)，内部专门对`IE8`作了配置处理，只需要一个配置即可支持，无须上面繁琐的配置

    module.exports = {
        ie8: true
    };