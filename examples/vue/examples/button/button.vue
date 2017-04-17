<template>
    <div>
        <sf-button class="btn-submit"
                   @click="onSubmit($event)">onSubmit</sf-button>

        <sf-button ref="abc"
                   class="btn-primary"
                   iconCls="fa-plus-circle"
                   @click="onSubmit($event)"
                   :defaultDisabled="true">disabledxxx</sf-button>

        <sf-button class="btn-large btn-danger"
                   @click="onCancel"
                   ref="cancelBtn"><lang :abc="abc">取{abc}消{efg}</lang></sf-button>

        <sf-button class="btn-link btn-small" @click="onTest">{{btnText}}</sf-button>

        <sf-button :selectAble="true"><lang>selectAble</lang></sf-button>

        <p>
            <lang>fd{fdsa}sa</lang>
        </p>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data () {
            return {
                btnText: 'test',
                abc: 'xxxxx'
            };
        },

        methods: {
            onSubmit (event) {
                this.$el.querySelector('p').innerHTML = `on click: ${event.target.innerHTML}`;
                this.$refs.abc.disabled = !this.$refs.abc.disabled;
            },

            onCancel () {
                window.alert('cancel');
            },

            onTest () {
                this.$refs.cancelBtn.onClick();
            }
        }
    };
</script>
