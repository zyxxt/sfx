<script>
    /**
     * tabItem
     */

    import Vue from 'vue';
    import Component from 'src/widgets/component';
    import uuid from 'src/util/uuid';

    export default {

        render (h) {
            let me = this;
            return (
                <div class="tabpanel-body-item"
                     style={{ width: `${me.width}px`, height: me.height + 'px', display: me.hidden ? 'none' : '' }}
                     disabled={ me.disabled } >

                    {
                        me.content ? me._rendererContent() : me.$slots.default
                    }
                </div>
            );
        },

        data () {
            return {
            };
        },

        props: {

            // tab 标题头
            title: {
                type: String,
                'default': ''
            },

            defaultHidden: {
                'default': true
            },

            // 动态
            content: {},

            // 动态组件对应的绑定data
            contentData: {}

        },

        mixins: [
            Component
        ],

        methods: {

            /**
             * 渲染tab内容，支持两种方式
             * 1、html方式，这种方式还可以配置contentData作为data
             * 2、Vue参数的方式
             *
             * @return {VNode} vnode
             * @private
             */
            _rendererContent () {
                let content = this.content;
                if (typeof content === 'string') {
                    content = {
                        el: document.createElement('div'),
                        template: content,
                        data: this.contentData
                    };
                }

                // 必须要添加el
                content.el = content.el || document.createElement('div');

                let component = new Vue(content);
                let node = component._render();

                // 如果vnode是静态的，即仅仅是原生的div span等，vnode.patchVnode判断vnode时会认为是一样的，导致未更新
                // 这里强制改下key为不同
                if (node.isStatic && node.isCloned) {
                    node.key = uuid('vnode');
                }

                component.$destroy();
                component = null;
                return node;
            }
        }
    };
</script>
