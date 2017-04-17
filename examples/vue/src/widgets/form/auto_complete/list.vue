
<script>
    /**
     * @file 自动补全插件-列表
     */

    import Component from 'src/widgets/component';

    export default {
        mixins: [
            Component
        ],
        mounted () {
            window.listVm = this;
        },
        props: {
            idProp: {
                type: String,
                required: true
            },
            labelProp: {
                type: String,
                required: true
            },
            target: {
                type: String,
                require: true
            },
            json: {
                type: Array,
                require: true
            },
            itemSlot: true
        },
        data () {
            let vm = this;

            return {
                focusIndex: '',
                targetEl: vm.$parent.$refs[vm.target]
            };
        },
        render (h) {
            let vm = this;

            let records = vm.json.map((record, index) => {

                let content = vm.itemSlot ? vm.itemSlot({
                    record: record
                }) : (<span>{record[vm.labelProp]}</span>);

                return (<li class={['sf-autocomplete-item', {'focus-list' : index === vm.focusIndex}]}
                            onClick={vm.onItemClick.bind(vm, record)}
                            onMousemove={vm.setFocusIndex.bind(vm, index)}>

                            {content}

                        </li>);
            });

            return (
                <sf-layer class="sf-autocomplete-list-layer"
                          ref="layer"
                          default-target={vm.targetEl}
                          default-width={vm.defaultWidth}
                          trigger="manual">

                    <ul class="sf-autocomplete-list">
                        {records}
                    </ul>

                </sf-layer>
            );
        },
        methods: {

            cleanUp (data) {
                return JSON.parse(JSON.stringify(data));
            },

            setFocusIndex (index, resetScroll) {
                let vm = this;

                index = Math.min(index, vm.json.length - 1);
                index = Math.max(index, 0);

                vm.focusIndex = index;

                if (resetScroll === true) {
                    vm.resetScroll();
                }
            },

            /**
             * 重置滚动条，视图聚焦到当前选定的选项上
             */
            resetScroll () {
                let vm = this;

                vm.$nextTick(() => {

                    let listElem = vm.$el.querySelector('.sf-autocomplete-list');
                    let itemElem = vm.$el.querySelectorAll('.sf-autocomplete-item')[vm.focusIndex];

                    if (!itemElem || !listElem) {
                        return;
                    }

                    let listRect = listElem.getBoundingClientRect();
                    let itemRect = itemElem.getBoundingClientRect();

                    if (itemRect.top > listRect.top &&
                        itemRect.bottom < listRect.bottom) {
                        return;
                    }

                    if (itemRect.top < listRect.top) {
                        listElem.scrollTop += itemRect.top - listRect.top;
                    } else {
                        listElem.scrollTop += itemRect.bottom - listRect.bottom;
                    }
                });
            },

            prevFocusIndex (resetScroll) {
                let vm = this;

                vm.setFocusIndex(vm.focusIndex - 1, resetScroll);
            },

            nextFocusIndex (resetScroll) {
                let vm = this;

                vm.setFocusIndex(vm.focusIndex + 1, resetScroll);
            },

            toggleList (toggle) {
                let vm = this;

                toggle = Boolean(toggle);

                vm.$emit(toggle ? 'show' : 'hide');

                vm.$refs.layer[toggle ? 'show' : 'hide']();

                vm.$nextTick(() => {
                    vm.$emit(toggle ? 'shown' : 'hidden');
                });
            },

            onItemClick (record, e) {
                let vm = this;

                e.preventDefault();

                vm.selectList(record);
            },

            selectList (data) {
                let vm = this;

                data = data || vm.json[vm.focusIndex];

                let clean = vm.cleanUp(data);

                vm.toggleList(false);

                vm.$emit('selected', clean);
            }
        }
    };
</script>

<style scoped>
    .sf-autocomplete-list-layer {
        padding: 0;
        border: 1px solid #ccc;
        border-radius: 0;
    }

    .sf-autocomplete-list {
        display: block;
        height: 200px;
        list-style: none;
        background: #fff;
        padding: 0;
        margin: 0;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .sf-autocomplete-item {
        display: block;
        line-height: 2.4;
        color: #333;
        padding: 0 5px;
    }

    .sf-autocomplete-item.focus-list {
        background: #2F9AF7;
        color: #fff;
    }
</style>
