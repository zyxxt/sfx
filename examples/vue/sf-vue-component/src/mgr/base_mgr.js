/**
 * Created by ued on 2017/1/18.
 */

import Vue from 'vue';

export default class BaseMgr {

    constructor (options) {

        this._init(options);

    }

    _init (options) {
        this.options = options;

        Object.assign(this, {
            $modal: Vue.prototype.$modal,
            $layer: Vue.prototype.$layer,

            $showSuccess: Vue.prototype.$showSuccess,
            $showErr: Vue.prototype.$showErr,
            $showWarn: Vue.prototype.$showWarn,
            $showInfo: Vue.prototype.$showInfo,
            $confirm: Vue.prototype.$confirm,
            $confirmDanger: Vue.prototype.$confirmDanger,
            $confirmDelete: Vue.prototype.$confirmDelete,

            $ok: Vue.prototype.$ok,
            $fail: Vue.prototype.$fail,
            $warn: Vue.prototype.$warn
        });
        Object.assign(this, options);
    }

    $mask (...args) {
        return Vue.prototype.$mask.call(this.page || this.table, ...args);
    }

    $unmask (...args) {
        return Vue.prototype.$unmask.call(this.page || this.table, ...args);
    }

}
