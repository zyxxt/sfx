
<script>
    /**
     * Created by ued on 2017/2/6.
     */

    import TableHeader from '../grid/table_header.vue';
    import { cascadeTree } from 'src/util/walk';
    export default {

        mixins: [
            TableHeader
        ],

        methods: {

            /**
             * 全选|全不选
             * @override grid/table_header.vue::onCheckChange()
             */
            onCheckedChange () {
                let newValue = this.status;
                let me = this;
                if (!me.options.selectionMode || !Array.isArray(me.options.data)) {
                    return;
                }
                let changed = [];
                cascadeTree(me.options.data, (record) => {
                    if (record.selectAble !== false) {
                        record.selected = newValue;
                        changed.push(record);
                    }
                });
                me.fireEvent('selectionchange', this, changed);
            }
        }
    };
</script>
