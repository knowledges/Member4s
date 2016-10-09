<template>
    <div class="top-bar">
        <div class="brand-list clearfix">
            <p class="G_fl">主营品牌：<span>{{brand_name}}</span></p>
            <!--<p class="G_fl">副营品牌：<span v-for="list in brandlist">{{list.brand_name}}</span></p>-->
            <p class="G_fl" v-if="brandlist.length>1">副营品牌：<span v-for="list in brandlist" v-show="list.brand_name != brand_name">{{list.brand_name}}</span></p>
        </div>
        <div class="details">
            <dl class="brands clearfix">
                <dt class="G_fl">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</dt>
                <div class="detailsCon">
                	<dd v-for="brand in brands"><a v-on:click="brandClk(brand,$event)" brandId="{{brand.brandId}}" class="style-box brandslink" title="{{brand.brandName}}">{{brand.brandName}}<b></b></a></dd>
                </div>
            </dl>

            <dl class="model clearfix">
                <dt class="G_fl">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
                <div class="detailsCon">
                <dd v-for="model in screen_carModels">
                    <a v-on:click="scrModelClk(model,$event)" carModelId="{{model.carModelId}}" class="style-box brandslink" title="{{model.carModelName}}">{{model.carModelName}}<b></b></a>
                </dd>
                </div>
            </dl>

            <div class="style">
                <dl class="car clearfix">
                    <dt class="G_fl">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款：</dt>
                    <div class="detailsCon">
                    <dd v-for="car in screen_car"><a v-on:click="scrCarClk(car,$event)" carId="{{car.carId}}" class="style-box carlink" title="{{car.carName}}">{{car.carName}}<b></b></a></dd>
                    </div>
                </dl>
            </div>
            
            <div class="outColor clearfix">
                <dl class="car clearfix">
                    <dt class="G_fl">外观颜色：</dt>
                    <div class="detailsCon">
                    <dd class="selectall"><a v-on:click="selectOutColAll" class="style-box acton colorlink">全部<b></b></a></dd>
                    <dd v-for="outColor in outColors">
                    	<a v-on:click="scrOutColClk(outColor,$event)" class="style-box colorlink" outColorId="{{outColor.id}}" title="{{outColor.colorName}}">
                    		<div class="carColor" v-bind:style="{'background':outColor.colorValue.split(' ')[0]}">
                    			<span v-if="outColor.colorValue.split(' ').length>1" v-bind:style="{'background':outColor.colorValue.split(' ')[1]}"></span>
                    		</div>
                    		{{outColor.colorName}}
                    		<b></b>
                    	</a>
                    </dd>
                    </div>
                </dl>
            </div>
            
            <div class="inColor clearfix">
                <dl class="car clearfix">
                    <dt class="G_fl">内饰颜色：</dt>
                    <div class="detailsCon">
                    <dd class="selectall"><a v-on:click="selectInColAll" class="style-box acton colorlink">全部<b></b></a></dd>
                    <dd v-for="inColor in inColors">
                    	<a v-on:click="scrInColClk(inColor,$event)" class="style-box colorlink" inColorId="{{inColor.id}}" title="{{inColor.colorName}}">
                    		<div class="carColor" v-bind:style="{'background':inColor.colorValue.split(' ')[0]}">
                    			<span v-if="inColor.colorValue.split(' ').length>1" v-bind:style="{'background':inColor.colorValue.split(' ')[1]}"></span>
                    		</div>
                    		{{inColor.colorName}}
                    		<b></b>
                    	</a>
                    </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
    <add-table :arr_items="arr_items" :count="count"></add-table>
    <div id="page2" style="margin:20px 0;text-align: center;"></div>
</template>

