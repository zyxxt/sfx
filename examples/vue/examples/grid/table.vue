
<template>
    <div class="table-wrap">
        <sf-tab-panel :activeItem="1">
            <sf-tab-item title="固定大小">
                <sf-grid>
                    <sf-toolbar ref="toolbar">
                        <sf-button class="btn-blank" iconCls="fa-plus-circle" actionName="add">新增</sf-button>
                        <sf-button class="btn-blank" iconCls="fa-remove" actionName="delete">删除</sf-button>
                        <sf-button class="btn-blank" actionName="set">setSelections</sf-button>
                        <sf-button class="btn-blank" actionName="load">加载新数据</sf-button>
                        <sf-button class="btn-blank" actionName="moveNext">下一页</sf-button>
                        <sf-searchfield class="pull-right" actionName="search" v-model="filterValue"></sf-searchfield>
                        <sf-select-tree class="pull-right" actionName="filter">
                            <sf-tree-table ref="selectTree" :options="select_options" :default-height="350">
                                <sf-tree-column data-index="a"></sf-tree-column>
                            </sf-tree-table>
                        </sf-select-tree>
                        <sf-fieldlabel class="pull-right"><lang>过滤</lang></sf-fieldlabel>
                    </sf-toolbar>
                    <sf-table class="test" :options="options_fix" ref="table" :defaultHeight="300" >
                        <template slot="tip" v-if="false">
                            <div style="text-align: center;background:yellow;box-shadow:1px">
                                <sf-fieldlabel :label-width="300" label-align="right">这里还可以插入任何东西，真牛B</sf-fieldlabel>
                                <sf-textfield v-model="tableTip"></sf-textfield>
                            </div>
                        </template>
                        <sf-table-column data-index="a" renderer="renderTime" :useHTML="true" :sortAble="true">标题头1</sf-table-column>
                        <sf-table-column data-index="b" :renderer="renderName" sortAble="ASC">标题头2</sf-table-column>
                        <sf-table-column data-index="c" renderer="renderDesc" :useVue="true" sortAble="DESC">标题头3</sf-table-column>
                    </sf-table>
                </sf-grid>
            </sf-tab-item>
            <sf-tab-item title="分页栏在外面">
                <sf-grid>
                    <sf-table class="test" :options="options_pagination" ref="table" :defaultHeight="300" >
                        <sf-table-column data-index="a" renderer="renderTime" :useHTML="true" :sortAble="true">标题头1</sf-table-column>
                        <sf-table-column data-index="b" :renderer="renderName" sortAble="ASC">标题头2</sf-table-column>
                        <sf-table-column data-index="c" renderer="renderDesc" :useVue="true" sortAble="DESC">标题头3</sf-table-column>
                    </sf-table>
                    <sf-paging-bar :options="paginationOption" :pageSize="50"></sf-paging-bar>
                </sf-grid>
            </sf-tab-item>
        </sf-tab-panel>
        <br>
        <sf-tab-panel>
            <sf-tab-item title="高度自适应">
                <sf-table class="test" :options="options_auto">
                    <sf-table-column data-index="a" :defaultWidth="200" renderer="renderTime" :useHTML="true">标题头1</sf-table-column>
                    <sf-table-column data-index="b" :defaultWidth="200" :renderer="renderName" align="center">标题头2</sf-table-column>
                    <sf-table-column data-index="c" renderer="renderDesc" :useVue="true">标题头3</sf-table-column>
                </sf-table>
            </sf-tab-item>
            <sf-tab-item title="不显示表头">
                <sf-table class="test" :options="options_none_header">
                    <sf-table-column data-index="a" :defaultWidth="100" renderer="renderTime" :useHTML="true">标题头1</sf-table-column>
                    <sf-table-column data-index="b" :defaultWidth="0.5" renderer="renderName" align="center">标题头2</sf-table-column>
                    <sf-table-column data-index="c" :defaultWidth="0.5" renderer="renderDesc" :useVue="true">标题头3</sf-table-column>
                </sf-table>
            </sf-tab-item>
            <sf-tab-item title="BufferView">
                <sf-table class="test" :options="options_buffer_view" :default-height="200">
                    <sf-table-column data-index="a" :defaultWidth="100" renderer="renderTime" :useHTML="true">标题头1</sf-table-column>
                    <sf-table-column data-index="b" :defaultWidth="0.5" renderer="renderName" align="center">标题头2</sf-table-column>
                    <sf-table-column data-index="c" :defaultWidth="0.5" renderer="renderDesc" @click="triggerEvent" :useVue="false">标题头3</sf-table-column>
                </sf-table>
            </sf-tab-item>
            <sf-tab-item title="AutoFit=false">
                <sf-grid>
                    <sf-toolbar>
                        <sf-button @click="showTable" class="btn-blank">显示表格</sf-button>
                        <sf-button @click="modifyTableData" class="btn-blank">直接赋值</sf-button>
                    </sf-toolbar>
                    <wrap v-if="wrapOptions.visibility" :grid-data="wrapOptions.data"></wrap>
                </sf-grid>
            </sf-tab-item>
        </sf-tab-panel>
    </div>
</template>

<style lang="stylus" scoped>
    .table-wrap
        margin-right: 20px;
</style>

