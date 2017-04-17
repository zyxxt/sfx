<template>
    <div class="pagination"
         :style="{ width: `${width}px`, height: height + 'px' }"
         :v-show="!hidden"
         :disabled="disabled">

        <div class="pagination-inner pull-right">
            <div class="pagination-total-text">{{totalText}}</div>
            <ul class="pagination-nav">
                <li v-if="options.showFirst"
                    class="pagination-nav-item"
                    :title="moveFirstText"
                    @click = "moveFirst" >
                    <i class="fa fa-angle-double-left" ></i>
                </li>

                <li class="pagination-nav-item"
                    :class="activeIsFirst ? 'pagination-nav-item-disabled' : ''"
                    :title="movePrevText"
                    @click = "movePrev" >
                    <i class="fa fa-angle-left"></i>
                </li>

                <li v-for="item in items"
                    class="pagination-nav-item"
                    :class="item.selected ? 'pagination-nav-item-selected' : ''"
                    :title="item.id === '-' ? '' : item.id"
                    @click = "moveTo(item.id)" >
                    {{item.text}}
                </li>

                <li class="pagination-nav-item"
                    :class="activeIsLast ? 'pagination-nav-item-disabled' : ''"
                    :title="moveNextText"
                    @click = "moveNext" >
                    <i class="fa fa-angle-right"></i>
                </li>

                <li v-if="options.showLast"
                    class="pagination-nav-item"
                    :title="moveLastText"
                    @click = "moveLast" >
                    <i class="fa fa-angle-double-right"></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="stylus">
    .pagination
        margin: 0;
        display: block;
        padding: 6px;
        height: 42px;
        background-color: #fff;
        border-radius: 0px;
        border: solid 1px #DDD;
        border-top: none;

    .pagination-total-text
        float: left;
        margin-right: 10px;
        line-height: 30px;
        color: #999;
        font-size: 12px;

    .pagination-nav
        padding: 0;
        margin: 0;
        height: 30px;
        border: 1px solid #DDD;
        float: left;

    .pagination-nav-item
        float: left;
        cursor: pointer;
        border-left: 1px solid #DDD;
        list-style-type: none;
        color: #666;
        height: 28px;
        line-height: 28px;
        text-align: center;
        padding: 0 2px;
        min-width: 30px;
        background-repeat: no-repeat;

        .fa
            color:#000;
        &:first-child
            border-left: none;

    .pagination-nav-item-selected
        color: #fff;
        background-color: #22B07B;

    .pagination-nav-item-disabled
        cursor : default;
        .fa
            color : #ccc;


