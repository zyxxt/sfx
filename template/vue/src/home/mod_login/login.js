/**
 * Created by zhangyuantao on 2017/4/23.
 */

import Login from './login.vue';
import Vue from 'vue';

let app = new Vue({
    template: `
        <login></login>
    `,
    components: {
        Login
    }
});
app.$mount('#app');
