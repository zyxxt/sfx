
<template>
    <div class="scrollbar"
         :class="isDragging ? 'unselectable' : ''"
         :id="id"
         :style="{ width: width + 'px', height: height + 'px' }"
         @wheel="scroll"
         v-show="!hidden"
         :disabled="disabled"
         ref="scrollbarWrap">

        <div class="scrollbar-body"
             :style="{ top: top * -1 +'px', left: left * -1 + 'px' }"
             ref="scrollbarInner">

             <slot></slot>
        </div>

        <sf-scrollbar-vertical class="scrollbar-v"
                               v-show="ready && !autoHeight && vertical.wrap > vertical.inner"
                               :options="vertical"
                               :scrollWidth="scrollWidth"
                               @positionChange="onChangePosition" @dragstart="onDragStart" @dragend="onDragEnd">
        </sf-scrollbar-vertical>

        <sf-scrollbar-horizontal class="scrollbar-h"
                                 v-show="ready && !autoWidth && horizontal.wrap > horizontal.inner"
                                 :options="horizontal"
                                 :scrollWidth="scrollWidth"
                                 @positionChange="onChangePosition" @dragstart="onDragStart" @dragend="onDragEnd">
        </sf-scrollbar-horizontal>
    </div>
</template>

<style lang="stylus">
    .scrollbar
        position: relative
        margin: 0 auto
        overflow: hidden
        height: 100%
        width: 100%
        &:hover
            .scrollbar-v
            .scrollbar-h
                background-color: rgba(0, 0, 0, 0.2)

    .scrollbar-body
        position: absolute;
        transition: all .5s ease;
        -moz-transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -o-transition: all .5s ease;
        min-width: 100%

</style>

