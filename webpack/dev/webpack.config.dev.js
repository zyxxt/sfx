/**
 * Created by zhangyuantao on 2017/3/5.
 */

let merge = require('webpack-merge');
let webpack = require('webpack');
let path = require('path');

let getSfxConfig = require('../../lib/getSfxConfig');
const PROJECT_ROOT = process.cwd();

let baseWebpackConfig = require('./../webpack.config.base.js')('dev');

module.exports = function () {
    Object.keys(baseWebpackConfig.entry).forEach(function (name) {
        baseWebpackConfig.entry[name] = [
            path.resolve(__dirname, './mock/inject'),
            path.resolve(__dirname, './client')
        ].concat(baseWebpackConfig.entry[name])
    });
    
    let config = merge(baseWebpackConfig, {

        plugins: [

            new webpack.HotModuleReplacementPlugin(),
            
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
            })
        ]
    });

    config.plugins = getSfxConfig('plugins', config.plugins);

    return config;

};

