/**
 * Created by ued on 2017/3/6.
 */

import logger from 'src/util/logger';
import taskList from './task_list';
import './branch';

export function run () {

    logger.log('[intervalTask] run task...');

    for (let [ key, task ] of taskList) {
        logger.log(`[intervalTask] run task: ${key}`);
        task.run();
    }
}
