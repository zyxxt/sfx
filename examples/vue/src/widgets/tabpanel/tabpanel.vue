
<script>
    /**
     * tabpanel
     */

    import Component from 'src/widgets/component';
    import Tab from './tab.vue';

    export default {
        data () {
            return {
                marginLeft: 0,
                activeTab: this.activeItem
            };
        },

        props: {

            // 垂直布局
            vertical: {
                type: Boolean,
                'default': false
            },

            // 默认显示第几个tab
            activeItem: {
                type: Number,
                'default': 0
            }
        },

        mixins: [
            Component
        ],

        components: {
            Tab
        },

        mounted () {
            this.toggle(this.activeTab);
            this._updateBodyPosition();
        },

        render (h) {
            let me = this;
            let index = 0;
            return (
                <div class={ `tabpanel ${me.vertical ? 'vertical' : ''}` }>
                    <div class="tabpanel-header" ref="header">
                    {
                        me._l(me.$slots.default, (vnode) => {
                            if (!vnode.tag) {
                                return '';
                            }
                            let tab = (
                                <tab class={ `${index === me.activeTab ? 'active' : ''}` } tabIndex={ index }
                                     defaultWidth={ vnode.componentOptions.propsData.tabWidth }
                                     defaultHeight={ vnode.componentOptions.propsData.tabHeight }
                                     defaultDisabled={ vnode.componentOptions.propsData.defaultDisabled }
                                     titleHide={ vnode.componentOptions.propsData.titleHide }
                                     title={ vnode.componentOptions.propsData.title }

                                     onToggle={ me.toggle }
                                     onTitlechange={ me._onTitleChange }>

                                    { vnode.componentOptions.propsData.title }
                                </tab>
                            );
                            index++;
                            return tab;
                        })
                    }
                    </div>
                    <div class="tabpanel-wrap"
                         style={{ marginLeft: me.vertical ? me.marginLeft + 'px' : '' }} ref="body">
                    {
                        me.$slots.default
                    }
                    </div>
                </div>
            );
        },

        methods: {

            /**
             * 根据header的宽度，实时更新整个body的偏移量
             */
            _updateBodyPosition () {
                let header = this.$refs.header;
                if (header && this.vertical) {
                    let width = header.getBoundingClientRect().width;
                    this.marginLeft = width;
                }
            },

            /**
             * tab头部文字变化时，需要重新计算位置，在vertical布局时生效
             */
            _onTitleChange () {
                this.$nextTick(() => {
                    this._updateBodyPosition();
                });
            },

            /**
             * 切换tab
             * @param {Number} index 显示的tab
             */
            toggle (index) {

                this.$emit('beforeShow', this, this.activeTab);
                this.$slots.default.filter((vnode) => {

                    // 过滤掉空节点
                    return vnode.tag;
                }).map((vnode) => {

                    // 获取到vue实例
                    return vnode.child;
                }).forEach((child, idx) => {

                    // 设置隐藏状态 
                    child.hidden = index !== idx;
                });

                this.activeTab = index;
                this.$emit('afterShow', this, index);
            },

            /**
             * 切换显示tab
             * @param {Number} index 显示第几个tab
             */
            setActiveItem (index) {
                this.toggle(index);
            }
        },

        watch: {

            /**
             * 外部activeItem变化时，这里单向切换
             * @param {Number} index 要显示的tab
             */
            activeItem (index) {
                this.$nextTick(() => {
                    this.setActiveItem(index);
                });
            }
        }

    };
</script>

<style>
    @import "./tabpanel.css";
</style>
