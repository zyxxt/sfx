/**
 * Created by ued on 2016/11/4.
 */

// Action 提交的是 mutation，而不是直接变更状态

import * as TYPES from './mutation_types';

export function setBranchInfoList ({ commit }, branchList) {
    return commit(TYPES.SET_BRANCH_INFO_LIST, branchList);
}

export function updateAdminDescription ({ commit }, description) {
    commit(TYPES.UPDATE_ADMIN_DESCRIPTION, description);
}
