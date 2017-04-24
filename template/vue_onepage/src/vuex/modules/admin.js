/**
 * Created by ued on 2016/11/4.
 */

import * as TYPES from '../mutation_types';

let state = {
    description: ''
};

let mutations = {
    [TYPES.UPDATE_ADMIN_DESCRIPTION] (state, description) {
        state.description = description;
    }
};

export default {
    state,
    mutations
};
