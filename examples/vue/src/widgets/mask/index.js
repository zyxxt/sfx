
/**
 * Created by hth on 2016/12/8.
 */

import Vue from 'vue';
import Mask from './mask.vue';
import { apply } from 'src/util/apply';
export default {
    Mask
};

/**
 * 添加$mask方法，
 * @param {Element} el  需要遮罩的dom节点
 * @param {Object} data sf-mask配置项
 */
Vue.prototype.$mask = function (el, data) {
    let maskComponent;

    if (!el) {
        el = this.$el;
    }

    if (typeof el === 'string') {
        el = document.querySelector(el);
    }

    if (!el) {
        return;
    }

    if (!el.mask) {
        let defaultData = apply({
                html: _('正在加载...'),
                defer: 300,
                isShow: false,
                msgCls: '',
                cls: ''
            }, data || {}),

            element = document.createElement('div'),
            template = `
                <sf-mask ref="mask" 
                         :defer="defer"     
                         :isShow="isShow" 
                         :msgCls="msgCls" 
                         :cls="cls">
                    ${defaultData.html}
                </sf-mask>
            `;

        el.appendChild(element);

        maskComponent = new Vue({
            el: element,
            template: template,
            data: defaultData
        });

        el.mask = maskComponent.$refs.mask;

    }

    el.mask.show();

};

/**
 * 去除遮罩
 * @param {Element} el 已经遮罩的dom节点
 */
Vue.prototype.$unmask = function (el) {
    if (!el) {
        el = this.$el;
    }
    if (typeof el === 'string') {
        el = document.querySelector(el);
    }

    if (el && el.mask) {
        el.mask.hide();
    }

};
