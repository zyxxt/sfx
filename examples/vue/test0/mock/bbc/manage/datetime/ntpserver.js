/**
 * Created by ued on 2017/1/21.
 */

exports.check = function () {
    return false;
};

exports.mockData = function () {
    return {
        "success": 1,
        "data": {
            "ntpserver": "pool.ntp.org",
            "ntpenable": 1
        }
    };
};
