/**
 * Created by ued on 2016/11/4.
 */

/**
 * just for test
 * @param {Function} dispatch           分发
 * @param {*}        $jsonForm          参数
 */
export function updateJsonField ({ dispatch }, $jsonForm) {
    dispatch('form/UPDATE', $jsonForm);
}
