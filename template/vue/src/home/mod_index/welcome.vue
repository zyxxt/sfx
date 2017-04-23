
<template>
    <div class="body">
        <h1>Welcome</h1>
        <p class="test">this is you project [<%- projectName %>: <%- version %>]</p>
        {{msg}}
    </div>
</template>

<style scoped>
    .body {
        height: 600px;
        background: url("./img/logo.png") center no-repeat;
        text-align: center;
    }

    .test {
        font-size: 64px;
        color: #00FF00;
    }

</style>

<script>
    /**
     * Created by ued on 2016/11/20.
     */

    export default {
        data () {
            return {
                msg: ''
            };
        },

        created () {
            this.$http.get('/bbc/login').then((res) => {
                window.console.log(res);
            });
        }
    };
</script>

