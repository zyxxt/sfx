<template>
    <div>
        <div class="modal-demo">
            <sf-button class="btn-success" @click="openAddWin">新增</sf-button>
        </div>

        <div class="modal-demo">
            <sf-button class="btn-primary" @click="openEditWin">编辑</sf-button>
        </div>

        <br>
        <br>
        <p> --------------------------------- 我是完美分割线 ------------------------------</p>
        <p> Messagebox 弹窗告警系列</p>
        <msgbox></msgbox>
    </div>
</template>

<script>

    import Form from './modal_form.vue';
    import Msgbox from './msgbox.vue';
    import logger from 'src/util/logger';

    const defaultData = {
        name: '枪王',
        sex: 'man',
        hobby: 'destball',
        desc: 'UED第一帅'
    };

    export default {
        data () {
            return {
                sex: 'man',
                modalOptions: {
                    autoDestroy: true
                }
            }
        },

        components: {
            msgbox: Msgbox
        },

        mounted () {
            this.formWindow = this.$modal(Form, {
                width: 500,
                height: 300
            });

            logger.log(this.formWindow);
        },

        methods: {
            showWin1 () {
                this.$refs.modal.show();
            },

            openAddWin () {
                this.formWindow.open({
                    title: '新增',
                    reset: true,
                    data: {hobby: 'football'},
                    submit: this.addSubmit.bind(this)
                });
            },

            openEditWin () {
                this.formWindow.open({
                    title: '编辑',
                    data: defaultData,
                    submit: this.editSubmit.bind(this)
                });
            },

            addSubmit () {
                logger.log('add: ', this.formWindow.formRoot.$data);
                this.formWindow.hide();
            },

            editSubmit () {
                logger.log('edit: ', this.formWindow.formRoot.$data);
                this.formWindow.hide();
            }
        }
    }
</script>

<style>
    .modal-demo {
        display: inline-block;
        margin-right: 20px;
    }
</style>

