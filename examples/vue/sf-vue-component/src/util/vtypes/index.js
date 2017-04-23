/**
 * Created by ued on 2017/1/12.
 */

import Validator from '../validation/validator';
import JoinedCompositeValidator from '../validation/joined_composite_validator';
import MultiLineCompositeValidator from '../validation/multi_line_composite_validator';
import OrCompositeValidator from '../validation/or_composite_validator';
import SimpleCompositeValidator from '../validation/simple_composite_validator';
import validations from '../validations/index';
import vtypes from './vtypes';

export default {

    Validator,
    JoinedCompositeValidator,
    MultiLineCompositeValidator,
    OrCompositeValidator,
    SimpleCompositeValidator,

    validations,
    vtypes

};
