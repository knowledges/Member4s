<template>
    <div class="RL_header">
        <div class="RL_header_nav">
            <div class="main_container clearfix">
                <ul class="RL_home">
                    <li><i class="icon-new-uc icon-return"></i><a href="">返回购车惠首页</a></li>
                </ul>
                <ul class="RL_header_nav_ul">
                    <li><a href="">电话</a></li>
                    <li class="RL_header_nav_ul_li"></li>
                    <li><a href="">手机客户端</a></li>
                    <li class="RL_header_nav_ul_li"></li>
                    <li><a href="">关注购车惠</a></li>
                    <li class="RL_header_nav_ul_li"></li>
                    <li><a href="">我的订单</a></li>
                    <li class="RL_header_nav_ul_li"></li>
                    <li><a href="">注册</a></li>
                    <li><a v-link="{path:'/login'}">登录</a></li>
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
            <div class="RL_search G_fr">
                <div class="RL_search_div clear">
                    <div class="RL_search_input">
                        <input type="text" placeholder="输入品牌或车型">
                    </div>
                    <button>搜索</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        route:{
            data({to,next}){
            }
        },
        ready(){},
        data(){
            return {}
        },
        methods:{}
    }
</script>