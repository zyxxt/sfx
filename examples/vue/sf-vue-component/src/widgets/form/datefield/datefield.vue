<template>
    <div class="datefield">
        <sf-textfield ref="dateInput"
                      :default-width="width"
                      :default-readonly="true"
                      :default-disabled="disabled"
                      v-model="dateDisplay"
                      trigger-type="calendar"
                      placeholder="请选择日期">
        </sf-textfield>
        <sf-layer class="datefield-layer" ref="dateLayer" :auto-scrollbar="false">
            <div class="datefield-picker" v-if="!isRange">
                <sf-datepicker ref="datePicker"
                               class="datefield-picker"
                               v-model="dateValue"
                               :start-limit="startLimit"
                               :end-limit="endLimit"
                               @select="_confirmDate">
                </sf-datepicker>
            </div>
            <div class="datefield-picker" v-if="isRange">
                <sf-daterangepicker ref="datePicker"
                                    class="datefield-picker"
                                    v-model="dateValue"
                                    :start-limit="startLimit"
                                    :end-limit="endLimit"
                                    @select="_selectRangeDate">
                </sf-daterangepicker>
                <div class="datefield-picker-btns">
                    <sf-button class="btn btn-small btn-primary"
                               @click="_confirmDate"
                               :disabled="!isRangeSelected">确定</sf-button>
                </div>
            </div>
        </sf-layer>
    </div>

</template>

<script>
    /**
     * sf-datefield
     * */

    import { on as bindEvent, off as unbindEvent } from 'wind-dom';
    import { encodeDate } from 'src/util/format';
    import { isDate, isObject, isFunction, typeOf } from 'src/util/typeof';
    import Component from 'src/widgets/component';

//    import logger from 'src/util/logger';

    export default {
        mixins: [
            Component
        ],

        props: {
            startLimit: String,

            endLimit: String,

            type: {
                type: String,
                'default': 'single' // range
            },

            format: {
                type: String,
                'default': 'Y-m-d'
            },

            value: {}
        },

        data () {

            return {
                valueType: this.type === 'range' ? typeOf(this.value.start) : typeOf(this.value),
                dateValue: this.value,
                dateDisplay: '',
                isRange: this.type === 'range',
                isRangeSelected: !!this.value
            };
        },

        mounted () {
            this._bindTarget();
            this._formatDateDisplay(this.dateValue);
        },

        watch: {
            value (value) {
                this.dateValue = value;
                this._formatDateDisplay(value);

            }
        },

        methods: {
            _bindTarget () {
                let dateInput = this.$refs.dateInput;
                let dateLayer = this.$refs.dateLayer;

                dateLayer.alignTo(dateInput.$el);

                bindEvent(dateInput.$el, 'click', this._togglePicker);
                bindEvent(document, 'click', this._documentHide);
            },

            _togglePicker () {
                if (this.disabled) {
                    return;
                }

                let dateLayer = this.$refs.dateLayer;
                dateLayer.hidden = !dateLayer.hidden;
            },

            _documentHide (e) {
                if (this.disabled) {
                    return;
                }

                let dateInput = this.$refs.dateInput;
                let dateLayer = this.$refs.dateLayer;
                let activeOptionsEl = document.getElementsByClassName('sf-options-layer active-options-layer')[0];

                if (dateInput.$el.contains(e.target) ||
                    dateLayer.$el.contains(e.target) ||
                    (activeOptionsEl && activeOptionsEl.contains(e.target))
                ) {
                    return;
                }

                dateLayer.hidden = true;
            },

            _formatDateDisplay (value) {
                if (!value) {
                    this.dateDisplay = '';
                    return;
                }

                let formatFn = this.$vnode.context[this.format];
                let formatStr = isFunction(formatFn) ? formatFn() : this.format;

                if (isDate(value)) {
                    this.dateDisplay = encodeDate(value, formatStr);
                } else if (isObject(value)) {
                    this.dateDisplay = encodeDate(value.start, formatStr) + ' ~ ' + encodeDate(value.end, formatStr);
                } else {
                    this.dateDisplay = encodeDate(new Date(value), formatStr);
                }
            },

            _parseDateValue (value) {
                if (isObject(value)) {
                    return {
                        start: this._parseDateValue(value.start),
                        end: this._parseDateValue(value.end)
                    };
                }

                switch (this.valueType) {
                    case 'String':
                        return encodeDate(value, 'Y-m-d');
                    case 'Number':
                        return value.getTime();
                    default:
                        return value;
                }
            },

            _selectRangeDate (start, end) {
                this.isRangeSelected = !!end;
            },

            _confirmDate () {
                let $picker = this.$refs.datePicker;
                let $layer = this.$refs.dateLayer;
                let dateValue = $picker.getDateValue();

                this.$emit('input', this._parseDateValue(dateValue));

                $layer.hide();
            }
        },

        onDestroy () {
            unbindEvent(this.$refs.dateInput.$el, 'click', this._togglePicker);
            unbindEvent(document, 'click', this._documentHide);
        }
    };
</script>

<style lang="stylus">
    .datefield
        display: inline-block;

    .layer.datefield-layer
        padding: 0;

    .sf-datepicker.datefield-picker,
    .sf-datepicker-range.datefield-picker
        border: none;

    .datefield-picker-btns
        border-top: 1px solid #ccc;
        padding: 8px 18px;
        text-align: right;
</style>
