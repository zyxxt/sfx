
<template>
    <div class="scrollbar-vertical" @click="jump" ref="container">
        <div class="scrollbar-vertical-inner unselectable"
             :class="scrollDown ? 'scrollbar-no-transition' : ''"
             :style="{ height: options.inner + 'px', top: options.movement + 'px', width: scrollWidth + 'px' }"
             @mousedown="onScrollDown" ref="scrollbar"></div>
    </div>
</template>

<style lang="stylus" scoped>
    .scrollbar-vertical
        opacity: .5;
        position: absolute;
        top: 0
        right: 0
        bottom: 0

        background: transparent

        transition: all .5s ease;
        -moz-transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -o-transition: all .5s ease;

        .scrollbar-vertical-inner
            position: relative;
            background: rgba(0,0,0,.5);
            cursor: pointer

            transition: all .5s ease;
            -moz-transition: all .5s ease;
            -webkit-transition: all .5s ease;
            -o-transition: all .5s ease;
            &.scrollbar-no-transition
                -webkit-transition: none;
                -moz-transition: none;
                -ms-transition: none;
                -o-transition: none;
                transition: none;
</style>

<script>
    /**
     * Created by ued on 2016/11/30.
     */

    import { on as bindEvent, off as unbindEvent } from 'wind-dom';

    export default {

        props: {
            options: {
                type: Object,
                'default' () {
                    return {
                        movement: 0,
                        wrap: 0,
                        inner: 0
                    };
                }
            },
            scrollWidth: Number
        },

        data () {
            return {
                scrollDown: false
            };
        },

        methods: {
            jump (e) {
                const AVG = 2;
                let isContainer = e.target === this.$refs.container;

                if (!isContainer) {
                    return;
                }

                // 计算出相对依稀
                let position = this.$refs.scrollbar.getBoundingClientRect();
                let avg = (this.options.inner / AVG);
                let offset = e.pageY - (position.top + avg);

                // 滚动条本身需要的偏移量
                let scrollTo = this.options.movement + offset;

                // 转化为内容的实际偏移量
                scrollTo = this._barOffset2Real(scrollTo);
                this._scrollTo(scrollTo);
            },

            onScrollDown (e) {
                this.scrollDown = true;
                this.startMoveStatus = {
                    movement: this.options.movement,
                    eventY: e.pageY
                };

                this.$emit('dragstart');
            },

            _onScrollMove (e) {
                let scrollTo = 0;
                if (!this.scrollDown) {
                    return;
                }

                scrollTo = this.startMoveStatus.movement + e.pageY - this.startMoveStatus.eventY;
                scrollTo = this._barOffset2Real(scrollTo);
                this._scrollTo(scrollTo);

                this.$emit('drag', scrollTo);
            },

            _onScrollUp () {
                this.scrollDown = false;
                this.startMoveStatus = null;

                this.$emit('dragend');
            },

            _barOffset2Real (barOffset) {

//                return barOffset * this.options.wrap / this.options.inner;
                return barOffset * (this.options.real - this.options.wrap) / (this.options.wrap - this.options.inner);
            },

            _scrollTo (to) {
                this.$emit('positionChange', to, 'vertical');
            }
        },

        created () {
            bindEvent(document.body, 'mousemove', this._onScrollMove);
            bindEvent(document.body, 'mouseup', this._onScrollUp);
        },

        beforeDestroy () {
            unbindEvent(document.body, 'mousemove', this._onScrollMove);
            unbindEvent(document.body, 'mouseup', this._onScrollUp);
        }
    };
</script>
