/**
 * Created by ued on 2016/11/2.
 */

const DATE_FORMAT_REGEX = /[YmdHis]/g;
const DATE_FORMAT_FUNCTION = (function () {
    const DECIMAL = 2;
    let zeroLeftPad = v => leftPad(v, DECIMAL, '0');

    return {
        Y: (date) => date.getFullYear(),
        m: (date) => zeroLeftPad(date.getMonth() + 1),
        d: (date) => zeroLeftPad(date.getDate()),
        H: (date) => zeroLeftPad(date.getHours()),
        i: (date) => zeroLeftPad(date.getMinutes()),
        s: (date) => zeroLeftPad(date.getSeconds())
    };
}());

/**
 * 时间格式化的函数，简化实现，只支持YmdHis几种关键字
 * @param {*} date   日期对象，或者时间戳（可以是数字或者字符串）
 * @param {String} format 时间格式字符串
 * @returns {String} 返回结果如下：2019-01-20 12:23:34
 */
function encodeDate (date, format = 'Y-m-d H:i:s') {
    let type = typeof date;

    //  时间戳类型
    if (type === 'number') {

        /* eslint-disable */
        date = date.toString().length === 13 ? date : 1000 * date;

        /* eslint-enable */
        date = new Date(date);
    } else if (type === 'string') {
        date = decodeDate(date);
    }
    let func = DATE_FORMAT_FUNCTION;
    return (format).replace(DATE_FORMAT_REGEX, (m) => func[m] ? func[m](date) : m);
}

/**
 * ie下面这种new Date('2000-11-11 11:11:11')会失败，这里重新写一个
 * @param {String} datetime 日期时间字符串，格式如下：2019-01-20 12:23:34
 * @returns {Date} 返回一个Date对象
 */
function decodeDate (datetime) {
    let dateTime = datetime.split(' ');
    let date = dateTime[0] || '';
    let time = dateTime[1] || '';
    let times = [];
    let index = 0;

    date.split('-').forEach(function (item, i) {
        item = parseInt(item, 10);
        if (i === 1) {

            // 月份要减1
            item -= 1;
        }
        times.push(item);
    });

    time.split(':').forEach(function (item) {
        item = parseInt(item, 10);
        times.push(item);
    });

    return new Date(
        times[index++] || 0,
        times[index++] || 0,
        times[index++] || 0,
        times[index++] || 0,
        times[index++] || 0,
        times[index] || 0
    );
}

/**
 * 根据相隔的天数返回日期，如 -1 为昨天，0 为今天，1 为明天
 * @param number
 * @returns {Date}
 */

function getDateFromNow (number = 0) {
    let date = new Date();
    date.setDate(date.getDate() + number);

    return date;
}

let charToEntity = {};
let entityToChar = {};
let charToEntityRegex;
let entityToCharRegex;
let addCharacterEntities = function (newEntities) {
    let charKeys = [];
    let entityKeys = [];
    let key;
    let echar;
    for (key in newEntities) {
        if (newEntities.hasOwnProperty(key)) {
            echar = newEntities[key];
            entityToChar[key] = echar;
            charToEntity[echar] = key;
            charKeys.push(echar);
            entityKeys.push(key);
        }
    }
    charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
    entityToCharRegex = new RegExp('(' + entityKeys.join('|') + '|&#[0-9]{1,5};)', 'g');
};
let htmlEncodeReplaceFn = function (match, capture) {
    return charToEntity[capture];
};
const DECIMAL = 10;
const ENCODE_LENGTH = 2;
let htmlDecodeReplaceFn = function (match, capture) {
    return (capture in entityToChar) ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(ENCODE_LENGTH), DECIMAL));
};

addCharacterEntities({
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&quot;': '"',
    '&#39;': '\''
});

/**
 * html 编码
 * @param {String} value 要编码的字符串
 * @returns {String} 结果
 */
function htmlEncode (value) {
    return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
}

/**
 * html 解码
 * @param {String} value 要解码的字符串
 * @returns {string}结果
 */
function htmlDecode (value) {
    return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
}

