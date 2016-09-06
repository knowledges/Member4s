<template>
	<div id="orderSearch">
		<input type="text" placeholder="请输入关键字" />
		<button class="G_f14">订单搜索</button>
	</div>
    <div class="orderList">
    	<div class="order-top">
    		<list-top></list-top>
    	</div>
    	<div class="order-tab">
    		<list-tab></list-tab>
    	</div>
    	<div id="page" style="text-align: center;"></div>
    </div>
</template>
<script>
    import {loader} from '../../util/util'
	import ListTab from '../order/ListTab.vue'
	import ListTop from '../order/ListTop.vue'
	import $ from 'jquery'
	
	export default {
        ready(){
        	laypage({
	            cont: document.getElementById('page'), //容器。值支持id名、原生dom对象，jquery对象,
	            pages: 100, //总页数
	            skip: true, //是否开启跳页
	            skin: '#ff9205;',
	            groups: 5, //连续显示分页数
	            first: 1, //将首页显示为数字1,。若不显示，设置false即可
	            last: 100, //将尾页显示为总页数。若不显示，设置false即可
	            jump: function(obj, first){
	                //回调
	                //得到了当前页，用于向服务端请求对应数据
	                var curr = obj.curr;
	            }
	        });
        },
        data(){
            return {
            }
        },
        components:{
            ListTab,
            ListTop
        },
        methods:{
            listen(data){
                this.msg = '你点击了'+data+ '页'
            }
        }
    }
</script>
<style>
.orderList{
	padding: 15px 20px;
}
#orderSearch{
	width: 210px;
	height: 26px;
	line-height: 26px;
	border: 1px solid #cccccc;
	position: absolute;
	right: 20px;
	top: 25px;
}
#orderSearch input[type=text]{
	width: 125px;
	float: left;
	padding-left: 5px;
	height: 26px;
	line-height: 26px;
	color: #cccccc;
	font-family: simsun;
	border: none;
	outline: none;
}
#orderSearch button{
	width: 78px;
	background: #ff791f;
	text-align: center;
	height: 28px;
	line-height: 28px;
	margin: -1px;
	float: right;
	display: inline-block;
	color: #fff;
	border: none;
	outline: none;
	cursor: pointer;
}
</style>