是否启用`IE8`兼容，当设置为`true`后会调用`transform-es3-property-literals`和`transform-es3-member-expression-literals`进行代码转换，默认值为：`false`

    module.exports = {
        ie8: true
    };

!> 如果项目代码使用es6，则要自己添加`.babelrc`兼容，比如：

## .babelrc

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

上述配置主要解决了以下问题

- `js`关键字浏览器报错，比如`catch`
- `strict`模式在某些浏览器上面兼容问题

## babel-polyfill

项目还需要添加`ES6`的`polyfill`兼容方案，会提供`Promise`、`Map`、`Set`等兼容`ES5`的方案

    <script type="text/javascript" src="./static/es6_polyfill/polyfill.js"></script>

可参考：[https://babeljs.io/docs/usage/polyfill/](https://babeljs.io/docs/usage/polyfill/)

## es5-shim

项目还需要添加`ES5`的`shim`兼容方案，尽最大支持让`IE8`兼容到`ES5`

    <script type="text/javascript" src="./static/es5_shim/es5-shim.min.js"></script>
    <script type="text/javascript" src="./static/es5_shim/es5-sham.min.js"></script>

可参考：[https://github.com/es-shims/es5-shim](https://github.com/es-shims/es5-shim)

当然，该方案只能尽量兼容，是无法做到完美兼容，像以下接口都是兼容不了的：

- `Object.getOwnPropertyDescriptor`
- `Object.defineProperty`
- `Object.defineProperties`
- ...

!> 除了上面这几个接口，还有比较多的接口有一定的兼容问题，这样导致的问题即是某些`ES6`相关的语法最终无法转成相应的`ES3`语法，导致`IE8`仍然有一定的问题，比如`Class`就不允许使用

!> 当然，终级的解决方案也有，就是完全不要用`IE8`