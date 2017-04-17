/**
 * Created by ued on 2016/11/5.
 */

import Vue from 'vue';
import Tooltip from './tooltip.vue';

let QuickTip = Vue.extend(Tooltip);

/**
 * 创建tooltip节点
 * @returns {Element} 返回dom节点
 */
function createElement () {
    let qtipWrapDom = document.createElement('div');
    qtipWrapDom.className = 'qtip-wrap';
    document.body.appendChild(qtipWrapDom);
    return qtipWrapDom;
}

/**
 * 从 attrs 更新数据
 * @param {Object} toolTipComponent 实例化后的qtip
 * @param {Object} attrs            vnode 的 attrs
 */
function updateTipAttrs (toolTipComponent, attrs) {
    toolTipComponent.width = attrs.qwidth;
    toolTipComponent.maxWidth = attrs.qmaxwidth;
    if (attrs.qcls) {
        toolTipComponent.cls = [...new Set(toolTipComponent.cls.split(/\s+/).concat(attrs.qcls))].join(' ');
    }
    toolTipComponent.anchor = attrs.qanchor || 'bottom-start';
    toolTipComponent.delay = attrs.qdelay;

    //toolTipComponent.visible = !!toolTipComponent.content;
}

/**
 * 初始化qtip组件
 */
function init () {
    let qtipWrapDom = createElement();

    /**
     * 支持以下参数：<span v-qtip="'fdsafdsa'"
     *                   :qwidth="200"
     *                   :qmaxwidth="300"
     *                   qtitle="title"
     *                   qcls="cls"
     *                   qanchor="top-start"
     *                   :qdelay="300"> test </span>
     * qanchor 支持以下参数："方向-对齐方式"
     * 方向有 top right bottom left
     * 对齐方式 start end
     * 比如：left-end 则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐
     * top-start     则提示信息出现在目标元素的上侧，且提示信息的左部与目标元素的左部对齐
     * top
     * top-end
     * left-start
     * left
     * left-end
     * ...
     */
    Vue.directive('qtip', {

        //params: [
        //    'qtip',
        //    'qwidth',
        //    'qtitle',
        //    'qcls',
        //    'qanchor',
        //    'qdelay'
        //],
        // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
        bind: function (el, binding, vnode) {

            let attrs = vnode.data.attrs || {};
            let toolTipComponent = new QuickTip({
                el: qtipWrapDom,
                propsData: {
                    autoDestroy: true,
                    arrowHide: false
                }
            });
            el.toolTipComponent = toolTipComponent;

            toolTipComponent.cls = 'qtip';
            toolTipComponent.trigger = 'hover';

            toolTipComponent.target = el;
            if (typeof binding.value === 'string') {
                toolTipComponent.content = binding.value;
            } else {
                toolTipComponent.content = '';
                toolTipComponent.$slots.default = binding.value;
            }
            toolTipComponent.title = attrs.qtitie;

            updateTipAttrs(toolTipComponent, attrs);
            toolTipComponent.bindTarget();
        },

        inserted () {

            // 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
        },

        update (el, binding, vnode) {

            //被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
            let attrs = vnode.data.attrs || {};
            let toolTipComponent = el.toolTipComponent;
            if (toolTipComponent) {
                if (typeof binding.value === 'string') {
                    toolTipComponent.content = binding.value;
                } else {
                    toolTipComponent.content = '';
                    toolTipComponent.$slots.default = binding.value;
                }
                toolTipComponent.title = attrs.qtitie;
                updateTipAttrs(toolTipComponent, attrs);
            }
        },

        componentUpdated () {

            // 被绑定元素所在模板完成一次更新周期时调用。
        },

        unbind () {

            // 只调用一次， 指令与元素解绑时调用。
        }

    });
}

export default {
    init
};
