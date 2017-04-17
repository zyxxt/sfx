<template>
    <transition :name="transition" @after-leave="onAfterLeave">
        <div class="layer tooltip"
             :class="[cls, !arrowHide ? 'layer-with-arrow' : '']"
             :id="id"
             :style="{ width: width + 'px', maxWidth: maxWidth + 'px',height: height + 'px' }"
             v-show="!hidden"
             :disabled="disabled"
             ref="layer">
            <div class="tooltip-title" v-if="title">{{title}}</div>
            <div class="tooltip-body" v-if="content" v-html="content"></div>
            <div class="tooltip-body" v-else><slot></slot></div>
            <div v-if="!arrowHide" class="layer-arrow"></div>
        </div>
    </transition>
</template>

<style lang="stylus">
    @import './qtip_arrow.styl';
    .layer.tooltip.qtip
        padding: 8px 10px;
        background: #000;
        color: #fff;
        position: fixed !important;
</style>

<script>
    /**
     * tooltip 浮动提示
     */

    import Layer from '../services/layer/layer.vue';

    export default {

        data () {
            return {
                title: this.defaultTitle,
                content: this.defaultContent
            };
        },

        mixins: [
            Layer
        ],

        props: {
            defaultTitle: {
                type: String,
                'default': ''
            },
            defaultContent: {
                type: String,
                'default': ''
            }
        }
    };
</script>
