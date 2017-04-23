<script>
    /**
     * 表格
     */

    import Component from 'src/widgets/component';

    import { getStyle } from 'wind-dom';
    import './table.css';
    import logger from 'src/util/logger';
    import { compare as localCompare } from 'src/util/sort';

    // 勾选列默认宽度
    const SELECTION_WIDTH = 40;

    // 对于没有配置宽度的列，都按50%配置
    const NONE_DEFAULT_WIDTH = 0.5;

    // 启用bufferView时，默认行高
    const ROW_HEIGHT = 46;

    export default {

        render (h) {
            let me = this;
            let cls = [ 'table' ];

            if (me.options.forceFit) {
                cls.push('table-fit');
            }
            if (me.options.headerHide) {
                cls.push('table-header-hide');
            }
            if (me.options.bufferView) {
                cls.push('table-buffer-view');
            }
            if (me.options.autoWidth) {
                cls.push('table-auto-width');
            }
            if (me.options.pagination) {
                cls.push('table-with-pagination');
            }
            return (
                <div class={ cls.join(' ') } style={{ width: me.width + 'px', height: me.height + 'px' }}>
                    <div class="table-header" ref="header">
                        <sf-table-header options={ me.options }
                                         columns={ me._getColumns() }
                                         onEvent={ me._onEvent }
                                         ref="headerBody" >
                        {
                            me.$slots.default
                        }
                        </sf-table-header>
                    </div>
                    {
                        me.$slots.tip
                    }
                    <div class="table-body" ref="body">
                        <sf-table-body options={ me.options }
                                       columns={ me._getColumns() }
                                       onEvent={ me._onEvent }
                                       ref="tableBody">

                        </sf-table-body>
                    </div>
                    {
                        me.options.pagination ? (
                            <sf-paging-bar options={ me.options.pagination }
                                           ref="pagination"
                                           onPagechange={ me._onPageChange }></sf-paging-bar>
                        ) : ''
                    }
                </div>
            );
        },

        mixins: [
            Component
        ],

        props: {
            options: {
                type: Object,
                'default': function () {
                    return {
                        data: []
                    };
                }
            }
        },

        data () {
            return {

                // 表格列宽是否已经重新计算过，第一次加载数据必须要等到fixcolumn时才可以
                hasFixColumn: false
            };
        },

        created () {
            let me = this;

            // options字段加上默认值
            this._defaultConfig();
            this._fixDataList();

            // 如果有配置data
            this._tableData = this.options.data;
            this.options.data = [];

            // 父窗口显示隐藏有变化时，需要重新计算表格宽度
            this.$on('parentvisibilitychange', function (component) {
                if (!component.hidden) {
                    if (!me.hasFixColumn) {
                        me._fixColumns();
                    }
                    me._loadTempData();
                    me.getBody().syncScrollbar();
                }
            });

            // 如果外部直接修改options.data，仍然需要走loadData流程
            this.$watch('options.data', (rs) => {
                this._loadData(rs);
            });
        },

        mounted () {

            // 重新计算列宽度，满足autoFit等
            this._fixColumns();

            // 成功后，加载临时数据
            if (this.hasFixColumn) {
                this._loadTempData();
            }
        },

        methods: {

            /**
             * 获取 sf-table-header
             * @return {VueComponent} sf-table-header
             */
            getHeader () {
                return this.$refs.headerBody;
            },

            /**
             * 获取 sf-table-body
             * @return {VueComponent} sf-table-body
             */
            getBody () {
                return this.$refs.tableBody;
            },

            /**
             * 获取 sf-paging-bar
             * @return {VueComponent} sf-paging-bar
             */
            getPagination () {
                return this.$refs.pagination;
            },

            /**
             * 当数据变化时，需要同步更新分页栏状态
             */
            syncPagination () {
                if (!this.options.pagination) {
                    return;
                }
                this.options.pagination.total = this.options.pagination.total || this.options.data.length || 0;
                let pagination = this.getPagination();
                let pageData = pagination.getPageData();
                if (pageData.totalPage < pageData.activePage) {
                    pagination.moveLast();
                }

                pagination.sync();
            },

            /**
             * 最开始如果配置了options.data，在先把data清空，等到mounted的时候重新赋值
             * @private
             */
            _loadTempData () {
                let me = this;
                if (me._tableData) {
                    me.loadData(me._tableData);
                    me._tableData = null;
                }
            },

            /**
             * 加载表格数据，会自动保留表格原来的过滤状态
             * @param {Array} data 表格数据
             * @public
             */
            loadData (data) {
                if (this._isFilterView) {
                    delete this._filterOriData;
                }
                this._loadData(data);
                if (this._isFilterView && typeof this._filterViewFn === 'function') {
                    this.filterBy(this._filterViewFn);
                }
            },

            /**
             * 加载表格数据
             * @param {Array} data 表格数据
             * @private
             */
            _loadData (data) {
                this._fixDataList(data);
                this.$emit('beforeload', this, data);
                if (this.isVisibility()) {
                    this.options.data = data;
                    this.syncPagination();
                    if (this.$refs.tableBody) {
                        this.$refs.tableBody.$forceUpdate();
                    }

                    this.$nextTick(() => {
                        this.getBody().syncScrollbar();
                        this.$emit('load', this, data);
                    });

                } else {
                    this._tableData = data;
                }
            },

            /**
             * 获取表格的原始数据
             * @return {Array} record列表
             * @public
             */
            getAllData () {
                let ret = this.options.data;
                if (this._isFilterView && this._filterOriData) {
                    ret = this._filterOriData;
                }
                if ((!ret || !ret.length) && this._tableData && this._tableData.length) {
                    ret = this._tableData;
                }
                return ret;
            },

            /**
             * 返回已经选中的行
             * @return {Array} record列表
             * @public
             */
            getSelections () {
                return this.getAllData().filter(record => record.selected);
            },

            /**
             * 勾选表格行
             * @param {Array} rs record列表
             * @public
             */
            setSelections (rs) {
                if (!rs) {
                    return;
                }
                if (!Array.isArray(rs)) {
                    rs = [rs];
                }
                this.getAllData().forEach((record) => {
                    if (rs.indexOf(record) !== -1) {
                        record.selected = true;
                    } else {
                        record.selected = false;
                    }
                });
                this.fireEvent('selectionchange', this, rs);
            },

            /**
             * 过滤
             * @param {Function} fn 过滤函数
             * @public
             */
            filterBy (fn) {
                if (!this._filterOriData) {
                    this._filterOriData = this.options.data;
                }
                this._isFilterView = true;
                this._filterViewFn = fn;
                let data = this._filterOriData.filter(record => fn.call(this, record));
                this._loadData(data);
            },

            /**
             * 清除过滤状态
             * @public
             */
            clearFilter () {
                if (this._isFilterView && this._filterOriData) {
                    this._loadData(this._filterOriData);

                    delete this._filterOriData;
                    delete this._filterView;
                    delete this._filterViewFn;
                }
            },

            /**
             * 重新自适应表格列宽度
             * @public
             */
            fixColumns () {
                this._fixColumns();
            },

            /**
             * 自适应列宽度，支持实际宽度、百分比
             * @private
             */
            _fixColumns () {
                let totalWidth;
                if (!this.$el) {
                    return;
                }
                if (this.options.autoFit === false) {
                    this.hasFixColumn = true;
                    return;
                }
                totalWidth = this._getTotalWidth();

                // 表格未正常显示
                if (!totalWidth) {
                    return;
                }

                this.hasFixColumn = true;

                // 是否存在某列的宽度小于1，则用百分比的形式
                let lessOne = false;
                let lessOneList = [];

                // 没有配置宽度，则平均剩下的空间
                let noneConfig = false;
                let noneConfigList = [];

                // 已经配置的固定宽度
                let fixedWidth = 0;

                this.getHeader().$children.forEach(function (columnComponent, index) {
                    if (typeof columnComponent.width === 'undefined') {
                        noneConfig = true;
                        noneConfigList.push({ index });
                    } else if (columnComponent.width <= 1) {
                        lessOne = true;
                        lessOneList.push({ index, width: columnComponent.width });
                    } else {
                        fixedWidth += columnComponent.width;
                    }
                });

                if (fixedWidth >= totalWidth) {
                    if (lessOne || noneConfig) {

                        // 配置了固定列的总宽度已经超过表格的宽度，已经无法给自定义列腾出空间了
                        logger.error(`there is not enough width. totalWidth:${totalWidth}, but required: ${fixedWidth}`);
                    } else {
                        if (this.options.forceFit) {

                            // 强制自适应，按比例把配置的宽度变小到刚好适配
                            this.getHeader().$children.forEach((columnComponent) => {
                                columnComponent.width = Math.floor(columnComponent.width * totalWidth /
                                    (fixedWidth - (!this.options.selectionHide ? this.options.selectionWidth : 0)));
                            });
                        }
                    }
                    return;
                }

                // 剩下的宽度等比平分 <=1 的列
                totalWidth -= fixedWidth;

                let allPercent = lessOneList.reduce((prev, item) => {
                    return prev + item.width;
                }, 0);
                allPercent = noneConfigList.reduce((prev, item) => {
                    item.width = NONE_DEFAULT_WIDTH;
                    return prev + item.width;
                }, allPercent);
                lessOneList.concat(noneConfigList).forEach((item) => {
                    this.getHeader().$children[item.index].width = Math.floor(totalWidth * item.width / allPercent);
                });

            },

            /**
             * 自动给record添加相应字段，vue才可以双向绑定
             * @param {Array} rs record列表
             * @private
             */
            _fixDataList (rs = this.options.data) {
                if (!Array.isArray(rs)) {
                    return;
                }
                rs.forEach((record) => {
                    this._setRecordDefaultValue(record, 'selectAble', true);
                    this._setRecordDefaultValue(record, 'selected', false);
                });
            },

            /**
             * record添加默认值
             * @param {Object} record  每条记录
             * @param {String} key     字段名称
             * @param {*} defaultValue 默认值
             * @private
             */
            _setRecordDefaultValue (record, key, defaultValue) {
                if (typeof record[key] === 'undefined') {

//                    record[key] = defaultValue;
                    this.$set(record, key, defaultValue);
                }
            },

            /**
             * options添加默认值
             * @param {String} key     字段名称
             * @param {*} defaultValue 默认值
             * @private
             */
            _setConfigDefaultValue (key, defaultValue) {
                if (typeof this.options[key] === 'undefined') {

//                    this.options[key] = defaultValue;
                    this.$set(this.options, key, defaultValue);
                }
            },

            /**
             * 根据options源有配置，添加其它默认值字段
             * @private
             */
            _defaultConfig () {

                // 未配置高度则开启autoHeight
                if (typeof this.height === 'undefined' || this.height === null) {
                    this._setConfigDefaultValue('autoHeight', true);
                }

                // 勾选相关
                this._setConfigDefaultValue('selectionMode', 'single');
                this._setConfigDefaultValue('selectionWidth', SELECTION_WIDTH);


                this._defaultBufferConfig();
            },

            /**
             * bufferView时，默认添加行高
             * @private
             */
            _defaultBufferConfig () {

                // 默认行高，bufferView有效
                this._setConfigDefaultValue('rowHeight', ROW_HEIGHT);
            },

            /**
             * 获取表格内容的真实宽度
             * @return {number} 表格实现宽度
             * @private
             */
            _getTotalWidth () {

                let width = this.$el.offsetWidth;
                let borderLeft = getStyle(this.$el, 'border-left-width');
                let borderRight = getStyle(this.$el, 'border-right-width');

                let px2int = function (px) {

                    // 不管小数
                    return parseInt(px, 10);
                };

                return Math.max(0, px2int(width) - px2int(borderLeft) - px2int(borderRight));
            },

            /**
             * 获取表格的列配置
             * @return {Array} sf-table-column VNode列表
             * @private
             */
            _getColumns () {
                let header = this.getHeader();
                if (!header) {
                    return this.$slots.default;
                }
                let columns = header.$children.map(child => child.$vnode);
                if (!this.options.selectionHide) {
                    columns.shift();
                }
                return columns;
            },

            /**
             * 表格内容滚动时，同步更新滚动表格头部
             * @param {Object} scroll 滚动条位置信息 {left: num, top: num}
             * @private
             */
            _onScroll (scroll) {
                if (this.options.headerHide) {
                    return;
                }
                let headerBodyEl = this.$refs.headerBody;
                headerBodyEl.$el.style.left = `-${scroll.left}px`;
            },

            /**
             * 对表格进行排序
             * @param {String|Function} dataIndex 根据此字段排序，也可以是一个函数 function (record1, record2, direction) {}
             * @param {String} direction 当dataIndex为String时生效，ASC || DESC
             * @public
             */
            sortBy (dataIndex, direction) {
                let sortFn = this._getSortFn(dataIndex, direction);
                this.getAllData().sort(sortFn);
            },

            /**
             * 生成排序参数，提供给Array.sort使用
             * @param {String|Function} dataIndex 根据此字段排序，也可以是一个函数 function (record1, record2, direction) {}
             * @param {String} direction 当dataIndex为String时生效，ASC || DESC
             * @return {Function} sortFn
             * @private
             */
            _getSortFn (dataIndex, direction) {
                let sortFn;
                if (typeof dataIndex === 'function') {
                    sortFn = dataIndex;
                } else {
                    sortFn = function (record0, record1, direction) {
                        if (direction === 'ASC') {
                            return localCompare(record0[dataIndex], record1[dataIndex]);
                        }
                        return localCompare(record1[dataIndex], record0[dataIndex]);
                    };
                }
                return function (record0, record1) {
                    return sortFn(record0, record1, direction);
                };
            },

            /**
             * 点击表格头部排序
             * @param {VueComponent} cur sf-table-column组件
             * @param {String} direction ASC || DESC
             * @private
             */
            _onSort (cur, direction) {
                let header = this.getHeader();
                header.$children.forEach(column => {
                    if (cur !== column) {
                        column.resetDirection();
                    }
                });
                if (cur.sortFn) {
                    this.sortBy(cur.sortFn);
                } else {
                    this.sortBy(cur.dataIndex, direction);
                }
            },

            /**
             * 翻页时触发
             * @param {Array} args    参数列表: activePage, oldPage, Pagination组件
             * @return {VueComponent} this
             * @private
             */
            _onPageChange (...args) {
                return this.fireEvent('pagechange', ...args);
            },

            /**
             * 代理表格内部所有事件，在这里统一分发
             * @param {String} eventName 事件名称
             * @param {Array} args       参数列表
             * @return {VueComponent}    this
             * @private
             */
            _onEvent (eventName, ...args) {
                if (eventName === 'scroll') {
                    this._onScroll(args[0]);
                }
                if (eventName === 'sort') {
                    this._onSort(...args);
                }
                return this.fireEvent(eventName, ...args);
            },

            /**
             * 分发事件
             * @param {String} eventName 事件名称
             * @param {Array} args       参数列表
             * @return {VueComponent}    this
             */
            fireEvent (eventName, ...args) {
                logger.log(`[table] emit event: ${eventName}`, ...args);
                return this.$emit(eventName, ...args);
            }
        }
    };
</script>
