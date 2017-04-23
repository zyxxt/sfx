<template>
    <div class="checkbox"
         :class="[cls, checkPart ? 'checkbox-' + (value === 'checkAll' ? 'all' : value === 'checkPart' ? 'part' : 'none') : '']"
         :disabled="disabled"
         :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden"
         ref="checkbox">

        <input class="checkbox-input" type="checkbox" v-if="!checkPart"
               :name="name"
               :id="id"
               :checked="value"
               :true-value="trueValue"
               :false-value="falseValue"
               @change="onChange"
               ref="input"
               :disabled="disabled"
               :readonly="readonly"
        /><label class="checkbox-wrap" :for="id">&nbsp;
          </label><label v-if="boxLabel" class="checkbox-label" :for="id">
              {{boxLabel}}
          </label><label v-else class="checkbox-label" :for="id"><slot></slot></label>
    </div>

</template>

<script>
    /**
     * 封装checkbox，美化
     */

    import Field from 'src/widgets/form/json_field';
    import Component from 'src/widgets/component';
    import uuid from 'src/util/uuid';
    import { on as bindEvent } from 'wind-dom';

    import logger from 'src/util/logger';

    export default {
        mixins: [
            Component,
            Field
        ],

        props: {

            // 此配置做兼容处理，一般配置在slot里即可
            boxLabel: {},

            name: {
                'default': uuid('sf-name-')
            },

            trueValue: {
                'default': true
            },

            falseValue: {
                'default': false
            },

            // 启用三态勾选框，即 checkAll, checkPart, checkNone
            checkPart: {
                type: Boolean,
                'default': false
            }
        },

        mounted () {
            if (this.checkPart) {
                bindEvent(this.$refs.checkbox, 'click', this._toggle);
            }
        },

        watch: {
            disabled (value) {
                logger.log(value);
            }
        },

        methods: {

            /**
             * checkPart时支持，切换勾选框状态
             * @param {Event} event 点击事件
             * @private
             */
            _toggle (event) {
                this.onInput(this.value === 'checkAll' ? 'checkNone' : 'checkAll');
                this.$emit('change', this, event);
            },

            /**
             * 获取勾选时返回给外部的值
             * @param {Boolean} checked 当前勾选状态
             * @return {*} 勾选状态对应的treeValue|falseValue
             */
            getCheckedValue (checked) {
                return checked ? this.trueValue : this.falseValue;
            },

            /**
             * 如果未配置v-model，可调用该方法获取dom节点的勾选状态
             * @return {*} dom勾选状态
             */
            getDomValue () {
                let input = this.$refs.input;

                if (input) {
                    return this.processValue(this.getCheckedValue(input.checked));
                }
            },

            /**
             * 勾选变化时触发
             * @param {Event} event 点击事件
             */
            onChange (event) {
                let checkedValue = this.getCheckedValue(event.target.checked);

                this.onInput(checkedValue);
                this.$emit('change', this, event);
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .checkbox
        display: inline-block;
        vertical-align: middle
        word-spacing: 0
        letter-spacing: 0
        margin-top: 0
        margin-bottom: 0
        white-space: nowrap

        .checkbox-input
            opacity: 0
            width: 0
            height: 0
            margin: 0

        .checkbox-wrap
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
                display: inline-block
                vertical-align: middle
                top:0
                left:0
                width:14px
                height:14px
                background-color: transparent
                z-index: 0
            &:after
                z-index: 1
                font: normal 12px/1 FontAwesome;
                left: 1px;

            &:before
                border: 1px solid #bbb
            &:hover:before
                border-color: #0099ff

        &.checkbox-all .checkbox-wrap:after
        .checkbox-input:checked + .checkbox-wrap:after
            content: '\f00c'

        &.checkbox-part .checkbox-wrap:after
            height: 8px
            width: 8px
            background-color: #234156
            margin: 3px
            left: 0
        .checkbox-input:disabled + .checkbox-wrap:before
            background-color: #eee

        .checkbox-input:disabled + .checkbox-wrap:after
            color: #ccc

        .checkbox-input:disabled:checked + .checkbox-wrap:after
            /*opacity: 0.35*/

        .checkbox-input:focus + .checkbox-wrap:before
            border-color: #0099ff

        .checkbox-label {
            word-spacing: normal
            letter-spacing: normal
            margin: 0 0 0 5px
            padding: 0
        }

</style>
