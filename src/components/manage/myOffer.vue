<template>
    <div class="top-bar">
        <div class="brand-list clearfix">
            <p class="G_fl">主营品牌：<span>{{brand_name}}</span></p>
            <p class="G_fl">副营品牌：<span v-for="list in brandlist" v-if="$index>0">{{list.brand_name}}</span></p>
        </div>
        <div class="details">
            <dl class="brands clearfix">
                <dt class="G_fl">品牌：</dt>
                <dd v-for="brand in brands"><a v-on:click="brandClk(brand,$event)" brandId="{{brand.brandId}}">{{brand.brandName}}</a></dd>
            </dl>

            <dl class="model clearfix">
                <dt class="G_fl">车型：</dt>
                <dd v-for="model in screen_carModels" v-if="screen_carModels.length>0">
                    <a v-on:click="scrModelClk(model,$event)" carModelId="{{model.carModelId}}">{{model.carModelName}}</a>
                </dd>
                <dd>
                    <span v-on:click="eaitModels" class="eait"> <i></i> 编辑车型</span>
                </dd>
            </dl>

            <div class="style">
                <dl class="car clearfix">
                    <dt class="G_fl">车款：</dt>
                    <dd v-for="car in screen_car" v-if="screen_car.length>0"><a v-on:click="scrCarClk(car,$event)" class="style-box">{{car.carName}}</a></dd>
                    <dd><span v-on:click="eaitCars" class="eait"> <i></i> 编辑车款</span></dd>
                </dl>
            </div>
        </div>
    </div>

    <div class="eaitCarsModelsByBrand" style="display: none;">
        <div class="layer_2">
            <dl class="clearfix">
                <dt>已选车型：</dt>
                <dd style="display: inline-block;width: 500px;height: 100%;min-height:44px;border-bottom:1px solid #ccc;">
                    <ul class="filter_carModel">
                        <li class="selected" v-for="item in findCarModelByBrand | filterBy 'true' in 'selected'" carModelId="{{item.carModelId}}" track-by="$index">{{item.carModelName}}<i v-on:click="removeCarModel(item)"></i></li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>全部车型：</dt>
                <dd style="width: 500px;height: 100%;" class="city_dd">
                    <ul>
                        <li v-for="item in findCarModelByBrand" v-on:click="carModelClk(item,$index)" class="city_li" :class="{'selected':item.selected==true}">
                            {{item.carModelName}}
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button v-on:click="eaitCarModelAgree">确定</button>
                    <button v-on:click="eaitCarModelCancle">取消</button>
                </dd>
            </dl>
        </div>
    </div>

    <div class="eaitCarsModels" style="display: none;">
        <div class="layer_2">
            <dl class="clearfix">
                <dt>已选车款：</dt>
                <dd style="display: inline-block;width: 500px;height: 100%;min-height:44px;border-bottom:1px solid #ccc;">
                    <ul class="filter_car">
                        <li class="selected" v-for="item in findCarByCarModel | filterBy 'true' in 'selected'" track-by="$index" carId="{{item.carId}}">{{item.carName}}<i v-on:click="removeCar(item)"></i></li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>全部车款：</dt>
                <dd style="width: 500px;height: 100%;" class="city_dd">
                    <ul>
                        <li v-for="item in findCarByCarModel" v-on:click="carClk(item,$index)" class="city_li" :class="{'selected':item.selected==true}"  carId="{{item.carId}}">
                            {{item.carName}}
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button v-on:click="eaitCarAgree">确定</button>
                    <button v-on:click="eaitCarCancle">取消</button>
                </dd>
            </dl>
        </div>
    </div>

    <offer-table :provinces="provinces" :provincecity="provincecity" :clone_provincecity="clone_provincecity" :arr_items="arr_items" :count="count"></offer-table>
    <div id="page2" style="margin:20px 0;text-align: center;"></div>

