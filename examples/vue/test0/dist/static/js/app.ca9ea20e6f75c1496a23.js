webpackJsonp([2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.logger = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _logger(type) {
        return function () {
            if (false) {
                if (window.console[type]) {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    window.console[type].apply(window.console, args);
                }
            }
        };
    }

    var debug = _logger('debug');
    var info = _logger('info');
    var log = _logger('log');
    var warn = _logger('warn');
    var error = _logger('error');
    var table = _logger('table');

    exports.default = {
        debug: debug,
        info: info,
        log: log,
        warn: warn,
        error: error,
        table: table
    };
    module.exports = exports['default'];
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(261)

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

module.exports = vueAll;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mutation_types = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var SET_BRANCH_INFO_LIST = exports.SET_BRANCH_INFO_LIST = 'BRANCH/SET_INFO_LIST';

  var UPDATE_ADMIN_DESCRIPTION = exports.UPDATE_ADMIN_DESCRIPTION = 'ADMIN/UPDATE_DESCRIPTION';
});

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(82), __webpack_require__(21), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('babel-runtime/core-js/object/keys'), require('babel-runtime/core-js/promise'), require('src/util/logger'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.keys, global.promise, global.logger);
        global.co_not_reject = mod.exports;
    }
})(this, function (module, _keys, _promise, _logger) {
    'use strict';

    var _keys2 = _interopRequireDefault(_keys);

    var _promise2 = _interopRequireDefault(_promise);

    var _logger2 = _interopRequireDefault(_logger);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var slice = Array.prototype.slice;


    module.exports = co['default'] = co.co = co;

    co.wrap = function (fn) {
        createPromise.__generatorFunction__ = fn;
        return createPromise;
        function createPromise() {
            return co.call(this, fn.apply(this, arguments));
        }
    };

    function co(gen) {
        var ctx = this;
        var args = slice.call(arguments, 1);

        return new _promise2.default(function (resolve, reject) {
            if (typeof gen === 'function') gen = gen.apply(ctx, args);
            if (!gen || typeof gen.next !== 'function') return resolve(gen);

            onFulfilled();

            function onFulfilled(res) {
                var ret;
                try {
                    ret = gen.next(res);
                } catch (e) {
                    ret = e;
                    _logger2.default.error(e);
                }
                next(ret);
                return null;
            }

            function onRejected(err) {
                var ret;
                try {
                    ret = gen.next(err);
                } catch (e) {
                    ret = e;
                    _logger2.default.error(e);
                }
                next(ret);
            }

            function next(ret) {
                if (ret.done) return resolve(ret.value);
                var value = toPromise.call(ctx, ret.value);
                if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
                return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' + 'but the following object was passed: "' + String(ret.value) + '"'));
            }
        });
    }

    function toPromise(obj) {
        if (!obj) return obj;
        if (isPromise(obj)) return obj;
        if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
        if ('function' == typeof obj) return thunkToPromise.call(this, obj);
        if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
        if (isObject(obj)) return objectToPromise.call(this, obj);
        return obj;
    }

    function thunkToPromise(fn) {
        var ctx = this;
        return new _promise2.default(function (resolve, reject) {
            fn.call(ctx, function (err, res) {
                if (err) return reject(err);
                if (arguments.length > 2) res = slice.call(arguments, 1);
                resolve(res);
            });
        });
    }

    function arrayToPromise(obj) {
        return _promise2.default.all(obj.map(toPromise, this));
    }

    function objectToPromise(obj) {
        var results = new obj.constructor();
        var keys = (0, _keys2.default)(obj);
        var promises = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var promise = toPromise.call(this, obj[key]);
            if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
        }
        return _promise2.default.all(promises).then(function () {
            return results;
        });

        function defer(promise, key) {
            results[key] = undefined;
            promises.push(promise.then(function (res) {
                results[key] = res;
            }));
        }
    }

    function isPromise(obj) {
        return 'function' == typeof obj.then;
    }

    function isGenerator(obj) {
        return 'function' == typeof obj.next && 'function' == typeof obj.throw;
    }

    function isGeneratorFunction(obj) {
        var constructor = obj.constructor;
        if (!constructor) return false;
        if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
        return isGenerator(constructor.prototype);
    }

    function isObject(val) {
        return Object == val.constructor;
    }
});

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