<script>
    /**
     * Created by ued on 2016/11/28.
     */

    import logger from 'src/util/logger';
    import Vue from 'vue';
    import GridMgr from './mgr';
    import Wrap from './wrap.vue';

    export default {

        components: {
            Wrap
        },

        data () {
            return {
                filterValue: '',
                tableTip: 'fdsa',
                wrapOptions: {
                    visibility: false,
                    gridOptions: {

                    },
                    data: []
                },

                select_options: {
                    bufferView: true,
                    headerHide: true,
                    autoWidth: true,
                    data: Array.from(Array(2)).map(function (v, i) {
                        return {
                            a: 'a' + i,
                            b: 'b' + i,
                            c: 'c' + i,
                            expanded: true,
                            children: Array.from(Array(10)).map(function (v, i) {
                                return {
                                    a: 'aa' + i,
                                    b: 'bb' + i,
                                    c: 'cc' + i,
                                    expanded: true,
                                    hidden: false,
                                    children: Array.from(Array(10)).map(function (v, i) {
                                        return {
                                            a: 'aaa' + i,
                                            b: 'bbb' + i,
                                            c: 'ccc' + i,
                                            expanded: true,
                                            children: Array.from(Array(10)).map(function (v, i) {
                                                return {
                                                    a: 'aaaa' + i,
                                                    b: 'bbbb' + i,
                                                    c: 'cccc' + i
                                                };
                                            })
                                        };
                                    })
                                };
                            })
                        }
                    })
                },

                options_fix: {
                    selectionMode: 'single',
                    bufferView: false,
                    pagination: {
                        activePage: 2,
                        pageSize: 9
                    },
                    data: Array.from(Array(250)).map(function (v, i) {
                        return {
                            a: 'a' + i,
                            b: 'b' + i,
                            c: 'c' + i
                        };
                    })
                },
                options_auto: {
                    selectionMode: 'single',

                    // 不显示勾选框列
                    selectionHide: true,

                    // 高度自适应
                    autoHeight: true,

                    // 宽度自适应，宽度会重新计算，自动占满
                    forceFit: true,

                    data: Array.from(Array(10)).map(function (v, i) {
                        return {
                            a: 'a' + i,
                            b: 'b' + i,
                            c: 'c' + i
                        };
                    })
                },
                options_none_header: {
                    selectionMode: 'single',
                    headerHide: true,
                    data: Array.from(Array(10)).map(function (v, i) {
                        return {
                            a: 'a' + i,
                            b: 'b' + i,
                            c: 'c' + i,
                            selectAble: Math.random() > 0.5
                        };
                    })
                },
                options_buffer_view: {
                    bufferView: true,
                    data: Array.from(Array(300)).map(function (v, i) {
                        return {
                            a: 'a' + i,
                            b: 'b' + i,
                            c: 'c' + i,
                            selectAble: Math.random() > 0.5
                        };
                    })
                },

                options_pagination: {
                    selectionMode: 'single',
                    data: Array.from(Array(50)).map(function (v, i) {
                        return {
                            a: 'a' + i,
                            b: 'b' + i,
                            c: 'c' + i
                        };
                    })
                },
                paginationOption: {
                    total: 232
                }
            };
        },

        mounted () {
            this.gridMgr = new GridMgr({
                toolbar: this.$refs.toolbar,
                table: this.$refs.table,
                pagination : this.$refs.pagination
            })
        },

        methods: {
            renderName (value, record, data, row, col) {
                return `${value}, row: ${row}, col: ${col}`;
            },
            renderTime (value, record, data, row) {

//                return +new Date();
                return row % 2 ? '<b>fdsa</b>' : '<a actionName="edit">编辑</a>';
            },
            renderDesc (value, record, data, row, col) {

                if (row % 2) {
                    return '<span><i class="fa fa-check-circle" style="color: rgb(0, 187, ' + Math.round(Math.random() * 255) + ');"></i></span>';
                }

                // 如果需要返回一个组件，则设置useVue，尽量不要这么用吧，表格数据很多的时候会创建出很多实例，导致性能问题
                return row % 4 ? `<div>
                    <sf-textfield v-model="c" />
                    <sf-fieldtip>传到textfield的data，为当前行的record</sf-fieldtip>
                </div>` :  {
                    el: document.createElement('div'),
                    template: '<sf-select v-model="record.c" :options="list"></sf-select>',
                    data: {
                        record: record,
                        list: [
                            {label: '选项1', value: 'c0'},
                            {label: '选项2', value: 'c1', disabled: true},
                            {label: '选项3adsjffasdjsdfsdafadsfasdf', value: 'c2'},
                            {label: '选项4', value: 'c3', disabled: false},
                            {label: '选项5', value: 'c4'}
                        ]
                    }
                };
            },

            triggerEvent (record, event, cellComponent, row, col) {
                logger.log(`click: row: ${row}, col: ${col}. record: %o, target: %o`, record, event.target);
            },


            showTable () {
                this.wrapOptions.visibility = true;
                this.wrapOptions.data = (Array.from(Array(300)).map(function (v, i) {
                    return {
                        a: 'a' + i,
                        b: 'b' + i,
                        c: 'c' + i,
                        selectAble: Math.random() > 0.5
                    };
                }));
            },

            modifyTableData () {
                this.wrapOptions.data = [{
                    a: 'aaaaaaaaaaaaaa'
                }];
            }
        }
    };
</script>
