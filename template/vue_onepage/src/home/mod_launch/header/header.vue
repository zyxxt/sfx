<template>
    <div id="header-wrap">
        <div id="header" class="maintain">
            <bbc-logo />
            <bbc-nav ref="navComp" :active-tab="activeTab" />
            <bbc-msg-icon class="msg-alert"
                          ref="alert"
                          icon-cls="fa-warning"/>
            <bbc-msg-icon class="msg-notify"
                          ref="notify"
                          icon-cls="iconfont icon-notice"/>
            <bbc-auth />
            <bbc-logout />
        </div>
    </div>
</template>
<style lang="stylus">
    #header-wrap
        background-color: #3c434a;
        border-bottom: solid 2px #00bfbf;

    #header
        position: relative
        height: 60px

        .msg-alert
            right: 250px;

        .msg-notify
            right: 200px;

    .quick-msg
        z-index: 39999!important;

</style>
<script>
    /**
     * 页面头部入口，导航、登录信息等
     */

    import BbcLogo from './logo.vue';
    import BbcNav from './nav.vue';
    import BbcMsgIcon from './msg_icon.vue';
    import BbcMsg from './msg.vue';
    import BbcAuth from './auth.vue';
    import BbcLogout from './logout.vue';
    import IntervalTask from 'src/util/interval_task';
    import co from 'src/util/co_not_reject';

    const MSG_URL = 'msg/get_msg_bar';
    const INTERVAL = 30000;

    const MSG_LAYER_CONFIG = {
        maxHeight: 350,
        closeable: true,
        cls: 'msg-layer',
        anchor: 'bottom-end',
        autoScrollbar: true,
        appendToBody: true
    };

    const QUICK_LAYER_CONFIG = {
        maxHeight: 350,
        offset: '0 5',
        cls: 'quick-msg',
        closeable: true,
        arrowHide: true,
        autoHide: false,
        autoMask: false,
        anchor: 'bottom'
    };

    export default {
        name: 'sf-header',

        props: {
            activeTab: {
                type: String,
                'default': '/index'
            }
        },

        data () {
            return {
                alertMsg: [],
                notifyMsg: [],
                noReadAlertList: [],
                noReadNotifyList: []
            };
        },

        mounted () {
            this.createAleryMsgLayer();
            this.createNotifyMsgLayer();
            this.createAlertQuickLayer();
            this.createNotifyQuickLayer();
            this.createTask();
        },

        methods: {
            setActiveTab (tab) {
                let navs = this.$refs.navComp.navs;
                navs.every(function (nav) {
                    if (nav.path === tab) {
                        nav.actived = true;
                    } else {
                        nav.actived = false;
                    }
                    return true;
                });
            },

            createAleryMsgLayer () {
                this.alertMsgLayer = this.$layer(BbcMsg, Object.assign({
                    target: this.$refs.alert.$icon,
                    title: _('告警')
                }, MSG_LAYER_CONFIG));

                this.alertMsgLayer.$on('show', () => {
                    this.$refs.alert.setCount(0);
                    this.noReadAlertList = [];
                });
            },

            createNotifyMsgLayer () {
                this.notifyMsgLayer = this.$layer(BbcMsg, Object.assign({
                    target: this.$refs.notify.$icon,
                    title: _('通知')
                }, MSG_LAYER_CONFIG));

                this.notifyMsgLayer.$on('show', () => {
                    this.$refs.notify.setCount(0);
                    this.noReadNotifyList = [];
                });
            },

            createAlertQuickLayer () {
                this.alertQuickLayer = this.$layer(BbcMsg, QUICK_LAYER_CONFIG);

                this.alertQuickLayer.$on('show', () => {
                    this.calcPostion();
                });

                this.alertQuickLayer.$on('afterHide', () => {
                    this.calcPostion();
                });
            },

            createNotifyQuickLayer () {
                this.notifyQuickLayer = this.$layer(BbcMsg, QUICK_LAYER_CONFIG);

                this.notifyQuickLayer.$on('show', () => {
                    this.calcPostion();
                });

                this.notifyQuickLayer.$on('afterHide', () => {
                    this.calcPostion();
                });
            },

            /**
             * 重新定位通知栏，消息通知总是在告警通知下面
             */

            calcPostion () {
                let isShowAlert = !this.alertQuickLayer.isHide();
                let isShowNotify = !this.notifyQuickLayer.isHide();

                if (isShowNotify && isShowAlert) {
                    this.notifyQuickLayer.showTo(this.alertQuickLayer.layer.$el);
                }


            },

            createTask () {
                this.intervalTask = new IntervalTask({
                    fn: this.fetchMessage,
                    interval: INTERVAL,
                    autoStart: false
                });

                this.fetchMessage().then(() => {
                    this.intervalTask.start();
                });
            },

            fetchMessage () {
                let vm = this;

                return co(function * () {
                    let {jsonData} = yield vm.$http.get(MSG_URL);

                    if (!jsonData.success) {
                        return;
                    }

                    let alertMsg = jsonData.data.alert.map(item => {
                        item.type = 'alert';
                        return item;
                    });

                    let notifyMsg = jsonData.data.notification.map(item => {
                        item.type = 'notify';
                        return item;
                    });

                    alertMsg.sort((d1, d2) => {
                        return d2.time - d1.time;
                    });

                    notifyMsg.sort((d1, d2) => {
                        return d2.time - d1.time;
                    });

                    vm.updateAlertMsg(alertMsg);
                    vm.updateNotifyMsg(notifyMsg);

                    vm.showAlertQuick(alertMsg);
                    vm.showNotifyQuick(notifyMsg);

                    vm.intervalTask.next();
                });
            },

            showAlertQuick (msgList) {
                if (!msgList.length) {
                    this.alertQuickLayer.hide();
                    return;
                }

                // 只显示最新的那条数据
                this.alertQuickLayer.update({
                    msgList: [msgList[0]]
                });

                // 这里需要 $nextTick 一下的原因是 quickMsgLayer 的高度是可变的，
                // 但在 update 完之后 dom 还没改变过来，这样的话高度计算就会有问题
                this.alertQuickLayer.formRoot.$nextTick(() => {
                    this.alertQuickLayer.showTo(this.$refs.notify.$el);
                });
            },

            showNotifyQuick (msgList) {
                if (!msgList.length) {
                    this.notifyQuickLayer.hide();
                    return;
                }

                // 只显示最新的那条数据
                this.notifyQuickLayer.update({
                    msgList: [msgList[0]]
                });

                // 这里需要 $nextTick 一下的原因是 quickMsgLayer 的高度是可变的，
                // 但在 update 完之后 dom 还没改变过来，这样的话高度计算就会有问题
                this.notifyQuickLayer.formRoot.$nextTick(() => {
                    this.notifyQuickLayer.showTo(this.$refs.notify.$el);
                });
            },


            updateAlertMsg (msgList) {
                if (this.alertMsgLayer.isHide()) {
                    this.noReadAlertList = msgList.concat(this.noReadAlertList);
                    this.$refs.alert.setCount(this.noReadAlertList.length);
                }

                this.alertMsg = msgList.concat(this.alertMsg);
                this.alertMsgLayer.update({
                    msgList: this.alertMsg
                });
            },

            updateNotifyMsg (msgList) {
                if (this.notifyMsgLayer.isHide()) {
                    this.noReadNotifyList = msgList.concat(this.noReadNotifyList);
                    this.$refs.notify.setCount(this.noReadNotifyList.length);
                }

                this.notifyMsg = msgList.concat(this.notifyMsg);
                this.notifyMsgLayer.update({
                    msgList: this.notifyMsg
                });
            }
        },

        watch: {
            activeTab (tab) {
                this.setActiveTab(tab);
            }
        },

        components: {
            BbcLogo,
            BbcNav,
            BbcMsgIcon,
            BbcAuth,
            BbcLogout
        }
    };
</script>
