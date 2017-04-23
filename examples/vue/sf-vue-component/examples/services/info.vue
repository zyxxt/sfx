<template>
    <div style="padding: 20px">
        <p>{{ label }} 的信息</p>
        <p>身高：{{ high }}</p>
        <p>体重：{{ weight }}</p>
        <p>年龄：{{ age }}</p>
        <p>
            <sf-textfield v-model="xdesc" placeholder="描述"></sf-textfield>
        </p>
        <p>
            <sf-button @click="submitData">提交</sf-button>
            <sf-button @click="cancel">取消</sf-button>
        </p>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                xdesc: 'fds',
                label: null,
                high: null,
                weight: null,
                age: '',
                desc: ''
            }
        },

        methods: {
            getValue () {
                return this.$data;
            },

            submitData () {
                this.$emit('submitdata', this.$data);
            },

            cancel () {
                this.$emit('cancel')
            }
        }
    };
</script>
