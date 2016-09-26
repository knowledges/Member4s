<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/order/all" label="所有订单"></bar-item>
            <bar-item path="/u/order/payment" label="已付定金"></bar-item>
            <bar-item path="/u/order/liftCar" label="待提车"></bar-item>
            <bar-item path="/u/order/shipment" label="出库中"></bar-item>
            <bar-item path="/u/order/completed" label="已完成"></bar-item>
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
            $(".UC_nav").find('li').eq(1).find('a').addClass("active").find("i").addClass("i_active_1");
        },
        components:{
            Bar,
            BarItem
        }
    }
</script>
<style scoped>

</style>

