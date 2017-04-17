<template>
    <div v-if="!hidden" :class="mainClass" transition="fade">
        <div :class="loadingClass">
            <em></em>
            <em></em>
            <em></em>
            <em></em>
            <em></em>
        </div>
        <div :class="msgClass">
            <slot>正在加载...</slot>
        </div>
    </div>
</template>

<style lang="stylus">
    .sf-mask{
        width:100%;
        height:100%;
        left:0;
        top:0;
        position: absolute;
        z-index: 10000;
        background-color:rgba(23, 193, 197, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        /*for ie10*/
        display: -ms-flexbox;
        -ms-flex-pack: center;  /*水平居中*/
        -ms-flex-align: center; /*垂直居中*/
        -ms-flex-direction: column;
    }

    .sf-mask-position{
        position:relative;
        z-index: 0;
    }

    .sf-mask-unselectable {
        user-select: none;
        -o-user-select: none;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -webkit-user-select: none;
        cursor: default
    }

    .sf-mask-msg{
        text-align: center;
        padding-top: 10px;
    }

    .sf-mask-msg, .sf-mask-loading{
        color:#fff;
        display:block;
        overflow: visible;
    }

    .sf-mask-loading, .sf-mask-loading > em{
        width: 45px;
        height: 45px;
    }

    .sf-mask-loading > em {
        position: absolute;
        opacity: 0;
        display: block;
        -webkit-transform: rotate(225deg);
        -moz-transform: rotate(225deg);
        -o-transform: rotate(225deg);
        -ms-transform: rotate(225deg);
        transform: rotate(225deg);
        -webkit-animation-name: sf-mask-loading;
        -moz-animation-name: sf-mask-loading;
        -ms-animation-name: sf-mask-loading;
        -o-animation-name: sf-mask-loading;
        animation-name: sf-mask-loading;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
        -o-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -o-animation-duration: 5.28s;
        -moz-animation-duration: 5.28s;
        -webkit-animation-duration: 5.28s;
        animation-duration: 5.28s;
    }

    .sf-mask-loading > em:after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #FFF;
    }
    .sf-mask-loading > em:nth-child(2) {
        -webkit-animation-delay: .23s;
        -moz-animation-delay: .23s;
        -ms-animation-delay: .23s;
        -o-animation-delay: .23s;
        animation-delay: .23s;
    }
    .sf-mask-loading > em:nth-child(3) {
        -webkit-animation-delay: .46s;
        -moz-animation-delay: .46s;
        -ms-animation-delay: .46s;
        -o-animation-delay: .46s;
        animation-delay: .46s;
    }
    .sf-mask-loading > em:nth-child(4) {
        -webkit-animation-delay: .69s;
        -moz-animation-delay: .69s;
        -ms-animation-delay: .69s;
        -o-animation-delay: .69s;
        animation-delay: .69s;
    }
    .sf-mask-loading > em:nth-child(5) {
        -webkit-animation-delay: .92s;
        -moz-animation-delay: .92s;
        -ms-animation-delay: .92s;
        -o-animation-delay: .92s;
        animation-delay: .92s;
    }
    @-webkit-keyframes sf-mask-loading {
        0% {
            -webkit-transform: rotate(225deg);
            opacity: 1;
            -webkit-animation-timing-function: ease-out;
        }
        8% {
            -webkit-transform: rotate(345deg);
            -webkit-animation-timing-function: linear;
        }
        30% {
            -webkit-transform: rotate(455deg);
            -webkit-animation-timing-function: ease-in-out;
        }
        40% {
            -webkit-transform: rotate(690deg);
            -webkit-animation-timing-function: linear;
        }
        60% {
            -webkit-transform: rotate(815deg);
            opacity: 1;
            -webkit-animation-timing-function: ease-out;
        }
        75% {
            -webkit-transform: rotate(965deg);
            -webkit-animation-timing-function: ease-out;
        }
        76% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @-moz-keyframes sf-mask-loading {
        0% {
            -moz-transform: rotate(225deg);
            opacity: 1;
            -moz-animation-timing-function: ease-out;
        }
        8% {
            -moz-transform: rotate(345deg);
            -moz-animation-timing-function: linear;
        }
        30% {
            -moz-transform: rotate(455deg);
            -moz-animation-timing-function: ease-in-out;
        }
        40% {
            -moz-transform: rotate(690deg);
            -moz-animation-timing-function: linear;
        }
        60% {
            -moz-transform: rotate(815deg);
            opacity: 1;
            -moz-animation-timing-function: ease-out;
        }
        75% {
            -moz-transform: rotate(965deg);
            -moz-animation-timing-function: ease-out;
        }
        76% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes sf-mask-loading {
        0% {
            transform: rotate(225deg);
            opacity: 1;
            animation-timing-function: ease-out;
        }
        8% {
            transform: rotate(345deg);
            animation-timing-function: linear;
        }
        30% {
            transform: rotate(455deg);
            animation-timing-function: ease-in-out;
        }
        40% {
            transform: rotate(690deg);
            animation-timing-function: linear;
        }
        60% {
            transform: rotate(815deg);
            opacity: 1;
            animation-timing-function: ease-out;
        }
        75% {
            transform: rotate(965deg);
            animation-timing-function: ease-out;
        }
        76% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
</style>

<script>
    /**
     * mask
     *  支持的配置{
     *      defer：Number 延迟显示（毫秒）
     *      msgCls： msg样式
     *      cls： mask样式
     *  }
     *  对外提供了两个方法show,hide
     **/

    import Component from 'src/widgets/component';

    const PRE_FIX_CLS = 'sf-mask';

    export default {

        mixins: [
            Component
        ],

        props: {
            defer: {
                type: Number,
                'default': 300
            },
            msgCls: {
                type: String,
                'default': ''
            },
            cls: {
                type: String,
                'default': ''
            },
            defaultHidden: {
                type: Boolean,
                'default': true
            }
        },

        computed: {
            mainClass () {
                return [
                    `${PRE_FIX_CLS}`,
                    `${PRE_FIX_CLS}-unselectable`,
                    {
                        [this.cls]: !!this.cls
                    }
                ];
            },

            loadingClass () {
                return `${PRE_FIX_CLS}-loading`;
            },

            unselectable () {
                return `${PRE_FIX_CLS}-unselectable`;
            },

            msgClass () {
                return [
                    `${PRE_FIX_CLS}-msg`,
                    `${PRE_FIX_CLS}-unselectable`,
                    {
                        [this.msgCls]: !!this.msgCls
                    }
                ];
            },

            positionClass () {
                return `${PRE_FIX_CLS}-position`;
            }

        },

        methods: {
            show () {
                this.setTimeoutShow();
                this.addClass(this.$el.parentNode, this.positionClass);
            },

            hide () {
                this.removeClass(this.$el.parentNode, this.positionClass);
                this.clearTimeoutShow();
                this.hidden = true;
            },

            addClass (el, cls) {
                let classes = el.className,
                    hasPositionCls = classes.split(' ').indexOf(cls) >= 0;

                if (!hasPositionCls) {
                    el.className = classes + ' ' + cls;
                }
            },

            removeClass (el, cls) {
                let classes = el.className,
                    clsArr = classes.split(' '),
                    index = clsArr.indexOf(cls);

                if (index >= 0) {
                    clsArr.splice(index, 1);
                    el.className = clsArr.join(' ');
                }

            },

            setTimeoutShow () {
                let me = this;

                me.clearTimeoutShow();

                /* eslint-disable sfchecklist/no-settimeout */
                me.timeId = window.setTimeout(() => {
                    me.hidden = false;
                }, me.defer);

                /* eslint-enable sfchecklist/no-settimeout */
            },

            clearTimeoutShow () {
                window.clearTimeout(this.timeId);
            }

        },

        mounted () {

            this.addClass(this.$el.parentNode, this.positionClass);

            if (!this.hidden) {
                this.setTimeoutShow();
            }
        }
    };
</script>
