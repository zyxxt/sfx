
<template>
    <div class="sf-panel"
         :class="[headerHide ? 'sf-panel-none-header' : '']"
         :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled">

        <div v-if="!headerHide" class="sf-panel-header">
            <div v-if="tools && tools.length" class="sf-panel-tool pull-right">
                <i v-for="tool in tools"
                   class="fa hand"
                   :class="tool.class"
                   actionName="tool.actionName" @click="onToolAction($event, tool)"></i>
            </div>
            <div class="sf-panel-title ellipsis">{{title}}</div>
        </div>
        <div class="sf-panel-body">
            <sf-scrollbar>
                <div class="sf-panel-body-inner">
                    <slot>

                    </slot>
                </div>
            </sf-scrollbar>
        </div>
    </div>
</template>

<style lang="stylus">
    .sf-panel
        background: #FFF
        border: solid 1px #DDD
        .sf-panel-header
            height: 44px

        .sf-panel-tool
            padding: 12px 12px 12px 0;
        .sf-panel-title
            padding: 12px
            font-size: 14px
            font-weight: bold

        .sf-panel-body
            padding: 0
            height: calc(100% - 44px)
        .sf-panel-body-inner
            padding: 12px
    .sf-panel-none-header .sf-panel-body
        height: 100%;
</style>

<script>
    /**
     * Created by ued on 2017/1/5.
     */

    import Component from 'src/widgets/component';

    export default {

        mixins: [
            Component
        ],

        props: {

            headerHide: Boolean,

            title: String,

            tools: Array
        },

        data () {
            return {

            };
        },

        methods: {

            /**
             * 工具栏的按钮处理
             * @param {Event} event   点击事件
             * @param {Object} option tool配置
             */
            onToolAction (event, option) {
                if (typeof option.handler === 'function') {
                    option.handler();
                }
                if (option.actionName) {
                    let fn = this.$parent[option.actionName];
                    if (fn && typeof fn === 'function') {
                        fn(this, option, event);
                    }
                    this.$emit('action', this, option, event);
                }
            }
        }
    };
</script>