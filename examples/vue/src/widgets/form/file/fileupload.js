/**
 * Created by ued on 2016/12/30.
 */

import Vue from 'vue';
import Component from 'src/widgets/component';
import Fileupload from './fileupload.vue';
import { addClass } from 'wind-dom';

function updateSize (uploadComponent, el) {
    uploadComponent.height = el.clientHeight;
    uploadComponent.width = el.clientWidth;

    uploadComponent.$forceUpdate();
}

Vue.directive('upload', {

    bind: function (el/*, binding, vnode*/) {

        // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
        //let attrs = vnode.data.attrs || {};

        addClass(el, 'relative');

        // 这里添加一个额外的节点话scrollbar组件
        let uploadDom = document.createElement('div');
        el.appendChild(uploadDom);

        let children = [];
        let Upload = Vue.extend({
            minxis: [
                Component
            ],
            render (h) {
                return h(Fileupload, {
                    'class': 'absolute',
                    props: {
                        draggable: true
                    },
                    ref: 'fileUpload'
                }, children);
            }
        });

        let upload = new Upload({
            el: uploadDom
        });

        //apply(scrollbar, attrs);
        updateSize(upload, el);
        el.uploadComponent = upload;
    },

    inserted (el) {

        // 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
        if (!el.uploadComponent) {
            return;
        }
        updateSize(el.uploadComponent, el);
    },

    update (el) {

        //被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
        if (!el.uploadComponent) {
            return;
        }
        updateSize(el.uploadComponent, el);
    },

    componentUpdated (el) {

        // 被绑定元素所在模板完成一次更新周期时调用。
        if (!el.uploadComponent) {
            return;
        }
        updateSize(el.uploadComponent, el);
    },

    unbind (el) {

        // 只调用一次， 指令与元素解绑时调用。
        if (el.uploadComponent.$isMounted && el.uploadComponent.$el && el.uploadComponent.$el.parentNode) {
            el.uploadComponent.$el.parentNode.removeChild(el.uploadComponent.$el);
        }

        el.uploadComponent.$destroy();
        el.uploadComponent = null;
    }

});
