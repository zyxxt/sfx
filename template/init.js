/**
 * Created by ued on 2017/4/22.
 */

let exec = require('child_process').exec;
let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
let co = require('co');
let logger = require('log4js').getLogger('template');
let underscoreTemplate = require('underscore.template');

const PROJECT_ROOT = process.cwd();
const JSON_SPACE_LENGTH = 4;
const MATCH_LIST = [
    /\.(jsx?|json|css|html|md|vue|ts)$/
];

/**
 * 匹配上的文件才进行模版替换
 * @param {String} file 文件路径
 * @returns {boolean}   是否匹配成功
 */
function fileMatched (file) {
    let match = false;
    if (/sfx\.config\.js$/.test(file)) {
        return match;
    }
    MATCH_LIST.forEach((reg) => {
        if (reg.test(file)) {
            match = true;
        }
    });
    return match;
}

/**
 * 拷贝文件，并且格式化模版：<%- xxx %>
 * @param {String} src    源目录
 * @param {String} dist   目的路径
 * @param {Object} option 模版数据
 */
function _copy (src, dist, option) {
    if (!fs.existsSync(src)) {
        logger.error(`not found: ${src}`);
        return;
    }
    if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dist)) {
            fs.mkdirSync(dist);
        }
        fs.readdirSync(src).forEach(function (file) {
            let _src = path.join(src, file);
            let _dist = path.join(dist, file);
            _copy(_src, _dist, option);
        });
    } else {
        if (fileMatched(src)) {
            fs.writeFileSync(dist, underscoreTemplate(fs.readFileSync(src).toString(), option));
            logger.info(`file: ${dist}. parsed`);
        } else {
            fs.writeFileSync(dist, fs.readFileSync(src));
            logger.info(`file: ${dist}. copied`);
        }
    }
}

/**
 * 获取用户在控制台的输入，done
 * @param {String} msg          提示信息
 * @param {String} defaultValue 默认值
 * @returns {Function}          返回函数做为generator的next返回值，gen.next().value(function () { next... })
 */
function prompt (msg, defaultValue) {

    /**
     * 获取用户在控制台的输入，完成时执行done通知generator执行next
     * @param {Function} done 回调
     */
    return function (done) {
        process.stdout.write(msg);
        process.stdin.setEncoding('utf8');
        process.stdin.once('data', function (val) {
            done(null, val.trim() || defaultValue);
        }).resume();
    };
}

/**
 * 提示用户输入项目基本信息，完成后保存成json返回
 * @returns {*}
 */
function *stdIn () {
    let option;
    while (true) {
        option = {
            projectName: PROJECT_ROOT.replace(path.dirname(PROJECT_ROOT), ''),
            version: '1.0.0',
            description: 'awesome project'
        };
        option.projectName = yield prompt(`Project name: (${option.projectName}) `, option.projectName);
        option.version = yield prompt(`version: (${option.version}) `, option.version);
        option.description = yield prompt(`description: (${option.description}) `, option.description);

        console.log('\n', JSON.stringify(option, true, JSON_SPACE_LENGTH));
        let sure = yield prompt('is this OK? (y/n)', 'y');
        if (sure !== 'n' && sure !== 'N') {
            break;
        }
    }
    return option;
}

/**
 * 检测当前环境是否正常
 * 1、当前目录是否已经存在其它文件
 * 2、node, npm 版本是否OK
 *
 */
function checkEnv () {
    if (fs.readdirSync(PROJECT_ROOT).length) {
        logger.error('current folder is not empty.');
        process.exit(1);
    }
}

/**
 * 开始拷贝文件，根据用户选择的模版，从template拷贝到到用户的当前PROJECT_ROOT路径
 * @param {Object} option
 */
function copy (option) {
    logger.info('copy template...');
    let src = path.join(__dirname, option.templateName);
    let dist = path.join(PROJECT_ROOT, '/');
    _copy(src, dist, option);
    logger.info('copy completed!\n');
}

/**
 * yarn install
 * @returns {Function}
 */
function install () {
    return function (done) {
        logger.info('yarn install, it will take a lot of time, please wait ...');
        exec('yarn install', (err, stdout, stderr) => {
            console.log(stdout);
            console.error(chalk.red(stderr));
            if (err) {
                console.error(chalk.red('Error: npm install error'));
                process.exit(1);
            }
            logger.info('yarn install completed!\n');
            done(null, err);
        });
    };
}

/**
 * npm run build
 * @returns {Function}
 */
function build () {
    return function (done) {
        logger.info('sfx build ...');
        exec('sfx build', (err, stdout, stderr) => {
            console.log(stdout);
            console.error(chalk.red(stderr));
            if (err) {
                console.error(chalk.red('Error: sfx build error'));
                process.exit(1);
            }
            logger.info('sfx build completed!');
            done(null, err);
        });
    };
}

exports.run = (templateName, opt) => {
    checkEnv();

    co(function * () {
        let projectConfig = yield stdIn();
        projectConfig.templateName = templateName;

        copy(projectConfig);
        if (opt && opt.install) {
            yield install(projectConfig);
        }
        if (opt && opt.build) {
            yield build(projectConfig);
        }
        
        process.exit();
    }).catch(err => {
        console.error(err);
    });
};
