/**
 * Created by ued on 2016/11/7.
 */

import Language from './i18n';
import { init as initWidgets } from './widgets/index';
import Mgr from './mgr/index';
import VTypes from 'src/util/vtypes/index';
import logger from 'src/util/logger';
import './common/index.css';

let SFVueComponent = {
    version: process.env.version
};

Object.assign(SFVueComponent, Mgr);

/**
 * 提示install接口，使其成为Vue的插件，初始化：Vue.use(SFVueComponent)
 * @param {Object} Vue vue
 * @param {Object} opt 插件配置项，比如设置语言，以后还会设置主题等
 * @return {Object}    返回已经注册的组件列表
 */
function install (Vue, opt = { lang: 'zh-CN' }) {

    // 设置语言
    SFVueComponent.lang = opt.lang;
    Vue.use(Language, opt);

    // 注册组件
    let Components = initWidgets();
    Object.assign(SFVueComponent, Components, VTypes);

    logger.log('sf-vue-component installed...', SFVueComponent);
    return SFVueComponent;
}

SFVueComponent.install = install;

export default SFVueComponent;
