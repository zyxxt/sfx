/**
 * Created by ued on 2016/11/3.
 */

/**
 * 遍历Vue组件
 * @param {Object} root         VueComponent根节点
 * @param {Function} callback   回调函数，return false时，遍历会被中止
 * @returns {Boolean}           是否全部遍历完成
 */
function cascadeComponent (root, callback) {
    if (root) {
        if (typeof callback === 'function') {
            let ret = callback(root);
            if (ret === false) {
                return ret;
            }
        }
        if (Array.isArray(root.$children) && root.cascadeWithoutChildren !== true) {
            return root.$children.every(function (component) {
                return cascadeComponent(component, callback);
            });
        }
    }
    return true;
}

/**
 * 遍历表单组件
 * @param {Object} root         VueComponent根节点
 * @param {Function} callback   回调函数，return false时，遍历会被中止
 * @returns {Boolean}           是否全部遍历完成
 */
function cascadeJsonField (root, callback) {
    return cascadeComponent(root, function (field) {
        if (field.isJsonField && field.isJsonField()) {
            return callback(field);
        }
    });
}


function cascadeTree (arr, callback) {
    let parents = [];
    let cascade = function (arr, callback) {
        if (!Array.isArray(arr)) {
            return;
        }
        arr.forEach((item, index) => {
            if (callback(item, index, arr, parents.slice()) === false) {
                return;
            }
            if (Array.isArray(item.children) && item.children.length) {

                parents.unshift(item);
                cascade(item.children, callback);
                parents.shift(item);
            }
        });
    };
    return cascade(arr, callback);
}

export {
    cascadeComponent,
    cascadeJsonField,

    cascadeTree
};
