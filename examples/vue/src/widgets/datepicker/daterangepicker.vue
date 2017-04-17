<template>
    <div class="sf-datepicker-range">
        <sf-datepicker type="range" ref="leftPicker"
                       class="datepicker-range-item"
                       v-model="date"
                       range-month-view="start"
                       :watch-change="false"
                       :start-limit="startLimit"
                       :end-limit="endLimit"
                       @select="selectRange">
        </sf-datepicker>
        <sf-datepicker type="range" ref="rightPicker"
                       class="datepicker-range-item"
                       v-model="date"
                       range-month-view="end"
                       :watch-change="false"
                       :start-limit="startLimit"
                       :end-limit="endLimit"
                       @select="selectRange">
        </sf-datepicker>
    </div>
</template>

<script>
    /**
     * sf-daterangepicker 组件 （两个 datepicker 面板的组件）
     * <sf-daterangepicker v-model="date" start-limit="2000-1-1" end-limit="2030-12-31"></sf-daterangepicker>
     * */

    import Util from './util';

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

            // 必须是形如 {start, end} 的对象，start 与 end String (YYYY-MM-DD) Number (毫秒时间戳) Date (时间对象) 三种方式
            value: {}
        },

        data () {
            return {
                date: this.value
            };
        },

        watch: {
            value (value) {
                this.date = value;
            },

            /**
             * 监听 date 的值，如果该值不在当前月份的话，要切换到对应的 start end 的月份
             */

            date () {
                this.updateRangeView();
            }

        },

        mounted () {
            this.$leftPicker = this.$refs.leftPicker;
            this.$rightPicker = this.$refs.rightPicker;

            this.updatePickerCaret(); // 显示或隐藏左右面板前后月份操作的箭头
            this.updateYearArray(); // 初始化两面板的年下拉框选项
            this.updateMonthArray(); // 初始化两面板的月下拉框选项

            this.bindEvents(); // 绑定点击前后箭头事件

            this.initRangeView(); // 初始化月份面板
        },

        methods: {

            /**
             * 初始化月份面板，这里先把右边面板跳到下一个月（因为一开始左右面板都设置了本月，导致后面 updateRangeView 判断有问题）
             */

            initRangeView () {
                this.$rightPicker.triggerNext();
                this.updateRangeView();
            },

            /**
             * 绑定事件
             */

            bindEvents () {
                let $leftPicker = this.$leftPicker;
                let $rightPicker = this.$rightPicker;

                // 改变视图时同时改变选择时间的范围限制以及改变前后箭头的显示隐藏状态
                $leftPicker.$on('change.view', () => {
                    this.updateYearArray();
                    this.updateMonthArray();
                    this.updatePickerCaret();
                });

                $rightPicker.$on('change.view', () => {
                    this.updateYearArray();
                    this.updateMonthArray();
                    this.updatePickerCaret();
                });

                // 鼠标悬浮事件
                $leftPicker.$on('hover', date => {
                    $rightPicker.hoverDate = date;
                });

                $rightPicker.$on('hover', date => {
                    $leftPicker.hoverDate = date;
                });
            },

            /**
             * 显示或隐藏左右 Picker 前后月份操作的箭头
             */

            updatePickerCaret () {
                let rightPre = Util.getPreYearMonth(this.$rightPicker.curYear, this.$rightPicker.curMonth);
                let leftNext = Util.getNextYearMonth(this.$leftPicker.curYear, this.$leftPicker.curMonth);
                let isPreOfEnd = this.$leftPicker.curYear === rightPre.year && this.$leftPicker.curMonth === rightPre.month;
                let isNextOfStart = this.$rightPicker.curYear === leftNext.year && this.$rightPicker.curMonth === leftNext.month;

                this.$leftPicker.showNextCaret = !isPreOfEnd;
                this.$rightPicker.showPreCaret = !isNextOfStart;
            },

            /**
             * 更新两面板的年下拉框选项
             * 左面板年份下拉框范围：起始年份 ~ 右面板上一个月份的所在年份
             * 右面板年份下拉框范围：左面板下一个月份的所在年份 ~ 结束年份
             */

            updateYearArray () {
                let start = Util.newDate(this.startLimit);
                let end = Util.newDate(this.endLimit);
                let rightPre = Util.getPreYearMonth(this.$rightPicker.curYear, this.$rightPicker.curMonth);
                let leftNext = Util.getNextYearMonth(this.$leftPicker.curYear, this.$leftPicker.curMonth);

                this.$leftPicker.updateYearArray(start.getFullYear(), rightPre.year);
                this.$rightPicker.updateYearArray(leftNext.year, end.getFullYear());
            },

            /**
             * 更新两面板的月下拉框选项
             * 左面板月份下拉框范围：
             */

            updateMonthArray () {
                let start = Util.newDate(this.startLimit);
                let end = Util.newDate(this.endLimit);
                let rightPre = Util.getPreYearMonth(this.$rightPicker.curYear, this.$rightPicker.curMonth);
                let leftNext = Util.getNextYearMonth(this.$leftPicker.curYear, this.$leftPicker.curMonth);

                this.$leftPicker.updateMonthArray(start, Util.newDate(rightPre));
                this.$rightPicker.updateMonthArray(Util.newDate(leftNext), end);
            },


            /**
             * 更新面板视图
             * 由于两个面板都设置了 watchChange = false, 这意味着 date 改变并不会同步改变月份面板，所以要手动更新一下
             */

            updateRangeView () {
                let start = Util.newDate(this.date.start);
                let end = Util.newDate(this.date.end);

                // 当只选中一个日期时，左边面板显示该日期月份，右边面板显示该日期的下一个月份
                if (!this.date.end) {
                    this.$leftPicker.setYearMonth(start.getFullYear(), start.getMonth());
                    this.$rightPicker.setYearMonth(start.getFullYear(), start.getMonth());
                    this.$rightPicker.triggerNext();
                    return;
                }

                // 情况一：范围日期在同一个月时：如果在这两天在左面或者右边，不用管；否则设置月份视图
                // 情况二：范围日期不在同一个月时：如果开始跟结束分别处于左边以及右边，不用管；否则设置月份视图
                if (Util.isSameMonth(start, end)) {
                    if (this.$leftPicker.isInThisMonth(start) || this.$rightPicker.isInThisMonth(start)) {
                        return;
                    }

                    // 用左边月份视图来显示范围日期，右边月份视图为左边的下一个月
                    this.$leftPicker.setYearMonth(start.getFullYear(), start.getMonth());
                    this.$rightPicker.setYearMonth(start.getFullYear(), start.getMonth());
                    this.$rightPicker.triggerNext();

                } else {
                    if (this.$leftPicker.isInThisMonth(start) && this.$rightPicker.isInThisMonth(end)) {
                        return;
                    }

                    // 用左边月份视图显示开始日期，右边月份视图显示结束日期
                    this.$leftPicker.setYearMonth(start.getFullYear(), start.getMonth());
                    this.$rightPicker.setYearMonth(end.getFullYear(), end.getMonth());

                }
            },

            /**
             * 点击日期的回调
             * @param start
             * @param end
             */

            selectRange (start, end) {
                this.$emit('select', start, end);

                this.$emit('input', {
                    start: start,
                    end: end
                });

                if (end) {
                    this.$emit('selected', start, end);
                }
            },

            /**
             * 返回当前日期的值（貌似没什么用？）
             * @returns {Date}
             */

            getDateValue () {
                return this.date;
            }

        }
    };
</script>

<style lang="stylus">
    .sf-datepicker-range
        border: 1px solid #ccc;
        display: inline-block;

        .datepicker-range-item
            display: inline-block;
            border: none;
</style>
