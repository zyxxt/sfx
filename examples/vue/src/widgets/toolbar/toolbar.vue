<template>
    <div class="toolbar"
         :style="{ width: `${width}px`, height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled">
        <slot></slot>
    </div>
</template>

<style lang="stylus">
    .toolbar
        padding: 6px 12px;
        background-color: #e8e9eb;

        .btn
            height: 28px;
        .btn-small
            height: 22px;
        .form-item
            display: inline-block;

        > * ~ *
            margin-left: 8px;
</style>

<script>
    /**
     * 工具栏
     */

    import Component from 'src/widgets/component';

    export default {

        mixins: [
            Component
        ]

    };

</script>
