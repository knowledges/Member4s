<template>
    <div class="UC_main_r">
        <div class="U_info" role="新消息">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <li class="icon-new-uc icon-news"></li>
                    <li>您已保存 <em>0</em> 个地址，还能设置 <em>8</em> 个</li>
                </ul>
            </div>
        </div>
        <div class="address_magment ohd" id="J_address_magment">
            <ul class="address_listbox clearfix">
                <li>
                    <a v-on:click="newAddress">
                        <i class="add"></i>
                        添加新地址
                    </a>
                </li>
                <li v-for="item in addlist | limitBy 8" data-id="{{item.id}}">
                    <div class="hover" v-if="item.status == 1">
                        <h2>{{item.receiver}}</h2>
                        <p>{{item.telphone}}</p>
                        <p><span>{{item.receipt_province}}</span><span>{{item.receipt_city}}</span><span>{{item.receipt_quarter}}</span></p>
                        <p>{{item.receipt_address}}</p>
                        <p>({{item.receiver}})</p>
                        <p class="setting">
                            <a class="orange" v-on:click="modify(item,_index)">修改</a>
                            <a class="orange" v-on:click="del(item,_index)"">删除</a>
                        </p>
                        <i class="selected" role="选中"></i>
                    </div>
                    <div v-else="item.status == 0">
                        <h2>{{item.receiver}}</h2>
                        <p>{{item.telphone}}</p>
                        <p><span>{{item.receipt_province}}</span><span>{{item.receipt_city}}</span><span>{{item.receipt_quarter}}</span></p>
                        <p>{{item.receipt_address}}</p>
                        <p>({{item.receiver}})</p>
                        <p class="setting">
                            <a class="orange" v-on:click="setting(item,_index)">设为默认</a>
                            <a class="orange" v-on:click="modify(item,_index)">修改</a>
                            <a class="orange" v-on:click="del(item,_index)"">删除</a>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="add_new addre" v-if="address">
            	<div class="titbox G_f16">
            		<h2 class="tit">新增地址<span>( <em>*</em>星号为必填项 )</span></h2>
            	</div>
            	<dl>
            		<dt class="star"><em>*</em>收&nbsp;&nbsp;货&nbsp;&nbsp;人&nbsp;:</dt>
            		<dd>
            			<input type="text" class="receiver" v-model="user" id="user_">
            			<div class="tips" v-if="user_"> <i></i> {{user_msg}} </div>
            		</dd>
            	</dl>
            	<dl>
            		<dt class="star"><em>*</em>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址&nbsp;:</dt>
            		<dd>
            			<div>
            				<select class="provice" v-model="proviceSelected" v-on:change="proviceOnChange">
	            				<option value="0" disabled="disabled" selected="selected">--选择省--</option>
	            				<option v-for="provice in selectProvice" track-by="$index" v-bind:value="provice">{{provice}}</option>
	            			</select>
	            			<select class="city" v-model="citySelected" v-on:change="cityOnChange" v-if="citySelected">
	            				<option value="0" disabled="disabled">--选择市--</option>
	            				<option v-for="city in selectCity" track-by="$index" v-bind:value="city">{{city}}</option>
	            			</select>
	            			<select class="area" v-model="areaSelected" v-if="areaSelected">
	            				<option value="0" disabled="disabled">--选择区--</option>
	            				<option v-for="area in selectArea" track-by="$index" v-bind:value="area">{{area}}</option>
	            			</select>
            			</div>
            			<input type="text" class="address" placeholder="请输入详细地址" v-model="addr" id="addr_">
            			<div class="tips" v-if="address_"> <i></i> {{addr_msg}} </div>
            		</dd>
            	</dl>
            	<dl>
            		<dt class="star"><em>*</em>手机号码&nbsp;:</dt>
            		<dd>
            			<input type="text" class="telephone" v-model="tel" id="tel_">
            			<div class="tips" v-if="tel_"> <i></i> {{tel_msg}} </div>
            		</dd>
            	</dl>
            	<dl>
            		<dt></dt>
            		<dd>
            			<input type="checkbox" class="default" id="default" checked="">
            			<label for="default" class="default_txt">设为默认地址</label>
            		</dd>
            	</dl>
            	<dl>
            		<dt></dt>
            		<dd>
            			<input type="submit" class="submit G_btn_a" value="保存" v-on:click="save">
            			<input type="submit" class="cancel G_btn_c" value="取消" v-on:click="newAddress">
            		</dd>
            	</dl>
            </div>
        </div>
    </div>
