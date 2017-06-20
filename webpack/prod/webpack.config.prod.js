/**
 * Created by zhangyuantao on 2017/3/6.
 */

let merge = require('webpack-merge');
let webpack = require('webpack');
let path = require('path');
let ID2PathPlugin = require('../plugins/ID2PathPlugin');

let getSfxConfig = require('../../lib/getSfxConfig');
const PROJECT_ROOT = process.cwd();

let baseWebpackConfig = require('./../webpack.config.base.js')('prod');

module.exports = function () {
    let config = merge(baseWebpackConfig, {

        plugins: [
            ...(function () {
                if (!getSfxConfig('vendor', true)) {
                    return [];
                }
                return [

                    // split vendor js into its own file
                    new webpack.optimize.CommonsChunkPlugin({
                        name: 'vendor',
                        minChunks: function (module, count) {

                            // any required modules inside node_modules are extracted to vendor
                            return (
                                module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(
                                    path.join(PROJECT_ROOT, 'node_modules')
                                ) === 0
                            )
                        }
                    }),

                    // extract webpack runtime and module manifest to its own file in order to
                    // prevent vendor hash from being updated whenever app bundle is updated
                    new webpack.optimize.CommonsChunkPlugin({
                        name: 'manifest',
                        chunks: ['vendor']
                    })/*,

                    // 记录webpack生成的module.id跟实际文件路径的对应关系
                    new ID2PathPlugin({
                        name: 'webpack_id_2_path',
                        projectRoot: PROJECT_ROOT,
                        sfxRoot: path.resolve(__dirname, '../../')
                    })*/
                ];
            } ())
        ]
    });

    config.plugins = getSfxConfig('plugins', config.plugins);

    return config;

};
