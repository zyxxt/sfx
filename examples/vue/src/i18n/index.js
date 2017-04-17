/**
 * Created by ued on 2016/11/8.
 */

import Vue from 'vue';
import logger from '../util/logger';
import Lang from './lang.vue';

import en from './en';
import zh from './zh_cn';

const LANGUAGE = {
    'zh-CN': zh,
    en
};

/**
 * 当前语言
 */
let cur = 'zh-CN';

/**
 * _ 中英文替换函数
 * @param {String} str    _('我是中文{0}、{1}', 'replace0', 'replace1')
 * @param {String} args   {N} 占位符
 * @returns {String}      替换后的字符串
 */
function _ (str, ...args) {
    let langMap = LANGUAGE[cur];
    if (langMap && langMap.hasOwnProperty(str)) {
        str = langMap[str];
    }

    /**
     * 字串中可以包含形如 {#mark#} 的文本，它的作用是用于附加额外语境信息。
     * 例如中文里“启用”，可以是形容词，表示此条记录启用；也可以是动词，点击即启用此记录；
     * 如果没有额外标识，它们翻译成英文只能有一个结果，但实际上它们应该分别翻译为：“Enabled”与“Enable”
     * 有额外标识后，翻译表中，就是这样的了：
     * “启用{#adj#}” -> “Enabled”
     * “启用{#verb#}” -> “Enable”
     * 如果没有翻译表，则自动去掉额外标识，翻译为“启用”
     */
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


/**
 * 初始化中英文，全局注册 _()
 * @param {Object} Vue Vue
 * @param {Object} opt i18n配置
 * @return {Boolean} 成功注册
 */
function initI18n (Vue, opt) {
    cur = opt.lang;
    if (typeof window !== 'undefined') {
        let old;
        if (window._) {
            logger.log('function _ () {} found...');
            old = window._;
            window._ = function (str, ...args) {
                return _(old.apply(null, arguments), ...args);
            };
        } else {
            window._ = _;
        }
        return true;
    }
    return false;
}
initI18n(Vue, { lang: 'zh-CN' });

export default {
    install (Vue, opt = { lang: 'zh-CN' }) {
        Vue.component('lang', Lang);
        cur = opt.lang;
    }
};

