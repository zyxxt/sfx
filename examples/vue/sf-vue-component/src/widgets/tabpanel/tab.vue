
<template>
    <button class="tabpanel-item ellipsis" @click="onToggle"
        :style="{ width: `${width}px`, height: height + 'px' }"
        v-show="!hidden"
        :disabled="disabled" :title="tabTitle">
        <slot></slot>
    </button>
</template>

<style lang="stylus" scoped>
    
</style>

<script>
    /**
     * Created by ued on 2017/1/17.
     */

    import Component from 'src/widgets/component';

    export default {

        mixins: [
            Component
        ],

        props: {

            // tab 标题
            title: {
                type: String
            },

            // 记录索引
            tabIndex: {
                type: Number
            },

            // 是否隐藏标题栏
            titleHide: {
                type: Boolean,
                'default': true
            }
        },

        data () {
            return {
                
            };
        },

        computed: {
            tabTitle () {
                if (this.titleHide) {
                    return '';
                }
                return this.title;
            }
        },

        methods: {

            /**
             * 点击tab头部触发
             * @param {Event} event 点击事件 
             */
            onToggle (event) {
                if (this.disabled) {
                    return;
                }
                this.$emit('toggle', this.tabIndex, event);
            }
        },

        watch: {

            /**
             * tab头部变化时tabpanel需要重新计算body宽度
             * @param {String} text title
             * @param {String} old  oldTitle
             */
            title (text, old) {
                this.$emit('titlechange', this, text, old);
            }
        }
    };
</script>
