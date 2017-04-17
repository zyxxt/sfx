<template>
    <div :class="cls">
        <slot></slot>
    </div>
</template>
<script>
    /**
     * breadcrumb
     * <sf-breadcrumb separator=">">
     * <sf-breadcrumb-item href="/">title1</sf-breadcrumb-item>
     * <sf-breadcrumb-item href="/components/breadcrumb">title2</sf-breadcrumb-item>
     * <sf-breadcrumb-item>title3</sf-breadcrumb-item>
     * </sf-breadcrumb>
     */

    const PRE_FIX_CLS = 'sf-breadcrumb';
    export default {
        props: {
            separator: {
                type: String,
                default: '/'
            }
        },
        computed: {
            cls () {
                return `${PRE_FIX_CLS}`;
            }
        }
    };
</script>
