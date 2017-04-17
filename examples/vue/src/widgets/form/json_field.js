/**
 * Created by ued on 2016/11/1.
 */

//import uuid from 'src/util/uuid';
//import logger from 'src/util/logger';
//import { updateJsonField } from 'src/vuex/actions';
import { decodeDate } from 'src/util/format';

const INVALID_CLASS = 'invalid';

export default {
    created () {

        // 设置对表单的一个引用
        let parent = this.$parent;
        while (parent) {
            if (parent.isJsonForm) {
                this.$jsonForm = parent;
                break;
            }
            parent = parent.$parent;
        }
    },

    mounted () {

    },

    data () {
        return {
            readonly: this.defaultReadonly,
            invalidClass: '',
            invalidText: ''
        };
    },

    props: {

        // 表单项必须要配置v-model，不需要如果想获取表单项的值，只能调用getDomValue()，该函数自己实现
        value: {},

        name: String,
        fieldTitle: String,
        type: String,      // text, trigger (search ...)

        defaultReadonly: Boolean,

        validator: Function,

        // 校验错误提示配置
        invalidType: { type: String, 'default': 'error' },
        invalidPosition: { type: String, 'default': 'bottom-start' }

        // hintText 是提供给错误提示用的，外部不需要配置
        // hintText: '',

    },

    methods: {

        /**
         * 配全 sf-form 使用，标识是否为表单项，自定义组件如果要可以设置获取值，则要实现本方法，返回true即可
         * @returns {Boolean} 指明组件为jsonField
         */
        isJsonField () {
            return true;
        },

        /**
         * 获取组件名称，sf-form 获取值时可以映射
         * @returns {String} 组件名称
         */
        getName () {
            return this.name;
        },

        getJsonValue () {
            return this.processValue(this.value);
        },

        setJsonValue (value) {
            this.value = value;
        },

        setReadOnly (readOnly) {
            this.readonly = readOnly;
        },


        isValid (preventMark) {
            return this.disabled || this.validateValue(this.getJsonValue(), preventMark);
        },

        validate () {
            if (this.disabled || this.validateValue(this.getJsonValue())) {
                this.clearInvalid();
                return true;
            }
            return false;
        },

        /**
         * 验证输入的数据是否合法，内部使用
         * private
         * @param {String|Number} value         需要验证的数据，默认会调用组件内部的value
         * @param {Boolean} preventMark         是否要触发markInvalid操作
         * @returns {Boolean}                   返回是否合法
         */
        validateValue (value, preventMark) {
            let error = this.getErrors(value)[0];
            if (typeof error === 'undefined') {
                return true;
            } else if (preventMark !== true) {
                this.markInvalid(error);
            }
            return false;
        },

        /**
         * 获取当前输入的错误列表，多个验证规则不通过则会有多项
         * 组件内部实现本接口
         * @returns {Array} 错误列表
         */
        getErrors () {
            return [];
        },

        /**
         * 给组件添加错误提示，比如：error样式、红显、错误提示
         * @param {String} msg 错误提示内容
         */
        markInvalid (msg) {
            this.invalidClass = INVALID_CLASS;
            this.invalidText = msg;
        },

        /**
         * 清除错误提示
         */
        clearInvalid () {
            this.invalidClass = '';
            this.invalidText = '';
        },

        /**
         * 跟父组件数据绑定，子组件更新值后要调用此函数通知父组件更新
         * @param {*} value 子组件数据
         */
        onInput (value) {
            this.$emit('input', this.processValue(value));
            this.validate();
        },

        /**
         * 根据type类型格式化，支持date number
         * @param {String} value 原始数据
         * @returns {*}          格式化后的数据
         */
        processValue (value) {
            let ret = value;
            if (this.type === 'date') {
                if (value instanceof Date) {
                    ret = value;
                } else {
                    ret = decodeDate(value);
                }
            } else if (this.type === 'number') {
                if (value === null || typeof value === 'undefined' || value === '') {
                    return;
                }

                ret = Number(value);
                if (isNaN(ret)) {
                    return value;
                }
            } else {
                ret = value;
            }
            return ret;
        },

        getDomValue () {

            // 获取原生input的值，表单组件自己实现
            return this.value;
        }

    },

    //vuex: {
    //    getters: {
    //        value (state) {
    //            return state.form.message;
    //        }
    //    },
    //    actions: {
    //        updateJsonField: ({ dispatch }, value, $jsonForm) => {
    //            dispatch('form/UPDATE', value, $jsonForm);
    //        }
    //    }
    //},

    computed: {

    },

    watch: {
        value (newValue) {
            this.onInput(newValue);
        }
    }
};
