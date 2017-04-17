<template>
    <div>
        <div class="datefield-demo">
            <p>常规用法：</p>
            <sf-datefield v-model="aaa"></sf-datefield>
            <label> v-model： {{aaa.toString()}}</label>
        </div>

        <div class="datefield-demo">
            <p>范围日期：</p>
            <sf-datefield v-model="bbb" type="range"></sf-datefield>
            <label> v-model： {{bbb}}</label>
        </div>

        <div class="datefield-demo">
            <p>格式化显示1：(字符串指定格式)</p>
            <sf-datefield v-model="ccc" format="Y/m/d"></sf-datefield>
            <label> v-model： {{ccc}}</label>
        </div>

        <div class="datefield-demo">
            <p>格式化显示2：(函数返回指定格式)</p>
            <sf-datefield v-model="ddd" format="formatCn"></sf-datefield>
            <label> v-model： {{ddd}}</label>
        </div>

        <div class="datefield-demo">
            <p>其他配置项 （禁用，宽度，限制起始日期）</p>
            <sf-datefield v-model="eee"
                          :default-width="500"
                          :default-disabled="true"
                          start-limit="2000-01-01"
                          end-limit="2030-12-31">
            </sf-datefield>
            <label> v-model： {{eee}}</label>

        </div>
    </div>
</template>

<script>

    import logger from 'src/util/logger';

    export default {
        data () {
            return {
                aaa: new Date(), // v-model 可以为 Date 对象 默认值就是 new Date()
                ccc: '2017-01-06', // v-model 可以为 Y-m-d 格式
                ddd: 1483587919532, // v-model 可以为 时间戳
                bbb: {              // 日期范围时，v-model 必须是 {start, end} 格式
                    start: '2017-01-03', // 配置这个的时候也一样支持 Date 对象 | Y-m-d 格式 | 时间戳
                    end: '2017-01-26'
                },
                eee: ''
            };
        },

        methods: {
            formatCn () {
                return 'Y年m月d日';
            }
        }
    };
</script>

<style>
    .datefield-demo {
        margin: 20px auto;
    }
</style>
