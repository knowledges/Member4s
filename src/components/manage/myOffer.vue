<template>
    <div class="top-bar">
        <div class="brand-list clearfix">
            <p class="G_fl">主营品牌：<span>{{brand_name}}</span></p>
            <p class="G_fl" v-if="brandlist.length>1">副营品牌：<span v-for="list in brandlist" v-show="list.brand_name != brand_name">{{list.brand_name}}</span></p>
        </div>
        <div class="details">
            <dl class="brands clearfix">
                <dt class="G_fl">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</dt>
                <div class="detailsCon">
                <dd v-for="brand in brands"><a v-on:click="brandClk(brand,$event,$index)" brandId="{{brand.brandId}}" class="style-box brandslink" title="{{brand.brandName}}">{{brand.brandName}}<b></b></a></dd>
                </div>
            </dl>

            <dl class="model clearfix">
                <dt class="G_fl">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
                <div class="detailsCon">
                <dd class="selectall"><a v-on:click="selectModelAll" class="style-box acton brandslink">全部<b></b></a></dd>
                <dd v-for="model in screen_carModels" v-if="BrandAll">
                    <a v-on:click="scrModelClk(model,$event,null)" carModelId="{{model.carModelId}}" class="style-box brandslink" title="{{model.carModelName}}">{{model.carModelName}}<b></b></a>
                </dd>
                <dd>
                    <span v-on:click="eaitModels" class="eait"> <i></i> 编辑车型</span>
                </dd>
                </div>
            </dl>

            <div class="style clearfix">
                <dl class="car clearfix">
                    <dt class="G_fl">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款：</dt>
                    <div class="detailsCon">
                    <dd class="selectall"><a v-on:click="selectStyleAll" class="style-box acton carlink">全部<b></b></a></dd>
                    <dd v-for="car in screen_car" v-if="ModelAll"><a v-on:click="scrCarClk(car,$event,null)" class="style-box carlink" carId="{{car.carId}}" title="{{car.carName}}">{{car.carName}}<b></b></a></dd>
                    <dd><span v-on:click="eaitCars" class="eait"> <i></i> 编辑车款</span></dd>
                    </div>
                </dl>
            </div>
            
            <div class="outColor clearfix">
                <dl class="car clearfix">
                    <dt class="G_fl">外观颜色：</dt>
                    <div class="detailsCon">
                    <dd class="selectall"><a v-on:click="selectOutColAll" class="style-box acton colorlink">全部<b></b></a></dd>
                    <dd v-for="outColor in outColors" v-if="CarAll">
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
                    <dd v-for="inColor in inColors" v-if="CarAll">
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
                <dd style="width: 500px;height: 100%;min-height: 160px;" class="city_dd">
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
        <div class="layer_2 car_dd">
            <dl class="clearfix">
                <dt>已选车款：</dt>
                <dd style="display: inline-block;width: 540px;height: 100%;min-height:44px;border-bottom:1px solid #ccc;">
                    <ul class="filter_car">
                        <li class="selected" v-for="item in findCarByCarModel | filterBy 'true' in 'selected'" track-by="$index" carId="{{item.carId}}">
                            <a href="javascript:;;" title="{{item.carName}}" class="selected">{{item.carName}}</a>
                            <i v-on:click="removeCar(item)"></i>
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>全部车款：</dt>
                <dd style="width: 540px;height: 100%;min-height: 230px;" class="car_dd">
                    <ul>
                        <li v-for="item in findCarByCarModel" v-on:click="carClk(item,$index)" :class="{'selected':item.selected==true}"  carId="{{item.carId}}">
                            <a href="javascript:;;" title="{{item.carName}}" :class="{'selected':item.selected==true}" >{{item.carName}}</a>
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

    <offer-table :provinces="provinces" :arr_items="arr_items" :count="count"></offer-table>
    <div id="page2" style="margin:20px 0;text-align: center;"></div>

