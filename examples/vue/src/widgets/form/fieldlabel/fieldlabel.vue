<template>
    <label class="fieldlabel"
           v-show="!hidden"
           :disabled="disabled"
           :id="id"
           :class="`label-align-${align || 'left'} ${cls}`"
           :style="{ width: `${width}px`, height: height + 'px' }"
    >
        <slot></slot>
        <span>{{separator}}</span>
    </label>
</template>
<style lang="stylus" scoped>
    .fieldlabel
        display: inline-block
        vertical-align: top
        line-height: 28px
        font-weight: normal
        margin: 0
        width: 70px

        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap

        &.label-align-left
            text-align: left
        &.label-align-right
            text-align: right
        &.label-align-top
            display: block
            width: auto;
            margin-bottom: 5px

</style>
<script>
    /**
     * 封装fiellabel，可以放在表单里统一配置
     */

    import Component from 'src/widgets/component';

    const DEFAULT_LABEL_ALIGN = 'left';
    const DEFAULT_LABEL_SEPARATOR = _('：');

    export default {

        mixins: [
            Component
        ],

        props: {
            cls: {
                'default': '',
                type: String
            },
            labelWidth: Number,
            labelAlign: String,
            labelSeparator: String
        },

        computed: {

            /**
             * 获取label的宽度，如果未配置则会尝试去搜索sf-form的
             * @return {Number} label宽度
             */
            width () {
                if (typeof this.labelWidth !== 'undefined' && this.labelWidth !== null) {
                    return this.labelWidth;
                } else if (this.$jsonForm && typeof this.$jsonForm.labelWidth !== 'undefined') {
                    return this.$jsonForm.labelWidth;
                }
            },

            /**
             * 对齐方式，如果未配置则会尝试去搜索sf-form的
             * @return {String} left|right|top
             */
            align () {
                if (typeof this.labelAlign !== 'undefined' && this.labelAlign !== null) {
                    return this.labelAlign;
                } else if (this.$jsonForm && typeof this.$jsonForm.labelAlign !== 'undefined') {
                    return this.$jsonForm.labelAlign;
                }
                return DEFAULT_LABEL_ALIGN;
            },

            /**
             * 分隔符，默认是:
             * @return {String} 分隔符
             */
            separator () {
                if (typeof this.labelSeparator !== 'undefined' && this.labelSeparator !== null) {
                    return this.labelSeparator;
                } else if (this.$jsonForm && typeof this.$jsonForm.labelSeparator !== 'undefined') {
                    return this.$jsonForm.labelSeparator;
                }
                return DEFAULT_LABEL_SEPARATOR;
            }
        },

        created () {

            // 循环遍历所有父组件，找到sf-form
            let parent = this.$parent;
            while (parent) {
                if (parent.isJsonForm) {
                    this.$jsonForm = parent;
                    break;
                }
                parent = parent.$parent;
            }
        }

    };
</script>
