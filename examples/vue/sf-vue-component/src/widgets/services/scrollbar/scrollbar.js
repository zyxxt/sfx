/**
 * Created by ued on 2016/11/30.
 */

import Vue from 'vue';
import Scrollbar from './scrollbar.vue';
import Component from 'src/widgets/component';
import { apply } from 'src/util/apply';

Vue.directive('scrollbar', {

    bind: function (el, binding, vnode) {

        // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
        let attrs = vnode.data.attrs || {};

        // 清空原来的内容，原内容已经存在vnode里面，创建scrollbar时添加回来好可
        el.innerHTML = '';

        // 这里添加一个额外的节点话scrollbar组件
        let scrollbarDom = document.createElement('div');
        el.appendChild(scrollbarDom);
        let Comp = Vue.extend({
            mixins: [
                Component
            ],
            render: (h) => {
                return h(Scrollbar, {
                    ref: 'scrollbar'
                }, vnode.children);
            }
        });
        let scrollbar = new Comp({
            el: scrollbarDom
        });
        apply(scrollbar, attrs);
        el.scrollbarComponent = scrollbar;
    },

    inserted (el) {

        // 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
        if (el.scrollbarComponent) {
            el.scrollbarComponent.$refs.scrollbar.sync();
        }
    },

    update (el) {

        //被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
        if (el.scrollbarComponent) {
            el.scrollbarComponent.$refs.scrollbar.sync();
        }
    },

    componentUpdated (el) {

        // 被绑定元素所在模板完成一次更新周期时调用。
        if (el.scrollbarComponent) {
            el.scrollbarComponent.$refs.scrollbar.sync();
        }
    },

    unbind (el) {

        // 只调用一次， 指令与元素解绑时调用。
        if (el.scrollbarComponent) {
            el.scrollbarComponent.$destroy();
            el.scrollbarComponent = null;
        }
    }

});
