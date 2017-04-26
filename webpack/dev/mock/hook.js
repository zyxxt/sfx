/**
 * Created by ued on 2017/4/22.
 */

let path = require('path');
let fs = require('fs');
let logger = require('log4js').getLogger('hook');

const PROJECT_ROOT = process.cwd();
const SFX_CONFIG = require('../../../lib/config');
const MOCK_DIRECTORY = SFX_CONFIG.dev.mockDirectory || 'mock';
const INSIDE_MAPPING = {
    hci: hci,
    bbc: bbc,
    acdc: acdc,
    ac: ac,
    af: af
};

function hci (option) {
    let realPath = path.join(PROJECT_ROOT, MOCK_DIRECTORY, option.path);
    if (fs.existsSync(realPath) && fs.statSync(realPath).isDirectory()) {
        realPath = path.join(realPath, '/index.js');
    } else {
        realPath += '.js';
    }
    if (!fs.existsSync(realPath)) {
        return '';
    }
    return realPath;
}

function bbc (option) {
    let path = option.path;
    if (path.slice(-1) === '/') {
        option.path = path.slice(0, -1);
    }

    return hci(option);
}

function acdc (option) {
    let data = option.data;

    // launch.php 的提示才需要读app_args，要不仍然是CGI
    if (!/launch\.php$/.test(option.path)) {
        return ac(option);
    }
    try {
        data = JSON.parse(data);
    } catch (e) {
        data = {

        };
    }
    if (!data || !data.app_args || !data.app_args.name) {
        return '';
    }
    let realPath = path.join(PROJECT_ROOT, MOCK_DIRECTORY);
    data.app_args.name.split('.').forEach(function (name, index, arr) {
        realPath = path.join(realPath, name + (index === arr.length - 1 ? '.js' : ''));
    });
    if (!fs.existsSync(realPath)) {
        return '';
    }
    return realPath;
}

function ac (option) {
    let realPath = path.join(PROJECT_ROOT, MOCK_DIRECTORY, option.path + '.js');
    if (!fs.existsSync(realPath)) {
        return '';
    }
    return realPath;
}

function af (option) {
    return ac(option);
}

function mapPath (option) {
    let realPath;
    let mockMapping = SFX_CONFIG.dev.mockMapping;
    if (typeof mockMapping === 'function') {
        realPath = mockMapping(Object.assign({}, option, {
            insideMapping: INSIDE_MAPPING
        }));
    } else {
        realPath = INSIDE_MAPPING[mockMapping] ? INSIDE_MAPPING[mockMapping](option) : ac(option);
    }
    return realPath;
}

function getMockOptions (proxyOption) {
    logger.debug('get mock options...');
    let realPath = mapPath(proxyOption);
    if (!realPath) {
        logger.debug(`can not find local mock file: ${proxyOption.path}`);
        return {
            enable: false
        };
    }
    logger.log(`mock map path: ${realPath}`);

    // 每次都重新去加载数据
    require.cache[require.resolve(realPath)] = null;
    let mockModule = require(realPath);

    if (!mockModule || typeof mockModule.mockData !== 'function') {
        logger.debug(`can not find "mockData () {}" function in mock file`);
        return {
            enable: false
        };
    }
    return {
        enable: typeof mockModule.check === 'function' ? !!mockModule.check(proxyOption) : true,
        data: mockModule.mockData(proxyOption)
    };
}

module.exports = (proxyReq, req, res, options) => {
    logger.info('waiting for req data');

    let data = new Buffer(0);
    req.on('data', function (chunk) {
        data = Buffer.concat([data, chunk]);
    });

    req.on('end', function () {

        // 前端请求的数据内容
        logger.info(`receive data: ${data.toString() || '[nothing]'}`);

        // 这里再根据情况判断是不是要本地mock数据
        let option = {
            path: req.path,
            data: data.toString(),
            method: req.method.toLowerCase(),
            req: req,
            res: res,
            options: options
        };
        let mockOptions = getMockOptions(option);
        logger.info(`get mock options: ${JSON.stringify(mockOptions)}`);

        if (mockOptions && mockOptions.enable) {

            logger.info('proxyReq destroy');
            // 不转发真实请求到后台
            proxyReq.abort();
            proxyReq.destroy();

            // 返回调试数据
            if (typeof mockOptions.data === 'string' || mockOptions.data instanceof Buffer) {
                res.end(mockOptions.data);
            } else {
                res.end(JSON.stringify(mockOptions.data));
            }
        }
    });
};
