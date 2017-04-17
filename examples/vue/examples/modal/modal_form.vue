<template>
    <sf-form>
        <sf-form-item>
            <sf-fieldlabel>姓名</sf-fieldlabel>
            <sf-textfield v-model="name" :allowBlank="false"></sf-textfield>
        </sf-form-item>

        <sf-form-item>
            <sf-fieldlabel>性别</sf-fieldlabel>
            <sf-radio name="sex" v-model="sex" check-value="man">男</sf-radio>
            <sf-radio name="sex" v-model="sex" check-value="woman">女</sf-radio>
        </sf-form-item>

        <sf-form-item>
            <sf-fieldlabel>爱好</sf-fieldlabel>

            <sf-select v-model="hobby" style="display: inline-block">
                <sf-option value="basketball">篮球</sf-option>
                <sf-option value="football">足球</sf-option>
                <sf-option value="destball">桌球</sf-option>
            </sf-select>
        </sf-form-item>

        <sf-form-item>
            <sf-fieldlabel>自评</sf-fieldlabel>
            <sf-textfield v-model="desc"></sf-textfield>
        </sf-form-item>
    </sf-form>
</template>

<script>
    export default {
        data () {
            return {
                name: '',
                sex: '',
                hobby: '',
                desc: ''
            }
        }
    }
</script>

<style>
    .modal-form-demo {
        padding: 20px;
    }
</style>
