/**
 * 多个validator
 */


import Validator from './validator';
import * as Format from '../format';

/*
 * 应支持maxCount, minCount配置
 * allowComment配置
 */
export default class JoinedCompositeValidator extends Validator {

    /**
     * @cfg {Number} minCount (optional) 最小有效条数
     */
    /**
     * @cfg {String} minCountText (optional) 超出最小条数限制时的信息
     */
    minCountText = '不能小于{0}条';

    /**
     * @cfg {Number} maxCount (optional) 最大有效条数
     */
    /**
     * @cfg {String} maxCounteText (optional) 超出最大条数限制时的信息
     */
    maxCountText = '不能大于{0}条';

    /**
     * @cfg {Boolean} allowComment (optional) 是否允许格式如“#xxx”的注释，默认为false，注释也作为空行。
     */
    /**
     * @cfg {String/Regex} splitter (optional) 字符串的分隔符，默认为 “,”，请注意如果配置它为正则表达式，则需同步更新formalSplitter。
     */
    splitter = ',';

    /**
     * @cfg {String} formalSplitter (optional) 标准换行符，默认为“,”，如果有配置字符串的splitter，则默认与之同步。
     */
    formalSplitter = ',';

    /**
     * @cfg {Boolean} ignoreBlank (optional) 是否忽略前后及分隔符前后的空格，默认为true
     */
    ignoreBlank = true;

    /**
     * @cfg {String} partInvalidText (optional) 行验证失败信息
     */
    partInvalidText = '第{0}条“{2}”校验失败，{1}。';

    /**
     * @cfg {Boolean} 是否强制开启本层的formalize（根据ignoreBlank配置输出含/不含空格的连接字符：“a, b, c”或“a,b,c”），默认为false，
     */
    enableFormalize = false;

    _parseParts (value) {
        if (!value) {
            return []; // 一个都没有
        }
        let parts = value.split(this.splitter);
        let i;
        let result;
        let ignoreBlank = this.ignoreBlank;
        let results = [];
        for (i = 0; i < parts.length; i++) {
            result = parts[i];
            if (ignoreBlank) {
                result = Format.trim(result);
            }
            results.push(result);
        }
        return results;
    }
    verify (value) {
        let parts = this._parseParts(value);
        let count = parts.length;

        // 条数判断
        if (this.minCount && count < this.minCount) {
            return Format.formatString(this.minCountText, this.minCount);
        }
        if (this.maxCount && count > this.maxCount) {
            return Format.formatString(this.maxCountText, this.maxCount);
        }

        let i;
        let text;
        let ret;
        for (i = 0; i < parts.length; i++) {
            text = parts[i];
            ret = this.validator.verify(text);
            if (typeof ret === 'string') {
                return Format.formatString(this.partInvalidText, i + 1, ret, Format.htmlEncode(text));
            }
        }
        return true;
    }
    formalize (value) {
        let parts = this._parseParts(value);
        let i;
        let str;
        let ret;
        let ignoreBlank = this.ignoreBlank;
        let formalized = false;
        let strs = [];
        for (i = 0; i < parts.length; i++) {
            str = parts[i];
            if (str) {
                ret = this.validator.formalize(str);
                if (ret !== null) {
                    formalized = true;
                    str = ret;
                }
            }
            strs.push(str);
        }
        if (formalized || this.enableFormalize) {

            // 如果是无视空格，则补充一个空格以更好阅读
            return strs.join(this.formalSplitter + (ignoreBlank ? ' ' : ''));
        }
        return null;
    }
}
