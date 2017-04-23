/**
 * Created by ued on 2016/12/14.
 */

import BaseMgr from './base_mgr';
import logger from 'src/util/logger';
import { isFunction, isNumber } from 'src/util/typeof';
import { capitalize } from 'src/util/format';
import { applyIf } from 'src/util/apply';

const DEFAULT_AS = [
    'delete',
    'modify',
    'edit',
    'moveup',
    'movedown',
    'enable',
    'disable',
    'move'
];

export default class GridMgr extends BaseMgr {

    constructor (options) {
        applyIf(options, {
            prefix: 'grid'
        });

        super(options);
        Object.assign(this, options);

    }

    _init (options) {
        super._init(options);

        if (!options.table) {
            logger.error('[GridMgr] table required');
            return false;
        }

        this._initToolbar();
        this._initPagination();
        this._bindToolbarActionName();
        this._bindTableActionName();
        return true;
    }

    _initPagination () {
        let options = this.options;
        options.pagination = options.pagination || this.options.table.getPagination();
        if (!options.pagination) {
            return false;
        }
        options.pagination.$on('pagechange', (v, pagination) => {
            let fn = this._getTriggerFunctionByActionName('paging');
            if (!fn) {
                return;
            }
            fn.call(this, v, pagination, options.table);
        });
    }

    _initToolbar () {
        let options = this.options;
        if (!options.toolbar) {
            return false;
        }
        let enableSelectMust = false;
        options.toolbar.$children.forEach(function (component) {
            if (component.selectMust === true || isFunction(component.selectMust) ||
                (component.selectMust !== false && DEFAULT_AS.indexOf(component.actionName) >= 0)) {

                enableSelectMust = true;
            }
        });
        if (!enableSelectMust) {
            return false;
        }
        this._updateTbarButtonDisabled();
        this.options.table.$on('selectionchange', () => {
            this._updateTbarButtonDisabled();
        });
        this.options.table.$on('load', () => {
            this._updateTbarButtonDisabled();
        });
        return true;
    }

    /**
     * 根据SelectionModel的数据判断是否要调整工具栏上各操作的启用/禁用状态.
     *
     * @private
     */
    _updateTbarButtonDisabled () {
        var tbar = this.options.toolbar;
        let enable;
        let map = new Map();
        if (!tbar) {
            return;
        }

        // 当前是否有选中记录，如果有，则按钮启用。否则禁用。
        enable = this._hasRecordSeleced();

        DEFAULT_AS.forEach(function (actionName) {
            map.set(actionName, true);
        });

        // 遍历各工具栏按钮，进行启用/禁用状态更新
        tbar.$children.forEach(function (comp) {
            let selectMust = comp.selectMust;
            let actionName = comp.actionName;

            /**
             * @member SFButton
             * @cfg {Boolean/Number/Function} selectMust <b>注意</b>：仅当放置于Grid#tbar中才有效。<br />
             * 1. 当为true时，Grid选中至少一条记录才会启用该按钮。配置为false永不生效。<br />
             * 2. 如果为数字，则限定达到多少条才会启用该按钮。(例如批量编辑时，设置为2)
             * 3. 如果为函数，那么将以grid, this作为参数调用，如果返回true代表可操作，否则就禁用该按钮。<br />
             * 4. 当未配置时，如果配置有actionName，并actionName被包含于grid.defaultAS配置中时，默认也会生效。<br />
             */
            if (isFunction(selectMust)) {

                // 函数优先进行判断，因为后面有默认处理( !== false)
                comp.disabled = !selectMust(comp);

            } else if (isNumber(selectMust) && selectMust > 0) {

                comp.disabled = enable < selectMust;

            } else if (selectMust === true || (selectMust !== false && actionName && map.get(actionName))) {

                // 当selectMust配置为true，或没有配置但在defaultAS中时生效
                comp.disabled = !enable;
            }
        });
    }

    _hasRecordSeleced () {
        let table = this.options.table;
        if (!table) {
            return false;
        }
        return table.getSelections().length;
    }

    _bindToolbarActionName () {
        this.options.toolbar.$children.filter(comp => !!comp.actionName).forEach((comp) => {
            let fn = this._getTriggerFunctionByActionName(comp.actionName);
            if (!fn) {
                return;
            }
            comp.$on('action', (event) => {
                fn.call(this, this.options.table, this.options.table.getSelections(), {
                    type: 'toolbar'
                }, event);
            });
        });
    }

    _getTriggerFunctionByActionName (actionName) {
        let fnName = `on${capitalize(this.prefix || '')}${capitalize(actionName)}`;
        if (!this[fnName]) {
            logger.log(`${fnName} not found`);
            return;
        }
        return this[fnName];
    }

    _bindTableActionName () {
        this.options.table.$on('cellclick', (record, event, row, col) => {
            let target = event.target;
            let actionName = target.getAttribute('actionName') ||
                             target.getAttribute('actionname') ||
                             target.getAttribute('action-name');
            if (!actionName) {
                return;
            }
            let fn = this._getTriggerFunctionByActionName(actionName);
            if (!fn) {
                return;
            }
            fn.call(this, this.options.table, [record], {
                type: 'cell',
                row: row,
                col: col
            }, event);
        });
    }


    onGridAdd () {}
    onGridEdit () {}
    onGridModify () {}
    onGridDelete () {}

}
