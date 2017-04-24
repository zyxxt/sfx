/**
 * Created by hjh on 2017/1/17.
 */

exports.check = function () {
    return false;
};

exports.mockData = function () {
    return {
        "data": {
            "host": [{
                "notice_enabled": 1,
                "group": "host",
                "name": "iface_down",
                "level": "critical",
                "enabled": 1,
                "id": "iface_down",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_offline",
                "level": "critical",
                "enabled": 1,
                "id": "host_offline",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_vxlan",
                "level": "critical",
                "enabled": 1,
                "id": "host_vxlan",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_swap_util",
                "level": "moderate",
                "enabled": 1,
                "id": "host_swap",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_iface_lost_rate",
                "level": "critical",
                "enabled": 0,
                "id": "host_iface_lost_rate",
                "threshold": 10,
                "duration": 60,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_cpu_util",
                "level": "moderate",
                "enabled": 1,
                "id": "host_cpu",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_mem",
                "level": "moderate",
                "enabled": 1,
                "id": "host_mem",
                "threshold": 70,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_cpu_temp",
                "level": "moderate",
                "enabled": 0,
                "id": "host_cpu_temp",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "host",
                "name": "host_nic",
                "level": "critical",
                "enabled": 1,
                "id": "host_nic",
                "threshold": 1,
                "duration": 600,
                "comparison_operator": "gt"
            }],
            "vnet": [{
                "notice_enabled": 1,
                "group": "vnet",
                "name": "vrouter_run",
                "level": "critical",
                "enabled": 1,
                "id": "vrouter_run",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "vnet",
                "name": "vnetdev_net_conn",
                "level": "critical",
                "enabled": 1,
                "id": "vnetdev_net_conn",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "vnet",
                "name": "vnetdev_cpu",
                "level": "moderate",
                "enabled": 1,
                "id": "vnetdev_cpu",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "vnet",
                "name": "vnetdev_image_damage",
                "level": "critical",
                "enabled": 0,
                "id": "vnetdev_image_damage",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "vnet",
                "name": "vm_iface_lost_rate",
                "level": "critical",
                "enabled": 0,
                "id": "vm_iface_lost_rate",
                "threshold": 10,
                "duration": 60,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "vnet",
                "name": "vnetdev_internal",
                "level": "moderate",
                "enabled": 1,
                "id": "vnetdev_internal",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }],
            "storage": [{
                "notice_enabled": 1,
                "group": "storage",
                "name": "storage_offline",
                "level": "critical",
                "enabled": 1,
                "id": "storage_offline",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "storage",
                "name": "storage",
                "level": "critical",
                "enabled": 1,
                "id": "storage",
                "threshold": 95,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "storage",
                "name": "raid_state",
                "level": "critical",
                "enabled": 1,
                "id": "raid_state",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "storage",
                "name": "storage_state",
                "level": "critical",
                "enabled": 1,
                "id": "storage_state",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "storage",
                "name": "storage_util",
                "level": "critical",
                "enabled": 1,
                "id": "storage_util",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "storage",
                "name": "storage_await",
                "level": "moderate",
                "enabled": 1,
                "id": "storage_await",
                "threshold": 50,
                "duration": 600,
                "comparison_operator": "gt"
            }],
            "vm": [{
                "notice_enabled": 1,
                "group": "vm",
                "name": "vm_image_damage",
                "level": "critical",
                "enabled": 1,
                "id": "vm_image_damage",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "vm",
                "name": "vm_mem",
                "level": "moderate",
                "enabled": 1,
                "id": "vm_mem",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }, {
                "notice_enabled": 1,
                "group": "vm",
                "name": "vm_net_conn",
                "level": "critical",
                "enabled": 1,
                "id": "vm_net_conn",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "vm",
                "name": "vm_cpu",
                "level": "moderate",
                "enabled": 1,
                "id": "vm_cpu",
                "threshold": 90,
                "duration": 600,
                "comparison_operator": "gt"
            }],
            "sn": [{
                "notice_enabled": 1,
                "group": "sn",
                "name": "sn_expire",
                "level": "critical",
                "enabled": 1,
                "id": "sn_expire",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }, {
                "notice_enabled": 1,
                "group": "sn",
                "name": "vnet_key_expire",
                "level": "critical",
                "enabled": 1,
                "id": "vnet_key_expire",
                "threshold": 0,
                "duration": 600,
                "comparison_operator": "lt"
            }, {
                "notice_enabled": 1,
                "group": "sn",
                "name": "sn_key_state",
                "level": "critical",
                "enabled": 1,
                "id": "sn_key_state",
                "threshold": null,
                "duration": null,
                "comparison_operator": null
            }]
        }, "success": 1
    }
};
