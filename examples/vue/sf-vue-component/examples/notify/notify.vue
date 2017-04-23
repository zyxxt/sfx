<template>
    <div>
        <div class="notify-demo">
            <sf-button @click="showOk">成功提示</sf-button>
        </div>
        <div class="notify-demo">
            <sf-button @click="showFail">失败提示</sf-button>
        </div>
        <div class="notify-demo">
            <sf-button @click="showWarn">告警提示</sf-button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            showOk () {
                this.$ok('操作成功！');
            },

            showFail () {
                this.$fail('请求失败，人品问题！');
            },

            showWarn () {
                this.$warn('你可能有些东西忘记了');
            }
        }
    }
</script>

<style scoped>
    .notify-demo {
        margin: 10px 0;
    }
</style>
