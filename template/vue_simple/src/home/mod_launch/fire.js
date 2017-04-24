/**
 * Created by zhangyuantao on 2017/4/23.
 */

import Welcome from '../mod_index/welcome.vue';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

let app = new Vue({
    template: `
        <welcome></welcome>
    `,
    components: {
        Welcome
    }
});
app.$mount('#app');
