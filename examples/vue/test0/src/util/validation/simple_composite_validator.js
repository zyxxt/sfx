/**
 * 简单组合校验器，通过简单的正则表达式进行拆分校验。  <br />
 * 例如“username:password”，通过正则“^(\w+):(\w+)$”拆分，定义的blocks如下： <br />
 * [{ name: "用户名", validator: usernameValidator}, { name: "密码", validator: passwordValidator}]
 * @class SimpleCompositeValidator
 * @extends Validator
 */


import SfVueComponent from 'sf-vue-component';

export default class SimpleCompositeValidator extends SfVueComponent.SimpleCompositeValidator {

}
