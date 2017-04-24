
<template>
    <div id="hd-logout" :title="logoutText" @click="logout">
        <i class="fa fa-sign-out"></i>
    </div>
</template>

<style lang="stylus" scoped>
    #hd-logout
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 30px;
        color: #FFF;
        height: 60px;
        line-height: 60px;
        .fa
            font-size: 1.6em
    &:hover
        color: #17C1C5
</style>

<script>
    /**
     * Created by ued on 2017/1/11.
     */

    import relogin from 'src/home/mod_common/admin/relogin';

    export default {
        data () {
            return {
                logoutText: _('退出')
            };
        },

        methods: {
            logout () {
                relogin();
            }
        }
    };
</script>
