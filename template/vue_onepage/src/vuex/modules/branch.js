/**
 * Created by ued on 2017/3/4.
 */

import * as TYPES from '../mutation_types';

let state = {
    branchList: []
};

let mutations = {
    [TYPES.SET_BRANCH_INFO_LIST] (state, branchList) {
        state.branchList = branchList;
    }
};

export default {
    state,
    mutations
};
