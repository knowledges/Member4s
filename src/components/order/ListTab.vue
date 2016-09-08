<template>
	<div class="U_info_content">
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
                    	<th colspan="2">下单时间：<span>2016-08-16</span>订单号：<span>G35554545475474</span></th>
                    	<th colspan="4"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <dl class="clearfix">
                                <dt>
                                	<img src="http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/modelimg/2015-09-09/55efc15b4c243.jpg" alt="雪佛兰 科鲁兹" width="120" height="80">
                                </dt>
                                <dd>
                                    <span class="orange">日产轩逸2016款 1.6XV CVT自豪版</span>
                                    <p>外观：白色  内饰：黑色</p>
                                </dd>
                            </dl>
                        </td>
                        <td>
                            124,800
                        </td>
                        <td>
                            2,100
                        </td>
                        <td>
                            <p>已付定金</p>
                            <!--<a v-link="{ path:'/u/order/orderDetail'}" style="color:#48a6fc;">订单详情</a>-->
                        </td>
                        <td>
                            2016-8-31
                        </td>
                        <td>
                            <p>姓名：王小二</p>
                            <p>手机：15164638848</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
	
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
}
.ordTab-tab table tbody tr td dl dd span.orange{
    color: #ff791f;
    width: 220px;
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