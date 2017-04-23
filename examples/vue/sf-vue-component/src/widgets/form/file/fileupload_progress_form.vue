
<template>
    <sf-form class="progress-form">
        <sf-form-item>
            <span class="progress-tip" v-html="text"></span>
        </sf-form-item>
        <sf-form-item>
            <sf-progress-bar :default-width="438"
                             v-model="progress"
                             text-align="center" ></sf-progress-bar>
        </sf-form-item>
    </sf-form>
</template>

<style lang="stylus" scoped>
    .progress-form
        padding: 20px
        .progress-tip
            word-break: break-all;
</style>

<script>
    /**
     * Created by ued on 2016/12/27.
     */

    export default {
        data () {
            return {
                text: '',
                progress: 0
            };
        }
    };
</script>
