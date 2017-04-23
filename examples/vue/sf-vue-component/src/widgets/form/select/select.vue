<script>
    /**
     * sf-select 下拉框用法：
     * <sf-select
     *     placeholder="请选择"
     *     v-model="xxx" 绑定字段
     *     display-field="text" 显示的文字字段，默认为 label
     *     value-field="id" 唯一标识字段，默认为 value
     *     :options="xxOptions" 绑定下拉选项
     *     :default-disabled="isDisabled" 是否禁用
     *     :default-width="xxWidth" 宽度
     *     :ajax="ajaxOption" 异步请求
     *     :auto-load="true" 配置异步请求时是否加载，默认为是
     *     renderer="renderText" 格式化显示
     *     @select="triggerSelect(val, oldVal, data, oldData)" 绑定选中事件
     *     @change="triggerChange(val, oldVal, data, oldData)" 绑定 change 事件
     * ></sf-select>
     * */

    import Component from 'src/widgets/component';
    import { trim } from 'src/util/format';
    import { apply } from 'src/util/apply';
    import JsonField from '../json_field';
    import { on as bindEvent, off as unbindEvent, addClass, removeClass } from 'wind-dom';

    const DEFAULT_WIDTH = 180;
    const OPTION_HEIGHT = 28;
    const OPTION_BORDER = 2;
    const NO_OPTIONS_HEIGHT = 75;
    const ACTIVE_CLS = 'active-options-layer';

    export default {
        mixins: [
            Component,
            JsonField
        ],
        props: {
            displayField: {
                type: String,
                'default': 'label'
            },

            valueField: {
                type: String,
                'default': 'value'
            },

            options: {
                type: Array,
                'default': () => []
            },

            placeholder: {
                type: String,
                'default': '请选择'
            },

            defaultFirst: {
                type: Boolean,
                'default': true
            },

            renderer: {
                type: String
            },

            autoLoad: {
                type: Boolean,
                'default': true
            },

            rootData: {
                type: String,
                'default': 'data'
            },

            ajax: {
                type: Object
            },

            // 来自父层的 v-model
            value: {},

            actionName: {
                type: String
            }
        },


        data () {
            return {
                displayText: '',
                width: this.defaultWidth || DEFAULT_WIDTH,
                ajaxOptions: this.ajax,
                optionsList: [],
                optionsMap: new Map(),
                optionsCount: 0,
                oldValue: this.value,
                isLoading: false
            };
        },

        mounted () {
            this._initOptionEvent();

            // 如果是异步加载下拉选项则优先处理
            if (this.autoLoad && this.ajax) {
                this.load().then(() => {
                    this._initDefault();
                });
            } else {
                if (this.options.length) {
                    this._updateOptions(this.options);
                } else if (this.$slots.default && this.$slots.default.length) {
                    this._updateStaticOptions();
                }
                this._initDefault();
            }
        },

        render (h) {
            return (
                <div class="sf-select" style={{width: this.width + 'px'}}>
                    <div style={{display: 'none'}}>{ this.$slots.default }</div>
                    <div class="sf-select-display">
                        <div class="ellipsis" domPropsInnerHTML={this.displayText}></div>
                        <i class={`fa arrow-icon ${this.isLoading ? 'fa-spinner fa-pulse' : 'fa-angle-down'}`}></i>
                    </div>
                    <input class="sf-select-overlay" disabled={this.disabled} readonly type="text" ref="target" on-click={this._toggleOptions}/>

                    <sf-layer class="sf-options-layer" ref="options" auto-scrollbar={false}>
                        <sf-scrollbar style={{border: '1px solid #ccc'}} ref="optionsScroll" autoWidth={true}>
                            {
                                !this.hasOptions() ? <div class="sf-select-empty" style={{width: this.width + 'px'}}>无数据</div> :
                                (
                                    <ul class="sf-options-list" style={{width: this.width + 'px'}}>
                                        {
                                            this._l(this.optionsList, (option, i) => {
                                                return (<sf-option ref={'option' + i}
                                                                   data={option}
                                                                   active={option.value === this.value}
                                                                   class={option.value === this.value ? 'active' : ''}
                                                                   on-click={this._clickOption}
                                                                   disabled={option.disabled}
                                                                   domPropsInnerHTML={option.displayText}>
                                                        </sf-option>);
                                            })
                                        }
                                    </ul>
                                )
                            }
                        </sf-scrollbar>
                    </sf-layer>
                </div>
            );
        },

        methods: {
            _initOptionEvent () {
                let targetEl = this.$refs.target;
                let optionsEl = this.$refs.options;

                optionsEl.alignTo(targetEl);
                unbindEvent(document, 'click', optionsEl._documentHide);
                bindEvent(document, 'click', optionsEl._documentHide);
            },

            // 初始化时如果 v-model 有值，就设置一下
            _initDefault () {
                if (this.value !== null && this.value !== void 0) {
                    this._updateDisplay(this.value);
                } else if (this.defaultFirst && this.optionsList.length) {
                    this._updateValue(this.optionsList[0].value);
                }
            },

            _toggleOptions () {
                let me = this;
                let optionsEl = this.$refs.options;
                let isHidden = optionsEl.hidden;

                if (!isHidden) {
                    me.hideOptions();
                } else {
                    if (me.ajaxOptions) {
                        me.load().then(() => {
                            me.showOptions();
                        });
                    } else {
                        me.showOptions();
                    }
                }
            },

            _getPlaceholder () {
                return '<div class="sf-select-placeholder">' + this.placeholder + '</div>';
            },

            _triggerChange (value) {
                let oldValue = this.oldValue;

                this.oldValue = value;
                this._updateDisplay(value);
                this.$emit('change', value, oldValue, this.optionsMap.get(value), this.optionsMap.get(oldValue));
            },

            _clickOption (value) {
                let oldValue = this.oldValue;

                this.$emit('select', value, oldValue, this.optionsMap.get(value), this.optionsMap.get(oldValue));
                this.$refs.options.hidden = true;

                if (value === this.oldValue) {
                    return;
                }

                this._updateValue(value);

                if (this.actionName) {
                    this.$emit('action', value);
                }
            },

            _getRootData (data) {
                let keys = this.rootData.split('.');
                let ret = data;

                keys.forEach((key) => {
                    ret = ret[key];
                });

                return ret;
            },

            _updateStaticOptions () {
                let me = this;
                let list = [];

                this.$slots.default.forEach(vnode => {
                    if (!vnode.componentOptions || vnode.componentOptions.tag !== 'sf-option') {
                        return;
                    }

                    let data = apply({}, vnode.data.attrs, vnode.componentOptions.propsData);

                    data[me.displayField] = trim(vnode.elm.innerHTML);

                    list.push(data);
                });

                this._updateOptions(list);
            },

            _updateOptions (dataList = []) {
                this._updateOptionsList(dataList);
                this._updateOptionsMap();
                this._updateDisplay(this.value);
            },

            /**
             * 更新下拉选项选项
             * @param {Array} dataList 下拉选项选项列表
             * */
            _updateOptionsList (dataList) {
                let me = this;
                let renderFn = (label, data) => {
                    let renderer = this.$vnode.context[this.renderer] || (v => v);
                    let iconTpl = data.iconCls ? ('<i class="fa option-icon ' + data.iconCls + '"></i>') : '';
                    return iconTpl + renderer(label, data);
                };


                me.optionsList = dataList.map(option => {
                    option.label = option[me.displayField];
                    option.value = option[me.valueField];
                    option.displayText = renderFn(option[me.displayField], option);

                    return option;

                });
            },

            /**
             * 更新下拉选项的映射值
             * 如果有动态配置的下拉选项，则优先使用
             * */
            _updateOptionsMap () {
                let me = this;
                let map = new Map();

                me.optionsCount = 0;

                me.optionsList.forEach(option => {
                    map.set(option.value, option);
                    me.optionsCount++;
                });

                me.optionsMap = map;
            },

            _updateValue (value) {
                this.$emit('input', value);
            },

            _updateDisplay (value) {
                let selectedOption = this.optionsMap.get(value);

                this.displayText = selectedOption ? selectedOption.displayText : this._getPlaceholder();
            },

            _getOptionVm (value) {
                let vm = this;
                let optionVm = vm.$refs.option0;

                value = value || vm.value;

                for (let i = 0; optionVm;) {
                    if (optionVm.data.value === value) {
                        return optionVm;
                    }

                    i += 1;

                    optionVm = vm.$refs['option' + i];
                }
            },

            _updateScrollView () {
                let vm = this;

                vm.$nextTick(() => {
                    let optionVm = vm._getOptionVm();

                    if (!optionVm) {
                        return;
                    }

                    let optionEl = optionVm.$el;
                    let listEl = vm.$refs.options.$el;

                    let listRect = listEl.getBoundingClientRect();
                    let optionRect = optionEl.getBoundingClientRect();

                    if (optionRect.top >= listRect.top &&
                        optionRect.bottom <= listRect.bottom) {
                        return;
                    }

                    let scrollTop = vm.$refs.optionsScroll.top;

                    if (optionRect.top < listRect.top) {
                        scrollTop += optionRect.top - listRect.top;
                    } else {
                        scrollTop += optionRect.bottom - listRect.bottom;
                    }

                    vm.$refs.optionsScroll.normalizeVertical(scrollTop);
                    vm.$refs.optionsScroll.moveTheScrollbar();
                });
            },

            _activeOptionsLayer () {
                let activeLayerEl = document.getElementsByClassName('sf-options-layer ' + ACTIVE_CLS)[0];

                if (activeLayerEl) {
                    removeClass(activeLayerEl, ACTIVE_CLS);
                }

                addClass(this.$refs.options.$el, ACTIVE_CLS);
            },

            //<---------------------------------- 对外暴露的API ------------------------------------->

            hasOptions () {
                return this.optionsList.length;
            },

            /**
             * ajax 异步请求参数并重新设置下拉选项
             * @param {Object} ajaxOptions 请求参数
             * @return {Promise} promise 对象
             * */
            load (ajaxOptions) {
                this.isLoading = true;

                return this.$http(
                        apply(this.ajaxOptions, ajaxOptions)
                    ).then(({data}) => {
                        this.isLoading = false;
                        this.loadData(this._getRootData(data));
                    });
            },

            /**
             * 重新刷新数据
             * @return {Promise} ajax promise 对象
             * */
            reload () {
                return this.load();
            },

            /**
             * 手动加载下拉选项
             * @param {Array} dataList 下拉选项列表
             * */
            loadData (dataList) {
                this._updateOptions(dataList);
            },

            showOptions () {
                this.$refs.options.hidden = false;

                // 这里比较恶心的是，在打开下拉框前是不知道高度的！所以要在打开的时候设置一下下拉框的高度
                this.$refs.options.height = (OPTION_HEIGHT * this.optionsCount || NO_OPTIONS_HEIGHT) + OPTION_BORDER;

                this.$nextTick(() => {
                    this.$refs.optionsScroll.sync();
                });

                // 给当前的 optionLayer 加个 active 样式，以便获取现实的下拉框
                this._activeOptionsLayer();
                this._updateScrollView();
            },

            hideOptions () {
                this.$refs.options.hidden = true;
            }
        },

        watch: {
            value (value) {
                this._triggerChange(value);
            },
            options (value) {
                this._updateOptions(value);
            }
        }
    };
