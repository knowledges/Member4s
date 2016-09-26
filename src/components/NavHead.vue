<template>
    <div class="RL_header">
        <div class="RL_header_nav">
            <div class="main_container clearfix">
                <ul class="RL_home">
                    <li><i class="icon-new-uc icon-return"></i><a href="http://www.gouchehui.com/">返回购车惠首页</a></li>
                </ul>
                <ul class="RL_header_nav_ul">
                    <li><a href="http://www.gouchehui.com/index.php/guide/process" target="_brank">购车流程</a></li>
                    <!--<li class="RL_header_nav_ul_li"></li>-->
                    <!--<li>-->
                        <!--<a href="">手机客户端</a>-->
                    <!--</li>-->
                    <!--<li class="RL_header_nav_ul_li"></li>-->
                    <!--<li>-->
                        <!--<a id ="wechatText">关注购车惠</a>-->
                        <!--<div id = "wechatImg">-->
                            <!--<img src="http://www.gouchehui.com/Public/Home/images/wechat_servse.png"/>-->
                        <!--</div>-->
                    <!--</li>-->
                    <li class="RL_header_nav_ul_li"></li>
                    <li><a href="http://www.gouchehui.com/member.php/member_general/n_uc_myorder.html">我的订单</a></li>

                    <li class="RL_header_nav_ul_li"></li>
                    <li><a v-if="!isLogin" v-on:click="registered">注册</a></li>
                    <li><a v-if="isLogin" v-on:click="logout" style="cursor: pointer;">退出</a></li>
                    <li><a v-if="isLogin">{{username}}</a></li>
                    <li><a v-if="!isLogin" v-link="{path:'/login'}">登录</a></li>
                </ul>
            </div>
        </div>
        <div class="main_container clearfix">
            <h1 class="RL_logo">
                <a href="http://www.gouchehui.com" title="购车惠">
                    <img src="http://www.gouchehui.com/Public/Home/images/logo_145X75.png" alt="购车惠">
                </a>
            </h1>
            <h2 class="RL_ftitle G_fl G_f22">
                4S店会员
            </h2>
            <!--调用Php接口 搜索有多少车-->
            <form action="http:\\/\\/www.gouchehui.com/index.php/car/product_search" class="gchSearch_form" method="GET">
                <div class="RL_search G_fr">
                    <div class="RL_search_div clear">
                        <div class="RL_search_input">
                            <label for="mq" style="visibility: visible; display: none;">搜索 买车</label>
                            <input type="text" name="select"  id="mq" class="s-combobox-input G_Tahoma" value="" aria-label="请输入搜索文字" placeholder="输入品牌或车型" onfocus=" if (value == '') {value = '';}this.style.color = '#333';" onblur=" if (value == '') {value = '';this.style.color = '#999';} ">
                        </div>
                        <button type="submit">搜索<s></s></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import config from './../config'
    import $ from 'jquery'
    export default {
        route:{
            data({to,next}){
            }
        },
        ready(){
            var session = JSON.parse(sessionStorage.getItem("SESSIONID"));
            if(session != null){
                this.isLogin = true;
                this.username = session.user_name;
            }
        },
        data(){
            return {
                isLogin:false,
                username:""
            }
        },
        methods:{
            registered(){

            },
            logout(){
                var that  = this;
                $.ajax({
                    url:config.API_BASE+"/login/auth/4s/logOut",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            sessionStorage.removeItem("SESSIONID");
                            that.$route.router.go("/login");
                        }
                    },
                    error:function (fail) {
                        if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                });
            }
//            ,
//            searchBtn(){
//                var that  = this;
//                $.ajax({
//                    url:"http://www.gouchehui.com/index.php/car/product_search?select=q5",
//                    method:"get",
//                    contentType: 'application/json; charset=utf-8',
//                    dataType:"json",
//                    beforeSend:function (request) {
//                        request.setRequestHeader("sessionid",config.SESSIONID());
//                    },
//                    success:function (response) {
//                        alert("success");
////                        if(response.code == 0){
////                            sessionStorage.removeItem("SESSIONID");
////                            that.$route.router.go("/login");
////                        }
//                    },
//                    error:function (fail) {
//                        alert("error");
//                        console.log(fail);
////                        if(fail.status == "401"){
////                            sessionStorage.removeItem("SESSIONID");
////                            layer.msg('登录失效，请重新登陆！');
////                            that.$route.router.go("/login");
////                        }
//                    }
//                });
//
//            }
        }
    }
</script>
<style>
  #wechatImg{
      position: absolute;
      z-index: 9;
      top: 25px;
      background: #fff;
      display: none;
  }

    #wechatText:hover ~ div#wechatImg{
        display: block;
    }
</style>
