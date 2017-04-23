
<style lang="stylus" scoped>

    .fileupload-draggable
        display: block
        min-height: 70px
        text-align: center
        border:3px dashed silver;

        &.dragging
            border-color: yellow;


    .fileupload-input
        display: none;
</style>

<script>
    /**
     * Created by ued on 2016/12/19.
     */

    import Component from 'src/widgets/component';
    import JsonField from 'src/widgets/form/json_field';
    import Button from 'src/widgets/button/button.vue';
    import logger from 'src/util/logger';
    import ProgressForm from './fileupload_progress_form.vue';

    import { on as bindEvent/*, off as unBindEvent */} from 'wind-dom';
    import co from 'src/util/co_not_reject';

    export default {

        render (h) {
            let me = this;
            if (!me.draggable) {
                return h('sf-button', {
                    class: [
                        'fileupload',
                        'fileupload-btn'
                    ],
                    on: {
                        click: me._onBtnClick
                    },
                    props: me.$options.propsData
                }, [
                    h('input', {
                        class: [
                            'fileupload-input'
                        ],
                        attrs: Object.assign({
                            type: 'file',
                            title: me.tip
                        }, me.multiple ? {
                            multiple: 'multiple'
                        } : {}, me.accept ? {
                            accept: me.accept
                        } : {}),
                        ref: 'input'
                    }),
                    me.$slots.default
                ]);
            }
            let cls = [
                'fileupload',
                'fileupload-draggable',
                me.dragCls
            ];

            return (
                <div class={ cls.join(' ') }
                     style={{ width: me.width + 'px', height: me.height + 'px' }}>
                    {
                        me.$slots.default
                    }
                </div>
            );
        },

        mixins: [
            Component,
            JsonField
        ],

        // 把button相关的全部mixin过来
        props: Object.assign({}, Button.props, {

            // 是否拖动上传
            draggable: {
                type: Boolean,
                'default': false
            },

            // 后台URL
            url: {
                type: String,
                'default': 'upload'
            },

            // 允许的文件类型
            accept: {
                type: String
            },

            // input框提示，目前无用到
            tip: {
                type: String,
                'default': _('点击上传')
            },

            // 选择文件后自动上传
            autoUpload: {
                type: Boolean,
                'default': true
            },

            // 支持多文件上传
            multiple: {
                type: Boolean,
                'default': false
            },

            // 后台额外参数
            params: {
                type: Object
            },

            // 多文件上传时，并行或者串行
            uploadTogether: {
                type: Boolean,
                'default': false
            },

            // 选择文件后，在开始上传前可以做其它检验
            // 当返回false时则不上传
            // 如果返回promise，在then，并且参数不为false时才会继续上传
            beforeUpload: {
                type: Function
            }
        }),

        data () {
            return {
                dragCls: ''
            };
        },

        mounted () {
            if (this.draggable) {
                this._bindDrag();
            } else {
                this._bindInput();
            }
        },

        methods: {

            /**
             * 绑定input的change事件，change时自动上传文件
             * @private
             */
            _bindInput () {
                bindEvent(this.$refs.input, 'change', this._onChange);
            },

            /**
             * 点击上传按钮时触发原生input点击事件，弹出上传窗
             * @private
             */
            _onBtnClick () {
                if (this._clicking) {
                    return;
                }
                this._clicking = true;
                this.$refs.input.click();
                this._clicking = false;
            },

            /**
             * 绑定拖动上传
             * @private
             */
            _bindDrag () {
                bindEvent(this.$el, 'dragenter', this._dragEnter);
                bindEvent(this.$el, 'dragleave', this._dragLeave);
                bindEvent(this.$el, 'drop', this._Drop);
            },

            /**
             * 原生input change时触发，自动上传
             * @param {Event} event change事件
             * @private
             */
            _onChange (event) {
                let input = this.$refs.input;
                let files = input.files;
                this.$emit('change', files, event, input);

                if (this.autoUpload) {
                    this.uploadFile(files);
                }
            },

            /**
             * 清空原生input的状态，把已经选择的文件清空
             * @private
             */
            _resetInput () {
                let input = this.$refs.input;
                if (input) {
                    input.value = null;
                }
            },

            /**
             * 拖动进入目标区域时触发
             * @private
             */
            _dragEnter () {
                this.dragCls = 'dragging';
            },

            /**
             * 拖动离开目标区域时触发
             * @private
             */
            _dragLeave () {
                this.dragCls = '';
            },

            /**
             * 拖动完成，松开鼠标时触发
             * @param {Event} event 拖动事件
             * @private
             */
            _Drop (event) {
                event.preventDefault();
                let files = event.dataTransfer.files;
                this.uploadFile(files);
            },

            /**
             * 创建进度提示窗口
             * @private
             */
            _createProgressWindow () {
                let me = this;
                if (this.progressWindow) {
                    return;
                }
                this.progressWindow = this.$modal(ProgressForm, {
                    title: _('正在上传'),
                    width: 480,
                    buttons: [{
                        cls: 'btn-default',
                        text: _('取消'),
                        actionName: 'cancel'
                    }]
                });
                this.progressWindow.$on('cancel', function () {
                    if (me.currentXHR) {
                        me.currentXHR.abort();
                    }
                });
            },

            /**
             * 根据选择的文件，创建formData
             * @param {Array} files 文件列表，File对象
             * @return {FormData}   formData，xhr上传
             * @private
             */
            _createFormData (files) {
                let me = this;
                let formData = new FormData();
                let multi = me.uploadTogether ? '[]' : '';

                files = Array.isArray(files) ? files : [files];

                for (let file of files) {
                    formData.append(`file${multi}`, file);
                    formData.append(`filename${multi}`, file.name);
                    if (me.params) {
                        for (let key in me.params) {
                            if (me.params.hasOwnProperty(key)) {
                                formData.append(`${key}${multi}`, me.params[key]);
                            }
                        }
                    }
                }

                return formData;
            },

            /**
             * 恢复进度窗口的状态，进度条设置成0
             * @private
             */
            _resetProgress () {
                this.progressWindow.open({
                    data: {
                        text: _('正在上传'),
                        progress: 0
                    }
                });
            },

            /**
             * 上传文件
             * @param {Array} files File列表
             */
            uploadFile (files) {
                let me = this;
                files = Array.from(files);

                // 上传前检验接口
                if (typeof this.beforeUpload === 'function') {
                    let ret = this.beforeUpload(files);
                    if (ret === false) {
                        this._resetInput();
                        return;
                    } else if (ret instanceof Promise) {
                        ret.then((ret) => {
                            if (ret === false) {
                                this._resetInput();
                                return false;
                            }
                            me._doUpload(files);
                        }).catch(() => {
                            this._resetInput();
                        });
                        return;
                    }
                }
                me._doUpload(files);
            },

            /**
             * 开始上传文件
             * @param {Array} files File列表
             */
            _doUpload (files) {
                let me = this;

                logger.log('[upload] start upload files...', files);
                this.$emit('upload:start', this, files);
                this._createProgressWindow();

                // 记录后台返回的数据
                let result = [];

                if (me.uploadTogether) {
                    files = [files];
                }

                co(function * () {
                    let file = files.shift();

                    while (file) {

                        // 初始化进度信息
                        me._resetProgress();

                        // 生成formData
                        let formData = me._createFormData(file);

                        // 记录当前正在上传的文件，更新进度提示时有用
                        me.currentFile = file;

                        let { jsonData } = yield me.$http.post(me.url, formData, {
                            progress: me._onProgress,

                            // 记录xhr，取消时用
                            before (request) {
                                me.currentXHR = request;
                            }
                        });
                        me.currentXHR = null;

                        if (!me._handlerUploadCallback(result, file, jsonData)) {
                            return;
                        }

                        file = files.shift();
                    }
                    me._handlerUploadSuccess(result);
                });
            },

            /**
             * 单个上传回调接口
             * @param {Array} result    上传请求回调结果保存在些数组里
             * @param {File} file       文件
             * @param {Object} jsonData 上传请求回调结果
             * @return {Boolean}        成功标识
             * @private
             */
            _handlerUploadCallback (result, file, jsonData = {}) {
                let me = this;
                let fileName = Array.isArray(file) ? file.map(f => f.name).toString() : file.name;
                let fileTip = `file: ${fileName}`;

                if (!jsonData.success) {
                    me._updateProgress(jsonData.msg || _('服务器错误'));
                    logger.log(`[upload] upload failure. ${fileTip}, msg: ${jsonData.msg}`);
                    me.$emit('uploadfile:failure', me, result, file, jsonData);

                    // 上传框清空value
                    me._resetInput();
                    return false;
                }

                logger.log(`[upload] upload success. ${fileTip}`);
                result.push(jsonData.data);
                me.$emit('uploadfile:success', me, result, file, jsonData);
                return true;
            },

            /**
             * 所以文件上传回调接口
             * @param {Array} result 每个请求的回调结果都放在这里
             * @private
             */
            _handlerUploadSuccess (result) {
                let me = this;
                me.progressWindow.hide();

                logger.log(`[upload] end upload files...`, result);
                me.$emit('upload:end', me, result);
                me.onInput(result);

                me._resetInput();
            },

            /**
             * 上传进度更新时触发
             * @param {Event} event 上传事件
             * @private
             */
            _onProgress (event) {
                let loaded = event.loaded;
                let total = event.total;
                let filename = this.currentFile ? this.currentFile.name : null;
                this._updateProgress(filename, loaded / total);

                this.$emit('progress', loaded, total);
            },

            /**
             * 更新进度信息
             * @param {String} filename 当前上传的文件名
             * @param {Number} progress 进度
             * @private
             */
            _updateProgress (filename, progress) {
                let formRoot = this.progressWindow.formRoot;
                if (filename) {
                    formRoot.text = _('正在上传文件：{0}', filename);
                }
                if (typeof progress !== 'undefined') {
                    formRoot.progress = progress;
                }
            }
        }
    };
</script>
