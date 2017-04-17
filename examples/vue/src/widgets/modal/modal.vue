<script>
    /**
    * 模态窗口组件
    * */

    import Vue from 'vue';
    import Component from 'src/widgets/component';
    import uuid from 'src/util/uuid';
    import { apply } from 'src/util/apply';
    import { isFunction, isEmptyObject, isString } from 'src/util/typeof';

    const ARROW_STR = '->';
    const DEFAULT_BTN_CLS = 'btn-default';
    const DEFAULT_BUTTON = {
        submit: {
            cls: 'btn-primary',
            text: '确定',
            actionName: 'submit'
        },
        cancel: {
            cls: 'btn-default',
            text: '取消',
            actionName: 'cancel'
        }
    };

    export default {
        mixins: [
            Component
        ],

        props: {
            title: {
                type: String,
                'default': '标题'
            },
            buttons: {
                type: Array,
                'default': () => []
            },
            buttonAlign: {
                type: String,
                'default': 'right'
            },
            icon: {
                type: String,
                'default': ''
            },
            closeable:  {
                type: Boolean,
                'default': true
            },
            footer: {
                type: Boolean,
                'default': true
            }
        },

        data () {
            return {
                config: {
                    title: this.title,
                    width: this.defaultWidth,
                    height: this.defaultHeight,
                    buttons: this.buttons,
                    buttonAlign: this.buttonAlign,
                    closeable: this.closeable,
                    footer: this.footer
                }
            };
        },

        render (h) {
            let config = this.config;

            return (
                <div class="sf-modal" ref="modal" style={{width: config.width + 'px', height: config.height + 'px'}}>
                    <div class="sf-modal-header">
                        <div class="sf-modal-title">
                            <span domPropsInnerHTML={config.title}></span>
                            {config.closeable ? <i on-click={this.cancel} class="fa fa-close pull-right"></i> : ''}
                        </div>
                    </div>
                    <div class={`sf-modal-body ${config.icon || ''}`}>
                        {this.$slots.default}
                    </div>
                    {
                        !config.footer ? '' :
                            (
                                <div class="sf-modal-footer" style={{'text-align': config.buttonAlign}}>
                                    {this._buttonsRender()}
                                </div>
                            )
                    }
                </div>
            );
        },

        methods: {
            _buttonsRender () {
                let me = this;
                let cfgButtons = this.config.buttons;
                let arrowIndex = cfgButtons.indexOf(ARROW_STR);
                let buttons = cfgButtons.length ? cfgButtons : ['submit', 'cancel'];
                let btnVnodes = [];

                buttons.forEach((button, index) => {
                    let btnWrapTpl;
                    let btnCls = 'sf-modal-button ';
                    let btnTpl = me._getButtonTpl(button);
                    let actionReg = /actionName=[\"\'](\b\w+\b)[\"\']/g;

                    if (arrowIndex === index) {
                        return;
                    }

                    if (arrowIndex !== -1) {
                        if (index < arrowIndex) {
                            btnCls += 'pull-left';
                        } else if (index > arrowIndex) {
                            btnCls += 'pull-right';
                        }
                    }

                    btnWrapTpl = '<div class="' + btnCls + '">' + btnTpl + '</div>';

                    let Comp = Vue.extend({
                        mixins: [
                            Component
                        ],
                        template: btnWrapTpl.replace(actionReg, s => '@click="clickBtn($event,' + s.replace(actionReg, '\'$1\'') + ')"'),
                        methods: {
                            clickBtn (e, actionName) {
                                me.$emit(actionName, e);
                                me.$emit('actionbtn', actionName, e);

                                if (actionName === 'cancel') {
                                    me.hide();
                                }
                            }
                        }
                    });
                    let vnode = new Comp({
                        el: document.createElement('div')
                    })._render();

                    // 如果vnode是静态的，即仅仅是原生的div span等，vnode.patchVnode判断vnode时会认为是一样的，导致未更新
                    // 这里强制改下key为不同
                    if (vnode.isStatic && vnode.isCloned) {
                        vnode.key = uuid('vnode');
                    }

                    btnVnodes.push(vnode);
                });

                return btnVnodes;
            },

            _getButtonTpl (button) {
                if (isString(button) && !DEFAULT_BUTTON.hasOwnProperty(button)) {
                    return button;
                }

                let btnObj = DEFAULT_BUTTON[button] || button;
                let cls = btnObj.cls || DEFAULT_BTN_CLS;
                let text = btnObj.text || 'button';

                if (DEFAULT_BUTTON.hasOwnProperty(btnObj.actionName)) {
                    text = btnObj.text || DEFAULT_BUTTON[btnObj.actionName].text;
                    cls = btnObj.cls || DEFAULT_BUTTON[btnObj.actionName].cls;
                }

                return '<sf-button class="' + cls + '" actionName="' + btnObj.actionName + '">' + text + '</sf-button>';
            },

            setData (options) {
                let data = options.data || {};
                let bodyVm = this.$slots.default;
                let bodyVmData = bodyVm ? bodyVm[0].child.$data : {};

                // 先把表单恢复成原始data
                if (options.reset) {
                    let oriData = bodyVm ? bodyVm[0].child.$options.data() : {};
                    apply(bodyVmData, oriData);
                }

                if (data && !isEmptyObject(data)) {
                    apply(bodyVmData, data);
                }
            },

            setConfig (options = {}) {
                if (isFunction(options.submit)) {
                    let submitFn = options.submit;
                    this.$off('submit');
                    this.$on('submit', () => {
                        let checkValid = (formRoot) => {
                            if (formRoot && typeof formRoot.isValid === 'function' && typeof formRoot.getInvalidMsgs === 'function') {
                                if (!formRoot.isValid()) {
                                    this.$showErr(formRoot.getInvalidMsgs());
                                    return false;
                                }
                            }
                            return true;
                        };
                        let formRoot = this.$slots.default[0].child;
                        if (formRoot) {

                            // formRoot如果是sf-form，则校验
                            if (checkValid(formRoot) === false) {
                                return;
                            }

                            // 也有可能formRoot里面包含一个真正的sf-form，那也去校验
                            formRoot = formRoot.$children && formRoot.$children[0];
                            if (checkValid(formRoot) === false) {
                                return;
                            }
                        }
                        submitFn();
                    });
                    delete options.submit;
                }

                if (isFunction(options.cancel)) {
                    this.$off('cancel');
                    this.$on('cancel', options.cancel);
                    delete options.cancel;
                }

                apply(this.config, options);
            },

            open (options) {
                this.setData(options);
                this.setConfig(options);
                this.show();

                // 表单的话，显示的时候自动把错误提示清除掉
                this.$nextTick(() => {
                    let formRoot = this.$slots.default[0].child;
                    if (formRoot) {
                        formRoot.clearInvalid && formRoot.clearInvalid();
                        formRoot = formRoot.$children && formRoot.$children[0];
                        formRoot && formRoot.clearInvalid && formRoot.clearInvalid();
                    }
                });
            },

            show () {
                this.$emit('show');
            },

            hide () {
                this.$emit('hide');
            },

            cancel () {
                this.$emit('cancel');
                this.hide();
            }
        }

    };
</script>

<style lang="stylus">
    .sf-modal-wrap
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

    .sf-modal
        background: #fff;
        transform: translate(-50%,-50%);
        min-width: 400px;
        max-width: 800px;
        min-height: 180px;
        top: 50%;
        left: 50%;
        position: fixed;
        border: 1px solid #17C1C5;
        display: flex;
        flex-flow: column;

        .sf-modal-header
            padding: 15px 20px;
            border-bottom: 1px solid #e5e5e5;
            width: 100%;
            top: 0;
            font-size: 14px;

            .fa-close
                font-size: 16px;
                cursor: pointer;

        .sf-modal-body
            min-height: 70px;
            flex: 1;
            overflow: auto;

        .sf-modal-footer
            height: 60px;
            border-top: 1px solid #e5e5e5;
            padding: 15px;
            width: 100%;
            bottom: 0;

        .sf-modal-button
            display: inline-block;
            margin: 0 6px;

    .sf-modal-overlay
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #000;
        opacity: 0.6;

</style>
