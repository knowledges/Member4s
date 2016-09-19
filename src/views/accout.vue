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
        ready(){
            $(".UC_nav").find('a').removeClass("active").find("i").removeClass("i_active_1 i_active_2 i_active_3 i_active_4 i_active_5 i_active_0")
            $(".UC_nav").find('li').eq(5).find('a').addClass("active").find("i").addClass("i_active_5");
        },
        components:{
            Bar,
            BarItem
        }
    }
</script>

