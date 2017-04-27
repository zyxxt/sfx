/**
 * Created by zhangyuantao on 2017/4/23.
 */

(function () {
    const REMOTE_KEY = 'remote';
    const HTTP_HEADER_KEY = 'dev-remote-addr';

    let reg = new RegExp("(^|&)" + REMOTE_KEY + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    let remoteAddr = r && r[2] && decodeURIComponent(r[2]);

    if (remoteAddr) {
        let open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            let ret = open.apply(this, arguments);
            this.setRequestHeader(HTTP_HEADER_KEY, remoteAddr);
            return ret;
        };
    }
} ());
