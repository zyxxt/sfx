
<template>
    <transition :name="transition"
                @enter="onEnter"
                @leave="onLeave"
                @after-enter="onAfterEnter"
                @after-leave="onAfterLeave">
        <div class="layer"
             v-show="!hidden"
             :class="[cls, !arrowHide ? 'layer-with-arrow' : '']"
             :id="id"
             :style="{ width: width + 'px', height: height + 'px'}"
             :disabled="disabled"
             ref="layer">

            <i v-show="closeable" class="fa fa-close layer-close" @click="hide"></i>

            <div v-show="title" class="layer-header" :style="titleHeight">
                <span class="layer-title" v-html="title"></span>
            </div>

            <div v-if="!autoScroll" class="layer-body">
                <slot></slot>
            </div>

            <div v-else class="layer-body" :style="{width: bodyWidth + 'px', height: bodyHeight + 'px'}">
                <sf-scrollbar ref="layerScrollbar">
                    <slot></slot>
                </sf-scrollbar>
            </div>

            <div v-if="!arrowHide" class="layer-arrow"></div>
        </div>
    </transition>
</template>

<style lang="stylus">
    @import './layer_arrow.styl';

    beforeColor = #ccc;
    afterColor = #fff;
    beforeOffset = -13px;
    afterOffset = -12px;

    .layer
        position: absolute;
        border-radius: 4px;
        background: #fff;
        border: 1px solid #ccc;
        color: #000;
        font-size: 12px;
        line-height: 1.2;
        opacity: 1;

        &[x-placement^="top"]
            margin-bottom: 0;
            &.layer-with-arrow
                margin-bottom: 10px;

        &[x-placement^="right"]
            margin-left: 0;
            &.layer-with-arrow
                margin-left: 10px;

        &[x-placement^="bottom"]
            margin-top: 0;
            &.layer-with-arrow
               margin-top: 10px;

        &[x-placement^="left"]
            margin-right: 0;
            &.layer-with-arrow
                margin-right: 10px;

        .layer-header
            display: inline-block;
            width: 100%;
            border-bottom: 1px solid #ccc;
            padding: 10px 12px;

            .layer-title
                font-size: 14px;

        .layer-body
            width: 100%;
            height: 100%;

        .layer-close
            position: absolute;
            font-size: 16px;
            right: 10px;
            top: 8px;
            cursor: pointer;
            z-index: 10;

    .layer-overlay
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        opacity: 0;
        background: #fff;

    .fade-in-linear-enter-active,
    .fade-in-linear-leave-active {
        opacity: 1;
        transition: opacity 200ms linear;
    }

    .fade-in-linear-enter,
    .fade-in-linear-leave,
    .fade-in-linear-leave-active {
        opacity: 0;
    }
</style>