</template>
<script>
    import $ from 'jquery'
    import config from './../../config'
    import OfferTable from './OfferTable.vue'
    export default {
        route:{
            data({to}){
                var that = this;
                /*品牌*/
                $.ajax({
                    url:config.API_BASE+"/4s/prefer/preferBrandModelCar/"+config.USERID(),
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

                                that.brandClk({"brandId":that.brands[0].brandId,"brandName":that.brands[0].brandName},null);
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

                });

                /*主营、副营品牌*/
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

            }
        },
        data(){
            return{
                brands: [],
                cars:[],
                screen_car:[],
                carModels:[],
                screen_carModels:[],
                brand_name:"",
                brandlist:[],
                cur: 1,
                count: 0,
                pagesize:10,
                findCarModelByBrand:[],
                mask_eaitModelsBrand:"",
                findCarByCarModel:[],
                mask_eaitModels:"",
                provinces:[],
                provincecity:[],
                clone_provincecity:[],
                arr_items:[]

            }
        },
        components:{
            OfferTable
        },
        methods:{
            eaitModels(){
                var that = this;
                var brandId = $(".brands dd a.actived").attr("brandId");

                $.ajax({
                    url:config.API_BASE+"/4s/prefer/findCarModelByBrand/"+brandId,
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        that.$set("findCarModelByBrand",response.data)
                    },
                    error:function (fail) {
                        if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                });

                this.mask_eaitModelsBrand = layer.open({
                    type: 1,
                    title: '编辑车型',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['650px' , '600px'],
                    content: $(".eaitCarsModelsByBrand")
                });

            },
            carModelClk(obj,idx){

                if(obj.selected == undefined || obj.selected == "undefined"){
                    obj.selected = true;
                    this.findCarModelByBrand.$set(idx,{"carModelId":obj.carModelId,"carModelName":obj.carModelName,selected:true});
                }
            },
            removeCarModel(obj){
                obj.selected = "undefined";
            },
            eaitCars(){
                var that = this;
                var carModelId = $(".model dd a.actived").attr("carModelId");

                $.ajax({
                    url:config.API_BASE+"/4s/prefer/findCarByCarModel/"+carModelId,
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        that.$set("findCarByCarModel",response.data)
                    },
                    error:function (fail) {
                        if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                });

                this.mask_eaitModels= layer.open({
                    type: 1,
                    title: '编辑车型',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['650px' , '600px'],
                    content: $(".eaitCarsModels")
                });
            },
            carClk(obj,idx){
                if(obj.selected == undefined || obj.selected == "undefined"){
                    obj.selected = true;
                    this.findCarByCarModel.$set(idx,{"carId":obj.carId,"carName":obj.carName,selected:true});
                }
            },
            removeCar(obj){
                obj.selected = "undefined";
            },
            eaitCarModelAgree(){
                var list = $(".filter_carModel li");
                var  carModels = [];
                for(var i = 0 ; i< list.length;i++){
                    var obj = {};
                        obj.carModelId = list.eq(i).attr("carModelId");
                        obj.carModelName = list.eq(i).text();
                    carModels.push(obj);
                }
                console.log(carModels);

                var that = this;
                var brandId = $(".brands dd a.actived").attr("brandId");

                var query = {};
                    query.brandId = brandId;
                    query.userId = config.USERID();
                    query.carModels = carModels;
                var params = {"query":query};

                $.ajax({
                    url:config.API_BASE+"/4s/prefer/updateCarModelPrefer",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            layer.msg("编辑车型成功！");
                            setTimeout(function () {
                                window.history.go(0);
                            },1000);

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

            },
            eaitCarModelCancle(){
                layer.close(this.mask_eaitModelsBrand);
            },
            eaitCarAgree(){
                var list = $(".filter_car li");
                var  cars = [];
                for(var i = 0 ; i< list.length;i++){
                    var obj = {};
                    debugger;
                    obj.carId = list.eq(i).attr("carId");
                    obj.carName = list.eq(i).text();
                    cars.push(obj);
                }

                var that = this;
                var carModelId = $(".model dd a.actived").attr("carModelId");

                var query = {};
                query.carModelId = carModelId;
                query.userId = config.USERID();
                query.cars = cars;
                var params = {"query":query};

                $.ajax({
                    url:config.API_BASE+"/4s/prefer/updateCarPrefer",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            layer.msg("编辑车款成功！");
                            setTimeout(function () {
//                                window.location.hash;
//                                that.$router.go("/u/manage/myOffer/find/0");
                                window.history.go(0);
                            },1000);
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

            },
            eaitCarCancle(){
                layer.close(this.mask_eaitModels);
            },
            /*分页*/
            getActivityList(cur,car_id){
                var ii = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
                var that = this;
                var query = {};
                query.pagenum = this.pagesize;
                query.page = cur;
//                query.carId = 2956;
//                query.userId = 186;
                query.carId = car_id;
                query.userId = config.USERID();
                var params = {"query":query};

                $.ajax({
                    url:config.API_BASE+"/4s/offer/findMyOfferlist",
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

                                        $(".laypage_btn").unbind("click").on('click',function(){
                                            if($(".laypage_skip").val()>0 && $(".laypage_skip").val()<=Math.ceil(that.count/that.pagesize)){
                                                that.getActivityList($(".laypage_skip").val(),car_id);
                                            }else{
                                                layer.msg('请输入正确的跳转页码');
                                            }
                                        })
                                    }
                                });

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
                    if(this.screen_carModels!=null){
                        this.scrModelClk({"carModelId":this.screen_carModels[0].carModelId,"carModelName":this.screen_carModels[0].carModelName},null);
                    }else{
                        this.$set("screen_car",[]);
                        this.$set("arr_items",[]);
                    }
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
                var _index = 0;
                if(carModelId != null){
                    this.$nextTick(function () {
                        if(this.screen_car!=undefined){
                            this.scrCarClk({"carId":this.screen_car[0].carId,"carName":this.screen_car[0].carName},null);
                        }else{
                            $("#page2").empty();
                            this.$set("screen_car",[]);
                            this.$set("arr_items",[]);
                        }
                        if(e!=null){
                            _index = $(e.target).parent().index()-1;
                        }
                        $(".model dd").find('a').removeClass("actived");
                        $(".model dd").eq(_index).find('a').addClass("actived");
                    })
                }else{
                    $("#page2").empty();
                    this.$set("screen_car",[]);
                    this.$set("arr_items",[]);
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
            },
            selectarea(obj){
                /*把选择对象放到零时变量中*/
                this.mask_1 = layer.open({
                    type: 1,
                    title: '选择区域',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['650px' , '600px'],
                    content: $(".activearea")
                });

//                this.getSaleAreaByArray(obj);
            },

            cancle1(){
                layer.close(this.mask_1);
            },
            cancle2(){
                layer.close(this.mask_3);
            },
        }
    }
</script>

<style scoped>
    .error{
        color: red;
    }
    .selected{
        color: #fa8c35!important;
        border: 2px solid #fa8c35!important;;
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
        width:890px;
        margin:0 auto;
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
    .eait{
        color: #fb8c33;
        cursor: pointer;
    }
    .eait:hover{
        color: #fe5a05;
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
    .top-bar .details .style i{
        display:inline-block;
        width:12px;
        height:12px;
        margin-right:3px;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUM2QTMxNzk3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUM2QTMxNzg3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGEwM2FjYWYtYWUxNy02NTRhLWE5M2EtYzY1NTRhMTA5N2JiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsOHs3AAAAC1SURBVHjaYvz//z8DIcCES+Lf1S2/pzr/u3sYpyKg3P9HZxh+fP67uQLIZsS0DmjG350tjBJajAIy/67vYOASQlcEUcHw/x+QzSipwygoxyhnwoRLBRD8f3GNUc2ZSduHBaHiyua/u1rhKhgYmZjda5mUbREOx65C2xsRBP/vH8WjAqzoz0+gFxhlDHGpACkChse/6zsZOXgZZY2xqgAp+vfwBMhNtw8w8oiyBPVjqgACgAADABfIYX8VdYt8AAAAAElFTkSuQmCC) no-repeat;
    }

    table input[type="text"],table input[type="number"]{
        display: inline-block;
        width: 80%;
        text-align: center;
    }
    table a.selected{
        display: inline-block;
        padding: 2px 8px;
        color: #FFF;
        broder:1px solid #fe791e;
        color: #fe791e;
        background: #ffe4d2;
        cursor: pointer;
    }

    table a.save{
        display: inline-block;
        padding: 2px 8px;
        color: #FFF;
        border: none;
        background: #f98c37;
        cursor: pointer;
    }
    table a.save:hover{
        border: none;
        background: #f26108;
    }
    table a.cancle{
        margin-top: 5px;
        display: inline-block;
        padding: 2px 8px;
        color: #FFF;
        border: none;
        background: #cccccc;
        cursor: pointer;
    }
    table a.cancle:hover{
        border: none;
        background: #999999;
    }

    table p i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('/img/pwd-icons-new.png') no-repeat;
        background-position: -102px -47px;
        vertical-align: sub;
    }

    .order-nodata h4{
        color: #4c4c4c;
        font-size: 18px;
        line-height: 46px;
    }
    .order-nodata p a{
        color: #2194fe;
    }
    .order-nodata .order-nobg{
        width: 30px;
        height: 30px;
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        margin-right: 8px;
        background-image: url(/assets/img/ico_warn.png);
        background-repeat: no-repeat;
        background-position: -82px 4px;
        background-size: 300px 150px;
    }

    div dl {
        margin: 10px 0;
    }

    div dl dt, div dl dd {
        float: left;
        height: 35px;
        line-height: 35px;
    }
    div.add dl dt:nth-child(n+2){
        margin-left: 60px;
    }

    div.layer_2  dl dt {
        display: inline-block;
        width: 80px;
        text-align: right;
    }

    div dl dd {
        margin-left: 2px;
        text-align: left;
    }

    div dl dd i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('/img/pwd-icons-new.png') no-repeat;
        background-position: -102px -47px;
        vertical-align: sub;
    }
    div dl dd em{
        position: absolute;
        right: 8px;
        top: 0;
        color: #999;
    }
    div dl dd span {
        margin: 0 10px;
    }
    div dl dd ul li {
        float: left;
        margin: 0 10px;
    }
    div dl dd input[type="text"] ,div dl dd input[type="number"]{
        padding: 0 5px;
        border: 1px solid #CCCCCC;
        height: 34px;
    }
    div dl dd input[type="file"]{
        position: absolute;
        left: 0;
        width: 85px;
        height: 35px;
        z-index: 2;
        opacity: 0;
    }
    div dl dd button {
        padding: 5px 60px;
        margin: 20px 15px;
        font-size: 16px;
        background: #fa8c35;
        color: #FFF;
        border: none;
        cursor: pointer;
    }
    div dl dd button:hover{

    }
    div dl dd button:last-child{
        background: #ccc;
    }
    div dl dd button:last-child:hover{
        background: #666;
    }
    .layer_2 ul li {
        margin:5px 10px!important;
        position: relative;
        border: 2px solid #ccc;
        background:#FFF;
        color: #ccc;
        display: inline-block;
        padding: 0 10px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
    .layer_2 ul li i{
        position: absolute;
        right: -10px;
        top:-10px;
        background: url('/img/close_1.png') no-repeat;
        background-position: 0 0!important;
    }
    .city_dd li{
        margin: 10px;
    }
    option{
        text-align: center;
    }
</style>