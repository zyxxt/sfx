/**
 * Created by zhangyuantao on 2017/3/7.
 */

import Vue from 'vue';
import Welcome from './mod_index/welcome.vue';

let app = new Vue({

    template: `
        <welcome></welcome>
    `,

    components: {
        Welcome
    }

});
app.$mount('#app');
