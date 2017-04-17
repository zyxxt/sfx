<script>
    /**
     * Created by ued on 2016/11/29.
     */

    import Vue from 'vue';
    import { htmlEncode } from 'src/util/format';
    import uuid from 'src/util/uuid';
    import Event from './event';

    export default {

        render (h) {
            let me = this;
            let col = 0;
            const TWO = 2;
            return (
                <tr class={ `table-row
                        ${me.row % TWO ? 'table-row-even' : 'table-row-odd'}
                        ${me.record.selected ? 'table-row-selected' : ''}`
                      } onClick={ me.onRowClick }>
                {
                    (function () {
                        if (me.options.selectionHide) {
                            return '';
                        }
                        return (
                            <sf-table-cell class="table-cell-center table-cell-checkbox"
                                           defaultWidth={ me.options.selectionWidth } >
                                <sf-checkbox value={ me.record.selected }
                                             onInput={ me.syncCheck }
                                             defaultDisabled={ me.record.selectAble === false }
                                             onChange={ me._selectionChange }
                                             ref="checkbox"/>
                            </sf-table-cell>
                        );
                    }())
                }
                {
                    me._l(me.columns, vnode => {
                        if (!vnode.tag) {
                            return '';
                        }
                        if (vnode.componentOptions.propsData.useVue) {
                            return (
                                <sf-table-cell defaultWidth={ vnode.child ? vnode.child.width : vnode.componentOptions.propsData.defaultWidth }
                                               title={ me._renderTitle(vnode, me.record, me.options.data, me.row, col++) }
                                               cls={ `table-cell-${vnode.componentOptions.propsData.align || 'left'}` }
                                               nativeOnClick={ me._onClick(vnode, me.record, me.options.data, me.row, col) } >
                                    {
                                        me._rendererComponent(vnode, me.record, me.options.data, me.row, col++)
                                    }
                                </sf-table-cell>
                            );
                        }
                        return (
                            <sf-table-cell defaultWidth={ vnode.child ? vnode.child.width : vnode.componentOptions.propsData.defaultWidth }
                                           domPropsInnerHTML={ me._renderer(vnode, me.record, me.options.data, me.row, col++) }
                                           title={ me._renderTitle(vnode, me.record, me.options.data, me.row, col++) }
                                           cls={ `table-cell-${vnode.componentOptions.propsData.align || 'left'}` }
                                           nativeOnClick={ me._onClick(vnode, me.record, me.options.data, me.row, col - 1) } >
                            </sf-table-cell>
                        );
                    })
                }
                </tr>
            );
        },

        props: {
            options: {
                type: Object
            },

            // 这里配合table使用，columns是vnode列表
            columns: {
                type: Array
            },

            record: {
                type: Object
            },

            row: Number
        },

        mixins: [
            Event
        ],

        data () {
            return {};
        },

        methods: {

            /**
             * 格式化单元格内容
             * @param {VNode} vnode   sf-table-column列vnode配置
             * @param {Object} record 行record
             * @param {Array} data    record列表
             * @param {Number} row    第几行
             * @param {Number} col    第几列
             * @return {String}       格式化的内容
             * @private
             */
            _renderer (vnode, record, data, row, col) {
                let useVue = vnode.componentOptions.propsData.useVue;
                let html = this._rendererHTML(vnode, record, data, row, col);
                if (!useVue) {
                    let useHTML = vnode.componentOptions.propsData.useHTML;
                    if (!useHTML) {
                        html = htmlEncode(typeof html === 'undefined' ? '' : String(html));
                    }
                    return html;
                }
            },

            /**
             * 格式化单元格的title
             * @param {VNode} vnode sf-table-column列vnode配置
             * @return {String} title
             * @private
             */
            _renderTitle (vnode) {
                let me = this;
                return vnode.componentOptions.propsData.useHTML ||
                    vnode.componentOptions.propsData.useVue ?
                    '' : me._renderer.apply(me, arguments);
            },

            /**
             * 格式化单元格内容为HTML
             * @param {VNode} vnode   sf-table-column列vnode配置
             * @param {Object} record 行record
             * @param {Array} data    record列表
             * @param {Number} row    第几行
             * @param {Number} col    第几列
             * @return {String}       innerHTML
             * @private
             */
            _rendererHTML (vnode, record, data, row, col) {
                let columnRenderFn = vnode.componentOptions.propsData.renderer;
                let defaultRenderFn = function () {
                    return record[vnode.componentOptions.propsData.dataIndex];
                };
                if (typeof columnRenderFn === 'string') {
                    columnRenderFn = vnode.context[columnRenderFn];
                }
                if (typeof columnRenderFn !== 'function') {
                    columnRenderFn = defaultRenderFn;
                }
                let template = columnRenderFn(
                        record[vnode.componentOptions.propsData.dataIndex],
                        record,
                        data,
                        row,
                        col
                );
                return template;
            },

            /**
             * 格式化单元格内容为Vue组件
             * @param {VNode} vnode   sf-table-column列vnode配置
             * @param {Object} record 行record
             * @param {Array} data    record列表
             * @param {Number} row    第几行
             * @param {Number} col    第几列
             * @return {VNode}        生成vnode
             * @private
             */
            _rendererComponent (vnode, record, data, row, col) {
                let useVue = vnode.componentOptions.propsData.useVue;
                if (useVue) {
                    let html = this._rendererHTML(vnode, record, data, row, col);

                    // 下面这块以后要改
                    if (typeof html === 'string') {
                        html = {
                            el: document.createElement('div'),
                            template: html,
                            data: record
                        };
                    }

                    // 必须要添加el
                    html.el = html.el || document.createElement('div');
                    let component = new Vue(html);
                    let node = component._render();

                    // 如果vnode是静态的，即仅仅是原生的div span等，vnode.patchVnode判断vnode时会认为是一样的，导致未更新
                    // 这里强制改下key为不同
                    if (node.isStatic && node.isCloned) {
                        node.key = uuid('vnode');
                    }

//                let node = Vue.compile(template).render.call(record, this._h);

                    component.$destroy();
                    component = null;
                    return node;
                }
            },

            /* eslint-disable sfchecklist/max-coupling */
            /**
             * 点击单元格时触发函数
             * @param {VNode} vnode   列vnode
             * @param {Object} record 行record
             * @param {Array} data    record列表
             * @param {Number} row    第几行
             * @param {Number} col    第几列
             * @return {Function} 单元格点击触发函数
             * @private
             */
            _onClick (vnode, record, data, row, col) {
                let clickEvent = vnode.componentOptions.listeners && vnode.componentOptions.listeners.click;
                let me = this;
                return function (event) {
                    me.fireEvent('cellclick', record, event, row, col);
                    if (!clickEvent || !clickEvent.fn) {
                        return;
                    }
                    return clickEvent.fn(record, event, row, col);
                };
            },

            /* eslint-enable sfchecklist/max-coupling */

            /**
             * 勾选行时同步绑定到record
             * @param {Boolean} checked 勾选状态
             */
            syncCheck (checked) {
                this.record.selected = checked;

//                this._selectionChange();
            },

            /**
             * 勾选时触发selectionchange事件
             * @param {Event} event event
             * @private
             */
            _selectionChange (event) {
                this.fireEvent('selectionchange', this, [this.record], event);
            },

            /**
             * 点击表格行触发
             * @param {Event} event 点击事件
             */
            onRowClick (event) {
                let me = this;
                let target = event.target;
                this.fireEvent('rowclick', this.record, event, this.row);
                if (!me.options.selectionMode || !this.record.selectAble) {
                    return;
                }
                if (me.$refs.checkbox && me.$refs.checkbox.$el.contains(target)) {
                    return;
                }
                if (this.fireEvent('beforeselect', this, [this.record], event) === false) {
                    return;
                }
                switch (me.options.selectionMode) {
                    case 'single':
                        me._unselectAll();
                        this.record.selected = true;
                        break;

                    default:
                        this.record.selected = !this.record.selected;
                }
                this._selectionChange(event);
            },

            /**
             * 反选所有record
             * @private
             */
            _unselectAll () {
                this.options.data.forEach(record => record.selected = false);
            }
        }
    };
</script>
