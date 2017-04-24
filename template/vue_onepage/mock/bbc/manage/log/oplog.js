/**
 * Created by ued on 2017/1/16.
 */

exports.check = function () {
    return false;
};

exports.mockData = function () {
    return {
        "data": {
            "total": 14,
            "data": [{
                "object": "admin",
                "description": "test ok 很多描述啊很多描述啊很多描述啊很多描述啊很多描述啊很多描述啊很多描述啊很多描述啊",
                "process": 100,
                "start_time": 1486607129,
                "object_type": "user",
                "operator": "admin",
                "id": 123,
                "target_host": "127.0.0.1",
                "operator_host": "127.0.0.1",
                "end_time": 1486607138,
                "type": "login"
            }, {
                "object": "admin",
                "description": "test running",
                "process": 49,
                "start_time": 1486606129,
                "object_type": "user",
                "operator": "admin",
                "id": 456,
                "target_host": "127.0.0.1",
                "operator_host": "127.0.0.1",
                "end_time": 1486606138,
                "type": "login"
            }, {
                "object": "admin",
                "description": "test error",
                "process": -1,
                "start_time": 1486605129,
                "object_type": "user",
                "operator": "admin",
                "id": 789,
                "target_host": "127.0.0.1",
                "operator_host": "127.0.0.1",
                "end_time": 1486605138,
                "type": "login"
            }, {
                "object": "admin",
                "description": "test queue",
                "process": -2,
                "start_time": 1486604129,
                "object_type": "user",
                "operator": "admin",
                "id": 987,
                "target_host": "127.0.0.1",
                "operator_host": "127.0.0.1",
                "end_time": 1486604138,
                "type": "login"
            }, {
                "object": "admin",
                "description": "test queue",
                "process": 100,
                "start_time": 1486604129,
                "object_type": "user",
                "operator": "admin",
                "id": 987,
                "target_host": "127.0.0.1",
                "operator_host": "127.0.0.1",
                "end_time": 1486604138,
                "type": "login"
            }]
        },
        "success": 1
    }
};
