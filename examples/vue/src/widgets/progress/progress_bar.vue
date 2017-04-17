
<template>
    <div class="progress-bar-wrap"
         :class="[cls, 'progress-bar-text-align-' + textAlign]"
         :id="id"
         :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled">
        <div class="progress-bar-inner" :style="{background: backColor}">
            <div class="progress-bar" :style="{ width: value * 100 + '%', background: frontColor }">
                <div class="progress-text" v-show="!textHidden" :style="{ width: value * 100 + '%' }">
                    <div class="progress-inner-text" :style="{ width: 1 / value * 100 + '%', 'line-height': height + 'px'}">{{text}}</div>
                </div>
            </div>
            <div class="progress-text progress-text-back" :style="{color: frontColor, 'line-height': height + 'px'}" v-show="!textHidden">
                <div class="progress-inner-text">{{text}}</div>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .progress-bar-wrap
        overflow: hidden
        width: 400px
        height: 22px
        display: inline-block
        vertical-align: middle

        .progress-bar-inner
            height: 100%
            background: #EEE
            position: relative
            .progress-bar
                float: left
                background-color: rgb(24, 193, 198)
                .progress-text
                    z-index: 99
            .progress-text
                overflow: hidden
                position: absolute
                color: #FFF
                left: 0
                width: 100%
                font-size: 14px
                .progress-inner-text
                    padding: 1px 5px

                &.progress-text-back
                    color: rgb(24, 193, 198)
    .progress-bar-text-align-left
        .progress-text
            text-align: left
    .progress-bar-text-align-right
        .progress-text
            text-align: right
    .progress-bar-text-align-center
        .progress-text
            text-align: center
</style>

<script>
    /**
     * Created by ued on 2016/11/9.
     * 进度条
     */

    import Component from 'src/widgets/component';
    import Field from 'src/widgets/form/json_field';

    export default {

        mixins: [
            Component,
            Field
        ],

        props: {
            frontColor:  String,
            backColor: String,

            textHidden: {
                type: Boolean,
                'default': false
            },
            textAlign: {
                type: String,
                'default': 'left'
            },

            renderer: Function
        },

        methods: {
            _renderText (value) {
                const DECIMAL = 100;
                if (typeof this.renderer === 'function') {
                    return this.renderer.call(this, value);
                }
                return Math.round((value || 0) * DECIMAL) + ' %';
            }
        },

        computed: {
            text () {
                return this._renderText(this.value);
            }
        },

        data () {
            return {

            };
        },

        watch: {
            value (value) {
                this.text = this._renderText(value);
                this.$emit('input', value);
            }
        }
    };
</script>
