拷贝文件时使用，当一些静态文件不是放在`static`目录时，打包后代码里却仍然要使用时可以启用该配置，启用后会自动加载`copy-webpack-plugin`插件

    new CopyWebpackPlugin(keepStructure, {
        debug: SFX_CONFIG.logLevel && SFX_CONFIG.logLevel.toLowerCase() || false
    });

`keepStructure`配置的格式返回必须是一个`Array`数组

    const ASSETS_ROOT = path.resolve(__dirname, 'dist');
    module.exports = {

        // 拷贝php文件
        keepStructure (nodeEnv, keepStructure) {
            if (nodeEnv === 'development') {
                return;
            }
            let php = [{
                from: path.join(__dirname, './src/index.php'),
                to: path.join(ASSETS_ROOT, 'index.php')
            }, {
                from: path.join(__dirname, './src/php/platform.php'),
                to: path.join(ASSETS_ROOT, '/php/platform.php')
            }, {
                from: path.join(__dirname, './src/login.php'),
                to: path.join(ASSETS_ROOT, 'login.php')
            }];
            return php;
        }
    };

具体参考：[https://github.com/kevlened/copy-webpack-plugin](https://github.com/kevlened/copy-webpack-plugin)