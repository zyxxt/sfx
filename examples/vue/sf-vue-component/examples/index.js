/**
 * Created by ued on 2016/11/7.
 */

import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

import store from 'src/vuex/store';
import App from './app.vue';

import SFVueComponent from 'sf-vue-component';

import * as Ajax from 'src/util/ajax';

import { apply } from '../src/util/apply';

import Button from './button/button.vue';
import Form from './form/form.vue';
import Panel from './panel/panel.vue';
import Checkbox from './form/checkbox.vue';
import Textfield from './form/textfield.vue';
import Textarea from './form/textarea.vue';
import Fileupload from './form/fileupload.vue';
import Select from './form/select.vue';
import SelectTree from './form/select_tree.vue';
import Datefield from './form/datefield.vue';
import Tooltip from './tips/tooltip.vue';
import ProgressBar from './progress/progress_bar.vue';
import ECharts from './chart/e_charts.vue';
import HighCharts from './chart/high_charts.vue';
import Layer from './services/layer.vue';
import Scrollbar from './services/scrollbar.vue';
import Table from './grid/table.vue';
import Tree from './tree/tree.vue';
import TabPanel from './tabpanel/tabpanel.vue';
import Menu from './menu/menu.vue';
import Modal from './modal/modal.vue';
import Datepicker from './datepicker/datepicker.vue';
import Notify from './notify/notify.vue';
import Breadcrumb from './breadcrumb/breadcrumb.vue';
import Mask from './mask/mask.vue';


Vue.use(VueRouter);
Vue.use(SFVueComponent, {
    lang: 'zh-CN'
    //lang: 'en'
});

// 初始化 ajax
Ajax.init();

const router = new VueRouter({
    routes: [
        { path: '/chart/echarts', component: ECharts },
        { path: '/chart/highcharts', component: HighCharts },
        { path: '/button', component: Button },
        { path: '/panel', component: Panel },
        { path: '/form', component: Form },
        { path: '/form/checkbox', component: Checkbox },
        { path: '/form/textfield', component: Textfield },
        { path: '/form/textarea', component: Textarea },
        { path: '/form/fileupload', component: Fileupload },
        { path: '/form/select', component: Select },
        { path: '/form/select_tree', component: SelectTree },
        { path: '/form/datefield', component: Datefield },
        { path: '/tips/tooltip', component: Tooltip },
        { path: '/progress/progressBar', component: ProgressBar },
        { path: '/services/layer', component: Layer },
        { path: '/services/scrollbar', component: Scrollbar },
        { path: '/grid/table', component: Table },
        { path: '/tree/tree', component: Tree },
        { path: '/tabPanel/tabpanel', component: TabPanel},
        { path: '/menu/menu', component: Menu},
        { path: '/modal/modal', component: Modal},
        { path: '/datepicker/datepicker', component: Datepicker},
        { path: '/notify/notify', component: Notify},
        { path: '/breadcrumb/breadcrumb', component: Breadcrumb},
        { path: '/Mask/Mask', component: Mask}
    ],
    redirect: {
        '/': '/form'
    }
});

/* eslint-disable no-new */
export default new Vue({
    router,
    store,
    template: '<app />',
    components: apply({
        App
    })
}).$mount('#app');
