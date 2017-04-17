
<script>
    /**
     * Created by ued on 2016/12/17.
     */

    import Textfield from '../textfield/textfield.vue';
    import logger from 'src/util/logger';
    import { on as bindEvent } from 'wind-dom';

    const KEYCODE_ENTER = 13;

    export default {

        mixins: [
            Textfield
        ],

        props: {
            cls: { 'default': 'searchfield' },
            type: { 'default': 'search' },
            triggerType: { type: String, 'default': 'search' },
            placeholder: { type: String, 'default': function () {
                return _('搜索');
            }},
            actionName: {
                type: String
            }
        },

        methods: {

            /**
             * trigger点击事件
             * @param {Event} event 点击事件
             */
            onTrigger (event) {
                if (!this.isValid()) {
                    logger.log('[searchfield] trigger but invalid');
                    return;
                }
                let value = this.getJsonValue();
                logger.log('[searchfield] trigger');
                this.$emit('trigger', value, event);

                if (this.actionName) {
                    this.$emit('action', value, event);
                }
            },

            _onKeyPress (event) {
                if (event.keyCode === KEYCODE_ENTER) {
                    this.onTrigger();
                }
            }
        },

        mounted () {
            bindEvent(this.$refs.input, 'keypress', this._onKeyPress);
        }
    };
</script>
