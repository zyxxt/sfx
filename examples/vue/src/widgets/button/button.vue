<template>
    <button class="btn"
            :id="id"
            :class="[cls, selected ? 'btn-selected' : '']"
            type="button"
            @click="onClick"
            :disabled="disabled"
            :style="{ width:width + 'px', height: height + 'px' }"
            v-show="!hidden"
    >
        <i v-if="iconCls" class="fa" :class="iconCls"></i>
        <slot></slot>
    </button>
</template>
<style>
    @import "./button.css";
</style>
<script>
    /**
     * 封装下buttom，可以配置图标跟下拉菜单
     */

    import Component from 'src/widgets/component';

    export default {

        props: {

            /**
             * @cfg 按钮图标
             */
            iconCls: {
                type: String
            },

            /**
             * @cfg 配合grid_mgr使用，点击时会触发action事件
             */
            actionName: {
                type: String
            },

            /**
             * @cfg 默认是否已经选中
             */
            defaultSelected: {
                type: Boolean,
                'default': false
            },

            /**
             * @cfg 按钮可以点击选中，会添加btn-selected样式
             */
            selectAble: {
                type: Boolean,
                'default': false
            },

            /**
             * @cfg 配合grid_mgr使用，可以是true|false，也可以是具体的数字表示选中几行后才生效
             */
            selectMust: {}
        },

        data () {
            return {
                selected: this.defaultSelected
            };
        },

        mixins: [
            Component
        ],

        methods: {

            /**
             * 按钮点击时触发
             * @param {Event} event 点击事件
             */
            onClick (event) {
                if (this.selectAble) {
                    this.selected = !this.selected;
                }

                this.$emit('click', event, this);

                // 配置mgr使用
                if (this.actionName) {
                    this.$emit('action', event, this);
                }
            }
        },

        watch: {
            defaultSelected (value) {
                this.selected = value;
            }
        }
    };
</script>
