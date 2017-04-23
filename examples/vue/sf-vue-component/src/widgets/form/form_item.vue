<template>
    <div class="form-item"
         :class="cls"
         :id="id"
         :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled" >
        <slot>put form field here. such as sf-textfield, sf-checkbox...</slot>
    </div>
</template>
<style lang="stylus" scoped>
    .form-item
        min-height: 28px
        margin-bottom: 5px

</style>
<script>
    /**
     * 对表单项提供一套统一管理
     */

    import Component from 'src/widgets/component';

    export default {

        mixins: [
            Component
        ]

//        data () {
//            return {
//
//            };
//        }
    };
</script>
