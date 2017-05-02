/**
 * Created by ued on 2017/3/6.
 */

import logger from 'src/util/logger';
const TASKS = new Map();

export function regist (name, Task) {
    if (!name) {
        logger.error('[intervalTask] [taskList] Task must have a name');
        return;
    }
    if (TASKS.has(name)) {
        logger.warn(`[intervalTask] [taskList] Task: ${name} is exist`);
    }

    TASKS.set(name, Task);
}

export function unregist (name) {
    if (typeof name === 'string') {
        TASKS.delete(name);
        return;
    }
    for (let { key, value } of TASKS) {
        if (value === name) {
            TASKS.delete(key);
            return;
        }
    }
}

export default TASKS;
