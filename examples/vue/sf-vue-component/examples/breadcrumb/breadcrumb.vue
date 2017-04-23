<template>
    <div>
        <p>面包屑：</p>
        <sf-breadcrumb separator=">">
            <sf-breadcrumb-item href="/">title1</sf-breadcrumb-item>
            <sf-breadcrumb-item href="/components/breadcrumb">title2</sf-breadcrumb-item>
            <sf-breadcrumb-item>title3</sf-breadcrumb-item>
        </sf-breadcrumb>

        <sf-breadcrumb ref="aaa">
            <sf-breadcrumb-item href="/">title1</sf-breadcrumb-item>
            <sf-breadcrumb-item href="/components/breadcrumb">title2</sf-breadcrumb-item>
            <sf-breadcrumb-item>title3</sf-breadcrumb-item>
        </sf-breadcrumb>

    </div>
</template>
<script>
    export default {

    }
</script>
