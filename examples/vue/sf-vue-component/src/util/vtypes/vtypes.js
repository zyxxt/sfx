/**
 * Created by ued on 2016/11/3.
 */

import Name from '../validations/name';
import IPv4 from '../validations/ipv4';
import Maskv4 from '../validations/maskv4';
import Maskv4NoNumber from '../validations/maskv4_no_number';
import Port from '../validations/port';
import Email from '../validations/email';
import Domain from '../validations/domain';
import MultiEmail from '../validations/multi_email';
import IPv4OrDomain from '../validations/ipv4_or_domain';

// 这里记录所有的vtype，表单输入项可以配置
let vtypeMap = new Map();

vtypeMap.set('name', new Name());
vtypeMap.set('ip', {
    validator: new IPv4(),
    maskRe: /[\d\.]/
});
vtypeMap.set('ipv4', {
    validator: new IPv4(),
    maskRe: /[\d\.]/
});
vtypeMap.set('mask', new Maskv4());
vtypeMap.set('maskv4', new Maskv4());
vtypeMap.set('maskv4_no_number', new Maskv4NoNumber());

vtypeMap.set('port', {
    validator: new Port(),
    maskRe: /[\d]/
});
vtypeMap.set('all_port', {
    validator: new Port({
        allowZero: true
    }),
    maskRe: /[\d]/
});

vtypeMap.set('email', new Email());
vtypeMap.set('mail', new Email());
vtypeMap.set('domain', new Domain());
vtypeMap.set('multiEmail', new MultiEmail());

vtypeMap.set('ipv4_or_domain', new IPv4OrDomain());

export default vtypeMap;
