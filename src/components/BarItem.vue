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
        font-size: 16px;
        padding: 5px 25px;
        margin: 20px;
    }
    .tab-item:first-child{
        margin-left: 50px;
    }
    .tab-active{
        border-bottom: 2px solid #ed8e07;
    }
</style>
