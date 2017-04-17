
/**
 * datepicker 公共方法
 * */

import { isString, isObject, isDate, isNumber } from 'src/util/typeof';
import { encodeDate, decodeDate } from 'src/util/format';

export default {

    /* eslint-disable no-magic-numbers*/

    // 是否为闰年，返回 0 和 1
    isLeapYear (year) {
        return year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0);
    },

    // 获取某年某月的天数
    getMonthCount (year, month) {
        return [31, 28 + this.isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    /**
     * 获取上一个月的年月
     * @param {Number} year
     * @param {Number} month
     * @returns {Object} {year, month}
     * */
    getPreYearMonth (year, month) {
        return {
            year: month > 0 ? year : year - 1,
            month: month > 0 ? month - 1 : 11
        };
    },

    /**
     * 获取下一个月的年月
     * @param {Number} year
     * @param {Number} month
     * @returns {Object} {year, month}
     * */
    getNextYearMonth (year, month) {
        return {
            year: month < 11 ? year : year + 1,
            month: month < 11 ? month + 1 : 0
        };
    },

    /**
     * 获取某年某月日历面板的第一天的日期数字
     * @param {Number} year
     * @param {Number} month
     * @returns {Number} date
     * */
    getFirstDateNum (year, month) {
        let pre = this.getPreYearMonth(year, month);
        let date = new Date(year, month);
        let diff = date.getDay() || 7;

        return this.getMonthCount(pre.year, pre.month) - diff + 1;
    },

    /**
     * 根据年月获取日面板数据
     * @param {Number} year
     * @param {Number} month
     * @returns {Array} dateArray
     * */
    getDateArray (year, month) {
        let preYearMonth = this.getPreYearMonth(year, month);
        let nextYearMonth = this.getNextYearMonth(year, month);
        let date = this.getFirstDateNum(year, month);
        let dateMonth = preYearMonth.month;
        let dateYear = preYearMonth.year;
        let monthArray = [];

        // 参考window系统造一个 6 X 7 的日历面板
        for (let i = 0; i < 6; i++) {

            let weekArray = [];
            for (let j = 0; j < 7; j++) {

                // 第一二行内，若日期大于上个月的最后一天日期，那么就切换到本月的一号
                if (i <= 1 && date > this.getMonthCount(preYearMonth.year, preYearMonth.month)) {
                    date = 1;
                    dateMonth = month;
                    dateYear = year;
                }

                // 第五六行内，若日期大于本月的最后一天日期，那么就切换到下一个月的一号
                if (i >= 4 && date > this.getMonthCount(year, month)) {
                    date = 1;
                    dateMonth = nextYearMonth.month;
                    dateYear = nextYearMonth.year;
                }

                weekArray.push(new Date(dateYear, dateMonth, date));

                date++;

            }
            monthArray.push(weekArray);
        }

        return monthArray;
    },

    /**
     * 转化为 {year: YYYY, month: MM, date: DD}
     * @param {Date|String|Object} value new Date | YYYY-MM-DD | [YYYY, MM, DD]
     * @returns {Array} [YYYY, MM, DD]
     * */
    parse2DateArray (value = '') {
        if (isDate(value)) {
            return [value.getFullYear(), value.getMonth(), value.getDate()];
        }

        if (isString(value)) {
            let array = value.split(/[\-\/\.]/).map(i => Number(i));
            let addArray = Array.from({length: 3 - array.length}, () => 1);

            return array.concat(addArray);
        }

        return isObject(value) ? [value.year, value.month, value.date] : [];
    },

    /**
     * 转化为 日期对象
     * @param value 时间戳 | 'Y-m-d' | Date | Object{year, month, date}
     * @returns {Date} 日期对象
     * */

    newDate (value) {
        if (!value) {
            return new Date();
        }

        if (isDate(value)) {
            return value;
        }

        if (isNumber(value)) {
            return new Date(value);
        }

        if (isString(value)) {
            return decodeDate(value);
        }

        if (isObject(value)) {
            return new Date(value.year, value.month || 0, value.date || 1);
        }

        return new Date();
    },

    /**
     * 时间格式化的函数，简化实现，只支持YmdHis几种关键字
     * @param {String} format 日期格式化方式
     * @returns {Function} 格式化函数
     * */

    dateRenderer (format) {
        return date => encodeDate(date, format);
    },

    /**
     * 构造一个时间范围内的年的数组
     * @param {Number} startYear
     * @param {Number} endYear
     * @returns {Array} yearArray
     * */
    getYearArray (startYear, endYear) {
        let diff = endYear - startYear;
        let year = startYear;
        let yearArray = [];

        for (let i = 0; i < diff + 1; i++) {
            yearArray.push(year);
            year++;
        }

        return yearArray;
    },

    /**
     * 根据当前年份以及限制的起始日期和结束日期构造该年份的月份数组
     * @param startDate
     * @param endDate
     */

    getMonthArray (year, startDate, endDate) {
        let startYear = startDate.getFullYear();
        let endYear = endDate.getFullYear();
        let isOver = year < startYear || year > endYear;

        if (isOver) {
            return [];
        }

        switch (year) {
            case startYear:
                let startMonth = startDate.getMonth();
                return Array.from({length: 12 - startMonth}).map((a, i) => startMonth + i);
            case endYear:
                return Array.from({length: endDate.getMonth() + 1}).map((a, i) => i);
            default:
                return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        }
    },

    getWeekArray () {
        return [0, 1, 2, 3, 4, 5, 6];
    },

    /**
     * 判断两个日期是否在同一个月内
     * @param value1 时间戳 | 'Y-m-d' | Date | Object{year, month, date}
     * @param value2 时间戳 | 'Y-m-d' | Date | Object{year, month, date}
     * @returns {boolean}
     */

    isSameMonth (value1, value2) {
        let date1 = this.newDate(value1);
        let date2 = this.newDate(value2);

        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
    }
};
