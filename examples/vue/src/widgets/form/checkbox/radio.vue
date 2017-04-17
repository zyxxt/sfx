<template>
    <div class="radio"
         :disabled="disabled" :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden">

        <input class="radio-input" type="radio"
               :name="name"
               :id="id"
               :checked="_value"
               @change="onChange"

               :disabled="disabled"
               :readonly="readonly"
        />
        <label class="radio-wrap" :for="id">&nbsp;</label>
        <label v-if="boxLabel" class="radio-label" :for="id">{{boxLabel}}</label>
        <label v-else class="radio-label" :for="id"><slot></slot></label>
    </div>

</template>

<script>
    /**
     * 封装radio，美化
     */

    import Field from 'src/widgets/form/json_field';
    import Component from 'src/widgets/component';
    import uuid from 'src/util/uuid';


    export default {

        mixins: [
            Component,
            Field
        ],

        data () {
            return {

            };
        },

        computed: {
            _value: {
                get () {
                    return this.value === this.checkValue;
                }
            }
        },

        props: {
            boxLabel: String,
            name: {
                type: String,
                'default': uuid('sf-name-')
            },

            // 外部需要配置勾选时对应的值
            checkValue: {

            }
        },

        methods: {

            /**
             * 勾选时触发
             * @param {Event} event 事件
             */
            onChange (event) {
                this.onInput(this.checkValue);
                this.$emit('change', event);
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .radio
        display: inline-block;
        vertical-align: middle
        font-size: 0
        word-spacing: 0
        letter-spacing: 0
        margin-top: 0

        .radio-input
            opacity: 0
            width: 0
            height: 0
            margin: 0

        .radio-wrap
            position: relative
            width: 14px
            height: 14px
            display: inline-block
            vertical-align: middle
            margin: 0
            padding: 0
            min-height: auto

            + label
                vertical-align: middle

            &:before,
            &:after
                content: ''
                position: absolute
                display: block
                top:0
                left:0
                width:14px
                height:14px
                background-color: #fff
                z-index: 0
            &:after
                z-index: 1

            &:before
                border: 1px solid #234156
                border-radius: 50% 50%;
            &:hover:before
                border-color: #17c1c5

            &:after
                opacity: 0
                width: 8px
                height: 8px
                margin: 3px
                border-radius: 50% 50%
                background-color: #234156
            &:hover:after
                opacity: 0.1

        .radio-input:focus + .radio-wrap:before
            border-color: #17c1c5
        .radio-input:focus + .radio-wrap:after
            opacity: 0.1

        .radio-input:checked + .radio-wrap:after
            opacity: 1

        .radio-input:disabled + .radio-wrap:before
            background-color: #e5e5e5
            border-color:#b2b2b2

        .radio-input:disabled + .radio-wrap:after
            opacity: 0
            cursor: default

        .radio-input:disabled:checked + .radio-wrap:after
            opacity: 0.35

        .radio-label {
            font-size: 14px
            word-spacing: normal
            letter-spacing: normal
            margin: 0 0 0 5px
            padding: 0
        }

</style>
