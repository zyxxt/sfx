<template>
    <div class="textfield select-tree"
         :class="cls"
         :id="id"
         :style="{ width:width + 'px', height: height + 'px' }"
         trigger-type="select"
         ref="selectTree"
         v-show="!hidden" >

        <input class="textfield-input ellipsis"
               :class="invalidClass"
               :placeholder="placeholder"
               :disabled="disabled"
               :readonly="readonly"
               ref="input"
               v-model="inputText"
               :qcls="invalidType"
               :qanchor="invalidPosition"
               v-qtip="invalidText"
               :title="inputText"
        />
        <button class="textfield-trigger" type="button" @click="onTrigger">
            <i class="fa fa-angle-down"></i>
        </button>
        <sf-layer class="select-tree-layer"
                  default-target="selectTree"
                  :autoScrollbar="false"
                  :default-width="width"
                  ref="layer">

            <slot ref="tree"></slot>
        </sf-layer>
    </div>
</template>

<style lang="stylus">
    .select-tree-layer
        background: #fff;
        color: #000;
        padding: 0;
        .table
            border: none
</style>

<script>
    /**
     * Created by ued on 2016/12/21.
     */

    import Textfield from '../textfield/textfield.vue';
    import logger from 'src/util/logger';
    import { cascadeTree } from 'src/util/walk';
    import { hasClass } from 'wind-dom';

    export default {

        mixins: [
            Textfield
        ],

        props: {
            defaultWidth: { type: Number, 'default': 200 },
            defaultReadonly: { type: Boolean, 'default': true },
            placeholder: { type: String, 'default': _('请选择') },
            actionName: { type: String },

            // 是否启用多选，如果是多选，则还需要tree.options.checkAble = true;启用树的三态勾选
            multi: { type: Boolean, 'default': false },

            // onInput前勾子
            beforeOnInput: { type: Function },

            // 默认选中第一项
            autoSelectFirst: { type: Boolean, 'default': false }
        },

        data () {
            return {
                inputText: ''
            };
        },

        mounted () {
            let tree = this.getTree();
            if (!tree) {
                return;
            }
            this.syncText();
            tree.$on('selectionchange', this._onSelect);
            tree.$on('beforeload', this._onTreeBeforeLoad);

            this._autoSelectFirst();
        },

        methods: {

            /**
             * trigger点击事件
             * @param {Event} event 事件
             */
            onTrigger (event) {
                let value = this.getJsonValue();
                logger.log('[select tree] trigger: ', this.$refs.layer.hidden ? 'expand' : 'collapse');
                this.$emit('trigger', value, event);
            },

            /**
             * 展开收缩下拉树
             * @public
             */
            toggle () {
                if (this.$refs.layer.hidden) {
                    this.expand();
                } else {
                    this.collapse();
                }
            },

            /**
             * 收缩下拉树
             * @public
             */
            collapse () {
                this.$refs.layer.hidden = true;
            },

            /**
             * 展开下拉树
             * @public
             */
            expand () {
                this.$refs.layer.hidden = false;
            },

            /**
             * 获取layer实例
             * @return {VueComponent} layer实例
             */
            getLayer () {
                return this.$refs.layer;
            },

            /**
             * 获取树实例
             * @return {VueComponent} 树实例
             */
            getTree () {
                return this.getLayer() && this.getLayer().$children[0];
            },

            /**
             * 返回sf-tree-column的propsData
             * @return {Object} propsData
             */
            _getTreeColumnProps () {
                let tree = this.getTree();
                if (!tree) {
                    return;
                }
                let treeColumn = tree.$slots.default[0];
                return treeColumn.componentOptions.propsData;
            },

            /**
             * 获取已选的record
             * @return {Array} rs
             */
            getSelected () {
                if (this.multi) {
                    return this.getTree().getChecked();
                }
                return this.getTree().getSelections();
            },

            /**
             * 根据this.value，获取文本框需要显示的文件内容，会自动跟sf-tree-column::renderer保持一致
             * @return {String} 文本框显示的文本
             */
            getDisplayText () {
                let ret = [];
                let treeData = this._getTreeData();
                let propsData = this._getTreeColumnProps();

                if (!propsData) {
                    return;
                }
                if (!this._recordMap) {
                    this._buildRecordMap(treeData);
                }

                let value = this.value;
                if (!this.multi) {
                    value = [this.value];
                }
                value.forEach(v => {
                    let recordConfig = this._recordMap.get(v);
                    if (!recordConfig) {
                        return;
                    }
                    if (typeof propsData.renderer === 'function') {
                        ret.push(propsData.renderer(
                            v,
                            recordConfig.record,
                            treeData,
                            recordConfig.index,
                            0
                        ));
                    } else {
                        ret.push(v);
                    }
                });

                return ret.join(_('，'));

            },

            /**
             * 获取树的所有rs
             * @return {Array} rs
             */
            _getTreeData () {
                let tree = this.getTree();
                if (!tree) {
                    return;
                }
                return tree.getAllData();
            },

            /**
             * 配合v-model，实现双向数据绑定，对外只提供id，不会返回整个record
             */
            syncData () {
                let propsData = this._getTreeColumnProps();
                let layer = this.getLayer();
                let data = this.getSelected();

                if (!propsData || !layer) {
                    return;
                }

                // 提供给外部，比如：外部需要的数据格式是所有叶子节点
                if (typeof this.beforeOnInput === 'function') {
                    data = this.beforeOnInput(data);
                }

                if (this.multi) {
                    this.onInput(data.map(record => record[propsData.dataIndex]));
                    return;
                }

                this.onInput(data[0] ? data[0][propsData.dataIndex] : null);
            },

            /**
             * 选中树节点时触发，会更新v-model并抛出事件供外部处理
             * @param {VueComponent} treeRow 当前行
             * @param {Array} rs             record列表
             * @param {Event} event          点击事件
             * @private
             */
            _onSelect (treeRow, rs, event) {
                let propsData = this._getTreeColumnProps();
                let layer = this.getLayer();
                if (!propsData || !layer) {
                    return;
                }

                let selectRecord = this.getSelected();
                let old = this.value;

                this.syncData();
                this.$nextTick(() => {
                    this.syncText();
                    if (!this.multi &&
                        !hasClass(event.target, 'tree-minus') &&
                        !hasClass(event.target, 'tree-plus') &&
                        !hasClass(event.target, 'checkbox-wrap')) {

                        layer.hidden = true;
                    }
                });

                let fireEvent = (selectValue, old) => {
                    if (this.actionName) {
                        this.$emit('action', selectValue, event, rs);
                    }

                    this.$emit('change', selectValue, old, event, rs);
                };
                if (this.multi) {
                    if (hasClass(event.target, 'tree-checkbox') || hasClass(event.target, 'checkbox-wrap')) {
                        fireEvent(selectRecord.map(record => record[propsData.dataIndex]), old);
                    }
                } else {
                    fireEvent(selectRecord[0] ? selectRecord[0][propsData.dataIndex] : null, old);
                }
            },

            _autoSelectFirst () {
                if (!this.autoSelectFirst || this.multi) {
                    return;
                }
                if (typeof this.value !== 'undefined' && this.value !== null) {
                    return;
                }
                let treeData = this._getTreeData();
                if (treeData && treeData.length) {
                    treeData[0].selected = true;
                    this.syncData();
                }
            },

            /**
             * 更新文本框显示文字
             */
            syncText () {
                this.inputText = this.getDisplayText();
            },

            /**
             * 同步record的勾选状态
             * @param {Array} treeData 树所有rs，即options.data
             */
            syncTreeSelected (treeData = this._getTreeData()) {
                let propsData = this._getTreeColumnProps();
                let tree = this.getTree();

                if (!propsData || !treeData || !treeData.length) {
                    return;
                }

                if (this.multi) {
                    let checked = this.value.map(v => {
                        let recordConfig = this._recordMap.get(v);
                        if (!recordConfig) {
                            return;
                        }
                        return recordConfig.record;
                    }).filter(record => !!record);
                    tree.setChecked(checked);
                } else {
                    cascadeTree(treeData, (node) => {
                        node.selected = node[propsData.dataIndex] === this.value;
                    });
                }
            },

            /**
             * 根据data-index生成map，提升勾选逻辑性能
             * @param {Array} rs record列表
             * @private
             */
            _buildRecordMap (rs) {
                this._recordMap = new Map();
                let propsData = this._getTreeColumnProps();
                if (!propsData) {
                    return;
                }
                let dataIndex = propsData.dataIndex;
                cascadeTree(rs, (record, index, rs, parents) => {
                    this._recordMap.set(record[dataIndex], {
                        record: record,
                        index: index,
                        parents: parents
                    });
                });
            },

            /**
             * 树加载数据时触发，会更新record的勾选状态、更新文本框文字
             * @param {VueComponent} tree 树实例
             * @param {Array} data        树加载的数据
             * @private
             */
            _onTreeBeforeLoad (tree, data) {
                this._buildRecordMap(data);
                this.syncTreeSelected(data);
                this.syncText();

                this._autoSelectFirst();
            }
        },

        watch: {
            value () {
                this.syncTreeSelected();
                this.syncText();
            }
        }
    };
</script>
