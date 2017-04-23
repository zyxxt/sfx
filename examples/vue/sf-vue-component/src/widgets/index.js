/**
 * Created by ued on 2016/11/2.
 */

import { apply } from 'src/util/apply';
import { capitalize } from 'src/util/format';

import Vue from 'vue';

import QuickTip from './tips/qtip';

// 引入UI组件
import Component from './component';
import JsonField from './form/json_field';

import PanelComponents from './panel/index';
import FormComponents from './form/index';
import ButtonComponents from './button/index';
import ChartComponents from './chart/index';
import SevicesComponents from './services/index';
import ProgressComponents from './progress/index';
import Toolbar from './toolbar/index';
import Grid from './grid/index';
import Tree from './tree/index';
import TabPanelComponents from './tabpanel/index';
import Menu from './menu/index';
import Modal from './modal/index';
import Datepicker from './datepicker/index';
import Notify from './notify/index';
import Breadcrumb from './breadcrumb/index';
import Mask from './mask/index';

import logger from 'src/util/logger';

const PREFIX = 'Sf';

// 公共接口
let Components = {
    Component,
    JsonField
};

/**
 * 注册组件
 * @param {Object} Vue Vue
 * @param {Object} components 组件hash
 * @return {Boolean} 成功
 */
function registComponents (Vue, components) {
    logger.log('regist Cmoponents');
    Object.keys(components).forEach((key) => {
        let componentID = PREFIX + capitalize(key);
        logger.log(`regist Component: ${componentID}`);
        Vue.component(componentID, components[key]);
        components[componentID] = components[key];
        delete components[key];
    });
    return true;
}

let initQuickTip = function () {
    QuickTip.init();
};

/* eslint-disable sfchecklist/max-coupling */
let initComponent = function () {
    let All = {};

    // 注册所有的vue组件
    apply(
        All,
        ChartComponents,
        ButtonComponents,
        PanelComponents,
        FormComponents,
        ProgressComponents,
        SevicesComponents,
        Toolbar,
        Grid,
        Tree,
        TabPanelComponents,
        Menu,
        Modal,
        Datepicker,
        Notify,
        Breadcrumb,
        Mask
    );
    registComponents(Vue, All);

    //
    apply(Components, All);
};

/* eslint-enable sfchecklist/max-coupling */

/**
 * 初始化
 * @return {Object} 返回组件hash
 */
function init () {
    initQuickTip();
    initComponent();
    return Components;
}

// 导出
export {
    init
};
