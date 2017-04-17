<template>
    <div>
        <div class="datepicker-demo">
            <p>当前选择日期：<br>{{ date1 | dateFormatter }}</p>
            <sf-datepicker v-model="date1" @select="selectDate"></sf-datepicker>
        </div>

        <div class="datepicker-demo">
            <p>当前选择日期范围：<br>{{ date2.start | dateFormatter }} - {{ date2.end | dateFormatter }}</p>
            <sf-datepicker type="range" v-model="date2" default-view="end" @select="selectRangeDate">
            </sf-datepicker>
        </div>
        <br>
        <div class="datepicker-demo">
            <p>当前选择日期范围：<br>{{ date3.start | dateFormatter }} - {{ date3.end | dateFormatter }}</p>
            <sf-daterangepicker v-model="date3" @select="select2PickerRangeDate"></sf-daterangepicker>
        </div>
    </div>

</template>

<script>
    /**
     * demo
     * */


    import Vue from 'vue';
    import { encodeDate, decodeDate } from 'src/util/format';
    import logger from 'src/util/logger';

    export default {
        data () {
            return {
                date1: new Date(),
                date2: {
                    start: '2017-1-3',
                    end: '2017-1-26'
                },
                date3: {
                    start: '2017-1-3',
                    end: '2017-1-26'
                }
            };
        },


        filters: {
            dateFormatter (date) {
                return date ? encodeDate(date) : '';
            }
        },

        methods: {
            selectDate (date) {
                logger.log(date);
            },

            selectRangeDate (startDate, endDate) {
                logger.log('start: ', startDate);
                logger.log('end', endDate);
            },

            select2PickerRangeDate (startDate, endDate) {
                logger.log('start: ', startDate);
                logger.log('end', endDate);
            }
        }
    };
</script>

<style>
    .datepicker-demo {
        margin: 20px;
        display: inline-block;
    }
</style>
