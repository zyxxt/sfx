/**
 * Created by ued on 2017/1/21.
 */

import OrCompositeValidator from '../validation/or_composite_validator';
import Domain from './domain';
import IPv4 from './ipv4';

export default class IPv4OrDomainValidator extends OrCompositeValidator {

    invalidText = _('不符合域名或IP的格式');

    constructor (options) {
        super(options);

        this.validators = [
            new Domain(),
            new IPv4()
        ];
    }
};
