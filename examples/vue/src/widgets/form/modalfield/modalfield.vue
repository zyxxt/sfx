
<script>
    /**
     * Created by ued on 2017/2/6.
     */

    import Textfield from '../textfield/textfield.vue';
    import logger from 'src/util/logger';

    export default {

        mixins: [
            Textfield
        ],

        props: {

            cls: { 'default': 'modalfield' },

            // 默认设置成readonly
            defaultReadonly: { type: Boolean, 'default': true },

            // trigger图标
            triggerType: { type: String, 'default': 'desktop' },

            // 弹窗modal配置
            modalOptions: { type: Object, default () {
                return {
                    width: 400,
                    title: _('设置')
                };
            } },

            // hook，分别是打开前、提交前、提交后、取消时触发
            beforeOpen: { type: Function },
            beforeSubmit: { type: Function },
            submit: { type: Function },
            cancel: { type: Function },

            // 格式化
            renderer: { type: Function }
        },

        methods: {

            /**
             * 调用$modal创建窗口
             * @private
             */
            _createWindow () {
                if (this.window) {
                    return;
                }
                this.window = this.$modal(this.$slots.default, this.modalOptions);
            },

            /**
             * 点击触发，弹出窗口
             * @param {Event} event 点击事件
             */
            onTrigger (event) {
                let me = this;
                this._createWindow();

                let value = this.getJsonValue();
                logger.log('[modalfield] trigger');

                if (typeof this.beforeOpen === 'function' && this.beforeOpen(this, value) === false) {
                    return;
                }
                this.window.open({
                    data: this.value,
                    submit () {

                        // 防止数据污染，这时永远都去拷贝
                        let formValue;
                        try {
                            formValue = JSON.parse(JSON.stringify(me.window.formRoot.$data));
                        } catch (e) {
                            logger.error('[modalfield] circular reference');
                            return;
                        }

                        // 确认前可以hook，比如额外的数据校验
                        if (typeof me.beforeSubmit === 'function' && me.beforeSubmit(me, formValue) === false) {
                            return;
                        }
                        me.onInput(formValue);
                        me.window.hide();

                        if (typeof me.submit === 'function') {
                            me.submit(me, value);
                        }
                    },
                    cancel: this.cancel
                });

                // 这块仍然跟textfield保持一致
                this.$emit('trigger', value, event);
                if (this.actionName) {
                    this.$emit('action', value, event);
                }
            },

            /**
             * 格式化文本显示
             * @param {*} value 弹窗formRoot的$data
             * @return {String} 格式化成输入框需要显示的文本
             * @override
             */
            _renderer (value) {
                if (typeof this.renderer === 'function') {
                    return this.renderer(this, value);
                }
                return value;
            }
        }
    };
</script>
