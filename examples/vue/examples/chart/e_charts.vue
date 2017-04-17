<template>
    <div>
        <sf-e-charts :options="options"
                     :autoDestroy="true"
                     :autoRefresh="false"
                     ref="chart"
                     :defaultHeight="400"></sf-e-charts>
        <sf-button @click="loadChart">重新加载</sf-button>
    </div>
</template>

<script>
    import GUANGDONG from './guangdong.json';
    import ECharts from 'echarts';
    import './tooltip.css';

    export default {

        created () {
            ECharts.registerMap('guangdong', GUANGDONG);
        },

        methods: {
            loadChart () {
                window.setInterval(() => {
                    this.options.title.text = String(+new Date());
                    this.$refs.chart.refresh();
                }, 1000);
            }
        },

        data () {
            let itemStyle = {
                normal: {
                    borderWidth: 0.5,
                    borderColor: 'rgba(24, 193, 198, 1)',
                    areaColor: 'rgba(12, 91, 95, 1)'
                },
                emphasis: {
                    label: {
                        show: true
                    },
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    areaColor: 'rgba(24, 193, 198, 1)'
                }
            };
            return {
                options: {
                    title: {
                        text: 'TEST TITLE',
                        subtext: 'TEST SUB TITLE',
                        left: 'center',
                        top: 'top'
                    },
                    tooltip: {
                        trigger: 'item',
                        enterable: true,
                        backgroundColor: 'rgba(50, 50, 50, 1)',
                        borderColor: '#18C0C3',
                        borderWidth: 1,
                        padding: 0,
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);border-radius: 10px;',
                        formatter: function (params) {
                            let title = `<h3 class="echart-tooltip-title">${params.name}</h3>`;
                            let body = [
                                '<div class="echart-tooltip-body"><table>'
                            ];
                            const LOW = 30;
                            const MIDDLE = 60;
                            if (params.data && Array.isArray(params.data.data)) {
                                params.data.data.forEach(function (item) {
                                    body.push(`
                                        <tr class="${
                                            item.value <= LOW ?
                                                'item-status-low' :
                                                (item.value <= MIDDLE ?
                                                    'item-status-middle' :
                                                    'item-status-high')
                                        }">
                                            <td>${item.name}</td>
                                            <td>${item.addr}</td>
                                            <td>${item.value}</td>
                                        </tr>
                                    `);
                                });
                                body.push('</div></table>');
                                return `<div class="echart-tooltip-wrap">${title + body.join('')}</div>`;
                            }
                            return '';
                        }
                    },
//                    legend: {
//                        orient: 'vertical',
//                        left: 'left',
//                        data: ['xxx']
//                    },
//                    visualMap: {
//                        min: 0,
//                        max: 100,
//                        left: 'left',
//                        top: 'bottom',
//                        text: ['High', 'Low'],
//                        calculable: true
//                    },
//                    selectedMode: 'single',
                    series: [
                        {
                            name: 'xxx',
                            type: 'map',
                            map: 'guangdong',
                            itemStyle: itemStyle,
//                            showLegendSymbol: true,
                            roam: true,
                            // 放大倍数
                            // zoom: 10,
                            left: 'center',
                            top: 'center',
                            // 中心点在哪在位置
                            // center: [
                            //     114.204325, 22.71681
                            // ],
                            markPoint: {
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: function (params) {
                                            return params.data.name + ': ' + params.data.value;
                                        },
                                        textStyle: {
                                            color: '#000'
                                        }
                                    }
                                }/*,
                                data: [{
                                    name: 'abc',
                                    value: 'efg',
                                    coord: [
                                        114.166318, 23.320629
                                    ]
                                }]*/
                            },
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                { name: '惠州', value: 100, itemStyle: {
                                    normal: {
                                        areaColor: 'rgba(24, 193, 198, 1)'
                                    }
                                } },
                                { name: '东莞', value: 200 },
                                { name: '深圳', value: 120, data: [{
                                    name: '南山区',
                                    addr: '智园分店',
                                    value: 30
                                }, {
                                    name: '福田区',
                                    addr: '福田XXX分店1',
                                    value: 60
                                }, {
                                    name: '福田区',
                                    addr: '福田XXX分店2',
                                    value: 90
                                }] }
                            ]
                        }
                    ]
                }
            };
        }
    };
</script>
