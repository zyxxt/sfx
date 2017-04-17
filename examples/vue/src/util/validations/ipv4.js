/**
 * Created by ued on 2016/11/2.
 */

import Validator from '../validation/validator';
import { parseIPv4 } from 'src/util/format';

export default class IPv4Validator extends Validator {
    verify (value) {
        let result = parseIPv4(value);
        if (result) {
            return true;
        }
        return _('不符合IPv4格式');
    }
}