module.exports = babelRuntime;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = chartsAll;

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(46)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/helpers/typeof'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._typeof);
        global.format = mod.exports;
    }
})(this, function (exports, _typeof2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.parseURLParams = exports.leftPad = exports.parseIPv4 = exports.unitFormat = exports.fileSize = exports.escapeRegex = exports.trim = exports.capitalize = exports.formatString = exports.htmlDecode = exports.htmlEncode = exports.getDateFromNow = exports.decodeDate = exports.encodeDate = undefined;

    var _typeof3 = _interopRequireDefault(_typeof2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var DATE_FORMAT_REGEX = /[YmdHis]/g;
    var DATE_FORMAT_FUNCTION = function () {
        var DECIMAL = 2;
        var zeroLeftPad = function zeroLeftPad(v) {
            return leftPad(v, DECIMAL, '0');
        };

        return {
            Y: function Y(date) {
                return date.getFullYear();
            },
            m: function m(date) {
                return zeroLeftPad(date.getMonth() + 1);
            },
            d: function d(date) {
                return zeroLeftPad(date.getDate());
            },
            H: function H(date) {
                return zeroLeftPad(date.getHours());
            },
            i: function i(date) {
                return zeroLeftPad(date.getMinutes());
            },
            s: function s(date) {
                return zeroLeftPad(date.getSeconds());
            }
        };
    }();

    function encodeDate(date) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Y-m-d H:i:s';

        var type = typeof date === 'undefined' ? 'undefined' : (0, _typeof3.default)(date);

        if (type === 'number') {
            date = date.toString().length === 13 ? date : 1000 * date;

            date = new Date(date);
        } else if (type === 'string') {
            date = decodeDate(date);
        }
        var func = DATE_FORMAT_FUNCTION;
        return format.replace(DATE_FORMAT_REGEX, function (m) {
            return func[m] ? func[m](date) : m;
        });
    }

    function decodeDate(datetime) {
        var dateTime = datetime.split(' ');
        var date = dateTime[0] || '';
        var time = dateTime[1] || '';
        var times = [];
        var index = 0;

        date.split('-').forEach(function (item, i) {
            item = parseInt(item, 10);
            if (i === 1) {
                item -= 1;
            }
            times.push(item);
        });

        time.split(':').forEach(function (item) {
            item = parseInt(item, 10);
            times.push(item);
        });

        return new Date(times[index++] || 0, times[index++] || 0, times[index++] || 0, times[index++] || 0, times[index++] || 0, times[index] || 0);
    }

    function getDateFromNow() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var date = new Date();
        date.setDate(date.getDate() + number);

        return date;
    }

    var charToEntity = {};
    var entityToChar = {};
    var charToEntityRegex = void 0;
    var entityToCharRegex = void 0;
    var addCharacterEntities = function addCharacterEntities(newEntities) {
        var charKeys = [];
        var entityKeys = [];
        var key = void 0;
        var echar = void 0;
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
    var htmlEncodeReplaceFn = function htmlEncodeReplaceFn(match, capture) {
        return charToEntity[capture];
    };
    var DECIMAL = 10;
    var ENCODE_LENGTH = 2;
    var htmlDecodeReplaceFn = function htmlDecodeReplaceFn(match, capture) {
        return capture in entityToChar ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(ENCODE_LENGTH), DECIMAL));
    };

    addCharacterEntities({
        '&amp;': '&',
        '&gt;': '>',
        '&lt;': '<',
        '&quot;': '"',
        '&#39;': '\''
    });

    function htmlEncode(value) {
        return !value ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
    }

    function htmlDecode(value) {
        return !value ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
    }

    var FORMAT_RE = /\{(\d+)\}/g;

    function formatString(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return format.replace(FORMAT_RE, function (m, i) {
            return args[i];
        });
    }

    function trim(string) {
        return string.replace(/(^\s*)|(\s*$)/g, '');
    }

    function escapeRegex(s) {
        return s.replace(/([\-.*+?\^${}()|\[\]\/\\])/g, '\\$1');
    }

    var IPV4 = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;

    function parseIPv4(ip) {
        var v4parts = void 0;
        var v4numbers = void 0;
        var i = void 0;
        if (!IPV4.test(ip)) {
            return null;
        }

        v4parts = ip.split('.');
        v4numbers = [];
        for (i = 0; i < v4parts.length; i++) {
            v4numbers.push(parseInt(v4parts[i], 10));
        }
        return v4numbers;
    }

    var BYTE_LIMIT = 1024;
    var fileSize = function () {
        var KB = 1048576;
        var MB = 1073741824;
        var HUNDRED = 100;

        return function (size) {
            var out;
            if (size < BYTE_LIMIT) {
                out = size + ' B';
            } else if (size < KB) {
                out = Math.round(size * HUNDRED / BYTE_LIMIT) / HUNDRED + ' KB';
            } else if (size < MB) {
                out = Math.round(size * HUNDRED / KB) / HUNDRED + ' MB';
            } else {
                out = Math.round(size * HUNDRED / MB) / HUNDRED + ' GB';
            }
            return out;
        };
    }();

    function unitFormat() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BYTE_LIMIT;
        var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'B';

        var out = void 0;
        var B = limit;
        var KB = B * limit;
        var MB = KB * limit;
        var GB = MB * limit;
        var TEN = 10;

        if (size < B) {
            out = size + ' ' + unit;
        } else if (size < KB) {
            out = Math.round(size * TEN / B) / TEN + ' K' + unit;
        } else if (size < MB) {
            out = Math.round(size * TEN / KB) / TEN + ' M' + unit;
        } else if (size < GB) {
            out = Math.round(size * TEN / MB) / TEN + ' G' + unit;
        } else {
            out = Math.round(size * TEN / GB) / TEN + ' T' + unit;
        }
        return out;
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substr(1);
    }

    function leftPad(string, size, character) {
        var result = String(string);

        character = character || " ";

        while (result.length < size) {
            result = character + result;
        }

        return result;
    }

    function parseURLParams(params) {
        var str = '';

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                str += '&' + key + '=' + encodeURIComponent(params[key]);
            }
        }

        return str.replace(/&/, '?');
    }

    exports.encodeDate = encodeDate;
    exports.decodeDate = decodeDate;
    exports.getDateFromNow = getDateFromNow;
    exports.htmlEncode = htmlEncode;
    exports.htmlDecode = htmlDecode;
    exports.formatString = formatString;
    exports.capitalize = capitalize;
    exports.trim = trim;
    exports.escapeRegex = escapeRegex;
    exports.fileSize = fileSize;
    exports.unitFormat = unitFormat;
    exports.parseIPv4 = parseIPv4;
    exports.leftPad = leftPad;
    exports.parseURLParams = parseURLParams;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.local_storage = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    function getStorage() {
        var _localStorage;

        return (_localStorage = localStorage).getItem.apply(_localStorage, arguments);
    }

    function setStorage() {
        var _localStorage2;

        return (_localStorage2 = localStorage).setItem.apply(_localStorage2, arguments);
    }

    function removeStorage() {
        var _localStorage3;

        return (_localStorage3 = localStorage).removeItem.apply(_localStorage3, arguments);
    }

    function clear() {
        var _localStorage4;

        return (_localStorage4 = localStorage).clear.apply(_localStorage4, arguments);
    }

    function getLength() {
        return localStorage.length;
    }

    function getKey() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return localStorage.key(args);
    }

    exports.getStorage = getStorage;
    exports.setStorage = setStorage;
    exports.removeStorage = removeStorage;
    exports.clear = clear;
    exports.getKey = getKey;
    exports.getLength = getLength;
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(262)

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.en = mod.exports;
    }
})(this, function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {

        "总共{0}项": "{0} entries in total",

        "©2015-2017 深信服公司版权所有": "©2015-2017 Sangfor Technologies Inc. All Rights Reserved",

        "深信服官方微信": "Follow Sangfor on WeChat",

        "搜索": "Search term",

        "个": " ",

        "分支": "Sites",

        "您的浏览器不支持HTML5，请尝试其他浏览器！": "您的浏览器不支持HTML5，请尝试其他浏览器！",

        "未处理": "Pending",

        "全部": "All",

        "当前共": "",

        "个分支，受影响分支概况：": " sites, among which the following are giving alarms",

        "网络告警": "Network alarm",

        "离线告警": "Offline alarm",

        "授权告警": "Licensing alarm",

        "硬件告警": "Hardware alarm",

        "安全告警": "Security alarm",

        "加载数据失败": "加载数据失败",

        "没有可显示的数据": "没有可显示的数据",

        "查看更多": "Details",

        "分支ID": "分支ID",

        "通信ID": "通信ID",

        "版本": "版本",

        "地理位置": "Location",

        "所属组": "Group",

        "数据加载失败": "数据加载失败",

        "分支名称": "Site",

        "aBOS设备ID": "aBOS设备ID",

        "具体位置": "具体位置",

        "分支联系人": "分支联系人",

        "邮件地址": "邮件地址",

        "备注": "备注",

        "重新导入": "重新导入",

        "，其中有{0}个错误": "，其中有{0}个错误",

        "上传文件失败": "上传文件失败",

        "获取上传状态失败": "获取上传状态失败",

        "上传文件": "上传文件",

        "请按照模版填写信息。": "请按照模版填写信息。",

        "下载模版": "下载模版",

        "重新导入文件": "重新导入文件",

        "序号": "序号",

        "组织架构": "组织架构",

        "状态": "Status",

        "批量导入分支": "批量导入分支",

        "移动到分组": "Move",

        "重命名": "重命名",

        "提交成功": "提交成功",

        "请选择要移动到的目标分组": "请选择要移动到的目标分组",

        "请先导入分支": "请先导入分支",

        "导入的分支数据格式不对，请重新导入": "导入的分支数据格式不对，请重新导入",

        "导入分支信息成功": "导入分支信息成功",

        "删除分支将导致分支设备不能接入中心端，同时还将删除中心端保存的该分支所有策略配置及历史信息等，是否确认删除？": "删除分支将导致分支设备不能接入中心端，同时还将删除中心端保存的该分支所有策略配置及历史信息等，是否确认删除？",

        "提示": "提示",

        "新増分支": "新増分支",

        "编辑分支": "编辑分支",

        "添加子分组": "添加子分组",

        "“全部”节点不允许重命名": "“全部”节点不允许重命名",

        "“全部”节点不允许删除": "“全部”节点不允许删除",

        "确定要删除{0}吗？": "确定要删除{0}吗？",

        "获取webagent配置失败": "获取webagent配置失败",

        "检测到webagent未配置，<a href=\"#/manager/system/setting\" actionName=\"leave\">立即配置</a>": "检测到webagent未配置，<a href=\"#/manager/system/setting\" actionName=\"leave\">立即配置</a>",

        "获取通知方式失败": "获取通知方式失败",

        "检测到通知方式未配置，<a href=\"#/manager/system/setting\" actionName=\"leave\">立即配置</a>": "检测到通知方式未配置，<a href=\"#/manager/system/setting\" actionName=\"leave\">立即配置</a>",

        "发送邮件失败": "发送邮件失败",

        "发送邮件成功": "发送邮件成功",

        "刷新": "Refresh",

        "新增分支": "New Site",

        "删除分支": "Delete",

        "发送邮件": "Send Email",

        "导入": "Import",

        "导出": "Export",

        "立即下发": "立即下发",

        "名称": "Name",

        "虚拟网络设备": "Virtual Network Devices",

        "虚拟机（台）": "VMs",

        "带宽利用率": "Bandwidth Usage",

        "所属分支": "Site",

        "CPU利用率": "CPU Usage",

        "内存利用率": "Memory Usage",

        "磁盘利用率": "Disk Usage",

        "操作": "操作",

        "详情": "Details",

        "详情{#view#}": "View",

        "中国": "China",

        "空": "空",

        "未知": "Unknown",

        "关机": "Powered off",

        "存储丢失": "Storage is missing",

        "正在运行": "Running",

        "挂起": "Suspended",

        "正在克隆": "Cloning",

        "告警": "Giving Alarm",

        "告警{#nav#}": "Alarms",

        "离线": "Offline",

        "正常": "Normal",

        "配置": "配置",

        "物理设备": "Physical Devices",

        "虚拟机": "Virtual Machines",

        "aBos设备名称": "aBos设备名称",

        "发送": "发送",

        "接收": "接收",

        "分支信息": "分支信息",

        "设备列表": "设备列表",

        "吞吐率趋势图": "吞吐率趋势图",

        "用户排行": "用户排行",

        "概览": "概览",

        "远程接入分支": "远程接入分支",

        "在线用户": "在线用户",

        "会话数": "会话数",

        "设备类型": "设备类型",

        "排行": "排行",

        "用户": "用户",

        "总流速": "总流速",

        "获取分支授权信息失败": "获取分支授权信息失败",

        "CPU使用率": "CPU",

        "内存使用率": "Memory",

        "磁盘使用率": "Disk",

        "交换机": "交换机",

        "路由器": "路由器",

        "搜索描述信息": "Description",

        "查看": "View",

        "过滤": "Filter",

        "标为已读": "Mark as Read",

        "全部标为已读": "Mark All as Read",

        "级别": "Severity",

        "分类": "Type",

        "告警分支": "Site",

        "告警对象": "Object",

        "描述": "Description",

        "时间": "Time",

        "级别：": "级别：",

        "分类：": "分类：",

        "告警分支：": "告警分支：",

        "告警对象：": "告警对象：",

        "描述：": "描述：",

        "时间：": "时间：",

        "故障": "Failure",

        "严重": "严重",

        "所有": "所有",

        "资源告警": "资源告警",

        "安全风险": "安全风险",

        "其他": "其他",

        "最近一天": "最近一天",

        "最近两天": "最近两天",

        "最近三天": "最近三天",

        "恢复": "恢复",

        "确定": "确定",

        "取消": "取消",

        "标识为已读失败": "标识为已读失败",

        "操作成功": "操作成功",

        "返回上一级区域": "返回上一级区域",

        "加载更多...": "加载更多...",

        "分支总数": "Total Sites",

        "：": "：",

        "健康": "Healthy",

        "海外分支": "海外分支",

        "分支分布": "Locations",

        "国家/地区": "Countries/Regions",

        "城市": "Cities",

        "BBC运行状态": "Resource Usage",

        "发送速率": "Outbound",

        "接收速率": "Inbound",

        "（": "（",

        "）": "）",

        "查看详情": "View",

        "CPU": "CPU",

        "内存": "内存",

        "磁盘": "磁盘",

        "格式化数据失败": "格式化数据失败",

        "系统管理员": "System Admin",

        "区域管理员": "区域管理员",

        "访客": "访客",

        "超级管理员": "Super Admin",

        "获取用户信息失败": "获取用户信息失败",

        "检测到登录密码为系统初始密码，为了系统安全，强烈建议您修改密码！": "检测到登录密码为系统初始密码，为了系统安全，强烈建议您修改密码！",

        "修改密码": "修改密码",

        "修改密码失败": "修改密码失败",

        "修改密码成功": "修改密码成功",

        "密码输入不一致": "密码输入不一致",

        "密码中不能包含用户名": "密码中不能包含用户名",

        "密码中存在非法字符，特殊字符支持{0}": "密码中存在非法字符，特殊字符支持{0}",

        "密码至少应包含大写字母、小写字母、数字和特殊字符中的两项": "密码至少应包含大写字母、小写字母、数字和特殊字符中的两项",

        "原密码": "原密码",

        "新密码": "新密码",

        "1、密码不能包含用户名": "1、密码不能包含用户名",

        "2、密码至少应包含大写字母、小写字母、数字和特殊字符中的两项": "2、密码至少应包含大写字母、小写字母、数字和特殊字符中的两项",

        "确认密码 ": "确认密码 ",

        "通知": "通知",

        "分支业务中心": "BBC",

        "退出": "退出",

        "无消息": "无消息",

        "首页": "Home",

        "管理": "System",

        "登    录": "登    录",

        "用户名": "用户名",

        "密码": "密码",

        "用户名不可为空，请检查。": "用户名不可为空，请检查。",

        "密码不可为空，请检查。": "密码不可为空，请检查。",

        "正在验证用户信息...": "正在验证用户信息...",

        "登录失败": "登录失败",

        "大写锁定打开": "大写锁定打开",

        "您当前处于兼容性视图模式，无法获得良好的体验，请设置为标准模式再尝试登陆！": "您当前处于兼容性视图模式，无法获得良好的体验，请设置为标准模式再尝试登陆！",

        "您所使用的浏览器版本过于陈旧，无法获得良好的体验，建议升级为下面的浏览器：": "您所使用的浏览器版本过于陈旧，无法获得良好的体验，建议升级为下面的浏览器：",

        "获取用户列表信息失败": "获取用户列表信息失败",

        "（{0}）": "（{0}）",

        "新增": "新增",

        "删除": "删除",

        "用户列表": "用户列表",

        "权限": "权限",

        "所属分组": "所属分组",

        "所属组：{0}": "所属组：{0}",

        "，": "，",

        "分支：{0}": "分支：{0}",

        "；": "；",

        "确认密码": "确认密码",

        "角色": "角色",

        "权限配置": "权限配置",

        "添加管理员失败": "添加管理员失败",

        "新増管理员成功": "新増管理员成功",

        "编辑{0}失败": "编辑{0}失败",

        "编辑{0}成功": "编辑{0}成功",

        "新増管理员": "新増管理员",

        "编辑管理员": "编辑管理员",

        "请输入当前登录用户的密码确认身份": "请输入当前登录用户的密码确认身份",

        "确认": "确认",

        "用户密码错误": "用户密码错误",

        "确定要删除吗？": "确定要删除吗？",

        "分支告警": "分支告警",

        "BBC告警": "BBC告警",

        "告警通知": "告警通知",

        "保存成功！": "保存成功！",

        "保存修改": "保存修改",

        "分支离线": "分支离线",

        "BBC平台CPU使用率过高": "BBC平台CPU使用率过高",

        "BBC平台内存使用率过高": "BBC平台内存使用率过高",

        "BBC平台磁盘使用率过高": "BBC平台磁盘使用率过高",

        "分支安全风险（监测分支关于安全方面的风险：僵尸主机，WEBSHELL等）": "分支安全风险（监测分支关于安全方面的风险：僵尸主机，WEBSHELL等）",

        "主机": "主机",

        "存储": "存储",

        "虚拟网络": "虚拟网络",

        "序列号": "序列号",

        "主机内存占用过高": "主机内存占用过高",

        "主机交换分区占用": "主机交换分区占用",

        "主机CPU占用过高": "主机CPU占用过高",

        "主机CPU温度异常": "主机CPU温度异常",

        "主机网口丢包率过高": "主机网口丢包率过高",

        "主机网卡工作异常": "主机网卡工作异常",

        "主机网口掉线": "主机网口掉线",

        "主机离线": "主机离线",

        "数据通信口": "数据通信口",

        "存储IO繁忙": "存储IO繁忙",

        "存储IO时延过高": "存储IO时延过高",

        "存储占用阈值": "存储占用阈值",

        "存储与主机断开": "存储与主机断开",

        "存储状态异常": "存储状态异常",

        "RAID状态异常": "RAID状态异常",

        "虚拟机内存占用过高": "虚拟机内存占用过高",

        "虚拟机CPU占用过高": "虚拟机CPU占用过高",

        "虚拟机镜像文件损坏": "虚拟机镜像文件损坏",

        "虚拟机与外部网络不通": "虚拟机与外部网络不通",

        "虚拟网络设备CPU占用过高": "虚拟网络设备CPU占用过高",

        "虚拟网络设备内部告警": "虚拟网络设备内部告警",

        "虚拟网络设备镜像文件损坏": "虚拟网络设备镜像文件损坏",

        "路由器运行失败": "路由器运行失败",

        "虚拟网口丢包率过高": "虚拟网口丢包率过高",

        "虚拟网络设备与外部网络不通": "虚拟网络设备与外部网络不通",

        "序列号过期": "序列号过期",

        "序列号KEY状态异常": "序列号KEY状态异常",

        "30秒": "30秒",

        "60秒": "60秒",

        "3分钟": "3分钟",

        "10分钟": "10分钟",

        "20分钟": "20分钟",

        "30分钟": "30分钟",

        "占用超过": "占用超过",

        "占用低于": "占用低于",

        "不通知": "不通知",

        "获取信息失败": "获取信息失败",

        "保存失败": "保存失败",

        "发送到邮箱": "发送到邮箱",

        "邮箱地址": "邮箱地址",

        "相同类型告警事件": "相同类型告警事件",

        "分钟内只发送一封邮件（不同主机单独发送）": "分钟内只发送一封邮件（不同主机单独发送）",

        "发送到微信": "发送到微信",

        "微信号": "微信号",

        "分钟内只发送一封消息（不同主机单独发送）": "分钟内只发送一封消息（不同主机单独发送）",

        "请选择本地备份文件， *.bcf": "请选择本地备份文件， *.bcf",

        "请先上传本地备份文件再进行恢复": "请先上传本地备份文件再进行恢复",

        "恢复失败": "恢复失败",

        "恢复成功": "恢复成功",

        "创建备份": "创建备份",

        "系统配置（包含虚拟网络设备的配置）在每天凌晨时会自动备份到 BBC，也可通过以下按钮备份到本地。": "系统配置（包含虚拟网络设备的配置）在每天凌晨时会自动备份到 BBC，也可通过以下按钮备份到本地。",

        "备份系统到本地": "备份系统到本地",

        "恢复 BBC 时，同时也会恢复虚拟网络设备的所有配置，请谨慎操作。": "恢复 BBC 时，同时也会恢复虚拟网络设备的所有配置，请谨慎操作。",

        "方式一：从自动备份的文件中恢复": "方式一：从自动备份的文件中恢复",

        "方式二：从本地备份的文件中恢复": "方式二：从本地备份的文件中恢复",

        "浏览": "浏览",

        "不可用": "不可用",

        "可用": "可用",

        "设备ID：": "设备ID：",

        "序列号：": "序列号：",

        "修改序列号": "修改序列号",

        "SC网点插入数：": "SC网点插入数：",

        "网点自动升级有效期：": "网点自动升级有效期：",

        "AC/SG多功能序列号：": "AC/SG多功能序列号：",

        "排队中": "排队中",

        "失败": "失败",

        "完成": "完成",

        "进行中": "进行中",

        "操作日志": "操作日志",

        "系统日志": "系统日志",

        "行为": "行为",

        "起始时间": "起始时间",

        "结束时间": "结束时间",

        "对象类型": "对象类型",

        "对象": "对象",

        "搜索行为，主机，对象，描述": "搜索行为，主机，对象，描述",

        "所有状态": "所有状态",

        "关键字": "关键字",

        "高级搜索": "高级搜索",

        "开始时间": "开始时间",

        "可通过购买序列号，来获得更专业、更完善的售后服务": "可通过购买序列号，来获得更专业、更完善的售后服务",

        "日期与时间": "日期与时间",

        "设置日期与时间，和同步互联网时间": "设置日期与时间，和同步互联网时间",

        "管理员": "管理员",

        "配置用于管理此平台的账号信息": "配置用于管理此平台的账号信息",

        "系统设置": "系统设置",

        "可调整系统参数，以适应不同的使用场景": "可调整系统参数，以适应不同的使用场景",

        "告警设置": "告警设置",

        "配置告警事件和触发告警的阀值条件以及产生告警后的通知方式": "配置告警事件和触发告警的阀值条件以及产生告警后的通知方式",

        "备份与恢复": "备份与恢复",

        "可备份和恢复系统设置，也可备份系统后台日志": "可备份和恢复系统设置，也可备份系统后台日志",

        "管理员日志": "管理员日志",

        "记录系统的操作日志以及产生的告警为后续排查问题提供依据": "记录系统的操作日志以及产生的告警为后续排查问题提供依据",

        "关机与重启": "关机与重启",

        "内置库版本": "内置库版本",

        "设备升级": "设备升级",

        "可升级您的设备到最新版本，以获取更好的产品体验": "可升级您的设备到最新版本，以获取更好的产品体验",

        "通知方式": "通知方式",

        "可通过邮件方式通知对方": "可通过邮件方式通知对方",

        "请输入有效的 email 地址": "请输入有效的 email 地址",

        "无": "无",

        "获取邮件设置失败": "获取邮件设置失败",

        "保存成功": "保存成功",

        "测试邮件": "测试邮件",

        "收件人": "收件人",

        "发送测试邮件失败": "发送测试邮件失败",

        "发送测试邮件成功": "发送测试邮件成功",

        "邮箱配置": "邮箱配置",

        "服务器地址或域名": "服务器地址或域名",

        "服务器端口": "服务器端口",

        "发送邮箱": "发送邮箱",

        "登录用户名": "登录用户名",

        "登录密码": "登录密码",

        "保存": "保存",

        "确认关机": "确认关机",

        "设备正在关机，请稍候...": "设备正在关机，请稍候...",

        "确认重启": "确认重启",

        "设备正在重启，重启完成后请重新登录BBC，请稍候...": "设备正在重启，重启完成后请重新登录BBC，请稍候...",

        "{0} {1}s": "{0} {1}s",

        "请输入管理员admin的密码确认身份": "请输入管理员admin的密码确认身份",

        "发送请求失败": "发送请求失败",

        "发送请求成功": "发送请求成功",

        "关闭设备": "关闭设备",

        "重启设备": "重启设备",

        "保存数据失败": "保存数据失败",

        "保存数据成功": "保存数据成功",

        "通讯端口": "通讯端口",

        "日志中心WEB端口": "日志中心WEB端口",

        "修改成功": "修改成功",

        "掩码": "掩码",

        "网关": "网关",

        "网络设置": "网络设置",

        "webagent设置": "webagent设置",

        "外置日志数据中心设置": "外置日志数据中心设置",

        "不能输入< > \\\" \\' & % 等特殊字符": "不能输入< > \\\" \\' & % 等特殊字符",

        "主Webagent": "主Webagent",

        "支持以下格式：": "支持以下格式：",

        "1、IP地址：192.168.1.1": "1、IP地址：192.168.1.1",

        "2、IP:PORT：192.168.1.1:12345": "2、IP:PORT：192.168.1.1:12345",

        "3、域名：domain.com": "3、域名：domain.com",

        "4、域名:端口：domain.com:12345": "4、域名:端口：domain.com:12345",

        "备Webagent": "备Webagent",

        "共享密钥": "共享密钥",

        "监听端口": "监听端口",

        "星期日": "星期日",

        "星期一": "星期一",

        "星期二": "星期二",

        "星期三": "星期三",

        "星期四": "星期四",

        "星期五": "星期五",

        "星期六": "星期六",

        "设置日期和时间": "设置日期和时间",

        "系统时间被修改后需重新登录，是否确定修改？": "系统时间被修改后需重新登录，是否确定修改？",

        "修改系统时间失败": "修改系统时间失败",

        "修改系统时间成功": "修改系统时间成功",

        "获取时间失败": "获取时间失败",

        "获取时间同步设置失败": "获取时间同步设置失败",

        "您确认要关闭NTP服务器同步功能？": "您确认要关闭NTP服务器同步功能？",

        "您确认要打开NTP服务器同步功能？": "您确认要打开NTP服务器同步功能？",

        "立即同步服务时间": "立即同步服务时间",

        "保存NTP服务器失败": "保存NTP服务器失败",

        "Y年m月d日": "Y年m月d日",

        "时间与日期": "时间与日期",

        "更改时间设置": "更改时间设置",

        "时间同步设置": "时间同步设置",

        "与NTP服务器同步": "与NTP服务器同步",

        "服务器": "服务器",

        "获取本地时间": "获取本地时间",

        "(UTC-12:00)国际日期变更线西": "(UTC-12:00)国际日期变更线西",

        "(UTC-11:00)中途岛": "(UTC-11:00)中途岛",

        "(UTC-10:00)夏威夷": "(UTC-10:00)夏威夷",

        "(UTC-09:00)阿拉斯加": "(UTC-09:00)阿拉斯加",

        "(UTC-08:00)下加利福尼亚、太平洋时间(美国和加拿大)": "(UTC-08:00)下加利福尼亚、太平洋时间(美国和加拿大)",

        "(UTC-07:00)拉巴斯、山地时间(美国和加拿大)": "(UTC-07:00)拉巴斯、山地时间(美国和加拿大)",

        "(UTC-06:00)墨西哥城、中部时间(美国和加拿大)": "(UTC-06:00)墨西哥城、中部时间(美国和加拿大)",

        "(UTC-05:00)波哥大、东部时间(美国和加拿大)": "(UTC-05:00)波哥大、东部时间(美国和加拿大)",

        "(UTC-04:00)亚松森、大西洋时间(加拿大)": "(UTC-04:00)亚松森、大西洋时间(加拿大)",

        "(UTC-03:00)格陵兰、布宜诺斯艾利斯": "(UTC-03:00)格陵兰、布宜诺斯艾利斯",

        "(UTC-02:00)协调世界时-2": "(UTC-02:00)协调世界时-2",

        "(UTC-01:00)亚速尔群岛、佛得角群岛": "(UTC-01:00)亚速尔群岛、佛得角群岛",

        "(UTC)爱丁堡、伦敦": "(UTC)爱丁堡、伦敦",

        "(UTC+01:00)马德里、巴黎": "(UTC+01:00)马德里、巴黎",

        "(UTC+02:00)雅典、布加勒斯特": "(UTC+02:00)雅典、布加勒斯特",

        "(UTC+03:00)巴格达、莫斯科": "(UTC+03:00)巴格达、莫斯科",

        "(UTC+04:00)阿尔扎比、马斯喀特": "(UTC+04:00)阿尔扎比、马斯喀特",

        "(UTC+05:00)伊斯兰堡、卡拉奇": "(UTC+05:00)伊斯兰堡、卡拉奇",

        "(UTC+06:00)达卡、新西伯利亚": "(UTC+06:00)达卡、新西伯利亚",

        "(UTC+07:00)曼谷、雅加达": "(UTC+07:00)曼谷、雅加达",

        "(UTC+08:00)伊尔库茨克、北京": "(UTC+08:00)伊尔库茨克、北京",

        "(UTC+09:00)东京、首尔": "(UTC+09:00)东京、首尔",

        "(UTC+10:00)墨尔本、悉尼": "(UTC+10:00)墨尔本、悉尼",

        "(UTC+11:00)所罗门群岛、新喀里多尼亚": "(UTC+11:00)所罗门群岛、新喀里多尼亚",

        "(UTC+12:00)奥克兰、惠灵顿": "(UTC+12:00)奥克兰、惠灵顿",

        "(UTC+13:00)萨摩亚群岛、努库阿洛法": "(UTC+13:00)萨摩亚群岛、努库阿洛法",

        "(UTC+14:00)圣诞岛": "(UTC+14:00)圣诞岛",

        "1、升级信息": "1、升级信息",

        "2、准备升级文件": "2、准备升级文件",

        "3、升级": "3、升级",

        "请选择要上传的pkg文件": "请选择要上传的pkg文件",

        "获取版本信息失败": "获取版本信息失败",

        "升级包版本：{0}": "升级包版本：{0}",

        "获取升级包版本号失败": "获取升级包版本号失败",

        "设备正在重启，重启完成后请重新登录BBC。{0}s": "设备正在重启，重启完成后请重新登录BBC。{0}s",

        "重启设备失败": "重启设备失败",

        "设备当前版本": "设备当前版本",

        "升级到其它版本": "升级到其它版本",

        "将升级文件上传到服务器": "将升级文件上传到服务器",

        "上传": "上传",

        "立即升级": "立即升级",

        "正在升级，升级过程中请不要关闭BBC电源，以免数据丢失": "正在升级，升级过程中请不要关闭BBC电源，以免数据丢失",

        "立即重启": "立即重启",

        "网络异常，请检查网络后重试": "网络异常，请检查网络后重试",

        "该输入项的最大长度是90个字符，或者30个汉字": "该输入项的最大长度是90个字符，或者30个汉字",

        "该输入项只能由中文、数字、字母、()[]{}（）【】｛｝@|.?_-+组成": "该输入项只能由中文、数字、字母、()[]{}（）【】｛｝@|.?_-+组成",

        "该输入项不允许以字符“.”开头": "该输入项不允许以字符“.”开头"

    };
    module.exports = exports["default"];
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(64), __webpack_require__(66)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../util/logger'), require('./en'), require('./zh_cn'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.logger, global.en, global.zh_cn);
        global.index = mod.exports;
    }
})(this, function (module, exports, _logger, _en, _zh_cn) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _logger2 = _interopRequireDefault(_logger);

    var _en2 = _interopRequireDefault(_en);

    var _zh_cn2 = _interopRequireDefault(_zh_cn);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var LANGUAGE = {
        'zh-CN': _zh_cn2.default,
        en: _en2.default
    };

    var cur = void 0;

    function _(str) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var langMap = LANGUAGE[cur];
        if (langMap && langMap.hasOwnProperty(str)) {
            str = langMap[str];
        }

        return str.replace(/\{(\d+|#\w+#)\}/g, function (m, i) {
            i = parseInt(i, 10);
            if (isNaN(i)) {
                return '';
            }
            if (i >= 0 && i < args.length) {
                return args[i];
            }
            return m;
        });
    }

    function initI18n(Vue, opt) {
        cur = opt.lang;

        if (typeof window !== 'undefined') {
            var old = void 0;
            if (window._) {
                _logger2.default.log('function _ () {} found...');
                old = window._;
                window._ = function (str) {
                    var _old;

                    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                        args[_key2 - 1] = arguments[_key2];
                    }

                    return (_old = old).call.apply(_old, [null, _.apply(undefined, [str].concat(args))].concat(args));
                };
            } else {
                window._ = _;
            }
            return true;
        }
        return false;
    }

    exports.default = {
        install: function install(Vue) {
            var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { lang: 'zh-CN' };

            initI18n(Vue, opt);
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.zh_cn = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {};
  module.exports = exports["default"];
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(21), __webpack_require__(5), __webpack_require__(76), __webpack_require__(4), __webpack_require__(42)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/promise'), require('vue'), require('vue-resource'), require('./logger'), require('./local_storage'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.promise, global.vue, global.vueResource, global.logger, global.local_storage);
        global.ajax = mod.exports;
    }
})(this, function (exports, _promise, _vue, _vueResource, _logger, _local_storage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.init = init;

    var _promise2 = _interopRequireDefault(_promise);

    var _vue2 = _interopRequireDefault(_vue);

    var _vueResource2 = _interopRequireDefault(_vueResource);

    var _logger2 = _interopRequireDefault(_logger);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var inited = false;
    var CSRF_KEY = 'CSRFPreventionToken';
    var NO_AUTHORIZATION = 401;

    function init() {
        if (inited) {
            return;
        }
        inited = true;

        _vue2.default.use(_vueResource2.default);
        _vue2.default.http.options.emulateJSON = true;

        _vue2.default.http.options.root = '/bbc';

        _vue2.default.http.headers.common[CSRF_KEY] = getCSRF();

        _vue2.default.http.interceptors.push(function (request, next) {
            request.url = fixURL(request.url);

            next(function (response) {
                if (checkReLogin(response, request.url)) {
                    reLogin();
                    response.ok = true;
                    response.jsonData = {
                        success: true,
                        msg: response.statusText
                    };
                    return response;
                }

                if (!response.bodyText && typeof Blob !== 'undefined' && response.body instanceof Blob) {

                    response.bodyText = new _promise2.default(function (resolve) {
                        var reader = new FileReader();

                        reader.readAsText(response.body);
                        reader.onload = function () {
                            resolve(reader.result);
                        };
                    });
                }

                return jsonResponse(response, request);
            });
        });
    }

    function getCSRF() {
        if (false) {
            window.BBC.CSRF = (0, _local_storage.getStorage)(CSRF_KEY);
        }
        return window.BBC && window.BBC.CSRF || 'token';
    }

    function jsonResponse(response, request) {
        return response.json().then(function (jsonData) {
            _logger2.default.log('[ajax] [response==>json] success: %o. %o', response, jsonData);

            response.jsonData = jsonData;

            if (jsonData.success === false || jsonData.success === 0 || jsonData.success === 'false') {

                _logger2.default.warn('[ajax] [response==>json] jsonData.success: false', response, jsonData);

                response.ok = false;

                if (checkReLogin(response, request.url, jsonData)) {
                    reLogin();
                }
            }
            return response;
        }, function (error) {
            _logger2.default.warn('[ajax] [response==>json] error: %o. %o', response, error);

            response.jsonData = {
                success: false,
                msg: response.body || response.data || _('网络异常，请检查网络后重试')
            };
            return response;
        });
    }

    function fixURL() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var ignoreList = [/^\/static/, /^login$/, /^\/cluster/];

        for (var i = 0; i < ignoreList.length; i++) {
            var ignoreReg = ignoreList[i];
            if (ignoreReg.test(url)) {
                return url;
            }
        }

        if (url.slice(-1) !== '/' && url.indexOf('?') === -1) {
            url = url + '/';
        }

        return url;
    }

    function checkReLogin(res, url, jsonData) {
        if (/^\/cluster/.test(url)) {
            return false;
        }

        if (res && !res.ok && res.status === NO_AUTHORIZATION) {
            return true;
        }
        if (jsonData && !jsonData.success && jsonData.no_auth) {
            return true;
        }
        return false;
    }

    function reLogin() {
        if (false) {
            window.location.href = './login.html';
        } else {
            window.location.href = './login';
        }
    }
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(30), __webpack_require__(45), __webpack_require__(186), __webpack_require__(101)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('src/util/timer'), require('src/util/uuid'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.classCallCheck, global.createClass, global.timer, global.uuid);
        global.interval_task = mod.exports;
    }
})(this, function (module, exports, _classCallCheck2, _createClass2, _timer, _uuid) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _uuid2 = _interopRequireDefault(_uuid);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var STATE = {
        STOPPED: 1,
        RUNNING: 2,
        WAITING: 3
    };

    function createCallback(task) {
        var next = function next(success) {
            if (success === false) {
                task.stop();
            } else {
                task.next();
            }
        };

        return function (skipFirst) {
            task.state = STATE.RUNNING;
            if (skipFirst) {
                next(true);
            } else {
                task.fn.call(task.scope || task, next);
            }
        };
    }

    var IntervalTask = function () {
        function IntervalTask() {
            var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            (0, _classCallCheck3.default)(this, IntervalTask);

            this.skipFirst = !!opt.skipFirst;

            this.interval = opt.interval || 0;
            this.fn = opt.fn;
            this.scope = opt.scope;
            this.state = STATE.STOPPED;

            if (opt.autoStart) {
                this.start();
            }
        }

        (0, _createClass3.default)(IntervalTask, [{
            key: 'start',
            value: function start() {
                var skipFirst = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.skipFirst;

                if (this.state === STATE.STOPPED) {
                    this.state = STATE.WAITING;
                    createCallback(this)(!!skipFirst);
                }
            }
        }, {
            key: 'stop',
            value: function stop() {
                if (this.tid) {
                    (0, _timer.clearSleep)(this.tid);
                    this.tid = null;
                }

                this.state = STATE.STOPPED;
            }
        }, {
            key: 'next',
            value: function next() {
                var me = this;
                if (this.state === STATE.RUNNING) {
                    this.state = STATE.WAITING;

                    this.tid = (0, _uuid2.default)();
                    (0, _timer.sleep)(this.tid, this.interval).then(function () {
                        createCallback(me)();
                    });
                }
            }
        }]);
        return IntervalTask;
    }();

    IntervalTask.STATE = STATE;
    exports.default = IntervalTask;
    module.exports = exports['default'];
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.rsa = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.encrypt = encrypt;

  var dbits;

  var canary = 0xdeadbeefcafe;
  var j_lm = (canary & 0xffffff) == 0xefcafe;

  function BigInteger(a, b, c) {
    if (a != null) if ("number" == typeof a) this.fromNumber(a, b, c);else if (b == null && "string" != typeof a) this.fromString(a, 256);else this.fromString(a, b);
  }

  function nbi() {
    return new BigInteger(null);
  }

  function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
      var v = x * this[i++] + w[j] + c;
      c = Math.floor(v / 0x4000000);
      w[j++] = v & 0x3ffffff;
    }
    return c;
  }

  function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff,
        xh = x >> 15;
    while (--n >= 0) {
      var l = this[i] & 0x7fff;
      var h = this[i++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 0x3fffffff;
    }
    return c;
  }

  function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff,
        xh = x >> 14;
    while (--n >= 0) {
      var l = this[i] & 0x3fff;
      var h = this[i++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 0xfffffff;
    }
    return c;
  }
  if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30;
  } else if (j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else {
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;

  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = [];
  var rr, vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
  }rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }function int2char(n) {
    return BI_RM.charAt(n);
  }

  function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return c == null ? -1 : c;
  }

  function bnpCopyTo(r) {
    for (var i = this.t - 1; i >= 0; --i) {
      r[i] = this[i];
    }r.t = this.t;
    r.s = this.s;
  }

  function bnpFromInt(x) {
    this.t = 1;
    this.s = x < 0 ? -1 : 0;
    if (x > 0) this[0] = x;else if (x < -1) this[0] = x + this.DV;else this.t = 0;
  }

  function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
  }

  function bnpFromString(s, b) {
    var k;
    if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 256) k = 8;else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else {
        this.fromRadix(s, b);
        return;
      }
    this.t = 0;
    this.s = 0;
    var i = s.length,
        mi = false,
        sh = 0;
    while (--i >= 0) {
      var x = k == 8 ? s[i] & 0xff : intAt(s, i);
      if (x < 0) {
        if (s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if (sh === 0) this[this.t++] = x;else if (sh + k > this.DB) {
        this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
        this[this.t++] = x >> this.DB - sh;
      } else this[this.t - 1] |= x << sh;
      sh += k;
      if (sh >= this.DB) sh -= this.DB;
    }
    if (k == 8 && (s[0] & 0x80) !== 0) {
      this.s = -1;
      if (sh > 0) this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
    }
    this.clamp();
    if (mi) BigInteger.ZERO.subTo(this, this);
  }

  function bnpClamp() {
    var c = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == c) {
      --this.t;
    }
  }

  function bnToString(b) {
    if (this.s < 0) return "-" + this.negate().toString(b);
    var k;
    if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else return this.toRadix(b);
    var km = (1 << k) - 1,
        d,
        m = false,
        r = "",
        i = this.t;
    var p = this.DB - i * this.DB % k;
    if (i-- > 0) {
      if (p < this.DB && (d = this[i] >> p) > 0) {
        m = true;
        r = int2char(d);
      }
      while (i >= 0) {
        if (p < k) {
          d = (this[i] & (1 << p) - 1) << k - p;
          d |= this[--i] >> (p += this.DB - k);
        } else {
          d = this[i] >> (p -= k) & km;
          if (p <= 0) {
            p += this.DB;
            --i;
          }
        }
        if (d > 0) m = true;
        if (m) r += int2char(d);
      }
    }
    return m ? r : "0";
  }

  function bnNegate() {
    var r = nbi();
    BigInteger.ZERO.subTo(this, r);
    return r;
  }

  function bnAbs() {
    return this.s < 0 ? this.negate() : this;
  }

  function bnCompareTo(a) {
    var r = this.s - a.s;
    if (r !== 0) return r;
    var i = this.t;
    r = i - a.t;
    if (r !== 0) return this.s < 0 ? -r : r;
    while (--i >= 0) {
      if ((r = this[i] - a[i]) !== 0) return r;
    }return 0;
  }

  function nbits(x) {
    var r = 1,
        t;
    if ((t = x >>> 16) !== 0) {
      x = t;
      r += 16;
    }
    if ((t = x >> 8) !== 0) {
      x = t;
      r += 8;
    }
    if ((t = x >> 4) !== 0) {
      x = t;
      r += 4;
    }
    if ((t = x >> 2) !== 0) {
      x = t;
      r += 2;
    }
    if ((t = x >> 1) !== 0) {
      x = t;
      r += 1;
    }
    return r;
  }

  function bnBitLength() {
    if (this.t <= 0) return 0;
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
  }

  function bnpDLShiftTo(n, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) {
      r[i + n] = this[i];
    }for (i = n - 1; i >= 0; --i) {
      r[i] = 0;
    }r.t = this.t + n;
    r.s = this.s;
  }

  function bnpDRShiftTo(n, r) {
    for (var i = n; i < this.t; ++i) {
      r[i - n] = this[i];
    }r.t = Math.max(this.t - n, 0);
    r.s = this.s;
  }

  function bnpLShiftTo(n, r) {
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / this.DB),
        c = this.s << bs & this.DM,
        i;
    for (i = this.t - 1; i >= 0; --i) {
      r[i + ds + 1] = this[i] >> cbs | c;
      c = (this[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) {
      r[i] = 0;
    }r[ds] = c;
    r.t = this.t + ds + 1;
    r.s = this.s;
    r.clamp();
  }

  function bnpRShiftTo(n, r) {
    r.s = this.s;
    var ds = Math.floor(n / this.DB);
    if (ds >= this.t) {
      r.t = 0;
      return;
    }
    var bs = n % this.DB;
    var cbs = this.DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = this[ds] >> bs;
    for (var i = ds + 1; i < this.t; ++i) {
      r[i - ds - 1] |= (this[i] & bm) << cbs;
      r[i - ds] = this[i] >> bs;
    }
    if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
    r.t = this.t - ds;
    r.clamp();
  }

  function bnpSubTo(a, r) {
    var i = 0,
        c = 0,
        m = Math.min(a.t, this.t);
    while (i < m) {
      c += this[i] - a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    if (a.t < this.t) {
      c -= a.s;
      while (i < this.t) {
        c += this[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c += this.s;
    } else {
      c += this.s;
      while (i < a.t) {
        c -= a[i];
        r[i++] = c & this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c < -1) r[i++] = this.DV + c;else if (c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  function bnpMultiplyTo(a, r) {
    var x = this.abs(),
        y = a.abs();
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) {
      r[i] = 0;
    }for (i = 0; i < y.t; ++i) {
      r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
    }r.s = 0;
    r.clamp();
    if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
  }

  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2 * x.t;
    while (--i >= 0) {
      r[i] = 0;
    }for (i = 0; i < x.t - 1; ++i) {
      var c = x.am(i, x[i], r, 2 * i, 0, 1);
      if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
        r[i + x.t] -= x.DV;
        r[i + x.t + 1] = 1;
      }
    }
    if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
    r.s = 0;
    r.clamp();
  }

  function bnpDivRemTo(m, q, r) {
    var pm = m.abs();
    if (pm.t <= 0) return;
    var pt = this.abs();
    if (pt.t < pm.t) {
      if (q != null) q.fromInt(0);
      if (r != null) this.copyTo(r);
      return;
    }
    if (r == null) r = nbi();
    var y = nbi(),
        ts = this.s,
        ms = m.s;
    var nsh = this.DB - nbits(pm[pm.t - 1]);
    if (nsh > 0) {
      pm.lShiftTo(nsh, y);
      pt.lShiftTo(nsh, r);
    } else {
      pm.copyTo(y);
      pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 === 0) return;
    var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
    var d1 = this.FV / yt,
        d2 = (1 << this.F1) / yt,
        e = 1 << this.F2;
    var i = r.t,
        j = i - ys,
        t = q == null ? nbi() : q;
    y.dlShiftTo(j, t);
    if (r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t, r);
    }
    BigInteger.ONE.dlShiftTo(ys, t);
    t.subTo(y, y);
    while (y.t < ys) {
      y[y.t++] = 0;
    }while (--j >= 0) {
      var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
      if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
        y.dlShiftTo(j, t);
        r.subTo(t, r);
        while (r[i] < --qd) {
          r.subTo(t, r);
        }
      }
    }
    if (q != null) {
      r.drShiftTo(ys, q);
      if (ts != ms) BigInteger.ZERO.subTo(q, q);
    }
    r.t = ys;
    r.clamp();
    if (nsh > 0) r.rShiftTo(nsh, r);
    if (ts < 0) BigInteger.ZERO.subTo(r, r);
  }

  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a, null, r);
    if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
    return r;
  }

  function Classic(m) {
    this.m = m;
  }

  function cConvert(x) {
    if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);else return x;
  }

  function cRevert(x) {
    return x;
  }

  function cReduce(x) {
    x.divRemTo(this.m, null, x);
  }

  function cMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  }

  function cSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
  }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  function bnpInvDigit() {
    if (this.t < 1) return 0;
    var x = this[0];
    if ((x & 1) === 0) return 0;
    var y = x & 3;
    y = y * (2 - (x & 0xf) * y) & 0xf;
    y = y * (2 - (x & 0xff) * y) & 0xff;
    y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff;
    y = y * (2 - x * y % this.DV) % this.DV;
    return y > 0 ? this.DV - y : -y;
  }

  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << m.DB - 15) - 1;
    this.mt2 = 2 * m.t;
  }

  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t, r);
    r.divRemTo(this.m, null, r);
    if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
    return r;
  }

  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  function montReduce(x) {
    while (x.t <= this.mt2) {
      x[x.t++] = 0;
    }for (var i = 0; i < this.m.t; ++i) {
      var j = x[i] & 0x7fff;
      var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;

      j = i + this.m.t;
      x[j] += this.m.am(0, u0, x, i, 0, this.m.t);

      while (x[j] >= x.DV) {
        x[j] -= x.DV;
        x[++j]++;
      }
    }
    x.clamp();
    x.drShiftTo(this.m.t, x);
    if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
  }

  function montSqrTo(x, r) {
    x.squareTo(r);
    this.reduce(r);
  }

  function montMulTo(x, y, r) {
    x.multiplyTo(y, r);
    this.reduce(r);
  }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  function bnpIsEven() {
    return (this.t > 0 ? this[0] & 1 : this.s) === 0;
  }

  function bnpExp(e, z) {
    if (e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(),
        r2 = nbi(),
        g = z.convert(this),
        i = nbits(e) - 1;
    g.copyTo(r);
    while (--i >= 0) {
      z.sqrTo(r, r2);
      if ((e & 1 << i) > 0) z.mulTo(r2, g, r);else {
        var t = r;
        r = r2;
        r2 = t;
      }
    }
    return z.revert(r);
  }

  function bnModPowInt(e, m) {
    var z;
    if (e < 256 || m.isEven()) z = new Classic(m);else z = new Montgomery(m);
    return this.exp(e, z);
  }

  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = [];
  }

  function ARC4init(key) {
    var i, j, t;
    for (i = 0; i < 256; ++i) {
      this.S[i] = i;
    }j = 0;
    for (i = 0; i < 256; ++i) {
      j = j + this.S[i] + key[i % key.length] & 255;
      t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
  }

  function ARC4next() {
    var t;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[t + this.S[this.i] & 255];
  }

  Arcfour.prototype.init = ARC4init;
  Arcfour.prototype.next = ARC4next;

  function prng_newstate() {
    return new Arcfour();
  }

  var rng_psize = 256;

  var rng_state;
  var rng_pool;
  var rng_pptr;

  function rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= x >> 8 & 255;
    rng_pool[rng_pptr++] ^= x >> 16 & 255;
    rng_pool[rng_pptr++] ^= x >> 24 & 255;
    if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
  }

  function rng_seed_time() {
    rng_seed_int(new Date().getTime());
  }

  if (rng_pool == null) {
    rng_pool = [];
    rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
      var ua = new Uint8Array(32);
      window.crypto.getRandomValues(ua);
      for (t = 0; t < 32; ++t) {
        rng_pool[rng_pptr++] = ua[t];
      }
    }
    if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
      var z = window.crypto.random(32);
      for (t = 0; t < z.length; ++t) {
        rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
      }
    }
    while (rng_pptr < rng_psize) {
      t = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = t >>> 8;
      rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
  }

  function rng_get_byte() {
    if (rng_state == null) {
      rng_seed_time();
      rng_state = prng_newstate();
      rng_state.init(rng_pool);
      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
      }rng_pptr = 0;
    }

    return rng_state.next();
  }

  function rng_get_bytes(ba) {
    var i;
    for (i = 0; i < ba.length; ++i) {
      ba[i] = rng_get_byte();
    }
  }

  function SecureRandom() {}

  SecureRandom.prototype.nextBytes = rng_get_bytes;

  function parseBigInt(str, r) {
    return new BigInteger(str, r);
  }

  function linebrk(s, n) {
    var ret = "";
    var i = 0;
    while (i + n < s.length) {
      ret += s.substring(i, i + n) + "\n";
      i += n;
    }
    return ret + s.substring(i, s.length);
  }

  function byte2Hex(b) {
    if (b < 0x10) return "0" + b.toString(16);else return b.toString(16);
  }

  function pkcs1pad2(s, n) {
    if (n < s.length + 11) {
      window.console && window.console.error("Message too long for RSA");
      return null;
    }
    var ba = [];
    var i = s.length - 1;
    while (i >= 0 && n > 0) {
      var c = s.charCodeAt(i--);
      if (c < 128) {
        ba[--n] = c;
      } else if (c > 127 && c < 2048) {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 | 192;
      } else {
        ba[--n] = c & 63 | 128;
        ba[--n] = c >> 6 & 63 | 128;
        ba[--n] = c >> 12 | 224;
      }
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = [];
    while (n > 2) {
      x[0] = 0;
      while (x[0] === 0) {
        rng.nextBytes(x);
      }ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
  }

  function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
  }

  function RSASetPublic(N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N, 16);
      this.e = parseInt(E, 16);
    } else window.console && window.console.error("Invalid RSA public key");
  }

  function RSADoPublic(x) {
    return x.modPowInt(this.e, this.n);
  }

  function RSAEncrypt(text) {
    var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
    if (m == null) return null;
    var c = this.doPublic(m);
    if (c == null) return null;
    var h = c.toString(16);
    if ((h.length & 1) === 0) return h;else return "0" + h;
  }

  RSAKey.prototype.doPublic = RSADoPublic;

  RSAKey.prototype.setPublic = RSASetPublic;
  RSAKey.prototype.encrypt = RSAEncrypt;


  var rsa = new RSAKey();
  rsa.setPublic(window.BBC.publicKey, "10001");

  function encrypt(msg) {
    return rsa.encrypt(msg) || '';
  };
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./mutation_types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.mutation_types);
        global.actions = mod.exports;
    }
})(this, function (exports, _mutation_types) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setBranchInfoList = setBranchInfoList;
    exports.updateAdminDescription = updateAdminDescription;

    var TYPES = _interopRequireWildcard(_mutation_types);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function setBranchInfoList(_ref, branchList) {
        var commit = _ref.commit;

        return commit(TYPES.SET_BRANCH_INFO_LIST, branchList);
    }

    function updateAdminDescription(_ref2, description) {
        var commit = _ref2.commit;

        commit(TYPES.UPDATE_ADMIN_DESCRIPTION, description);
    }
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(31), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/helpers/defineProperty'), require('../mutation_types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.defineProperty, global.mutation_types);
        global.admin = mod.exports;
    }
})(this, function (module, exports, _defineProperty2, _mutation_types) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _defineProperty3 = _interopRequireDefault(_defineProperty2);

    var TYPES = _interopRequireWildcard(_mutation_types);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var state = {
        description: ''
    };

    var mutations = (0, _defineProperty3.default)({}, TYPES.UPDATE_ADMIN_DESCRIPTION, function (state, description) {
        state.description = description;
    });

    exports.default = {
        state: state,
        mutations: mutations
    };
    module.exports = exports['default'];
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(31), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/helpers/defineProperty'), require('../mutation_types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.defineProperty, global.mutation_types);
        global.branch = mod.exports;
    }
})(this, function (module, exports, _defineProperty2, _mutation_types) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _defineProperty3 = _interopRequireDefault(_defineProperty2);

    var TYPES = _interopRequireWildcard(_mutation_types);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var state = {
        branchList: []
    };

    var mutations = (0, _defineProperty3.default)({}, TYPES.SET_BRANCH_INFO_LIST, function (state, branchList) {
        state.branchList = branchList;
    });

    exports.default = {
        state: state,
        mutations: mutations
    };
    module.exports = exports['default'];
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(5), __webpack_require__(43), __webpack_require__(98), __webpack_require__(70), __webpack_require__(71), __webpack_require__(72)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('vue'), require('vuex'), require('vuex/dist/logger'), require('./actions'), require('./modules/admin'), require('./modules/branch'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.vue, global.vuex, global.logger, global.actions, global.admin, global.branch);
        global.store = mod.exports;
    }
})(this, function (module, exports, _vue, _vuex, _logger, _actions, _admin, _branch) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _vue2 = _interopRequireDefault(_vue);

    var _vuex2 = _interopRequireDefault(_vuex);

    var _logger2 = _interopRequireDefault(_logger);

    var actions = _interopRequireWildcard(_actions);

    var _admin2 = _interopRequireDefault(_admin);

    var _branch2 = _interopRequireDefault(_branch);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _vue2.default.use(_vuex2.default);
    var DEBUG = "production" !== 'production';

    exports.default = new _vuex2.default.Store({

        strict: DEBUG,
        plugins: DEBUG ? [(0, _logger2.default)()] : [],

        modules: {
            branch: _branch2.default,
            admin: _admin2.default
        },
        actions: actions
    });
    module.exports = exports['default'];
});

