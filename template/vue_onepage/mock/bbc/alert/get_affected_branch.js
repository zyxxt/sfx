/**
 * Created by daoli on 2016/12/24.
 */

exports.check = function () {
    return false;
}

exports.mockData = function (option) {
    return {
        "data": {
            "branch_num": 1000,
            "network": 100,
            "offline": 300,
            "authorization": 500,
            "resource": 700,
            "security": 900
        },
        "success": 1
    };
};
