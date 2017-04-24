/**
 * Created by ued on 2017/3/6.
 */

import Vue from 'vue';
import { regist } from './task_list';
import co from 'src/util/co_not_reject';
import IntervalTask from 'src/util/interval_task';

const INTERVAL = 30000;
let vm = new Vue();

class Branch {

    constructor (options) {
        this.task = new IntervalTask(Object.assign({
            interval: INTERVAL,
            fn: this.getBranchInfo.bind(this)
        }, options));
    }

    getBranchInfo () {
        let me = this;
        return co(function * () {
            let { jsonData } = yield vm.$http.get('branch/get_branch_info');
            me.task.next();
            if (!jsonData.success) {
                vm.$showErr(jsonData.msg);
                return;
            }
            window.BBC.$root.$store.dispatch('setBranchInfoList', jsonData);
        });
    }

    run () {
        this.task.start();
    }

    stop () {
        this.task.stop();
    }

}

regist('branch', new Branch());
