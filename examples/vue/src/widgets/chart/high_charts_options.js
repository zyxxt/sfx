/**
 * Created by ued on 2016/11/15.
 */

export default {
    global:{
        useUTC:false
    },

    chart:{
        animation: true
    },

    credits:{
        enabled: false
    },

    lang: {
        loading: _('加载中...'),
        months: [_('一月'), _('二月'), _('三月'), _('四月'), _('五月'), _('六月'), _('七月'),
            _('八月'), _('九月'), _('十月'), _('十一月'), _('十二月')],
        shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        weekdays: [_('星期日'), _('星期一'), _('星期二'), _('星期三'), _('星期四'), _('星期五'), _('星期六')],
        decimalPoint: '.',
        numericSymbols: ['K', 'M', 'G', 'T', 'P', 'E'],
        resetZoom: _('重置'),
        resetZoomTitle: _('重置比例 1:1'),
        thousandsSep: ','
    },

    tooltip: {
        xDateFormat: '%Y-%b-%e %H:%M:%S',
        borderRadius: 1,
        crosshairs:[true, true]
    },

    yAxis: {
        title: {
            align:'high',
            rotation:0,
            offset:0,
            y:-20
        }
    },

    plotOptions: {
        line: {
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            marker: {
                enabled: false,
                radius: 1,
                symbol: 'circle',
                hover:{
                    radiusPlus: 1
                }
            }
        },
        spline: {
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            marker: {
                enabled: false,
                radius: 1,
                symbol: 'circle',
                hover:{
                    radiusPlus: 1
                }
            }
        },
        pie: {

        }
    }
};
