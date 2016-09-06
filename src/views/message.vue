<template>
    <div>
        <bar class="nav nav-tabs clearfix">
            <bar-item path="/u/message/orders" label="订单"></bar-item>
            <bar-item path="/u/message/messages" label="系统消息"></bar-item>
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

