/**
 * Created by zhangyuantao on 2017/3/26.
 */

let path = require('path');
let fs = require('fs');
let logger = require('../util/logger').getLogger('eslint');
let SFX_CONFIG = require('../lib/config');
let CLIEngine = require("eslint").CLIEngine;
let formatter = require('eslint-friendly-formatter');
const PROJECT_ROOT = process.cwd();

const ESLINT_RC = path.resolve(PROJECT_ROOT, '.eslintrc.js');
const ESLINT_IGNORE = path.resolve(PROJECT_ROOT, '.eslintignore');


let eslintConfig = {
    allowInlineConfig: true,

    configFile: fs.existsSync(ESLINT_RC) ? ESLINT_RC : undefined,
    extensions: [
        '.js',
        '.vue',
        '.jsx'
    ],

    ignore: true,
    ignorePath: fs.existsSync(ESLINT_IGNORE) ? ESLINT_IGNORE : undefined,

    useEslintrc: !!fs.existsSync(ESLINT_RC),

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
