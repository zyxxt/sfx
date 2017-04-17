/**
 * Messagebox 弹窗组件
 * */

import Vue from 'vue';
import { isObject, isFunction, isString } from 'src/util/typeof';
import { apply } from 'src/util/apply';
import Modal from './modal.js';
import './msgbox.css';

const INFO = 'sf-msgbox-info';
const WARNING = 'sf-msgbox-warn';
const ERROR = 'sf-msgbox-error';
const QUESTION = 'sf-msgbox-question';
const SUCCESS = 'sf-msgbox-success';

function getIcon (type) {
    let map = {
        info: INFO,
        warning: WARNING,
        error: ERROR,
        question: QUESTION,
        success: SUCCESS,
        confirm: QUESTION,
        confirmDanger: QUESTION,
        confirmDelete: QUESTION
    };

    return map[type];
}

function getButtons (type) {
    let map = {
        defaults: [
            {text: _('关闭'), actionName: 'cancel'}
        ],
        confirm: [
            {text: _('确定'), actionName: 'submit'},
            {text: _('取消'), actionName: 'cancel'}
        ],
        confirmDanger: [
            {text: _('确定'), actionName: 'submit', cls:'btn-danger'},
            {text: _('取消'), actionName: 'cancel'}
        ],
        confirmDelete: [
            {text: _('删除'), actionName: 'submit', cls:'btn-danger'},
            {text: _('取消'), actionName: 'cancel'}
        ]
    };

    return map[type];
}

function parseParams (msg, title, callback) {
    return isObject(msg) ? msg : {msg, title, callback};
}

function getMsgboxComp (msg, icon) {
    let msgComp;

    if (isString(msg)) {
        let actionReg = /actionName=[\"\'](\b\w+\b)[\"\']/g;
        let msgTpl = msg.replace(actionReg, s => '@click="clickAction($event,' + s.replace(actionReg, '\'$1\'') + ')"');

        msgComp = Vue.extend({
            template: '<div class="sf-msgbox ' + getIcon(icon) + '">' + msgTpl + '</div>',
            methods: {
                clickAction (e, actionName) {
                    let me = this;
                    me.$emit('msgaction', e, actionName);
                }
            }
        });
    } else {
        msgComp = Vue.extend({
            render (h) {
                return h('div', {'class': 'sf-msgbox ' + getIcon(icon)}, [h(msg)]);
            }
        });
    }

    return msgComp;
}

function getMsgModal (options) {
    let msgboxComponent = getMsgboxComp(options.msg, options.icon);
    let msgboxModal = new Modal(msgboxComponent, apply({
        autoDestroy: true
    }, options));

    msgboxModal.formRoot.$on('msgaction', (e, actionName) => {
        options.callback(actionName);
    });

    apply(msgboxModal.$refs, msgboxModal.formRoot.$refs);

    return msgboxModal;
}

function showMsgboxFn (type) {
    return (msg, title, callback) => {
        let options = parseParams(msg, title, callback);
        let msgModal;

        options.title = options.title || _('提示');
        options.icon = options.icon || type;
        options.buttons = options.buttons || getButtons(type) || getButtons('defaults');

        msgModal = getMsgModal(options);

        msgModal.$on('actionbtn', (actionName) => {
            if (isFunction(options.callback)) {
                options.callback(actionName);
            }
            if (options.autoClose !== false) {
                msgModal.hide();
            }
        });

        msgModal.show();

        return msgModal;
    };
}

Vue.prototype.$showSuccess = showMsgboxFn('success');
Vue.prototype.$showErr = showMsgboxFn('error');
Vue.prototype.$showWarn = showMsgboxFn('warning');
Vue.prototype.$showInfo = showMsgboxFn('info');
Vue.prototype.$confirm = showMsgboxFn('confirm');
Vue.prototype.$confirmDanger = showMsgboxFn('confirmDanger');
Vue.prototype.$confirmDelete = showMsgboxFn('confirmDelete');
