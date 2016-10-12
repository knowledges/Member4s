<template>
    <div class="wrap"  transition="fade">
        <div class="top-bar">
            <div class="brand-list clearfix">
                <p class="G_fl">主营品牌：<span>{{brand_name}}</span></p>
                <p class="G_fl" v-if="brandlist.length>1">副营品牌：<span v-for="list in brandlist" v-show="list.brand_name != brand_name">{{list.brand_name}}</span></p>
            </div>

            <div class="details movable-car" id="J_GotoPos">
                <dl class="brands clearfix">
                    <dt class="G_fl">品牌：</dt>
                    <dd>
                        <template  v-if="brands.length > 0">
                        <a href="#" v-for="item of brands" @click.prevent = "changeBrandIndex($index, 'Brand')"  :title="item.brandName"  :class="$index == defBrandIndex ? 'actived' : ''">{{item.brandName}}</a>
                        </template>
                        <div v-else class="null">
                            <h1 class="hd"><i class="icon-null"></i>对不起！暂无任何品牌或正在加载中...</h1>
                        </div>
                    </dd>
                </dl>

                <dl class="model clearfix">
                    <dt class="G_fl">车型：</dt>
                    <dd>
                        <template  v-if="carModels.length > 0">
                        <a  href="#" v-for="item in carModels" @click.prevent = "changeCarModelIndex($index, 'CarModel')" :title="item.carModelName"  :class="$index == defCarModelIndex ? 'actived' : ''">{{item.carModelName}}</a>
                        </template>
                        <div v-else class="null">
                            <h1 class="hd"><i class="icon-null"></i>对不起！暂无任何车型或正在加载中...</h1>
                        </div>
                    </dd>
                </dl>
                <div class="style">
                    <dl class="car clearfix">
                        <dt class="G_fl">车款：</dt>
                        <dd>
                            <template  v-if="cars.length > 0">
                                <a href="#" v-for="item in cars" @click.prevent = "changeCarIndex($index, 'Car', !0)" class="style-box" :title="item.carName"   :class="$index == defCarIndex ? 'actived' : ''">{{item.carName}}</a>
                            </template>

                            <div v-else class="null">
                                <h1 class="hd"><i class="icon-null"></i>对不起！您选择的车型暂无任何车款。请重新选择~</h1>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <add-table :stats="stats" :judge="judge" :idx="idx" :explain="explain" :pagesize="pagesize" :arr_items="arr_items"></add-table>
        <div id="page2" style="margin:20px 0;text-align: center;"></div>
    </div>
