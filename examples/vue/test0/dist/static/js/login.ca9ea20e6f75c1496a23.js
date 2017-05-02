webpackJsonp([3],{

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(29))(257)

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(29))(258)

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(28))(676)

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(72)

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(5), __webpack_require__(40), __webpack_require__(65), __webpack_require__(67), __webpack_require__(73), __webpack_require__(211), __webpack_require__(75), __webpack_require__(74)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(exports, require('vue'), require('sf-vue-component'), require('src/i18n/index'), require('src/util/ajax'), require('src/vuex/store'), require('../mod_login/login.vue'), require('babel-polyfill'), require('sf-vue-component/dist/static/css/widgets.css'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.vue, global.sfVueComponent, global.index, global.ajax, global.store, global.login, global.babelPolyfill, global.widgets);
        global.login = mod.exports;
    }
})(this, function (exports, _vue, _sfVueComponent, _index, _ajax, _store, _login) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.init = init;

    var _vue2 = _interopRequireDefault(_vue);

    var _sfVueComponent2 = _interopRequireDefault(_sfVueComponent);

    var _index2 = _interopRequireDefault(_index);

    var Ajax = _interopRequireWildcard(_ajax);

    var _store2 = _interopRequireDefault(_store);

    var _login2 = _interopRequireDefault(_login);

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

    var i18n = {
        lang: 'en'
    };

    Ajax.init();

    _vue2.default.use(_sfVueComponent2.default, i18n);

    _vue2.default.use(_index2.default, i18n);

    function init() {
        var app = new _vue2.default({
            store: _store2.default,
            template: '<login />',
            components: {
                Login: _login2.default
            }
        });
        app.$mount('#app');
    }

    init();
});

/***/ }),

/***/ 17:
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

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(22), __webpack_require__(77), __webpack_require__(20), __webpack_require__(42), __webpack_require__(184), __webpack_require__(69), __webpack_require__(191)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/core-js/json/stringify'), require('src/util/co_not_reject'), require('src/util/local_storage'), require('./capslock'), require('src/util/rsa'), require('./login.css'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.regenerator, global.stringify, global.co_not_reject, global.local_storage, global.capslock, global.rsa, global.login);
        global.login = mod.exports;
    }
})(this, function (module, exports, _regenerator, _stringify, _co_not_reject, _local_storage, _capslock, _rsa) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _regenerator2 = _interopRequireDefault(_regenerator);

    var _stringify2 = _interopRequireDefault(_stringify);

    var _co_not_reject2 = _interopRequireDefault(_co_not_reject);

    var _capslock2 = _interopRequireDefault(_capslock);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var CHROME23 = 23;
    var FIREFOX18 = 18;
    var IE10 = 10;
    var IE6 = 6;

    exports.default = {
        data: function data() {
            return {
                year: new Date().getFullYear(),

                username: '',
                password: '',

                loginText: _('登    录'),
                userHolder: _('用户名'),
                passHolder: _('密码'),

                caplockMsg: false,
                errorMsg: '',

                inputDisabled: false,
                submitDisabled: false,

                visibility: false,
                isIEQuirks: false
            };
        },
        created: function created() {
            this.inputDisabled = this.submitDisabled = !this.checkBrowser() || this.isIEQuirks;
        },
        mounted: function mounted() {
            var me = this;

            this.visibility = true;
            this.posting = false;

            (0, _capslock2.default)({
                el: this.$refs.password,
                change: function change(bFlag) {
                    if (bFlag) {
                        me.caplockMsg = true;
                    } else {
                        me.caplockMsg = false;
                    }
                }
            });
            this.$refs.username.focus();
        },


        methods: {
            checkBrowser: function checkBrowser() {
                var ua = navigator.userAgent;
                var mt = void 0;

                mt = ua.match(/Chrome\/(\d+)/i);
                if (mt && Number(mt[1]) >= CHROME23) {
                    return true;
                }

                mt = ua.match(/Firefox\/(\d+)/i);
                if (mt && Number(mt[1]) >= FIREFOX18) {
                    return true;
                }

                var dm = document.documentMode;

                mt = ua.match(/Trident\/(\d)/i);
                if (dm >= IE10 || mt && Number(mt[1]) >= IE6) {
                    this.isIEQuirks = dm < IE10;
                    return true;
                }

                return false;
            },
            login: function login() {
                if (this.posting) {
                    return;
                }
                var username = this.username.trim();
                var password = this.password.trim();
                if (!username) {
                    this.errMsg = _('用户名不可为空，请检查。');
                    this.$refs.username.focus();
                    return false;
                }
                if (!password) {
                    this.errMsg = _('密码不可为空，请检查。');
                    this.$refs.password.focus();
                    return false;
                }

                password = (0, _rsa.encrypt)(password);

                this.username = username;
                this.password = password;

                this.loginText = _('正在验证用户信息...');
                this.submitDisabled = true;
                this._doLogin({ username: username, password: password });
            },
            _doLogin: function _doLogin(data) {
                var me = this;

                me.posting = true;

                (0, _co_not_reject2.default)(_regenerator2.default.mark(function _callee() {
                    var _ref, jsonData, CSRF_KEY;

                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return me.$http.post('login', (0, _stringify2.default)(data));

                                case 2:
                                    _ref = _context.sent;
                                    jsonData = _ref.jsonData;

                                    me.posting = false;

                                    if (jsonData.success) {
                                        _context.next = 11;
                                        break;
                                    }

                                    me.errorMsg = jsonData && jsonData.msg || _('登录失败');
                                    me.password = '';

                                    me.submitDisabled = false;
                                    me.loginText = _('登    录');
                                    return _context.abrupt('return');

                                case 11:

                                    if (false) {
                                        CSRF_KEY = 'CSRFPreventionToken';

                                        (0, _local_storage.setStorage)(CSRF_KEY, jsonData[CSRF_KEY]);
                                        window.location.href = './' + window.location.search + '#/index';
                                    } else {
                                        window.location.href = './index' + window.location.search + '#/index';
                                    }

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }
        }
    };
    module.exports = exports['default'];
});

/***/ }),

