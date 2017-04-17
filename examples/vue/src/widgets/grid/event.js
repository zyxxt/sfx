/**
 * Created by ued on 2016/12/14.
 */

export default {

    methods: {

        /**
         * 分发事件
         * @param {String} eventName 事件名称
         * @param {Array} args       参数列表
         * @return {VueComponent}    this
         */
        fireEvent (eventName, ...args) {
            this.beforeEvent(eventName, ...args);
            return this.$emit('event', eventName, ...args);
        },

        beforeEvent () {

        }

    }
};
