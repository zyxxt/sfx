
<template>
    <div class="sf-autocomplete">
        <sf-textfield ref="input"
                      type="text"
                      class="sf-autocomplete-input"
                      :name="name"
                      :placeholder="placeholder"
                      v-model="value"
                      @input.native="onInput"
                      @keydown.native.down="nextFocusIndex(true)"
                      @keydown.native.up="prevFocusIndex(true)"
                      @keydown.native.esc="toggleList(false)"
                      @keydown.native.enter="selectList()"
                      @focus="expandList"
                      @blur="toggleList(false)" />

        <sf-list ref="list"
                 target="input"
                 :json="json"
                 :idProp="idProp"
                 :labelProp="labelProp"
                 :default-width="defaultWidth"
                 :item-slot="$scopedSlots.default"
                 @selected="onSelected"></sf-list>
    </div>
</template>

<script>
    /**
     * @file 自动补全组件
     */

    import Component from 'src/widgets/component';
    import SfList from './list.vue';

    export default {
        mixins: [
            Component
        ],
        components: {
            SfList
        },
        props: {
            name: String,
            placeholder: {
                type: String,
                'default': ''
            },
            idProp: {
                type: String,
                required: true
            },
            labelProp: {
                type: String,
                required: true
            },
            min: {
                type: [String, Number],
                'default': 2
            },
            loadData: {
                type: Function,
                require: true
            },
            debug: {
                type: Boolean,
                'default': false
            }
        },
        data () {
            return {
                isShowList: false,
                json: [],
                focusIndex: '',
                currentRecord: null,
                value: ''
            };
        },
        watch: {
            currentRecord () {
                let vm = this;

                vm.$emit('change');
            }
        },
        methods: {

            cleanUp (data) {
                return JSON.parse(JSON.stringify(data));
            },

            clear (resetValue) {
                let vm = this;

                vm.json = [];
                vm.currentRecord = null;

                if (resetValue === true) {
                    vm.value = '';
                }
            },

            onInput () {
                let vm = this;

                vm.clear();

                vm.expandList();
            },

            expandList () {
                let vm = this;

                vm.refresh(vm.value)
                    .then(() => {
                        vm.toggleList(true);
                        vm.setFocusIndex(0, true);
                    })
                    .catch(() => {
                        vm.toggleList(false);
                    });
            },

            setFocusIndex () {
                let vm = this;

                vm.$refs.list.setFocusIndex.apply(null, arguments);
            },

            prevFocusIndex () {
                let vm = this;

                vm.$refs.list.prevFocusIndex.apply(null, arguments);
            },

            nextFocusIndex () {
                let vm = this;

                vm.$refs.list.nextFocusIndex.apply(null, arguments);
            },

            toggleList (toggle) {
                let vm = this;

                toggle = vm.debug || (toggle && vm.value.length >= vm.min);

                vm.$refs.list.toggleList(toggle);
            },

            refresh (val) {
                let vm = this;

                val = val || '';

                if (val.length < vm.min || !vm.loadData) {
                    return Promise.reject();
                }

                vm.$emit('before-ajax');

                let dataPromise = typeof vm.loadData === 'function' ?
                    vm.loadData(val) : vm.loadData;

                return Promise.resolve(dataPromise)
                    .then((data) => {

                        data = vm.cleanUp(data || []);

                        vm.json = data;

                        vm.$emit('ajax-loaded', data);
                    });
            },

            selectList () {
                let vm = this;

                vm.$refs.list.selectList.apply(null, arguments);
            },

            onSelected (record) {
                let vm = this;

                vm.value = record[vm.labelProp];

                vm.currentRecord = record;

                vm.$emit('selected', record);
            },

            getData () {
                let vm = this;

                return vm.cleanUp(vm.currentRecord);
            }
        }
    };
</script>

<style scoped>
    .sf-autocomplete {
        position: relative;
    }

    .sf-autocomplete-input {
        display: block;
        width: auto;
    }
</style>
