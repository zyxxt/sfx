/**
 * Created by ued on 2016/11/9.
 */

import { on as bindEvent, off as unbindEvent } from 'wind-dom';
import { sleep, clearSleep } from 'src/util/timer';
import uuid from 'src/util/uuid';

let VISIBLE_STATE = {
    hidden : 0,
    hiding: 1,
    visible : 2
};

export default {
    created () {
        this.DELAY_HIDE = 100;
        this.DELAY_HIDE_NAME0 = uuid();
        this.DELAY_HIDE_NAME1 = uuid();
    },

    props: {
        trigger: {
            type: String,
            default: 'click'
        }
    },

    data () {
        return {
            visible: '',
            state: VISIBLE_STATE.hidden
        };
    },

    beforeDestroy () {
        this.unbindTarget();
    },

    watch: {
        content (text) {
            if (!text) {
                this.hidden = true;
            }
        }
    },

    methods: {

        bindTarget: function () {
            let target = this._getTarget();
            if (!target) {
                return;
            }

            // 根据不同的触发方式绑定事件
            let trigger = this.trigger;
            if (trigger === 'click') {
                bindEvent(target, 'click', this._toggle);
                bindEvent(document, 'click', this._documentHide);
            } else if (trigger === 'hover') {
                bindEvent(target, 'mouseenter', this._onMouseIn);
                bindEvent(target, 'mouseleave', this._onMouseOut);
                bindEvent(this.$el, 'mouseenter', this._layerIn);
                bindEvent(this.$el, 'mouseleave', this._layerOut);
            } else if (trigger === 'focus') {

                // focus
                bindEvent(target, 'focus', this._onMouseIn);
                bindEvent(target, 'blur', this._onMouseOut);
            }
        },

        bindClickTarget () {
            let target = this._getTarget();
            if (!target) {
                return;
            }

            bindEvent(target, 'click', this._toggle);
        },

        unbindTarget: function () {
            let target = this._getTarget();
            if (!target) {
                return;
            }

            let trigger = this.trigger;

            if (trigger === 'click') {
                unbindEvent(target, 'click', this._toggle);
                unbindEvent(document, 'click', this._documentHide);
            } else if (trigger === 'hover') {
                unbindEvent(target, 'mouseenter', this._onMouseIn);
                unbindEvent(target, 'mouseleave', this._onMouseOut);
                unbindEvent(this.$el, 'mouseenter', this._layerIn);
                unbindEvent(this.$el, 'mouseleave', this._layerOut);
            } else if (trigger === 'focus') {

                // focus
                unbindEvent(target, 'focus', this._onMouseIn);
                unbindEvent(target, 'blur', this._onMouseOut);
            }
        },

        unbindClickTarget () {
            let target = this._getTarget();
            if (!target) {
                return;
            }

            unbindEvent(target, 'click', this._toggle);
        },

        _documentHide (e) {
            if (this.$el.contains(e.target) || (this._getTarget() && this._getTarget().contains(e.target))) {
                return;
            }
            this.hidden = true;
            this.state = VISIBLE_STATE.hidden;
        },

        _toggle () {
            if (!this.content && !this.$slots.default && this.hidden) {
                return;
            }
            this.hidden = !this.hidden;
        },

        _layerIn () {
            this.state = VISIBLE_STATE.visible;
            clearSleep(this.DELAY_HIDE_NAME0);
        },

        _layerOut () {
            let me = this;

            me.state = VISIBLE_STATE.hiding;

            sleep(this.DELAY_HIDE_NAME0, this.DELAY_HIDE).then(() => {
                if (me.state === VISIBLE_STATE.hiding) {
                    me.hidden = true;
                    me.state = VISIBLE_STATE.hidden;
                }
            });
        },

        _onMouseIn () {
            if (!this.content && !this.$slots.default) {
                return;
            }
            this.hidden = false;
            this.state = VISIBLE_STATE.visible;
            clearSleep(this.DELAY_HIDE_NAME1);
        },

        _onMouseOut () {
            let me = this;

            me.state = VISIBLE_STATE.hiding;

            sleep(this.DELAY_HIDE_NAME1, this.DELAY_HIDE).then(() => {
                if (me.state === VISIBLE_STATE.hiding) {
                    me.hidden = true;
                    me.state = VISIBLE_STATE.hidden;
                }
            });
        }

    }
};

