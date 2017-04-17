<template>
    <div>
        <div style="width: 100px; height:200px; margin-bottom: 20px;">
            <sf-mask msgCls="adf" ref="mask">mask内容</sf-mask>
        </div>
        <sf-button @click="show()">show</sf-button>
        <sf-button @click="hide()">hide</sf-button>

        <div ref="mask1" style="width: 100px; height:200px; margin-bottom: 20px;">

            adsfadf
        </div>

        <div ref="mask2" style="width: 100px; height:200px; margin-bottom: 20px;">

            1
        </div>
        <sf-button @click="show2()">click show</sf-button>
        <sf-button @click="show3()">click show</sf-button>
        <sf-button @click="hide2()">click hide</sf-button>

        <sf-button @click="maskPage">不带参数</sf-button>

    </div>
</template>
<script>

    import Vue from 'vue';

    export default {

        methods: {
            hide () {
                this.$refs.mask.hide();
            },
            show () {
                this.$refs.mask.show();
            },

            show2 () {
                this.$mask(this.$refs.mask1);
            },
            hide2 () {
                this.$unmask(this.$refs.mask1);
                this.$unmask(this.$refs.mask2);
            },
            show3 () {
                this.$mask(this.$refs.mask2);
            },
            maskPage () {
                this.$mask();
            }
        }
    };
</script>
