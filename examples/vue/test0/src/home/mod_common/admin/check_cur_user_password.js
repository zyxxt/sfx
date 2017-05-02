/**
 * Created by ued on 2017/2/25.
 */

import Vue from 'vue';
import co from 'src/util/co_not_reject';
import { encrypt } from 'src/util/rsa';

const FIVE_MINU = 300000;
let lastPwd;
let lastPwdTime;

let pwdConfirmBox;
let vm = new Vue({

});

function resetStatus () {
    lastPwdTime = null;
}

function createCheckPwdConfimMsg (callback) {
    let BodyComponent = Vue.extend({
        template: `
                <sf-form ref="form" class="no-padding">
                    <sf-form-item>
                        <sf-fieldlabel label-align="top">
                            ${_('请输入当前登录用户的密码确认身份')}                    
                        </sf-fieldlabel>    
                        <sf-textfield @keydown.native.enter="onSubmit" 
                                      v-model="password" 
                                      ref="admin" 
                                      type="password" 
                                      :allowBlank="false"
                                      :default-width="254" :placeholder="placeHolderText"></sf-textfield>
                    </sf-form-item>
                </sf-form>
            `,
        data () {
            return {
                placeHolderText: _('请输入当前登录用户的密码'),
                password: ''
            };
        },
        methods: {
            onSubmit () {
                let vm = this;
                if (!vm.$refs.form.isValid()) {
                    vm.$showErr(vm.$refs.form.getInvalidMsgs());
                    return;
                }

                if (pwdConfirmBox) {
                    pwdConfirmBox.$mask();
                }

                /* eslint-disable */
                return co(function * () {
                    let { jsonData } = yield vm.$http.post('manage/users/check_cur_user_password', JSON.stringify({
                        password: encrypt(vm.password)
                    }));

                    if (pwdConfirmBox) {
                        pwdConfirmBox.$unmask();
                    }
                    if (!jsonData.success || !jsonData.data.valid) {
                        vm.$showErr(jsonData.msg || _('用户密码错误'));
                        resetStatus();
                        callback(false, vm.password);
                        return false;
                    }

                    lastPwdTime = +new Date();
                    lastPwd = vm.password;
                    callback(true, vm.password);
                    return true;
                });

                /* eslint-enable */
            }
        }
    });
    return new BodyComponent({
        el: document.createElement('div')
    });
}


export default function checkCurUserPassword (callback, force = false) {
    if (!lastPwdTime || +new Date() - lastPwdTime > FIVE_MINU/*超过5分钟*/ || force/*强制提示*/) {
        let msgBody = createCheckPwdConfimMsg(function (success, password) {
            callback(success, password, pwdConfirmBox);
        });

        pwdConfirmBox = vm.$confirm({
            autoClose: false,
            msg: msgBody,
            title: _('确认'),
            height: 230,
            callback (actionName) {
                if (actionName === 'submit') {
                    msgBody.onSubmit();
                    if (force) {
                        resetStatus();
                    }
                }
            }
        });
        return;
    }
    callback(true, lastPwd, pwdConfirmBox);
}
