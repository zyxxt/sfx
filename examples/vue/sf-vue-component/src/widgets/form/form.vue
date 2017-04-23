<template>
    <div class="form"
         :class="cls"
         :id="id"
         :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled">
        <slot></slot>
    </div>
</template>
<style lang="stylus" scoped>
    .form
        padding: 20px
</style>
<script>
    /**
     * 对表单提供一套统一管理
     */

    import Vue from 'vue';
    import Component from 'src/widgets/component';
    import { cascadeJsonField as cascade } from 'src/util/walk';
    import logger from 'src/util/logger';
    import { trim } from 'src/util/format';
    import SfFormItem from 'src/widgets/form/form_item';
    import SfFieldlabel from 'src/widgets/form/fieldlabel/fieldlabel';

    export default{

        mixins: [
            Component
        ],

        created () {
            this.isJsonForm = true;
        },

        props: {
            labelWidth: {},
            labelAlign: {}
        },

        computed: {
            value: {
                get () {
                    return this._getJsonValue();
                },
                set (value) {
                    this._setJsonValue(value);
                }
            },

            invalidMsgs: {
                get () {
                    return this.getInvalidMsgs();
                }
            }
        },

        methods: {
            _getJsonValue () {
                let ret = {};
                cascade(this, function (field) {
                    let fieldName = field.getName();
                    if (fieldName || fieldName === 0) {
                        ret[fieldName] = field.value;
                    }
                });
                return ret;
            },

            _setJsonValue (value) {
                cascade(this, function (field) {
                    let fieldName = field.getName();
                    if (fieldName || fieldName === 0) {
                        if (value && typeof value[fieldName] !== 'undefined' && value[fieldName] !== null) {
                            field.onInput(value[fieldName]);

//                            field.value = value[fieldName];

                        } else {
                            logger.log(`field: "${fieldName}" ignored.`);
                        }
                    }
                });
            },

            /**
             * 验证表单输入是否合法，只要有一项不合法，则返回false
             * @return {Boolean} true|false
             */
            isValid () {
                let valid = true;
                cascade(this, function (field) {
                    if (!field.validate()) {
                        valid = false;
                    }
                });
                return valid;
            },


            /**
             * 清除表单错误提示
             */
            clearInvalid () {
                cascade(this, function (field) {
                    if (typeof field.clearInvalid === 'function') {
                        field.clearInvalid();
                    }
                });
            },

            /**
             * 返回表单的出错信息
             * @return {String} 格式如下：
             *                      表单项label: 该输入项格式不合法 \n
             *                      表单项label: 该输入项不能为空
             */
            getInvalidMsgs () {
                let errors = [];
                let me = this;
                cascade(this, function (field) {
                    let fieldErr = field.invalidText;
                    let fieldTitle = me._getFieldLabel(field);
                    if (!fieldErr) {
                        return;
                    }
                    if (fieldTitle) {
                        errors.push(fieldTitle + _('：') + fieldErr);
                    } else {
                        errors.push(fieldErr);
                    }
                });
                return errors.join('<br />');
            },

            /**
             * 返回表单项第一个fieldLabel，错误提示时使用
             * @param {Vue} field 实例化的vue组件
             * @returns {String} 对应的fieldLabel
             */
            _getFieldLabel (field) {
                let fieldLabel = field.fieldTitle || '';
                if (fieldLabel) {
                    return fieldLabel;
                }
                let FormItem = Vue.component('SfFormItem', SfFormItem);
                let fieldParent = field.$parent;
                if (!(fieldParent instanceof FormItem)) {
                    return fieldLabel;
                }
                let FieldLabel = Vue.component('SfFieldlabel', SfFieldlabel);
                fieldParent.$children.every((comp) => {
                    if (comp instanceof FieldLabel) {

                        // 直接拿文本，不支持html
                        fieldLabel = comp.$el.innerText || comp.$el.textContent;

                        // 删除原有的分隔符
                        if (fieldLabel && comp.separator) {
                            if (fieldLabel.slice(-1 * comp.separator.length) === comp.separator) {
                                fieldLabel = fieldLabel.slice(0, -1 * comp.separator.length);
                            }
                        }
                        return false;
                    }
                    return true;
                });
                fieldLabel = trim(fieldLabel);
                return fieldLabel || '';
            }

            /*,

            /!**
             * 表单可以自动加载后台数据？先写着，要不要以后再说
             *!/
            load () {
                logger.log('load form by ajax');
            }*/
        }
    };
</script>
