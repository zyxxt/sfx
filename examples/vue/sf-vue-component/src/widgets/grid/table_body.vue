
<script>
    /**
     * Created by ued on 2016/11/29.
     */

    import Event from './event';
    export default {

        render (h) {
            let me = this;
            return (
                <sf-scrollbar autoHeight={ me.options.autoHeight }
                              ref="scrollbar"
                              onScrollLeft={ me.onScrollLeft }
                              onScrollTop={ me.onScrollTop }>
                    <div class="table-body-view"
                         style={{ height: me.options.bufferView ? `${me.options.data.length * me.options.rowHeight}px` : 'auto' }}>

                        <table class="table-body-inner"
                               style={{ top: me.options.bufferView ? `${me.scroll.top}px` : '0' }}>
                            <tbody>
                            {
                                this._l(me.options.data, (record, row) => {
                                    if (me.options.pagination) {
                                        if (row < (me.options.pagination.activePage - 1) * me.options.pagination.pageSize ||
                                            row >= me.options.pagination.activePage * me.options.pagination.pageSize) {

                                            return '';
                                        }
                                    }
                                    if (me.options.bufferView) {
                                        if (row < me.bufferOption.start || row >= me.bufferOption.start + me.bufferOption.pageSize) {
                                            return '';
                                        }
                                    }
                                    return (
                                        <sf-table-row options={ me.options }
                                                      columns={ me.columns }
                                                      record={ record }
                                                      row={ row }
                                                      onEvent={me._onEvent} >
                                        </sf-table-row>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </sf-scrollbar>
            );
        },

        props: {
            options: {
                type: Object
            },

            // 这里配合table使用，columns是vnode列表
            columns: {
                type: Array
            }
        },

        mixins: [
            Event
        ],

        data () {
            return {

                // 滚动条位置
                scroll: {
                    left: 0,
                    top: 0
                },

                // bufferView 配置
                bufferOption: {
                    start: 0,
                    pageSize: 0
                }
            };
        },

        created () {
            let me = this;

            // 父窗口显示隐藏有变化时，需要重新计算表格宽度
            this.$on('parentvisibilitychange', function (component) {
                if (!component.hidden) {
                    me.bufferOption.pageSize = me._getViewPageSize();
                }
            });
        },

        mounted () {
            this.bufferOption.pageSize = this._getViewPageSize();
        },

        methods: {

            /**
             * 同步更新滚动条位置
             * @public
             */
            syncScrollbar () {
                if (this.$refs.scrollbar) {
                    this.$refs.scrollbar.sync();
                }
            },

            /**
             * 滚动横向滚动条触发
             * @param {Number} left 滚动条位置
             */
            onScrollLeft (left) {
                this.scroll.left = left;
                this.fireEvent('scroll', this.scroll);
            },

            /**
             * 滚动纵向滚动条触发
             * @param {Number} top 滚动条位置
             */
            onScrollTop (top) {
                this.scroll.top = top;
                if (this.options.bufferView) {
                    this.bufferOption.start = Math.ceil(top / this.options.rowHeight);
                }

                this.fireEvent('scroll', this.scroll);
            },

            /**
             * 代理内部事件，在这里统一分发
             * @param {String} eventName 事件名称
             * @param {Array} args       参数列表
             * @return {VueComponent}    this
             * @private
             */
            _onEvent (eventName, ...args) {
                if (eventName === 'selectionchange') {
                    this.$forceUpdate();
                }
                return this.fireEvent(eventName, ...args);
            },

            /**
             * 获取可视区域的实际高度
             * @return {Number} clientHeight
             * @private
             */
            _getViewHeight () {
                return this.$el.clientHeight;
            },

            /**
             * 获取当前页显示的记录条数
             * @return {Number} 记录条数
             * @private
             */
            _getViewPageSize () {
                let rowHeight = this.options.rowHeight;
                let count;
                if (this.options.autoHeight) {
                    count = this.options.data.length;

                    if (this.options.maxHeight) {
                        if (this.options.maxHeight < count * rowHeight) {
                            return Math.ceil(this.options.maxHeight / rowHeight);
                        }
                    }
                    return count;
                }
                return Math.ceil(this._getViewHeight() / rowHeight);
            }
        }
    };
</script>
