<template>
    <div class="top-bar">
    <div class="user-notice">
        <p> <i></i>尊敬的购车惠4S店用户，您好！ <span>您当前积分：<b>{{SESSIONID.total_jifen}}</b></span>   <span>等级：<b>{{realGrade}}</b></span>
            <span>本月兑换次数：<b  v-if="surplus > 0">{{surplus}}</b><b v-else>很抱歉！您的本月兑换次数已用完！</b></span><a v-link="{path:'/u/exchange/rule'}">查看兑换规则>></a></p>
    </div>
    <h2>积分礼品 <span>收益积分可直接兑换礼品</span></h2>
    </div>
    <ul class="gift-list">
        <li class="clearfix" v-for="good of dataGoods">
            <div class="gift-left-box G_fl">
                <div class="num_full clearfix">
                    <img :src="good.faceImg">
                    <div class="gift-bottom">
                        <p class="G_fl">积分：<span>{{good.integral}}</span></p>
                        <p class="G_fl">数量：<span>{{good.number}}</span></p>
                    </div>

                </div>
            </div>
            <div class="gift-right-box G_fl">
                <h3>{{good.name}}</h3>
                <p>
                    {{{good.body}}}
                </p>

                <template v-if="surplus > 0">
                    <a v-if="SESSIONID.total_jifen > good.integral" v-link="{path:'/u/exchange/cashing/order/'+ $index}" class="exchange-now">立即兑换</a>
                    <span v-else class="btn-disabled">积分不足</span>
                </template>
                <span v-else class="btn-disabled">兑换次数已用完</span>
            </div>
        </li>
    </ul>
</template>
<style scoped>
    .top-bar{
        width:890px;
        margin:0 auto;
    }
    .user-notice p{
        margin-top:20px;
    }
    .user-notice p span{
        margin-right: 15px;
    }
    .btn-disabled{
        display: block;
        padding: 0 15px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        border-radius: 12px;
        color: #fff;
        background: #ccc;
        position: absolute;
        left: 0;
        bottom: 10px;
    }
    .user-notice i{
        display:inline-block;
        background:url(../../assets/img/icon-notice.png)no-repeat;
        height:16px;
        width:12px;
        vertical-align: -2px;
        margin-right:5px;
        color:#ff6700;
    }
    .user-notice a{
        color:#ff6700;
    }
    h2{
        font-size:14px;
        margin-top:28px;
        margin-bottom:30px;
    }
    h2 span{
        font-size:12px;
        color:#999;
        margin-left:10px;
    }
    .gift-list li{
        border-bottom:1px solid #e6e6e6;
        margin-top:30px;
    }
    .gift-left-box{
        margin-left:20px;
        margin-bottom:30px;
    }
    .num_full{
        background: #f0f0f0;
        width:260px;
    }
    .num_full p{
        width:45%;
        margin-left:10px;
    }
    .gift-right-box{
        margin-left:20px;
        width:564px;
        position:relative;
        height:160px;
    }
    .gift-right-box h3{
        color:#666;
        margin-top:10px;
    }
    .gift-right-box p{
        color:#c6c6c6;
    }
    .gift-right-box .gift-introduce{
        margin:10px auto;
    }
    .gift-right-box .exchange-now{
        display:block;
        width:80px;
        height:24px;
        text-align:center;
        line-height:24px;
        border-radius:12px;
        color:#ff791f;
        border:1px solid #ff791f;
        position:absolute;
        left:0;
        bottom:10px;
    }
    .gift-right-box a:hover{
        background:#ff791f;
        color:#fff;
    }
    .gift-bottom{
        height: 40px;
        line-height: 40px;
    }
