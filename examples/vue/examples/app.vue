<template>
    <div id="body">
        <div id="nav">
            <router-link class="nav-item" v-for="nav in navs" :to="nav.path">{{nav.text}}</router-link>
        </div>
        <div id="main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<style scoped>
    #body {
        overflow: auto;
        width: 100vw;
        height: 100vh;
    }
    #nav {
        height: 100%;
        width: 200px;
        float: left;
    }
    #nav .nav-item {
        display: block;
        line-height: 22px;
        height: 22px;
    }

    #main {
        overflow: auto;
        /*height: 100%;*/
    }

</style>

<script>
    export default {
        data () {
            return {
                navs: [{
                    text: '/chart/echarts',
                    path: '/chart/echarts'
                }, {
                    text: '/chart/highcharts',
                    path: '/chart/highcharts'
                }, {
                    text: '/button',
                    path: '/button'
                }, {
                    text: '/panel',
                    path: '/panel/'
                }, {
                    text: '/form/',
                    path: '/form/'
                }, {
                    text: '/form/checkbox',
                    path: '/form/checkbox'
                }, {
                    text: '/form/textfield',
                    path: '/form/textfield'
                }, {
                    text: '/form/textarea',
                    path: '/form/textarea'
                }, {
                    text: '/form/fileupload',
                    path: '/form/fileupload'
                }, {
                    text: '/form/select',
                    path: '/form/select'
                }, {
                    text: '/form/select_tree',
                    path: '/form/select_tree'
                },{
                    text: '/form/datefield',
                    path: '/form/datefield'
                }, {
                    text: 'tooltip',
                    path: '/tips/tooltip'
                }, {
                    text: 'progress',
                    path: '/progress/progressBar'
                }, {
                    text: 'layer',
                    path: '/services/layer'
                }, {
                    text: 'scrollbar',
                    path: '/services/scrollbar'
                }, {
                    text: 'table',
                    path: '/grid/table'
                }, {
                    text: 'tree',
                    path: '/tree/tree'
                }, {
                    text: 'tabpanel',
                    path: '/tabpanel/tabpanel'
                }, {
                    text: 'menu',
                    path: '/menu/menu'
                },{
                    text: 'modal',
                    path: '/modal/modal'
                },{
                    text: 'datepicker',
                    path: '/datepicker/datepicker'
                },{
                    text: 'notify',
                    path: '/notify/notify'
                }, {
                    text: 'breadcrumb',
                    path: '/breadcrumb/breadcrumb'
                }, {
                    text: 'mask',
                    path: '/mask/mask'
                }]
            };
        }
    };
</script>