/***/ }),
/* 74 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(28))(255)

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(259)

/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(22), __webpack_require__(20), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/regenerator'), require('src/util/co_not_reject'), require('vue'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.regenerator, global.co_not_reject, global.vue);
        global.relogin = mod.exports;
    }
})(this, function (module, exports, _regenerator, _co_not_reject, _vue) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = relogin;

    var _regenerator2 = _interopRequireDefault(_regenerator);

    var _co_not_reject2 = _interopRequireDefault(_co_not_reject);

    var _vue2 = _interopRequireDefault(_vue);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var vm = new _vue2.default({});
    var goTo = void 0;

    function logout() {
        return (0, _co_not_reject2.default)(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return vm.$http.post('logout');

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    }

    function redirect() {
        if (false) {
            window.location.href = './login.html';
        } else {
            window.location.href = goTo ? 'https://' + goTo + '/bbc/login' : './login';
        }
    }

    function relogin(ip) {
        var forceLogout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        goTo = ip;
        if (forceLogout) {
            logout().then(redirect).catch(redirect);
        } else {
            redirect();
        }
    }
    module.exports = exports['default'];
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(44), __webpack_require__(78), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/map'), require('src/util/logger'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.getIterator, global.map, global.logger);
        global.task_list = mod.exports;
    }
})(this, function (exports, _getIterator2, _map, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.regist = regist;
    exports.unregist = unregist;

    var _getIterator3 = _interopRequireDefault(_getIterator2);

    var _map2 = _interopRequireDefault(_map);

    var _logger2 = _interopRequireDefault(_logger);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var TASKS = new _map2.default();

    function regist(name, Task) {
        if (!name) {
            _logger2.default.error('[intervalTask] [taskList] Task must have a name');
            return;
        }
        if (TASKS.has(name)) {
            _logger2.default.warn('[intervalTask] [taskList] Task: ' + name + ' is exist');
        }

        TASKS.set(name, Task);
    }

    function unregist(name) {
        if (typeof name === 'string') {
            TASKS.delete(name);
            return;
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(TASKS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref2 = _step.value;
                var key = _ref2.key,
                    value = _ref2.value;

                if (value === name) {
                    TASKS.delete(key);
                    return;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    exports.default = TASKS;
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.uuid = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = uuid;


  var idSeed = 0;

  function uuid(prefix) {
    return (prefix || 'sf-id-') + idSeed++;
  }
  module.exports = exports['default'];
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(29))(257)

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(29))(258)

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(28))(676)

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(72)

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5), __webpack_require__(43), __webpack_require__(223), __webpack_require__(40), __webpack_require__(65), __webpack_require__(189), __webpack_require__(67), __webpack_require__(4), __webpack_require__(73), __webpack_require__(205), __webpack_require__(202), __webpack_require__(183), __webpack_require__(75), __webpack_require__(74), __webpack_require__(190)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('vue'), require('vuex'), require('vue-router'), require('sf-vue-component'), require('src/i18n/index'), require('src/util/vtypes/vtypes'), require('src/util/ajax'), require('src/util/logger'), require('src/vuex/store'), require('./header/header.vue'), require('./footer/footer.vue'), require('./interval_task/index'), require('babel-polyfill'), require('sf-vue-component/dist/static/css/widgets.css'), require('src/home/mod_common/style/common.css'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.vue, global.vuex, global.vueRouter, global.sfVueComponent, global.index, global.vtypes, global.ajax, global.logger, global.store, global.header, global.footer, global.index, global.babelPolyfill, global.widgets, global.common);
        global.fire = mod.exports;
    }
})(this, function (exports, _vue, _vuex, _vueRouter, _sfVueComponent, _index, _vtypes, _ajax, _logger, _store, _header, _footer, _index3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.init = init;

    var _vue2 = _interopRequireDefault(_vue);

    var _vuex2 = _interopRequireDefault(_vuex);

    var _vueRouter2 = _interopRequireDefault(_vueRouter);

    var _sfVueComponent2 = _interopRequireDefault(_sfVueComponent);

    var _index2 = _interopRequireDefault(_index);

    var _vtypes2 = _interopRequireDefault(_vtypes);

    var Ajax = _interopRequireWildcard(_ajax);

    var _logger2 = _interopRequireDefault(_logger);

    var _store2 = _interopRequireDefault(_store);

    var _header2 = _interopRequireDefault(_header);

    var _footer2 = _interopRequireDefault(_footer);

    var IntervalTask = _interopRequireWildcard(_index3);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _vue2.default.config.devtools = true;

    var i18n = {
        lang: window.BBC.lang
    };

    _vue2.default.use(_vuex2.default);

    Ajax.init();

    _vue2.default.use(_vueRouter2.default);

    _vue2.default.use(_sfVueComponent2.default, i18n);

    _vue2.default.use(_index2.default, i18n);

    _vue2.default.use(_vtypes2.default);

    var router = void 0;
    var app = void 0;
    var activeTab = '/index';

    function initRouter() {
        router = new _vueRouter2.default({
            routes: [{
                name: 'index',
                path: '/index*',
                component: function component(resolve) {
                    __webpack_require__.e/* require.ensure */(0).then((function (require) {
                        return resolve(__webpack_require__(227));
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                }
            }]
        });
        router.beforeEach(function (to, form, next) {
            activeTab = to.path;

            var match = activeTab.match(/^(\/[^\/]+).*/);
            if (!to.matched || !to.matched.length || !match) {
                next('/index');
                return;
            }
            activeTab = match[1];
            if (app) {
                app.activeTab = activeTab;
            }
            next();
        });
        return router;
    }

    function initHFS() {
        _logger2.default.log('init HFS');
    }

    function initApp() {

        app = new _vue2.default({
            data: function data() {
                return {
                    activeTab: activeTab
                };
            },

            router: router,
            store: _store2.default,
            template: '\n            <div id="opa">\n                <bbc-header :active-tab="activeTab" ref="headerComp" />\n                <div id="body" :class="{maintain: activeTab !== \'/index\'}">\n                    <keep-alive>\n                        <router-view></router-view>\n                    </keep-alive>\n                </div>\n                <bbc-footer />\n            </div>\n        ',
            components: {
                BbcHeader: _header2.default,
                BbcFooter: _footer2.default
            }
        });
        app.$mount('#app');
        window.BBC.$root = app;

        IntervalTask.run();
    }

    function init() {
        initRouter();

        initHFS();

        initApp();
    }

    init();
});

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(68), __webpack_require__(170)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('src/util/interval_task'), require('wind-dom'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.interval_task, global.windDom);
        global.footer = mod.exports;
    }
})(this, function (module, exports, _interval_task, _windDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _interval_task2 = _interopRequireDefault(_interval_task);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        data: function data() {
            return {
                year: new Date().getFullYear()
            };
        },
        created: function created() {
            this.task = new _interval_task2.default({
                interval: 500,
                fn: this.rePosition
            });
        },
        mounted: function mounted() {
            this.task.start();
        },


        methods: {
            rePosition: function rePosition(done) {
                var docHeight = document.documentElement.clientHeight;
                var header = document.getElementById('header-wrap');
                var headerHeight = header.getBoundingClientRect().height;
                var body = document.getElementById('body');
                var bodyHeight = body.getBoundingClientRect().height;
                var footer = document.getElementById('footer-wrap');
                var footerHeight = footer.getBoundingClientRect().height;

                if (docHeight < headerHeight + bodyHeight + footerHeight) {
                    (0, _windDom.addClass)(footer, 'footer-relative');
                } else {
                    (0, _windDom.removeClass)(footer, 'footer-relative');
                }

                done();
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(77), __webpack_require__(22), __webpack_require__(204), __webpack_require__(20), __webpack_require__(99), __webpack_require__(69)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/core-js/json/stringify'), require('babel-runtime/regenerator'), require('./auth_form.vue'), require('src/util/co_not_reject'), require('src/home/mod_common/admin/relogin'), require('src/util/rsa'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.stringify, global.regenerator, global.auth_form, global.co_not_reject, global.relogin, global.rsa);
        global.auth = mod.exports;
    }
})(this, function (module, exports, _stringify, _regenerator, _auth_form, _co_not_reject, _relogin, _rsa) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _stringify2 = _interopRequireDefault(_stringify);

    var _regenerator2 = _interopRequireDefault(_regenerator);

    var _auth_form2 = _interopRequireDefault(_auth_form);

    var _co_not_reject2 = _interopRequireDefault(_co_not_reject);

    var _relogin2 = _interopRequireDefault(_relogin);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        created: function created() {
            this._checkDefaultPwd();
            this.$store.dispatch('updateAdminDescription', window.BBC.user.description);
        },


        computed: {
            ident: function ident() {
                var IDENT = {
                    admin: _('系统管理员'),
                    region: _('区域管理员'),
                    guest: _('访客')
                };
                return window.BBC.user.name === 'admin' ? _('超级管理员') : IDENT[window.BBC.user.role] || IDENT.admin;
            },
            name: function name() {
                return window.BBC.user.name;
            },
            description: function description() {
                return this.$store.state.admin.description || '-';
            }
        },

        methods: {
            _checkDefaultPwd: function _checkDefaultPwd() {
                var me = this;
                (0, _co_not_reject2.default)(_regenerator2.default.mark(function _callee() {
                    var _ref, jsonData, confirmConf;

                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return me.$http.get('manage/users/is_admin_password_original');

                                case 2:
                                    _ref = _context.sent;
                                    jsonData = _ref.jsonData;

                                    if (jsonData.success) {
                                        _context.next = 7;
                                        break;
                                    }

                                    me.$showErr(jsonData.msg || _('获取用户信息失败'));
                                    return _context.abrupt('return');

                                case 7:
                                    if (jsonData.data.original) {
                                        confirmConf = {
                                            closeable: false,
                                            msg: _('检测到登录密码为系统初始密码，为了系统安全，强烈建议您修改密码！'),
                                            buttons: [{
                                                actionName: 'submit',
                                                text: _('修改密码')
                                            }],
                                            submit: function submit() {
                                                me.changePwd();
                                            }
                                        };


                                        if (!jsonData.data.force) {
                                            confirmConf.closeable = true;
                                            confirmConf.buttons.push('cancel');
                                        }

                                        me.$confirm(confirmConf);
                                    }

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            },
            _createPwdFormWindow: function _createPwdFormWindow() {
                if (this.pwdWindow) {
                    return;
                }
                this.pwdWindow = this.$modal(_auth_form2.default, {
                    title: _('修改密码'),
                    width: 400,
                    height: 260
                });
            },
            changePwd: function changePwd() {
                var me = this;
                this._createPwdFormWindow();
                this.pwdWindow.open({
                    reset: true,
                    data: {
                        id: window.BBC.user.id,
                        name: window.BBC.user.name
                    },
                    submit: function submit() {
                        var pwdData = me.pwdWindow.formRoot.$data;
                        var encryptOldPwd = (0, _rsa.encrypt)(pwdData.login_password);
                        var encryptPwd = (0, _rsa.encrypt)(pwdData.password);

                        me.pwdWindow.$mask();
                        (0, _co_not_reject2.default)(_regenerator2.default.mark(function _callee2() {
                            var _ref2, jsonData;

                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.next = 2;
                                            return me.$http.put('manage/users/user', (0, _stringify2.default)({
                                                id: pwdData.id,
                                                name: pwdData.name,
                                                login_password: encryptOldPwd,
                                                password: encryptPwd,
                                                rePassword: encryptPwd
                                            }));

                                        case 2:
                                            _ref2 = _context2.sent;
                                            jsonData = _ref2.jsonData;


                                            me.pwdWindow.$unmask();

                                            if (jsonData.success) {
                                                _context2.next = 8;
                                                break;
                                            }

                                            me.$showErr(jsonData.msg || _('修改密码失败'));
                                            return _context2.abrupt('return');

                                        case 8:
                                            me.pwdWindow.hide();
                                            me.$ok(jsonData.msg || _('修改密码成功'));

                                            (0, _relogin2.default)();

                                        case 11:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, this);
                        }));
                    }
                });
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(41)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('src/util/format'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.format);
        global.auth_form = mod.exports;
    }
})(this, function (module, exports, _format) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        data: function data() {
            return {
                id: window.BBC.user.id || '',
                name: window.BBC.user.name,
                login_password: '',
                password: '',
                rePassword: ''
            };
        },


        methods: {
            rePwdValidator: function rePwdValidator() {
                if (this.password && this.rePassword && this.password !== this.rePassword) {
                    return _('密码输入不一致');
                }
                return true;
            },
            pwdValidator: function pwdValidator(password) {
                var usrname = this.name;
                var nameReg = usrname ? new RegExp((0, _format.escapeRegex)(usrname)) : null;
                var lower = /[a-z]+/;
                var upper = /[A-Z]+/;
                var number = /[0-9]+/;
                var special = /[~`@#%&<>"',;_\-\^\$\.\*\+\?\=\!\:\|\{\}\(\)\[\]\/\\]+/;
                var illegal = /[^a-zA-Z0-9~`@#%&<>"',;_\-\^\$\.\*\+\?\=\!\:\|\{\}\(\)\[\]\/\\]+/;
                var kinds = 0;
                var TYPE_COUNT = 2;

                if (nameReg && nameReg.test(password)) {
                    return _('密码中不能包含用户名');
                }
                if (illegal.test(password)) {
                    return _('密码中存在非法字符，特殊字符支持{0}', '`@#%&<>\"\',;_-^$.*+?=!:|{}()[]/\\');
                }
                kinds += lower.test(password) ? 1 : 0;
                kinds += upper.test(password) ? 1 : 0;
                kinds += number.test(password) ? 1 : 0;
                kinds += special.test(password) ? 1 : 0;
                if (kinds < TYPE_COUNT) {
                    return _('密码至少应包含大写字母、小写字母、数字和特殊字符中的两项');
                }
                return true;
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(22), __webpack_require__(79), __webpack_require__(206), __webpack_require__(210), __webpack_require__(209), __webpack_require__(208), __webpack_require__(203), __webpack_require__(207), __webpack_require__(68), __webpack_require__(20)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/core-js/object/assign'), require('./logo.vue'), require('./nav.vue'), require('./msg_icon.vue'), require('./msg.vue'), require('./auth.vue'), require('./logout.vue'), require('src/util/interval_task'), require('src/util/co_not_reject'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.regenerator, global.assign, global.logo, global.nav, global.msg_icon, global.msg, global.auth, global.logout, global.interval_task, global.co_not_reject);
        global.header = mod.exports;
    }
})(this, function (module, exports, _regenerator, _assign, _logo, _nav, _msg_icon, _msg, _auth, _logout, _interval_task, _co_not_reject) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _regenerator2 = _interopRequireDefault(_regenerator);

    var _assign2 = _interopRequireDefault(_assign);

    var _logo2 = _interopRequireDefault(_logo);

    var _nav2 = _interopRequireDefault(_nav);

    var _msg_icon2 = _interopRequireDefault(_msg_icon);

    var _msg2 = _interopRequireDefault(_msg);

    var _auth2 = _interopRequireDefault(_auth);

    var _logout2 = _interopRequireDefault(_logout);

    var _interval_task2 = _interopRequireDefault(_interval_task);

    var _co_not_reject2 = _interopRequireDefault(_co_not_reject);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var MSG_URL = 'msg/get_msg_bar';
    var INTERVAL = 30000;

    var MSG_LAYER_CONFIG = {
        maxHeight: 350,
        closeable: true,
        cls: 'msg-layer',
        anchor: 'bottom-end',
        autoScrollbar: true,
        appendToBody: true
    };

    var QUICK_LAYER_CONFIG = {
        maxHeight: 350,
        offset: '0 5',
        cls: 'quick-msg',
        closeable: true,
        arrowHide: true,
        autoHide: false,
        autoMask: false,
        anchor: 'bottom'
    };

    exports.default = {
        name: 'sf-header',

        props: {
            activeTab: {
                type: String,
                'default': '/index'
            }
        },

        data: function data() {
            return {
                alertMsg: [],
                notifyMsg: [],
                noReadAlertList: [],
                noReadNotifyList: []
            };
        },
        mounted: function mounted() {
            this.createAleryMsgLayer();
            this.createNotifyMsgLayer();
            this.createAlertQuickLayer();
            this.createNotifyQuickLayer();
            this.createTask();
        },


        methods: {
            setActiveTab: function setActiveTab(tab) {
                var navs = this.$refs.navComp.navs;
                navs.every(function (nav) {
                    if (nav.path === tab) {
                        nav.actived = true;
                    } else {
                        nav.actived = false;
                    }
                    return true;
                });
            },
            createAleryMsgLayer: function createAleryMsgLayer() {
                var _this = this;

                this.alertMsgLayer = this.$layer(_msg2.default, (0, _assign2.default)({
                    target: this.$refs.alert.$icon,
                    title: _('告警')
                }, MSG_LAYER_CONFIG));

                this.alertMsgLayer.$on('show', function () {
                    _this.$refs.alert.setCount(0);
                    _this.noReadAlertList = [];
                });
            },
            createNotifyMsgLayer: function createNotifyMsgLayer() {
                var _this2 = this;

                this.notifyMsgLayer = this.$layer(_msg2.default, (0, _assign2.default)({
                    target: this.$refs.notify.$icon,
                    title: _('通知')
                }, MSG_LAYER_CONFIG));

                this.notifyMsgLayer.$on('show', function () {
                    _this2.$refs.notify.setCount(0);
                    _this2.noReadNotifyList = [];
                });
            },
            createAlertQuickLayer: function createAlertQuickLayer() {
                var _this3 = this;

                this.alertQuickLayer = this.$layer(_msg2.default, QUICK_LAYER_CONFIG);

                this.alertQuickLayer.$on('show', function () {
                    _this3.calcPostion();
                });

                this.alertQuickLayer.$on('afterHide', function () {
                    _this3.calcPostion();
                });
            },
            createNotifyQuickLayer: function createNotifyQuickLayer() {
                var _this4 = this;

                this.notifyQuickLayer = this.$layer(_msg2.default, QUICK_LAYER_CONFIG);

                this.notifyQuickLayer.$on('show', function () {
                    _this4.calcPostion();
                });

                this.notifyQuickLayer.$on('afterHide', function () {
                    _this4.calcPostion();
                });
            },
            calcPostion: function calcPostion() {
                var isShowAlert = !this.alertQuickLayer.isHide();
                var isShowNotify = !this.notifyQuickLayer.isHide();

                if (isShowNotify && isShowAlert) {
                    this.notifyQuickLayer.showTo(this.alertQuickLayer.layer.$el);
                }
            },
            createTask: function createTask() {
                var _this5 = this;

                this.intervalTask = new _interval_task2.default({
                    fn: this.fetchMessage,
                    interval: INTERVAL,
                    autoStart: false
                });

                this.fetchMessage().then(function () {
                    _this5.intervalTask.start();
                });
            },
            fetchMessage: function fetchMessage() {
                var vm = this;

                return (0, _co_not_reject2.default)(_regenerator2.default.mark(function _callee() {
                    var _ref, jsonData, alertMsg, notifyMsg;

                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return vm.$http.get(MSG_URL);

                                case 2:
                                    _ref = _context.sent;
                                    jsonData = _ref.jsonData;

                                    if (jsonData.success) {
                                        _context.next = 6;
                                        break;
                                    }

                                    return _context.abrupt('return');

                                case 6:
                                    alertMsg = jsonData.data.alert.map(function (item) {
                                        item.type = 'alert';
                                        return item;
                                    });
                                    notifyMsg = jsonData.data.notification.map(function (item) {
                                        item.type = 'notify';
                                        return item;
                                    });


                                    alertMsg.sort(function (d1, d2) {
                                        return d2.time - d1.time;
                                    });

                                    notifyMsg.sort(function (d1, d2) {
                                        return d2.time - d1.time;
                                    });

                                    vm.updateAlertMsg(alertMsg);
                                    vm.updateNotifyMsg(notifyMsg);

                                    vm.showAlertQuick(alertMsg);
                                    vm.showNotifyQuick(notifyMsg);

                                    vm.intervalTask.next();

                                case 15:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            },
            showAlertQuick: function showAlertQuick(msgList) {
                var _this6 = this;

                if (!msgList.length) {
                    this.alertQuickLayer.hide();
                    return;
                }

                this.alertQuickLayer.update({
                    msgList: [msgList[0]]
                });

                this.alertQuickLayer.formRoot.$nextTick(function () {
                    _this6.alertQuickLayer.showTo(_this6.$refs.notify.$el);
                });
            },
            showNotifyQuick: function showNotifyQuick(msgList) {
                var _this7 = this;

                if (!msgList.length) {
                    this.notifyQuickLayer.hide();
                    return;
                }

                this.notifyQuickLayer.update({
                    msgList: [msgList[0]]
                });

                this.notifyQuickLayer.formRoot.$nextTick(function () {
                    _this7.notifyQuickLayer.showTo(_this7.$refs.notify.$el);
                });
            },
            updateAlertMsg: function updateAlertMsg(msgList) {
                if (this.alertMsgLayer.isHide()) {
                    this.noReadAlertList = msgList.concat(this.noReadAlertList);
                    this.$refs.alert.setCount(this.noReadAlertList.length);
                }

                this.alertMsg = msgList.concat(this.alertMsg);
                this.alertMsgLayer.update({
                    msgList: this.alertMsg
                });
            },
            updateNotifyMsg: function updateNotifyMsg(msgList) {
                if (this.notifyMsgLayer.isHide()) {
                    this.noReadNotifyList = msgList.concat(this.noReadNotifyList);
                    this.$refs.notify.setCount(this.noReadNotifyList.length);
                }

                this.notifyMsg = msgList.concat(this.notifyMsg);
                this.notifyMsgLayer.update({
                    msgList: this.notifyMsg
                });
            }
        },

        watch: {
            activeTab: function activeTab(tab) {
                this.setActiveTab(tab);
            }
        },

        components: {
            BbcLogo: _logo2.default,
            BbcNav: _nav2.default,
            BbcMsgIcon: _msg_icon2.default,
            BbcAuth: _auth2.default,
            BbcLogout: _logout2.default
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(41)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('src/util/format'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.format);
        global.logo = mod.exports;
    }
})(this, function (module, exports, _format) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        data: function data() {
            return {
                title: _('分支业务中心'),
                version: '1.0'
            };
        },


        computed: {
            subTitle: {
                get: function get() {
                    return (0, _format.formatString)('Branch Bussiness Center (BBC {0})', this.version);
                }
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(99)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('src/home/mod_common/admin/relogin'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.relogin);
        global.logout = mod.exports;
    }
})(this, function (module, exports, _relogin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _relogin2 = _interopRequireDefault(_relogin);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        data: function data() {
            return {
                logoutText: _('退出')
            };
        },


        methods: {
            logout: function logout() {
                (0, _relogin2.default)();
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(41)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('src/util/format'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.format);
        global.msg = mod.exports;
    }
})(this, function (module, exports, _format) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var TYPE_CLS = {
        notify: 'msg-type-notify',
        alert: 'msg-type-alert'
    };

    exports.default = {
        props: {},

        data: function data() {
            return {
                msgList: []
            };
        },


        filters: {
            date: function date(value) {
                return (0, _format.encodeDate)(Number(value));
            }
        },

        methods: {
            getTypeCls: function getTypeCls(data) {
                return TYPE_CLS[data.type];
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.msg_icon = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            iconCls: {
                type: String,
                'default': 'fa-envelope-o'
            }
        },

        data: function data() {
            return {
                count: 0
            };
        },
        mounted: function mounted() {
            this.$icon = this.$refs.icon;
        },


        methods: {
            setCount: function setCount(count) {
                this.count = count;
            },
            onClickIcon: function onClickIcon(e) {
                this.$emit('click', e);
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.nav = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {

        props: {
            activeTab: String
        },

        data: function data() {
            var me = this;
            var navs = [{
                path: '/index',
                text: _('首页')
            }, {
                path: '/branch',
                text: _('分支')
            }, {
                path: '/alarm',
                text: _('告警{#nav#}')
            }, {
                path: '/manager',
                text: _('管理')
            }].map(function (nav) {
                nav.actived = me.activeTab === nav.path;
                return nav;
            });
            return {
                navs: navs
            };
        }
    };
    module.exports = exports['default'];
});

/***/ }),
/* 181 */,
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22), __webpack_require__(79), __webpack_require__(30), __webpack_require__(45), __webpack_require__(5), __webpack_require__(100), __webpack_require__(20), __webpack_require__(68)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(require('babel-runtime/regenerator'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('vue'), require('./task_list'), require('src/util/co_not_reject'), require('src/util/interval_task'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.regenerator, global.assign, global.classCallCheck, global.createClass, global.vue, global.task_list, global.co_not_reject, global.interval_task);
        global.branch = mod.exports;
    }
})(this, function (_regenerator, _assign, _classCallCheck2, _createClass2, _vue, _task_list, _co_not_reject, _interval_task) {
    'use strict';

    var _regenerator2 = _interopRequireDefault(_regenerator);

    var _assign2 = _interopRequireDefault(_assign);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _vue2 = _interopRequireDefault(_vue);

    var _co_not_reject2 = _interopRequireDefault(_co_not_reject);

    var _interval_task2 = _interopRequireDefault(_interval_task);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var INTERVAL = 30000;
    var vm = new _vue2.default();

    var Branch = function () {
        function Branch(options) {
            (0, _classCallCheck3.default)(this, Branch);

            this.task = new _interval_task2.default((0, _assign2.default)({
                interval: INTERVAL,
                fn: this.getBranchInfo.bind(this)
            }, options));
        }

        (0, _createClass3.default)(Branch, [{
            key: 'getBranchInfo',
            value: function getBranchInfo() {
                var me = this;
                return (0, _co_not_reject2.default)(_regenerator2.default.mark(function _callee() {
                    var _ref, jsonData;

                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return vm.$http.get('branch/get_branch_info');

                                case 2:
                                    _ref = _context.sent;
                                    jsonData = _ref.jsonData;

                                    me.task.next();

                                    if (jsonData.success) {
                                        _context.next = 8;
                                        break;
                                    }

                                    vm.$showErr(jsonData.msg);
                                    return _context.abrupt('return');

                                case 8:
                                    window.BBC.$root.$store.dispatch('setBranchInfoList', jsonData);

                                case 9:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }
        }, {
            key: 'run',
            value: function run() {
                this.task.start();
            }
        }, {
            key: 'stop',
            value: function stop() {
                this.task.stop();
            }
        }]);
        return Branch;
    }();

    (0, _task_list.regist)('branch', new Branch());
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(113), __webpack_require__(44), __webpack_require__(4), __webpack_require__(100), __webpack_require__(182)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/helpers/slicedToArray'), require('babel-runtime/core-js/get-iterator'), require('src/util/logger'), require('./task_list'), require('./branch'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.slicedToArray, global.getIterator, global.logger, global.task_list, global.branch);
        global.index = mod.exports;
    }
})(this, function (exports, _slicedToArray2, _getIterator2, _logger, _task_list) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.run = run;

    var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

    var _getIterator3 = _interopRequireDefault(_getIterator2);

    var _logger2 = _interopRequireDefault(_logger);

    var _task_list2 = _interopRequireDefault(_task_list);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function run() {

        _logger2.default.log('[intervalTask] run task...');

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(_task_list2.default), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                    key = _step$value[0],
                    task = _step$value[1];

                _logger2.default.log('[intervalTask] run task: ' + key);
                task.run();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
});

/***/ }),
/* 184 */,
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.lang = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function getUTF8Length(s) {
        var totalLength = 0;
        var i = void 0;
        var charCode = void 0;
        s = String(s);

        var ONE = 1;
        var TWO = 2;
        var THREE = 3;

        var U_7F = 0x007f;
        var U_80 = 0x0080;
        var U_7FF = 0x07ff;
        var U_800 = 0x0800;
        var U_FFFF = 0xffff;

        for (i = 0; i < s.length; i++) {
            charCode = s.charCodeAt(i);
            if (charCode < U_7F) {
                totalLength = totalLength + ONE;
            } else if (U_80 <= charCode && charCode <= U_7FF) {
                totalLength += TWO;
            } else if (U_800 <= charCode && charCode <= U_FFFF) {
                totalLength += THREE;
            }
        }
        return totalLength;
    }

    exports.getUTF8Length = getUTF8Length;
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(21), __webpack_require__(78), __webpack_require__(101), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/promise'), require('babel-runtime/core-js/map'), require('src/util/uuid'), require('src/util/logger'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.promise, global.map, global.uuid, global.logger);
        global.timer = mod.exports;
    }
})(this, function (exports, _promise, _map, _uuid, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.sleep = sleep;
    exports.clearSleep = clearSleep;

    var _promise2 = _interopRequireDefault(_promise);

    var _map2 = _interopRequireDefault(_map);

    var _uuid2 = _interopRequireDefault(_uuid);

    var _logger2 = _interopRequireDefault(_logger);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var timeoutMap = new _map2.default();

    function sleep(name, ms) {
        if (arguments.length === 1 && typeof name === 'number') {
            ms = name;
            name = (0, _uuid2.default)();
        }

        return new _promise2.default(function (resolve) {
            var id = window.setTimeout(function () {
                if (timeoutMap.has(name)) {
                    resolve(name);

                    timeoutMap.delete(name);
                } else {
                    _logger2.default.error('[timer] reject: ' + name);
                }
            }, ms);
            timeoutMap.set(name, id);
        });
    }

    function clearSleep(name) {
        if (timeoutMap.has(name)) {
            window.clearTimeout(timeoutMap.get(name));
            timeoutMap.delete(name);
            return true;
        }
        return false;
    }
});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(81), __webpack_require__(30), __webpack_require__(84), __webpack_require__(83), __webpack_require__(40), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('sf-vue-component'), require('vue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.getPrototypeOf, global.classCallCheck, global.possibleConstructorReturn, global.inherits, global.sfVueComponent, global.vue);
    global.validator = mod.exports;
  }
})(this, function (module, exports, _getPrototypeOf, _classCallCheck2, _possibleConstructorReturn2, _inherits2, _sfVueComponent, _vue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _sfVueComponent2 = _interopRequireDefault(_sfVueComponent);

  var _vue2 = _interopRequireDefault(_vue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  _vue2.default.use(_sfVueComponent2.default, { lang: window.BBC.lang });

  var Validator = function (_SfVueComponent$Valid) {
    (0, _inherits3.default)(Validator, _SfVueComponent$Valid);

    function Validator() {
      (0, _classCallCheck3.default)(this, Validator);
      return (0, _possibleConstructorReturn3.default)(this, (Validator.__proto__ || (0, _getPrototypeOf2.default)(Validator)).apply(this, arguments));
    }

    return Validator;
  }(_sfVueComponent2.default.Validator);

  exports.default = Validator;
  module.exports = exports['default'];
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(81), __webpack_require__(30), __webpack_require__(45), __webpack_require__(84), __webpack_require__(83), __webpack_require__(187), __webpack_require__(41), __webpack_require__(185)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../validation/validator'), require('src/util/format'), require('src/util/lang'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.validator, global.format, global.lang);
        global.name = mod.exports;
    }
})(this, function (module, exports, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _validator, _format, _lang) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

    var _inherits3 = _interopRequireDefault(_inherits2);

    var _validator2 = _interopRequireDefault(_validator);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var NameValidator = function (_Validator) {
        (0, _inherits3.default)(NameValidator, _Validator);

        function NameValidator() {
            (0, _classCallCheck3.default)(this, NameValidator);
            return (0, _possibleConstructorReturn3.default)(this, (NameValidator.__proto__ || (0, _getPrototypeOf2.default)(NameValidator)).apply(this, arguments));
        }

        (0, _createClass3.default)(NameValidator, [{
            key: 'verify',
            value: function verify(v) {
                var MAX_LENGTH = 90;
                var MAX_LENGTH_TEXT = _('该输入项的最大长度是90个字符，或者30个汉字');
                var REG = /^[\s\.\(\)\[\]\{\}（）【】｛｝@\d\u4E00-\u9FA5a-zA-Z_+|?\-]+$/;

                v = (0, _format.trim)(v);
                if ((0, _lang.getUTF8Length)(v) > MAX_LENGTH) {
                    return MAX_LENGTH_TEXT;
                }
                if (!REG.test(v)) {
                    return _('该输入项只能由中文、数字、字母、()[]{}（）【】｛｝@|.?_-+组成');
                }

                if (v.length) {
                    if (v.charAt(0) === '.') {
                        return _('该输入项不允许以字符“.”开头');
                    }
                }
                return true;
            }
        }]);
        return NameValidator;
    }(_validator2.default);

    exports.default = NameValidator;
    module.exports = exports['default'];
});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(188), __webpack_require__(40)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../validations/name'), require('sf-vue-component'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.name, global.sfVueComponent);
        global.vtypes = mod.exports;
    }
})(this, function (module, exports, _name, _sfVueComponent) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _name2 = _interopRequireDefault(_name);

    var _sfVueComponent2 = _interopRequireDefault(_sfVueComponent);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function install() {
        var vtypeMap = _sfVueComponent2.default.vtypes;
        vtypeMap.set('name', new _name2.default());

        return vtypeMap;
    }

    exports.default = {
        install: install
    };
    module.exports = exports['default'];
});

