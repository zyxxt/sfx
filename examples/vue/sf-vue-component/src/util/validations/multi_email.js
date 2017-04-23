/**
 * Created by ued on 2017/1/12.
 */

import MultiLineCompositeValidator from '../validation/multi_line_composite_validator';
import Email from './email';

export default class MultiEmail extends MultiLineCompositeValidator {

    constructor (option) {

        option = option || {};
        Object.assign(option, {
            validator: new Email(option.emailCfg)
        });

        super(option);
    }

}
