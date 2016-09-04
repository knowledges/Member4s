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

