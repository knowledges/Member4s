<template>
    <div class="uc_leftmod_myinfo">
        <div class="Skin_bg">
            <div class="uc_person_info">
                <div class="facePic">
                    <div class="productImg">
                        <a v-link="{path:'/u/accout/head'}" style="display: inline-block; height: 120px;width: 120px;">
                            <img v-bind:src="head_url" style="display: inline-block; height: 100%;">
                        </a>
                    </div>
                </div>
                <div class="GB_innerwrap">
                    <div class="nameBox">
                        <span class="name"
                              v-if="SESSIONID!=null&&SESSIONID.user_name!=null">{{SESSIONID.user_name}}</span><span
                            class="lv"><i>{{realGrade}}</i></span>
                    </div>
                    <div class="G_tc jifen">
                        <!-- <a href="javascript:;;">车币<span class="s">{{SESSIONID.nick!=""?SESSIONID.nick:0}}</span>个</a>-->
                        <a v-link="{path:'/u/exchange/cashing'}">积分<span class="s" v-if="SESSIONID!=null">{{SESSIONID.total_jifen}}</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        ready(){
            this.init();
        },
        data(){
            return {
                SESSIONID: {},
                head_url: ""
            }
        },
        computed: {
            realGrade(){
                this.SESSIONID = JSON.parse(sessionStorage.getItem("SESSIONID"));
                if (this.SESSIONID != null) {
                    var grade = this.SESSIONID.total_jifen;

                    if (grade < 5000) {
                        return "初";
                    } else if (grade <= 10000) {
                        return "中";
                    } else if (grade > 10000) {
                        return "高";
                    } else {
                        return "无";
                    }
                }
            }
        },
        methods: {
            init(){
                this.SESSIONID = JSON.parse(sessionStorage.getItem("SESSIONID"));
                if (this.SESSIONID != null) {
                    if (this.SESSIONID.head_url == "" || this.SESSIONID.head_url == null || this.SESSIONID.head_url == undefined) {
                        this.head_url = "/member4s/assets/img/default.png";
                    } else {
                        this.head_url = this.SESSIONID.head_url
                    }
                } else {
                    this.head_url = "/member4s/assets/img/default.png";
                }
            }
        }
    }
</script>


<style scoped>
    .uc_leftmod_myinfo {
        margin-bottom: 20px;
    }

    .Skin_bg {
        background-color: #fafafa;
        margin-top: 35px;
    }

    .uc_person_info {
        height: 220px;
        overflow: hidden;
    }

    .facePic {
        position: relative;
        display: table;
        table-layout: fixed;
        width: 120px;
        height: 120px;
        padding: 0;
        margin: 10px auto;
        _display: inline;
        _zoom: 1;
        vertical-align: middle;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
    }

    .productImg, .uc_person_info .facePic img {
        max-width: 100%;
        _width: expression(function(el){if(/msie 6/i.test(navigator.userAgent)){var threshold=100*el.parentNode.clientWidth/100;el.style.width=(threshold==0||el.clientWidth>threshold)?threshold||'100%':'auto';}}(this));
        max-height: 120px;
        _height: expression(function(el){if(/msie 6/i.test(navigator.userAgent))el.style.height=(el.scrollHeight>120px)?'120px':'auto';}(this));
        vertical-align: middle;
    }

    .productImg {
        display: table-cell;
        width: 100%;
        _height: 100% !important;
        _font-size: 0;
        text-align: center;
        vertical-align: middle;
        _overflow: hidden;
    }

    .uc_container a {
        color: #666;
        text-decoration: none;
    }

    .GB_innerwrap {
        padding: 15px;
    }

    .nameBox {
        line-height: 30px;
        height: 20px;
        padding-top: 5px;
        margin-bottom: 20px;
        text-align: center;
    }

    .uc_person_info .nameBox .name {
        max-width: 230px;
        _width: 230px;
        display: inline-block;
        overflow: hidden;
        font-size: 20px;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
    }

    .uc_person_info .lv {
        display: inline-block;
        margin-left: 10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #ff791f;
        color: #fff;
        border-radius: 1px;
        vertical-align: middle;
        border-radius: 4px;
    }

    .uc_person_info .lv i {
        font-style: normal;
    }

    .uc_person_info .jifen {
        color: #999;
    }

    .uc_person_info .jifen a {
        margin: 0 8px;
    }

    .uc_person_info .jifen .s {
        color: #fa8c35;
        margin: 0 2px;
    }

    .G_tc {
        text-align: center;
    }
</style>
