<template>
    <i class="fieldtip"
       :class="fieldTipType === 'icon' ? 'fieldtip-icon' : 'fieldtip-text'"
       :style="{ width: `${width}px`, height: height + 'px' }"
       :id="id"
       v-show="!hidden"
       :disabled="disabled"
       v-qtip="qtip"
    >
        <slot v-if="fieldTipType !== 'icon'"></slot>
    </i>
</template>
<style lang="stylus" scoped>
    .fieldtip
        display: inline-block
        vertical-align: middle
    &.fieldtip-text
        color: #999
    &.fieldtip-icon
        width: 16px
        height: 16px
        background: url("./img/info.png") no-repeat 0 -30px
</style>
<script>
    /**
     * 实现AC的fieldTip，可以显示图标或者文字
     */

    import Component from 'src/widgets/component';

    export default{
        mixins: [
            Component
        ],
        data () {
            return {
                qtip: ''
            };
        },
        computed: {
            qtip () {
                if (this.fieldTipType === 'icon') {
                    return this.$slots.default;
                }
                return '';
            }
        },
        props: {
            fieldTipType: {
                type: String,
                'default': 'icon'
            }
        }
    };
</script>
