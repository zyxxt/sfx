
<template>
    <div>
        <sf-panel :title="title" :default-width="200" :default-height="100">
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
        </sf-panel>
        <br />
        <sf-panel :title="title" :headerHide="true" :default-width="200" :default-height="100">
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
            <p>abc</p>
        </sf-panel>

        <br />

        <sf-panel class="abcdefg" :tools="tools" :title="title" :default-width="400" :default-height="300">
            <sf-table class="test" :options="options_fix" ref="table" :default-height="254" >
                <sf-table-column data-index="a" :useHTML="true">标题头1</sf-table-column>
                <sf-table-column data-index="b" >标题头2</sf-table-column>
                <sf-table-column data-index="c" >标题头3</sf-table-column>
            </sf-table>
        </sf-panel>
    </div>
</template>

<style lang="stylus">
    .abcdefg
        .sf-panel-body-inner
            padding: 0
        .table
            border: none
</style>

<script>
    /**
     * Created by ued on 2017/1/5.
     */

    export default {
        data () {
            return {
                title: 'titletitletitletitletitletitletitletitletitletitle',
                tools: [{
                    class: 'fa-refresh',
                    actionName: 'loadData'
                }, {
                    class: 'fa-collapse',
                    handler: function () {

                    }
                }],

                options_fix: {
                    autoHeight: false,
                    data: []
                }
            };
        },

        methods: {
            loadData () {
                this.$refs.table.loadData(Array.from(Array(100)).map(function (v, i) {
                    return {
                        a: 'a' + i,
                        b: 'b' + i,
                        c: 'c' + i,
                        selectAble: true,
                        selected: false
                    };
                }));
            }
        }
    };
</script>
