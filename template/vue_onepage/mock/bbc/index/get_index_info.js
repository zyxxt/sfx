/**
 * Created by ued on 2016/12/7.
 */

exports.check = function () {
    return false;
}

exports.mockData = function (option) {
    return {
        "msg": "",
        "data": {
            "bbc": {
                "mem": 0.2,
                "recv": 3.32,
                "disk": 0.16,
                "cpu": 0.09,
                "send": 4.5
            },
            "branch": [
                {
                    "ch_name": "中国",
                    "region_id": 1000000,
                    "children": [
                        {
                            "ch_name": "广东省",
                            "region_id": 1190000,
                            "children": [
                                {
                                    "ch_name": "深圳市",
                                    "region_id": 1190300,
                                    "children": [
                                        {
                                            "ch_name": "南山区",
                                            "region_id": 1190303,
                                            "children": [
                                                {
                                                    "status": "warning",
                                                    "branch_id": 1,
                                                    "alert": 10,
                                                    "branch_name": "南山二店",
                                                    "mem": 0,
                                                    "recv": 3.32,
                                                    "disk": 0,
                                                    "cpu": 0,
                                                    "send": 4.2,
                                                    "sc_id": -1
                                                }
                                            ]
                                        },
                                        {
                                            "ch_name": "福田区",
                                            "region_id": 1190302,
                                            "children": [
                                                {
                                                    "status": "warning",
                                                    "branch_id": 2,
                                                    "alert": 10,
                                                    "branch_name": "福田二店",
                                                    "mem": 0,
                                                    "recv": 3.32,
                                                    "disk": 0,
                                                    "cpu": 0,
                                                    "send": 4.2,
                                                    "sc_id": -1
                                                },
                                                {
                                                    "status": "warning",
                                                    "branch_id": 3,
                                                    "alert": 10,
                                                    "branch_name": "福田一店",
                                                    "mem": 0,
                                                    "recv": 3.32,
                                                    "disk": 0,
                                                    "cpu": 0,
                                                    "send": 4.2,
                                                    "sc_id": -1
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "ch_name": "广州市",
                                    "region_id": 1190100,
                                    "children": [
                                        {
                                            "ch_name": "番禺区",
                                            "region_id": 1190107,
                                            "children": [
                                                {
                                                    "status": "warning",
                                                    "branch_id": 4,
                                                    "alert": 10,
                                                    "branch_name": "番禺4S店",
                                                    "mem": 0,
                                                    "recv": 3.32,
                                                    "disk": 0,
                                                    "cpu": 0,
                                                    "send": 4.2,
                                                    "sc_id": -1
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "ch_name": "梅州市",
                                    "region_id": 1191200,
                                    "children": [
                                        {
                                            "ch_name": "兴宁市",
                                            "region_id": 1191208,
                                            "children": [
                                                {
                                                    "status": "warning",
                                                    "branch_id": 5,
                                                    "alert": 10,
                                                    "branch_name": "兴宁直营店",
                                                    "mem": 0,
                                                    "recv": 3.32,
                                                    "disk": 0,
                                                    "cpu": 0,
                                                    "send": 4.2,
                                                    "sc_id": -1
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "ch_name": "日本",
                    "region_id": 2000000,
                    "children": [
                        {
                            "ch_name": "aa州",
                            "region_id": 2010000,
                            "children": [
                                {
                                    "ch_name": "bb郡",
                                    "region_id": 2010100,
                                    "children": [
                                        {
                                            "ch_name": "cc县",
                                            "region_id": 2010101,
                                            "children": [
                                                {
                                                    "status": "warning",
                                                    "branch_id": 1000,
                                                    "alert": 10,
                                                    "branch_name": "测试外国",
                                                    "mem": 0,
                                                    "recv": 3.32,
                                                    "disk": 0,
                                                    "cpu": 0,
                                                    "send": 4.2,
                                                    "sc_id": -1
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "success": 1
    };
};