</style>
<script >
    import util from './../../util/util'
    import config from '../../config'
    import $ from 'jquery'
    import gf1 from "../../assets/img/gift-1.jpg"
    import gf2 from "../../assets/img/gift-2.jpg"
    import gf3 from "../../assets/img/gift-3.jpg"
    import gf4 from "../../assets/img/gift-4.jpg"
    import gf5 from "../../assets/img/gift-5.jpg"
    import gf6 from "../../assets/img/gift-6.jpg"
    import gf7 from "../../assets/img/gift-7.jpg"
    import gf8 from "../../assets/img/gift-8.jpg"

    export default {
        ready(){
        this.SESSIONID = JSON.parse(sessionStorage.getItem("SESSIONID")) ;
        var that = this;

            that.dataGoods = [
                {
                    "id": "g001",
                    "faceImg": gf1,
                    "integral": 400,
                    "number": "充足",
                    "name": "ZIPPO打火机（1个)",
                    "body": "<p class=\"gift-introduce\">名称：ZIPPO锻纱</p><p class=\"gift-introduce\">工艺：表面镀铬/喷射打磨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产地：美国宾夕法尼亚</p><p class=\"gift-introduce\">外壳：纯铜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内胆：白钢&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尺寸：55*35*12mm  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;火机重量55g</p>"
                },
                {
                    "id": "g002",
                    "faceImg": gf2,
                    "integral": 400,
                    "number": "充足",
                    "name": "500元苏果购物卡（1张）",
                    "body": "<p class=\"gift-introduce\">以收到的商品实物为主。本卡仅限在苏果超市直营店使用。本卡可分次使用，不能充值，不找零，不提取现 金，金额使用完后，由苏果超市回收。本卡不记名、不挂失、遗失不补。购卡时苏果超市已向购卡人开具了发票，使用本卡时不再重复提供发票。 </p>"
                },
                {
                    "id": "g003",
                    "faceImg": gf3,
                    "integral": 400,
                    "number": "充足",
                    "name": "500元大润发超市购物卡（1张）",
                    "body": "<p class=\"gift-introduce\">本卡使用范围以购卡的章程或协议为准。本卡可分次使用，卡内金额用完后，此卡回收。本卡不挂失、不提 取现金、不计息、丢失不补。有效期三年（自发卡之日起）。如过期，可到开卡门店服务台办理延续手续。本卡需妥善保存，请勿接触手机等磁性物质，并保持卡面清洁。持卡人应依据由本公司制定的法律许可范围内的使用规则进行使用。</p>"
                },
                {
                    "id": "g004",
                    "faceImg": gf4,
                    "integral": 400,
                    "number": "充足",
                    "name": "古驰(GUCCI)花之舞香水 75ML（1瓶）",
                    "body": "<p class=\"gift-introduce\">商品名称：古驰(GUCCI)花之舞香水</p><p class=\"gift-introduce\">商品规格：75ML&nbsp;&nbsp;&nbsp;&nbsp;L&nbsp;&nbsp;类型：EDP淡香精L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产地：法国L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包装：正装香水有外盒，有塑封</p><p class=\"gift-introduce\">保质期：5年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;香调：花香调；前调：橘子、牡丹；中调：玫瑰、规划；后调：广藿香、檀香</p>"
                },
                {
                    "id": "g005",
                    "faceImg": gf5,
                    "integral": 2000,
                    "number": "充足",
                    "name": "2000元金鹰商场购物卡（1张）",
                    "body": "<p class=\"gift-introduce\">以收到的商品实物为主。金鹰贵宾积分卡可在全国金鹰连锁店使用。金鹰贵宾积分卡可分次使用，不可兑换 现金。金鹰贵宾积分卡不记名，不挂失，丢失后不予办理补卡，请持卡人妥善保管，新版金鹰贵宾积分卡购物时不再享受VIP积分，新版金鹰贵宾积分卡有效期为三年，过期可至客服中心提供延期服务。</p>"
                },
                {
                    "id": "g006",
                    "faceImg": gf6,
                    "integral": 3800,
                    "number": "充足",
                    "name": "Apple iPad Air 2 金色 64G WLAN版 9.7英寸平板电脑（1台）",
                    "body": "<p class=\"gift-introduce\">【屏幕描述】 高分辨率 Retina 显示屏，多点触摸，采用防油渍防指纹涂层 全层压显示屏 抗反射涂层,264 ppi；【摄像头】iSight摄像头：800万像素自动对焦；FaceTime摄像头：120万像素照片；720p HD高清视频</p>"
                },
                {
                    "id": "g007",
                    "faceImg": gf7,
                    "integral": 6500,
                    "number": "充足",
                    "name": "iphone 6s 16G 金色（1台）",
                    "body": "<p class=\"gift-introduce\">【颜色】玫瑰金色；【网络】2G、3G、4G全网通；【存储】 机身内存16GB ROM(全新状态 可用存储空间 11.2GB)；支持广阔视角的双域像素；郑敏采用防滑油渍防指纹涂层；支持多种语言文字同时显示。</p>"
                },
                {
                    "id": "g008",
                    "faceImg": gf8,
                    "integral": 7000,
                    "number": "充足",
                    "name": "古驰GUCCI女士玫瑰色PVC双G单肩手提包353440 KGDHZ 9777（1个)",
                    "body": "<p class=\"gift-introduce\">Gucci在皮鞋制作上有着自己的见解，每款产品都融汇了悠久的历史和高标准的制作工艺。Gucci做工考究， 整体手工车缝走线，平整均匀，大方优雅同时不失现代美感。独特的风格、优质的材质，贴合剪裁及细密的针脚精致耐用，彰显品牌制作工艺。</p>"
                }
            ];


        var layerLoading = layer.msg('加载中...', {icon: 16,shade : [0.5,'#000']});
        var that = this;
        var url = config.API_BASE+"/4s/score/times/" +config.USERID() ;
        var query = {};
        query.uid = config.USERID();
        var param = { query:query };


        $.ajax({
            url: url,
            type:'POST',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data:{},
            beforeSend:function (request) {
                request.setRequestHeader("sessionid",config.SESSIONID());
            },
            success:function(response){
                layer.close(layerLoading);
                that.surplus = response.data.times;
                that.grade = response.data.grade;
            },
            error:function(fail){
                layer.close(layerLoading);
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


    },
    data(){
        return {
            dataGoods: [],
            SESSIONID: {},
            surplus: 0,
            grade:1
        }
    },
    computed: {
        realGrade() {
            console.log(this.grade);
            if(parseInt(this.grade, 10) === 1){
                return "初级";
            }else if(parseInt(this.grade, 10) === 2){
                return "中级";
            }else if(parseInt(this.grade, 10) === 3){
                return "高级";
            }else{
                return "你是变态，不用再说了！";
            }
        }
    }
    }
</script>
