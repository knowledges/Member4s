<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/accout/info" label="基本信息"></bar-item>
            <bar-item path="/u/accout/address" label="地址管理"></bar-item>
            <bar-item path="/u/accout/head" label="头像管理"></bar-item>
            <bar-item path="/u/accout/modify" label="修改密码"></bar-item>
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

