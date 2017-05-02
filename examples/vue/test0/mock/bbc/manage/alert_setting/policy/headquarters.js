/**
 * Created by hjh on 2017/1/17.
 */

exports.check = function () {
    return false;
};

exports.mockData = function () {
    return {
        "data": {
            "bbc": [{
                "notice_enabled": 1,
                "group": "bbc",
                "name": "host_mem_util",
                "level": "moderate",
                "enabled": 1,
                "id": "host_mem_util",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "bbc",
                "name": "storage_util",
                "level": "moderate",
                "enabled": 1,
                "id": "storage_util",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "bbc",
                "name": "branch_threats",
                "level": "critical",
                "enabled": 1,
                "id": "branch_threats",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "bbc",
                "name": "host_cpu_util",
                "level": "moderate",
                "enabled": 1,
                "id": "host_cpu_util",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "bbc",
                "name": "branch_offline",
                "level": "critical",
                "enabled": 1,
                "id": "branch_offline",
                "threshold": "offline",
                "duration": 600,
                "comparison_operator": "eq"
            }]
        }, "success": 1
    };
};
