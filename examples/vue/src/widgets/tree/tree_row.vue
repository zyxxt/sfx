
<script>
    /**
     * Created by ued on 2016/12/8.
     */

    import Vue from 'vue';
    import TableRow from '../grid/table_row.vue';
    import { cascadeTree } from 'src/util/walk';

    export default {

        mixins: [
            TableRow
        ],

        props: {
            parents: Array
        },

        render (h) {
            let me = this;
            let col = 0;
            const TWO = 2;

            let renderTableCell = function (vnode) {
                if (vnode.data.attrs.useVue) {
                    return (
                        <sf-table-cell defaultWidth={ vnode.child ? vnode.child.width : vnode.componentOptions.propsData.defaultWidth }
                                       cls={ `table-cell-${vnode.componentOptions.propsData.align || 'left'}` }
                                       title={ me._renderTitle(vnode, me.record, me.options.data, me.row, col++) }
                                       parents={ me.parents }
                                       nativeOnClick={ me._onClick(vnode, me.record, me.options.data, me.row, col)} >
                        {
                            me._rendererComponent(vnode, me.record, me.options.data, me.row, col++)
                        }
                        </sf-table-cell>
                    );
                }
                return (
                    <sf-table-cell defaultWidth={ vnode.child ? vnode.child.width : vnode.componentOptions.propsData.defaultWidth }
                                   domPropsInnerHTML={ me._renderer(vnode, me.record, me.options.data, me.row, col++) }
                                   cls={ `table-cell-${vnode.componentOptions.propsData.align || 'left'}` }
                                   title={ me._renderTitle(vnode, me.record, me.options.data, me.row, col++) }
                                   parents={ me.parents }
                                   nativeOnClick={ me._onClick(vnode, me.record, me.options.data, me.row, col - 1)} >
                    </sf-table-cell>
                );
            };

            let renderTreeCell = function (vnode) {
                return (
                    <sf-tree-cell defaultWidth={ vnode.child ? vnode.child.width : vnode.componentOptions.propsData.defaultWidth }
                                  nodeTitle={ me._renderTitle(vnode, me.record, me.options.data, me.row, col++) }
                                  nodeText={ me._renderer(vnode, me.record, me.options.data, me.row, col++) }
                                  cls={ `table-cell-${vnode.componentOptions.propsData.align || 'left'}` }
                                  record={ me.record }
                                  parents={ me.parents }
                                  options={ me.options }
                                  onEvent={ me._onEvent }
                                  nativeOnClick={ me._onClick(vnode, me.record, me.options.data, me.row, col - 1)} >
                    </sf-tree-cell>
                );
            };

            return (
                <tr class={ `table-row tree-row
                        ${me.row % TWO ? 'table-row-even' : 'table-row-odd'}
                        ${me.record.expanded ? 'tree-row-expanded' : ''}
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
                            if ((vnode.child && vnode.child instanceof Vue.component('SfTreeColumn')) ||
                                    (vnode.componentOptions && vnode.componentOptions.tag === 'sf-tree-column')) {

                                return renderTreeCell(vnode);
                            } else if ((vnode.child && vnode.child instanceof Vue.component('SfTableColumn')) ||
                                    (vnode.componentOptions && vnode.componentOptions.tag === 'sf-table-column')) {

                                return renderTableCell(vnode);
                            }
                        })
                    }
                </tr>
            );
        },

        methods: {

            /**
             * 反选所有record
             * @override grid/table_row.vue::_unselectAll()
             */
            _unselectAll () {
                cascadeTree(this.options.data, (record) => {
                    record.selected = false;
                });
            },

            /**
             * 代理树的事件
             * @param {String} eventName 事件名称
             * @param {Array} args       参数列表
             * @private
             */
            _onEvent (eventName, ...args) {
                this.fireEvent(eventName, ...args);
            }
        }
    };
</script>