/***/ 184:
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
        global.capslock = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function fEventListen(dom, event, fn, capture) {
        capture = !!capture;
        if (dom.addEventListener) {
            dom.addEventListener(event, fn, capture);
        } else {
            if (dom.attachEvent) {
                dom.attachEvent('on' + event, fn);
            }
        }
    }

    var CapsLock = function CapsLock(opt) {
        if (this instanceof CapsLock) {
            this.initialize(opt);
        } else {
            return new CapsLock(opt);
        }
    };

    var CapLockProto = CapsLock.prototype;

    CapLockProto.initialize = function (opt) {
        var caplock = this;
        var el = opt.el;
        caplock.el = opt.el;
        var k = {
            keypress: function keypress(n) {
                caplock._keyPress(n);
            },
            keydown: function keydown(n) {
                caplock._keyDown(n);
            },
            blur: function blur(n) {
                caplock._blur(n);
            }
        };
        caplock.capsLockInfo = k;
        caplock.change = opt.change;
        fEventListen(el, 'keypress', k.keypress);
        fEventListen(el, 'keydown', k.keydown);
        fEventListen(el, 'blur', k.blur);
    };

    CapLockProto.isOn = function () {
        return this.status;
    };

    CapLockProto.trigger = function () {
        if (this.change) {
            this.change(this.status);
        }
    };

    CapLockProto._keyDown = function (evt) {
        var caplock = this;
        var keyCode = evt.which || evt.keyCode;
        var CAPS_LOCK = 20;
        if (keyCode === CAPS_LOCK && typeof caplock.status !== 'undefined') {
            caplock.preStatus = caplock.status = !caplock.status;
            caplock.trigger(caplock.status);
        }
    };

    CapLockProto._keyPress = function (evt) {
        var m = this;
        var keyCode = evt.which || evt.keyCode;
        var k = false;
        var MODIFIERS = 4;
        if (evt.shiftKey) {
            k = true;
        } else {
            if (evt.modifiers) {
                k = !!(evt.modifiers & MODIFIERS);
            }
        }
        var l = m.preStatus;
        m.preStatus = m.status;

        var A = 65;
        var Z = 90;
        var LOW_A = 97;
        var LOW_Z = 122;

        if (keyCode >= A && keyCode <= Z && !k || keyCode >= LOW_A && keyCode < LOW_Z && k) {
            m.status = true;
        } else {
            if (keyCode >= A && keyCode <= Z && k || keyCode >= LOW_A && keyCode < LOW_Z && !k) {
                m.status = false;
            } else {
                m.status = l;
            }
        }
        if (m.status !== m.preStatus) {
            m.trigger(m.status);
        }
    };

    CapLockProto._blur = function () {
        var j = this;
        delete j.preStatus;
        delete j.status;
        j.trigger(j.status);
    };

    exports.default = CapsLock;
    module.exports = exports['default'];
});

