<template>
    <div class="UC_main_r">
        <div class="show_info">
            <dl class="clearfix">
                <dt>公司名称：</dt>
                <dd>南京天纵奇才</dd>
            </dl>
            <dl class="clearfix">
                <dt>公司地址：</dt>
                <dd>江苏省 南京市 江宁区 汽车4S</dd>
            </dl>
            <dl class="clearfix">
                <dt>主营品牌：</dt>
                <dd>奥迪</dd>
            </dl>
            <dl class="clearfix">
                <dt>副营品牌：</dt>
                <dd><span>一汽大众</span><span>别克</span><span>宝马</span></dd>
            </dl>
            <dl class="clearfix">
                <dt>邀请码：</dt>
                <dd>1530367</dd>
            </dl>
        </div>
        <div class="fill_in_info">
            <dl class="clearfix">
                <dt><em class="orange">*</em>联系人：</dt>
                <dd><input type="text" v-model="user" id="user_"></dd>
                <dd v-if="user_"> <i></i> {{user_msg}} </dd>
            </dl>
            <dl class="clearfix">
                <dt>性别：</dt>
                <dd>
                    <input type="radio" name="gender" value="0">  男
                    <input type="radio" name="gender" value="1">  女
                    <input type="radio" name="gender" value="2">  保密
                </dd>
            </dl>
            <dl class="clearfix">
                <dt><em class="orange">*</em>手机：</dt>
                <dd>
                    <input type="text" v-model="phone" id="phone_">
                    <input type="text" v-model="code">
                    <button class="getCode" v-on:click="getCode">获取验证码</button>
                </dd>
                <dd v-if="phone_">
                    <i></i> {{phone_msg}}
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>固话：</dt>
                <dd>
                    <input type="text" v-model="telephone" placeholder="025-">
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>邮箱：</dt>
                <dd>
                    <input type="text" v-model="email">
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button v-on:click="save">保存</button> <span><em class="orange">*</em>为必填项</span>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default{
        data(){
            return{
                user:'',
                phone:'',
                code:'',
                telephone:'',
                email:'',
                user_:false,
                user_msg:"",
                phone_:false,
                phone_msg:"",

            }
        },
        methods:{
            save(){
                if(this.user ==""){
                    this.user_msg="联系人不能为空";
                    this.user_ = true;
                    $("#user_").addClass('lost');
                }else if(!/^[\u4e00-\u9fa5\w\d@\.\-_]{3,10}$/i.test(this.user)){
                    this.user_msg="联系人格式不正确"
                    this.user_ = true;
                    $("#user_").addClass('lost');
                }else{
                    this.user_msg="";
                    this.user_ = false;
                    $("#user_").removeClass('lost');
                }

                if(this.phone==""){
                    this.phone_msg = "手机号不能为空";
                    this.phone_ = true;
                    $("#phone_").addClass('lost');
                }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.phone))){
                    this.phone_msg = "手机号格式不正确";
                    this.phone_ = true;
                    $("#phone_").addClass('lost');
                }else{
                    this.phone_msg = "";
                    this.phone_ = false;
                    $("#phone_").removeClass('lost');
                }

                if(this.code == ""){
                    layer.msg("验证码不能为空");
                }
            },
            getCode(){
                debugger;
                var seed = 60,_timer = null;
                $(".getCode").attr("disabled",true);
                function tips() {
                    if(seed<=0){
                        $(".getCode").html("获取验证码");
                        seed = 60;
                        clearInterval(_timer);
                        $(".getCode").attr("disabled",false);
                        return ;
                    }
                    seed -- ;
                    $(".getCode").html(seed+"S&nbsp;&nbsp;后重试");
                }
                _timer = setInterval(tips,1001);

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
        background: url('/img/pwd-icons-new.png') no-repeat;
        background-position: -102px -47px;
        vertical-align: sub;
    }
    .UC_main_r div dl dd span{
        margin: 0 10px;
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
    .getCode{
        background: #fafafa!important;
        border: 1px solid #ccc!important;;
        padding: 5px 30px!important;
        color: #666!important;
    }
    .getCode:hover{
        border: 1px solid #ff791f!important;;
        color: #ff791f!important;
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