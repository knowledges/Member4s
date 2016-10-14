<template>
    <div class="UC_main_r">
        <div class="show_info">
            <dl class="clearfix">
                <dt>公司名称：</dt>
                <dd>{{infolist.name_4s}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>公司地址：</dt>
                <dd>{{infolist.addr}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>主营品牌：</dt>
                <dd>{{infolist.brand_name}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>副营品牌：</dt>
                <dd v-for="subitem in infolist.brandlist" v-show="subitem.brand_name != infolist.brand_name"><span>{{subitem.brand_name}}</span></dd>
            </dl>
            <dl class="clearfix" v-if="infolist.my_num">
                <dt>邀请码：</dt>
                <dd>{{infolist.my_num}}</dd>
            </dl>
            <dl class="clearfix" v-if="infolist.contacts">
                <dt>联系人：</dt>
                <dd>{{infolist.contacts}}</dd>
            </dl>
            <!--<dl class="clearfix" v-if="usersex">
                <dt>性别：</dt>
                <dd>{{gender}}</dd>
            </dl>-->
            <dl class="clearfix" v-if="infolist.tel">
                <dt>手机：</dt>
                <dd>{{infolist.tel}}</dd>
            </dl>
            <!--<dl class="clearfix" v-if="userphone">
                <dt>固话：</dt>
                <dd>{{telephone}}</dd>
            </dl>-->
            <dl class="clearfix" v-if="infolist.email">
                <dt>邮箱：</dt>
                <dd>{{infolist.email}}</dd>
            </dl>
        </div>
        <div class="fill_in_info">
            <validator name="validateinfo">
            <dl class="clearfix">
                <dt><em class="orange">*</em>联系人：</dt>
                <dd><input type="text" v-model="user" v-validate:user="['username']" initial="off" id="user_" placeholder="请输入联系人名称"></dd>
                <dd v-show="$validateinfo.user.username"><i></i>  联系人由1-10个数字、字符、下划线、中文组成</dd>
            </dl>
            <dl class="clearfix">
                <dt><em class="orange">*</em>手机：</dt>
                <dd>
                    <input type="text" v-model="phone" v-validate:phone="['tel']" initial="off"  id="phone_" placeholder="请输入手机号">
                    <input type="text" v-model="code">
                    <button class="getCode" v-on:click="getCode">获取验证码</button>
                </dd>
                <dd v-show="$validateinfo.phone.tel"><i></i> 手机号格式不正确</dd>
            </dl>
            <dl class="clearfix">
                <dt><em class="orange">*</em>邮箱：</dt>
                <dd>
                    <input type="text" v-model="email" v-validate:email="['email']" initial="off" id="email" placeholder="请输入邮箱">
                </dd>
                <dd v-show="$validateinfo.email.email"><i></i>邮箱格式不正确</dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button v-on:click="save">保存</button> <span><em class="orange">*</em>为必填项</span>
                </dd>
            </dl>
            </validator>
        </div>
    </div>
</template>

<script>
	import config from '../../config'
    import $ from 'jquery'
    import manageValidate from './../../util/util'
    
    export default{
    	ready(){
        	this.getinfo();
    	},
    	props:{
	    	infolist:{
	    		type:Array,
	            default:()=>[]
	    	},
	    },
        data(){
            return{
                user:'',
                phone:'',
                code:'',
                telephone:'',
                email:'',
                user_msg:"",
                phone_msg:"",
                email_msg:"",
                codemd5:'',
            }
        },
        methods:{
        	getCode(){
				var that = this;
				var url = config.PHP_API+"/index.php/Api/sendMessages";
				var	mobile = that.phone;
				var	tpl_id = "5774";
				var formd = new FormData();
				formd.append("mobile",mobile);
				formd.append("tpl_id",tpl_id);
                that.$validate('phone',function () {
                    console.log(!that.$validateinfo.phone.tel);
                    if(!that.$validateinfo.phone.tel){
                        $.ajax({
                            url:url,
                            type:'POST',
                            contentType: false,
                            processData: false,
                            data:formd,
                            success:function(response){
                                if(response.code == 0){
                                    that.codemd5 = '';
                                    that.codemd5 = response.md5code;
                                    layer.msg('验证码发送成功',{icon:1});
                                    var seed = 60,_timer = null;
                                    $(".getCode").attr("disabled",true);
                                    $(".getCode").css({"border":"1px solid #ccc","color":"#666","cursor":"not-allowed"});
                                    function tips() {
                                        if(seed<=0){
                                            $(".getCode").html("获取验证码");
                                            seed = 60;
                                            clearInterval(_timer);
                                            $(".getCode").attr("disabled",false);
                                            $(".getCode").css({"border":"1px solid #ff791f","color":"#ff791f","cursor":"pointer"});
                                            return ;
                                        }
                                        seed -- ;
                                        $(".getCode").html(seed+"S&nbsp;&nbsp;后重试");
                                    }
                                    _timer = setInterval(tips,1001);
                                }else{
                                    console.log(response.desc);
                                }
                            },
                            error:function(fail){
                                if(fail.status == "401"){
                                    var SESSIONID = sessionStorage.getItem("SESSIONID");
                                    if(SESSIONID == null){
                                        that.$route.router.go("/login");
                                    }else{
                                        sessionStorage.removeItem("SESSIONID");
                                        layer.msg('登录失效，请重新登陆！');
                                        util.login();
                                    }
                                }
                            }
                        });
                    }
                })

            },
            save(){

                var that = this;
                that.$validate(true,function () {
                    if(!that.$validateinfo.invalid){
                        if(that.code == ""){
                            that.phone_msg = "";
                            that.phone_ = false;
                            $("#phone_").removeClass('lost');
                            layer.msg("验证码不能为空");
                        }else if(that.code != ''){
                            var urlver = config.PHP_API+"/index.php/api/verifyMessages";
                            var code = that.code;
                            var	mobile = that.phone;
                            var	md5code = that.codemd5;
                            var formd = new FormData();
                            formd.append("code",code);
                            formd.append("mobile",mobile);
                            formd.append("md5code",md5code);

                            $.ajax({
                                url:urlver,
                                type:'POST',
                                contentType: false,
                                processData: false,
                                data:formd,
                                success:function(response){
                                    if(response.code == 0){
                                        that.phone_msg = "";
                                        that.phone_ = false;
        //                  			保存信息
                                        var url = config.API_BASE+"/4s/accountmanagement/updateinformation";
                                        var query = {};
                                        query.uid = config.USERID();
                                        query.tel = that.phone;
                                        query.contacts = that.user;
                                        query.email = that.email;
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
                                                if(response.code == 1){
                                                    layer.msg('信息修改成功',{icon:1});
                                                    var sessionid = JSON.parse(sessionStorage.getItem("SESSIONID"));
                                                    sessionid.email = that.email;
                                                    sessionid.tel = that.phone;
                                                    sessionStorage.setItem("SESSIONID",JSON.stringify(sessionid));
                                                    setTimeout("window.history.go(0)",1500);
                                                }else{
                                                    layer.msg('信息修改失败',{icon:2});
                                                }
                                            },
                                            error:function(fail){
                                                if(fail.status == "401"){
                                                    var SESSIONID = sessionStorage.getItem("SESSIONID");
                                                    if(SESSIONID == null){
                                                        that.$route.router.go("/login");
                                                    }else{
                                                        sessionStorage.removeItem("SESSIONID");
                                                        layer.msg('登录失效，请重新登陆！');
                                                        util.login();
                                                    }
                                                }
                                            }
                                        })
                                    }else{
                                        layer.msg("您的验证码输入有误");
                                    }
                                }
                            });
                        }
                    }
                });
            },
            getinfo(){
				var that = this;
                var lay = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']}); 
                var url = config.API_BASE+"/4s/accountmanagement/information";
                var query = {};
					query.uid = config.USERID();
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
	                        layer.close(lay);
	                        that.infolist = response.data;
					        
	                    }else{
	                        layer.close(lay);
	                        console.log(response.desc);
	                    }
					},
					error:function(fail){
						if(fail.status == "401"){
                            var SESSIONID = sessionStorage.getItem("SESSIONID");
                            if(SESSIONID == null){
                                that.$route.router.go("/login");
                            }else{
                                sessionStorage.removeItem("SESSIONID");
                                layer.msg('登录失效，请重新登陆！');
                                util.login();
                            }
                        }
					}
                })
            }
        }
    }
