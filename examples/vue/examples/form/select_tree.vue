<template>
    <div>
        <div class="select-demo">
            <p>单选</p>

            <sf-select-tree v-model="type"
                            :default-width="200"
                            :allowBlank="false"
                            :autoSelectFirst="true"
                            @change="change">
                <sf-tree-table :options="typeTreeOptions"
                               :default-height="300">
                    <sf-tree-column data-index="id"
                                    :renderer="_typeTreeRender" />
                </sf-tree-table>
            </sf-select-tree>

            <span>新：{{changeValue}}</span>
            <span>旧：{{oldValue}}</span>
        </div>

        <div class="select-demo">
            <p>多选</p>

            <sf-select-tree v-model="types"
                            :default-width="200"
                            :allowBlank="false"
                            :multi="true"
                            @change="multiChange">
                <sf-tree-table :options="multiTypeTreeOptions"
                               :default-height="300">
                    <sf-tree-column data-index="id"
                                    :renderer="_typeTreeRender" />
                </sf-tree-table>
            </sf-select-tree>

            <span>新：{{multiChangeValue}}</span>
            <span>旧：{{multiOldValue}}</span>
        </div>
    </div>

</template>

<script>
    import logger from 'src/util/logger';

    /**
     * 工单类型
     */
    const TYPES = {
        safeAccount: 10000,
        renew: 10010,
        domainReview: 10020,
        penTest: 10030,
        leakVerify: 10040,
        logAnalysis: 10050,
        websiteScan: 10060,
        blackChain: 0,
        webShell: 1,
        clientVirus: 3,
        serverVirus: 4,
        clientAnomalyTraffic: 7,
        serverAnomalyTraffic: 8,
        passwordLeak: 1000,
        websiteAvailability: 2000,
        websiteTamper: 2001,
        websiteBlackChain: 2002,
        zeroDayLeak: 2003,
        assessReport: 3000,
        monthReport: 3001,
        emergencyResponse: 3002
    };

    /**
     * 工单类型文本
     */
    const TYPES_TEXT = {
        10000: '安全服务账号',
        10010: '续费',
        10020: '域名审核',
        10030: '渗透测试',
        10040: '漏洞验证',
        10050: '日志分析',
        10060: '网站扫描',
        0: '黑链',
        1: 'webShell',
        3: '客户端僵尸网络',
        4: '服务端僵尸网络',
        7: '客户端外发异常流量',
        8: '服务端外发异常流量',
        1000: '密码泄露',
        2000: '网站可用性',
        2001: '网站篡改',
        2002: '网站黑链',
        2003: '0day漏洞',
        3000: '评估报告',
        3001: '月度报告',
        3002: '应急响应'
    };

    const TYPES_GROUP = (() => {
        let manualType = [
            TYPES.penTest, TYPES.emergencyResponse, TYPES.websiteScan,
            TYPES.leakVerify, TYPES.logAnalysis, TYPES.safeAccount
        ];

        let autoType = Object.values(TYPES).filter((typeID) => {
            return !manualType.includes(typeID);
        });

        return [
            {
                id: 'auto',
                text: '主动响应',
                list: autoType
            },
            {
                id: 'manual',
                text: '人工服务',
                list: manualType
            }
        ];
    })();

    export default {
        data () {
            let vm = this;

            return {
                type: null,
                typeTreeOptions: {
                    headerHide: true,
                    bufferView: false,
                    autoWidth: false,
                    data: vm._createTypeTree()
                },

                types: [0, 1000, 10060],
                multiTypeTreeOptions: {
                    checkAble: true,
                    headerHide: true,
                    bufferView: false,
                    autoWidth: false,
                    data: vm._createTypeTree()
                },

                changeValue: '',
                oldValue: '',

                multiChangeValue: '',
                multiOldValue: ''
            }
        },


        methods: {

            _typeTreeRender (id, node) {
                return node.text;
            },

            _createTypeTree () {
                let vm = this;
                let typesGroup = JSON.parse(JSON.stringify(TYPES_GROUP));
                let groups = [];

                for (let group of typesGroup) {
                    group.children = group.list.map((typeID) => {
                        return {
                            id: typeID,
                            text: TYPES_TEXT[typeID]
                        };
                    });
                    group.expanded = true;
                    groups.push(group);
                }

                return [
                    {
                        id: 'all',
                        text: '不限',
                        expanded: true,
                        children: groups
                    }
                ];
            },

            change (value, old) {
                this.changeValue = value;
                this.oldValue = old;
            },

            multiChange (value, old) {
                this.multiChangeValue = JSON.stringify(value);
                this.multiOldValue = JSON.stringify(old);
            }
        }
    }
</script>

<style scope>
    .select-demo {
        display: inline-block;
        margin: 0 10px;
    }
</style>
