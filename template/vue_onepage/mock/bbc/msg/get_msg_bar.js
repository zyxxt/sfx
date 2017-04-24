/**
 * Created by ued on 2017/1/22.
 */

exports.check = function () {
    return false;
};

exports.mockData = function () {
    return {
        "data": {
            "notification": [{
                "branch_id": 1244422,
                "msg": "天河4S分店已经接入",
                "time": 1486344727
            },{
                "branch_id": 1244423,
                "msg": "南山4S分店已经接入",
                "time": 1486344728
            }],
            "alert": [{
                "branch_id": 1264422,
                "msg": "天河4S分店离线",
                "time": 1486345727
            },{
                "branch_id": 1245423,
                "msg": "南山4S分店掉线",
                "time": 1486346728
            }]
        },
        "success": 1
    };
};
