<template>
	<div class="U_info_content" v-for="item in orderdata">
        <div class="ordTab-tab">
            <table>
            	<colgroup>
            		<col class="tab-col1" />
            		<col class="tab-col2" />
            		<col class="tab-col2" />
            		<col class="tab-col2" />
            		<col class="tab-col3" />
            		<col />
            	</colgroup>
                <thead>
                    <tr class="thead-tr G_f12">
                    	<th colspan="3">下单时间：<span class="orderYd">{{item.createtime}}</span>订单号：<span>{{item.out_trade_no}}</span></th>
                    	<th colspan="3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <dl class="clearfix">
                                <dt>
                                	<img v-bind:src="item.exterior_img" v-bind:alt="item.carstyle" width="120" height="80">
                                </dt>
                                <dd>
                                    <span class="orange">{{item.carstyle}}</span>
                                    <p>外观：<span>{{item.exterior_color_name}}</span>  内饰：<span>{{item.interior_color_name}}</span></p>
                                </dd>
                            </dl>
                        </td>
                        <td>
                            {{item.low_price}}
                        </td>
                        <td>
                            {{item.money}}
                        </td>
                        <td>
                            <p v-if="item.status == 0">未支付</p>
                            <p v-if="item.status == 1">已支付</p>
                            <p v-if="item.status == 2">已失效</p>
                            <p v-if="item.status == 3">审核中</p>
                            <p v-if="item.status == 4">通过审核</p>
                            <p v-if="item.status == 5">未通过审核</p>
                            <p v-if="item.status == 6">出库中</p>
                            <p v-if="item.status == 7">提车中</p>
                            <p v-if="item.status == 8">已完成</p>
                            <p v-if="item.status == 9">支付中</p>
                            <p v-if="item.status == 10">支付失败</p>
                            <!--<a v-link="{ path:'/u/order/orderDetail'}" style="color:#48a6fc;">订单详情</a>-->
                        </td>
                        <td>
                            {{item.buy_time}}
                        </td>
                        <td>
                            <p>姓名：{{item.buyer_name}}</p>
                            <p>手机：{{item.buyer_tel}}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    props:{
    	pagenum: Number,
    	orderdata:{
    		type:Array,
            default:()=>[]
    	},
        arr_items:{
            type:Array,
            default:()=>[]
        }
    }
}
</script>
<style scoped>
.tab-col1{
	width: 350px;
}
.tab-col2{
	width: 90px;
}
.tab-col3{
	width: 120px;
}
.ordTab-tab{
	margin-top: 10px;
}
.ordTab-tab table{
    width: 100%;
    border:1px solid #e5e5e5;
}
.ordTab-tab table thead tr th{
    padding: 10px;
    text-align: center;
    background: #f1f2f3;
    color: #000000;
}
.ordTab-tab table tbody tr td{
    border: 1px solid #e5e5e5;
    text-align: center;
}
.ordTab-tab table tbody tr td dl dd,table tbody tr td dl dt{
    float: left;
}
.ordTab-tab table tbody tr td dl dd{
    line-height: 30px;
    margin-top: 20px;
}
.ordTab-tab table tbody tr td dl dd span{
    line-height: normal;
    margin-right: 10px;
}
.ordTab-tab table tbody tr td dl dd span.orange{
    color: #ff791f;
    width: 210px;
    line-height: 20px;
    display: block;
}
.ordTab-tab table thead tr.thead-tr{
	padding-left: 20px;
	line-height: 30px;
	background: #f5f5f5;
}
.ordTab-tab table thead tr.thead-tr th{
	padding: 0 0 0 15px;
	background: #f5f5f5;
	text-align: left;
	color: #999999;
	font-family: simsun;
}
.ordTab-tab table thead tr.thead-tr th span{
	color: #666666;
	margin-right: 20px;
}
</style>
