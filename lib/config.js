/**
 * Created by zhangyuantao on 2017/3/5.
 */

let path = require('path');
let fs = require('fs');
require('../util/logger');

const CWD = process.cwd();
const SFX_CONFIG_FILE = 'sfx.config.js';
const SFX_CONFIG_PATH = path.join(CWD, SFX_CONFIG_FILE);

if (!fs.existsSync(SFX_CONFIG_PATH)) {
    console.error(`can not found sfx.conf.js in current folder`);
}

module.exports = require(SFX_CONFIG_PATH);


