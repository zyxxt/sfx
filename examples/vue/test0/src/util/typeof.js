/**
 * 类型
 */

/**
 * Object.prototype.toString
 * @param {*} str    待验证
 * @returns {string} Object.prototype.toString
 */
function toString (str) {
    return Object.prototype.toString.call(str);
}

/**
 * isObject
 * @param {*} str     待验证
 * @returns {boolean} isObject
 */
function isObject (str) {
    return toString(str) === '[object Object]';
}

/**
 * isString
 * @param {*} str     待验证
 * @returns {boolean} isString
 */
function isString (str) {
    return toString(str) === '[object String]';
}

/**
 * isNumber
 * @param {*} str     待验证
 * @returns {boolean} isNumber
 */
function isNumber (str) {
    return toString(str) === '[object Number]';
}

/**
 * isBoolean
 * @param {*} str
 * @returns {boolean} isBoolean
 */
function isBoolean (str) {
    return toString(str) === '[object Boolean]';
}

/**
 * isNull
 * @param {*} str     待验证
 * @returns {boolean} isNull
 */
function isNull (str) {
    return toString(str) === '[object Null]';
}

/**
 * isUndefined
 * @param {*} str     待验证
 * @returns {boolean} isUndefined
 */
function isUndefined (str) {
    return toString(str) === '[object Undefined]';
}

/**
 * isFunction
 * @param {*} str     待验证
 * @returns {boolean} isFunction
 */
function isFunction (str) {
    return toString(str) === '[object Function]';
}

/**
 * isEmptyObject
 * @param {*} obj     待验证
 * @returns {boolean} isEmptyObject
 */
function isEmptyObject (obj) {
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

/**
 * isArray
 * @param {*} str     待验证
 * @returns {boolean} isArray
 */
function isArray (str) {
    return Array.isArray(str);
}

/**
 * isDate
 * @param {*} date
 * @returns {boolean} isDate
 * */
function isDate (date) {
    return date instanceof Date;
}

/* eslint-disable */
function typeOf (str) {
    return toString(str).slice(8, -1);
}

export {
    isObject,
    isString,
    isNumber,
    isBoolean,
    isNull,
    isUndefined,
    isFunction,
    isEmptyObject,
    isArray,
    isDate,
    typeOf
};
