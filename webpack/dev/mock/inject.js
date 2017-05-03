/**
 * Created by zhangyuantao on 2017/4/23.
 */

(function () {
    var REMOTE_KEY = 'remote';
    var HTTP_HEADER_KEY = 'dev-remote-addr';

    var reg = new RegExp("(^|&)" + REMOTE_KEY + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var remoteAddr = r && r[2] && decodeURIComponent(r[2]);

    if (remoteAddr) {
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            var ret = open.apply(this, arguments);
            this.setRequestHeader(HTTP_HEADER_KEY, remoteAddr);
            return ret;
        };
    }
} ());
