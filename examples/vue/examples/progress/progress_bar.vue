<template>
    <div style="padding: 20px">
        <p><lang>测试</lang></p>
        <p>
            <sf-progress-bar :default-width="400"
                             v-model="progress0"
                             front-color="rgb(255, 102, 104)"
                             back-color="#ccc" ></sf-progress-bar>
        </p>
        <p>
            <lang>文字在中间</lang>
            <sf-progress-bar :default-width="400"
                             v-model="progress1"
                             front-color="rgb(238, 204, 68)"
                             text-align="center" ></sf-progress-bar>
        </p>
        <p>
            <lang>大小可配置</lang>
            <sf-progress-bar class="inline"
                             :default-width="200" :defaultHeight="12"
                             v-model="progress1"
                             :text-hidden="true" ></sf-progress-bar>
        </p>
        <p>
            <lang>循环播放</lang>
            <sf-progress-bar :default-width="400" ref="play"
                             v-model="progress2"
                             text-align="center"
                             :renderer="renderProgress"></sf-progress-bar>
        </p>
    </div>
</template>

<style lang="stylus" scoped>
    .inline
        /*display: inline-block
        vertical-align: middle*/

</style>

<script>
    import { sleep } from 'src/util/timer'
    let tick = 0;
    const INTERVAL = 0.1;
    const INTERVAL_TIME = 1000;

    export default {

        name: 'progressBar',

        data () {
            return {
                progress0: 0.05,
                progress1: 0.4,
                progress2: 1
            }
        },

        methods: {
            renderProgress (value) {
                return _('自定义进度：{0} %', Math.round(value * 100));
            },

            autoPlay () {
                var me = this;
                return sleep('play', INTERVAL_TIME).then(function () {
                    me.progress2 = tick;
                    tick += INTERVAL;
                    if (tick > 1) {
                        tick = 0;
                    }
                    me.autoPlay();
                });
            }
        },

        mounted () {
            this.autoPlay();
        }
    };
</script>
