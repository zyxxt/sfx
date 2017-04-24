
<template>
    <sf-form>
        <sf-form-item>
            <sf-form-item>
                <sf-fieldlabel><lang>原密码</lang></sf-fieldlabel>
                <sf-textfield v-model="login_password"
                              type="password"
                              :allowBlank="false"
                              :default-width="260"></sf-textfield>
            </sf-form-item>
            <sf-form-item>
                <sf-fieldlabel><lang>新密码</lang></sf-fieldlabel>
                <sf-textfield v-model="password"
                              type="password"
                              :allowBlank="false"
                              :min-length="8"
                              :max-length="64"
                              :validator="pwdValidator"
                              :default-width="260"></sf-textfield>
                <sf-fieldtip>
                    <lang>1、密码不能包含用户名</lang><br />
                    <lang>2、密码至少应包含大写字母、小写字母、数字和特殊字符中的两项</lang>
                </sf-fieldtip>
            </sf-form-item>
            <sf-form-item>
                <sf-fieldlabel><lang>确认密码 </lang></sf-fieldlabel>
                <sf-textfield v-model="rePassword"
                              type="password"
                              :allowBlank="false"
                              :default-width="260"
                              :validator="rePwdValidator"></sf-textfield>
            </sf-form-item>
        </sf-form-item>
    </sf-form>
</template>

<style lang="stylus" scoped>

</style>

<script>
    /**
     * Created by ued on 2017/1/21.
     */

    import { escapeRegex } from 'src/util/format';
    
    export default {
        data () {
            return {
                id: window.BBC.user.id || '',
                name: window.BBC.user.name,
                login_password: '',
                password: '',
                rePassword: ''
            };
        },

        methods: {
            rePwdValidator () {
                if (this.password && this.rePassword && this.password !== this.rePassword) {
                    return _('密码输入不一致');
                }
                return true;
            },

            pwdValidator (password) {
                let usrname = this.name;
                let nameReg = usrname ? new RegExp(escapeRegex(usrname)) : null;
                let lower = /[a-z]+/;
                let upper = /[A-Z]+/;
                let number = /[0-9]+/;
                let special = /[~`@#%&<>"',;_\-\^\$\.\*\+\?\=\!\:\|\{\}\(\)\[\]\/\\]+/;
                let illegal = /[^a-zA-Z0-9~`@#%&<>"',;_\-\^\$\.\*\+\?\=\!\:\|\{\}\(\)\[\]\/\\]+/;
                let kinds = 0;
                const TYPE_COUNT = 2;

                if (nameReg && nameReg.test(password)) {
                    return _('密码中不能包含用户名');
                }
                if (illegal.test(password)) {
                    return _('密码中存在非法字符，特殊字符支持{0}', '`@#%&<>\"\',;_-^$.*+?=!:|{}()[]/\\');
                }
                kinds += lower.test(password) ? 1 : 0;
                kinds += upper.test(password) ? 1 : 0;
                kinds += number.test(password) ? 1 : 0;
                kinds += special.test(password) ? 1 : 0;
                if (kinds < TYPE_COUNT) {
                    return _('密码至少应包含大写字母、小写字母、数字和特殊字符中的两项');
                }
                return true;
            }
        }
    };
</script>
