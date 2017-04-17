<template>
    <div class="wrap">
        <h1> qtip测试例子： </h1>
        <p><span v-qtip="'我显示在上边，左边对齐'" qanchor="top-start">top-start</span></p>
        <p><span v-qtip="'我显示在上边'" qanchor="top" qtitle="title">top</span></p>
        <p><span v-qtip="'我显示在上边，右边对齐'" qanchor="top-end">top-end</span></p>
        <br />
        <br />

        <p><sf-button v-qtip="'我显示在右边，上边对齐'" :qwidth="100" qanchor="right-start">right-start</sf-button></p>
        <p><sf-button v-qtip="'我显示在右边'" :qwidth="50" qanchor="right">right</sf-button></p>
        <p><sf-button v-qtip="'我显示在右边，下边对齐'" :qwidth="100" qanchor="right-end">right-end</sf-button></p>
        <br />
        <br />

        <p><span v-qtip="'我显示在下边，左边对齐'" qanchor="bottom-start">bottom-start</span></p>
        <p><span v-qtip="'我显示在下边'" qanchor="bottom">bottom</span></p>
        <p><span v-qtip="'我显示在下边，右边对齐'" qanchor="bottom-end">bottom-end</span></p>
        <br />
        <br />

        <p><sf-button v-qtip="'我显示在左边，上边对齐'" :qwidth="100" qanchor="left-start">left-start</sf-button></p>
        <p><sf-button v-qtip="'我显示在左边'" :qwidth="50" qanchor="left">left</sf-button></p>
        <p><sf-button v-qtip="'我显示在左边，下边对齐'" :qwidth="100" qanchor="left-end">left-end</sf-button></p>
        <br />
        <br />

    </div>
</template>

<style scoped>
    .wrap {
        height: 50%;
        margin-left: 100px;
    }


</style>

<script>
    export default {
        data () {
            return {

            };
        }
    };
</script>