</template>
<script>
	import config from '../../config'
	import $ from 'jquery'
	
    export default{
    	ready(){
        	this.showlist();
        	
        },
        props:{
	    	addlist:{
	    		type:Array,
	            default:()=>[]
	    	}
	    },
        data(){
            return{
                address:false,
                user:'',
                addr:'',
                tel:'',
                user_:false,
                user_msg:"",
                address_:false,
                address_msg:"",
                tel_:false,
                tel_msg:"",
                selectProvice:[],
                selectCity:[],
                selectAll:[],
                selectArea:'',
                proviceSelected:true,
                citySelected: false,
                areaSelected:false
            }
        },
        methods:{
            newAddress(){
                this.address = ! this.address;
                var that = this;
                $.get("/data/area.json",function(response){
					that.$set("selectAll",response);                	
                	var province = [];
                	$.map(response,function(val,key){
                		province.push(key);
                	})
                	that.$set("selectProvice",province);
                });
            },
//          请求省
            proviceOnChange(){
				console.log(this.proviceSelected);
				
				var selectCity = [];
				var selectArea = "";
				this.citySelected = true;
                this.areaSelected = false;
				$.map(this.selectAll[this.proviceSelected],function(val,key){
					selectCity.push(key);
				});
				
				console.log("selectCity:"+JSON.stringify(selectCity));
            	this.$set("selectCity",selectCity);
            },
            //          请求市
            cityOnChange(){
            	
				var that = this;
            	that.areaSelected = true;
            	var selectArea = [];
            	/*省*/
				console.log();            	
				$.map(that.selectAll,function(val,key){
					$.map(val,function(v,i){
						if(that.citySelected == i){
							selectArea.push(v);
						}
					})
				})
				that.$set("selectArea",selectArea.join().split(","));
            },
            modify(item,_index){
            	var that = this;
                that.address = true;
                $.get("/data/area.json",function(response){
					that.$set("selectArea",response);                	
                	var province = [];
                	$.map(response,function(val,key){
                		province.push(key);
                	})
                	that.$set("selectProvice",province);
                });
                
            },
            setting(item,_index){
            	var that = this;
            	var url = config.API_BASE+"/4s/accountmanagement/setdefault";
                var query = {};
                	query.uid = config.USERID;
					query.id = item.id;
					console.log(query.id);
				var param = { query:query };
				if(item.status==0){
					$.ajax({
	                    url:url,
	                    type:'POST',
	                    dataType: 'JSON',
	                    contentType: 'application/json; charset=utf-8',
	                    data:JSON.stringify(param),
	                    beforeSend:function (request) {
		                    request.setRequestHeader("sessionid",config.SESSIONID);
		                },
		                success:function(response){
							if(response.code == 1){
		                        layer.msg('设置成功',{icon:1});
		                        setTimeout("window.history.go(0)",1500);
			                }
						},
						error:function(fail){
							if(fail.status =="401"){
								layer.msg("请您重新登录");
								that.$route.router.go("/login");
							}else{
								that.$route.router.go("/login");
							}
						}
	               });
                }
				
            },
            del(item,_index){
            	var that = this;
                layer.confirm('确认删除该地址吗？', {
                    title:'删除地址',
                    btn: ['确定','取消'] //按钮
                },function(){
	                var url = config.API_BASE+"/4s/accountmanagement/deladdress";
	                var query = {};
						query.id = item.id;
						console.log(query.id);
					var param = { query:query };
					
	                $.ajax({
	                    url:url,
	                    type:'POST',
	                    dataType: 'JSON',
	                    contentType: 'application/json; charset=utf-8',
	                    data:JSON.stringify(param),
	                    beforeSend:function (request) {
		                    request.setRequestHeader("sessionid",config.SESSIONID);
		                },
		                success:function(response){
		                	that.addlist.$remove(item);
							if(response.code == 0){
		                        layer.msg('已删除成功',{icon:1});
		                    }
						},
						error:function(fail){
							if(fail.status =="401"){
								layer.msg("请您重新登录");
							}else{
								that.$route.router.go("/login");
							}
						}
	                })
                }, function(){
                    layer.msg('容我再想想');
                });
            },
			showlist(){
				if(config.SESSIONID == ""){
					this.SESSIONID = JSON.parse(sessionStorage.getItem("SESSIONID"));
					config.SESSIONID  = this.SESSIONID.session.sessionid;
					config.USERID  = this.SESSIONID.id;
					console.log(config.SESSIONID);
					console.log(config.USERID);
				}
				
				var that = this;
                var lay = layer.load(); 
                var url = config.API_BASE+"/4s/accountmanagement/addrlist";
                var query = {};
					query.uid = config.USERID;
				var param = { query:query };
				
                $.ajax({
                    url:url,
                    type:'POST',
                    dataType: 'JSON',
                    contentType: 'application/json; charset=utf-8',
                    data:JSON.stringify(param),
                    beforeSend:function (request) {
	                    request.setRequestHeader("sessionid",config.SESSIONID);
	                },
	                success:function(response){
						if(response.code == 0){
	                        layer.close(lay);
	                        that.addlist = response.data;
					        
	                    }else{
	                        layer.close(lay);
	                        console.log(response.desc);
	                    }
					},
					error:function(fail){
						if(fail.status =="401"){
							layer.msg("请您重新登录");
							that.$route.router.go("/login");
						}else{
							that.$route.router.go("/login");
						}
					}
                })
               
			},
			save(){
				if(this.user ==""){
					this.user_ = true;
                    this.user_msg="收货人不能为空";
                    $("#user_").addClass('lost');
                }else if(this.user.length>10){
                	this.user_ = true;
                    this.user_msg="收货人应该在1-10个字符之间";
                    $("#user_").addClass('lost');
                }else if(this.addr == ""){
                	this.user_ = false;
                	this.user_msg = "";
                    this.addr_msg = "收货地址不能为空";
                    $("#user_").removeClass('lost');
                    $("#addr_").addClass('lost');
                }else if(this.tel==""){
                	this.user_msg="";
                    this.user_ = false;
                    $("#addr_").removeClass('lost');
                    this.tel_msg = "手机号不能为空";
                    this.tel_ = true;
                    $("#tel_").addClass('lost');
                }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.tel))){
                    this.tel_msg = "手机号格式不正确";
                    this.tel_ = true;
                    $("#tel_").addClass('lost');
                }else{
                	$("#user_").removeClass('lost');
                	$("#addr_").removeClass('lost');
                	$("#tel_").removeClass('lost');
                	this.user_msg="";
                    this.user_ = false;
                    this.addr_msg="";
                    this.addr_ = false;
                    this.tel_msg="";
                    this.tel_ = false;
                    
					//              收货地址保存
					var url = config.API_BASE+"/4s/accountmanagement/addaddress";
	                var query = {};
	                	query.user_id = config.USERID;
						query.receiver = $(".addre .receiver").val();
						query.receipt_province = $(".addre .provice option").val();
						query.receipt_city = $(".addre .city option").val();
						query.receipt_quarter = $(".addre .area option").val();
						query.receipt_address = $(".addre .provice option").val();
						query.telphone = $(".addre .provice option").val();
					var param = { query:query };
					$.ajax({
	                    url:url,
	                    type:'POST',
	                    dataType: 'JSON',
	                    contentType: 'application/json; charset=utf-8',
	                    data:JSON.stringify(param),
	                    beforeSend:function(request) {
		                    request.setRequestHeader("sessionid",config.SESSIONID);
		                },
		                success:function(response){
							if(response.code == -1){
		                        layer.msg('设置成功',{icon:1});
		                        setTimeout("window.history.go(0)",1500);
			                }
						},
						error:function(fail){
							if(fail.status =="401"){
								layer.msg("请您重新登录");
								that.$route.router.go("/login");
							}else{
								that.$route.router.go("/login");
							}
						}
	               });
					
                }
				
			}
        }
    }
