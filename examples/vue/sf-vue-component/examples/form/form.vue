<template>
    <div class="test">
        <h1>测试表单项</h1>

        <sf-fieldlabel>test</sf-fieldlabel>

        <sf-form :label-width="70" label-align="right" ref="myForm" >
            <sf-form-item>
                <sf-fieldlabel label-align="left" :label-width="200"><lang>测试fieldLabel</lang><b>加粗</b></sf-fieldlabel>
                <sf-textfield name="a"
                              v-model="field0"
                              :default-width="234"
                              triggerType="arrows"
                              vtype="ip"
                              :allowBlank="false"
                              @trigger="onTrigger" />
                <sf-fieldtip>aaaaaaaaa</sf-fieldtip>
            </sf-form-item>
            <sf-form-item>
                <sf-fieldlabel>realonly</sf-fieldlabel>
                <sf-textfield :default-readonly="true"></sf-textfield>
            </sf-form-item>

            <sf-form-item>
                <sf-fieldlabel>b</sf-fieldlabel>
                <sf-checkbox name="b" v-model="field1" box-label="勾选项" />
                <sf-fieldtip field-tip-type="text">bbbbbbbb</sf-fieldtip>
            </sf-form-item>


            <sf-form-item>
                <sf-fieldlabel>搜索框，回车搜索</sf-fieldlabel>
                <sf-searchfield v-model="search" @trigger="startSearch" vtype="ipv4||port" :validator="searchValidator"> </sf-searchfield>
                <span>搜索结果：{{searchResult}}</span>
            </sf-form-item>
            <sf-form-item>
                <sf-fieldlabel>数字框</sf-fieldlabel>
                <sf-numberfield v-model="num"></sf-numberfield>
            </sf-form-item>

            <sf-form-item>
                <sf-fieldlabel>下拉树</sf-fieldlabel>
                <sf-select-tree v-model="select_tree">
                    <sf-tree-table ref="selectTree" :options="select_options" :default-height="300">
                        <sf-tree-column data-index="a" :renderer="rendererLongText"></sf-tree-column>
                    </sf-tree-table>
                </sf-select-tree>
                <sf-button @click="loadNewData">加载新数据</sf-button>
            </sf-form-item>

            <sf-form-item>
                <sf-fieldlabel>多行</sf-fieldlabel>
                <sf-textarea v-model="area" vtype="multiEmail" ></sf-textarea>
                <sf-fieldtip>aaaaaaaaa</sf-fieldtip>
            </sf-form-item>

            <sf-form-item>
                <sf-fieldlabel>窗口</sf-fieldlabel>
                <sf-modalfield v-model="modalValue"
                               :modalOptions="modalOptions"
                               :beforeOpen="beforeModalOpen"
                               :beforeSubmit="beforeModalSubmit"
                               :submit="modalSubmit"
                               :cancel="modalCancel"
                               :renderer="modalRenderer">
                    <modal-form></modal-form>
                </sf-modalfield>
            </sf-form-item>

        </sf-form>

        <sf-button @click="onCheck">验证表单项是否合法</sf-button>
        <sf-button class="btn-submit" @click="onSubmit">获取表单值，提交请求</sf-button>
        <sf-button class="btn-cancel" @click="onCancel">取消，还原回原来的值</sf-button>

    </div>
</template>
<style lang="stylus" scoped>

</style>
<script>
    import * as Timer from 'src/util/timer';
    import logger from 'src/util/logger';
    import Vue from 'vue';
    import vueResource from 'vue-resource';

    import ModalForm from '../modal/modal_form.vue';

    const TEST_SLEEP = 1000;
    Vue.use(vueResource);

    export default {
        name: 'test',

        data () {
            return {
                field0: '!@#$%^&*fds()',
                field1: true,

                search: '',
                searchResult: '',

                num: 20,

                area: 'fdsafsda\nfds\ndf',

                modalValue: {
                    name: 'hjh',
                    sex: 'man',
                    hobby: 'football',
                    desc: '部门逗逼'
                },
                modalOptions: {
                    title: _('弹窗'),
                    width: 500,
                    height: 400
                },

                select_tree: 'aaa',
                select_options: {
                    bufferView: false,
                    headerHide: true,
                    autoWidth: false,
                    data: this._getData()
                }
            };
        },

        created () {
            var me = this;
            Timer.sleep('test-timer', TEST_SLEEP).then(function () {
                me.testAjax();
            });


        },

//        watch: {
//            field0: function () {
//                logger.log('change');
//            }
//        },

        components: {
            ModalForm
        },

        methods: {

            searchValidator (v) {
                logger.log(v);
                return true;
            },

            loadNewData () {
                this.$refs.selectTree.loadData([{
                    a: 'aaa',
                    b: 'bbb',
                    c: 'ccc'
                }, {
                    a: 'aaaaaa',
                    b: 'bbbbbb',
                    c: 'cccccc'
                }]);
            },

            rendererLongText (v) {
                return String(v).repeat(10);
            },

            _getData () {
                return [{
                    a: 'a',
                    expanded: true,
                    children: [{
                        a: 'b'
                    }]

                }]
            },



            onSubmit () {
                let form = this.$refs.myForm;
                if (!form.isValid()) {
                    this.$showErr(form.getInvalidMsgs());
                    return;
                }
                this.testAjax(form.value);
            },
            onCancel () {
                this.$refs.myForm.value = {
                    a: '1.2.3.4',
                    b: false
                };
            },
            testAjax: function (data) {
                this.$http.post('./abc/xxx.php', data || {
                    x: 'xx',
                    bb: JSON.stringify({
                        x: 'fds'
                    })
                })
                .then(function (response) {
                    this.$set('xxx', response.data);
                })
                .catch(function (response) {
                    logger.log(response);
                });
            },
            onCheck () {
                var form = this.$refs.myForm;
                if (!form.isValid()) {
                    logger.log(form.getInvalidMsgs());
                }
            },
            onTrigger () {

            },

            startSearch (v) {
                this.searchResult = v;
            },

            beforeModalOpen () {
                logger.log('打开时触发');
            },
            beforeModalSubmit () {
                this.$showErr('不让关闭');
                return false;
            },
            modalSubmit () {
                logger.log('submit');
            },
            modalCancel () {
                logger.log('cancel');
            },
            modalRenderer (component, value) {
                return value.name + ': ' + value.desc;
            }
        }
    };

</script>
