<template>
    <div class="order-list" id="order-list">
    	<div class="order-con G_f12">
    		<ul>
	    		<li>
	    			<div class="order-time">
	    				<h3>2016-08-16</h3>
	    				<h4>17:26:12</h4>
	    			</div>
	    			<div class="order-news">
	    				<i class="ui_icon_18 icon-new-uc icon-new-in-mes"></i>您有新的订单，订单号：<span>G35554545475474</span>，您可进入 <a v-link="{ path:'/u/message/messages', exact:true, replace:true, append:true}">购车订单</a> 页面查看详情。
	    			</div>
	    			<!--<order-tab></order-tab>-->
	    		</li>
	    	</ul>
    	</div>
    	<div id="page" style="text-align: center;"></div>
    </div>
</template>
<script>
    import {loader} from '../../util/util'
//  import OrderTab from '../order/OrderTab.vue'
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
        
//          this.$http.get('TableTitle.json').then((response) => {
//          	//响应成功回调
//          	var cToObj=eval("("+response.data+")");
//              this.$set("arr_title",cToObj.data);
//          },(response) => {
//          	//响应失败回调
//          	console.log();
//          });
//          this.$http.get('task.json').then((response) => {
//          	//响应成功回调
//          	var cToObj=eval("("+response.data+")");
//          	this.$set("arr_items",cToObj.data);
//          },(response) => {
//          	//响应失败回调
//          	console.log();
//          });
            
        },
        data(){
            return {
            }
        },
        components:{
//          OrderTab
        },
        methods:{
            listen(data){
                this.msg = '你点击了'+data+ '页'
            }
        }
    }
</script>
<style scoped>
	.order-list{
		padding: 6px 20px;
		overflow: hidden;
	}
	.order-con ul{
		width: 100%;
		overflow: hidden;
	}
	.order-con li{
		margin-bottom: 10px;
	}
	.order-con .order-time{
		color: #999999;
	}
	.order-con .order-time h3{
		text-align: center;
		line-height: 40px;
	}
	.order-con .order-news{
		color: #666666;
		padding: 8px 0;
	}
	.order-con .order-news a{
		color: #54c0fd;
	}
	.icon-new-in-mes{
		background-position: 0 -290px;
		margin-right: 0;
	}
</style>