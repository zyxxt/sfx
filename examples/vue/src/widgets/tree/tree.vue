
<template>
    <div class="tree"
         :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled">
        <slot></slot>
    </div>
</template>

<style lang="stylus">
    .tree
        overflow: hidden
</style>

<script>
    /**
     * Created by ued on 2016/12/1.
     */

    import './tree.css';
    import Component from 'src/widgets/component';

    export default {

        mixins: [
            Component
        ],

        data () {
            return {

            };
        }

    };
</script>
