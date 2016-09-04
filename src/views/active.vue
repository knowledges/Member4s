<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/active/thisShop" label="本店活动"></bar-item>
            <bar-item path="/u/active/add" label="新增活动"></bar-item>
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

