/**
 * Created by ued on 2016/11/3.
 */

import Name from '../validations/name';
import SfVueComponent from 'sf-vue-component';


function install () {
    let vtypeMap = SfVueComponent.vtypes;
    vtypeMap.set('name', new Name());


    return vtypeMap;
}

export default {
    install
};
