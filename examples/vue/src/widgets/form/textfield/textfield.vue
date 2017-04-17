<template>
    <div class="textfield"
         :class="cls"
         :id="id"
         :style="styles"
         :trigger-type="triggerType"
         v-show="!hidden" >

        <input class="textfield-input"
               :class="invalidClass"
               :type="type"
               :placeholder="placeholder"
               :disabled="disabled"
               :readonly="readonly"
               :value="text"
               @keypress="onKeyPress"
               @input="onInput($event.target.value)"
               @focus="onFocus($event)"
               @blur="onBlur"
               ref="input"
               :qcls="invalidType"
               :qanchor="invalidPosition"
               v-qtip="invalidText"
        />
        <button v-if="triggerType && triggerType !== 'text'"
                class="textfield-trigger"
                type="button"
                @click="onTrigger">

            <i class="fa"
               :class="'fa-' + triggerType"></i>
        </button>
    </div>
</template>

<style lang="stylus">
    .textfield
        display: inline-block
        vertical-align: middle
        position: relative
        height: 28px
        width: 200px

        .textfield-input
            width: 100%
            height: 100%
            border: 1px solid #ccc
            padding: 5px 0 5px 8px
            color: #234156
            background: #FFF
            outline: 0

            &:focus
            &.focus
                border-color: #17C1C5
                background-color: #FFF

            &.invalid
                border-color: #fc6969
                background-color: #fffcfc

            &::-webkit-input-placeholder
            &:-moz-placeholder
            &::-moz-placeholder
            &::-ms-input-placeholder
                color: #7B7B7B

            &[disabled="disabled"]
                background-color: #efefef

    &[trigger-type]:not([trigger-type="text"]) .textfield-input
            padding-right: 30px

        .textfield-trigger
            position: absolute;
            right: 5px
            top: 50%
            width: 20px
            height: 20px
            margin-top: -10px
            border: none
            outline: 0
            padding: 0
            background: transparent no-repeat 100% 0
            -webkit-transition: none 0.25s ease-out;
            -moz-transition: none 0.25s ease-out;
            transition: none 0.25s ease-out;
            -webkit-transition-property: background, color, margin;
            -moz-transition-property: background, color, margin;
            transition-property: background, color, margin;
            &:hover
            &:focus
                color: #17c1c5;
            &:active
                margin-top: -9px

</style>

