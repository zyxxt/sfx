/**
 * Created by zhangyuantao on 2017/3/5.
 */

const log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            "type": "console"
        },
        {
            "type": "file",
            "filename": "sfx.log",
            "maxLogSize": 20480,
            "backups": 3,
            "category": "relative-logger"
        }
    ],
    replaceConsole: false
});

module.exports = log4js;
