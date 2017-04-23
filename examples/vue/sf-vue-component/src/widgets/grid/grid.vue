
<template>
    <div class="grid"
         :style="{ width: `${width}px`, height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled">
        <slot></slot>
    </div>
</template>

<style lang="stylus">
    .grid
        overflow: hidden
</style>

<script>
    /**
     * 表格
     */

    import Component from 'src/widgets/component';

    export default {

        mixins: [
            Component
        ],

        props: {
            mgr: {

            }
        }

    };
</script>
