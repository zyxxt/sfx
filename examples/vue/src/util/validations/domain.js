/**
 * 宽松的域名校验规则，以RFC 1035作为标准，可以用于校验内网的私有域名。
 * 同时参考RFC 1123，增加历史已经存在的不标准域名的兼容，共2种：全数字Label、Label含下划线。
 * 但需注意的是为了和IP区分开，根域名不能是全数字。
 * 如果要用于校验现有的国际域名，请使用{@link SF.validations.GlobalName}
 * @class Domain
 * @extends Validator
 */

import Validator from '../validation/validator';

const REGEX = /^([a-z\d]([-_a-z\d]{0,61}[a-z\d])?\.)*[a-z]([-a-z\d]{0,61}[a-z\d])?\.?$/i;

export default class Domain extends Validator {

    verify (value) {
        if (REGEX.test(value)) {
            return true;
        }
        return _('不符合域名格式');
    }

    formalize (value) {
        let str;
        if (value && value.toLowerCase) {
            str = value.toLowerCase();
            if (str !== value) {
                return str;
            }
        }
        return null;
    }
};
