/**
 * Created by ued on 2016/10/31.
 */

// 所有页面的总入口

import 'babel-polyfill';
import Vue from 'vue';
Vue.config.devtools = true;

import Vuex from 'vuex';
import VueRouter from 'vue-router';

import SFVueComponent from 'sf-vue-component';
import 'sf-vue-component/dist/static/css/widgets.css';

import Language from 'src/i18n/index';
import VTypes from 'src/util/vtypes/vtypes';

import * as Ajax from 'src/util/ajax';
import logger from 'src/util/logger';

import store from 'src/vuex/store';

import BbcHeader from './header/header.vue';
import BbcFooter from './footer/footer.vue';
import * as IntervalTask from './interval_task/index';

import 'src/home/mod_common/style/common.css';

let i18n = {
    lang: window.BBC.lang
};

Vue.use(Vuex);

// 初始化 ajax
Ajax.init();

// 初始化路由
Vue.use(VueRouter);

// 初始化组件列表
Vue.use(SFVueComponent, i18n);

// 初始化i18n
Vue.use(Language, i18n);

Vue.use(VTypes);

let router;
let app;
let activeTab = '/index';

/**
 * 初始化页面路由
 * @return {VueRouter} 返回路由
 */
function initRouter () {
    router = new VueRouter({
        routes: [
            {
                name: 'index',
                path: '/index*',
                component (resolve) {
                    require.ensure([], () => resolve(require('../mod_index/welcome.vue')), 'mod_index');
                }
            }

            /*,
            {
                name: 'branch_detail',
                path: '/branch/:branchID',
                component (resolve) {
                    require.ensure([], () => resolve(require('../mod_branch/detail/summary.vue')), 'mod_branch');
                }
            },
            {
                name: 'branch',
                path: '/branch',
                component (resolve) {
                    require.ensure([], () => resolve(require('../mod_branch/branch.vue')), 'mod_branch');
                }
            },
            {
                name: 'alarm',
                path: '/alarm',
                component (resolve) {
                    require.ensure([], () => resolve(require('../mod_alarm/alarm.vue')), 'mod_alarm');
                }
            },
            {
                name: 'report',
                path: '/report',
                component (resolve) {
                    require.ensure([], () => resolve(require('../mod_report/report.vue')), 'mod_report');
                }
            },
            {
                name: 'manager_page',
                path: '/manager/:folder/:file',
                component (resolve) {
                    require.ensure([], () => resolve(require('../mod_manager/manager_distribution.vue')), 'mod_manager');
                }
            },
            {
                name: 'manager',
                path: '/manager',
                component (resolve) {
                    require.ensure([], () => resolve(require('../mod_manager/manager.vue')), 'mod_manager');
                }
            }*/
        ]
    });
    router.beforeEach((to, form, next) => {
        activeTab = to.path;

        // 1、路由匹配不上
        // 2、子路由只提取根路径，高亮导航条
        let match = activeTab.match(/^(\/[^\/]+).*/);
        if (!to.matched || !to.matched.length || !match) {
            next('/index');
            return;
        }
        activeTab = match[1];
        if (app) {
            app.activeTab = activeTab;
        }
        next();
    });
    return router;
}

/**
 * 加载公共模块
 */
function initHFS () {
    logger.log('init HFS');


}

/* eslint-disable sfchecklist/max-coupling */
/**
 * 加载主页面
 */
function initApp () {

    app = new Vue({
        data () {
            return {
                activeTab: activeTab
            };
        },
        router,
        store,
        template: `
            <div id="opa">
                <bbc-header :active-tab="activeTab" ref="headerComp" />
                <div id="body" :class="{maintain: activeTab !== '/index'}">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
                <bbc-footer />
            </div>
        `,
        components: {
            BbcHeader,
            BbcFooter
        }
    });
    app.$mount('#app');
    window.BBC.$root = app;

    // 一些公共的定时任务处理
    IntervalTask.run();
}

/* eslint-enable sfchecklist/max-coupling */

/**
 * 页面入口
 */
export function init () {

    // 初始化路由配置
    initRouter();

    // 加载头部尾部和服务
    initHFS();

    // 加载页面主体
    initApp();
}

init();