<script>
    /**
     * Created by ued on 2016/11/30.
     */

    import Component from 'src/widgets/component';
    import SfScrollbarVertical from './scrollbar_vertical.vue';
    import SfScrollbarHorizontal from './scrollbar_horizontal.vue';

    const SCROLL_WIDTH = 8;

    export default {

        mixins: [
            Component
        ],

        props: {

            // 滚动条最小高度
            minSize: {
                type: Number,
                'default': 40
            },

            // 滚轮一次要滚多远
            speed: {
                type: Number,
                'default': 100
            },

            // 滚动条宽度
            scrollWidth: {
                type: Number,
                'default': SCROLL_WIDTH
            },

            autoHeight: {
                type: Boolean,
                'default': false
            },

            autoWidth: {
                type: Boolean,
                'default': false
            }
        },

        data () {
            return {

                // 页面显示完后，才能计算出dom
                ready: false,

                // 记录滚动的位置
                top: 0,
                left: 0,

                // 纵向滚动条
                vertical: {

                    // 滑块的偏移量
                    movement: 0,

                    // 滚动条的高度，即可视区域的高度
                    wrap: 0,

                    // 滑块的高度
                    inner: 0,

                    // 实际内容的高度
                    real: 0
                },

                // 横向滚动条
                horizontal: {
                    movement: 0,
                    wrap: 0,
                    inner: 0,
                    real: 0
                },

                // 是否正在拖动
                isDragging: false
            };
        },

        components: {
            SfScrollbarVertical,
            SfScrollbarHorizontal
        },

        methods: {

            /**
             * 触发滚轮事件，分三种情况：
             * 1、直接滚动时，如果存在纵向滚动条，则滚动纵向
             * 2、直接滚动时，如果仅存在横向滚动条，则滚动横向
             * 3、按shift滚动时，滚动横向
             * @param {Event} e 滚轮事件
             */
            scroll (e) {

                // 先记录上次位置，如果位置有变化则要preventDefault
                let oldLeft = this.left;
                let oldTop = this.top;

                let num = this.speed;
                let shifted = e.shiftKey;

                // 滚动的偏移量
                let scrollY = e.deltaY > 0 ? num : -(num);
                let scrollX = e.deltaX > 0 ? num : -(num);

                // Mozilla Shifted Wheel~
                if (shifted && !e.deltaX) {
                    this.scrollX = e.deltaY > 0 ? num : -(num);
                }

                let scrollToY = this.top + scrollY;
                let scrollToX = this.left + scrollX;

                // 开始滚动，设置left top，同步更新scrollbar

                // 存在纵向滚动条，并且没有按shift时启用纵向滚动
                if (this.vertical.inner < this.vertical.wrap && !shifted) {
                    this.normalizeVertical(scrollToY);
                    this.moveTheScrollbar();
                }

                // 存在横向滚动条，并且（按住了shift 或者 没有纵向滚动条）时启用横向滚动
                if (this.horizontal.inner < this.horizontal.wrap && (shifted || this.vertical.inner >= this.vertical.wrap)) {

                    // 如果是按shift的话，则用X的值
                    if (shifted) {
                        this.normalizeHorizontal(scrollToX);
                    } else {

                        // 如果仅仅是横向滚动条，那么这里要用Y的值，即 this.left + scrollY
                        scrollToX = scrollToX - scrollX + scrollY;
                        this.normalizeHorizontal(scrollToX);
                    }
                    this.moveTheScrollbar();
                }
                if (this.left !== oldLeft || this.top !== oldTop) {
                    e.preventDefault();
                }
            },

            /**
             * 根据Y更新top
             * @param {Number} scrollToY 滚动到具体的Y
             */
            normalizeVertical (scrollToY) {
                let offsetMore = 0;

                // 出现横向滚动条
                if (this.ready && !this.autoWidth && this.horizontal.wrap > this.horizontal.inner) {
                    offsetMore = this.scrollWidth;
                }

                scrollToY = Math.max(0, scrollToY);
                if (this.vertical.real > this.vertical.wrap) {
                    scrollToY = Math.min(scrollToY, this.vertical.real - this.vertical.wrap + offsetMore);
                    this.top = scrollToY;
                } else {
                    this.top = 0;
                }
            },

            /**
             * 根据X更新left
             * @param {Number} scrollToX 滚动到具体的X
             */
            normalizeHorizontal (scrollToX) {
                let offsetMore = 0;

                // 出现纵向滚动条
                if (this.ready && !this.autoHeight && this.vertical.wrap > this.vertical.inner) {
                    offsetMore = this.scrollWidth;
                }
                scrollToX = Math.max(0, scrollToX);
                if (this.horizontal.real > this.horizontal.wrap) {
                    scrollToX = Math.min(scrollToX, this.horizontal.real - this.horizontal.wrap + offsetMore);
                    this.left = scrollToX;
                } else {
                    this.left = 0;
                }
            },

            /**
             * 更新滚动条内部位置
             */
            moveTheScrollbar () {
                this.vertical.movement = this.top * (this.vertical.wrap - this.vertical.inner) / (this.vertical.real - this.vertical.wrap);
                this.horizontal.movement = this.left * (this.horizontal.wrap - this.horizontal.inner) / (this.horizontal.real - this.horizontal.wrap);
            },

            /**
             * 拖动滚动条时触发
             * @param {Number} scrollTo 具体位置
             * @param {String} orientation 方向（纵向 or 横向）
             */
            onChangePosition (scrollTo, orientation) {
                if (orientation === 'vertical') {
                    this.normalizeVertical(scrollTo);
                }
                if (orientation === 'horizontal') {
                    this.normalizeHorizontal(scrollTo);
                }
                this.moveTheScrollbar();
            },

            /**
             * 根据视窗、内容大小计算滚动条状态
             */
            calculateSize () {
                let scrollbarInner = this.$refs.scrollbarInner;
                let scrollbarWrapper = this.$refs.scrollbarWrap;

                if (!scrollbarInner || !scrollbarWrapper) {
                    return;
                }

                let scrollbarWrapRect = scrollbarWrapper.getBoundingClientRect();
                let scrollbarInnerRect = scrollbarInner.getBoundingClientRect();

                this.vertical.real = scrollbarInnerRect.height;
                this.horizontal.real = scrollbarInnerRect.width;

                this.vertical.inner = scrollbarInnerRect.height > scrollbarWrapRect.height ?
                        Math.max(this.minSize, scrollbarWrapRect.height * scrollbarWrapRect.height / scrollbarInnerRect.height) :
                        scrollbarWrapRect.height;
                this.horizontal.inner = scrollbarInnerRect.width > scrollbarWrapRect.width ?
                        Math.max(this.minSize, scrollbarWrapRect.width * scrollbarWrapRect.width / scrollbarInnerRect.width) :
                        scrollbarWrapRect.width;

                this.vertical.wrap = scrollbarWrapRect.height;
                this.horizontal.wrap = scrollbarWrapRect.width;

                if (this.autoHeight) {
                    this.height = scrollbarInnerRect.height;
                }
                if (this.autoWidth && scrollbarInnerRect.width && scrollbarInnerRect.width > scrollbarWrapRect.width) {
                    this.width = scrollbarInnerRect.width;
                }

                this.ready = true;
            },

            /**
             * 区域内容有更新时，外部使用时要调用此接口重新更新滚动条
             */
            sync () {
                this.calculateSize();
                this.normalizeHorizontal(this.left);
                this.normalizeVertical(this.top);
                this.moveTheScrollbar();
            },

            /**
             * 正在拖动
             */
            onDragStart () {
                this.isDragging = true;
            },

            /**
             * 拖动结束
             */
            onDragEnd () {
                this.isDragging = false;
            }
        },

        watch: {

            /**
             * 水平滚动条变化时触发
             * @param {Number} left 当前位置
             * @param {Number} old  上次位置
             */
            left (left, old) {
                this.$emit('scrollLeft', left, old);
            },

            /**
             * 垂直滚动条变化时触发
             * @param {Number} top 当前位置
             * @param {Number} old  上次位置
             */
            top (top, old) {
                this.$emit('scrollTop', top, old);
            }
        },

        mounted () {
            this.calculateSize();

            // 无法做到当前dom的resize事件，所以这里加在全局上面，销毁时要移除
            window.addEventListener('resize', this.calculateSize);
        },

        destroyDestroy () {
            window.removeEventListener('resize', this.calculateSize);
        }
    };
</script>
