/**
 * Created by zhangyuantao on 2017/4/18.
 */

let path = require('path');
const SFX_CONFIG = require('../lib/config');

function getSfxConfig (key, defaultValue) {
    let ret = defaultValue;
    let sfxConfig = SFX_CONFIG[key];
    if (typeof sfxConfig === 'function') {
        ret = sfxConfig(process.env.NODE_ENV, defaultValue, path.resolve(__dirname, '../node_modules'));
    } else if (typeof sfxConfig !== 'undefined') {
        ret = sfxConfig;
    }
    return ret;
}

module.exports = getSfxConfig;