/***/ }),

/***/ 191:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 194:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 20:
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

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(194)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(214),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 214:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "bg"
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-in-linear"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visibility),
      expression: "visibility"
    }],
    attrs: {
      "id": "container"
    }
  }, [_c('div', {
    attrs: {
      "id": "logo"
    }
  }), _vm._v(" "), _c('div', {
    attrs: {
      "id": "left-content"
    }
  }), _vm._v(" "), _c('div', {
    attrs: {
      "id": "right-content"
    }
  }, [_c('div', {
    attrs: {
      "id": "title"
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.username),
      expression: "username"
    }],
    ref: "username",
    attrs: {
      "type": "text",
      "id": "user_name",
      "name": "user_name",
      "placeholder": _vm.userHolder,
      "disabled": _vm.inputDisabled
    },
    domProps: {
      "value": (_vm.username)
    },
    on: {
      "keypress": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.login($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.username = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    ref: "password",
    attrs: {
      "type": "password",
      "id": "password",
      "name": "password",
      "placeholder": _vm.passHolder,
      "disabled": _vm.inputDisabled
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "keypress": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.login($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorMsg),
      expression: "errorMsg"
    }],
    attrs: {
      "id": "login-fail-message"
    }
  }, [_vm._v(_vm._s(_vm.errorMsg))]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.loginText),
      expression: "loginText"
    }],
    attrs: {
      "type": "button",
      "id": "login",
      "name": "login",
      "disabled": _vm.submitDisabled
    },
    domProps: {
      "value": (_vm.loginText)
    },
    on: {
      "click": _vm.login,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.loginText = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.caplockMsg),
      expression: "caplockMsg"
    }],
    attrs: {
      "id": "caplock-message"
    }
  }, [_c('lang', [_vm._v("大写锁定打开")])], 1)])])]), _vm._v(" "), (_vm.isIEQuirks) ? _c('div', {
    staticClass: "brw-update"
  }, [_c('p', [_c('lang', [_vm._v("您当前处于兼容性视图模式，无法获得良好的体验，请设置为标准模式再尝试登陆！")])], 1)]) : _vm._e(), _vm._v(" "), (!_vm.checkBrowser() && !_vm.isIEQuirks) ? _c('div', {
    staticClass: "brw-update"
  }, [_c('p', [_c('lang', [_vm._v("您所使用的浏览器版本过于陈旧，无法获得良好的体验，建议升级为下面的浏览器：")])], 1), _vm._v(",\n        "), _vm._m(0), _vm._v(",\n    ")]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "id": "ft-copyright"
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ol', {
    staticClass: "down-link"
  }, [_c('li', [_c('a', {
    staticClass: "cr",
    attrs: {
      "href": "http://www.google.cn/intl/zh-CN/chrome/",
      "target": "_blank"
    }
  }, [_vm._v("Chrome 23+")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "ff",
    attrs: {
      "href": "http://www.firefox.com.cn/download/",
      "target": "_blank"
    }
  }, [_vm._v("Firefox 18+")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "ie",
    attrs: {
      "href": "http://windows.microsoft.com/zh-cn/internet-explorer/download-ie",
      "target": "_blank"
    }
  }, [_vm._v("IE 10+")])])])
}]}

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(107);


/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = babelRuntime;

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = chartsAll;

/***/ }),

/***/ 3:
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

/***/ 4:
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

/***/ 42:
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

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(262)

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(261)

/***/ }),

/***/ 64:
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

/***/ 65:
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

/***/ 66:
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

/***/ 67:
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

/***/ 69:
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

/***/ 70:
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

/***/ 71:
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

/***/ 72:
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

/***/ 73:
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

/***/ 74:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(28))(255)

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(259)

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = vueAll;

/***/ })

},[225]);
//# sourceMappingURL=login.ca9ea20e6f75c1496a23.js.map