<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/order/all" label="所有订单"></bar-item>
            <bar-item path="/u/order/nonPayment" label="未付定金"></bar-item>
            <bar-item path="/u/order/payment" label="已付定金"></bar-item>
            <bar-item path="/u/order/liftCar" label="待提车"></bar-item>
            <bar-item path="/u/order/completed" label="已完成"></bar-item>
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

