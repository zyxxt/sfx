/**
 * Created by ued on 2016/11/4.
 */

// just for test

const STATE = {
    jsonValue: ''
};

const MUTATIONS = {
    'form/UPDATE' (state, abc) {
        STATE.jsonValue = abc;
    }
};

export default {
    STATE,
    MUTATIONS
};
