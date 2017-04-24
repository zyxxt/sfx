<template>
    <div id="hd-nav">
        <ul>
            <li class="hd-nav-item" v-for="nav in navs">
                <router-link :to="nav.path"
                             :class="{active: nav.actived}" >{{nav.text}}</router-link>
            </li>
        </ul>

    </div>
</template>
<style lang="stylus" scoped>
    /* 导航样式 */
    #hd-nav{
        width:100%;
        text-align: center;
        line-height: 60px;
    }
    #hd-nav > ul{
        list-style:none;
        padding:0;
        margin:0 auto;
        width:auto;
    }
    #hd-nav .hd-nav-item{
        display:inline-block;
        padding:0;
        width:96px;
    }
    .hd-nav-item > a {
        display: block;
        height:60px;
        line-height: 60px;
        border-bottom :2px solid transparent;
    }
    .hd-nav-item > a,
    .hd-nav-item > a:visited,
    .hd-nav-item > a:hover{
        font-size:15px !important;
        color:#ffffff;
        text-decoration: none;
    }
    .hd-nav-item > a:hover{
        background-color: #49525B;
    }
    .hd-nav-item > a.active{
        color : #00BFBF;
        border-bottom-color: #00BFBF;
    }
</style>
<script>
    /**
     * 导航条
     */


    export default{

        props: {
            activeTab: String
        },

        data () {
            let me = this;
            let navs = [{
                path: '/index',
                text: _('首页')
            }, {
                path: '/branch',
                text: _('分支')
            }, {
                path: '/alarm',
                text: _('告警{#nav#}')
            }, /*{
                path: '/report',
                text: _('报表')
            }, */

            {
                path: '/manager',
                text: _('管理')
            }].map(function (nav) {
                nav.actived = me.activeTab === nav.path;
                return nav;
            });
            return {
                navs: navs
            };
        }
    };
</script>
