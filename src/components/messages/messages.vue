<template>
    <div class="mes-list G_f12">
    	<div class="mes-con">
    		<div class="mes-item">
    			<div class="mes-date">2016-08-16</div>
    			<div class="mes-itemlist">
    				<ul>
    					<li>
    						<h4>17:26:12</h4>
    						<dl>
    							<i class="ui_icon_18 icon-new-uc icon-new-in-mes"></i>
    							<dt>您于<a v-link="{ path:'/u/active'}">活动车款</a>页面发布的“奥迪 A1 2016 全新豪华款” 特价车活动已通过审核。</dt>
    							<dd>活动将于 2016-08-26 9:00 开始，您可在 购车惠网站 —— 活动特卖 页面查看到此款车的活动近况。</dd>
    						</dl>
    					</li>
    					<li>
    						<h4>17:26:12</h4>
    						<dl>
    							<i class="ui_icon_18 icon-new-uc icon-new-in-mes"></i>
    							<dt>您于<a v-link="{ path:'/u/active'}">活动车款</a>页面发布的“奥迪 A1 2016 全新豪华款” 特价车活动已通过审核。</dt>
    							<dd>活动将于 2016-08-26 9:00 开始，您可在 购车惠网站 —— 活动特卖 页面查看到此款车的活动近况。</dd>
    						</dl>
    					</li>
    				</ul>
    			</div>
    		</div>
    		<div class="mes-item">
    			<div class="mes-date">2016-08-16</div>
    			<div class="mes-itemlist">
    				<ul>
    					<li>
    						<h4>17:26:12</h4>
    						<dl>
    							<i class="ui_icon_18 icon-new-uc icon-new-in-mes"></i>
    							<dt>您于<a v-link="{ path:'/u/active'}">活动车款</a>页面发布的“奥迪 A1 2016 全新豪华款” 特价车活动已通过审核。</dt>
    							<dd>活动将于 2016-08-26 9:00 开始，您可在 购车惠网站 —— 活动特卖 页面查看到此款车的活动近况。</dd>
    						</dl>
    					</li>
    					<li>
    						<h4>17:26:12</h4>
    						<dl>
    							<i class="ui_icon_18 icon-new-uc icon-new-in-mes"></i>
    							<dt>您于<a v-link="{ path:'/u/active'}">活动车款</a>页面发布的“奥迪 A1 2016 全新豪华款” 特价车活动已通过审核。</dt>
    							<dd>活动将于 2016-08-26 9:00 开始，您可在 购车惠网站 —— 活动特卖 页面查看到此款车的活动近况。</dd>
    						</dl>
    					</li>
    				</ul>
    			</div>
    		</div>
    	</div>
    	<div id="page" style="text-align: center;"></div>
    </div>
</template>
<script>
    import {loader} from '../../util/util'
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
//          	
//          });
//          this.$http.get('task.json').then((response) => {
//          	//响应成功回调
//          	var cToObj=eval("("+response.data+")");
//              this.$set("arr_items",cToObj.data);
//          },(response) => {
//          	//响应失败回调
//          	
//          });
            
        },
        data(){
            return {
            }
        },
        components:{
        },
        methods:{
            listen(data){
                this.msg = '你点击了'+data+ '页'
            }
        }
    }
</script>
<style scoped>
	.mes-list{
		padding: 6px 36px 6px 45px;
		color: #666666;
		overflow: hidden;
	}
	.mes-item .mes-itemlist li{
		margin-bottom: 8px;
	}
	.mes-item .mes-itemlist li h4{
		color: #999999;
	}
	.mes-item .mes-date{
		line-height: 40px;
		text-align: center;
		color: #999999;
	}
	.mes-item .mes-itemlist dl{
		line-height: 24px;
		position: relative;
	}
	.mes-item .mes-itemlist dl a{
		color: #54c0fd;
	}
	.icon-new-in-mes{
		background-position: 0 -290px;
		position: absolute;
		top: 6px;
		left: -18px;
	}
</style>