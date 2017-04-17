<template>
    <div>
        <div class="msgbox-demo">
            <sf-button class="btn-primary" @click="success">成功弹窗</sf-button>
        </div>
        <div class="msgbox-demo">
            <sf-button class="btn-danger" @click="showErr">报错弹窗</sf-button>
        </div>
        <div class="msgbox-demo">
            <sf-button class="btn-warning" @click="showWarn">告警弹窗</sf-button>
        </div>
        <div class="msgbox-demo">
            <sf-button class="btn-info" @click="showInfo">信息弹窗</sf-button>
        </div>
        <div class="msgbox-demo">
            <sf-button class="btn-primary" @click="confirm">确认弹窗</sf-button>
        </div>
        <div class="msgbox-demo">
            <sf-button class="btn-danger" @click="confirmDanger">删除确认弹窗1</sf-button>
        </div>
        <div class="msgbox-demo">
            <sf-button class="btn-danger" @click="confirmDelete">删除确认弹窗2</sf-button>
        </div>
        <br>
        <br>
        <p>更多用法：</p>
        <div>
            <p>支持配置的方式</p>
            <sf-button class="btn-primary" @click="confirm1">点我看看</sf-button>
        </div>
        <div>
            <p>支持弹窗内容是个 vueComponent</p>
            <sf-button class="btn-primary" @click="confirm2">点我看看</sf-button>
        </div>
        <div>
            <p>支持弹窗内容（字符串tpl）包含有 actionName，然后再外部绑定点击事件</p>
            <sf-button class="btn-primary" @click="confirm3">点我看看</sf-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import logger from 'src/util/logger';

    export default {
        methods: {
            success () {
                this.$showSuccess('成功！！！', '恭喜', (actionName) => {
                    logger.log(actionName);
                    logger.log('关闭成功提示');
                });
            },

            showErr () {
                this.$showErr('这是报错信息', '提示', (actionName) => {
                    logger.log(actionName);
                    logger.log('关闭错误提示');
                });
            },

            showWarn () {
                this.$showWarn('这是警告信息', '提示', (actionName) => {
                    logger.log(actionName);
                    logger.log('关闭警告提示');
                });
            },

            showInfo () {
                let info = this.$showInfo('信息弹窗', '提示', (actionName) => {
                    logger.log(actionName);
                });
            },

            confirm () {
                this.$confirm('确认提交', '提示', (actionName) => {
                    logger.log(actionName);
                });
            },

            confirmDanger () {
                this.$confirmDanger('按钮文字为确认', '提示', (actionName) => {
                    logger.log(actionName);
                });
            },
            confirmDelete () {
                this.$confirmDelete('按钮文字为删除', '提示', (actionName) => {
                    logger.log(actionName);
                });
            },

            confirm1 () {

                // 告警弹窗也支持纯配置的方式，跟常规的 modal 相比就多了 msg icon autoClose callback 这几个配置
                // autoClose： 点击除了取消按钮除外的按钮，是否关闭弹窗？默认为 true
                this.$confirm({
                    title: '警告',
                    msg: '我也是告警弹窗',
                    icon: 'warning',
                    autoClose: false,
                    buttons: [
                        '<a actionName="keep">继续动作</a>',
                        'submit',
                        'cancel'
                    ],
                    callback: (actionName) => {
                        logger.log('你点击了：', actionName);
                    }
                });
            },

            confirm2 () {
                let confirmBody = Vue.extend({
                    template: '<div>这是确认弹窗，这是传递 vueComponent 的写法</div>'
                });

                this.$confirm(confirmBody, '请确认', (actionName) => {
                    logger.log(actionName);
                });
            },

            confirm3 () {
                let confirm = this.$confirm(
                    '<div>确认弹窗<p><sf-textfield ref="aaa"></sf-textfield><a actionName="look">查看输入的值</a></p></div>',
                    '哈哈',
                    (actionName) => {
                        logger.log(actionName);

                        // 这个其实是从 confirm.formRoot.$refs 中拷贝过来的，方便使用
                        let $input = confirm.$refs.aaa;

                        if (actionName === 'look') {
                            this.$showInfo('你输入的值是：' + $input.getDomValue());
                        }
                    }
                );
            }
        }
    }
</script>

<style>
    .msgbox-demo {
        display: inline-block;
        margin-right: 20px;
    }
</style>
