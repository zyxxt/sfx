/**
 * import XForm from './form.vue';
 * let myModalVm = this.$modal(XForm, options);
 * myModalVm.open({
 *     ... // 弹窗配置项
 *     data: {...}
 * }); // 或者 myModalVm.setData({...});
 *
 * options 配置注释：
 * {
 *   // 默认为 auto，内容自动撑开
 *    width: 200,
 *
 *    // 默认为 auto，内容自动撑开
 *    height: 150,
 *    title: '我是标题',
 *
 *    // 是否显示右上角的叉叉
 *    closeable: true,
 *
 *    // 配置图标背景，目前支持 success error waring info question, 默认没有
 *    icon: '',
 *
 *    // 按钮配置点击事件需要配置 actionName，然后在外面通过 on 方式监听这些事件
 *    buttons: [
 *        // 方式1.字符串模板配置
 *        //'<sf-button actionName="add">确定</sf-button>',
 *        //'<span class="btn-link" actionName="recover">恢复默认</span>',
 *        // 方式2.如果配置成对象，那么就一定是个按钮。比较常规的用法
 *        //{
 *        //    cls: 'btn-default',
 *        //    text: '下一步',
 *        //    actionName: 'next'
 *        //},
 *        // 方式3.神奇的箭头，可将按钮分成左右两边
 *        //'->',
 *        // 方式4.快捷配置方式
 *        //'submit', // 快捷配置，相当于 action 为 submit，文字为 确定 的按钮
 *        //'cancel' // 快捷配置，相当于 action 为 cancel，文字为 取消 的按钮
 *    ],
 *
 *    // 是否需要底部按钮，默认为 true
 *    footer: true,
 *
 *    // 是否关闭弹窗时直接销毁掉弹窗实例
 *    autoDestroy: true,
 *
 *    // 弹窗按钮定位，left | center | right 默认为 right
 *    buttonAlign: 'right',
 *
 *    // 可配 actionName 为 submit 和 cancel 的回调方法
 *    submit：() => {},
 *    cancel：() => {}
 * }
 *
 * 返回的 myModalVm 是 sf-modal 组件的实例对象，可以直接操作，暴露以下API方法
 * myModalVm.setData // 重新设置数据
 * myModalVm.setConfig // 重新设置弹窗配置
 * myModalVm。open({
 *     ...   // 各种弹窗配置
 *     data: // 重新设置数据
 * }) // 打开窗口
 * myModalVm.show()
 * myModalVm.hide()
 * myModalVm.destroy()
 *
 * */

import Vue from 'vue';
import { apply } from 'src/util/apply';
import getZIndex from 'src/util/zindex';
import Component from 'src/widgets/component';

function Modal (vueComponent, options = {}) {
    this.options = options;

    this._initModal(vueComponent);
    this._initActions();

    return this.$modalVm;
}

Modal.prototype = {
    _initModal (vueComponent) {
        let options = this.options;

        let Comp = Vue.extend({

            mixins: [
                Component
            ],

            props: {
                defaultHidden: {
                    'default': true
                }
            },

            render: function (h) {
                let me = this;

                return h('div',
                    {
                        'class': 'sf-modal-wrap',
                        style: {
                            display: me.hidden ? 'none' : 'inline-block',
                            'z-index': me.zindex
                        }
                    },
                    [
                        h('div', {'class': 'sf-modal-overlay'}),
                        h('sf-modal',
                            {
                                ref: 'modal',
                                props: apply({
                                    defaultWidth: options.width,
                                    defaultHeight: options.height
                                }, options)
                            },

                            // 如果是vnode数组
                            Array.isArray(vueComponent) ? vueComponent : [
                                h(vueComponent, {
                                    ref: 'formRoot'
                                })
                            ]
                        )
                    ]
                );
            }
        });

        this.$vm = new Comp({
            el: this._getWrapDom(),
            data: {

                //hidden: true,
                zindex: 1000
            }
        });

        this.$modalVm = this.$vm.$refs.modal;
        if (Array.isArray(vueComponent)) {

            // 这里仅支持一个vnode的情况
            this.$modalVm.formRoots = vueComponent.filter(node => node.tag).map(node => node.child);
            this.$modalVm.formRoot = vueComponent[0].child;
        } else {
            this.$modalVm.formRoots = [this.$vm.$refs.formRoot];
            this.$modalVm.formRoot = this.$vm.$refs.formRoot;
        }
    },

    _initActions () {
        let $vm = this.$vm;
        let $modalVm = this.$modalVm;
        let options = this.options;

        if (typeof options.submit === 'function') {
            $modalVm.$on('submit', options.submit);
        }

        if (typeof options.cancel === 'function') {
            $modalVm.$on('cancel', options.cancel);
        }

        $modalVm.$on('show', () => {
            $vm.hidden = false;
            $vm.zindex = getZIndex();
        });

        $modalVm.$on('hide', () => {
            $vm.hidden = true;
            if (options.autoDestroy) {
                this.doDestroy();
            }
        });

    },

    _getWrapDom () {
        let modalWrapDom = document.createElement('div');
        modalWrapDom.className = 'modal-wrap';
        document.body.appendChild(modalWrapDom);

        return modalWrapDom;
    },

    doDestroy () {
        if (this.$vm.$isMounted && this.$vm.$el && this.$vm.$el.parentNode) {
            this.$vm.$el.parentNode.removeChild(this.$vm.$el);
        }
        this.$vm.$destroy();
    }

};

Vue.prototype.$modal = function (vueComponent, options) {
    return new Modal(vueComponent, options);
};

export default Modal;
