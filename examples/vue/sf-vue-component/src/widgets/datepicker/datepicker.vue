<template>
    <div class="sf-datepicker">
        <div class="datepicker-header">
            <i v-show="showPreCaret" class="fa fa-caret-left left-caret-icon" @click="triggerPre"></i>
            <sf-select v-model="curYear" :default-width="70" :options="yearArray" @change="changeYear"></sf-select>
            <sf-select v-model="curMonth" :default-width="80" :options="monthArray" @change="changeMonth"></sf-select>
            <i v-show="showNextCaret" class="fa fa-caret-right right-caret-icon" @click="triggerNext"></i>
        </div>
        <div class="datepicker-body">
            <div class="datepicker-week">
                <div class="datepicker-week-ceil" v-for="week in weekArray">{{week}}</div>
            </div>
            <div class="datepicker-date-row" v-for="dateRow in dateArray">
                <div class="datepicker-date-ceil" v-for="date in dateRow"
                     :class="getDateCls(date)"
                     @click="doSelectDate(date)"
                     @mouseover="doHoverDate(date)">{{date.getDate()}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    /**
     * sf-datepicker 组件
     * v-model 支持 String (YYYY-MM-DD) Number (毫秒时间戳) Date (时间对象) 三种方式
     * <sf-datepicker ref="datePicker"
     *              v-model="date"
     *              type="single" // single | range
     *              range-month-view="start" // start | end
     *              @select="selectDate"
     *              start-limit="2000-1-1"
     *              end-limit="2030-12-31">
     * </sf-datepicker>
     *
     * 其他方法：
     * this.$refs.datePicker.$on('selected', fn) 更新日历面板时触发
     * this.$refs.datePicker.$on('change.view', fn) 更新日历面板时触发
     *
     * 更多配置解释见下方
     * */

    import Util from './util';
    import lang from './lang';

    export default {
        props: {
            startLimit: {
                type: String,
                'default': '2000-01-01'
            },

            endLimit: {
                type: String,
                'default': '2030-12-31'
            },

            type: {
                type: String,
                'default': 'single' // range
            },

            // 显示选中的日期的所在月份，当配置范围日期时有效，默认为 start，可配值还有 end
            rangeMonthView: {
                type: String,
                'default': 'start'
            },

            // 是否监听值的变化而改变月份视图，默认为 true
            watchChange: {
                type: Boolean,
                'default': true
            },

            // 支持 String (YYYY-mm-dd) Number (毫秒时间戳) Date (时间对象) 三种方式
            // 如果配置了 type === range，则配置 {start, end} 作为起始和结束
            value: {}
        },

        data () {
            let now = new Date();

            return {
                yearArray: [],
                monthArray: [],
                weekArray: [],
                dateArray: [],
                selectedDate: [], // single 时只有一个元素，range 时有两个
                hoverDate: null,
                curYear: now.getFullYear(),
                curMonth: now.getMonth(),
                showPreCaret: true,
                showNextCaret: true
            };
        },

        mounted () {
            this.initYearMonthWeek();
            this.updateDate(this.value);
            this.updateView();
        },

        watch: {

            /**
             * 监听 v-model 的值，如果变化则修改选中的日期
             * @param value
             */

            value (value) {
                this.updateDate(value);

                if (this.watchChange) {
                    this.updateView();
                }
            }
        },

        methods: {

            /**
             * 初始化年下拉框和月下拉框
             */

            initYearMonthWeek () {
                let start = Util.newDate(this.startLimit);
                let end = Util.newDate(this.endLimit);

                this.updateYearArray(start.getFullYear(), end.getFullYear());
                this.updateMonthArray(start, end);

                this.weekArray = Util.getWeekArray().map(i => lang.zh.week[i]);
            },

            /**
             * 根据限制的起始年份和结束年份构造年下拉框
             * @param startYear
             * @param endYear
             */

            updateYearArray (startYear, endYear) {

                this.yearArray = Util.getYearArray(startYear, endYear).map(
                    i => {
                        return {
                            label: i,
                            value: i
                        };
                    }
                );
            },

            /**
             * 根据当前年份以及限制的起始日期和结束日期构造该年份的月下拉框
             * @param startDate
             * @param endDate
             */

            updateMonthArray (startDate, endDate) {
                this.monthArray = Util.getMonthArray(this.curYear, startDate, endDate).map(
                    i => {
                        return {
                            label: lang.zh.month[i],
                            value: i
                        };
                    }
                );
            },

            /**
             * 改变年下拉框时触发
             * @param value
             */

            changeYear (value) {
                this.curYear = value;
                this.updateMonthView();
            },

            /**
             * 改变月下拉框时触发
             * @param value
             */

            changeMonth (value) {
                this.curMonth = value;
                this.updateMonthView();
            },

            /**
             * 触发改变为上一月份的视图
             */

            triggerPre () {
                let preYearMonth = Util.getPreYearMonth(this.curYear, this.curMonth);
                this.curYear = preYearMonth.year;
                this.curMonth = preYearMonth.month;
                this.updateMonthView();
            },

            /**
             * 触发改变为下一月份的视图
             */

            triggerNext () {
                let nextYearMonth = Util.getNextYearMonth(this.curYear, this.curMonth);
                this.curYear = nextYearMonth.year;
                this.curMonth = nextYearMonth.month;
                this.updateMonthView();
            },

            /**
             * 判断指定日期是否被激活（日期是选中的并且属于当前显示的那个月份）
             * @param date
             * @returns {boolean}
             */

            isActive (date) {
                return this.isSelect(date) && this.isInThisMonth(date);
            },

            /**
             * 判断指定日期是否被选中
             * @param date
             * @returns {boolean}
             */

            isSelect (date) {
                return this.selectedDate.some(item => {
                    return date.getFullYear() === item.getFullYear() &&
                        date.getMonth() === item.getMonth() &&
                        date.getDate() === item.getDate();
                });

            },

            /**
             * 判断指定日期是否属于选中日期范围内的日期
             * @param date
             * @returns {boolean}
             */

            isBetweenRange (date) {
                if (this.type === 'single' || !this.selectedDate.length) {
                    return '';
                }

                let eachDateVal = date.getTime();
                let leftDate = this.selectedDate[0].getTime();
                let rightDate = this.selectedDate.length > 1 ? this.selectedDate[1].getTime() : this.hoverDate.getTime();
                let isBetweenFn = (left, right) => {
                    return right > left && eachDateVal > left && eachDateVal < right;
                };

                return isBetweenFn(leftDate, rightDate) && this.isInThisMonth(date);

            },

            /**
             * 判断指定日期是否超出了限制的日期范围
             * @param date
             * @returns {boolean}
             */

            isOver (date) {
                let start = Util.newDate(this.startLimit);
                let end = Util.newDate(this.endLimit);

                return date.getTime() < start.getTime() || date.getTime() > end.getTime();
            },

            /**
             * 判断指定日期是否属于当前显示的那个月份
             * @param date
             * @returns {boolean}
             */

            isInThisMonth (date) {
                return date.getFullYear() === this.curYear && date.getMonth() === this.curMonth;
            },

            /**
             * 判断指定日期是否属于上一月份
             * @param date
             * @returns {boolean}
             */

            isInPreMonth (date) {
                let pre = Util.getPreYearMonth(this.curYear, this.curMonth);

                return pre.year === date.getFullYear() && pre.month === date.getMonth();
            },

            /**
             * 判断指定日期是否属于下一月份
             * @param date
             * @returns {boolean}
             */

            isInNextMonth (date) {
                let next = Util.getNextYearMonth(this.curYear, this.curMonth);

                return next.year === date.getFullYear() && next.month === date.getMonth();
            },

            /**
             * 返回指定日期应该添加哪些样式
             * @param date
             * @returns {Object}
             */

            getDateCls (date) {
                return {
                    active: this.isActive(date),
                    other: !this.isInThisMonth(date),
                    between: this.isBetweenRange(date),
                    over: this.isOver(date)
                };
            },

            /**
             * 返回选中的日期
             * @returns {Object} 格式为{start, end}
             */

            getDateValue () {
                if (this.type === 'single') {
                    return this.selectedDate[0];
                }

                return {
                    start: this.selectedDate[0],
                    end: this.selectedDate[1]
                };
            },

            /**
             * 点击日期时触发
             * @param date
             */

            doSelectDate (date) {

                // 如果日期超出限制，则啥都不干
                if (this.isOver(date)) {
                    return;
                }

                // 如果日期属于上一个月，则触发切换到上一个月份
                if (this.isInPreMonth(date)) {
                    this.triggerPre();
                }

                // 如果日期属于下一个月，则触发切换到下一个月份
                if (this.isInNextMonth(date)) {
                    this.triggerNext();
                }

                // 单选和范围选择分别有不同的处理
                if (this.type === 'single') {
                    this.doSelectSingleDate(date);
                    this.$emit('selected', date);
                } else {
                    this.doSelectRangeDate(date);
                    if (this.selectedDate.length > 1) {
                        this.$emit('selected', this.selectedDate[0], this.selectedDate[1]);
                    }
                }
            },

            /**
             * 单选时选中日期触发回调
             * @param date
             */

            doSelectSingleDate (date) {
                this.selectedDate = [date];

                this.$emit('select', date);
                this.$emit('input', date);
            },

            /**
             * 范围选择时选中日期触发回调
             * @param date
             */

            doSelectRangeDate (date) {

                // selectedDate 的长度只有 1 和 2 两种情况
                if (this.selectedDate.length === 1) {
                    let startTime = this.selectedDate[0].getTime();

                    if (date.getTime() < startTime) {
                        this.selectedDate = [date];
                    } else {
                        this.selectedDate.push(date);
                    }

                } else {
                    this.selectedDate = [date];
                }

                this.$emit('select', this.selectedDate[0], this.selectedDate[1]);

                this.$emit('input', {
                    start: this.selectedDate[0],
                    end: this.selectedDate[1]
                });
            },

            /**
             * 鼠标悬浮在日期上时触发回调
             * @param date
             */

            doHoverDate (date) {
                this.hoverDate = date;
                this.$emit('hover', date);
            },

            /**
             * 更新选中的日期。
             * @param date
             */

            updateDate (date) {
                if (this.type === 'range') {
                    this.selectedDate = [];

                    if (date.start) {
                        this.selectedDate.push(Util.newDate(date.start));
                    }
                    if (date.end) {
                        this.selectedDate.push(Util.newDate(date.end));
                    }
                } else {
                    this.selectedDate = [Util.newDate(date)];
                }
            },

            /**
             * 根据指定日期更新视图，显示选中的是哪个年，月，日
             */

            updateView () {
                let curYearMonth = this.getCurYearMonth();

                this.curYear = curYearMonth.year;
                this.curMonth = curYearMonth.month;
                this.updateMonthView();
            },

            /**
             * 获取当前的年份和月份 （依赖选中日期，此时已保证必定会有这个值了）
             * @returns {{year: number, month: number}}
             */

            getCurYearMonth () {
                let posDate = this.selectedDate[0];

                // 如果是选中范围日期 并且 配置为显示结束日期的月份 并且 已经选好了两个日期，则显示结束日期的月份
                if (this.type === 'range' &&
                    this.rangeMonthView === 'end' &&
                    this.selectedDate.length > 1) {

                    posDate = this.selectedDate[1];
                }

                return {
                    year: posDate.getFullYear(),
                    month: posDate.getMonth()
                };
            },

            /**
             * 设置当前的年份和月份
             * @param year
             * @param month
             */

            setYearMonth (year, month) {
                this.curYear = year;
                this.curMonth = month;
                this.updateMonthView();
            },

            /**
             * 更新日历面板 （依赖选中日期，此时已保证必定会有这个值了）
             */

            updateMonthView () {
                let pre = Util.getPreYearMonth(this.curYear, this.curMonth);
                let next = Util.getNextYearMonth(this.curYear, this.curMonth);
                let start = Util.newDate(this.startLimit);
                let end = Util.newDate(this.endLimit);

                this.showPreCaret = new Date(pre.year, pre.month).getTime() >= start.getTime();
                this.showNextCaret = new Date(next.year, next.month).getTime() <= end.getTime();

                this.dateArray = Util.getDateArray(this.curYear, this.curMonth);
                this.updateMonthArray(start, end);
                this.$emit('change.view');
            }
        }
    };
</script>

<style lang="stylus">
    ceilCommon()
        display: inline-block;
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;

    caretCommon()
        width: 20px;
        height: 20px;
        font-size: 20px;
        cursor: pointer;
        position: absolute;
        top: 4px;

    .sf-datepicker
        width: 230px;
        height: 250px;
        padding: 12px;
        text-align: center;
        border: 1px solid #ccc;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;

        .datepicker-header
            position: relative;

            i.left-caret-icon
                caretCommon();
                left: 4px;

            i.right-caret-icon
                caretCommon();
                right: 4px;

        .datepicker-week-ceil
            ceilCommon();
            font-family: '微软雅黑';
            margin-bottom: 5px;

        .datepicker-date-ceil
            ceilCommon();

            &.other, &.over
                color: #ccc;

            &.between
                background: #EBF4F8;

            &:hover
                background: #EEEEEE;

            &.active
                background: #17C1C5;
                color: #fff;

</style>
