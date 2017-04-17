<template>
    <sf-layer class="sf-menu-layer" ref="menuLayer" :anchor="anchor" :auto-scrollbar="false">
        <sf-scrollbar class="sf-menu-scroll"
                      ref="menuScroll"
                      :rootMenu="_self"
                      :auto-width="true">
            <ul ref="menuList" class="sf-menu-list" v-if="optionsList.length">
                <sf-menu-item v-for="item in optionsList"
                    :type="item.type"
                    :icon-cls="item.iconCls"
                    :default-disabled="item.disabled"
                    :data="item"
                    @click="onClickFn">
                    <span v-html="_renderText(item)"></span>
                    <sf-menu v-if="item.children && item.children.length"
                         anchor="right-start"
                         :default-width="width"
                         :options="item.children"
                         :renderer="_getRendererFn()">
                    </sf-menu>
                </sf-menu-item>
            </ul>
            <ul ref="menuList" class="sf-menu-list" v-else>
                <slot></slot>
            </ul>
        </sf-scrollbar>
    </sf-layer>
</template>

<script>

    /**
     * Created by ued on 2017/2/5.
     */

    import Vue from 'vue';
    import { on as bindEvent, off as unbindEvent } from 'wind-dom';
    import Component from 'src/widgets/component';
    import { isFunction } from 'src/util/typeof';

    const MIN_WIDTH = 100;
    const MAX_HEIGHT = 500;
    const OPTION_HEIGHT = 30;

    const EVENT_NAME_MAP = {
        click: 'click',
        hover: 'mouseenter'
    };

    export default {
        mixins: [
            Component
        ],

        props: {
            options: {
                type: Array,
                'default': () => []
            },

            defaultTarget: {},

            renderer: {},

            clickHide: {
                type: Boolean,
                'default': true
            },

            anchor: {
                type: String,
                'default': 'right-start'
            },

            trigger: {
                type: String,
                'default': 'click'
            }
        },

        data () {
            return {
                target: this.defaultTarget,
                optionsList: this.options,
                subMenuList: []
            };
        },

        mounted () {
            this.hidden = true;
            this.menuLayer = this.$refs.menuLayer;
            this.menuScroll = this.$refs.menuScroll;
            this.menuList = this.$refs.menuList;

            this._initMenu();
            this._bindEvent();
        },

        methods: {
            _initMenu () {
                this.optionsList = this.options;


                if (this.defaultTarget) {
                    let targetEl = this._getTarget();
                    this.alignTo(targetEl);
                    bindEvent(targetEl, EVENT_NAME_MAP[this.trigger], this.toggle);
                }
            },

            _bindEvent () {
                this.menuScroll.$on('hover.subMenu', subMenu => {
                    if (this.subMenu) {
                        this.subMenu.hide();
                    }

                    if (subMenu) {
                        subMenu.show();
                    }

                    this.subMenu = subMenu;
                });

                this.menuScroll.$on('click.item', () => {
                    if (this.clickHide) {
                        this.hideAllMenu();
                    }
                });

                bindEvent(document, 'click', this._documentHide);
            },

            _getMenuWidth () {
                return Math.max(MIN_WIDTH, this.menuList.clientWidth);
            },

            _getMenuHeight () {
                let optionCount = 0;
                let separatorCount = 0;
                let optionHeight = OPTION_HEIGHT;

                if (this.optionsList.length) {
                    this.optionsList.forEach(item => {
                        if (item.type === 'separator') {
                            separatorCount++;
                        } else {
                            optionCount++;
                        }
                    });

                } else if (this.$slots.default && this.$slots.default.length) {
                    this.$slots.default.forEach(vnode => {
                        if (vnode.componentOptions && vnode.componentOptions.tag === 'sf-menu-item') {
                            if (vnode.componentOptions.propsData.type === 'separator') {
                                separatorCount++;
                            } else {
                                optionCount++;
                            }
                        }
                    });
                }

                if (this.menuList.childNodes.length) {
                    optionHeight = this.menuList.childNodes[0].clientHeight || OPTION_HEIGHT;
                }

                return Math.min(MAX_HEIGHT, optionHeight * optionCount + separatorCount);
            },


            _getRendererFn () {
                if (typeof this.renderer === 'function') {
                    return this.renderer;
                } else if (typeof this.renderer === 'string') {
                    return this.$vnode.context[this.renderer];
                }
                return v => v;
            },

            /**
             * 重写子菜单显示文字，只有动态配置菜单时才会用到
             * @param {Object} data 格式化参数
             * @return {String} 格式化后的内容
             * @private
             */
            _renderText (data) {
                let renderFn = this._getRendererFn();
                return renderFn(data.label, data);
            },

            _documentHide (e) {
                let target = this.target;

                if (target && target.contains(e.target) || this.menuLayer.$el.contains(e.target)) {
                    return;
                }

                this.hide();
            },

            _getTarget () {
                let target = this.target;

                if (typeof target === 'string') {
                    target = this.$parent.$refs[target];
                }

                if (target instanceof Vue) {
                    target = target.$el;
                }

                return target instanceof window.Element ? target : null;
            },

            loadNewOptions () {
                this.destroy();
                this._initMenu();
                this._bindEvent();
            },

            /**
             * 设置子菜单的父菜单
             * @param menu
             */

            setRootMenu (menu) {
                this.rootMenu = menu;
            },

            /**
             * 菜单插入子菜单
             * @param menu
             */

            insertSubMenu (menu) {
                this.subMenuList.push(menu);
            },

            /**
             * 在显示菜单的时候重新计算菜单的宽高
             * */

            calClientRect () {

                // 这里比较恶心的是，在打开菜单前是不知道高度的！所以要在打开的时候设置一下下拉框的高度
                this.menuLayer.width = this._getMenuWidth();
                this.menuLayer.height = this._getMenuHeight();

                this.$nextTick(() => {
                    this.menuScroll.sync();
                });
            },

            /**
             * 绑定动态子菜单点击事件
             * @param data
             * @returns {function(*=, *=)}
             */

            onClickFn (e, menuItem) {
                let data = menuItem.data;

                if (data.disabled) {
                    return;
                }

                // 触发绑定在 子菜单 上的 click 事件
                if (typeof data.click === 'function') {
                    data.click(e, menuItem, data);
                }
            },

            /**
             * 隐藏所有菜单项
             * */

            hideAllMenu () {
                let menu = this;

                while (menu) {
                    menu.hide();
                    menu = menu.rootMenu;
                }
            },

            /**
             * 将菜单显示于指定位置
             * @param target Dom 节点
             */

            showTo (target) {
                if (this.target === target) {
                    return;
                }

                let showToTarget = () => {
                    this.setTarget(target);
                    this.show();
                };

                if (this.hidden) {
                    showToTarget();
                } else {
                    this.hide(() => {
                        showToTarget();
                    });
                }
            },

            /**
             * 将菜单定位到指定位置，但并不控制显示隐藏
             * @param target Dom 节点
             */

            alignTo (target) {
                this.target = target;
                this.menuLayer.alignTo(target);
            },

            /**
             * 重新设置定位对象（会重新解绑事件和绑定新对象的事件）
             * @param target
             */

            setTarget (target) {
                unbindEvent(this.target, 'click', this.toggle);
                this.alignTo(target);
                bindEvent(this.target, 'click', this.toggle);
            },

            /**
             * 控制菜单的显示隐藏
             */

            toggle () {
                if (this.hidden) {
                    this.show();
                } else {
                    this.hide();
                }
            },

            /**
             * 显示菜单 （菜单的显示是渐显）
             * @param callback 完全显示后回调函数
             */

            show (callback) {
                this.hidden = false;
                this.menuLayer.hidden = false;

                let afterShow = () => {
                    this.menuLayer.$off('afterShow', afterShow);

                    if (isFunction(callback)) {
                        callback();
                    }
                };

                this.menuLayer.$on('afterShow', afterShow);

                this.$nextTick(() => {
                    this.calClientRect();
                });

                return this;
            },

            /**
             * 显示菜单 （菜单的显示是渐隐）
             * @param callback 完全隐藏后回调函数
             */

            hide (callback) {
                this.hidden = true;
                this.menuLayer.hidden = true;

                let afterHide = () => {
                    this.menuLayer.$off('afterHide', afterHide);

                    if (isFunction(callback)) {
                        callback();
                    }
                };

                this.menuLayer.$on('afterHide', afterHide);

                if (this.subMenu) {
                    this.subMenu.hide();
                }

                if (this.isOptionsChange) {
                    this.loadNewOptions();
                    this.isOptionsChange = false;
                }

                return this;
            },

            /**
             * 销毁当前菜单，同时会把子菜单一并销毁
             */

            destroy () {
                unbindEvent(document, 'click', this._documentHide);

                this.subMenu = null;

                this.subMenuList.forEach(subMenu => {
                    subMenu.destroy();
                });

                this.subMenuList.length = 0;
            }
        },

        watch: {
            options () {
                this.isOptionsChange = true;

                // 菜单没有显示时，菜单随数据变化而变化
                if (this.hidden) {
                    this.loadNewOptions();
                }
            }
        }
    };

</script>

<style lang="stylus">
    .sf-menu-layer
        border-radius: 0;
        padding: 0;
        background: #3c434b;
        color: #fff;
        border: none;

        &[x-placement^="top"]
            margin-bottom: 0;
        &[x-placement^="bottom"]
            margin-top: 0;
        &[x-placement^="left"]
            margin-right: 0;
        &[x-placement^="right"]
            margin-left: 0;

        .sf-menu-scroll.scrollbar
            &:hover
                .scrollbar-horizontal-inner
                    background: #ccc;
                .scrollbar-vertical-inner
                    background: #ccc;

        .sf-menu-list
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
            box-sizing: border-box;
            text-overflow: ellipsis;
            white-space: nowrap;

            .sf-menu-item-context
                display: inline-block

        .sf-menu-separator
            height: 1px;
            background-color: #49525b;
            padding: 0;
            background-image: none;
            width: auto;
</style>

