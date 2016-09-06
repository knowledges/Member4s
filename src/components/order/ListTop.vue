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