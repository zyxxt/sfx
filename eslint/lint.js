/**
 * Created by zhangyuantao on 2017/3/26.
 */

let path = require('path');
let SFX_CONFIG = require('../lib/config');
let CLIEngine = require("eslint").CLIEngine;
let formatter = require('eslint-friendly-formatter');
const PROJECT_ROOT = process.cwd();

let eslintConfig = {
    allowInlineConfig: true,

    configFile: path.resolve(PROJECT_ROOT, '.eslintrc.js'),
    extensions: [
        '.js',
        '.vue',
        '.jsx'
    ],

    ignore: true,
    ignorePath: path.resolve(PROJECT_ROOT, '.eslintignore'),

    useEslintrc: true,

    fix: true,

    files: [
        'src'
    ]
};

if (SFX_CONFIG.eslint) {
    Object.assign(eslintConfig, SFX_CONFIG.eslint);
}

exports.run = function () {

    let cli = new CLIEngine(eslintConfig);

    // lint myfile.js and all files in lib/
    let report = cli.executeOnFiles(eslintConfig.files);

    // only get the error messages
    let errorReport = CLIEngine.getErrorResults(report.results);

    console.log(formatter(errorReport));
    

};

exports.defaultConfig = eslintConfig;
