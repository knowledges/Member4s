<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/exchange/cashing" label="积分兑换"></bar-item>
            <bar-item path="/u/exchange/rule" label="积分规则"></bar-item>
            <bar-item path="/u/exchange/history" label="所有记录"></bar-item>
        </bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import Bar from "../components/Bar.vue"
    import BarItem from "../components/BarItem.vue"
    export default {
        ready(){
            $(".UC_nav").find('a').removeClass("active").find("i").removeClass("i_active_1 i_active_2 i_active_3 i_active_4 i_active_5 i_active_6 i_active_0");
            $(".UC_nav").find('li').eq(4).find('a').addClass("active").find("i").addClass("i_active_5");
        },
        components:{
            Bar,
            BarItem
        }
    }
</script>

