<script>
    /**
     * Created by ued on 2016/12/8.
     */

    import Component from 'src/widgets/component';
    import Table from '../grid/table.vue';
    import CheckState from './check_state';

    import { cascadeTree } from 'src/util/walk';
    import logger from 'src/util/logger';

    const ROW_HEIGHT = 24;
    const SELECTION_WIDTH = 40;

    export default {

        mixins: [
            Component,
            Table
        ],

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

            return (
                <div class={ cls.join(' ') } style={{ width: me.width + 'px', height: me.height + 'px' }}>
                    <div class="table-header" ref="header">
                        <sf-tree-header options={ me.options }
                                         columns={ me._getColumns() }
                                         onEvent={ me._onEvent }
                                         ref="headerBody" >
                            {
                                me.$slots.default
                            }
                        </sf-tree-header>
                    </div>
                    <div class="table-body" ref="body">
                        <sf-tree-body options={ me.options }
                                      columns={ me._getColumns() }
                                      onEvent={ me._onEvent }
                                      ref="tableBody">

                        </sf-tree-body>
                    </div>
                </div>
            );
        },

        methods: {

            /**
             * 根据options源有配置，添加其它默认值字段
             * @override grid/table.vue::_defaultConfig()
             */
            _defaultConfig () {

                // 未配置高度则开启autoHeight
                if (typeof this.height === 'undefined' || this.height === null) {
                    this._setConfigDefaultValue('autoHeight', true);
                }

                // 勾选相关
                this._setConfigDefaultValue('selectionMode', 'single');
                this._setConfigDefaultValue('selectionWidth', SELECTION_WIDTH);

                // 子节点全勾选时，父节点是否自动勾选
                this._setConfigDefaultValue('autoCheckParent', true);

                this._setConfigDefaultValue('selectionHide', true);
                this._defaultBufferConfig();
            },

            /**
             * bufferView时，默认添加行高
             * @override grid/table.vue::_defaultBufferConfig()
             */
            _defaultBufferConfig () {

                // 默认行高，bufferView有效
                this._setConfigDefaultValue('rowHeight', ROW_HEIGHT);
            },

            /**
             * 自动给record添加相应字段，vue才可以双向绑定
             * @params {Array} rs record列表
             * @override grid/table.vue::_fixDataList()
             */
            _fixDataList (rs = this.options.data) {
                this._buildRecordMap(rs);

                if (!Array.isArray(rs)) {
                    return;
                }
                cascadeTree(rs, (record) => {
                    this._setRecordDefaultValue(record, 'selectAble', true);
                    this._setRecordDefaultValue(record, 'selected', false);

                    this._setRecordDefaultValue(record, 'expanded', false);
                    if (this.options.checkAble) {
                        this._setRecordDefaultValue(record, 'checkAble', true);
                        this._setRecordDefaultValue(record, 'checkState', 'checkNone');
                    }
                });
            },

            /**
             * 以record作为key，构造一个map，会保存record的一些上下文件信息，比如parents
             * @param {Array} rs record列表
             * @private
             */
            _buildRecordMap (rs) {
                this._recordOptionsMap = new Map();
                cascadeTree(rs, (record, index, rs, parents) => {
                    this._recordOptionsMap.set(record, {
                        parents: parents,
                        checkStateIns: new CheckState({
                            record: record,
                            parents: parents,
                            options: this.options
                        })
                    });
                });
            },

            /**
             * 获取树已选列表
             * @return {Array} record 列表
             * @override grid/table.vue::getSelections()
             */
            getSelections () {
                let ret = [];
                cascadeTree(this.getAllData(), function (record) {
                    if (record.selected) {
                        ret.push(record);
                    }
                });
                return ret;
            },

            /**
             * 设置树已经选列表
             * @param {Array} rs record 列表
             * @override grid/table.vue::setSelections()
             */
            setSelections (rs) {
                if (!rs) {
                    return;
                }
                if (!Array.isArray(rs)) {
                    rs = [rs];
                }
                cascadeTree(this.getAllData(), function (record) {
                    if (rs.indexOf(record) !== -1) {
                        record.selected = true;
                    } else {
                        record.selected = false;
                    }
                });
                this.fireEvent('selectionchange', this, rs);
            },

            /**
             * 获取树已经勾选的列表
             * @return {Array}
             * @public
             */
            getChecked () {
                let ret = [];
                cascadeTree(this.getAllData(), function (record) {
                    if (record.checkState === CheckState.CHECK_ALL) {
                        ret.push(record);

                        // 所属子节点不处理
                        return false;
                    }
                });
                return ret;
            },

            /**
             * 设置树的勾选状态
             * @param {Array} rs             需要勾选的record列表
             * @param {Boolean} clear        是否清空原来的勾选项，默认为true
             * @param {Boolean} suspendEvent 是否触发checkchange事件
             * @public
             */
            setChecked (rs, clear = true, suspendEvent) {
                if (clear) {
                    this.clearChecked();
                }
                if (!Array.isArray(rs)) {
                    rs = [rs];
                }
                rs.forEach(record => this.checkRecord(record, suspendEvent));
            },

            /**
             * 清空所有勾选项
             * @public
             */
            clearChecked () {
                cascadeTree(this.getAllData(), function (record) {
                    record.checkState = CheckState.CHECK_NONE;
                });
            },

            /**
             * 勾选某一record
             * @param {Object} record        只支持单项勾选
             * @param {Boolean} suspendEvent 是否触发checkchange事件
             * @return {Boolean}             是否成功
             * @public
             */
            checkRecord (record, suspendEvent) {
                return this._setRecordState(record, CheckState.CHECK_ALL, suspendEvent);
            },

            /**
             * 去除勾选某一record
             * @param {Object} record        只支持单项勾选
             * @param {Boolean} suspendEvent 是否触发checkchange事件
             * @return {Boolean}             是否成功
             * @public
             */
            uncheckRecord (record, suspendEvent) {
                return this._setRecordState(record, CheckState.CHECK_NONE, suspendEvent);
            },

            /**
             * 对某一record设置勾选状态
             * @param {Object} record        只支持单项勾选
             * @param {String} checkState    支持 CHECK_ALL | CHECK_NONE
             * @param {Boolean} suspendEvent 是否触发checkchange事件
             * @return {Boolean}             是否成功
             * @private
             */
            _setRecordState (record, checkState, suspendEvent = false) {
                let recordOptions = this._recordOptionsMap.get(record);
                if (!recordOptions) {
                    logger.warn('[treeTable]::_setRecordState() record not found', record);
                    return false;
                }
                record.checkState = checkState;
                recordOptions.checkStateIns.syncNodeCheckState();

                if (suspendEvent) {
                    this.fireEvent('checkchange', this, [record]);
                }
                return true;
            }
        }
    };
</script>