</script>

<style scoped>
    .lost {
        border: 1px solid red!important;
    }
    .orange{
        color: #ee1515;
    }
    .UC_main_r div{
        padding: 45px 80px 0 80px;
        font-size: 16px;
    }
    .UC_main_r div dl{
        margin: 10px 0;
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
        background: url(../../assets/img/pwd-icons-new.png) no-repeat;
        background-position: -102px -47px;
        vertical-align: sub;
    }
    .UC_main_r div dl dd span{
        margin: 0 15px 0 0;
    }
    .UC_main_r div dl dd input[type="text"]{
        padding: 0 5px;
        border: 1px solid #CCCCCC;
        height: 34px;
    }
    .UC_main_r div dl dd input[type="text"]:nth-child(2){
        display: inline-block;
        width: 80px;
    }
    .UC_main_r div dl dd button{
        padding: 5px 60px;
        background: #fa8c35;
        color: #FFF;
        border: none;
        cursor: pointer;
    }
    .UC_main_r div dl dd button.getCode{
        background: #fafafa;
        padding: 5px 30px;
        /*border: 1px solid #ccc;
        color: #666;*/
       	border: 1px solid #ff791f;
        color: #ff791f;
    }
    .show_info dl:last-child{
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
    }
    .fill_in_info{
        padding-top: 15px!important;
    }
    .fill_in_info  dl:last-child{
        padding: 20px 0 40px 0;
    }
</style>
