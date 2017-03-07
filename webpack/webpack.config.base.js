/**
 * Created by zhangyuantao on 2017/2/26.
 */

let path = require('path');
let webpack = require('webpack');
let cssLoaders = require('./loader/css_loaders');
const SFX_CONFIG = require('../lib/config');
const PROJECT_ROOT = process.cwd();

// eslint 检验
const PRE_LOADERS = [

    // vue
    {
        test: /\.vue$/,
        loader: 'eslint',
        include: PROJECT_ROOT,
        exclude: /node_modules/
    },

    // js | jsx
    {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: PROJECT_ROOT,
        exclude: /node_modules/
    }
];

const LOADERS = [
    {
        test: /\.vue$/,
        loader: 'vue'
    },
    {
        test: /\.js$/,
        loader: 'babel',
        include: PROJECT_ROOT,
        exclude: /node_modules/
    },
    {
        test: /\.json$/,
        loader: 'json'
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
            limit: 10000,
            name: 'static/img/[name].[hash:7].[ext]'
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
            limit: 10000,
            name: 'static/fonts/[name].[hash:7].[ext]'
        }
    }
];

console.log(JSON.stringify(SFX_CONFIG.entry, false, 4));

let entry = {};
const INJECT_CLIENT = path.join(__dirname, './dev/client');
for (let key in SFX_CONFIG.entry) {
    if (SFX_CONFIG.entry.hasOwnProperty(key)) {
        let files = SFX_CONFIG.entry[key];
        if (Array.isArray(files)) {
            files = [
                INJECT_CLIENT,
                ...files
            ];
        } else {
            files = [
                INJECT_CLIENT,
                files
            ];
        }
        entry[key] = files;
    }
}

module.exports = {

    devtool: 'source-map',

    entry: entry,

    resolve: {
        extensions: ['.jsx', '.js', '.vue'],
        // fallback: [path.join(PROJECT_ROOT, 'node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.join(PROJECT_ROOT, 'src'),
            'assets': path.join(PROJECT_ROOT, 'src', 'assets')
        }
    },
    // resolveLoader: {
    //     fallback: [path.join(PROJECT_ROOT, 'node_modules')]
    // },

    module: {

        // 新版本的webpack把自定义的字段全部删除了，比如下面的preLoaders, loaderOptionsPlugin都是这个原因
        // preLoaders: PRE_LOADERS,

        loaders: LOADERS

    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    formatter: require('eslint-friendly-formatter')
                },

                vue: {
                    autoprefixer: true,
                    loaders: cssLoaders({
                        sourceMap: true
                    }),
                    postcss: [
                        //require('autoprefixer')({
                        //    browsers: ['last 2 versions']
                        //}),
                        require('postcss-cssnext')()
                    ]
                }
            }
        })
    ]

};