/***/ }),
/* 190 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 191 */,
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 194 */,
/* 195 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 196 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 197 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 198 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 199 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 200 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 201 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(193)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(213),
  /* scopeId */
  "data-v-0fe7c786",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(199)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(219),
  /* scopeId */
  "data-v-744905be",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(195)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(174),
  /* template */
  __webpack_require__(215),
  /* scopeId */
  "data-v-19fd5c5c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(192)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(212),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(196)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(176),
  /* template */
  __webpack_require__(216),
  /* scopeId */
  "data-v-2d52a8b8",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(198)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(177),
  /* template */
  __webpack_require__(218),
  /* scopeId */
  "data-v-67463fc3",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(201)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(221),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(197)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(217),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(200)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(220),
  /* scopeId */
  "data-v-c7921d8c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 211 */,
/* 212 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "header-wrap"
    }
  }, [_c('div', {
    staticClass: "maintain",
    attrs: {
      "id": "header"
    }
  }, [_c('bbc-logo'), _vm._v(" "), _c('bbc-nav', {
    ref: "navComp",
    attrs: {
      "active-tab": _vm.activeTab
    }
  }), _vm._v(" "), _c('bbc-msg-icon', {
    ref: "alert",
    staticClass: "msg-alert",
    attrs: {
      "icon-cls": "fa-warning"
    }
  }), _vm._v(" "), _c('bbc-msg-icon', {
    ref: "notify",
    staticClass: "msg-notify",
    attrs: {
      "icon-cls": "iconfont icon-notice"
    }
  }), _vm._v(" "), _c('bbc-auth'), _vm._v(" "), _c('bbc-logout')], 1)])
},staticRenderFns: []}

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "footer-wrap"
    }
  }, [_c('div', {
    staticClass: "maintain",
    attrs: {
      "id": "footer"
    }
  }, [_c('div', {
    attrs: {
      "id": "ft-more"
    }
  }, [_c('ul', {
    staticClass: "ft-more-ul"
  }, [_c('li', {
    staticClass: "ft-more-ul-li wechat-li"
  }, [_c('div', {
    ref: "wechartDom",
    staticClass: "v-ico-wechat hide-v-ico"
  }, [_c('span', {
    staticClass: "circle"
  }), _vm._v(" "), _c('div', {
    staticClass: "wechatText"
  })]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "ft-copyright"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  })])])]), _vm._v(" "), _c('sf-layer', {
    staticClass: "wechart-layer",
    attrs: {
      "default-target": "wechartDom",
      "arrow-hide": false,
      "anchor": "top"
    }
  }, [_c('div', {
    staticClass: "wechart-twodc"
  })])], 1)
},staticRenderFns: []}

/***/ }),
/* 214 */,
/* 215 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('sf-form', [_c('sf-form-item', [_c('sf-form-item', [_c('sf-fieldlabel', [_c('lang', [_vm._v("原密码")])], 1), _vm._v(" "), _c('sf-textfield', {
    attrs: {
      "type": "password",
      "allowBlank": false,
      "default-width": 260
    },
    model: {
      value: (_vm.login_password),
      callback: function($$v) {
        _vm.login_password = $$v
      },
      expression: "login_password"
    }
  })], 1), _vm._v(" "), _c('sf-form-item', [_c('sf-fieldlabel', [_c('lang', [_vm._v("新密码")])], 1), _vm._v(" "), _c('sf-textfield', {
    attrs: {
      "type": "password",
      "allowBlank": false,
      "min-length": 8,
      "max-length": 64,
      "validator": _vm.pwdValidator,
      "default-width": 260
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  }), _vm._v(" "), _c('sf-fieldtip', [_c('lang', [_vm._v("1、密码不能包含用户名")]), _c('br'), _vm._v(" "), _c('lang', [_vm._v("2、密码至少应包含大写字母、小写字母、数字和特殊字符中的两项")])], 1)], 1), _vm._v(" "), _c('sf-form-item', [_c('sf-fieldlabel', [_c('lang', [_vm._v("确认密码 ")])], 1), _vm._v(" "), _c('sf-textfield', {
    attrs: {
      "type": "password",
      "allowBlank": false,
      "default-width": 260,
      "validator": _vm.rePwdValidator
    },
    model: {
      value: (_vm.rePassword),
      callback: function($$v) {
        _vm.rePassword = $$v
      },
      expression: "rePassword"
    }
  })], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hd-logo"
  }, [_c('h1', {
    staticClass: "hd-logo-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('h2', {
    staticClass: "hd-logo-subtitle"
  }, [_vm._v(_vm._s(_vm.subTitle))])])
},staticRenderFns: []}

/***/ }),
/* 217 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bbc-notify"
  }, [_c('i', {
    ref: "icon",
    staticClass: "fa",
    class: _vm.iconCls,
    on: {
      "click": _vm.onClickIcon
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.count > 0),
      expression: "count > 0"
    }],
    staticClass: "bbc-notify-count"
  }, [_vm._v(_vm._s(_vm.count))])])
},staticRenderFns: []}

/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "hd-logout",
      "title": _vm.logoutText
    },
    on: {
      "click": _vm.logout
    }
  }, [_c('i', {
    staticClass: "fa fa-sign-out"
  })])
},staticRenderFns: []}

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "auth",
    attrs: {
      "id": "hd-auth"
    }
  }, [_c('div', {
    staticClass: "ellipsis",
    staticStyle: {
      "color": "rgb(255, 255, 255)"
    },
    attrs: {
      "id": "hd-auth-name",
      "data-hint": "admin"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.name) + "\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "ellipsis",
    staticStyle: {
      "color": "rgb(255, 255, 255)"
    },
    attrs: {
      "id": "hd-auth-role"
    }
  }, [_vm._v(_vm._s(_vm.ident))]), _vm._v(" "), _c('sf-layer', {
    staticClass: "auth-layer",
    attrs: {
      "default-target": "auth",
      "anchor": "bottom",
      "arrow-hide": false
    }
  }, [_c('sf-form', [_c('sf-form-item', [_c('lang', [_vm._v("描述：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.description))])], 1)], 1), _vm._v(" "), _c('sf-toolbar', {
    staticClass: "auth-toolbar"
  }, [_c('sf-button', {
    staticClass: "btn-primary",
    on: {
      "click": _vm.changePwd
    }
  }, [_c('lang', [_vm._v("修改密码")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 220 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "hd-nav"
    }
  }, [_c('ul', _vm._l((_vm.navs), function(nav) {
    return _c('li', {
      staticClass: "hd-nav-item"
    }, [_c('router-link', {
      class: {
        active: nav.actived
      },
      attrs: {
        "to": nav.path
      }
    }, [_vm._v(_vm._s(nav.text))])], 1)
  }))])
},staticRenderFns: []}

/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "msg-wrap"
  }, [(!_vm.msgList.length) ? _c('div', {
    staticClass: "msg-empty"
  }, [_c('lang', [_vm._v("无消息")])], 1) : _vm._l((_vm.msgList), function(item) {
    return _c('div', {
      staticClass: "msg-item"
    }, [_c('span', {
      staticClass: "msg-type",
      class: _vm.getTypeCls(item)
    }), _vm._v(" "), _c('span', {
      staticClass: "msg-info"
    }, [_c('span', {
      staticClass: "msg-time"
    }, [_vm._v("[ " + _vm._s(_vm._f("date")(item.time)) + " ]")]), _vm._v(" "), _c('div', {
      staticClass: "msg-text"
    }, [_vm._v(_vm._s(item.msg))])])])
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 222 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(260)

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(106);


/***/ }),
/* 225 */,
/* 226 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 227 */,
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(222)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ })
],[224]);
//# sourceMappingURL=app.ca9ea20e6f75c1496a23.js.map