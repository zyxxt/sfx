<template>
    <div>
        <div class="select-model">
            <div>实例一的值：{{ aaa }}</div>
            <div>实例二的值：{{ bbb }}</div>
        </div>

        <div class="select-demo">
            <p>实例一：动态生成下拉选项值</p>
            <sf-select v-model="aaa" :options="list"></sf-select>
        </div>

        <div class="select-demo">
            <p>实例二：固定下拉选项值</p>
            <sf-select v-model="bbb">
                <sf-option value="man" icon-cls="fa-car">男</sf-option>
                <sf-option value="woman" icon-cls="fa-plane">女</sf-option>
                <sf-option value="renyao" icon-cls="fa-wheelchair" :disabled="true">人妖</sf-option>
            </sf-select>
        </div>

        <div class="select-demo">
            <p>实例三：下拉框事件相关</p>
            <sf-select v-model="ccc" :options="list"
                       @select="triggerSelect" @change="changeSelect">
            </sf-select>
        </div>

        <div class="select-demo">
            <p>实例四：几个初始化配置属性</p>
            <sf-select v-model="ddd"
                       :options="list"
                       :default-width="400"
                       :default-disabled="true"
                       :default-first="false"
                       display-field="label"
                       value-field="value"
                       placeholder="请选择">
            </sf-select>
        </div>
        <div class="select-demo">
            <p>实例五：异步加载</p>
            <sf-select v-model="eee"
                       display-field="name"
                       value-field="id"
                       :auto-load="true"
                       root-data="data"
                       :ajax="ajaxOptions"></sf-select>
        </div>

        <div class="select-demo">
            <p>实例六：联动</p>
            <sf-select v-model="provice" :options="proviceList"></sf-select>
            <sf-select v-model="city" :options="cityList"></sf-select>
            <sf-select v-model="region" :options="regionList"></sf-select>
        </div>
    </div>

</template>

<script>
    import logger from 'src/util/logger';

    const xxx_list = [
        {
            value: 1, label: '广东省',
            children: [
                {
                    value: 11, label: '深圳市',
                    children: [{value: 111, label: '南山区'}, {value: 112, label: '福田区'}]
                },
                {
                    value: 12, label: '广州市',
                    children: [{value: 121, label: '天河区'}, {value: 122, label: '越秀区'}]
                }
            ]
        },
        {
            value: 2, label: '广西省',
            children: [
                {value: 21, label: '南宁市', children: [{value: 211, label: 'xx区'}]},
                {value: 22, label: '桂林市', children: [{value: 221, label: 'yy区'}]}
            ]
        }
    ];

    export default {
        data () {
            return {
                aaa: '',
                bbb: 'woman',
                ccc: 5,
                ddd: '',
                isDisabled: false,
                list: [
                    {label: '我是空字符串', value: ''},
                    {label: '选项1', value: 1, iconCls: 'fa-remove'},
                    {label: '选项2', value: 2, disabled: true},
                    {label: '选项3adsjffasdjsdfsdafadsfasdf', value: 3},
                    {label: '选项4', value: 4},
                    {label: '选项5', value: 5},
                    {label: '选项6', value: 6},
                    {label: '选项7', value: 7},
                    {label: '选项8', value: 8},
                    {label: '选项9', value: 9},
                    {label: '选项10', value: 10},
                    {label: '选项11', value: 11},
                    {label: '选项12', value: 12},
                    {label: '选项13', value: 13},
                    {label: '选项14', value: 14},
                    {label: '选项24', value: 24, disabled: false},
                    {label: '选项25', value: 25, iconCls: 'fa-circle'}
                ],

                // 异步加载
                eee: '',
                ajaxOptions: {
                    url: 'vapi/extjs/vtpstorage/storagetree'
                },

                // 联动
                provice: 1,
                city: 12,
                region: 121,
                proviceList: xxx_list,
                cityList: [],
                regionList: []

            }
        },


        methods: {
            changeSelect (value/*, oldValue, data, oldData*/) {
                logger.log(arguments);
                alert('改变了选项：' + value);
            },

            triggerSelect (value/*, oldValue, data, oldData*/) {
                logger.log(arguments);
                alert('点击了选项: ' + value);
            },

            getCityList (proviceList, provice) {
                let city = proviceList.filter(item => {
                    return item.value === provice;
                })[0];

                return city ? city.children: [];
            },

            getRegionList (cityList, city) {
                let region = cityList.filter(item => {
                    return item.value === city;
                })[0];

                return region ? region.children : [];
            }
        },

        computed: {
            cityList () {
                return this.getCityList(this.proviceList, this.provice);
            },

            regionList () {
                let cityList = this.getCityList(this.proviceList, this.provice);

                return this.getRegionList(cityList, this.city);
            }

        }
    }
</script>

<style scope>
    .select-demo {
        display: inline-block;
        margin: 0 10px;
    }
</style>
