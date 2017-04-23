/**
 * Created by ued on 2017/2/7.
 */

import { cascadeTree } from 'src/util/walk';

export default class CheckState {

    static CHECK_ALL = 'checkAll';
    static CHECK_NONE = 'checkNone';
    static CHECK_PART = 'checkPart';

    /**
     * 构造函数
     * @param {Object} config 需要record, parents, options
     * @constructor
     */
    constructor (config) {

        Object.assign(this, config);
    }

    /**
     * 同步父子节点勾选状态
     */
    syncNodeCheckState () {
        let checkState = this.record.checkState;

        // 分两步，父节点跟子节点处理
        this.updateParentCheckState(checkState);
        this.updateChildrenCheckState(checkState);
    }

    /**
     * 同步父节点勾选状态
     * @param {String} state 当前节点状态
     */
    updateParentCheckState (state) {
        let checkState;
        let l;
        let children;
        let parent;

        let parentIndex = 0;
        while (parentIndex < this.parents.length) {
            parent = this.parents[parentIndex];
            children = parent.children;
            l = children.length;
            checkState = state;

            //如果是勾选，则有一个没勾就说明是半选，如果是不勾选，只有有一个勾就说明是半选
            if (state === CheckState.CHECK_ALL) {
                while (l--) {
                    if (children[l].checkState !== CheckState.CHECK_ALL) {
                        checkState = CheckState.CHECK_PART;
                        break;
                    }
                }
            } else {
                while (l--) {
                    if (children[l].checkState !== CheckState.CHECK_NONE) {
                        checkState = CheckState.CHECK_PART;
                        break;
                    }
                }
            }

            //如果此时的上级已是半选，则结束
            if (checkState === CheckState.CHECK_PART && parent.checkState === CheckState.CHECK_PART) {
                return;
            }

            if (checkState === state) {

                // 子节点全部勾选时是否要勾选父节点
                if (this.options.autoCheckParent || checkState === CheckState.CHECK_NONE/*子节点全不勾时，父节点也不勾*/) {
                    parent.checkState = state;
                } else {

                    // 如果不勾选父节点的话，则改成CHECK_PART
                    if (checkState === CheckState.CHECK_ALL) {
                        parent.checkState = CheckState.CHECK_PART;
                    }
                }
            } else {
                parent.checkState = CheckState.CHECK_PART;
            }
            parentIndex++;
        }
    }

    /**
     * 同步子节点状态
     * @param {String} state 当前节点状态
     */
    updateChildrenCheckState (state) {
        let children = this.record.children;
        if (!Array.isArray(children)) {
            return;
        }
        cascadeTree(children, node => node.checkState = state);
    }

}
