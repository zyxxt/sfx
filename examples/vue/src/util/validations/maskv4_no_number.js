/**
 * Created by ued on 2017/1/17.
 */

import Validator from '../validation/validator';
import { parseIPv4, leftPad } from 'src/util/format';

const BINARY = 2;
const EIGHT = 8;
const FOUR_B = 32;


export default class Maskv4NoNumberValidator extends Validator {

    /**
     * 如果返回string，代表错误信息，正常返回数字，0~32
     * @param {String|Number} value   '255.255.255.0', 24 这两种形式的掩码都支持
     * @return {Number|*}     返回错误信息
     * @private
     */
    _parseMaskToNumber (value) {
        let masks;
        let binMask;
        let i;
        if (value.indexOf('.') > -1) {

            // 255.255.255.0形式
            masks = parseIPv4(value);
            if (masks) {
                binMask = '';
                for (i = 0; i < masks.length; i++) {
                    binMask += leftPad(masks[i].toString(BINARY), EIGHT, '0');
                }
                if (/^(1+0*|0+)$/.test(binMask)) {

                    // fix bug 33732 by zhangzhang, at 2011/09/30.
                    value = binMask.indexOf('0');
                    if (value < 0) {
                        value = FOUR_B;
                    }
                    return value;
                }
                return _('不符合2进制下高位全为1、低位全为0的规则，例如254.255.255.0就是非法的');
            }
            return _('不符合IPv4掩码格式');
        }
        return _('不符合IPv4掩码格式');
    }

    verify (value) {
        let ret;
        if (!value) {
            return _('需要输入IPv4掩码');
        }
        if (typeof value === 'string') {
            value = value.trim();
            ret = this._parseMaskToNumber(value);
        }
        return typeof ret === 'string' ? ret : true;
    }

    formalize (value) {
        let result = this._parseMaskToNumber(value);
        if (!isNaN(result) && typeof result === 'number') {
            result = '' + result;
            if (result !== value) {
                return result;
            }
        }
        return null;
    }
};
