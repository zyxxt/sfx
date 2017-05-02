<template>
    <div class="msg-wrap">
        <div v-if="!msgList.length" class="msg-empty"><lang>无消息</lang></div>
        <div v-else class="msg-item" v-for="item in msgList">
            <span class="msg-type" :class="getTypeCls(item)"></span>
            <span class="msg-info">
                <span class="msg-time">[ {{ item.time | date }} ]</span>
                <div class="msg-text">{{ item.msg }}</div>
            </span>
        </div>
    </div>
</template>

<style lang="stylus">
    .msg-wrap
        width 300px;
        padding 2px 10px 2px 0;

        .msg-empty
            text-align center;
            line-height 60px;

        .msg-item
            width: 100%;
            padding: 5px 10px 5px 10px;
            display: inline-block;
            line-height: 20px;

            .msg-info
                display: inline-block;
                width: calc(100% - 12px);
                vertical-align: top;

                .msg-time
                    color #5F6A75;

                .msg-text
                    word-break: break-all;
                    display: inline-block;

            .msg-type
                border-radius 50%;
                width 8px;
                height 8px;
                display inline-block;
                color #5F6A75;

            .msg-type-notify
                background #5F6A75;

            .msg-type-alert
                background #ff0000;
</style>


<script>

    /**
     * Created by ued on 2017/2/7.
     */

    import { encodeDate } from 'src/util/format';

    const TYPE_CLS = {
        notify: 'msg-type-notify',
        alert: 'msg-type-alert'
    };

    export default {
        props: {},

        data () {
            return {
                msgList: []
            };
        },

        filters: {
            date (value) {
                return encodeDate(Number(value));
            }
        },

        methods: {
            getTypeCls (data) {
                return TYPE_CLS[data.type];
            }
        }
    };

</script>
