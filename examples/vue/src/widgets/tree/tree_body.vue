
<script>
    /**
     * Created by ued on 2016/12/1.
     */

    import TableBody from '../grid/table_body.vue';
    import { cascadeTree } from 'src/util/walk';

    export default {

        mixins: [
            TableBody
        ],

        render (h) {
            let me = this;
            let rowList = [];
            let parentList = [{
                __type: 'root',
                expanded: true,
                children: me.options.data
            }];

            let getRowConfig = function (data) {
                me._l(data, function (record) {
                    if (record.hidden) {
                        return;
                    }

                    let parents = parentList.slice();
                    let node = {
                        options: me.options,
                        columns: me.columns,
                        record: record,
                        parents: parents
                    };
                    rowList.push(node);
                    if (Array.isArray(record.children) && record.children.length && record.expanded) {
                        parentList.unshift(record);
                        getRowConfig(record.children);
                        parentList.shift();
                    }
                });
                return rowList;
            };
            let renderTreeRow = function (data) {
                let configList = getRowConfig(data);
                let vnodeList = [];
                configList.forEach(function (node, curIndex) {
                    if (me.options.bufferView) {
                        if (curIndex < me.bufferOption.start || curIndex >= me.bufferOption.start + me.bufferOption.pageSize) {
                            return '';
                        }
                    }
                    let vnode = (
                        <sf-tree-row options={ node.options }
                                     columns={ node.columns }
                                     record={ node.record }
                                     parents={ node.parents }
                                     row={ curIndex }
                                     onEvent={me._onEvent} >
                        </sf-tree-row>
                     );
                    vnodeList.push(vnode);
                });
                return vnodeList;
            };

            return (
                <sf-scrollbar autoHeight={ me.options.autoHeight }
                              ref="scrollbar"
                              onScrollLeft={ me.onScrollLeft }
                              onScrollTop={ me.onScrollTop }>
                    <div class="table-body-view"
                         style={{ height: me.options.bufferView ? `${me._getTreeCount() * me.options.rowHeight}px` : 'auto' }}
                         ref="bodyView">

                        <table class="table-body-inner tree-body-inner"
                               style={{ top: me.options.bufferView ? `${me.scroll.top}px` : '0' }}>
                            <tbody>
                                {
                                    renderTreeRow(me.options.data)
                                }
                            </tbody>
                        </table>
                    </div>
                </sf-scrollbar>
            );
        },

        methods: {

            /**
             * 树所有的事件代理，触发前会执行
             * @param {String} eventName 事件名称
             * @override gird/event.js::fireEvent()
             */
            beforeEvent (eventName) {

                // 树展开收缩时，需要重新计算树的高度并更新滚动条
                if (eventName === 'expand' || eventName === 'collapse') {
                    if (this.options.bufferView) {
                        let bodyView = this.$refs.bodyView;
                        if (bodyView) {
                            bodyView.style.height = `${this._getTreeCount() * this.options.rowHeight}px`;
                        }
                    }
                    this.updateScrollbar();
                }
            },

            /**
             * 获取当前树状态需要占用的行数
             * @return {Number} 行数
             * @private
             */
            _getTreeCount () {
                let count = 0;
                cascadeTree(this.options.data, (node) => {
                    if (node.hidden) {
                        return false;
                    }
                    count++;
                    if (!node.expanded) {
                        return false;
                    }
                });
                return count;
            },

            /**
             * 更新滚动条位置
             */
            updateScrollbar () {
                let me = this;
                this.$nextTick(function () {
                    me.$refs.scrollbar.sync();
                });

            }
        }
    };
</script>
