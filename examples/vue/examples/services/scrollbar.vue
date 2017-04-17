
<template>
    <div style="padding: 0 20px;">
        <h1>组件形式：（&lt;sf-scrollbar&gt;）</h1>
        <h2>纵向滚动条：</h2>
        <div class="wrap">
            <sf-scrollbar>
                <p v-for="text in vertical">{{text}}</p>
            </sf-scrollbar>
        </div>
        <h2>横向滚动条：(autoHeight)</h2>
        <div class="auto-height">
            <sf-scrollbar :autoHeight="true">
                <p class="no-wrap" v-for="text in horizontal">{{text}}</p>
            </sf-scrollbar>
        </div>
        <h2>纵向横向滚动条：</h2>
        <div class="wrap">
            <sf-scrollbar>
                <p class="no-wrap" v-for="text in data">{{text}}</p>
            </sf-scrollbar>
        </div>
        <h2>指令形式：v-scrollbar</h2>
        <div class="wrap" v-scrollbar>
            <p v-for="text in vertical">{{text}}</p>
        </div>
        <h2>动态变化：<sf-button @click="add">添加行</sf-button><sf-button @click="minus">减少行</sf-button></h2>
        <div class="wrap">
            <sf-scrollbar ref="noneBar">
                <p v-for="text in none">{{text}}</p>
            </sf-scrollbar>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .wrap
        height: 100px
        border: solid 1px #DDD;
        overflow: auto;
    .auto-height
        border: solid 1px #DDD;
    .no-wrap
        white-space: no-wrap;

</style>

<script>
    /**
     * Created by ued on 2016/12/1.
     */

    export default {
        data () {
            return {
                count: 0,
                vertical: Array.from(Array(100)).map((v, i) => `text${i}`),
                horizontal: Array.from(Array(5)).map((v, i) => `text${String(i).repeat(1000)}`),
                data: Array.from(Array(100)).map((v, i) => `text${String(i).repeat(1000)}`)

            };
        },

        computed: {
            none: function () {
                return Array.from(Array(this.count)).map((v, i) => `text${String(i).repeat(10)}`);
            }
        },

        methods: {
            add () {
                let me = this;
                this.count++;
                this.$nextTick(function () {
                    me.$refs.noneBar.sync();
                });
            },
            minus () {
                let me = this;
                this.count--;
                this.count = Math.max(0, this.count);
                this.$nextTick(function () {
                    me.$refs.noneBar.sync();
                });
            }
        }
    };
</script>
