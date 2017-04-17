<template>
    <span class="sf-breadcrumb-item">
        <a v-if="href" :href="href" :class="linkClass">
            <slot></slot>
        </a>
        <span v-else :class="linkClass">
            <slot></slot>
        </span>
        <span :class="separatorClass">
            {{defaultSeparator}}
        </span>
    </span>
</template>
<style lang="stylus" scoped>

    .sf-breadcrumb>.sf-breadcrumb-item:last-child{
        font-weight: bold;
        color: #3c434a;
    }

    .sf-breadcrumb>.sf-breadcrumb-item:last-child .sf-breadcrumb-item-separator{
        display: none;
    }

</style>
<script>
    /**
     * breadcrumb-item
     */

    const PRE_FIX_CLS = 'sf-breadcrumb-item';
    export default {
        props: {
            href: {
                type: String
            }
        },
        computed: {
            linkClass () {
                return `${PRE_FIX_CLS}-link`;
            },

            separatorClass () {
                return `${PRE_FIX_CLS}-separator`;
            },
            defaultSeparator () {
                return this.$parent.separator;
            }


        }
    };
</script>
