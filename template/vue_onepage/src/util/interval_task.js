/**
 * Created by ued on 2017/1/11.
 */

import { sleep, clearSleep } from 'src/util/timer';
import uuid from 'src/util/uuid';

const STATE = {
    STOPPED: 1,
    RUNNING: 2,
    WAITING: 3
};

function createCallback (task) {
    let next = function (success) {
        if (success === false) {
            task.stop();
        } else {
            task.next();
        }
    };

    return function (skipFirst) {
        task.state = STATE.RUNNING;
        if (skipFirst) {
            next(true);
        } else {
            task.fn.call(task.scope || task, next);
        }
    };
}

export default class IntervalTask {

    static STATE = STATE;

    constructor (opt = {}) {
        this.skipFirst = !!opt.skipFirst;

        this.interval = opt.interval || 0;
        this.fn = opt.fn;
        this.scope = opt.scope;
        this.state = STATE.STOPPED;

        if (opt.autoStart) {
            this.start();
        }
    }

    start (skipFirst = this.skipFirst) {
        if (this.state === STATE.STOPPED) {
            this.state = STATE.WAITING;
            createCallback(this)(!!skipFirst);
        }
    }

    stop () {
        if (this.tid) {
            clearSleep(this.tid);
            this.tid = null;
        }

        this.state = STATE.STOPPED;
    }

    next () {
        let me = this;
        if (this.state === STATE.RUNNING) {
            this.state = STATE.WAITING;

            this.tid = uuid();
            sleep(this.tid, this.interval).then(function () {
                createCallback(me)();
            });
        }
    }

}
