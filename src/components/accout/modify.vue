<template>
    <div class="UC_main_r">
        <div class="fill_in_info">
            <dl class="clearfix">
                <dt>当前密码：</dt>
                <dd><input type="password" v-model="password" id="cur_" minlength="6" maxlength="16" placeholder="请输入当前使用密码"></dd>
                <dd v-if="cur_match" style="color: red"><i></i>{{cur_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>新密码：</dt>
                <dd>
                    <input type="password" v-model="newpassword" id="new_" v-on:keyup="inputPwd" minlength="6" maxlength="16" placeholder=" (6-16个英文字母、数字或符号)">
                </dd>
                <dd v-if="new_match" style="color: red"><i></i>{{new_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>确认密码：</dt>
                <dd>
                    <input type="password" v-model="agree_password" id="agree_" placeholder="请再次输入新密码">
                </dd>
                <dd v-if="agree_match" style="color: red"><i></i>{{agree_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <ul class="clearfix">
                        <li>安全级别：</li>
                        <li :class="low?'red':''">低</li>
                        <li :class="middle?'yellow':''">中</li>
                        <li :class="high?'green':''">高</li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button v-on:click="savePwd">保存</button>
                    <button>取消</button>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
	import config from '../../config'
    import $ from 'jquery'
    export default{
        data(){
            return{
                password:'',
                newpassword:'',
                agree_password:'',
                cur_match:false,
                cur_msg:"",
                new_match:false,
                new_msg:"",
                agree_match:false,
                agree_msg:"",
                low:false,//低
                middle:false,//中
                high:false//高
            }
        },
        methods:{
            /*
             *密码安全程度
             *return ：全部为字母或者数字,或者密码长度小于
             *return : 字母数字组成，或者字母特殊字符，或者数字和特殊字符
             *
             *return : 字母和数字和特殊字符
             * /[a-zA-Z]+/.test(string) && /[0-9]+/.test(string) && /\W+\D+/.test(string)
             */
            inputPwd(){
                var that = this;
                var _timer = null;
                _timer = setTimeout(function (e) {
                    clearTimeout(_timer);
                    var newpassword = that.newpassword;
                    if(newpassword.length>=6){
                        if(/[a-zA-Z]+/.test(newpassword)||/[0-9]+/.test(newpassword)||/\W+\D+/.test(newpassword)){
                            that.low = true;
                            that.middle = false;
                            that.high = false;
                        }
                        if((/[a-zA-Z]+/.test(newpassword) && /[0-9]+/.test(newpassword))|| (/[a-zA-Z]+/.test(newpassword) && /\W+\D+/.test(newpassword))||(/[0-9]+/.test(newpassword) && /\W+\D+/.test(newpassword))){
                            that.low = false;
                            that.middle = true;
                            that.high = false;
                        }
                        if(/[a-zA-Z]+/.test(newpassword) && /[0-9]+/.test(newpassword) && /\W+\D+/.test(newpassword)){
                            that.low = false;
                            that.middle = false;
                            that.high = true;
                        }
                    }else{
                        that.low = false;
                        that.middle = false;
                        that.high = false;
                    }
                },500);
            },
            savePwd(){
//          	if(config.SESSIONID == ""){
//					this.SESSIONID = JSON.parse(sessionStorage.getItem("SESSIONID"));
//					config.SESSIONID  = this.SESSIONID.session.sessionid;
//					config.USERID  = this.SESSIONID.id;
//					console.log(config.SESSIONID);
//					console.log(config.USERID);
//				}
            	
                if(this.password =="" ){
                    this.cur_match = true;
                    this.cur_msg = "当前密码不能为空";
                    $("#cur_").addClass("lost");
                }else if(this.password.length < 6){
                    this.cur_match = true;
                    this.cur_msg = "密码长度不能小于6位";
                    $("#cur_").addClass("lost");
                }else if(this.password.length > 16){
                    this.cur_match = true;
                    this.cur_msg = "密码长度不能大于16位";
                    $("#cur_").addClass("lost");
                }else if(this.newpassword ==""){
                	this.cur_match = false;
                	this.cur_msg = "";
                    this.new_match = true;
                    this.new_msg = "新密码不能为空";
                    $("#cur_").removeClass("lost");
                    $("#new_").addClass("lost");
                }else if(this.newpassword.length < 6 ){
                	this.cur_match = false;
                	this.cur_msg = "";
                    this.new_match = true;
                    this.new_msg = "密码长度不能小于6位";
                    $("#cur_").removeClass("lost");
                    $("#new_").addClass("lost");
                }else if(this.newpassword.length > 16 ){
                	this.cur_match = false;
                	this.cur_msg = "";
                    this.new_match = true;
                    this.new_msg = "密码长度不能大于16位";
                    $("#cur_").removeClass("lost");
                    $("#new_").addClass("lost");
                }else if(this.agree_password==""){
                	this.cur_match = false;
                	this.cur_msg = "";
                	this.new_match = false;
                	this.new_msg = "";
                    this.agree_match = true;
                    this.agree_msg = "确认密码不能为空";
                    $("#cur_").removeClass("lost");
                    $("#new_").removeClass("lost");
                    $("#agree_").addClass("lost");
                }else if(this.newpassword!=this.agree_password){
                	this.cur_match = false;
                	this.cur_msg = "";
                	this.new_match = false;
                	this.new_msg = "";
                    this.agree_match = true;
                    this.agree_msg = "确认密码与新密码不一致";
                    $("#cur_").removeClass("lost");
                    $("#new_").removeClass("lost");
                    $("#agree_").addClass("lost");
                }else{
                	this.cur_match = false;
                	this.cur_msg = "";
                	this.new_match = false;
                	this.new_msg = "";
                    this.agree_match = false;
                    this.agree_msg = "";
                    $("#cur_").removeClass("lost");
                    $("#new_").removeClass("lost");
                    $("#agree_").removeClass("lost");
                  
//                修改密码
    				var that = this;
	            	var url = config.API_BASE+"/4s/accountmanagement/resetpassword";
	                var query = {};
	                	query.id = config.USERID();
	                	query.password = that.password;
	                	query.newpassword = that.newpassword;
//						query.id = "186";
					var param = { query:query };
                    $.ajax({
	                    url:url,
	                    type:'POST',
	                    dataType: 'JSON',
	                    contentType: 'application/json; charset=utf-8',
	                    data:JSON.stringify(param),
	                    beforeSend:function (request) {
		                    request.setRequestHeader("sessionid",config.SESSIONID());
		                },
		                success:function(response){
							if(response.code == 0){
		                        layer.msg('密码修改成功',{icon:1});
		                        setTimeout("window.history.go(0)",1500);
			                }else if(response.code == -3){
			                	layer.msg('原密码输入不正确',{icon:2});
			                }else{
			                	layer.msg('密码修改失败',{icon:2});
			                }
						},
						error:function(fail){
							if(fail.status == "401"){
	                            sessionStorage.removeItem("SESSIONID");
	                            layer.msg('登录失效，请重新登陆！');
	                            that.$route.router.go("/login");
	                        }
						}
	                });
                }
            }
        }
    }
</script>

<style scoped>
    .red{
        color: red!important;
        border-bottom: 4px solid  red!important;;
    }
    .yellow{
        color: orange!important;;
        border-bottom: 4px solid orange!important;;
    }
    .green{
        color: green!important;;
        border-bottom: 4px solid green!important;;
    }
    .lost {
        border: 1px solid red!important;
    }
    .UC_main_r div{
        padding: 45px 80px 0 80px;
        font-size: 16px;
    }
    .UC_main_r div dl{
        margin: 20px 0;
    }
    .UC_main_r div dl dt,.UC_main_r div dl dd{
        float: left;
        height: 35px;
        line-height: 35px;
    }
    .UC_main_r div dl dt{
        display:inline-block;
        width: 80px;
        text-align: right;
    }
    .UC_main_r div dl dd{
        margin-left: 20px;
        text-align: left;
    }
    .UC_main_r div dl dd i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('/img/pwd-icons-new.png') no-repeat;
        background-position: -102px -47px;
        vertical-align: sub;
    }
    .UC_main_r div dl dd ul li{
        float: left;
    }
    .UC_main_r div dl dd ul li:nth-child(n+2){
        padding: 0 35px;
        margin: 0 2px;
        border-bottom: 4px solid #ccc;
        font-size: 12px;
        color: #ccc;
    }
    .UC_main_r div dl dd input[type="password"]{
        padding: 0 5px;
        border: 1px solid #CCCCCC;
        height: 34px;
        width: 380px;
    }
    .UC_main_r div dl dd button{
        padding: 5px 60px;
        margin: 0 15px;
        background: #fa8c35;
        color: #FFF;
        border: none;
        cursor: pointer;
    }
    .UC_main_r div dl dd button:last-child{
        background: #ccc;
    }
    .fill_in_info  dl:last-child{
        padding: 20px 0 40px 0;
    }
</style>