</template>
<script>
    import $ from 'jquery'
    import config from './../../config'
    import util from './../../util/util'
    import OfferTable from './OfferTable.vue'
    export default {
        route:{
            data({to}){
                var that = this;
                that.getCarM(0);
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
                        /*if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }*/
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
               /* provinces:[],
                provincecity:[],
                clone_provincecity:[],*/
                arr_items:[],
                outColors:[],
                inColors:[],
                BrandAll:false,
                ModelAll:false,
                CarAll:false,
                isCarModel:false,
                isCarModelId:"",
                isCarModelIndex:"",
                isCar:false,
                isCarId:"",
                isCarIndex:"",
            }
        },
        components:{
            OfferTable
        },
        methods:{
        	getCarM(num){
        		var that = this;
        		/*品牌*/
                $.ajax({
                    url:config.API_BASE+"/4s/prefer/preferBrandModelCar",
                    method:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify({"query":{"userId":config.USERID()}}),
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
                                that.brandLoad({"brandId":that.brands[num].brandId,"brandName":that.brands[num].brandName},null,num);
                            })
                            
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
            eaitModels(){
                var that = this;
                var brandId = $(".brands dd a.acton").attr("brandId");
                if(brandId == undefined || brandId == null || brandId == ""){
                    layer.msg('请选择一款品牌！');
                    return ;
                }
                $.ajax({
                    url:config.API_BASE+"/4s/prefer/findCarModelByBrand/",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    data:JSON.stringify({"query":{"brandId":brandId}}),
                    beforeSend:function (request) {					
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            if(response.data.length>0){
                                var list = response.data;
                                if(that.screen_carModels!=undefined){
                                    for(var i =0 ;i<that.screen_carModels.length;i++){
                                        for(var j = 0; j<list.length;j++){
                                            if(that.screen_carModels[i].carModelName == list[j].carModelName ){
                                                list[j].selected = true;
                                            }
                                        }
                                    }
                                }
                                that.$set("findCarModelByBrand",list);
                                that.mask_eaitModelsBrand = layer.open({
                                    type: 1,
                                    title: '编辑车型',
                                    skin: 'layui-layer-rim', //加上边框
                                    area : ['650px' , '350px'],
                                    content: $(".eaitCarsModelsByBrand")
                                });
                            }else{
                                layer.msg("该品牌未找到车型，请选择其他的品牌");
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

                this.isCarModelId = $(".model .acton").attr("carmodelid");
                /*如果当前选择是全部*/
                if(this.isCarModelId==undefined){
                    this.isCarModel = true;
                }
            },
            carModelClk(obj,idx){
                if(obj.selected == undefined || obj.selected == "undefined"){
                    obj.selected = true;
                    this.findCarModelByBrand.$set(idx,{"carModelId":obj.carModelId,"carModelName":obj.carModelName,selected:true});
                }
            },
            removeCarModel(obj){
                if(obj.carModelName == $(".model .acton").text()){
                    this.isCarModel = true;
                }
                obj.selected = "undefined";
            },
            eaitCars(){
                var that = this;
                var carModelId = $(".model dd a.acton").attr("carModelId");
                if(carModelId == undefined || carModelId == null || carModelId == ""){
                    layer.msg('请选择一款车型');
                    return;
                }
                $.ajax({
                    url:config.API_BASE+"/4s/prefer/findCarByCarModel/",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    data:JSON.stringify({"query":{"carModelId":carModelId}}),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            if(response.data.length>0){
                                var list = response.data;
                                debugger;
                                if(that.screen_car!=undefined){
                                    for(var i =0 ;i<that.screen_car.length;i++){
                                        for(var j = 0; j<list.length;j++){
                                            if(that.screen_car[i].carName.trim() == list[j].carName){
                                                list[j].selected = true;
                                            }
                                        }
                                    }
                                }
                                that.$set("findCarByCarModel",response.data);
                                that.mask_eaitModels= layer.open({
                                    type: 1,
                                    title: '编辑车款',
                                    skin: 'layui-layer-rim', //加上边框
                                    area : ['650px' , '450px'],
                                    content: $(".eaitCarsModels")
                                });
                            }else{
                                layer.msg("该车型未找到车款，请选择其他的车型");
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
                this.isCarId = $(".style .acton").attr("carid");
                /*如果当前选择是全部*/
                if(this.isCarId==undefined){
                    this.isCar = true;
                }
            },
            carClk(obj,idx){
                if(obj.selected == undefined || obj.selected == "undefined"){
                    obj.selected = true;
                    this.findCarByCarModel.$set(idx,{"carId":obj.carId,"carName":obj.carName,selected:true});
                }
            },
            removeCar(obj){
                if(obj.carName == $(".style .acton").text()){
                    this.isCar = true;
                }
                obj.selected = "undefined";
            },
            eaitCarModelAgree(){
                var list = $(".filter_carModel li");
                var  carModels = [];
                for(var i = 0 ; i< list.length;i++){
                    var obj = {};
                    if(list.eq(i).attr("carModelId")==this.isCarModelId){
                        /*有一个全部*/
                        this.isCarModelIndex = i+1;
                    }
                    obj.carModelId = list.eq(i).attr("carModelId");
                    obj.carModelName = list.eq(i).text();
                    carModels.push(obj);
                }
                var that = this;
                var brandId = $(".brands dd a.acton").attr("brandId");
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
                            that.$set("screen_carModels",carModels);
                            layer.close(that.mask_eaitModelsBrand);
                            console.log("下标："+that.isCarModelIndex);
                            if(that.isCarModel){
                                that.selectModelAll();
                                that.isCarModel = false;
                            }else{
                                that.scrModelClk({"carModelId":that.isCarModelId},null,that.isCarModelIndex);
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
            },
            eaitCarModelCancle(){
                layer.close(this.mask_eaitModelsBrand);
            },
            eaitCarAgree(){
                var list = $(".filter_car li");
                var  cars = [];
                for(var i = 0 ; i< list.length;i++){
                    var obj = {};
                    if(list.eq(i).attr("carid")==this.isCarId){
                        /*有一个全部*/
                        this.isCarIndex = i+1;
                    }
                    obj.carId = list.eq(i).attr("carId");
                    obj.carName = list.eq(i).text();
                    cars.push(obj);
                }
                var that = this;
                var carModelId = $(".model dd a.acton").attr("carModelId");
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
                            that.$set("screen_car",cars);
                            layer.close(that.mask_eaitModels);
                            if(that.isCar){
                                that.selectStyleAll();
                                that.isCar = false;
                            }else{
                                that.scrCarClk({"carId":that.isCarId},null,that.isCarIndex);
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
            },
            eaitCarCancle(){
                layer.close(this.mask_eaitModels);
            },
//          点击车型的全部
            selectModelAll(){
            	var that = this;
            	that.ModelAll = false;
				that.CarAll = false;
				var brandId = $(".brands dd a.acton").attr("brandid");
                that.getActivityList(1,{"brandId":brandId});
				$(".model dd.selectall a").addClass("acton");
            	$(".model dd.selectall").siblings("dd").find("a").removeClass("acton");
                $(".style .selectall").find("a").addClass("acton");
                $(".style .selectall").siblings("dd").find("a").removeClass("acton");
                $(".outColor .selectall").find("a").addClass("acton");
                $(".outColor .selectall").siblings("dd").find("a").removeClass("acton");
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
                var num = $(".brands .acton").parent().index();
                this.getCarM(num);
                
            },
//          点击车款的全部
			selectStyleAll(){
				var that = this;
            	that.ModelAll = true;
				that.CarAll = false;
				var brandId = $(".brands dd a.acton").attr("brandid");
				var carModelId = $(".model dd a.acton").attr("carmodelid");
                that.getActivityList(1,{"brandId":brandId,"carModelId":carModelId});
                $(".style .selectall").find("a").addClass("acton");
                $(".style .selectall").siblings("dd").find("a").removeClass("acton");
                $(".outColor .selectall").find("a").addClass("acton");
                $(".outColor .selectall").siblings("dd").find("a").removeClass("acton");
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
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
            getActivityList(cur,newobj){
            	console.log("分页的数据：");
            	console.log("分页的brandId是："+newobj.brandId);
            	console.log("分页的carModelId是："+newobj.carModelId);
            	console.log("分页的carId是："+newobj.carId);
            	console.log("分页的exteriorColorId是："+newobj.exteriorColorId);
            	console.log("分页的interiorColorId是："+newobj.interiorColorId);
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
                            that.$nextTick(function () {
                                this.$children[0]._data.checkedIndex = [];
                                this.$children[0]._data.checkedAll=false;
                            });
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
            brandLoad(obj,e,index){
                var brandId = obj.brandId;
                this.BrandAll = true;
                console.log("brandLoad是："+brandId);
                this.screen_carModels = this.carModels[brandId];
                $(".brands dd").find('a').removeClass("acton");
        		$(".brands dd").eq(index).find('a').addClass("acton");
        		if(brandId!=null){
                    var _index = 1;
                    this.$nextTick(function () {
                        if(e!=null){
                            _index = $(e.target).parent().index();
                        }
                        this.getActivityList(1,{"brandId":brandId});
                        console.log("load里的brandId是："+brandId);
                    });
                }else{
                    $("#page2").empty();
                    this.$set("screen_car",[]);
                    this.$set("arr_items",[]);
                }
            },
//          点击品牌
            brandClk(obj,e,index){
				var num = index!=null?index:0; 
				this.getCarM(num);
				this.BrandAll = true;
				this.ModelAll = false;
				this.CarAll = false;
                var brandId = obj.brandId;
                console.log("点击品牌的时候："+brandId);
                $(".model dd.selectall a").addClass("acton");
            	$(".model dd.selectall").siblings("dd").find("a").removeClass("acton");
                $(".style .selectall").find("a").addClass("acton");
                $(".style .selectall").siblings("dd").find("a").removeClass("acton");
                $(".outColor .selectall").find("a").addClass("acton");
                $(".outColor .selectall").siblings("dd").find("a").removeClass("acton");
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
                this.screen_carModels = this.carModels[brandId];
                var _index = 1;
                this.$nextTick(function () {
                    if(this.screen_carModels!=null){
//                  	点击品牌时，默认车型是全部，所以需要把品牌的id传给它
						this.getActivityList(1,{"brandId":brandId});
//                      this.scrModelClk({"carModelId":this.screen_carModels[0].carModelId,"carModelName":this.screen_carModels[0].carModelName},null);
                    }else{
                        $("#page2").empty();
                        this.$set("screen_car",[]);
                        this.$set("arr_items",[]);
                    }
                    if(e!=null){
                        _index = $(e.target).parent().index();
                    }
                    $(".brands dd").find('a').removeClass("acton");
                    $(".brands dd").eq(_index).find('a').addClass("acton");
                })
            },
//          点击车型
            scrModelClk(obj,e,num){
				var brandId = $(".brands dd a.acton").attr("brandid");
                var carModelId = obj.carModelId;
                console.log("点击车型carModelId是"+carModelId);
                console.log("点击车型this.cars是"+this.cars);
                
                this.screen_car = this.cars[carModelId];
                this.ModelAll =  true;
                $(".style .selectall").find("a").addClass("acton");
                $(".style .selectall").siblings("dd").find("a").removeClass("acton");
                $(".outColor .selectall").find("a").addClass("acton");
                $(".outColor .selectall").siblings("dd").find("a").removeClass("acton");
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
                var _index = num!=null?num:1;
                console.log("下标："+_index);

                if(carModelId != null){
                    this.$nextTick(function () {
//                      if(this.screen_car!=undefined){
							this.getActivityList(1,{"brandId":brandId,"carModelId":carModelId});
//                          this.scrCarClk({"carId":this.screen_car[0].carId,"carName":this.screen_car[0].carName},null);
//                      }else{
//                          $("#page2").empty();
//                          this.$set("screen_car",[]);
//                          this.$set("arr_items",[]);
//                      }
                        if(e!=null){
                            _index = $(e.target).parent().index();
                        }
                        this.CarAll = false;
                        $(".model dd").find('a').removeClass("acton");
                        $(".model dd").eq(_index).find('a').addClass("acton");
                        console.log("点击车型的_index："+_index);
                    })
                }else{
                    $("#page2").empty();
                    this.$set("screen_car",[]);
                    this.$set("arr_items",[]);
                }
            },
//          点击车款
            scrCarClk(obj,e,num){
				$(".outColor .selectall").find("a").addClass("acton");
                $(".outColor .selectall").siblings("dd").find("a").removeClass("acton");
                $(".inColor .selectall").find("a").addClass("acton");
                $(".inColor .selectall").siblings("dd").find("a").removeClass("acton");
                var brandId = $(".brands dd a.acton").attr("brandid");
                var carModelId = $(".model dd a.acton").attr("carmodelid");
                var carId = obj.carId;
                if(carId!=null){
                    var _index =  num!=null?num:1;
                    this.$nextTick(function () {
                    	this.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId});
                        if(e!=null){
                            _index = $(e.target).parent().index();
                        }
                        $(".style dd").find('a').removeClass("acton");
                        $(".style dd").eq(_index).find('a').addClass("acton");
                        this.CarAll = true;
                        this.getColor(carId);
                    });
                }else{
                    $("#page2").empty();
                    this.$set("screen_car",[]);
                    this.$set("arr_items",[]);
                }
            },
//          点击外观颜色
			scrOutColClk(obj,e){
				var brandId = $(".brands dd a.acton").attr("brandid");
                var carModelId = $(".model dd a.acton").attr("carmodelid");
                var carId = $(".style dd a.acton").attr("carid");
                var exteriorColorId = obj.id;
                var _index = 1;
                this.$nextTick(function () {
                	this.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId,"exteriorColorId":exteriorColorId});
                	
                    if(e!=null){
                        _index = $(e.target).parent().index();
                    }
                    $(".outColor dd").find('a').removeClass("acton");
                    $(".outColor dd").eq(_index).find('a').addClass("acton");
//                  this.getActivityList(1,carId);
                });
                
			},
//          点击内饰颜色
			scrInColClk(obj,e){
				var brandId = $(".brands dd a.acton").attr("brandid");
                var carModelId = $(".model dd a.acton").attr("carmodelid");
                var carId = $(".style dd a.acton").attr("carid");
                var exteriorColorId = $(".outColor dd a.acton").attr("outcolorid");
                var interiorColorId = obj.id;
				var _index = 1;
                this.$nextTick(function () {
                	this.getActivityList(1,{"brandId":brandId,"carModelId":carModelId,"carId":carId,"exteriorColorId":exteriorColorId,"interiorColorId":interiorColorId});
                	
                    if(e!=null){
                        _index = $(e.target).parent().index();
                    }
                    $(".inColor dd").find('a').removeClass("acton");
                    $(".inColor dd").eq(_index).find('a').addClass("acton");
//                  this.getActivityList(1,carId);
                });
                
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
        border: 1px solid #fa8c35!important;;
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
        margin:30px 30px 15px 0px;
    }
    .top-bar .brand-list p span{
        margin-right:20px;
    }
    .details .brands a, .details .model a{
        display:inline-block;
        padding: 0 10px;
        height:26px;
        line-height:26px;
        color:#666;
        border-radius:4px;
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
    .top-bar .details a.style-box:hover{
        text-decoration: none;
    }
    .eait{
        color: #fb8c33;
        cursor: pointer;
    }
    .eait:hover{
        color: #fe5a05;
    }
    .top-bar .details .model{
        margin:12px auto;
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
    .top-bar .details .style,.top-bar .details .outColor,.top-bar .details .inColor{
        margin-bottom:12px;
        position:relative;
    }
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
    	background: url('../../assets/img/ico_warn.png') no-repeat;
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
        background: url('../../assets/img/pwd-icons-new.png') no-repeat;
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
        background-image: url('../../assets/img/ico_warn.png');
        background-repeat: no-repeat;
        background-position: -82px 4px;
        background-size: 300px 150px;
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
        margin-bottom: 3px;
    }
    div dl dd i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/img/pwd-icons-new.png') no-repeat;
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
        margin: 0 10px;
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
        border: 1px solid #000;
        padding: 0 10px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
    }
    .layer_2 ul li a {
        display: inline-block;
        width: 245px;
        border: none!important;
        background:#FFF;
        color: #000;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .layer_2 ul li i{
        position: absolute;
        right: -10px;
        top:-10px;
        background: url('../../assets/img/close_1.png') no-repeat;
        background-position: 0 0!important;
    }
    .city_dd li{
        margin: 10px;
    }
    .car_dd li{
        width: 248px;
        padding: 0 0!important;
    }
    option{
        text-align: center;
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
