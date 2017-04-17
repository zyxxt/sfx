<script>
    /**
     * Created by ued on 2016/12/17.
     */

    import Textfield from '../textfield/textfield.vue';
    import { formatString } from 'src/util/format';

    const BASE_CHARTS = '1234567890';
    const MAX_VALUE = 4294967296;

    export default {

        props: {
            cls: { 'default': 'numberfield' },
            type: { 'default': 'number' },

            maxValue: { type: Number, 'default': MAX_VALUE },
            maxValueText: { type: String, 'default' () {
                return _('该输入项的最大值是{0}');
            } },
            minValue: Number,
            minValueText: { type: String, 'default' () {
                return _('该输入项的最小值是{0}');
            } },
            nanText: { type: String, 'default' () {
                return _('该输入项不是一个有效的数字');
            } },

            allowDecimals: { type: Boolean, 'default': true },

            maskRe: { type: RegExp, 'default' () {
                var allowed = BASE_CHARTS;

                // 默认支持小数点跟负号
                allowed += '.-';
                return new RegExp('[' + allowed + ']');
            } }
        },

        mixins: [
            Textfield
        ],

        mounted () {

            // 不使用原生的number，原生的问题比较多
            let input = this.$refs.input;
            input.removeAttribute('type');
        },

        methods: {

            /**
             * 校验输入合法性
             * @param {Number} value 输入框的值
             * @param {Array} errors 错误列表
             *
             * @override form/textfield/textfield.vue::_validateValue()
             */
            _validateValue (value, errors) {
                if (typeof value === 'undefined' || value === null || value === '') {
                    return;
                }

                let allowed = BASE_CHARTS;
                value = String(value).trim();

                // 是否支持小数
                if (this.allowDecimals) {
                    allowed += '.';
                }

                // 是否支持负数
                if (typeof this.minValue === 'undefined' || this.minValue === null || this.minValue < 0) {
                    allowed += '-';
                }

                // 正则匹配下是否是正常的数字格式
                let reg = new RegExp('^[' + allowed + ']*$');
                if (!/^\-?\d+(\.\d+)?$/.test(value) || (!reg.test(value) && !this.allDecimals)) {
                    errors.push(this.nanText);
                    return;
                }

                // 判断最小值
                if (typeof this.minValue !== 'undefined' && this.minValue !== null) {
                    if (!isNaN(this.minValue) && !isNaN(value)) {
                        if (Number(value) < this.minValue) {
                            errors.push(formatString(this.minValueText, this.minValue));
                            return;
                        }
                    }
                }

                // 判断最大值
                if (this.maxValue !== 'undefined' && this.maxValue !== null) {
                    if (!isNaN(this.maxValue) && !isNaN(value)) {
                        if (Number(value) > this.maxValue) {
                            errors.push(formatString(this.maxValueText, this.maxValue));
                        }
                    }
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
                this._validateValue(value, errors);
                this._validateVtype(value, errors);
                this._validateRegex(value, errors);

                return errors;
            }
        }
    };
</script>
