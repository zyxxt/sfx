
<template>
    <div :id="id"
         class="highcharts"
         :class="cls"
         :style="{ width:width + 'px', height: height + 'px' }"
         v-show="!hidden"
         :disabled="disabled"></div>
</template>

<style lang="stylus" scoped>
    .highcharts
        width: 100%
        height: 100%
</style>

<script>
    /**
     * 封装highcharts
     */

    import HighCharts from 'highcharts';
    import HighChartsOptions from './high_charts_options';
    import Component from 'src/widgets/component';
    import logger from 'src/util/logger';

    if (HighCharts) {

        // 默认配置
        HighCharts.setOptions(HighChartsOptions);
    } else {
        logger.warn('[HighCharts] not found');
    }

    export default {

        mixins: [
            Component
        ],

        props: [

            // 图表配置项
            'options'
        ],

        computed: {

        },

        mounted () {
            if (!HighCharts) {
                return;
            }

            let chart = HighCharts.chart(this.$el, this.options);
            this.chart = chart;

            this.$watch('options', function () {
                chart.redraw();
            }, {
                deep: true
            });

            this._bindChartEvent();
        },

        methods: {
            _bindChartEvent () {

            }
        }
    };

</script>