<script>
    /**
     * textfield
     */

    import JsonField from 'src/widgets/form/json_field';
    import Component from 'src/widgets/component';
    import Validator from 'src/util/validation/validator';
    import VTypes from 'src/util/vtypes/vtypes';

    import * as Format from 'src/util/format';
    import logger from 'src/util/logger';

    export default {
        mixins: [
            Component,
            JsonField
        ],

        props: {

            // 支持具体数值，或者 "auto"
            defaultWidth: {  },
            triggerType: { type: String, 'default': 'text' }, // trigger, search
            placeholder: { type: String, 'default': _('请输入') },

            // validate
            allowBlank: { type: Boolean, 'default': true },
            blankText: { type: String, 'default' () {
                return _('该输入项不允许为空');
            } },
            vtype: String,
            maxLength: Number,
            maxLengthText: { type: String, 'default' () {
                return _('该输入项最多允许{0}个字符');
            } },
            minLength: Number,
            minLengthText: { type: String, 'default' () {
                return _('该输入项最少允许{0}个字符');
            } },
            regex: RegExp,
            regexText: String,

            maskRe: RegExp,

            type: {
                type: String,
                'default': 'text'
            }
        },

        methods: {

            /**
             * 传入了validator函数，自定义验证
             * @param {String} value    输入框
             * @param {Array}  errors   原有错误列表，校验不过则把错误添加到列表里
             * @private
             */
            _validateValidator (value, errors) {
                if (typeof this.validator === 'function') {
                    let msg = this.validator(value);
                    if (msg !== true) {
                        errors.push(msg);
                    }
                }
            },

            /**
             * 校验是否允许为空
             * @param {String} value    输入框
             * @param {Array}  errors   原有错误列表，校验不过则把错误添加到列表里
             * @private
             */
            _validateBlank (value, errors) {
                if (typeof value === 'undefined' || value === null || value === '') {
                    if (this.allowBlank) {
                        return;
                    }
                    errors.push(this.blankText);
                }
            },

            /**
             * 校验字符串长度
             * @param {String} value    输入框
             * @param {Array}  errors   原有错误列表，校验不过则把错误添加到列表里
             * @private
             */
            _validateLength (value, errors) {
                if (typeof value === 'undefined' || value === null || value === '') {
                    return;
                }
                if (value.length < this.minLength) {
                    errors.push(Format.formatString(this.minLengthText, this.minLength));
                }

                if (value.length > this.maxLength) {
                    errors.push(Format.formatString(this.maxLengthText, this.maxLength));
                }
            },

            /**
             * 校验vtype，需要先在src/util/vtypes/vtypes.js 注册才可使用
             * vtype支持 || 连接符，即“或”关系，是OrCompositeValidator的快捷方式
             * 如果未注册，可以用validator自定义核验实现同样的效果
             * @param {String} value    输入框
             * @param {Array}  errors   原有错误列表，校验不过则把错误添加到列表里
             * @private
             */
            _validateVtype (value, errors) {
                if (typeof value === 'undefined' || value === null || value === '') {
                    return;
                }
                if (this.vtype) {
                    let err = [];
                    let isValid = false;
                    this.vtype.split('||').forEach(vtype => {
                        vtype = Format.trim(vtype);
                        let validation = VTypes.get(vtype);
                        if (validation && !(validation instanceof Validator)) {
                            validation = validation.validator;
                        }
                        if (!validation) {
                            logger.error(`[textfield] is vtype: "${vtype}" registe? `);
                            return;
                        }
                        let ret = validation.verify(value);
                        if (ret !== true) {
                            err.push(ret);
                            return;
                        }
                        isValid = true;
                    });
                    if (!isValid) {
                        errors.push(...err);
                    }
                }
            },

            /**
             * 校验自定义正则表达式
             * @param {String} value    输入框
             * @param {Array}  errors   原有错误列表，校验不过则把错误添加到列表里
             * @private
             */
            _validateRegex (value, errors) {
                if (typeof value === 'undefined' || value === null || value === '') {
                    return;
                }
                if (this.regex && !this.regex.test(value)) {
                    errors.push(this.regexText);
                }
            },

            /**
             * 校验
             * @param {String}  value   输入框
             * @returns {Array}         错误列表
             */
            getErrors (value) {
                let errors = [];
                value = typeof value === 'undefined' ? this.getJsonValue() : value;

                this._validateValidator(value, errors);
                this._validateBlank(value, errors);
                this._validateLength(value, errors);
                this._validateVtype(value, errors);
                this._validateRegex(value, errors);

                return errors;
            },

            getDomValue () {
                let input = this.$refs.input;
                if (input) {
                    return this.processValue(input.value);
                }
            },

            _maskReTest (maskRe, key) {
                if (maskRe instanceof RegExp) {
                    if (!maskRe.test(key)) {
                        return false;
                    }
                } else if (typeof maskRe === 'function') {
                    return maskRe.call(this, key);
                }

                if (this.vtype) {
                    let match = false;
                    this.vtype.split('||').forEach(vtype => {
                        vtype = Format.trim(vtype);
                        let validation = VTypes.get(vtype);
                        if (!validation) {
                            logger.error(`[textfield] is vtype: "${vtype}" registe? `);
                            return true;
                        }
                        if (validation.maskRe && validation.maskRe instanceof RegExp) {
                            if (validation.maskRe.test(key)) {
                                match = true;
                            }
                        } else {
                            match = true;
                        }
                    });
                    if (!match) {
                        return match;
                    }
                }

                return true;
            },

            onKeyPress (event) {
                let key = String.fromCharCode(event.which);
                if (!this._maskReTest(this.maskRe, key)) {
                    event.preventDefault();
                    return false;
                }
                return true;
            },

            onFocus (e) {
                let vm = this;

                vm.$emit('focus', e);
            },

            onBlur (e) {
                let vm = this;

                vm.$emit('blur', e);
            },

            /**
             * trigger点击事件
             * @param {Event} event 点击事件
             */
            onTrigger (event) {
                let value = this.getJsonValue();
                logger.log('[textfield] emit event: trigger');
                this.$emit('trigger', value, event);
            },

            _renderer (value) {
                return value;
            }
        },

        computed: {
            errors: {
                get () {
                    this.getErrors();
                }
            },
            styles () {
                let vm = this;
                let isAutoWidth = vm.defaultWidth === 'auto';

                return {
                    display: isAutoWidth ? 'block' : '',
                    width: isAutoWidth ? 'auto' : vm.width + 'px',
                    height: vm.height + 'px'
                };
            },

            text () {
                return this._renderer(this.value);
            }
        }

    };

</script>
