/**
 * 宽松的电子邮件地址校验，邮箱名以RFC 2822为准，域名以
 * @class Email
 * @extends SimpleCompositeValidator
 */

import SimpleCompositeValidator from '../validation/simple_composite_validator';
import EmailName from './email_name';
import Domain from './domain';

const NAME_INDEX = 1;
const DOMAIN_INDEX = 2;

export default class Email extends SimpleCompositeValidator {

    constructor (option) {
        option = option || {};
        Object.assign(option, {
            regex : /^(.+?)@(.+)$/,
            matchInvalidText : _('不符合“name@domain”的书写格式'),
            blocks : [
                {
                    name : _('邮箱名'),
                    index : NAME_INDEX,
                    validator : new EmailName(option.nameCfg)
                },
                {
                    name : _('邮件服务器'),
                    index : DOMAIN_INDEX,
                    validator : new Domain(option.domainCfg)
                }
            ]
        });
        super(option);
    }
};
