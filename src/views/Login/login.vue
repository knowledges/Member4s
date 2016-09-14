<template>
       <!--login header-->
       <div class="header">
           <h1 class="RL_logo G_fl">
               <a href="/index.php/Index/index.html" title="购车惠"><img src="http://www.gouchehui.com/Public/Home/images/logo_145X75.png" alt="购车惠"></a>
           </h1>
           <div class="RL_returnHome G_fr">
               <a href="/index.php/Index/index.html" title="返回购车惠首页" class="G_f14">返回购车惠首页</a>
           </div>
       </div>

       <!--login content-->
       <div class="content">
           <div class="login-newbg" style="background-image: url(http://www.gouchehui.com/Public/Home/images/login_bg.png);"></div>
           <div class="login-adlink">
               <a href="" title=""></a>
           </div>
           <div class="login-layout">
               <div class="login-con">
                   <div class="login-box">
                       <div class="login-form">
                           <div class="login-title"><a href="#" title="立即注册>>" class="G_f14">立即注册&gt;&gt;</a>账户登录
                           </div>
                           <!--错误信息提示-->
                           <div id="J_Message">
                               <!--<div class="login-msg">
                                   <i class="login-icon G_fl"></i>
                                   <p class="error G_f12">密码错误</p>
                               </div>-->
                           </div>
                           <div class="item item-fore1">
                               <label for="J_logname" class="login-label name-label"></label>
                               <input id="J_logname" type="text" class="itxt" name="user_name" v-model="username" tabindex="1"
                                      autocomplete="off" placeholder="手机号">
                               <span class="clear-btn"></span>
                           </div>
                           <div class="item item-fore2">
                               <label class="login-label pwd-label" for="J_logpwd"></label>
                               <input type="password" id="J_logpwd" name="password" class="itxt itxt-error" v-model="password" tabindex="2"
                                      autocomplete="off" placeholder="密码">
                               <span class="clear-btn"></span>
                           </div>
                           <div class="item item-fore3">
                               <ul>
                                   <li>
                                       <input name="role" type="radio" checked="checked" value="1" id="J_role1">
                                       <label for="J_role1">个人</label>
                                   </li>
                                   <li>
                                       <input name="role" type="radio" value="2" id="J_role2">
                                       <label for="J_role2">4S店</label>
                                   </li>
                                   <li>
                                       <input name="role" type="radio" value="3" id="J_role3">
                                       <label for="J_role3">经销商</label>
                                   </li>
                                   <li>
                                       <input name="role" type="radio" value="4" id="J_role4">
                                       <label for="J_role4">商家</label>
                                   </li>
                               </ul>
                           </div>
                           <div class="item item-fore4">
                               <div class="autolog">
                            <span>
                                <input id="autologin" name="autologin" type="checkbox" class="autologin"
                                       checked="checked">
                                <label for="autologin">自动登录</label>
                            </span>
                                <span class="forget-pw">
                                <a href="/member.php/Public/findpw_verification.html" target="_blank">忘记密码</a>
                            </span>
                               </div>
                           </div>
                           <div class="item item-fore5">
                               <button type="submit" class="login-btn G_f18" tabindex="5" v-on:click="loginClk">登 录</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       <!--login footer-->
       <div class="footer">
           <ul class="G_f14">
               <li><a href="/index.php/Guide/process" title="购车指南">购车指南</a><b>|</b></li>
               <li><a href="/index.php/Guide/problem_price" title="常见问题">常见问题</a><b>|</b></li>
               <li><a href="/index.php/Guide/introduce" title="公司简介">公司简介</a><b>|</b></li>
               <li><a href="/index.php/Guide/contact" title="商务合作">商务合作</a><b>|</b></li>
               <li><a href="/index.php/Guide/contact" title="客服电话">客服电话</a><b>|</b></li>
               <li><a href="/index.php/Guide/feedback" title="在线反馈">在线反馈</a></li>
           </ul>
           <p>CopyRight @2015-2016 gouchehui.com All rights reserved 版权所有南京易橙汇网络科技有限公司</p>
           <p>备案号:苏ICP备13031090号-3</p>
       </div>
</template>

<script>

    import $ from 'jquery'
    import config from './../../config'
    export default {
        route:{
        },
        ready(){
        },
        data(){
            return {
                username:"baomagouchehui",
                password:"123456"
            }
        },
        methods:{
            loginClk(){
                var that = this;
                var ii = layer.load();
                console.log("成功："+config.API_BASE);
                var url = config.API_BASE+"/login/auth/4s/web";
//                var url = " http://192.168.13.111/YchLrestServer/api/login/auth/4s/web";
                var param = {};
                param.username = that.username;
                param.password = that.password;

                if(param.username == ""){
                    layer.msg('手机号不能为空');
                    layer.close(ii);
                    return;
                }
                if(param.password == ""){
                    layer.msg('密码不能为空');
                    layer.close(ii);
                    return;
                }
                $.ajax({
                    url:url,
                    method:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify(param)
                }).then(function (response) {
                    if(response.code == 0){
                        layer.close(ii);
                        sessionStorage.setItem("SESSIONID",JSON.stringify(response.data));
                        config.SESSIONID  = response.data.session.sessionid;
                        config.USERID = response.data.id;
                        layer.msg('登录成功！');
                        that.$route.router.go("/u");
                    }else if (response.code == -1){
                        layer.close(ii);
                        layer.msg(response.desc);
                    }
                });
            }
        }
    }
</script>
<style>
    @import '/css/app.css';
    @import '/css/login.css';
    [v-cloak] {
        display: none;
    }
</style>