<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/active/thisShop/find/0" label="本店活动"></bar-item>
            <bar-item path="/u/active/add" label="新增活动"></bar-item>
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
            $(".UC_nav").find('li').eq(3).find('a').addClass("active").find("i").addClass("i_active_3");
        },
        components:{
            Bar,
            BarItem
        }
    }
</script>

