/**
 * Created by zhangyuantao on 2017/4/10.
 */

let merge = require('webpack-merge');
let webpack = require('webpack');
let path = require('path');

let SFX_CONFIG = require('../../lib/config');
let baseWebpackConfig = require('./../webpack.config.base.js')();

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {

    baseWebpackConfig.entry = null;
    baseWebpackConfig.output = null;

    return merge(baseWebpackConfig, {

        entry: SFX_CONFIG.thirdEntry,

        output: {
            path: path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist),
            
            // filename: '[name].[chunkhash].js',
            filename: '[name].js',
            libraryTarget: 'umd',
            library: '[name]'
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: process.env.NODE_ENV === 'testing' ? '"testing"' : '"production"',
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

            new webpack.optimize.OccurrenceOrderPlugin(),

            // 去掉重复的代码
            // new webpack.optimize.DedupePlugin(),

            // 把css单独生成文件
            new ExtractTextPlugin('static/css/[name].css'),

            new webpack.DllPlugin({
                name: '[name]',
                path: path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist, './[name]_manifest.json'),
                context: path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist)
            })
        ]
    });
};

