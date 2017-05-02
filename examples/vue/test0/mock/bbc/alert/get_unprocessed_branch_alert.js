/**
 * Created by daoli on 2016/12/24.
 */

exports.check = function () {
    return false;
}

exports.mockData = function (option) {
    return {
        "data": [
            {
                "branch_id": "1245419",
                "object_type": "磁盘22",
                "group": "authorization",
                "description": "虚拟机当前CPU平均使用率为61.99%，超过阈值，动态添加CPU核；\n",
                "title": "磁盘状态异常",
                "level": "critical",
                "time": "2016-12-22 21:42:35",
                "id": "89afa405-401f-4de2-8270-29fc0ee943b3"
            },
            {
                "branch_id": "1245420",
                "object_type": "磁盘33",
                "group": "network",
                "description": "虚拟机当前CPU平均使用率为61.99%，超过阈值，动态添加CPU核；\n",
                "title": "内存状态异常",
                "level": "low",
                "time": "2016-12-22 21:42:35",
                "id": "4d1112bd-8b7e-44eb-ae85-14aefc7eb428"
            },
            {
                "branch_id": "1245421",
                "object_type": "磁盘44",
                "group": "security",
                "description": "虚拟机当前CPU平均使用率为61.99%，超过阈值，动态添加CPU核；\n",
                "title": "内存状态异常",
                "level": "critical",
                "time": "2016-12-22 21:42:35",
                "id": "a2d3f5e5-229d-4aee-af38-7687a05165ee"
            },
            {
                "branch_id": "1245422",
                "object_type": "磁盘55",
                "group": "network",
                "description": "虚拟机当前CPU平均使用率为61.99%，超过阈值，动态添加CPU核；\n",
                "title": "内存状态异常",
                "level": "low",
                "time": "2016-12-22 21:42:35",
                "id": "eb4ffc2d-a28c-4a17-9d78-9db8f9be5f51"
            }
        ],
        "success": 1
    };
};
