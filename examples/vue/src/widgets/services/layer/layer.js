/**
 * Created by ued on 2016/11/27.
 * import xxx from './xx.vue';
 * ...
 * let layer = this.$layer(xxx, data, layerOptions);
 * layer.update(data) // 更新数据
 * layer.show() // 显示
 * layer.hide() // 隐藏
 * layer.showAt(x, y) // 显示在指定坐标上
 * layer.showTo(target) // 显示在指定dom节点上
 * layer.destroy() // 干掉
 */

import Vue from 'vue';
import { apply } from 'src/util/apply';
import { isFunction } from 'src/util/typeof';
import logger from 'src/util/logger';
import Component from 'src/widgets/component';

let layerWrapDom;
export default class Layer {

    constructor (vueComponent, options = {}) {
        this.layerOptions = apply({
            defaultWidth: options.width,
            defaultHeight: options.height,
            arrowHide: false,
            autoHide: true,
            defaultTitle: options.title,
            defaultTarget: options.target
        }, options);

        this._initLayerWrapDom();
        this._initLayer(vueComponent);
    }

    _initLayerWrapDom () {
        if (!layerWrapDom) {
            layerWrapDom = document.createElement('div');
            layerWrapDom.className = 'layer-wrap';
            document.body.appendChild(layerWrapDom);
        }
    }

    _initLayer (vueComponent) {
        let me = this;
        let Comp = Vue.extend({
            mixins: [
                Component
            ],
            render: function (h) {
                return h('sf-layer',
                    {
                        ref: 'layer',
                        'class': 'vtip',
                        props: me.layerOptions
                    },
                    [
                        h(vueComponent, {
                            ref: 'entity'
                        })
                    ]
                );
            }
        });
        this.layerEntity = new Comp({
            el: layerWrapDom
        });

        this.layer = this.layerEntity.$refs.layer;
        this.formRoot = this.layerEntity.$refs.entity;
    }

    update (data) {
        apply(this.formRoot.$data, data);

        // 更新完数据要重新算下高度
        if (this.layer.autoScroll) {
            this.layer.$nextTick(() => {
                this.layer.calClientRect();
            });
        }

        return this;
    }

    showAt (x, y) {
        if (arguments.length === 1) {
            if (Array.isArray(x)) {
                y = x[1];
                x = x[0];
            } else if (typeof x === 'object') {
                y = x.y;
                x = x.x;
            } else {
                logger.error('args invaild. ', x, y);
                return;
            }
        }

        let target = this._getTarget(x, y);
        this.showTo(target, true);
        return this;
    }

    showTo (target, forceUpdate = false) {
        if (!forceUpdate && this.layer._getTarget() === target) {
            if (!this.layerOptions.autoHide) {
                this.show();
            }
            return this;
        }

        let showToTarget = () => {
            if (this.layerOptions.autoHide) {
                this.layer.setTarget(target);
            } else {
                this.layer.alignTo(target);
            }

            this.show();
        };

        if (this.layer.hidden) {
            showToTarget();
        } else {
            this.hide(() => {
                showToTarget();
            });
        }

        return this;
    }

    /**
     * 显示 layer
     * @param callback 此回调是 afterShow 回调
     * @returns {Layer}
     */

    show (callback) {
        this.layer.hidden = false;

        let afterShow = () => {
            this.layer.$off('afterShow', afterShow);

            if (isFunction(callback)) {
                callback();
            }
        };

        this.layer.$on('afterShow', afterShow);

        return this;
    }

    /**
     * 隐藏 layer
     * @param callback 此回调是 afterHide 回调
     * @returns {Layer}
     */

    hide (callback) {
        this.layer.hidden = true;

        let afterHide = () => {
            this.layer.$off('afterHide', afterHide);

            if (isFunction(callback)) {
                callback();
            }
        };


        this.layer.$on('afterHide', afterHide);

        return this;
    }

    setTitle (title) {
        this.layer.title = title;

        return this;
    }

    /**
     * 绑定 layer 事件
     * @returns {Layer}
     */
    $on () {
        this.layer.$on.apply(this.layer, arguments);

        return this;
    }

    /**
     * 触发 layer 事件
     * @returns {Layer}
     */
    $emit () {
        this.layer.$emit.apply(this.layer, arguments);

        return this;
    }

    isHide () {
        return this.layer.hidden;
    }

    _getTarget (left, top) {
        if (this._target) {
            this._target.style.left = `${left}px`;
            this._target.style.top = `${top}px`;
            return this._target;
        }
        this._target = document.createElement('div');
        this._target.className = 'layer-target-node';
        this._target.style.position = 'fixed';
        this._target.style.width = 0;
        this._target.style.height = 0;
        this._target.style.left = `${left}px`;
        this._target.style.top = `${top}px`;

        document.body.appendChild(this._target);
        return this._target;
    }

    destroy () {
        this.layer.$destroy();
        if (this.layer.$el && this.layer.$el.parentNode) {
            this.layer.$el.parentNode.removeChild(this.layer.$el);
        }
        this.layer = null;
        if (this._target) {
            document.body.removeChild(this._target);
        }
    }
}

/**
 * $layer 创建一个浮动层
 * @param {VueComponent} vueComponent 浮动层内部是一个vue组件，实例或者类都行
 * @param {Object} options            sf-layer 的 propsData
 * @return {Layer}                    layer 包装
 */
Vue.prototype.$layer = function (vueComponent, options) {
    return new Layer(vueComponent, options);
};
