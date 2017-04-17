/**
 * Created by ued on 2016/12/3.
 */

import Vue from 'vue';

Vue.directive('focus', {
    inserted (dom) {
        dom.focus();
    }
});