<script>
    import $ from 'jquery'
    import config from './../../config'
    import AddTable from './../manage/AddTable.vue'
    export default {
        route: {
            data({to}){
                var that = this;
                /*品牌*/
                $.ajax({
                    url: config.API_BASE + "/4s/prefer/preferBrandModelCar",
                    method: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify({"query":{"userId":config.USERID()}}),
                    beforeSend: function (request) {
                        request.setRequestHeader("sessionid", config.SESSIONID());
                    },
                    success: function (response) {
                        if (response.code == 0) {
                            var list = response.data;
                            that.brands = list.brand;
                            that.cars = list.car;
                            that.carModels = list.carModel;
                            /*
                             * v-for 遍历完
                             * */
                            that.$nextTick(function () {
                                $(".brands dd").eq(0).find('a').addClass("acton");

                                that.brandClk({
                                    "brandId": that.brands[0].brandId,
                                    "brandName": that.brands[0].brandName
                                }, null);
                            })
                        }
                    },
                    error: function (fail) {
                        if (fail.status == "401") {
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

                /*主营、副营品牌*/
                $.ajax({
                    url: config.API_BASE + "/4s/accountmanagement/information",
                    method: "POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data: JSON.stringify({"query": {"uid": config.USERID()}}),
                    beforeSend: function (request) {
                        request.setRequestHeader("sessionid", config.SESSIONID());
                    },
                    success: function (response) {
                        var list = response.data;
                        that.brand_name = list.brand_name;
                        that.brandlist = list.brandlist;
                    },
                    error: function (fail) {
                        if (fail.status == "401") {
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
                arr_items:[],
                outColors:[],
                inColors:[]
            }
        },
        components:{
            AddTable
        },
        methods:{
//      	点击品牌
            brandClk(obj,e){
                var brandId = obj.brandId;
                this.screen_carModels = this.carModels[brandId];
                var _index = 0;
                this.$nextTick(function () {
                    if(this.screen_carModels!=null) {
                        this.scrModelClk({
                            "carModelId": this.screen_carModels[0].carModelId,
                            "carModelName": this.screen_carModels[0].carModelName
                        }, null);
                    }else {
                        $("#page2").empty();
                        this.$set("screen_car",[]);
                        this.$set("arr_items",[]);
                    }
                    if(e!=null){
                        _index = $(e.target).parent().index()-1;
                    }
                    $(".brands dd").find('a').removeClass("acton");
                    $(".brands dd").eq(_index).find('a').addClass("acton");
                })

            },
//			点击外观颜色的全部
			selectOutColAll(){
				var that = this;
				that.CarAll = true;
				var brandId = $(".brands dd a.acton").attr("brandid");
				var carModelId = $(".model dd a.acton").attr("carmodelid");
				var carId = $(".style dd a.acton").attr("carid");
                that.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId});
				$(".outColor .selectall").find("a").addClass("acton");
                $(".outColor .selectall").siblings("dd").find("a").removeClass("acton");
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
			},
//			点击内饰颜色的全部
			selectInColAll(){
				var that = this;
				that.CarAll = true;
				var brandId = $(".brands dd a.acton").attr("brandid");
				var carModelId = $(".model dd a.acton").attr("carmodelid");
				var carId = $(".style dd a.acton").attr("carid");
				var exteriorColorId = $(".outColor dd a.acton").attr("outcolorid");
                that.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId,"exteriorColorId":exteriorColorId});
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
			},
//          获取颜色
            getColor(carId){
            	var that = this;
            	var query = {};
            	query.userId = config.USERID();
                query.carId = carId;
                var params = {"query":query};
                $.ajax({
                    url:config.API_BASE+"/4s/prefer/findCarColorByCarId",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            that.outColors = response.data.exteriorColorList;
                            that.inColors = response.data.interiorColorList;
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
            },
            /*分页*/
            getActivityList11(cur,car_id){
                var ii = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
                var that = this;
                var query = {};
                query.pagenum = this.pagesize;
                query.page = cur;
                 query.carId = car_id;
                 query.userId = config.USERID();
                var params = {"query":query};

                $.ajax({
                    url:config.API_BASE+"/4s/offer/findNewOfferlist",
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
            /*分页*/
            getActivityList(cur,newobj){
//          	console.log("分页的数据：");
//          	console.log("分页的brandId是："+newobj.brandId);
//          	console.log("分页的carModelId是："+newobj.carModelId);
//          	console.log("分页的carId是："+newobj.carId);
//          	console.log("分页的exteriorColorId是："+newobj.exteriorColorId);
//          	console.log("分页的interiorColorId是："+newobj.interiorColorId);
                var ii = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
                var that = this;
                var query = {};
                query.pagenum = this.pagesize;
                query.page = cur;
                query.userId = config.USERID();
                query.brandId = newobj.brandId;      //品牌id
                if(newobj.carModelId == undefined){
                	query.carModelId = "";  //车型id
                }else{
                	query.carModelId = newobj.carModelId;  //车型id
                }
                if(newobj.carModelId == undefined){
                	query.carId = "";      //车款id
                }else{
                	query.carId = newobj.carId;      //车款id
                }
                if(newobj.exteriorColorId == undefined){
                	query.exteriorColorId = "";  //外观颜色
                }else{
                	query.exteriorColorId = newobj.exteriorColorId;  //外观颜色
                }
				if(newobj.interiorColorId == undefined){
					query.interiorColorId = "";  //内饰颜色
				}else{
					query.interiorColorId = newobj.interiorColorId;  //内饰颜色
				}
                var params = {"query":query};
                $.ajax({
                    url:config.API_BASE+"/4s/offer/findNewOfferlist",
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
                                            that.getActivityList(curr,newobj);
                                        }
                                        $(".laypage_btn").unbind("click").on('click',function(){
                                            if($(".laypage_skip").val()>0 && $(".laypage_skip").val()<=Math.ceil(that.count/that.pagesize)){
                                                that.getActivityList($(".laypage_skip").val(),newobj);
                                            }else{
                                                layer.msg('请输入正确的跳转页码');
                                            }
                                        })
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
//          点击车型
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
                            _index = $(e.target).parent().index();
                        }
                        $(".model dd").find('a').removeClass("acton");
                        $(".model dd").eq(_index).find('a').addClass("acton");
                    })
                }else{
                    $("#page2").empty();
                    this.$set("screen_car",[]);
                    this.$set("arr_items",[]);
                }

            },
//          点击车款
            scrCarClk(obj,e){
            	var brandId = $(".brands dd a.acton").attr("brandid");
                var carModelId = $(".model dd a.acton").attr("carmodelid");
                var carId = obj.carId ,carName = obj.carName;
                if(carId!=null){
                    var _index = 0;
                    this.$nextTick(function () {
                        this.getColor(carId);
                        if(e!=null){
                            _index = $(e.target).parent().index();
                        }
                        $(".style dd").find('a').removeClass("acton");
                        $(".style dd").eq(_index).find('a').addClass("acton");

                    	this.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId});
                        
                        
                    });
                }else{
                    $("#page2").empty();
                    this.$set("screen_car",[]);
                    this.$set("arr_items",[]);
                }
                $(".outColor .selectall").find("a").addClass("acton");
                $(".outColor .selectall").siblings("dd").find("a").removeClass("acton");
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
            },
            //          点击外观颜色
			scrOutColClk(obj,e){
				var brandId = $(".brands dd a.acton").attr("brandid");
                var carModelId = $(".model dd a.acton").attr("carmodelid");
                var carId = $(".style dd a.acton").attr("carid");
                var exteriorColorId = obj.id;
                var _index = 0;
                this.$nextTick(function () {
                	this.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId,"exteriorColorId":exteriorColorId});
                	
                    if(e!=null){
                        _index = $(e.target).parent().index();
                    }
                    $(".outColor dd").find('a').removeClass("acton");
                    $(".outColor dd").eq(_index).find('a').addClass("acton");
                });
                
			},
//          点击内饰颜色
			scrInColClk(obj,e){
				var brandId = $(".brands dd a.acton").attr("brandid");
                var carModelId = $(".model dd a.acton").attr("carmodelid");
                var carId = $(".style dd a.acton").attr("carid");
                var exteriorColorId = $(".outColor dd a.acton").attr("outcolorid");
                var interiorColorId = obj.id;
				var _index = 0;
                this.$nextTick(function () {
                	this.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId,"exteriorColorId":exteriorColorId,"interiorColorId":interiorColorId});
                	
                    if(e!=null){
                        _index = $(e.target).parent().index();
                    }
                    $(".inColor dd").find('a').removeClass("acton");
                    $(".inColor dd").eq(_index).find('a').addClass("acton");
                });
                
			}
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
    .top-bar .details .brands a,.top-bar .details .model a{
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
    .top-bar .details .brands a:hover, .top-bar .details .brands .cur, .top-bar .details .model .cur, .top-bar .details .style-box .cur{
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
    /*.top-bar .details .style .style-box{
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
    }*/
    .top-bar .details .style i{
        display:inline-block;
        width:12px;
        height:12px;
        margin-right:3px;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUM2QTMxNzk3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUM2QTMxNzg3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGEwM2FjYWYtYWUxNy02NTRhLWE5M2EtYzY1NTRhMTA5N2JiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsOHs3AAAAC1SURBVHjaYvz//z8DIcCES+Lf1S2/pzr/u3sYpyKg3P9HZxh+fP67uQLIZsS0DmjG350tjBJajAIy/67vYOASQlcEUcHw/x+QzSipwygoxyhnwoRLBRD8f3GNUc2ZSduHBaHiyua/u1rhKhgYmZjda5mUbREOx65C2xsRBP/vH8WjAqzoz0+gFxhlDHGpACkChse/6zsZOXgZZY2xqgAp+vfwBMhNtw8w8oiyBPVjqgACgAADABfIYX8VdYt8AAAAAElFTkSuQmCC) no-repeat;
    }
    .batch-change{
        width:890px;
        margin:0 auto;
    }
    .batch-change a{
        padding-right:30px;
    }
    .batch-change .change{
        display:inline-block;
        width:16px;
        height:16px;
        vertical-align: -3px;
        margin-right:3px;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjI1RTZEMTY3MzMxMTFFNjlCMTg5NDQ4OTU1NDhGOEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjI1RTZEMTU3MzMxMTFFNjlCMTg5NDQ4OTU1NDhGOEQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzkyNGNkNDUtYTc5Zi0yZTQ0LWIyYmUtNDljOTIyNjBhMDdmIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvGjIj4AAABmSURBVHjaYvz//z8DKYAJq+i2bdu2b9+OVYoFq+irV69Is4FkJw2oBkZgsAIDBM2XP3/+BJLs7OzIgmJiYp6eniAbiIwKiDJGrKoXLFgAJBMSEoZnsGJPS8AQZGRkxBkPJNkAEGAARRslWVjP4jAAAAAASUVORK5CYII=) no-repeat;
    }
    .batch-change .delete{
        display:inline-block;
        width:16px;
        height:16px;
        vertical-align: -3px;
        margin-right:3px;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M1RTE4MjU3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M1RTE4MjQ3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4bIPLcAAAA3ElEQVR42tySPQqDQBSE16gogmhjLXgGbxGw9QCey0tYCV7BM4iInYV/IBb+ZMwja9DC2GaKYfh44+LbFdZ1raqq73v2UZqmTdMgmKbpui7nuq5bliWgEIbhPM/sSqIoBkGwFbIsY7/JcZytMAxDFEWX057naZomIS3L0nUdgmEYbdsiqKoKH8fxG2IM/uAfsG3b93048vOtAyRJPMmyzF1RlDMkPdhN/UNh3xKtmXyapjM8FvI8j+O4LEvkJEnOcC9g67hzPJCiKIjWdc1PIIgBupztLd36h5cAAwAHk2/CnNyQYgAAAABJRU5ErkJggg==) no-repeat;
    }


    div dl {
        margin: 10px 0;
    }
	div dl dt{
		width: 70px;
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
        background: url('/assets/img/close_1.png') no-repeat;
        background-position: 0 0!important;
    }
    .add {
        padding: 0px 20px;
    }
    .add table tr th,.add table tr td{
        border: 1px solid #b3b3b3;
        padding: 5px 10px;
        text-align: center;
    }
    .add table thead th{
        background: #CCCCCC;
    }
    .add table tr td input[type="text"]{
        display: inline-block;
        width: 80px;
    }
    /*新加的样式*/
   .top-bar .details .style-box{
        display:inline-block;
        padding: 0 10px;
        margin: 2px 0;
        height:26px;
        border:1px dashed  #ccc;
        /*background:#f5f5f5;*/
        font-size:14px;
        text-align:center;
        line-height:26px;
        border-radius:3px;
        margin-right:10px;
        vertical-align: -2px;
        cursor: pointer;
        overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
        position: relative;
    }
    .top-bar .details .style .style-box:hover,.top-bar .details .outColor .style-box:hover,.top-bar .details .inColor .style-box:hover{
        color:#fff;
        background:#fa8c35;
    }
    .top-bar .details .acton{
        border: 1px solid #ff9205;
        background: #fff;
    }
    .top-bar .details .style-box b{
    	width: 18px;
    	height: 18px;
    	background: url(../../assets/img/ico_warn.png) no-repeat;
        background-position: -86px -58px;
        position: absolute;
        right: 0;
        bottom: 0;
        display: none;
        pointer-events: none;
    }
    .top-bar .details .acton b{
    	display: block;
    }
    
    .carColor{
    	width: 14px;
    	height: 14px;
    	border: 1px solid #ccc;
    	border-radius: 50%;
    	display: inline-block;
    	vertical-align: top;
    	margin-right: 2px;
    	margin-top: 5px;
    	overflow: hidden;
    	pointer-events: none;
    }
    .carColor span{
    	height: 7px;
    	width: 100%;
    	display: block;
    	margin: 0;
    	padding: 0;
    }
    .detailsCon{
    	width: 818px;
    	float: right;
    }
    .brandslink{
    	width: 95px;
    }
    .carlink{
    	width: 225px;
    }
    .colorlink{
    	width: 122px;
    }
</style>