</style>
<script>
    /**
     * 分页栏
     */

    import Component from 'src/widgets/component';
    import logger from 'src/util/logger';

    // 分页栏最长显示多少按钮
    const NAV_LENGTH = 10;

    // 当导航到第N页时，显示保留 <<, <, 1 ... N-2, N-1, N, N+1, N+2 ... TOTAL, >, >>
    const NAV_OFFSET = 2;

    // 每页大小
    const PAGE_SIZE = 10;

    export default {

        mixins: [
            Component
        ],

        data () {
            return {
                
                // 提示文本
                moveFirstText: _('第一页'),
                movePrevText: _('上一页'),
                moveNextText: _('下一页'),
                moveLastText: _('最后一页'),

                // 显示中间的分页条
                items: []
            };
        },

        props: {
            options: {
                type: Object,
                'default' () {
                    return {

                    };
                }
            }
        },

        computed: {

            /**
             * 当前页码是否是第一页
             * @return {Boolean}
             */
            activeIsFirst () {
                let pageData = this.getPageData();
                return pageData.activePage === 1;
            },

            /**
             * 当前页码是否是最后一页
             * @return {Boolean}
             */
            activeIsLast () {
                let pageData = this.getPageData();
                return pageData.activePage === pageData.totalPage;
            },

            /**
             * 分页栏总数提示
             * @return {String}
             */
            totalText () {
                return _('总共{0}项', this._getTotal());
            }

        },

        created () {
            this._fixOptions();

            // 监听整个options，有变化时整个重新渲染
            this.$watch('options', this.sync, {
                deep: true
            });

            // 翻页时触发 pagechange 事件
            this.$watch('options.activePage', this._onPaginationChange);
        },

        mounted () {
            this.sync();
        },

        methods : {

            /**
             * 给 options 添加默认值
             * @param {String} key     字段名称
             * @param {*} defaultValue 默认值
             * @private
             */
            _setOptionsDefaultValue (key, defaultValue) {
                if (typeof this.options[key] === 'undefined') {
                    this.$set(this.options, key, defaultValue);
                }
            },

            /**
             * 设置options默认字段
             * @private
             */
            _fixOptions () {

                // 每页显示条数
                this._setOptionsDefaultValue('pageSize', PAGE_SIZE);

                // 当前第几页，从1开始
                this._setOptionsDefaultValue('activePage', 1);

                // 在...前面是否要显示第一页
                this._setOptionsDefaultValue('showFirst', true);

                // 在...后面是否要显示最后一页
                this._setOptionsDefaultValue('showLast', true);

                this._setOptionsDefaultValue('navLength', NAV_LENGTH);
                this._setOptionsDefaultValue('navOffset', NAV_OFFSET);

                // 记录总条数，外部需要设置
                this._setOptionsDefaultValue('total', 0);
            },

            /**
             * 翻页时触发
             * @param {Number} activePage 当前页码
             * @param {Number} old        变化前上次页码
             * @private
             */
            _onPaginationChange (activePage, old) {
                this.$emit('pagechange', activePage, old, this);
            },

            /**
             * 翻到前一页
             * @public
             */
            movePrev () {
                this.moveTo(this.options.activePage - 1);
            },

            /**
             * 翻到下一页
             * @public
             */
            moveNext () {
                this.moveTo(this.options.activePage + 1);
            },

            /**
             * 翻到第一页
             * @public
             */
            moveFirst () {
                this.moveTo(1);
            },

            /**
             * 翻到最后一页
             * @public
             */
            moveLast () {
                this.moveTo(this._getTotalPage());
            },

            /**
             * 翻到指定页，有异常时会自动计算到第一页或者最后一页
             * @param {Number} page 指定页
             * @public
             */
            moveTo (page) {
                if (page === '-') {
                    return;
                }
                page = parseInt(page, 10);
                if (isNaN(page)) {
                    logger.error(`[paging_bar] ${page} is not a number.`);
                    return;
                }
                if (page < 1) {
                    logger.warn(`[paging_bar] ${page} must lg 1`);
                    page = 1;
                }
                let totalPage = this._getTotalPage();
                if (page > totalPage) {
                    logger.warn(`[paging_bar] ${page} must lt ${totalPage}`);
                    page = totalPage;
                }
                
                this.options.activePage = page;
            },

            /**
             * 设置数据总条数
             * @param {Number} total 总条数
             * @public
             */
            setTotal (total) {
                this.options.total = total || 0;
            },

            /**
             * 重新渲染
             * @public
             */
            sync () {
                this._fixOptions();
                let pageData = this.getPageData();

                this.items = this._createPageItems(pageData);
            },

            /**
             * 获取当前分页状态信息
             * @return {Object} 分页状态
             * @public
             */
            getPageData () {
                let pageSize = this._getPageSize();
                return {

                    // 当前第几页，从1开始
                    activePage: this.options.activePage,

                    // 当前起始记录索引
                    start: pageSize * (this.options.activePage - 1),

                    // 每页显示条数
                    limit: pageSize,
                    pageSize: pageSize,

                    // 记录总条数
                    total: this._getTotal(),

                    // 总页数
                    totalPage: this._getTotalPage()
                };
            },

            /**
             * 生成data供页面渲染使用
             * @param {Number} id   页码
             * @param {String} text 显示的文字
             * @return {Object}     组装成渲染需要的数据格式
             * @private
             */
            _createPageItemData (id, text = id) {
                return {
                    id,
                    text,
                    selected: id === this.options.activePage
                };
            },

            /**
             * 根据分页状态信息，生成需要渲染的数据
             * @param {Object} pageData 分页状态信息
             * @return {Array} 渲染需要的数组
             * @private
             */
            _createPageItems: function (pageData) {
                const HALF = 2;
                let hideLeft = true;
                let hideRight = true;
                let halfLength = Math.ceil((this.options.navLength + 1) / HALF);
                let ret = [];

                if (pageData.activePage > pageData.totalPage) {
                    pageData.activePage = pageData.totalPage;
                }
                if (pageData.activePage < halfLength + 1 || pageData.totalPage < (this.options.navLength + 1)) {
                    hideLeft = false;
                }
                if (pageData.totalPage - pageData.activePage < halfLength || pageData.totalPage < (this.options.navLength + 1)) {
                    hideRight = false;
                }

                let showCnt = 0;
                if (!hideLeft) {
                    for (let i = 1; i < pageData.activePage + 1; i++) {
                        ret.push(this._createPageItemData(i));
                    }
                } else {
                    if (this.options.showFirst) {
                        ret.push(this._createPageItemData(1));
                    }
                    showCnt = this.options.navOffset;
                    if (!hideRight) {
                        showCnt += halfLength - (pageData.totalPage - pageData.activePage) - 1;
                    }

                    ret.push(this._createPageItemData(Math.ceil((pageData.activePage - showCnt - 1) / HALF) + 1, '...'));
                    for (let i = pageData.activePage - showCnt; i < pageData.activePage + 1; i++) {
                        ret.push(this._createPageItemData(i));
                    }
                }

                if (!hideRight) {
                    for (let i = pageData.activePage; i < pageData.totalPage; i++) {
                        ret.push(this._createPageItemData(i + 1));
                    }
                } else {
                    showCnt = this.options.navOffset;

                    // 如果左边显示的太少，则把少的数据都显示到右边来
                    if (!hideLeft) {
                        showCnt += halfLength - pageData.activePage;
                    }

                    for (let i = 1; i < showCnt + 1; i++) {
                        ret.push(this._createPageItemData(pageData.activePage + i));
                    }
                    ret.push(
                        this._createPageItemData(
                            this.options.showLast ?
                                Math.floor((pageData.totalPage - pageData.activePage - showCnt) / HALF) + pageData.activePage + showCnt :
                                '-',
                            '...'
                        )
                    );

                    if (this.options.showLast) {
                        ret.push(this._createPageItemData(pageData.totalPage));
                    }
                }

                return ret;
            },

            /**
             * 获取数据总条数
             * @return {Number} 数据总条数
             * @private
             */
            _getTotal () {
                return this.options.total || 0;
            },

            /**
             * 获取每页显示条数
             * @return {Number} 每页显示条数
             * @private
             */
            _getPageSize () {
                return this.options.pageSize || PAGE_SIZE;
            },

            /**
             * 获取总页数
             * @return {Number} 总页数
             * @private
             */
            _getTotalPage () {
                return Math.max(1, Math.ceil(this._getTotal() / this._getPageSize()));
            }
        }
    };
</script>
