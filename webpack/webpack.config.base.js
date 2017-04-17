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
        test: /\.css$/,
        loader: 'css-loader'
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
            limit: 10000,
            name: 'static/img/[name].[hash:7].[ext]'
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
            limit: 10000,
            name: 'static/fonts/[name].[hash:7].[ext]'
        }
    }
];

function getLoaders () {
    let sfxLoaders = SFX_CONFIG.loaders;
    let loaders = LOADERS;
    if (typeof sfxLoaders === 'function') {
        loaders = sfxLoaders(process.env.NODE_ENV, loaders);
    }
    return loaders;
}

function getEntry () {

    let entry = {};
    let sfxEntry = getSfxConfig('entry');
    const INJECT_CLIENT = path.join(__dirname, './dev/client');

    for (let key in sfxEntry) {
        if (sfxEntry.hasOwnProperty(key)) {
            let files = sfxEntry[key];
            if (Array.isArray(files)) {
                files = [
                    ...files
                ];
            } else {
                files = [
                    files
                ];
            }

            // 调试模式
            if (process.env.NODE_ENV === 'develop') {
                files.unshift(INJECT_CLIENT);
            }
            entry[key] = files;
        }
    }
    return entry;
}

function getSfxConfig (key, defaultValue) {
    let ret = defaultValue;
    let sfxConfig = SFX_CONFIG[key];
    if (typeof sfxConfig === 'function') {
        ret = sfxConfig(process.env.NODE_ENV, defaultValue);
    } else if (typeof sfxConfig !== 'undefined') {
        ret = sfxConfig;
    }
    return ret;
}

module.exports = function () {

    return {

        devtool: getSfxConfig('sourceMap'),

        entry: getEntry(),

        output: getSfxConfig('output'),

        externals: getSfxConfig('externals'),

        resolve: getSfxConfig('resolve', {
            extensions: ['.jsx', '.js', '.vue'],
            // fallback: [path.join(PROJECT_ROOT, 'node_modules')],
            alias: {
                'vue$': 'vue/dist/vue',
                'src': path.join(PROJECT_ROOT, 'src')
            }
        }),
        
        // resolveLoader: {
        //     fallback: [path.join(PROJECT_ROOT, 'node_modules')]
        // },

        module: {
            rules: getLoaders()
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
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: `"${process.env.NODE_ENV}"`,
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

            ...(function () {
                let plugins = [];
                let sfxThirdEntry = getSfxConfig('thirdEntry');
                if (sfxThirdEntry) {
                    for (let key in sfxThirdEntry) {
                        if (sfxThirdEntry.hasOwnProperty(key)) {
                            plugins.push(new webpack.DllReferencePlugin({
                                context: path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist),
                                manifest: require(path.join(SFX_CONFIG.output.path, SFX_CONFIG.thirdDist, './' + key + '_manifest.json')),
                                name: key
                            }));
                        }
                    }
                }
                return plugins;
            } ())
        ]

    };
};
