

<template>
    <td class="table-header-cell tree-header-cell ellipsis"
        :class="[cls, `table-cell-${align}`]"
        :id="id"
        :style="{ width: width + 'px', height: height + 'px' }"
        v-show="!hidden"
        :disabled="disabled">
        <slot></slot>
    </td>
</template>

<style lang="stylus" scoped>
    
</style>

<script>
    /**
     * Created by ued on 2016/11/28.
     */

    import TableColumn from '../grid/table_column.vue';

    export default {

        mixins: [
            TableColumn
        ]
    };
</script>
