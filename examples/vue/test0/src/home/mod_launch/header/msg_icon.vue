<template>
    <div class="bbc-notify">
        <i class="fa" :class="iconCls" @click="onClickIcon" ref="icon"></i>
        <span v-show="count > 0" class="bbc-notify-count">{{ count }}</span>
    </div>
</template>

<style lang="stylus">
    .bbc-notify
        position: absolute;
        top: 0;
        color: #fff;
        max-width: 130px;
        width: 38px;
        height: 60px;
        overflow: hidden;

        i.fa
            font-size: 1.8em;
            cursor: pointer;
            margin-top: 22px;

            &:hover
               color: #17c1c5;

        .bbc-notify-count
            position: absolute;
            top: 12px;
            right: 0;
            width: auto;
            height: 18px;
            background: #f66;
            border-radius: 100px;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            display: inline-block;
            padding-left: 5px;
            padding-right: 5px;

</style>

<script>

    /**
     * Created by ued on 2017/2/7.
     */

    export default {
        props: {
            iconCls: {
                type: String,
                'default': 'fa-envelope-o'
            }
        },

        data () {
            return {
                count: 0
            };
        },

        mounted () {
            this.$icon = this.$refs.icon;
        },

        methods: {
            setCount (count) {
                this.count = count;
            },

            onClickIcon (e) {
                this.$emit('click', e);
            }

        }
    };

</script>
