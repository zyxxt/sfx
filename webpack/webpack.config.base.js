/**
 * Created by zhangyuantao on 2017/2/26.
 */

let path = require('path');
let webpack = require('webpack');
let cssLoaders = require('./loader/css_loaders');
const SFX_CONFIG = require('../lib/config');
const PROJECT_ROOT = process.cwd();

let eslintConfig = require('../eslint/lint');

// eslint 校验
const PRE_LOADERS = [

    // js vue 
    {
        test: /(\.vue|\.js)$/,
        enforce: 'pre',
        include: PROJECT_ROOT,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: Object.assign({

            // 检验出现告警后，是否继续往下检验
            failOnWarning: true,

            // 检验出现错误后，是否继续往下检验
            failOnError: false,
            
            // 格式化输出
            formatter: require('eslint-friendly-formatter')
        }, eslintConfig.defaultConfig)
    }
];

const LOADERS = [

    ...PRE_LOADERS,

    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
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
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
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

let entry = {};
const INJECT_CLIENT = path.join(__dirname, './dev/client');
for (let key in SFX_CONFIG.entry) {
    if (SFX_CONFIG.entry.hasOwnProperty(key)) {
        let files = SFX_CONFIG.entry[key];
        if (Array.isArray(files)) {
            files = [
                ...files
            ];
        } else {
            files = [
                files
            ];
        }
        if (process.env.NODE_ENV === 'develop') {
            files.unshift(INJECT_CLIENT);
        }
        entry[key] = files;
    }
}

module.exports = {

    devtool: 'source-map',

    entry: entry,

    output: SFX_CONFIG.output || {},

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

        rules: LOADERS

    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        
        new webpack.LoaderOptionsPlugin({
            options: {
                // eslint: {
                //     formatter: require('eslint-friendly-formatter')
                // },

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
                },
                context: '/'
            }
        })
    ]

};
