<template>
    <div class="hd-logo">
        <h1 class="hd-logo-title">{{title}}</h1>
        <h2 class="hd-logo-subtitle">{{subTitle}}</h2>
    </div>
</template>
<script>
    /**
     * 左上角logo，版本信息
     */

    import { formatString } from 'src/util/format';
    export default{
        data () {
            return {
                title: _('分支业务中心'),
                version: '1.0'
            };
        },

        computed: {
            subTitle: {
                get () {
                    return formatString('Branch Bussiness Center (BBC {0})', this.version);
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .hd-logo
        background: url("./img/logo.png") no-repeat 5px center;
        height: 60px
        position: absolute
        left: 0
        top: 0
        padding-left: 60px

        .hd-logo-title
            font-size: 18px!important;
            margin-top: 10px;
            color: #FFF;
            position:relative;
            display: inline-block;

        .hd-logo-subtitle
            font-size: 10px!important;
            margin-top: 3px;
            color: #17c1c5;

</style>