</template>
<script>
    import AddTable from './../../components/active/AddTable.vue'
    import $ from 'jquery'
    import config from './../../config'
    import util from './../../util/util'
    export default {
        ready(){
            var that = this;

            /*
            * 筛选条件
            * */

            $.ajax({
                url:config.API_BASE+"/4s/activity/carActivity",
                method:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data:JSON.stringify({"query":{"userId":config.USERID()}}),
                beforeSend:function (request) {
                    request.setRequestHeader("sessionid",config.SESSIONID());
                },
                success:function (response) {
                    if(response.code == 0){
                        var carModelIndex = 0, carIndex = 0, carId = 0;
                        that.allCarDb = response.data;

                        var list = that.allCarDb;
                        that.brands = list['brand'];
                        carModelIndex = that.brands[that.defBrandIndex]['brandId'];
                        that.carModels = list['carModel'][carModelIndex];
                        carIndex = that.carModels[that.defCarModelIndex]['carModelId']
                        that.cars = list['car'][carIndex] ? list['car'][carIndex] : [];
                        carId = that.cars[that.defCarIndex]['carId']
                        if(that.cars.length > 0) {
                            carId = that.cars[that.defCarIndex]['carId'];
                            that.getActivityList(that.cur, carId)
                        }
                    }
                },
                error:function (fail) {
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

            /*4S店*/
            $.ajax({
                url:config.API_BASE+"/4s/accountmanagement/information",
                method:"POST",
                contentType: 'application/json; charset=utf-8',
                dataType:"json",
                data:JSON.stringify({"query":{"uid":config.USERID()}}),
                beforeSend:function (request) {
                    request.setRequestHeader("sessionid",config.SESSIONID());
                },
                success:function (response) {
                    var list = response.data;
                    that.brand_name = list.brand_name;
                    that.brandlist = list.brandlist;
                },
                error:function (fail) {
                    /*if(fail.status == "401"){
                        sessionStorage.removeItem("SESSIONID");
                        layer.msg('登录失效，请重新登陆！');
                        that.$route.router.go("/login");
                    }*/
                }
            });
        },
        data(){
            return {
                allCarDb: [],
                brands: [],
                cars:[],
                screen_car:[],
                carModels:[],
                defBrandIndex: 0,
                defCarModelIndex: 0,
                defCarIndex: 0,
                screen_carModels:[],
                stats:1,
                judge:true,
                idx:'4',
                explain:"如您对官方价有疑问，请致电400-138-0808。",
                arr_items:[],
                cur: 1,
                count: 0,
                pagesize:10,
                brand_name:"",
                brandlist:[]
            }
        },
        components:{
            AddTable
        },
        methods:{
            /*
            * 根据车款ID获取汽车列表
            * @method getActivityList
            * @param {Number} cur:当前页码
            * @param {String} car_id:车款的id
            *
            * */
            getActivityList(cur, car_id){
                var ii = layer.msg('数据加载中 ...', {icon: 16,shade : [0.5,'#000'],time:0});
                var that = this;
                var query = {};
                    query.pagenum = this.pagesize;
                    query.page = cur;
                    query.car_id = car_id;
                    query.user_id = config.USERID();
                var params = {"query":query};
                console.log(params);
                $.ajax({
                    url:config.API_BASE+"/4s/activity/list/",
                    method:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            that.count = response.data.count;
                            that.$set("arr_items",response.data.rows);

                            if(response.data.count>that.pagesize){

                                laypage({
                                    cont: document.getElementById('page2'), //容器。值支持id名、原生dom对象，jquery对象,
                                    pages: Math.ceil(that.count/that.pagesize), //总页数
                                    curr:cur || 1,
                                    skip: true, //是否开启跳页
                                    skin: '#ff9205;',
                                    groups: 7, //连续显示分页数
                                    first: 1, //将首页显示为数字1,。若不显示，设置false即可
                                    last: Math.ceil(that.count/that.pagesize), //将尾页显示为总页数。若不显示，设置false即可
                                    position: '#J_GotoPos', // 翻页后，页面滚动至该选择器的位置
                                    jump: function(obj, first){
                                        //回调
                                        //得到了当前页，用于向服务端请求对应数据
                                        var curr = obj.curr;
                                        if(!first){
                                                that.getActivityList(curr, car_id);
                                        }
                                    }
                                });
                            }else{$("#page2").empty();}
                        }
                        layer.close(ii);
                    },
                    error:function (fail) {
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
            /*
             *
             * 联动更新车型、车款、汽车列表数据
             * @method refreshData
             *
             * */
            refreshData(isGetNewDb){
                var carModelIndex = 0, carIndex = 0, carId = 0;
                var list = this.allCarDb;
                this.brands = list['brand'];
                carModelIndex = this.brands[this.defBrandIndex]['brandId'];
                this.carModels = list['carModel'][carModelIndex];
                carIndex = this.carModels[this.defCarModelIndex]['carModelId']
                this.cars = list['car'][carIndex] ? list['car'][carIndex] : [];
                if(this.cars.length > 0){
                    carId = this.cars[this.defCarIndex]['carId'];
                    this.getActivityList(this.cur, carId)
                }else{
                    this.arr_items = [];
                    $("#page2").empty();
                }
            },
            /*
            *
            * 改变品牌下标 & 重置车型和车款下标为0
            * @method changeBrandIndex
            * @param {Number} i:指定下标
            * @param {String} name:类型名称
            *
            * */
            changeBrandIndex(i){
                this.defBrandIndex = i;
                this.defCarModelIndex = 0;
                this.cur = 1;
                this.refreshData();
            },
            /*
             *
             * 改变车型下标 & 重置车款下标为0
             * @method changeCarModelIndex
             * @param {Number} i:指定下标
             * @param {String} name:类型名称
             *
             * */
            changeCarModelIndex(i){
                this.defCarModelIndex = i;
                this.defCarIndex = 0;
                this.cur = 1;
                this.refreshData();
            },
            /*
             *
             * 改变车款下标 & 生成新车款列表
             * @method changeCarModelIndex
             * @param {Number} i:指定下标
             * @param {String} name:类型名称
             *
             * */
            changeCarIndex(i){
                this.defCarIndex = i;
                this.cur = 1;
                this.refreshData();
            }
        }
    }
</script>
<style scoped>
    .null{
        text-align: left;
        color: #fa8c35;
    }
    .null .icon-null {
        width: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 4px;
        background-image: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        background-position: -96px 1px;
        background-size: 230px;
        color: #f5f5f5;
    }
    .movable-car dl{
        overflow: hidden;
        margin-bottom: 10px;
    }
    .movable-car dt{
        float: left;
        line-height: 24px;
    }
    .movable-car dd{
        margin-left: 60px;
    }
    .movable-car dd a{
        display: inline-block;
        width: 100px;
        height: 24px;
        line-height: 24px;
        color: #666;
        border-radius: 3px;
        font-size: 14px;
        text-align: center;
        text-decoration: none;
        margin-right: 10px;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        background: #f5f5f5;
    }
    .movable-car .car a{
        width: 30%;
        /*padding: 0 15px;*/
        border: 1px dashed #ccc;
        margin-right: 3%;
        background: #f5f5f5;
    }
    .movable-car dd a:hover{
        background:#fa8c35;
        text-decoration: none;
        color:#fff;
    }
    .movable-car .car a.actived,.movable-car .car a:hover{
        border: 1px solid #fa8c35;
    }
    .actived{
        background:#fa8c35!important;
        color:#fff!important;
    }
    .wrap{
        width:890px;
        margin:0 auto;
    }
    .top-bar{
        font-size:14px;
        color:#666;
    }
    .top-bar .brand-list p{
        font-weight:bold;
        margin:30px 30px 25px 0;
    }
    .top-bar .brand-list p span{
        margin-right:20px;
    }


</style>
