<template>
    <div>
        <h1>boxLabel：</h1>
        <p>
            <sf-checkbox :boxLabel="label" 
                         @change="onChange"
                         v-model="checkGroup.a"
                         :true-value="1" 
                         :false-value="0">
             </sf-checkbox>
            <br />
            <sf-checkbox v-model="checkGroup.b" 
                        :true-value="1" 
                        :false-value="0">
                        boxLabel in slot
            </sf-checkbox>
        
            <br />
            <span>当前选中的是：<span>{{JSON.stringify(checkGroup)}}</span></span>
        </p>

        <h1>default：</h1>
        <p>
            <sf-checkbox :defaultDisabled="true">defaultDisabled  :defaultDisabled="true|false"</sf-checkbox>
            <br />
            <sf-checkbox :value="false">defaultValue  :value="true|false"</sf-checkbox>
        </p>

        <h1>checkPart</h1>
        <p>
            <sf-checkbox :checkPart="true" v-model="checkPart">{{checkPart}}</sf-checkbox>
        </p>

        <h1>radio group：</h1>
        <p>
            <sf-radio name="q" v-model="abc" check-value="a">aaaaaaaaaa</sf-radio>
            <sf-radio name="q" v-model="abc" check-value="b">bbbbbbbbbb</sf-radio>
            <sf-radio name="q" v-model="abc" check-value="c">cccccccccc</sf-radio>
            <br />
            <span>当前选中的是：<span>{{abc}}</span></span>
        </p>

        <h1>混合着原生的一起用：</h1>
        <p>
            <input type="radio" name="xxx" v-model="qqq" value="2" id="id0" ><label for="id0">2222222222</label>
            <sf-radio name="xxx" v-model="qqq" check-value="1" >1111111111</sf-radio>
            <br />
            <span>当前选中的是：<span>{{qqq}}</span></span>
        </p>

    </div>
</template>
<style>

</style>
<script>

    import logger from 'src/util/logger';

    export default {
        data () {
            return {
                label: 'boxLabel in prop',
                checkGroup: {
                    a: 1,
                    b: 0
                },

                checkPart: 'checkPart',


                abc: 'b',

                qqq: "2"
            };
        },

        methods: {
            onChange (checkbox, event) {
                logger.log(event.target.checked);
            }
        }
    };
</script>
