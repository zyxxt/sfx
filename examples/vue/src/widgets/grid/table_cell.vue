
<template>
    <td class="table-cell ellipsis"
        :class="cls"
        :id="id"
        :style="{ width: width + 'px',height: height + 'px' }"
        v-show="!hidden"
        :title="title"
        :disabled="disabled">
        <slot></slot>
    </td>
</template>

<style lang="stylus" scoped>

</style>

<script>
    /**
     * Created by ued on 2016/11/29.
     */

    import Component from 'src/widgets/component';
    import Event from './event';

    export default {

        props: {
            parents: Array,
            title: true
        },

        mixins: [
            Component,
            Event
        ],

        data () {
            return {

            };
        },

        methods: {

        }
    };
</script>
