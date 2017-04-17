/**
 * Created by ued on 2016/11/2.
 */

import { apply } from '../apply';

export const VALIDATIONS = new Map();

export default class Validator {

    constructor (cfg) {
        let type;
        cfg = cfg || {};

        // 只有Validator类自身传入type配置时才启用，子类们不生效
        type = cfg.type;
        if (type && VALIDATIONS[type] && this.constructor === Validator.prototype.constructor) {
            delete cfg.type;
            return new VALIDATIONS[type](cfg);
        }
        apply(this, cfg);
    }

    /**
     * 校验文本
     * @param {String} value            需要校验的文本
     * @return {Boolean/String} result  如果为string则表示失败，否则为true
     */
    verify () {
        return true;
    }

    /**
     * 正式化文本
     * @param {String} value            需要格式化的文本
     * @return {String} formalValue     如果没有改动，则返回null
     */
    formalize () {
        return null;
    }
}
