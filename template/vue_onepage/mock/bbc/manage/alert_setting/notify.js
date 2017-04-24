/**
 * Created by hjh on 2017/1/17.
 */
exports.check = function () {
    return false;
};

exports.mockData = function () {
    return {
        "data": {
            "sms": {
                "target": [],
                "interval": 60,
                "enabled": 0,
                "enable_interval": 0,
                "id": "sms",
                "name": "sms"
            },
            "wechat": {
                "target": [],
                "interval": 60,
                "enabled": 0,
                "enable_interval": 0,
                "id": "wechat",
                "name": "wechat"
            },
            "log": {"target": [], "interval": 60, "enabled": 1, "enable_interval": 0, "id": "log", "name": "log"},
            "email": {"target": [], "interval": 60, "enabled": 0, "enable_interval": 0, "id": "email", "name": "email"}
        },
        "success": 1
    };
};
