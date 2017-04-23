<script>
    /**
     * Created by ued on 2016/11/9.
     * 中英文翻译，实现 <lang param0="aaa">这里可以带参数：{param0}</lang>
     */

    import Component from 'src/widgets/component';

    export default {

        mixins: [
            Component
        ],

        methods: {
            _renderHTML () {
                let slotText = this.$slots.default[0].text;
                if (!this.$isMounted) {
                    return slotText;
                }
                let attributeMap = Array.from(this.$el.attributes).reduce((prev, attr) => {
                    prev[attr.nodeName] = attr.nodeValue;
                    return prev;
                }, {});
                slotText = _(slotText);
                return slotText.replace(/\{(.+?)\}/g, function (match, i) {
                    return attributeMap[i] || '';
                });
            }
        },

        mounted () {
            this.$forceUpdate();
        },

        render (h) {
            let me = this;
            return (
                <span class="language-wrap">
                    {
                        me._renderHTML()
                    }
                </span>
            );
        }

    };
</script>
