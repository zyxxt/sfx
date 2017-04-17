<template>

    <div>
        <p><lang>使用html语义化标签</lang></p>
        <sf-tab-panel ref="tabpanel2" :activeItem="currentIndex">
            <sf-tab-item :title="'tab1tab1tab1tab1tab1tab1tab1tab1tab1'">
                <sf-breadcrumb ref="aaa">
                    <sf-breadcrumb-item href="/">title1</sf-breadcrumb-item>
                    <sf-breadcrumb-item href="/components/breadcrumb">title2</sf-breadcrumb-item>
                    <sf-breadcrumb-item>title3</sf-breadcrumb-item>
                </sf-breadcrumb>
            </sf-tab-item>

            <sf-tab-item :title="'tab2tab2tab2'">
                <sf-button>adf2</sf-button>
            </sf-tab-item>

        </sf-tab-panel>
        <hr>
        <sf-tab-panel ref="tabpanel2" :activeItem="1" :vertical="true">
            <sf-tab-item :title="firstText">
                第一步
            </sf-tab-item>

            <sf-tab-item :title="secondText">
                第二步
            </sf-tab-item>

            <sf-tab-item :title="thirdText" :default-disabled="thirdDisabled">
                第三步
            </sf-tab-item>

            <sf-tab-item v-for="tab in tabConfig"
                         :title="tab.title"
                         :content="tab.content"
                         :content-data="tab.data"></sf-tab-item>

        </sf-tab-panel>
    </div>
</template>
<style lang="stylus" scoped>

    .btn-submit, p{
        margin-top: 20px;
    }
</style>
<script>
    import Vue from 'vue';

    export default {
        data () {
            return {
                currentIndex: 0,
                firstText: 'tab1tab1tab1tab1tab1tab1tab1tab1tab1',
                secondText: 'tab2tab2tab2',
                thirdText: 'tab3',
                thirdDisabled: true,

                tabConfig: [{
                    title: 'a',
                    content: '<sf-button>{{btnText}}</sf-button>',
                    data: {
                        btnText: 'abc'
                    }
                }, {
                    title: 'b',
                    content: {
                        template: '<sf-select v-model="record.c" :options="list"></sf-select>',
                        data: {
                            record: {
                                c: 'c1'
                            },
                            list: [
                                {label: '选项1', value: 'c0'},
                                {label: '选项2', value: 'c1', disabled: true},
                                {label: '选项3adsjffasdjsdfsdafadsfasdf', value: 'c2'},
                                {label: '选项4', value: 'c3', disabled: false},
                                {label: '选项5', value: 'c4'}
                            ]
                        }
                    }
                }]
            };
        },
        methods: {

            beforeShow: function ($vm, index) {

//                alert(index);
            },

            afterShow: function ($vm, index) {

//                alert(index);
            }
        }

    };
</script>
