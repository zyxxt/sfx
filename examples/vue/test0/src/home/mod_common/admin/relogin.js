/**
 * Created by ued on 2017/2/27.
 */

import co from 'src/util/co_not_reject';
import Vue from 'vue';

let vm = new Vue({

});
let goTo;

function logout () {
    return co(function * () {
        yield vm.$http.post('logout');
    });
}

function redirect () {
    if (process.env.NODE_ENV === 'development') {
        window.location.href = './login.html';
    } else {
        window.location.href = goTo ? `https://${goTo}/bbc/login` : './login';
    }
}

export default function relogin (ip, forceLogout = true) {
    goTo = ip;
    if (forceLogout) {
        logout()
            .then(redirect)
            .catch(redirect);
    } else {
        redirect();
    }
}
