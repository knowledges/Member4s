<template>
    <div class="wrap"  transition="fade">
        <div class="top-bar">
            <div class="brand-list clearfix">
                <p class="G_fl">主营品牌：<span>{{brand_name}}</span></p>
                <p class="G_fl">副营品牌：<span v-for="list in brandlist">{{list.brand_name}}</span></p>
            </div>
            <div class="details">
                <dl class="brands clearfix">
                    <dt class="G_fl">品牌：</dt>
                    <dd v-for="brand in brands['5']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['9a0f9007392017a2987abc182eaf8d3c']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['14']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['23']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['52']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['61']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['63']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['65']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['66']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['6989']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                    <dd v-for="brand in brands['a96ef568e7641868bfbcda6880f40d43']"><a v-on:click="brandClk(brand,$event)">{{brand.brandName}}</a></dd>
                </dl>

                <dl class="model clearfix">
                    <dt class="G_fl">车型：</dt>
                    <dd v-for="model in screen_carModels"  v-if="screen_carModels.length>0"><a v-on:click="scrModelClk(model,$event)">{{model.carModelName}}</a></dd>
                </dl>

                <div class="style">
                    <dl class="car clearfix">
                        <dt class="G_fl">车款：</dt>
                        <dd v-for="car in screen_car" v-if="screen_car.length>0"><a v-on:click="scrCarClk(car,$event)" class="style-box">{{car.carName}}</a></dd>
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
    export default {
        ready(){
            var that = this;

            /*
            * 筛选条件
            * */
            $.ajax({
                url:config.API_BASE+"/4s/activity/carActivity/"+config.USERID(),
                method:'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                beforeSend:function (request) {
                    request.setRequestHeader("sessionid",config.SESSIONID());
                },
                success:function (response) {
                    if(response.code == 0){
                        var list = response.data;
                        that.brands = list.brand;
                        that.cars = list.car;
                        that.carModels = list.carModel;
                        /*
                        * v-for 遍历完
                        * */
                        that.$nextTick(function () {
                            $(".brands dd").eq(0).find('a').addClass("actived");
                            var one = 0,two=0,tree=0;
                            var brandsKey = 0,carsKey = 0,carModelsKey=0;

                            $.map(that.brands,function (val,key) {
                                if(one <1){
                                    brandsKey = key;
                                    ++one;
                                }
                            });
                            that.brandClk({"brandId":that.brands[brandsKey][0].brandId,"brandName":that.brands[brandsKey][0].brandName},null);
                        })

                    }
                },
                error:function (fail) {
                    if(fail.status == "401"){
                        sessionStorage.removeItem("SESSIONID");
                        layer.msg('登录失效，请重新登陆！');
                        that.$route.router.go("/login");
                    }
                }

            })
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
                    if(fail.status == "401"){
                        sessionStorage.removeItem("SESSIONID");
                        layer.msg('登录失效，请重新登陆！');
                        that.$route.router.go("/login");
                    }
                }
            });
        },
        data(){
            return {
                brands:[],
                cars:[],
                screen_car:[],
                carModels:[],
                screen_carModels:[],
                stats:1,
                judge:true,
                idx:'4',
                explain:"如您对官方价有疑问，请致电400-138-0808。",
//                arr_title:[],
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
            /*分页*/
            getActivityList(cur,car_id){
                var ii = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
               /* var ii = layer.load(1, {
                    shade : [0.5,'#000']
                });*/
                var that = this;
                var query = {};
                    query.pagenum = this.pagesize;
                    query.page = cur;
                    query.car_id = car_id;
                var params = {"query":query};

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
                                    curr:cur||1,
                                    skip: true, //是否开启跳页
                                    skin: '#ff9205;',
                                    groups: 7, //连续显示分页数
                                    first: 1, //将首页显示为数字1,。若不显示，设置false即可
                                    last: Math.ceil(that.count/that.pagesize), //将尾页显示为总页数。若不显示，设置false即可
                                    jump: function(obj, first){
                                        //回调
                                        //得到了当前页，用于向服务端请求对应数据
                                        var curr = obj.curr;
                                        if(!first){
                                            that.getActivityList(curr,car_id);
                                        }
                                    }
                                });

                                that.$nextTick(function () {

                                    $(".laypage_btn").unbind("click").on('click',function(){
                                        if($(".laypage_skip").val()>0 && $(".laypage_skip").val()<=Math.ceil(that.count/that.pagesize)){
                                            that.getActivityList($(".laypage_skip").val(),car_id);
                                        }else{
                                            layer.msg('请输入正确的跳转页码');
                                        }
                                    })

                                })

                            }

                        }
                        layer.close(ii);
                    },
                    error:function (fail) {
                        if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                })


            },
            brandClk(obj,e){
                var brandId = obj.brandId;
                this.screen_carModels = this.carModels[brandId];
                var _index = 0;
                this.$nextTick(function () {
                    this.scrModelClk({"carModelId":this.screen_carModels[0].carModelId,"carModelName":this.screen_carModels[0].carModelName},null);

                    if(e!=null){
                        _index = $(e.target).parent().index()-1;
                    }
                    $(".brands dd").find('a').removeClass("actived");
                    $(".brands dd").eq(_index).find('a').addClass("actived");
                })

            },
            scrModelClk(obj,e){
                var carModelId = obj.carModelId;
                this.screen_car = this.cars[carModelId];
                if(this.screen_car!=undefined){
                    var _index = 0;
                    this.$nextTick(function () {
                        this.scrCarClk({"carId":this.screen_car[0].carId,"carName":this.screen_car[0].carName},null);
                        if(e!=null){
                            _index = $(e.target).parent().index()-1;
                        }
                        $(".model dd").find('a').removeClass("actived");
                        $(".model dd").eq(_index).find('a').addClass("actived");
                    })
                }else{
                    this.$set("screen_car",[]);
                }
            },
            scrCarClk(obj,e){
                var carId = obj.carId ,carName = obj.carName;
                if(carId!=null){
                    var _index = 0;
                    this.$nextTick(function () {
                        if(e!=null){
                            _index = $(e.target).parent().index()-1;
                        }
                        $(".car dd").find('a').removeClass("actived");
                        $(".car dd").eq(_index).find('a').addClass("actived");

                        this.getActivityList(1,carId);
                    });
                }else{
                    $("#page2").empty();
                    this.$set("screen_car",[]);
                    this.$set("arr_items",[]);
                }
            }
        }
    }
