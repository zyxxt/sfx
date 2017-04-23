/**
 * 多行validator
 */


import Validator from './validator';
import * as Format from '../format';

/*
 * 应支持maxLine, minLine配置
 * allowComment配置
 */
export default class MultiLineCompositeValidator extends Validator {

    /**
     * @cfg {Number} minLine (optional) 最小有效条数（不计空行）
     */

    /**
     * @cfg {String} minLineText (optional) 超出最小条数限制时的信息
     */
    minLineText = '不能小于{0}条';

    /**
     * @cfg {Number} maxLine (optional) 最大有效条数（不计空行）
     */

    /**
     * @cfg {String} maxLineText (optional) 超出最大条数限制时的信息
     */
    maxLineText = '不能大于{0}条';

    /**
     * @cfg {Boolean} allowComment (optional) 是否允许格式如“#xxx”的注释，默认为false，注释也作为空行。
     */

    /**
     * @cfg {String} commentPerfix (optional) 默认为“#”，一行中在它后面的都为注释。
     */
    commentPerfix = '#';

    /**
     * @cfg {String} lineInvalidText (optional) 行验证失败信息
     */
    lineInvalidText = '第{0}行“{2}”校验失败，{1}。';

    /**
     * @cfg {Boolean} 是否强制开启本层的formalize（即去除空行，去除无用空格，标准化换行符），默认为false，
     * 即如果行检验器没有formalize动作，则不作任何变动；反之则会进行处理。
     */
    enableFormalize = false;

    /**
     * @cfg {String} formalLineBreak (optional) 标准换行符，默认为\n
     */
    formalLineBreak = '\n';

    /**
     * 识别出注释
     * @param {Number} line 第N行
     * @return {Object} result 含两个属性：text, comment(如果没有comment或没有启用allowComment配置，则为null)
     */
    _parseLine (line) {
        let text = line;
        let comment = null;
        let index;
        if (line && this.allowComment) {
            index = line.indexOf(this.commentPerfix);
            if (index >= 0) {
                text = line.slice(0, index);
                comment = line.slice(index);
            }
        }
        text = Format.trim(text);
        return {
            text: text,
            comment: comment
        };
    }
    _parseLines (value = '', fn, scope) {
        let lines = value.split(/\r?\n/);
        let i;
        let result;
        let results = [];
        for (i = 0; i < lines.length; i++) {
            result = this._parseLine(lines[i]);
            result.index = i;
            if (fn && fn.call(scope, result, i) !== false) {
                results.push(result);
            }
        }
        return results;
    }
    verify (value) {
        let actualLines = 0;
        let results = this._parseLines(value, function (result/*, index*/) {
            if (result.text) {
                actualLines++;
            } else {
                return false;
            }
        }, this);

        // 条数判断
        if (this.minLine && actualLines < this.minLine) {
            return Format.formatString(this.minLineText, this.minLine);
        }
        if (this.maxLine && actualLines > this.maxLine) {
            return Format.formatString(this.maxLineText, this.maxLine);
        }

        let i;
        let result;
        let text;
        let ret;
        for (i = 0; i < results.length; i++) {
            result = results[i];
            text = result.text;
            ret = this.validator.verify(text);
            if (typeof ret === 'string') {
                return Format.formatString(
                    this.lineInvalidText,
                    result.index + 1,
                    Format.htmlEncode(ret),
                    Format.htmlEncode(text)
                );
            }
        }
        return true;
    }
    formalize (value) {
        let strs = [];
        let formalized = false;
        let me = this;
        this._parseLines(value, function (result/*, index*/) {
            let str;
            let comment;
            let ret;
            str = result.text || '';
            comment = result.comment || '';
            if (str) {
                ret = me.validator.formalize(str);
                if (ret !== null) {
                    formalized = true;
                    str = ret;
                }
            } else {
                str = '';
            }
            str += comment;

            // 移除空行
            if (str) {
                strs.push(str);
            }
        }, this);
        if (formalized || this.enableFormalize) {
            return strs.join(this.formalLineBreak);
        }
        return null;
    }
}
