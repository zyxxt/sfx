/**
 * Created by ued on 2016/11/4.
 */

import 'babel-polyfill';

import Vue from 'vue';
import Vuex from 'vuex';

//import * as actions from './actions';

import form from './modules/form';

Vue.use(Vuex);
export default new Vuex.Store({

    strict: process.env.NODE_ENV !== 'production',

    modules: {
        form
    }
});