</script>
<style>
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
 .details .brands a, .details .model a{
        display:inline-block;
        padding: 0 10px;
        height:24px;
        line-height:24px;
        color:#666;
        border-radius:6px;
        vertical-align: -2px;
        font-size:14px;
        text-align:center;
       text-decoration:none;
        cursor: pointer;
    }
    .top-bar .details .brands a:hover{
        background:#fa8c35;
        color:#fff;
    }
    .top-bar .details .model a:hover{
        background:#fa8c35;
        color:#fff;
    }
    .top-bar .details .model{
        margin:20px auto;
        position:relative;
    }
    .top-bar .details .model i{
        display:inline-block;
        width:12px;
        height:12px;
        margin-right:3px;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUFDQTg1MjI3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUFDQTg1MjE3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGEwM2FjYWYtYWUxNy02NTRhLWE5M2EtYzY1NTRhMTA5N2JiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PutZE7UAAAC+SURBVHjaYviPCxxc9D9F4v/ZLUAmEwNWcG4rw9UDDF/fM0yIBLIZgQrRVRxazDArg0HJiEFcheHocgZ+MQxFEBX//oLYKqYMkmoM2g6oipBVAAETM0PRKgYjbyQ3HVyEriJtJlAFiIlQMTsTXYVdDIQHtu7CDoaeYFwqwCb9+s5wdAWDhg0uFWBFwPAAKuIWYNCyx6oCrOjyHhB9eiODoBRD6XpMFUDAwvDsFoNbJoORF4OmLQMrB9bwBwgwACjfaVYf91T7AAAAAElFTkSuQmCC)no-repeat;
    }
    dl dd{
        display:inline-block;
    }
    .top-bar .details .style{
        margin-bottom:30px;
        position:relative;
    }
    .top-bar .details .style .style-box{
        display:inline-block;
        padding: 0 10px;
        margin: 2px 0;
        height:24px;
        border:1px dashed  #ccc;
        background:#f5f5f5;
        font-size:14px;
        text-align:center;
        line-height:24px;
        border-radius:10px;
        margin-right:10px;
        vertical-align: -2px;
        cursor: pointer;
    }
    .top-bar .details .style .style-box:hover{
        color:#fff;
        background:#fa8c35;
    }
</style>