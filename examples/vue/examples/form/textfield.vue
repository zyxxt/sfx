
<template>
    <div>
        <p>
            <sf-fieldlabel label-align="left" :label-width="200">测试</sf-fieldlabel>
            <sf-textfield name="a"
                          v-model="a"
                          :default-width="400"
                          triggerType="search"
                          vtype="ip"
                          :allowBlank="false"
                          @trigger="onTrigger" />
            <sf-fieldtip>魂牵梦<br>萦魂牵梦萦</sf-fieldtip>
        </p>
        <p>
            <sf-fieldlabel label-align="left" :label-width="100">afdsa</sf-fieldlabel>
            <sf-textfield v-model="b" vtype="ip" :minLength="10" :maxLength="20" :allowBlank="false" />
            <sf-fieldtip field-tip-type="text">魂牵梦萦魂牵梦萦</sf-fieldtip>
        </p>
        <p>
            <sf-fieldlabel label-align="left"
                           :label-width="100">自动宽度</sf-fieldlabel>
            <sf-textfield v-model="c"
                          default-width="auto" />
        </p>
    </div>
</template>

<style>

</style>

<script>
    export default {
        data () {
            return {
                a: 'abc',
                b: 'fsa',
                c: '自动宽度'
            };
        },

        methods: {
            onTrigger (event) {
                window.alert(event.target);
            }
        }
    };
</script>
