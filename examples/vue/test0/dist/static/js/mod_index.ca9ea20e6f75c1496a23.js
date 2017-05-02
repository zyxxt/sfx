webpackJsonp([0],{

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(231)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(229),
  /* template */
  __webpack_require__(232),
  /* scopeId */
  "data-v-9a33873c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 229:
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
        global.welcome = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        data: function data() {
            return {
                msg: ''
            };
        },
        created: function created() {
            this.$http.get('/bbc/login').then(function (res) {
                window.console.log(res);
            });
        }
    };
    module.exports = exports['default'];
});

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(226)();
// imports


// module
exports.push([module.i, "\n.body[data-v-9a33873c] {\n    height: 600px;\n    text-align: center;\n}\n.test[data-v-9a33873c] {\n    font-size: 64px;\n    color: #00FF00;\n}\n\n", "", {"version":3,"sources":["E:/WebstormProject/sfx-github/examples/vue/test0/src/home/mod_index/welcome.vue"],"names":[],"mappings":";AACA;IACI,cAAc;IACd,mBAAmB;CACtB;AACD;IACI,gBAAgB;IAChB,eAAe;CAClB","file":"welcome.vue","sourcesContent":["\n.body[data-v-9a33873c] {\n    height: 600px;\n    text-align: center;\n}\n.test[data-v-9a33873c] {\n    font-size: 64px;\n    color: #00FF00;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(230);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(228)("509bcdb2", content, true);

/***/ }),

/***/ 232:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "body"
  }, [_c('h1', [_vm._v("Welcome")]), _vm._v(" "), _c('p', {
    staticClass: "test"
  }, [_vm._v("this is you project [test0: 1.0.0]")]), _vm._v("\n    " + _vm._s(_vm.msg) + "\n")])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=mod_index.ca9ea20e6f75c1496a23.js.map