<template>
    <li class="sf-menu-list-item"
        :class="{'sf-menu-separator':isSeparator}"
        @click="onClick"
        @mouseenter="onEnter" :disabled="disabled">
            <i v-show="iconCls" class="fa sf-menu-icon-before" :class="iconCls"></i>
            <slot></slot>
            <i v-show="isGroup" class="fa sf-menu-icon-after fa-angle-right"></i>
    </li>

</template>

<script>
    /**
     * Created by ued on 2017/1/14.
     * */

    import Component from 'src/widgets/component';

    export default {
        mixins: [
            Component
        ],

        props: {
            data: Object,
            iconCls: String,
            type: String,
            actionName: String
        },

        data () {
            return {
                isGroup: false,
                isSeparator: this.type === 'separator',
                subMenu: null
            };
        },

        mounted () {
            this.initSubMenu();
        },

        methods: {
            initSubMenu () {
                let me = this;
                let scrollBar = me.$parent;
                let rootMenu = scrollBar.$vnode.data.attrs.rootMenu;

                if (!this.$slots.default) {
                    return;
                }

                me.$slots.default.forEach(vnode => {
                    if (vnode.componentOptions && vnode.componentOptions.tag === 'sf-menu') {
                        me.isGroup = true;
                        me.subMenu = vnode.child;

                        // 对于该子菜单项，设置它的 rootMenu
                        me.subMenu.setRootMenu(rootMenu);

                        // 给 rootMenu 插入子菜单项
                        rootMenu.insertSubMenu(me.subMenu);

                        me.subMenu.alignTo(me.$el);
                    }
                });
            },

            onClick (e) {
                if (this.isSeparator || this.disabled) {
                    return;
                }

                this.$emit('click', e, this);
                this.$parent.$emit('click.item');

                if (this.actionName) {
                    this.$emit('action', e, this);
                }
            },

            onEnter () {
                this.$parent.$emit('hover.subMenu', this.subMenu);
            }
        }

    };
</script>

<style lang="stylus">
    .sf-menu-list-item
        padding: 0 24px 0 12px;
        cursor: pointer;
        position: relative;
        height: 30px;
        line-height 30px;

        &:hover
            background-color: #474A4A;

        &[disabled="disabled"]
            opacity: 0.3
            cursor: default;
            background: transparent;

        .sf-menu-icon-before
            margin-right: 6px;
            vertical-align: middle;

        .sf-menu-icon-after
            position: absolute;
            right: 8px;
            top: calc(50% - 15px);

        .sf-menu-separator
            height: 1px;
            background-color: #49525b;
            padding: 0;
            background-image: none;
            width: auto;
</style>