const FORMAT_RE = /\{(\d+)\}/g;

/**
 * 格式化字符串 formatString('test{0}xxx{1}', 'a', 'b') => 'testaxxxb
 * @param {String} format 格式如下：test{0}xxx{1}
 * @param {String} args   替换
 * @returns {String}      结果
 */
function formatString (format, ...args) {
    return format.replace(FORMAT_RE, function (m, i) {
        return args[i];
    });
}

/**
 * 格式化字符串 干掉前后空格
 * @param {String} string The string to trim.
 * @return {String} The trimmed string.
 * */
function trim (string) {
    return string.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 构造Regex对象时，要先对字符串编码 
 * @param {String} s
 * @return {String}
 */
function escapeRegex (s) {
    return s.replace(/([\-.*+?\^${}()|\[\]\/\\])/g, '\\$1');
}


const IPV4 = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;

/**
 * 把IP字符串形式转化成int32
 * @param {String} ip  格式：1.1.11.1
 * @returns {Number}   IP转化成数字
 */
function parseIPv4 (ip) {
    let v4parts;
    let v4numbers;
    let i;
    if (!IPV4.test(ip)) {
        return null;
    }

    // 解析IPv4为4个数字
    v4parts = ip.split('.');
    v4numbers = [];
    for (i = 0; i < v4parts.length; i++) {
        v4numbers.push(parseInt(v4parts[i], 10));
    }
    return v4numbers;
}

const BYTE_LIMIT = 1024;
let fileSize = (function () {
    const KB = 1048576;
    const MB = 1073741824;
    const HUNDRED = 100;

    return function (size) {
        var out;
        if (size < BYTE_LIMIT) {
            out = size + ' B';
        } else if (size < KB) {
            out = (Math.round(((size * HUNDRED) / BYTE_LIMIT)) / HUNDRED) + ' KB';
        } else if (size < MB) {
            out = (Math.round(((size * HUNDRED) / KB)) / HUNDRED) + ' MB';
        } else {
            out = (Math.round(((size * HUNDRED) / MB)) / HUNDRED) + ' GB';
        }
        return out;
    };
}());

/**
 * 数值单位KMGT转化，比如：1024 -> 1KB
 * @param {Number} size   原始大小
 * @param {Number} limit  进制
 * @param {String} unit   单位
 * @returns {String}      返回格式后的结果
 */
function unitFormat (size = 0, limit = BYTE_LIMIT, unit = 'B') {
    let out;
    const B = limit;
    const KB = B * limit;
    const MB = KB * limit;
    const GB = MB * limit;
    const TEN = 10;

    if (size < B) {
        out = size + ' ' + unit;
    } else if (size < KB) {
        out = (Math.round(((size * TEN) / B)) / TEN) + ' K' + unit;
    } else if (size < MB) {
        out = (Math.round(((size * TEN) / KB)) / TEN) + ' M' + unit;
    } else if (size < GB) {
        out = (Math.round(((size * TEN) / MB)) / TEN) + ' G' + unit;
    } else {
        out = (Math.round(((size * TEN) / GB)) / TEN) + ' T' + unit;
    }
    return out;
}

//字符串首字母大写
function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.substr(1);
}

/* eslint-disable quotes */
function leftPad (string, size, character) {
    let result = String(string);

    character = character || " ";

    while (result.length < size) {
        result = character + result;
    }

    return result;
}

/**
 * 将 Object 转成 GET 请求中的参数字符串
 * @param params
 * @returns {string}
 */

function parseURLParams (params) {
    let str = '';

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            str += '&' + key + '=' + encodeURIComponent(params[key]);
        }
    }

    return str.replace(/&/, '?');
}

/* eslint-enable quotes */

export {

    // 日期相关
    encodeDate,
    decodeDate,
    getDateFromNow,

    // html
    htmlEncode,
    htmlDecode,

    // 字符串处理
    formatString,
    capitalize,
    trim,
    escapeRegex,

    // 格式化 B b 相关
    fileSize,
    unitFormat,

    parseIPv4,

    leftPad,

    parseURLParams
};
