/**
 * Created by zhangyuantao on 2017/3/6.
 */

let merge = require('webpack-merge');
let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let SFX_CONFIG = require('../../lib/config');

let baseWebpackConfig = require('./../webpack.config.base.js')();
let styleLoaders = require('./../loader/style_loaders');

module.exports = function () {
    return merge(baseWebpackConfig, {

        module: {
            loaders: styleLoaders({
                sourceMap: true
            })
        },

        plugins: [

            // http://vuejs.github.io/vue-loader/workflow/production.html
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                    version: `"${SFX_CONFIG.version}"`
                }
            }),

            // 启用压缩
            ...(function () {
                if (SFX_CONFIG.uglify) {
                    return [
                        new webpack.optimize.UglifyJsPlugin({
                            compress: {
                                warnings: false
                            }
                        })
                    ];
                }
                return [];
            } ()),

            // 给使用频率最高的模块分配最短的 id
            new webpack.optimize.OccurrenceOrderPlugin(),

            // 去掉重复的代码
            // new webpack.optimize.DedupePlugin(),

            // 把css单独生成文件
            new ExtractTextPlugin('static/css/[name].css'),

            ...(function () {
                if (!Array.isArray(SFX_CONFIG.htmlPluginOptions)) {
                    return [];
                }
                return SFX_CONFIG.htmlPluginOptions.map(option => new HtmlWebpackPlugin(option));
            } ()),

            ...(function () {
                let plugins = [];
                for (let key in SFX_CONFIG.thirdEntry) {
                    if (SFX_CONFIG.thirdEntry.hasOwnProperty(key)) {
                        plugins.push(new webpack.DllReferencePlugin({
                            context: path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist),
                            manifest: require(path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist, './' + key + '_manifest.json')),
                            name: key
                        }));
                    }
                }
                return plugins;
            } ()),

            // split vendor js into its own file
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module, count) {
                    
                    // any required modules inside node_modules are extracted to vendor
                    return (
                        module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(
                            path.join(__dirname, '../node_modules')
                        ) === 0
                    )
                }
            }),

            // extract webpack runtime and module manifest to its own file in order to
            // prevent vendor hash from being updated whenever app bundle is updated
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor']
            }),

            // 其它插件扩展
            ...(SFX_CONFIG.plugins || [])

        ]
    });
};
