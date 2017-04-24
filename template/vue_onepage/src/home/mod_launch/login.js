/**
 * Created by ued on 2016/12/2.
 */

// 所有页面的总入口

import Vue from 'vue';
import 'babel-polyfill';

import SFVueComponent from 'sf-vue-component';
import 'sf-vue-component/dist/static/css/widgets.css';

import Language from 'src/i18n/index';

import * as Ajax from 'src/util/ajax';

//import logger from 'src/util/logger';

import store from 'src/vuex/store';

//import 'src/home/mod_common/style/common.css';

import Login from '../mod_login/login.vue';

let i18n = {
    lang: 'en'
};

// 初始化 ajax
Ajax.init();

// 初始化组件列表
Vue.use(SFVueComponent, i18n);

// 初始化i18n
Vue.use(Language, i18n);

/**
 * 页面入口
 */
export function init () {

    /* eslint-disable no-new */
    let app = new Vue({
        store,
        template: '<login />',
        components: {
            Login
        }
    });
    app.$mount('#app');
}

init();
