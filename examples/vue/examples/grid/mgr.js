/**
 * Created by ued on 2016/12/15.
 */

import SFVueComponent from 'sf-vue-component';
import logger from 'src/util/logger';

export default class Mgr extends SFVueComponent.GridMgr {

    constructor (options) {
        super(options);

        logger.log('init test grid mgr');
    }

    onGridAdd () {

        //logger.log(table, rs, options, event);
        logger.log('onGridAdd');
        this.$ok('ok');
    }

    onGridDelete () {
        logger.log('onGridDelete');
    }

    onGridSet (table) {
        let data = table.options.data;
        table.setSelections(data.slice(1, 20));
    }

    onGridLoad (table) {
        let pagination = this.options.pagination,
            data = this._getData();
        table.loadData(data.data);

        // 后台分页时需要设置total
        pagination && pagination.setTotal(data.total);
    }

    onGridMoveNext () {
        this.pagination.moveNext();
    }

    onGridPaging (v) {
        logger.log(v);
    }

    onGridSearch (table, rs, option, filterText) {
        if (!filterText) {
            table.clearFilter();
            return;
        }
        table.filterBy(function (record) {
            if (record.a === filterText) {
                return true;
            }
            return false;
        });
    }

    onGridFilter () {
        logger.log('onGridFilter')
    }

    _getData () {
        return {
            total: 3000,
            data : Array.from(Array(Math.ceil(Math.random() * 100))).map(function (v, i) {
                return {
                    a: 'a' + i,
                    b: 'b' + i,
                    c: 'c' + i,
                    selectAble: true,
                    selected: false
                };
            })
        }
    }

}
