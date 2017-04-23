
<template>
    <td class="table-header-cell ellipsis"
        :class="[cls, _getCls()]"
        :id="id"
        :style="{ width: width + 'px', height: height + 'px' }"
        v-show="!hidden"
        :disabled="disabled"
        @click="onHeaderClick">
        <slot></slot>
        <i v-if="sortAble" class="fa fa-sort" :class="_getSortCls()"></i>
    </td>
</template>

<style lang="stylus" scoped>

</style>

<script>
    /**
     * Created by ued on 2016/11/28.
     */

    import Component from 'src/widgets/component';
    import logger from 'src/util/logger';
    import Event from './event';

    const DESC = 'DESC';
    const ASC = 'ASC';

    export default {

        mixins: [
            Component,
            Event
        ],

        props: {

            // 宽度，默认是 1，支持固定大小跟百分比，可以混着用，配合autoFit
            // > 1 固定大小
            // <=1 百分比
            defaultWidth: {
                type: Number
            },

            // 对齐方式 left right center
            align: {
                type: String,
                'default': 'left'
            },

            // 是否返回vue实例，性能较差，最好不要有这种交互
            useVue: {
                type: Boolean,
                'default': false
            },

            // 是否启用html，默认是false，防止XSS
            useHTML: {
                type: Boolean,
                'default': false
            },

            // 列映射字段
            dataIndex: {

            },

            // Function
            // String：在context中自动查找对应的function
            renderer: {

            },

            // 支持排序功能
            // Boolean: 支持顺序与倒序
            // String: DESC ASC 仅支持其中一种排序功能
            sortAble: {

            },

            sortFn: {

            }
        },

        data () {
            return {
                direction: ''
            };
        },

        methods: {

            _getCls () {
                let ret = [
                    `table-cell-${this.align}`
                ];
                if (this.sortAble) {
                    ret.push('table-header-sortable');
                }

                return ret;
            },

            _getSortCls () {
                if (this.sortAble && this.direction) {
                    switch (this.direction) {
                        case ASC:
                            return 'fa-sort-asc';

                        case DESC:
                            return 'fa-sort-desc';

                        default:
                            logger.error('[table_column] sort direction only support: ASC, DESC');
                            break;
                    }
                }
                return '';
            },

            _toggleDirection () {
                if (!this.sortAble) {
                    return;
                }
                if (this.sortAble === ASC) {
                    this.direction = ASC;
                } else if (this.sortAble === DESC) {
                    this.direction = DESC;
                } else {
                    if (!this.direction) {
                        this.direction = ASC;
                    } else if (this.direction === ASC) {
                        this.direction = DESC;
                    } else {
                        this.direction = ASC;
                    }
                }
            },

            resetDirection () {
                this.direction = '';
            },

            onHeaderClick () {
                if (!this.sortAble) {
                    return;
                }
                this._toggleDirection();

                this.fireEvent('sort', this, this.direction);
            }

        }
    };
</script>
