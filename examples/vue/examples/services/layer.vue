
<template>
    <div>
        <h2> sf-layer Demo </h2>

        <div class="layer-demo">
            <p>示例1：指定点击对象显示 layer</p>
            <sf-button ref="button1">点我弹出</sf-button>
            <sf-layer default-target="button1"
                      :default-width="300"
                      :default-height="200">
                <p>我是内容</p>
            </sf-layer>
        </div>

        <div class="layer-demo">
            <p>示例2：各种配置项（弹出方向，最大宽高，是否显示箭头，标题头，是否显示叉叉）</p>
            <sf-button ref="button2">点我弹出</sf-button>
            <sf-layer default-target="button2"
                      default-title="我是标题头"
                      anchor="right-start"
                      :arrow-hide="false"
                      :closeable="true"
                      :default-width="300"
                      :default-height="200"
                      :max-width="400"
                      :max-height="200">
                <p v-for="a in list">我是内容</p>
            </sf-layer>
        </div>

        <div class="layer-demo">
            <p>示例3.autoHide autoMask</p>
            <div>
                <div>点击其他地方不会消失，有透明遮罩</div>
                <sf-button ref="button31">点我弹出</sf-button>

                <sf-layer default-target="button31"
                          :auto-hide="false"
                          :closeable="true"
                          :default-width="250">
                    <info></info>
                </sf-layer>
            </div>
            <div>
                <div>点击其他地方不会消失，无透明遮罩</div>
                <sf-button ref="button32">点我弹出</sf-button>

                <sf-layer default-target="button32"
                          :auto-hide="false"
                          :auto-mask="false"
                          :closeable="true"
                          :default-width="250">
                    <info></info>
                </sf-layer>
            </div>

        </div>

        <div class="layer-demo">
            <p>示例4：内部事件监听（show, hide）</p>
            <sf-button ref="button4">点我弹出</sf-button>

            <sf-layer default-target="button4" ref="layer4">
                <info></info>
            </sf-layer>
        </div>

        <h2> vm.$layer Demo</h2>

        <div class="layer-demo">
            <p>示例5：通过 js 方式构造1</p>
            <sf-button ref="button5">点我弹出</sf-button>
        </div>

        <div class="layer-demo">
            <p>示例6：通过 js 方式构造2</p>
            <sf-button @click="showLayer($event, 'xiaoming')">看看小明的信息</sf-button>
            <sf-button @click="showLayer($event, 'xiaohong')">看看小红的信息</sf-button>
            <sf-button @click="showLayer($event, 'laoqiang')">看看枪王的信息</sf-button>
        </div>

        <div class="layer-demo">
            <p>示例6：在页面任何地方右击试试</p>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .layer-demo
        margin: 20px 0;
</style>

<script>
    /**
     * Created by ued on 2016/11/26.
     */

    import Vue from 'vue';
    import { apply } from 'src/util/apply';
    import { on as bindEvent, off as unbindEvent } from 'wind-dom';
    import Progress from '../progress/progress_bar.vue';
    import Info from './info.vue';
    import logger from 'src/util/logger';

    const INFO_MAP = {
        xiaoming: {label: '小明', high: '172cm', weight: '65kg', age: 1},
        xiaohong: {label: '小红', high: '166cm', weight: '45kg', age: 25},
        laoqiang: {label: '枪王', high: '170', weight: '52kg', age: 30}
    };

    export default {
        data () {
            return {
                list: Array.from({length: 20}),
                infoLayer: null
            };
        },

        components: {
            Info
        },

        mounted () {
            this.bindLayer4Event();

            this.infoLayer1 = this.$layer(Info, {
                target: this.$refs.button5,
                arrowHide: false
            });

            this.infoLayer1.update(INFO_MAP.laoqiang);
        },

        methods: {

            /**
             * 事件触发时机说明：（layer 是渐隐渐显的）
             * beforeXXX: 显示/隐藏之前触发
             * show: 显示/隐藏初始时触发
             * afterXXX: 显示/隐藏完全时触发
             */

            bindLayer4Event () {
                let $layer4 = this.$refs.layer4;

                $layer4.$on('beforeShow', () => {
                    logger.log('beforeShow');
                });

                $layer4.$on('beforeHide', () => {
                    logger.log('beforeHide');
                });

                $layer4.$on('show', () => {
                    logger.log('show');
                });

                $layer4.$on('hide', () => {
                    logger.log('hide');
                });

                $layer4.$on('afterShow', () => {
                    logger.log('afterShow');
                });

                $layer4.$on('afterHide', () => {
                    logger.log('afterHide');
                });
            },

            changeTarget () {
                this.$refs.layer.target = this.$refs.button2.$el;
                this.$refs.layer.hidden = false;
            },

            showDetail (e) {
                let name = e.target.getAttribute('name');
                let data = INFO_MAP[name];


                if (!this.infoLayer) {
                    this.infoLayer = this.$layer(Info, {
                        anchor: 'right-start',
                        autoHide: false,
                        autoMask: false,
                        title: '显示标题'
                    });

                    this.infoLayer.formRoot.$on('submitdata', (data) => {
                        alert('提交数据\n' + JSON.stringify(data));
                    });

                    this.infoLayer.formRoot.$on('cancel', () => {
                        this.infoLayer.hide();
                    });
                }

                this.infoLayer.update(data);
                this.infoLayer.setTitle(data.label);
                this.infoLayer.showTo(e.target);
            },

            showLayer (e, name) {
                if (!this.infoLayer) {

                    this.infoLayer = this.$layer(Info, {

                        // 这里的配置项参考 sf-layer 的大部分的配置项。
                        // 不同的配置有：width, height, target, title, 这些是不需要加 default 前缀的
                        arrowHide: false,
                        closeable: true
                    });

                    this.infoLayer.update();
                }

                let data = INFO_MAP[name];

                // 改变数据
                this.infoLayer.update(data);

                // 改变标题头
                this.infoLayer.setTitle(data.label);

                // 显示定位
                this.infoLayer.showTo(e.target);
            }
        },

        created () {
            let me = this;
            let layer;
            bindEvent(document.body, 'contextmenu', function (event) {
                if (layer) {
                    layer.showAt(event.x, event.y);
                } else {
                    layer = me.$layer(Progress);
                    layer.showAt(event.x, event.y);
                }
                event.preventDefault();
                event.stopPropagation();

                return false;
            });
        }
    };
</script>
