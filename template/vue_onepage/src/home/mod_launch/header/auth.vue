
<template>
    <div id="hd-auth" ref="auth">
        <div id="hd-auth-name" data-hint="admin" class="ellipsis" style="color: rgb(255, 255, 255);">
            {{name}}
        </div>
        <div id="hd-auth-role" class="ellipsis" style="color: rgb(255, 255, 255);">{{ident}}</div>

        <sf-layer class="auth-layer" default-target="auth" anchor="bottom" :arrow-hide="false" >
            <sf-form>
                <sf-form-item>
                    <lang>描述：</lang>
                    <span>{{description}}</span>
                </sf-form-item>
            </sf-form>
            <sf-toolbar class="auth-toolbar">
                <sf-button class="btn-primary" @click="changePwd"><lang>修改密码</lang></sf-button>
            </sf-toolbar>
        </sf-layer>

    </div>
</template>

<style lang="stylus" scoped>

    #hd-auth{
        position:absolute;
        top:0;
        right:60px;
        color:#ffffff;
        max-width:130px;
        width:110px;
        overflow: hidden;
    }
    #hd-auth:hover {
        color: #17C1C5;
    }

    #hd-auth-name{
        font-size:14px !important;
        font-weight: bold;
        margin-top:14px;
        cursor:pointer;
    }

    #hd-auth-role{
        font-size:11px !important;
        margin-top:-3px;
        padding-top:4px;
        cursor:pointer;
        display:inline-block;
    }

    .auth-layer
        padding: 0
        width: 250px

    .auth-toolbar
        text-align: right
        background: transparent;
        border-top: solid 1px #DDD;


</style>

<script>
    /**
     * Created by ued on 2017/1/11.
     */

    import PwdForm from './auth_form.vue';
    import co from 'src/util/co_not_reject';
    import relogin from 'src/home/mod_common/admin/relogin';

    import { encrypt } from 'src/util/rsa';

    export default {

        created () {
            this._checkDefaultPwd();
            this.$store.dispatch('updateAdminDescription', window.BBC.user.description);
        },

        computed: {
            ident () {
                const IDENT = {
                    admin: _('系统管理员'),
                    region: _('区域管理员'),
                    guest: _('访客')
                };
                return window.BBC.user.name === 'admin' ? _('超级管理员') : IDENT[window.BBC.user.role] || IDENT.admin;
            },

            name () {
                return window.BBC.user.name;
            },

            description () {
                return this.$store.state.admin.description || '-';
            }
        },

        methods: {
            _checkDefaultPwd () {
                let me = this;
                co(function * () {
                    let { jsonData } = yield me.$http.get('manage/users/is_admin_password_original');
                    if (!jsonData.success) {
                        me.$showErr(jsonData.msg || _('获取用户信息失败'));
                        return;
                    }
                    if (jsonData.data.original) {
                        let confirmConf = {
                            closeable: false,
                            msg: _('检测到登录密码为系统初始密码，为了系统安全，强烈建议您修改密码！'),
                            buttons: [{
                                actionName: 'submit',
                                text: _('修改密码')
                            }],
                            submit () {
                                me.changePwd();
                            }
                        };

                        if (!jsonData.data.force) {
                            confirmConf.closeable = true;
                            confirmConf.buttons.push('cancel');
                        }

                        me.$confirm(confirmConf);
                    }

                });
            },

            _createPwdFormWindow () {
                if (this.pwdWindow) {
                    return;
                }
                this.pwdWindow = this.$modal(PwdForm, {
                    title: _('修改密码'),
                    width: 400,
                    height: 260
                });
            },

            changePwd () {
                let me = this;
                this._createPwdFormWindow();
                this.pwdWindow.open({
                    reset: true,
                    data: {
                        id: window.BBC.user.id,
                        name: window.BBC.user.name
                    },
                    submit () {

                        /* eslint-disable */
                        let pwdData = me.pwdWindow.formRoot.$data;
                        let encryptOldPwd = encrypt(pwdData.login_password);
                        let encryptPwd = encrypt(pwdData.password);

                        me.pwdWindow.$mask();
                        co(function * () {
                            let { jsonData } = yield me.$http.put('manage/users/user', JSON.stringify({
                                id: pwdData.id,
                                name: pwdData.name,
                                login_password: encryptOldPwd,
                                password: encryptPwd,
                                rePassword: encryptPwd
                            }));

                            me.pwdWindow.$unmask();
                            if (!jsonData.success) {
                                me.$showErr(jsonData.msg || _('修改密码失败'));
                                return;
                            }
                            me.pwdWindow.hide();
                            me.$ok(jsonData.msg || _('修改密码成功'));

                            relogin();
                        });
                    }
                });
            }
        }
    };
</script>
