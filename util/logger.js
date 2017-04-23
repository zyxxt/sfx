/**
 * Created by zhangyuantao on 2017/3/5.
 */

let log4js = require('log4js');
const SFX_CONFIG = require('../lib/config');

log4js.configure({
    appenders: [
        {
            "type": "console"
        }
    ],
    replaceConsole: false
});
log4js.setGlobalLogLevel(SFX_CONFIG.logLevel || 'INFO');

module.exports = log4js;
