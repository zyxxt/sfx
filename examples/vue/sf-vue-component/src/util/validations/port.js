/**
 * Created by ued on 2017/1/17.
 */

import Validator from '../validation/validator';

const REGEXP = /^\d+$/i;
const MIN = 0;
const MAX = 65536;

export default class PortValidator extends Validator {

    constructor (options = {}) {
        super(options);

        this.allowZero = options.allowZero === true;
    }

    verify (value) {
        let port;
        if (REGEXP.test(value)) {

            port = parseInt(value, 10);
            if (port >= MIN + (this.allowZero ? 0 : 1) && port < MAX) {
                return true;
            }
            return _('不符合端口格式，有效取值范围为{0}', this.allowZero ? '0~65535' : '1~65535');
        }
        return _('不符合端口格式');
    }
};
