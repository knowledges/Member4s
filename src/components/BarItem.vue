<template>
    <a class="tab-item" v-link="{path: path, activeClass: 'tab-active', replace: true}" v-text="label">
    </a>
</template>

<script>
    export default {
        props: {
            path: '',
            label: ''
        },
    }
</script>
<style scroped>
    .tab-item{
        float: left;
        display: inline;
        font-size: 16px;
        padding: 0 25px;
        height: 48px;
        line-height: 48px;
        margin-bottom: -1px;
    }
    .tab-item:hover{
        color:#ed8e07;
        text-decoration: none;
    }
    .tab-active{
        border-bottom: 2px solid #ed8e07;
    }
</style>
