
<template>
    <div>
        <p style="color: blue">选中菜单：{{ menuIndex }}</p>
        <div class="menu-demo">
            <p>示例1：静态菜单（绑定点击事件，禁用，分割线，子菜单:三重）</p>
            <sf-button ref="button1">点我弹出</sf-button>
            <sf-menu class="menu-demo-cls" default-target="button1">
                <sf-menu-item iconCls="fa-edit" @click="triggerAdd">添加</sf-menu-item>
                <sf-menu-item type="separator"></sf-menu-item>
                <sf-menu-item iconCls="fa-edit" :default-disabled="true">删除</sf-menu-item>
                <sf-menu-item iconCls="fa-stop">重命名</sf-menu-item>
                <sf-menu-item type="separator"></sf-menu-item>
                <sf-menu-item iconCls="fa-eject">
                    <span><lang>更多操作</lang></span>
                    <sf-menu>
                        <sf-menu-item iconCls="fa-forward" @click="triggerTotop">置顶</sf-menu-item>
                        <sf-menu-item iconCls="fa-eject">
                            <span><lang>更多操作</lang></span>
                            <sf-menu>
                                <sf-menu-item iconCls="fa-edit" @click="triggerTotop">上移</sf-menu-item>
                                <sf-menu-item iconCls="fa-eject">下移</sf-menu-item>
                            </sf-menu>
                        </sf-menu-item>
                    </sf-menu>
                </sf-menu-item>
            </sf-menu>
        </div>

        <br>
        <div class="menu-demo">
            <p>示例2：动态菜单（绑定点击事件，禁用，分割线，子菜单:三重）</p>
            <sf-button ref="button2">点我弹出</sf-button>
            <sf-menu class="menu-demo-cls"
                     default-target="button2"
                     :options="menuList">
            </sf-menu>
        </div>

        <br>
        <div class="menu-demo">
            <p>示例3：sf-menu 的其他配置属性（显示方向，自动隐藏，显示操作方式）</p>
            <sf-button ref="button3">hover从左边弹出菜单</sf-button>
            <sf-menu default-target="button3"
                     anchor="left-start"
                     trigger="hover"
                     :click-hide="false">
                <sf-menu-item iconCls="fa-edit" @click="clickUp">上移</sf-menu-item>
                <sf-menu-item iconCls="fa-eject" @click="clickDown">下移</sf-menu-item>
            </sf-menu>
        </div>

        <br>
        <div class="menu-demo">
            <p>示例4：一个菜单，给多个DOM对象使用</p>
            <sf-button @click="showMyMenu($event,'A')">按钮A</sf-button>
            <sf-button @click="showMyMenu($event,'B')">按钮B</sf-button>
            <sf-button @click="showMyMenu($event,'C')">按钮C</sf-button>

            <sf-menu ref="myMenu" anchor="bottom">
                <sf-menu-item iconCls="fa-edit" @click="toUp">上移</sf-menu-item>
                <sf-menu-item iconCls="fa-eject" @click="toDown">下移</sf-menu-item>
            </sf-menu>
        </div>

        <br>
        <div class="menu-demo">
            <p>示例5：动态改变菜单选项</p>
            <sf-button ref="button5">点我弹出</sf-button>
            <sf-button @click="changeMenuList">改变菜单选项</sf-button>

            <sf-menu default-target="button5" :options="menuList5"></sf-menu>

        </div>


    </div>


</template>

<script>
    import logger from 'src/util/logger';

    const oldList = [
        {label: '上移', iconCls: 'fa-car'},
        {label: '下移', iconCls: 'fa-plane'}
    ];

    const newList = [
        {label: '新的上移', iconCls: 'fa-car'},
        {label: '新的下移', iconCls: 'fa-plane'}
    ];

    export default {
        data () {
            let me = this;

            return {
                menuIndex: '',
                menuList: [
                    {
                        label: '添加',
                        iconCls: 'fa-edit',
                        click (e, menuItem, data) {
                            logger.log(menuItem);
                            logger.log(data);
                            me.menuIndex = 'add';
                        }
                    },
                    {label: '删除', iconCls: 'fa-stop', disabled: true},
                    {type: 'separator'},
                    {label: '重命名', iconCls: 'fa-eject'},
                    {
                        label: '更多操作',
                        iconCls: 'fa-eject',
                        children: [
                            {label: '置顶', iconCls: 'fa-stop'},
                            {
                                label: '更多操作',
                                iconCls: 'fa-eject',
                                children: [
                                    {label: '上移', iconCls: 'fa-car'},
                                    {
                                        label: '下移',
                                        iconCls: 'fa-plane',
                                        click (e, menuItem, data) {
                                            logger.log(menuItem);
                                            logger.log(data);
                                            me.menuIndex = 'down';
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],

                // 示例5
                menuList5: oldList
            }
        },
        methods: {
            triggerAdd (e, menuItem) {
                logger.log(menuItem);
                this.menuIndex = 'add';
            },

            triggerTotop (e, menuItem) {
                logger.log(menuItem);
                this.menuIndex = 'to-top';
            },

            clickUp () {
                logger.log('点击了上移，但 clickHide 为 false, 所以菜单不会自动消失');
                this.menuIndex = 'up';
            },

            clickDown () {
                logger.log('点击了下移，但 clickHide 为 false, 所以菜单不会自动消失');
                this.menuIndex = 'down';
            },

            showMyMenu (event, index) {
                let myMenu = this.$refs.myMenu;
                myMenu.showTo(event.target);
                myMenu.xxxIndex = index;
            },

            toUp () {
                let myMenu = this.$refs.myMenu;
                let xxxIndex = myMenu.xxxIndex;

                this.menuIndex = 'to-up-' + xxxIndex;
            },

            toDown () {
                let myMenu = this.$refs.myMenu;
                let xxxIndex = myMenu.xxxIndex;

                this.menuIndex = 'to-down-' + xxxIndex;
            },

            changeMenuList () {
                this.menuList5 = newList;
            }

        }
    };

</script>

<style>
    .menu-demo-cls {
        width: 120px;
    }

</style>
