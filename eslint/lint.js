/**
 * Created by zhangyuantao on 2017/3/26.
 */

let path = require('path');
let logger = require('log4js').getLogger('eslint');
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

exports.run = function (files) {

    let cli = new CLIEngine(eslintConfig);
    let eslintFiles = eslintConfig.files;
    if (files && files.length) {
        eslintFiles = files;
    }
    logger.info(`eslint files: ${eslintFiles}`);

    // lint myfile.js and all files in lib/
    let report = cli.executeOnFiles(eslintFiles);

    // only get the error messages
    let errorReport = CLIEngine.getErrorResults(report.results);
    if (errorReport && errorReport.length) {
        console.log(formatter(errorReport));
    } else {
        logger.info('eslint success');
    }
};

exports.defaultConfig = eslintConfig;
