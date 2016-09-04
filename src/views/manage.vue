<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/manage/myOffer" label="我的报价"></bar-item>
            <bar-item path="/u/manage/add" label="新增报价"></bar-item>
        </bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import Bar from "../components/Bar.vue"
    import BarItem from "../components/BarItem.vue"
    export default {
        data(){
            return {
            }
        },
        components:{
            Bar,
            BarItem
        }
    }
</script>

