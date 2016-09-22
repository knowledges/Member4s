<template>
	<!--<div id="orderSearch">
		<input type="text" placeholder="请输入关键字" v-model="ordertext" />
		<button class="G_f14" v-on:click="showdata">订单搜索</button>
	</div>-->
    <div class="orderList">
    	<div class="orderListCon">
    		<div class="order-top">
	    		<list-top></list-top>
	    	</div>
	    	<div class="order-tab" v-if="datatab">
	    		<list-tab v-bind:orderdata="orderdata"></list-tab>
	    	</div>
	    	<div class="order-nodata" v-if="datano">
	    		<h4><i class="order-nobg"></i>抱歉，暂无相关信息！</h4>
	    		<p>您可进入 <a v-link="{ path:'/u/manage'}">报价管理</a> 页面更新底价信息</p>
	    	</div>
    	</div>
    	<div id="page" style="text-align: center;"  v-else="datapage"></div>
    </div>
</template>
<script>
    import {loader} from '../../util/util'
	import ListTab from '../order/ListTab.vue'
	import ListTop from '../order/ListTop.vue'
    import config from '../../config'
	import $ from 'jquery'
	
	export default {
        ready(){
        	this.showdata();
        },
        data(){
            return {
            	SESSIONID:{},
            	datano: false,
            	datatab: false,
            	datapage: false,
            	ordertext:"",
            	orderdata:{}
            }
        },
        components:{
            ListTab,
            ListTop
        },
        methods:{
//          列表数据展示
			showdata(obj,page){
//				if(config.SESSIONID == ""){
//					this.SESSIONID = JSON.parse(sessionStorage.getItem("SESSIONID"));
//					config.SESSIONID  = this.SESSIONID.session.sessionid;
//					config.USERID  = this.SESSIONID.id;
//					console.log(config.SESSIONID);
//					console.log(config.USERID);
//				}
				
				var that = this;
                var lay = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
                var url = config.API_BASE+"/4s/order/list";
                var query = {};
//					query.id_4s = config.SESSIONID();
//					query.status = [1,6,7,8];
					query.id_4s = "223";
					query.status = [0,1,2];
	                query.pagenum = 3;
	                query.page = 1;
					query.keyword = that.ordertext;
				var param = { query:query };
				console.log(that.pagenum);
				
                $.ajax({
                    url:url,
                    type:'POST',
                    dataType: 'JSON',
                    contentType: 'application/json; charset=utf-8',
//                  data:JSON.stringify({"query":{"id_4s":id_4s,"status":[0,1,2],"pagenum":pagenum,"createtime":createtime,"keyword":keyword}}),
                    data:JSON.stringify(param),
                    beforeSend:function (request) {
	                    request.setRequestHeader("sessionid",config.SESSIONID());
	                },
	                success:function(response){
						if(response.code == 0){
	                        layer.close(lay);
	                        that.orderdata = response.data.rows;
	                        var leg = response.data.count;
	                        if( leg == 0){
	                        	$("#page").empty();
	                        	that.datano = true;
	                        }else{
	                        	that.datano = false;
	                        	that.datatab = true;
	                        	that.datapage = true;
	                        	laypage({
						            cont: document.getElementById('page'), //容器。值支持id名、原生dom对象，jquery对象,
						            pages: Math.ceil(response.data.count/query.pagenum), //总页数
						            curr: page||1,
						            skip: true, //是否开启跳页
						            skin: '#ff9205;',
						            groups: 5, //连续显示分页数
						            first: 1, //将首页显示为数字1,。若不显示，设置false即可
						            last: Math.ceil(response.data.count/query.pagenum), //将尾页显示为总页数。若不显示，设置false即可
						            jump: function(obj, first){
						                //回调
						                //得到了当前页，用于向服务端请求对应数据
						                var curr = obj.curr;
						                if(!first){
						                	that.showdata(that.selectedKey,curr);
						                }
						            }
						        });
						        
						        that.$nextTick(function () {
                                    console.log('xr');
                                    $(".laypage_btn").unbind("click").on('click',function(){
                                        if($(".laypage_skip").val()>0 && $(".laypage_skip").val()<=Math.ceil(response.data.count/query.pagenum)){
                                            that.getSpecialList(that.selectedKey,$(".laypage_skip").val());
                                        }else{
                                            layer.msg('请输入正确的跳转页码');
                                        }
                                    })
                                })

						        
	                        }
					        
	                    }else{
	                        layer.close(lay);
	                        that.datano = true;
	                        console.log(response.desc);
	                    }
	                    that.ordertext  = "";
					},
					error:function(fail){
						if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
					}
                })
               
			}
//			列表数据展示
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
.order-nodata{
	text-align: center;
	border: 1px solid #e5e5e5;
	margin-top: 10px;
	padding: 85px 0;
	font-size: 16px;
	color: #666666;
	line-height: 40px;
}
.order-nodata h4{
	color: #4c4c4c;
	font-size: 18px;
	line-height: 46px;
}
.order-nodata p a{
	color: #2194fe;
}
.order-nodata .order-nobg{
	width: 30px;
	height: 30px;
	display: inline-block;
	vertical-align: top;
	margin-top: 8px;
	margin-right: 8px;
	background-image: url(/img/ico_warn.png);
	background-repeat: no-repeat;
	background-position: -82px 4px;
	background-size: 300px 150px;
}
</style>
