<template>
    <li class="sf-option ellipsis"
        :class="{active: active}"
        @click="_triggerClick" :disabled="disabled">
        <slot></slot>
    </li>
</template>

<script>
    /**
     * <sf-option value="aa" :disabled="false" :icon-cls="fa fa-xxx">啊啊</sf-option>
     * */

    export default {
        props: {
            disabled: {
                type: Boolean,
                'default': false
            },

            data: {
                type: Object
            },

            iconCls: {
                type: String,
                'default': ''
            },

            active: {
                'default': false
            }
        },

        data () {
            return {

            };

        },

        methods: {
            _triggerClick () {
                if (this.disabled) {
                    return;
                }

                this.$emit('click', this.data.value);
            }
        }
    };
</script>

<style lang="stylus">
    .sf-option
        font-size: 12px;
        padding: 8px 10px;
        position: relative;
        color: #475669;
        height: 28px;
        box-sizing: border-box;
        cursor: pointer;

        &:hover
            background-color: #ccffcc;

        &[disabled="disabled"]
            color: #aaa;
            cursor: default;

        &.active:not([disabled]) {
            background-color: #00a1ff;
             color: #fff;
        }

</style>