</script>
<style>
    .UC_main_r {
        display: inline-block;
        letter-spacing: normal;
        word-spacing: normal;
        vertical-align: top;
        font-size: 12px;
        min-height: 600px;
        padding-bottom: 20px;
    }
    .orange{
        color:#ff791f;
    }
    /*store*/
    .nav_title {
        margin: 10px 0 0 0;
    }
    .nav_title .nav_title_left {
        float: left;
        margin-left: 20px;
        padding: 10px;
        display: inline-block;
        width: 50%;
    }
    .nav_title .nav_title_left li {
        float: left;
        padding-left: 5px;
        margin: 0;
        display: inline-block;
    }
    .nav_title .nav_title_left .icon-news {
        background-position: -60px -290px;
    }
    .nav_title .nav_title_left em {
        color: #ff7920;
    }
    /*新增地址*/
    .address_listbox li{
        float: left;
        margin: 20px;
    }
    .address_listbox li:first-child{
        border: 2px dashed #ccc;
        color: #CCCCCC;
        font-size: 16px;
    }
    .address_listbox li:first-child a{
        position: relative;
        display: inline-block;
        width: 240px;
        height: 166px;
        /*border: 2px dashed #ccc;*/
        color: #CCCCCC;
        font-size: 16px;
        text-align: center;
        line-height: 230px;
        cursor: pointer;
    }
    .address_listbox li:first-child a i{
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        display: inline-block;
        width: 60px;
        height: 60px;
        background: url('/img/add.png') no-repeat;
        background-size: 100% 100%;
    }
    .address_listbox li:nth-child(n+2) div{
        position: relative;
        display: inline-block;
        width: 230px;
        min-height: 150px;
        padding-bottom: 20px;
        padding-right: 10px;
        border: 1px solid #ccc;
        color: #CCCCCC;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }
    .address_listbox li:nth-child(n+2) div h2 {
        margin: 0 0 0 20px;
        padding: 8px 0;
        font-size: 18px;
        color: #000000;
        text-align: left;
    }
    .address_listbox li:nth-child(n+2) div p{
        margin-left: 20px;
        padding: 2px 0;
        text-align: left;
        font-size: 12px;
        color: #666;
    }
    .address_listbox li:nth-child(n+2) div p span{
    	margin-right: 12px;
    	display: inline-block;
    }
    p.setting{
        display: none;
        text-align: right!important;
        margin-right: 20px;
        position: absolute;
        right: 0;
        bottom: 5px;
    }
    i.selected{
        position: absolute;
        bottom: 0;
        right: 0;
        display: block;
        width: 18px;
        height: 18px;
        background: url('/img/ico_warn.png') no-repeat;
        background-position: -86px -58px;
    }
    .address_listbox li:nth-child(n+2) div p.hover i.selected{
    	display: block;
    }
    .address_listbox li:nth-child(n+2) div:hover,.address_listbox li div.hover{
        border: 1px solid #ff791f;
    }
    .address_listbox li:nth-child(n+2) div:hover p.setting{
        display: block;
    }
    .address_listbox li:nth-child(n+2) div:hover i.selected{
        display: block;
    }

    
   .address_magment .titbox {
	    height: 95px;
	    line-height: 95px;
	    font-size: 16px;
	}
	.address_magment .titbox .tit {
	    font-weight: bold;
	    margin-left: 12px;
	}
	.address_magment .titbox .tit span {
	    font-size: 14px;
	    color: #999;
	    font-weight: normal;
	    margin-left: 10px;
	}
	.address_magment .add_new dl {
	    margin-bottom: 25px;
	    position: relative;
	}
	.address_magment .add_new dl dt {
	    width: 85px;
	    height: 30px;
	    position: absolute;
	    left: 0;
	    font-size: 14px;
	    line-height: 30px;
	    color: #666;
	}
	.address_magment .add_new dl dd {
	    margin-left: 90px;
	    position: relative;
	}
	.address_magment .add_new dl dd input[type="text"] {
	    height: 28px;
	    line-height: 28px;
	    border-radius: 3px;
	    border: 1px solid #ccc;
	    text-indent: 10px;
	    color: #666;
	    font-size: 14px;
	    width: 446px;
	}
	.address_magment .add_new dl dd .tips {
	    display: inline-block;
	    line-height: 30px;
	    margin-left: 10px;
	}
	.address_magment .add_new dl dd select {
	    width: 140px;
	    margin-right: 10px;
	    height: 30px;
	    text-indent: 10px;
	    border-radius: 3px;
	    color: #666;
	    font-size: 14px;
	    margin-bottom: 20px;
	}
	.address_magment .add_new .default {
	    position: absolute;
	    top: 7px;
	}
	.address_magment .add_new .default_txt {
	    margin-left: 15px;
	    line-height: 26px;
	    color: #666;
	}
	.G_btn_a, .G_btn_b, .G_btn_c, .G_btn_d, .G_btn_e {
	    padding: 0 10px 0 10px;
	    white-space: nowrap;
	    display: inline-block;
	    border-radius: 2px;
	    height: 26px;
	    line-height: 26px;
	    text-decoration: none;
	    font-size: 14px;
	    min-width: 40px;
	    text-align: center;
	    outline: none;
	    border: none;
	    cursor: pointer;
	}
	.G_btn_a {
	    background: #ff8140;
	    color: #fff;
	}
	.address_magment .add_new .submit {
	    width: 110px;
	    height: 30px;
	    font-size: 16px;
	    margin-right: 20px;
	}
	.G_btn_c {
	    background: #ccc;
	    color: #fff;
	    box-shadow: 0px 1px 2px rgba(0,0,0,0.25);
	}
	.G_btn_c:hover {
	    background: #bbb;
	}
	.address_magment .add_new .cancel {
	    width: 110px;
	    height: 30px;
	    font-size: 16px;
	}
	.address_magment .add_new{
		margin-left: 50px;
	}
	.address_magment .add_new dl dt em{
		color: red;
		margin-right: 5px;
		float: left;
		margin-top: 2px;
	}
	.tips i{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('/img/pwd-icons-new.png') no-repeat;
        background-position: -102px -47px;
        vertical-align: top;
        margin-top: 5px;
    }
    .lost{
    border: 1px solid red!important;
	}
	.tit span em{
		color: red;
	}
</style>
