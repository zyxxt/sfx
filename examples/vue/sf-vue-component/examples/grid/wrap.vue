
<template>
    <div>
        <sf-table class="test" :options="abc" :default-height="200">
            <sf-table-column data-index="a" :defaultWidth="100">标题头1</sf-table-column>
            <sf-table-column data-index="b" :defaultWidth="200">标题头2</sf-table-column>
            <sf-table-column data-index="c" :defaultWidth="300">标题头3</sf-table-column>
        </sf-table>
    </div>
</template>

<style lang="stylus" scoped>
    
</style>

<script>
    /**
     * Created by ued on 2016/12/26.
     */

    export default {

        props: {
            gridData: Array
        },

        data () {
            return {
                abc: {
                    autoFit: false,
                    bufferView: true,
                    rowHeight: 34,
                    data: this.gridData || null
                }
            };
        },

        watch: {
            gridData (rs) {
                this.abc.data = rs;
            }
        }
    };
</script>
