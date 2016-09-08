<template>
    <div class="orderList">
    	<div class="orderListCon">
    		<div class="order-top">
	    		<list-top></list-top>
	    	</div>
	    	<div class="order-tab">
	    		<list-tab></list-tab>
	    	</div>
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
	padding: 15px 20px 20px;
}
.orderListCon{
	margin-bottom: 20px;
}
</style>