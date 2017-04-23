
<template>
    <table class="table-header-inner">
        <thead>
            <tr class="table-header-row">
                <sf-table-column class="table-cell-checkbox"
                                 :defaultWidth="options.selectionWidth"
                                 align="center"
                                 v-if="!options.selectionHide" ref="column">
                    <sf-checkbox v-model="status" @change="onCheckedChange" />
                </sf-table-column>

                <!-- 表格列直接配置到这里面 -->
                <slot></slot>
            </tr>
        </thead>
    </table>
</template>

<style lang="stylus">

</style>

<script>
    /**
     * Created by ued on 2016/11/29.
     */

    import Event from './event';
    export default {

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
                status: false
            };
        },

        mounted () {
            let columns = this.$children;
            columns.forEach(column => {
                if (!column.sortAble) {
                    return;
                }
                
                column.$on('event', this._onEvent);
            });
        },

        methods: {

            _onEvent (eventName, ...args) {
                return this.fireEvent(eventName, ...args);
            },

            /**
             * 全选|全不选
             */
            onCheckedChange () {
                let newValue = this.status;
                let me = this;
                if (!me.options.selectionMode || !Array.isArray(me.options.data)) {
                    return;
                }
                let changed = me.options.data.filter((record) => {
                    if (record.selectAble !== false) {
                        record.selected = newValue;
                        return true;
                    }
                    return false;
                });
                me.fireEvent('selectionchange', this, changed);
            }
        }
    };
</script>
