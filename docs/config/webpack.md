?> `sfx`主要功能是封装了`webpack`，但是对于`webpack`本身的功能，都是对外开放的，外部可以直接配置后覆盖`sfx`内置默认配置 

支持的`webpack`相关配置如下：

- [entry](/config/webpack/entry)
- [output](/config/webpack/output)
- [loaders (module.rules)](/config/webpack/loaders)
- [resolve](/config/webpack/resolve)
- [sourceMap (devtool)](/config/webpack/source_map)
- [externals](/config/webpack/externals)
- [plugins](/config/webpack/plugins)

这些配置支持原生默认的方式，也支持函数调用返回值的形式，比如：

    // webpack 本身配置方式
    module.export = {
        entry: {
            ext_all: [
                './src/ac/ext_all.js'
            ],
            framework_all: [
                './src/ac/framework_all.js'
            ]
        }
    };

    // sfx 还支持函数调用的方式
    module.exports = {
        /**
         * @param {String} NODE_ENV 当前环境：development, production
         * @param {*}      entry    sfx内置默认配置，有些配置需要改掉内部的配置
         * @return {*}              返回webpack需要的配置
         */
        entry (NODE_ENV, entry) {
            return {
                ext_all: [
                    './src/ac/ext_all.js'
                ],
                framework_all: [
                    './src/ac/framework_all.js'
                ]
            };
        }
    };