<script>
    /**
     * Created by ued on 2016/11/22.
     */

    import Vue from 'vue';
    import { isBoolean } from 'src/util/typeof';
    import Component from 'src/widgets/component';
    import PopperJS from 'src/util/third/popper';
    import TriggerEvent from './layer_trigger_event';
    import logger from 'src/util/logger';
    import getZIndex from 'src/util/zindex';

    const TITLE_HEIGHT = 36;

    export default {

        mixins: [
            Component,
            TriggerEvent
        ],

        props: {

            // layer 的标题头
            defaultTitle: {
                type: String
            },

            // 目标dom，layer会根据它定位，也可以是refs的一个引用，这里会通过parent查找
            defaultTarget: {},

            // 对齐方式 (left|right|top|bottom)-(start|end)?
            anchor: {
                type: String,
                'default': 'bottom-start'
            },

            // PopperJS 配置偏移
            offset: {
                'default': 0
            },

            defaultHidden: {
                type: Boolean,
                'default': true
            },

            arrowHide: {
                type: Boolean,
                'default':  true
            },

            // 动画显示时默认样式enter, leave, enter-active， leave-active
            transition: {
                type: String,
                'default': 'fade-in-linear'
            },

            cls: String,

            maxWidth: {
                type: Number,
                'default': 2000
            },

            maxHeight: {
                type: Number,
                'default': 2000
            },

            // 是否显示关闭按钮, 默认为 false
            closeable: {
                type: Boolean,
                'default': false
            },

            // 点击其他地方自动隐藏 Layer, 默认为 true
            autoHide: {
                type: Boolean,
                'default': true
            },

            // 当配置 autoHide 为 false 时，此配置才生效，默认为 true, 一层透明的遮罩
            autoMask: {
                type: Boolean,
                'default': true
            },

            // 是否给内容加上 scrollbar 处理
            autoScrollbar: {},

            autoDestroy: {
                type: Boolean,
                'default': false
            },

            // 是否将 layer 的 dom 节点移到 body 下面，默认为 true
            appendToBody: {
                type: Boolean,
                'default': true
            },

            // PopperJS 配置项
            options: {
                type: Object,
                'default' () {
                    return {
                        gpuAcceleration: false,
                        modifiers: {}
                    };
                }
            }
        },

        data () {
            return {
                title: this.defaultTitle,
                titleHeight: TITLE_HEIGHT,
                bodyWidth: this.width,
                bodyHeight: this.height - (this.defaultTitle ? TITLE_HEIGHT : 0),
                target: this.defaultTarget,
                autoScroll: isBoolean(this.autoScrollbar) ? this.autoScrollbar : !!(this.defaultWidth || this.defaultHeight),
                zIndex: 0
            };
        },

        watch: {
            hidden (value) {
                if (value) {
                    this.$emit('beforeHide');
                    this._doAutoDestroy();
                } else {
                    this.$emit('beforeShow');
                    this.zIndex = getZIndex();
                    this._updatePopper();
                }
            },

            // 如果是target的位置变化，这里将不会生效，最好使用setTarget接口
            target () {
                this._syncTargetToPopper();
            }
        },

        mounted () {
            if (this.trigger === 'click' && !this.autoHide) {
                this.bindClickTarget();
            } else {
                this.bindTarget();
            }
        },

        methods: {
            _createOverlay () {
                let dom = document.createElement('div');
                dom.className = 'layer-overlay';
                dom.style.zIndex = this.zIndex;

                return dom;
            },

            _createPopperJS (target, layer, options) {
                let me = this;
                this.popperJS = new PopperJS(target, layer, options);
                this.popperJS.onCreate(function () {
                    me.$emit('created', me);
                    me.resetTransformOrigin();
                    me.$nextTick(me._updatePopper);
                });
            },

            _getTarget () {
                let target = this.target;

                if (typeof target === 'string') {
                    target = this.$parent.$refs[target];
                    if (!target) {
                        logger.error('can not find target from $parent: ', this.target);
                        return null;
                    }
                }

                if (target instanceof Vue) {
                    target = target.$el;
                }

                return target instanceof window.Element ? target : null;
            },

            _syncTargetToPopper () {
                if (this.popperJS) {
                    this.popperJS.reference = this._getTarget();
                }
            },

            onEnter () {
                this.$emit('enter', this);
                this.$emit('show', this);
                if (this.autoScroll) {
                    this.calClientRect();
                }
            },

            onLeave () {
                this.$emit('leave', this);
                this.$emit('hide', this);
            },

            onAfterEnter () {
                this._updateOverlay();
                this.$emit('afterEnter', this);
                this.$emit('afterShow', this);
            },

            onAfterLeave () {
                this._doAutoDestroy();
                this.$emit('afterLeave', this);
                this.$emit('afterHide', this);
            },

            /**
             * 重新计算 scrollbar 的宽高（如果 layer 没有配置高度，则 scrollbar 根据内容高度自动撑开）
             * */

            calClientRect () {
                let $scrollbar = this.$refs.layerScrollbar;
                let $scrollbody =  $scrollbar.$el.getElementsByClassName('scrollbar-body')[0];
                let extraHeight = this.title ? this.titleHeight : 0;

                this.bodyWidth = Math.min(this.maxWidth, this.defaultWidth || $scrollbody.clientWidth);

                if (!this.defaultHeight) {
                    this.bodyHeight = Math.min(this.maxHeight - extraHeight, $scrollbody.clientHeight);
                } else {
                    this.bodyHeight = Math.min(this.maxHeight, this.defaultHeight) - extraHeight;
                }

                this.$nextTick(() => {
                    $scrollbar.sync();
                });
            },

            _updateOverlay () {
                if (!this.autoHide && this.autoMask) {
                    this.$overlay = this._createOverlay();
                    this.$refs.layer.parentNode.insertBefore(this.$overlay, this.$refs.layer);
                }
            },

            _doAutoDestroy () {
                if (this.$overlay) {
                    this.$overlay.remove();
                    this.$overlay = null;
                }

                if (this.autoDestroy) {
                    this.doDestroy();
                }
            },

            _createPopper () {
                if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.anchor)) {
                    return;
                }
                let options = this.options;
                let popper = this.$refs.layer;
                let target = this._getTarget();

                if (!popper || !target) {
                    return;
                }

                if (this.appendToBody) {
                    document.body.appendChild(this.$refs.layer);
                } else {
                    target.parentNode.appendChild(this.$refs.layer);
                }

                this.doDestroy();

                options.placement = this.anchor;
                options.modifiers.offset = {
                    offset: this.offset
                };

                this._createPopperJS(target, popper, options);
            },

            _updatePopper () {
                this.popperJS ?
                    this.popperJS.update() :
                    this._createPopper();

                this.popperJS.popper.style.zIndex = this.zIndex;

            },

            doDestroy () {
                if (!this.popperJS) {
                    return;
                }
                if (this.popperJS.destroy) {
                    this.popperJS.destroy();
                }
                this.popperJS = null;
            },

            destroyPopper () {
                if (this.popperJS) {
                    this.resetTransformOrigin();
                }
            },

            resetTransformOrigin () {
                let placementMap = {
                    top: 'bottom',
                    bottom: 'top',
                    left: 'right',
                    right: 'left'
                };
                let placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0];
                let origin = placementMap[placement];
                this.popperJS.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ?
                    `center ${origin}` :
                    `${origin} center`;
            },

            hide () {
                this.hidden = true;
            },

            /**
             * 调用该方法会顺便绑定事件
             * @param {Element} target 目标dom节点
             */
            setTarget (target) {
                this.unbindTarget();
                this.alignTo(target);
                this.bindTarget();
            },

            /**
             * 调用该方法只会定个位，不会绑事件
             * @param {Element} target 目标dom节点
             */
            alignTo (target) {
                this.target = target;
                this._syncTargetToPopper();
            }
        }
    };
</script>
