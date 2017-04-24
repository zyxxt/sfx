/**
 * Created by ued on 2017/1/9.
 */

import Validator from '../validation/validator';
import { trim } from 'src/util/format';
import { getUTF8Length } from 'src/util/lang';

export default class NameValidator extends Validator {

    verify (v) {
        const MAX_LENGTH = 90;
        const MAX_LENGTH_TEXT = _('该输入项的最大长度是90个字符，或者30个汉字');
        const REG = /^[\s\.\(\)\[\]\{\}（）【】｛｝@\d\u4E00-\u9FA5a-zA-Z_+|?\-]+$/;

        v = trim(v);
        if (getUTF8Length(v) > MAX_LENGTH) {
            return MAX_LENGTH_TEXT;
        }
        if (!REG.test(v)) {
            return _('该输入项只能由中文、数字、字母、()[]{}（）【】｛｝@|.?_-+组成');
        }

        // 这里加上限制，不能以.开头
        if (v.length) {
            if (v.charAt(0) === '.') {
                return _('该输入项不允许以字符“.”开头');
            }
        }
        return true;
    }
}
