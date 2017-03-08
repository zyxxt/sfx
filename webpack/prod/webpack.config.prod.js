/**
 * Created by zhangyuantao on 2017/3/6.
 */

let merge = require('webpack-merge');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let SFX_CONFIG = require('../../lib/config');

let baseWebpackConfig = require('./../webpack.config.base.js');
let styleLoaders = require('./../loader/style_loaders');

module.exports = merge(baseWebpackConfig, {

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

        
        new webpack.optimize.OccurrenceOrderPlugin(),

        // extract css into its own file
        //new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        new ExtractTextPlugin('static/css/[name].css'),

        ...(function () {
            if (!Array.isArray(SFX_CONFIG.htmlPluginOptions)) {
                return [];
            }
            return SFX_CONFIG.htmlPluginOptions.map(option => new HtmlWebpackPlugin(option));
        } ())

    ]
});
