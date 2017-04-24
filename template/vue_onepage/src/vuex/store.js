/**
 * Created by ued on 2016/11/4.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';
import admin from './modules/admin';
import branch from './modules/branch';

Vue.use(Vuex);
const DEBUG = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({

    strict: DEBUG,
    plugins: DEBUG ? [ createLogger() ] : [],

    modules: {
        branch,
        admin
    },
    actions
});
