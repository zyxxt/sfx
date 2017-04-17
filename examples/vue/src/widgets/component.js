/**
 * Created by ued on 2016/11/1.
 */

import uuid from 'src/util/uuid';
import logger from 'src/util/logger';
import { cascadeComponent } from 'src/util/walk';

export default {

    //beforeCreate () {
    //    logger.log(`component before create...${this.id}`);
    //},
    //created () {
    //    logger.log(`component created...${this.id}`);
    //},
    //
    //beforeMount () {
    //    logger.log(`component before mount...${this.id}`);
    //},

    mounted () {
        this.$isMounted = true;
    },

    //
    //beforeUpdate () {
    //    logger.log(`component before update...${this.id}`);
    //},
    //updated () {
    //    logger.log(`component mounted...${this.id}`);
    //},
    //
    //
    //beforeDestroy () {
    //    logger.log(`component beforeDestroy...${this.id}`);
    //},
    //
    //destroyed () {
    //    logger.log(`component destroyed...${this.id}`);
    //},

    data () {
        return {
            id: uuid(),
            width: this.defaultWidth,
            height: this.defaultHeight,
            disabled: this.defaultDisabled,
            hidden: this.defaultHidden
        };
    },

    props: {
        cls: {},
        defaultHidden: {
            type: Boolean,
            'default': false
        },
        defaultDisabled: Boolean,
        defaultWidth: [Number, String],
        defaultHeight: Number
    },

    computed: {

    },


    methods: {

        /**
         * 获取组件id
         * @return {String} id
         */
        getId () {
            return this.id;
        },

        /**
         * 禁用
         * @param {Boolean} silent 是否抛出事件
         */
        disable (silent = false) {
            if (this.disabled) {
                return;
            }
            this.disabled = true;
            if (!silent) {
                this.$emit('disable', this);
            }
        },

        /**
         * 启用
         * @param {Boolean} silent 是否抛出事件
         */
        enable (silent = false) {
            if (!this.disabled) {
                return;
            }
            this.disabled = false;
            if (!silent) {
                this.$emit('enable', this);
            }
        },

        /**
         * 显示
         * @param {Boolean} silent 是否抛出事件
         */
        show (silent) {
            this.hidden = false;
            logger.log('show component...');
            if (!silent) {
                this.$emit('show', this);
            }
        },

        /**
         * 隐藏
         * @param {Boolean} silent 是否抛出事件
         */
        hide (silent) {
            this.hidden = true;
            logger.log('hide component...');
            if (!silent) {
                this.$emit('hide', this);
            }
        },

        /**
         * 判断组件是否显示，会向上遍历组件树，对于dom中自己设置的则无法处理
         * @return {Boolean} 是否显示
         */
        isVisibility () {
            let visibility = true;
            let p = this;
            while (p) {
                if (p.hidden) {
                    visibility = false;
                    break;
                }
                p = p.$parent;
            }
            return visibility;
        }
    },

    watch: {

        /**
         * 当组件隐藏或显示时，向所有子组件通知消息
         */
        hidden () {
            let me = this;
            this.$nextTick(function () {
                cascadeComponent(me, (child) => {
                    return child.$emit('parentvisibilitychange', me);
                });
            });
        },

        /**
         * 外部单向绑定触发
         * @param {Boolean} value 隐藏显示
         */
        defaultHidden (value) {
            this.hidden = value;
        },

        /**
         * 外部单向绑定触发
         * @param {Boolean} value 启用禁用
         */
        defaultDisabled (value) {
            this.disabled = value;
        },

        /**
         * 外部单向绑定触发
         * @param {Boolean} value 宽度
         */
        defaultWidth (value) {
            this.width = value;
        },

        /**
         * 外部单向绑定触发
         * @param {Boolean} value 高度
         */
        defaultHeight (value) {
            this.height = value;
        }
    }
};
