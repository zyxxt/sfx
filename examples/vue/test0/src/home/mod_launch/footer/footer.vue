
<template>
    <div id="footer-wrap" class="">
        <div id="footer" class="maintain">
            <div id="ft-more">
                <ul class="ft-more-ul">
                    <li class="ft-more-ul-li wechat-li">
                        <div class="v-ico-wechat hide-v-ico" ref="wechartDom">
                            <span class="circle"></span>
                            <div class="wechatText"></div>
                        </div>
                        <div id="ft-copyright"></div>
                    </li>
                    <div class="clearfix"></div>
                </ul>
            </div>
        </div>
        <sf-layer default-target="wechartDom" class="wechart-layer" :arrow-hide="false" anchor="top">
            <div class="wechart-twodc"></div>
        </sf-layer>
    </div>
</template>

<style lang="stylus" scoped>
    #footer-wrap{
        background-color: #3c434a;
        width:100%;
        position: fixed;
        bottom: 0;
        z-index: 0;
    }
    #footer{
        color: #ffffff;
        height:94px;
    }

    .footer-relative{
        position: relative !important;
    }

    /* 了解方式
    ======================*/
    #ft-more{
        padding:12px 42px 0 42px;
    }
    #ft-more > span{
        line-height: 34px;
        height: 34px;
        font-size:12px !important;
        color : #999999;
    }

    .ft-more-ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .ft-more-ul-li {
        margin-left: 45px;
    }

    .v-ico-wechat{
        margin-top: 8px;
        cursor: pointer;
        display: inline-block;
    }
    .wechat-li {
        text-align: center;
    }
    .wechart-layer {
        padding: 10px;
    }
    .wechart-twodc {
        height: 128px;
        width: 128px;
        background: url("./img/wechat-twodc.png") no-repeat center;
    }

    .wechatText {
        display inline-block;
    }

    .wechatText:after {
        content: '\6df1\4fe1\670d\5b98\65b9\5fae\4fe1';
    }

    .circle {
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 50%;
        padding-left: 30px;
        margin-right: 10px;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: #646b6e;
        background-image: url("./img/wechat.png")
    }


    /* 版权声明
    ======================*/
    #ft-copyright {
        margin-top: 10px;
    }

    #ft-copyright:after {
        content: '\7248\6743\6240\6709\20\a9\20\32\30\31\35\2d\32\30\31\37\20\6df1\4fe1\670d\79d1\6280\80a1\4efd\6709\9650\516c\53f8\20';
    }

</style>

<script>
    /**
     * Created by ued on 2017/1/13.
     */

    import IntervalTask from 'src/util/interval_task';
    import { addClass, removeClass } from 'wind-dom';

    export default {
        data () {
            return {
                year: new Date().getFullYear()
            };
        },

        created () {
            this.task = new IntervalTask({
                interval: 500,
                fn: this.rePosition
            });
        },

        mounted () {
            this.task.start();
        },

        methods: {
            rePosition (done) {
                let docHeight = document.documentElement.clientHeight;
                let header = document.getElementById('header-wrap');
                let headerHeight = header.getBoundingClientRect().height;
                let body = document.getElementById('body');
                let bodyHeight = body.getBoundingClientRect().height;
                let footer = document.getElementById('footer-wrap');
                let footerHeight = footer.getBoundingClientRect().height;

                if (docHeight < headerHeight + bodyHeight + footerHeight) {
                    addClass(footer, 'footer-relative');
                } else {
                    removeClass(footer, 'footer-relative');
                }

                done();
            }
        }
    };
</script>
