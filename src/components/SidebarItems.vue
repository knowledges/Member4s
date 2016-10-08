<template>
    <ul class="UC_nav">
        <!--普通会员-->
        <li class=""><a v-link="{path:'/u/store'}"><i
                class="ui_icon_18 icon-new-uc icon-new-uc-home"></i>4s店主页</a><em></em></li>
        <li class=""><a v-link="{path:'/u/order/all'}"><i
                class="ui_icon_18 icon-new-uc icon-new-uc-order"></i>购车订单</a><em></em></li>
        <li class=""><a v-link="{path:'/u/manage/myOffer/find/0'}"><i
                class="ui_icon_18 icon-new-uc icon-new-uc-eye"></i>报价管理</a><em></em></li>
        <li class=""><a v-link="{path:'/u/active/thisShop/find/0'}"><i
                class="ui_icon_18 icon-new-uc icon-new-uc-cheku"></i>活动车款</a><em></em></li>
        <!--<li class=""><a v-link="{path:'/u/message'}" :class="{ 'active': 4 === selected }" v-on:click="eveClk(4)"><i
                class="ui_icon_18 icon-new-uc icon-new-uc-news"  :class="{ 'i_active_4': 4 === selected }"></i>消息通知</a><em></em></li>-->
        <li class=""><a v-link="{path:'/u/exchange/cashing'}"><i
                class="ui_icon_18 icon-new-uc icon-new-uc-integral"></i>积分兑换</a><em></em></li>
        <li class=""><a v-link="{path:'/u/accout/info'}"><i
                class="ui_icon_18 icon-new-uc icon-new-uc-set"></i>账户管理</a><em></em></li>
    </ul>
</template>

<script>
    import $ from 'jquery'
</script>
<style>
    .active{
        background: #ff791f;
        color: #FFF!important;
    }
    .icon-new-uc-home {
        background-position: 0 0px;
    }
    .i_active_0{
        background-position: -32px 0px!important;
    }
    a:hover .icon-new-uc-home {
        background-position: -60px 0;
    }
    .icon-new-uc-order {
        background-position: 0 -42px;
    }
    .i_active_1{
        background-position: -32px -42px!important;
    }
    a:hover .icon-new-uc-order {
        background-position: -60px -42px;
    }

    .icon-new-uc-eye {
        background-position: 0 -84px;
    }
    .i_active_2{
        background-position: -32px -84px!important;
    }
    a:hover .icon-new-uc-eye {
        background-position: -60px -84px;
    }

    .icon-new-uc-cheku {
        background-position: 0 -126px;
    }
    .i_active_3{
        background-position: -32px -126px!important;
    }
    a:hover .icon-new-uc-cheku {
        background-position: -60px -126px;
    }

    .icon-new-uc-news {
        background-position: 0 -168px;
    }
    .i_active_4{
        background-position: -32px -211px!important;
    }
    a:hover .icon-new-uc-news {
        background-position: -60px -168px;
    }

    .icon-new-uc-integral {
        background-position: 0 -211px;
    }
    .i_active_5{
        background-position: -32px -211px!important;
    }
    a:hover .icon-new-uc-integral {
        background-position: -60px -211px;
    }

    .icon-new-uc-set {
        background-position: 0 -252px;
    }
    .i_active_6{
        background-position: -32px -252px!important;
    }
    a:hover .icon-new-uc-set {
        background-position: -60px -252px;
    }
</style>
