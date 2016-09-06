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
                    <tr>
                        <th>商品</th>
                        <th>总价/元</th>
                        <th>定金/元</th>
                        <th>交易状态</th>
                        <th>提车时间</th>
                        <th>买家信息</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <dl class="clearfix">
                                <dt>
                                    <a v-link="{ path:''}">
                                    	<img src="http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/modelimg/2015-09-09/55efc15b4c243.jpg" alt="雪佛兰 科鲁兹" width="120" height="80">
                                    </a>
                                </dt>
                                <dd>
                                    <a v-link="{ path:''}" class="orange">日产轩逸2016款 1.6XV CVT自豪版</a>
                                    <p>外观：白色  内饰：黑色</p>
                                </dd>
                            </dl>
                        </td>
                        <td>
                            124,800
                        </td>
                        <td>
                            2,000
                        </td>
                        <td>
                            <p>已付定金</p>
                            <a v-link="{ path:'/u/message/messages'}" style="color:#48a6fc;">订单详情</a>
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
.ordTab-tab table tbody tr td dl dd a{
    line-height: normal;
}
.ordTab-tab table tbody tr td dl dd a.orange{
    color: #ff791f;
}
.ordTab-tab table tbody tr td a {
    display: block;
}	
.tab-col1{
	width: 350px;
}
.tab-col2{
	width: 90px;
}
.tab-col3{
	width: 120px;
}
</style>