
<template>
    <div>
        <div class="bg"></div>
        <transition name="fade-in-linear">
            <div id="container" v-show="visibility">
                <div id="logo"></div>
                <div id="left-content"></div>
                <div id="right-content">
                    <div id="title"></div>
                    <input type="text"
                           id="user_name"
                           name="user_name"
                           :placeholder="userHolder"
                           v-model="username"
                           ref="username"
                           @keypress.enter="login"
                           :disabled="inputDisabled">

                    <input type="password"
                           id="password"
                           name="password"
                           :placeholder="passHolder"
                           v-model="password"
                           ref="password"
                           @keypress.enter="login"
                           :disabled="inputDisabled">

                    <div id="login-fail-message" v-show="errorMsg">{{errorMsg}}</div>

                    <input type="button"
                           id="login"
                           name="login"
                           v-model="loginText"
                           :disabled="submitDisabled"
                           @click="login">

                    <div id="caplock-message" v-show="caplockMsg">
                        <lang>大写锁定打开</lang>
                    </div>
                </div>
            </div>
        </transition>
        <div v-if="isIEQuirks" class="brw-update">
            <p><lang>您当前处于兼容性视图模式，无法获得良好的体验，请设置为标准模式再尝试登陆！</lang></p>
        </div>
        <div v-if="!checkBrowser() && !isIEQuirks" class="brw-update">
            <p><lang>您所使用的浏览器版本过于陈旧，无法获得良好的体验，建议升级为下面的浏览器：</lang></p>,
            <ol class="down-link">
                <li> <a href="http://www.google.cn/intl/zh-CN/chrome/" class="cr" target="_blank">Chrome 23+</a> </li>
                <li> <a href="http://www.firefox.com.cn/download/" class="ff" target="_blank">Firefox 18+</a> </li>
                <li> <a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" class="ie" target="_blank">IE 10+</a> </li>
            </ol>,
        </div>
        <div id="ft-copyright"></div>
    </div>
</template>

<style>
    .fade-in-linear-enter-active,
    .fade-in-linear-leave-active {
        opacity: 1;
        transition: opacity 500ms linear;
    }

    .fade-in-linear-enter,
    .fade-in-linear-leave,
    .fade-in-linear-leave-active {
        opacity: 0;
    }

</style>

<script>
    /**
     * Created by ued on 2016/12/2.
     */

    import './login.css';
    import co from 'src/util/co_not_reject';
    import { setStorage } from 'src/util/local_storage';
    import capsLock from './capslock';
    import { encrypt } from 'src/util/rsa';

    const CHROME23 = 23;
    const FIREFOX18 = 18;
    const IE10 = 10;
    const IE6 = 6;

    export default {

        data () {
            return {
                year: new Date().getFullYear(),

                username: '',
                password: '',

                loginText: _('登    录'),
                userHolder: _('用户名'),
                passHolder: _('密码'),

                caplockMsg: false,
                errorMsg: '',

                inputDisabled: false,
                submitDisabled: false,

                visibility: false,
                isIEQuirks: false
            };
        },

        created () {
            this.inputDisabled = this.submitDisabled = !this.checkBrowser() || this.isIEQuirks;
        },

        mounted () {
            let me = this;

            this.visibility = true;
            this.posting = false;

            capsLock({
                el: this.$refs.password,
                change: function (bFlag) {
                    if (bFlag) {
                        me.caplockMsg = true;
                    } else {
                        me.caplockMsg = false;
                    }
                }
            });
            this.$refs.username.focus();
        },

        methods: {
            checkBrowser () {
                let ua = navigator.userAgent;
                let mt;

                // isChrome23p
                mt = ua.match(/Chrome\/(\d+)/i);
                if (mt && Number(mt[1]) >= CHROME23) {
                    return true;
                }

                //  isFirefox18p
                mt = ua.match(/Firefox\/(\d+)/i);
                if (mt && Number(mt[1]) >= FIREFOX18) {
                    return true;
                }

                let dm = document.documentMode;

                //  isIE10p
                //  ie10 Trident/6, ie11 Trident/7
                mt = ua.match(/Trident\/(\d)/i);
                if (dm >= IE10 || mt && Number(mt[1]) >= IE6) {
                    this.isIEQuirks = dm < IE10;
                    return true;
                }

                return false;
            },

            login () {
                if (this.posting) {
                    return;
                }
                let username = this.username.trim();
                let password = this.password.trim();
                if (!username) {
                    this.errMsg = _('用户名不可为空，请检查。');
                    this.$refs.username.focus();
                    return false;
                }
                if (!password) {
                    this.errMsg = _('密码不可为空，请检查。');
                    this.$refs.password.focus();
                    return false;
                }

                password = encrypt(password);

                this.username = username;
                this.password = password;

                this.loginText = _('正在验证用户信息...');
                this.submitDisabled = true;
                this._doLogin({username, password});
            },

            _doLogin (data) {
                let me = this;

                me.posting = true;

                co(function * () {
                    let { jsonData } = yield me.$http.post('login', JSON.stringify(data));
                    me.posting = false;

                    if (!jsonData.success) {
                        me.errorMsg = jsonData && jsonData.msg || _('登录失败');
                        me.password = '';

                        me.submitDisabled = false;
                        me.loginText = _('登    录');
                        return;
                    }

                    if (process.env.NODE_ENV === 'development') {
                        const CSRF_KEY = 'CSRFPreventionToken';
                        setStorage(CSRF_KEY, jsonData[CSRF_KEY]);
                        window.location.href = `./${window.location.search}#/index`;
                    } else {
                        window.location.href = `./index${window.location.search}#/index`;
                    }
                });
            }
        }
    };
</script>