</script>

<style lang="stylus">
    offset = 0;

    .sf-select
        position: relative;
        display: inline-block;
        line-height: 1.5;

        .sf-select-placeholder
            color: #aaa!important;

        .sf-select-display
            position: relative;
            width: 100%;
            height: 28px;
            line-height: 18px;
            text-align: left;
            display: inline-block;
            padding: 4px 30px 4px 8px;
            font-size: 12px;
            color: #333;
            background-color: #fff;
            border-color: #ccc;
            font-weight: 400;
            white-space: nowrap;
            vertical-align: middle;
            border: 1px solid #ccc;

            i.option-icon
                width: 16px;
                font-size: 14px;
                margin-right: 6px;

            i.arrow-icon
                position: absolute;
                right: 8px;
                top: 5px;

        .sf-select-overlay
            width: 100%;
            height: 100%;
            background: transparent;
            position: absolute;
            left: 0;
            top: 0;
            outline: none;
            border: none;
            cursor: pointer;

        .sf-select-overlay:focus
            border: 1px solid #17c1c5;

        .sf-select-overlay[disabled="disabled"]
            background: #eee;
            opacity: 0.5;
            cursor: default;

    .sf-options-layer
        background: #fff;
        color: #000;
        padding: 0;
        border-radius: 0;
        max-height: 300px;
        border: none;
        text-align: left;

        &[x-placement^="top"]
         margin-bottom: offset;
        &[x-placement^="bottom"]
         margin-top: offset;
        &[x-placement^="left"]
         margin-right: offset;
        &[x-placement^="right"]
         margin-left: offset;

        .sf-options-list
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;

            i.option-icon
                width: 16px;
                font-size: 14px;
                margin-right: 6px;

        .sf-select-empty
            width: 100%;
            height: 75px;
            padding: 20px 0;
            text-align: center;


</style>
