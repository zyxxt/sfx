/**
 * 校验邮箱名，即电子邮箱地址中，“@”前的名字。此校验方法为宽松的，只要符合RFC 2822即可。
 * 更严格的校验请使用{@link SF.validations.StrictEmailName}
 * @class EmailName
 * @extends Validator
 */

import Validator from '../validation/validator';

/* eslint-disable max-len */
const REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")$/i;

/* eslint-enable max-len */

export default class EmailName extends Validator {

    /**
     * 校验函数
     * @override
     * @param {String} value     待校验的值
     * @returns {Boolean|String} 成功返回true，失败返回具体的原因
     */
    verify (value) {
        if (REGEX.test(value)) {
            return true;
        }
        return _('不符合标准格式');
    }
};
