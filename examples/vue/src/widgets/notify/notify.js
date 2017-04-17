/**
 * Notify 浮动层提示
 * */

import Vue from 'vue';
import { sleep, clearSleep } from 'src/util/timer';
import { htmlEncode } from 'src/util/format';
import uuid from 'src/util/uuid';
import './notify.css';

const DELAY_HIDE = 5000;
let notifyWrapDom;

function getNotifyInfoByType (type) {
    let map = {
        ok: {
            cls: 'sf-notify-ok',
            iconCls: 'fa-check',
            autoHide: true
        },
        fail: {
            cls: 'sf-notify-fail',
            iconCls: 'fa-warning',
            autoHide: false
        },
        warn: {
            cls: 'sf-notify-warn',
            iconCls: 'fa-warning',
            autoHide: false
        }
    };

    return map[type];
}

function createNotify (notifyInfo, msg) {
    let notifyDom = document.createElement('div');

    notifyWrapDom.insertBefore(notifyDom, notifyWrapDom.children[0]);

    return new Vue({
        el: notifyDom,
        template: `
                <transition name="notify-fade">
                    <div class="sf-notify" :class="cls" v-if="!hidden">
                        <i v-if="iconCls" class="fa icon-desc" :class="iconCls"></i>
                        <div class="notify-msg" v-html="msg"></div>
                        <i class="fa fa-remove icon-close" @click="closeNotify"></i>
                    </div>
                </transition>
                `,
        data: {
            hidden: true,
            msg: htmlEncode(msg),
            cls: notifyInfo.cls,
            iconCls: notifyInfo.iconCls
        },
        methods: {
            closeNotify () {
                let me = this;

                me.hidden = true;
            }
        }
    });
}

function delayHide (notify, autoHide) {
    let delayName = uuid('notify');

    sleep(delayName, DELAY_HIDE).then(() => {
        notify.hidden = autoHide;
        clearSleep(delayName);
    });
}

function notify (type) {
    if (!notifyWrapDom) {
        notifyWrapDom = document.createElement('div');
        notifyWrapDom.className = 'sf-notify-wrap';
        notifyWrapDom.innerHTML = '<div></div>';
        document.body.appendChild(notifyWrapDom);
    }

    return (msg) => {
        let notifyInfo = getNotifyInfoByType(type);
        let notify = createNotify(notifyInfo, msg);

        notify.hidden = false;
        delayHide(notify, notifyInfo.autoHide);
    };
}


Vue.prototype.$ok = notify('ok');
Vue.prototype.$fail = notify('fail');
Vue.prototype.$warn = notify('warn');
