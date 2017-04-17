
<template>
    <div class="tree-wrap">
        <sf-tab-panel :current-index="2">
            <sf-tab-item title="树测试">
                <sf-tree>
                    <sf-toolbar>
                        <sf-button iconCls="fa-spin fa-refresh" class="btn-blank" @click="loadData"><lang>加载新数据</lang></sf-button>
                        <sf-button class="btn-blank" @click="setSelections"><lang>选中</lang></sf-button>
                    </sf-toolbar>
                    <sf-tree-table :options="options" :default-height="300" ref="tree">
                        <sf-tree-column data-index="a">标题1</sf-tree-column>
                        <sf-table-column data-index="b">标题2</sf-table-column>
                        <sf-table-column :renderer="rendererEdit" :useHTML="true">编辑</sf-table-column>
                    </sf-tree-table>
                </sf-tree>
            </sf-tab-item>
            <sf-tab-item title="BufferView">
                <sf-tree-table :options="options_buffer_view" :default-height="300">
                    <sf-tree-column data-index="a" @click="edit">标题1</sf-tree-column>
                    <sf-table-column data-index="b">标题2</sf-table-column>
                    <sf-table-column :renderer="rendererEdit" :useHTML="true" @click="edit">编辑</sf-table-column>
                </sf-tree-table>
            </sf-tab-item>
            <sf-tab-item title="AutoWidth">
                <sf-tree-table class="hori" :options="options_hori" :default-height="300"  :default-width="200">
                    <sf-tree-column data-index="a" :renderer="rendererLongText">aaaa</sf-tree-column>
                </sf-tree-table>
            </sf-tab-item>
        </sf-tab-panel>



    </div>
</template>

<style lang="stylus">
    .tree-wrap
        margin-right: 20px;
        .tree-row-expanded .fa-folder:before {
            content: "\f07c";
        }

</style>

<script>
    /**
     * Created by ued on 2016/12/1.
     */

    export default {
        data () {
            return {
                options: {
                    headerHide: true,
                    checkAble: true,
                    data: this._getData()
                },

                options_buffer_view: {
                    autoCheckParent: false,
                    bufferView: true,
                    checkAble: true,
                    data: this._getData()
                },

                options_hori: {
                    headerHide: false,
                    selectionHide: false,
                    bufferView: true,
                    checkAble: true,

                    // 表格会自动撑开
                    autoWidth: true,
                    data: this._getData()
                }
            };
        },

        methods: {

            rendererEdit () {
                return `<a class="sim-link">${_('编辑')}</a>`;
            },

            rendererLongText (v) {
                return String(v).repeat(10);
            },

            setSelections () {
                this.$refs.tree.setSelections(this.$refs.tree.options.data[0]);
            },

            _getData () {
                return Array.from(Array(2)).map(function (v, i) {
                    return {
                        a: 'a' + i,
                        b: 'b' + i,
                        c: 'c' + i,
                        checkState: 'checkAll',
                        expanded: true,
                        iconCls: 'fa-folder',
                        children: Math.random() > 0.1 ? Array.from(Array(2)).map(function (v, i) {
                            return {
                                a: 'aa' + i,
                                b: 'bb' + i,
                                c: 'cc' + i,
                                checkState: 'checkAll',
                                expanded: false,
                                hidden: false,
                                iconCls: 'fa-folder',
                                children: Math.random() > 0.1 ? Array.from(Array(2)).map(function (v, i) {
                                    return {
                                        a: 'aaa' + i,
                                        b: 'bbb' + i,
                                        c: 'ccc' + i,
                                        checkState: 'checkAll',
                                        expanded: true,
                                        children: Math.random() > 0.1 ? Array.from(Array(2)).map(function (v, i) {
                                            return {
                                                a: 'aaaa' + i,
                                                b: 'bbbb' + i,
                                                c: 'cccc' + i,
                                                checkState: 'checkAll'
                                            };
                                        }) : []
                                    };
                                }) : []
                            };
                        }) : []
                    }
                });
            },

            loadData () {

                this.$refs.tree.loadData(this._getData());
            },

            edit (record, event, cellComponent, row, col) {
                console.log(`row: ${row}, col: ${col}`, this);
            }
        }
    };
</script>
