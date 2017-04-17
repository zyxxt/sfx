
<template>
    <td class="table-cell tree-cell ellipsis"
        :class="cls"
        :id="id"
        :style="{ width: width + 'px',height: height + 'px' }"
        v-show="!hidden"
        :disabled="disabled"
        @click="toggle">

        <span class="tree-placeholder"
              :class="holderClass(parent, index)"
              v-for="(parent, index) in parents"></span>

        <sf-checkbox class="tree-checkbox"
                     v-if="record.checkAble"
                     v-model="record.checkState"
                     :checkPart="true"
                     @change="onCheckChange"></sf-checkbox>

        <i class="tree-icon fa" :class="record.iconCls" v-if="record.iconCls"></i>
        <span class="tree-text" v-html="text" :title="nodeTitle"></span>
    </td>
</template>

<style lang="stylus" scoped>

</style>

<script>
    /**
     * Created by ued on 2016/12/1.
     */

    import TableCell from '../grid/table_cell.vue';
    import { hasClass } from 'wind-dom';
    import CheckState from './check_state';

    const LINE_CLS = {
        '|': 'tree-elbow-line',
        '|-': 'tree-elbow',
        '+|-': 'tree-plus tree-elbow-plus',
        '-|-': 'tree-minus tree-elbow-minus',
        '+L': 'tree-plus tree-elbow-end-plus',
        '-L': 'tree-minus tree-elbow-end-minus',
        'L': 'tree-elbow-end'
    };

    export default {

        mixins: [
            TableCell
        ],

        props: {
            nodeText: String,

            nodeTitle: String,

            record: Object,

            parents: Array,

            options: Object
        },

        computed: {
            text () {
                return this.nodeText;
            }
        },

        created () {

            // 勾选联动统一这里面处理
            this._createStateIns();

            this.$watch('record', this._createStateIns);
            this.$watch('parents', this._createStateIns);
        },

        methods: {

            /**
             * 判断record是否是children的最后一个
             * @param {Array} children 数组列表
             * @param {*} record       元素内容
             * @return {Boolean}       是否最后一个
             * @private
             */
            _isLast (children, record) {
                return children[children.length - 1] === record;
            },

            /**
             * tree节点renderer时，偏移时要显示的占位符类型
             * @param {Object} parent 第几个占位符对应的parent
             * @param {Number} index  占位符一般都是多个，这里指明第几个占位符
             * @param {Array} parents 当前record的parents列表
             * @return {String} 占位符类型
             * @private
             */
            _getHolderType (parent, index, parents) {

                // 文字或者图标前，最近的占位符，这个占位符有: + - L 这几种组合
                if (index === parents.length - 1) {

                    // 是否还有子节点
                    if (this.record.children) {

                        // 是否展开
                        if (this.record.expanded) {
                            return this._isLast(parents[0].children, this.record) ? '-L' : '-|-';
                        }

                        // 收缩
                        return this._isLast(parents[0].children, this.record) ? '+L' : '+|-';
                    }

                    // 没有子节点，判断下是否是最后一个
                    return this._isLast(parents[0].children, this.record) ? 'L' : '|-';
                }
                const REVERSE = 2;
                if (this._isLast(parents[parents.length - index - 1].children, parents[parents.length - index - REVERSE])) {
                    return '';
                }
                return '|';
            },

            /**
             * 获取占位符对应样式
             * @param {Object} parent 第几个占位符对应的parent
             * @param {Number} index  占位符一般都是多个，这里指明第几个占位符
             * @return {String} 占位符css
             */
            holderClass (parent, index) {
                let type = this._getHolderType(parent, index, this.parents);
                return type && LINE_CLS[type] || '';
            },

            /**
             * 展开收缩
             * @param {Event} event 事件
             */
            toggle (event) {
                if (hasClass(event.target, 'tree-elbow-minus') || hasClass(event.target, 'tree-elbow-plus') ||
                        hasClass(event.target, 'tree-elbow-end-minus') || hasClass(event.target, 'tree-elbow-end-plus')) {

                    this.record.expanded = !this.record.expanded;
                    this.fireEvent(this.record.expanded ? 'expand' : 'collapse', this, this.record, this.parents);
                }
            },

            _createStateIns () {
                this.checkStateIns = new CheckState({
                    record: this.record,
                    parents: this.parents,
                    options: this.options
                });
            },

            /**
             * 树勾选时触发，会更新父子节点的勾选状态
             * @param {VueComponent} checkbox sf-checkbox组件
             * @param {Event} event           事件
             */
            onCheckChange (checkbox, event) {
                this.checkStateIns.syncNodeCheckState();
                this.fireEvent('checkchange', this, [this.record], event);
            }
        }
    };
</script>
