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
                <dd v-for="model in screen_carModels"  v-if="screen_carModels.length>0">
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
                <dd style="display: inline-block;width: 500px;height: 100%;">
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
                <dt>已选车型：</dt>
                <dd style="display: inline-block;width: 500px;height: 100%;">
                    <ul class="filter_car">
                        <li class="selected" v-for="item in findCarByCarModel | filterBy 'true' in 'selected'" track-by="$index" carId="{{item.carId}}">{{item.carName}}<i v-on:click="removeCar(item)"></i></li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>全部车型：</dt>
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

    <div class="batch-change">
        <a v-on:click="batchUpdate" style="cursor: pointer;"><i class="change"></i>批量修改</a>
        <a v-on:click="batchDel" style="cursor: pointer;"><i class="delete"></i>批量删除</a>
        <p class="G_fr">共：<span>{{count}}</span>条</p>
    </div>

    <!--<p>checked:id {{checkedIndex | json}}</p>-->
    <div class="table-box">
        <table  border=1 cellspacing=0 cellpadding=0>
            <tr>
                <th class="car-selected"><input type="checkbox" id="all" v-on:click="allChecked"/></th>
                <th class="car-model">车型</th>
                <th class="car-style">车款</th>
                <th class="car-out-color">外观颜色</th>
                <th class="car-int-color">内饰颜色</th>
                <th class="car-com-pri">官方价/元
                    <a class="prompt">
                        <div class="prompt-mes">如您对官方有疑问，请致电 400-138-0808</div>
                    </a>
                </th>
                <th class="car-off-pri">优惠/元</th>
                <th class="car-last-pri">报价/元</th>
                <th class="car-stock">库存/辆</th>
                <th class="car-way">在途/辆</th>
                <th class="car-place">销售区域</th>
                <th class="car-operation">操作</th>
            </tr>
            <tr v-for="item in arr_items">
                <td><input type="checkbox" class="all" v-model="checkedIndex" :value="item.carPriceId"/></td>
                <td>{{item.carModelName}}</td>
                <td>{{item.carName}}</td>
                <td>{{item.exteriorColorName}}</td>
                <td>{{item.interiorColorName}}</td>
                <td>{{item.price}}</td>
                <td width="100">
                    <span class="show_{{$index}}">{{item.discount}}</span>
                    <input type="text" class="update_{{$index}}" v-model="items.discount" value="{{item.discount}}" style="display: none;">
                    <p v-if="items.discount_" class="error">
                        <i></i>
                        {{items.discount_msg}}
                    </p>
                </td>
                <td width="100">
                    <span class="show_{{$index}}">{{item.lowPrice}}</span>
                    <input type="text" class="update_{{$index}}" v-model="items.lowPrice" value="{{item.lowPrice}}" style="display: none;">
                    <p v-if="items.lowPrice_" class="error">
                        <i></i>
                        {{items.lowPrice_msg}}
                    </p>
                </td>
                <td  width="60">
                    <span class="show_{{$index}}">{{item.stock}}</span>
                    <input type="text" class="update_{{$index}}" v-model="items.stock" value="{{item.stock}}" style="display: none;">
                    <p v-if="items.stock_" class="error">
                        <i></i>
                        {{items.stock_msg}}
                    </p>
                </td>
                <td width="60">
                    <span class="show_{{$index}}">{{item.onWay}}</span>
                    <input type="text" class="update_{{$index}}" v-model="items.onWay" value="{{item.onWay}}" style="display: none;">
                    <p v-if="items.onWay_" class="error">
                        <i></i>
                        {{items.onWay_msg}}
                    </p>
                </td>
                <td>
                    <p class="show_{{$index}}">{{item.saleArea}}</p>
                    <p class="update_{{$index}}" style="display: none;">
                        <span v-for="city in items.areas" track-by="$index">{{city.salesAreaName}}</span>
                    </p>
                    <p class="update_{{$index}}" style="display: none;"><a class="selected" v-on:click="selectarea(item)">请选择</a></p>
                </td>
                <td>
                    <div class="show_{{$index}}">
                        <p><a v-on:click="update(item,$event,$index)" style="cursor: pointer;">修改</a></p>
                        <p><a v-link=""  style="cursor: pointer;">历史</a></p>
                        <p><a v-on:click="del(item,$event,$index)" style="cursor: pointer;">删除</a></p>
                    </div>
                    <div class="update_{{$index}}" style="display: none;">
                        <p><a class="save" v-on:click="save(item,$event,$index)">保存</a></p>
                        <p><a class="cancle" v-on:click="cancle($index)">取消</a></p>
                    </div>
                </td>
            </tr>
            <tr  v-if="arr_items.length<=0">
                <td colspan="12">
                    <div class="order-nodata">
                        <h4><i class="order-nobg"></i>暂无此款车的报价！</h4>
                        <p>您可在 <a v-link="{ path:'/u/manage/add'}" style="display: inline-block">“新增报价”</a> 页面筛选此款车，手动添加报价</p>
                    </div>
                </td>
            </tr>
        </table>
        <div id="page2"  style="margin:20px 0;text-align: center;"></div>
    </div>

    <div class="activearea" style="display: none;">
        <div class="layer_2">
            <dl class="clearfix">
                <dt>已选区域：</dt>
                <dd style="display: inline-block;width: 500px;height: 100%;">
                    <ul class="filter_li">
                        <li class="selected" v-if="global">全国<i v-on:click="removeAll"></i></li>
                        <li class="selected" v-for="city in provincecity['北京市'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['天津市'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['河北省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['山西省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['内蒙古自治区'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['辽宁省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['吉林省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['黑龙江省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['上海市'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['江苏省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['浙江省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['安徽省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['福建省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['江西省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['山东省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['河南省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['湖北省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['湖南省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['广东省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['广西壮族自治区'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['海南省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['重庆市'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['四川省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['贵州省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['云南省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['西藏自治区'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['陕西省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['甘肃省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['青海省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['宁夏回族自治区'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['新疆维吾尔自治区'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['香港特别行政区'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['澳门特别行政区'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                        <li class="selected" v-for="city in provincecity['台湾省'] | filterBy 'true' in 'selected'" track-by="$index">{{city.city}}<i v-on:click="removeCity(city)"></i></li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>可选区域：</dt>
                <dd>
                    <ul>
                        <li v-on:click="selectAllClk" id="global">全国</li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <select v-model="selectedKey" id="selectedKey" v-on:change="selectedProvinces">
                        <option value="0" selected>==请选择==</option>
                        <option v-for="province in provinces" v-bind:value="province">{{province}}</option>
                    </select>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd style="width: 500px;height: 100%;" class="city_dd">
                    <ul v-if="!global">
                        <li v-for="city in city_items" v-on:click="cityClk(city,$index)"
                            class="city_li" :class="{'selected':city.selected==true}">
                            {{city.city}}
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button v-on:click="agree">确定</button>
                    <button v-on:click="cancle1">取消</button>
                </dd>
            </dl>
        </div>
    </div>

    <div class="batchAdd" style="display: none;">
        <div class="add">
            <dl class="clearfix">
                <dt>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</dt>
                <dd v-text="temps.brandName"></dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
                <dd v-text="temps.carModelName"></dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款：</dt>
                <dd v-text="temps.carName"></dd>
            </dl>
            <table>
                <thead>
                    <tr>
                        <th>外观颜色</th>
                        <th>内饰颜色</th>
                        <th>库存/辆</th>
                        <th>在途/辆</th>
                        <th>官方价/元</th>
                        <th>优惠价/元</th>
                        <th>报价/元</th>
                        <th>销售区域</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="temp in temp_arr" track-by="$index" v-if="$index==0">
                    <td>{{temp.interiorColorName}}</td>
                    <td>{{temp.exteriorColorName}}</td>
                    <td>
                        <input type="text" class="stock_{{$index}}" value="{{temp.stock}}">
                    </td>
                    <td>
                        <input type="text" class="onWay_{{$index}}" value="{{temp.onWay}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        48560.00
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <input type="text"  v-model="temps.discount" value="{{temp.discount}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <input type="text" v-model="temps.lowPrice" value="{{temp.lowPrice}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <p>
                            <span v-for="city in items.areas" track-by="$index">{{city.salesAreaName}}</span>
                        </p>
                        <a href="javascript:;;" class="selected" v-on:click="selectarea(temp)">选择</a>
                    </td>
                </tr>
                <tr v-for="temp in temp_arr"  track-by="$index" v-if="temp_arr.length>1 && $index>0 ">
                    <td>{{temp.interiorColorName}}</td>
                    <td>{{temp.exteriorColorName}}</td>
                    <td>
                        <input type="text" class="stock_{{$index}}" value="{{temp.stock}}">
                    </td>
                    <td>
                        <input type="text" class="onWay_{{$index}}" value="{{temp.onWay}}">
                    </td>
                </tr>
                </tbody>
            </table>

            <dl class="clearfix" style="display: inline-block; margin-left: 20%;">
                <dt></dt>
                <dd >
                    <button v-on:click="save2">保存</button>
                    <button v-on:click="cancle2">取消</button>
                </dd>
            </dl>
        </div>

    </div>
</template>
<script>
    import $ from 'jquery'
    import config from './../../config'
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

                /*获取省市关系*/
                $.ajax({
                    url:config.API_BASE+"/nl/common/provincecity",
                    method:"POST",
                    contentType:"application/json; charset=utf-8",
                    datatype:"json",
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        var list = response.data;
                        that.$set("provinces",list.provinces);
                        that.$set("provincecity",list.provincecity);
                        that.$set("clone_provincecity",list.provincecity);
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
                arr_items:[],
                provinces:"",
                provincecity:"",
                clone_provincecity:"",
                mask_1:"",
                mask_3:"",
                selectedKey:"",
                global:false,
                city_items:[],
                checkedIndex:[],
                checked:"",
                items:{
                    areas:[],
                    discount:"",
                    discount_:false,
                    discount_msg:"",
                    lowPrice:"",
                    lowPrice_:false,
                    lowPrice_msg:"",
                    stock:"",
                    stock_:false,
                    stock_msg:"",
                    onWay:"",
                    onWay_:false,
                    onWay_msg:""
                },
                temp_items:{},
                temp_arr:[],
                temps:{
                    interiorColorName:"",
                    exteriorColorName:"",
                    stock:"",
                    onWay:"",
                    discount:"",
                    discount:"",
                    brandName:"",
                    carModelName:"",
                    carName:""
                },
                findCarModelByBrand:[],
                mask_eaitModelsBrand:"",
                findCarByCarModel:[],
                mask_eaitModels:"",

            }
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
            allChecked(){
               if(this.checked){
                   this.checkedIndex = [];
                   $(".all").removeAttr("checked");
               }else{
                   this.checkedIndex = [];
                   $(".all").removeAttr("checked");
                   for(var i = 0 ; i<this.arr_items.length;i++){
                       $(".all").eq(i).attr("checked","true");
                       this.checkedIndex.push(this.arr_items[i].carPriceId);
                   }
               }
            },
            /*分页*/
            getActivityList(cur,car_id){
                var ii = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
                var that = this;
                var query = {};
                query.pagenum = this.pagesize;
                query.page = cur;
                query.carId = 2956;
                query.userId = 186;
                /*query.carId = car_id;
                query.userId = config.USERID();*/
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
                this.$nextTick(function () {
                    if(this.screen_car!=undefined){
                        this.scrCarClk({"carId":this.screen_car[0].carId,"carName":this.screen_car[0].carName},null);
                    }else{
                        this.$set("screen_car",[]);
                        this.$set("arr_items",[]);
                    }
                    if(e!=null){
                        _index = $(e.target).parent().index()-1;
;                    }
                    $(".model dd").find('a').removeClass("actived");
                    $(".model dd").eq(_index).find('a').addClass("actived");
                })

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

                /*把区域数组遍历到对象中，然后双向绑定；把效果展示在区域弹出框中*/
                var that = this;
                var str = obj.saleArea;
                var list = str.substring(1,str.length-1).split(",");
                for(var i = 0 ; i< list.length;i++){
                    if(list[i].trim()=="全国"){
                        that.items.areas.push({"salesAreaName":"全国","salesAreaLevel":"1"});
                        that.global = true;
                        $("#selectedKey").attr({"disabled":true});
                        $("#global").addClass("selected");
                    }else if(list[i].trim().indexOf("省")>=0 || list[i].trim().indexOf("特别行政区")>=0  || list[i].trim()=="北京市" || list[i].trim()=="天津市" || list[i].trim()=="上海市" || list[i].trim()=="重庆市"){
                        that.items.areas.push({"salesAreaName":list[i],"salesAreaLevel":"2"})
                        var arr = that.provincecity[list[i].trim()];
                        if(arr.length>1){
                            /*把省插入到第一的位置*/
                            arr.splice(0,0,{"province":list[i].trim(),"city":list[i].trim(),"insert":true})

                            for(var j =0 ;j <arr.length;j++){
                                if(j == 0){
                                    /*赋值总数去掉省*/
                                    that.provincecity[list[i].trim()].$set(j,{province:arr[j].province,city:arr[j].city,total:that.provincecity[list[i].trim()].length-1,selected:true});
                                }else{
                                    that.provincecity[list[i].trim()].$set(j,{province:arr[j].province,city:arr[j].city,selected:false});
                                }
                            }
                        }else{
                            arr[i].selected = true;
                            that.provincecity[list[i].trim()].$set(0,{province:arr[i].province,city:arr[i].city,selected:true,insert:true});
                        }

                    }else{
                        that.items.areas.push({"salesAreaName":list[i].trim(),"salesAreaLevel":"3"})
                        $.map(that.provincecity,function (val,key) {
                            for(var j = 0;j<val.length;j++){
                                if(list[i].trim() == val[j].city){
                                    val[j].selected = true;
                                    that.provincecity[key].$set(j,{province:val[j].province,city:val[j].city,selected:true})
                                }
                            }
                        })
                    }
                }
            },
            del(obj,e,_index){
                var that = this;
                layer.confirm('您确定要删除吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    layer.close(index);
                    /*删除*/
                    var params = {"query":[{"carPriceId":obj.carPriceId}]};
                    that.delMethod(params);
                    that.arr_items.$remove(obj);
                }, function(){});
            },
            batchDel(){
                var that = this;
                layer.confirm('您确定要批量删除吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    layer.close(index);
                    /*删除*/
                    var arr = [];
                    for(var i=0 ;i<that.checkedIndex.length;i++){
                        var obj = {};
                        obj.carPriceId = that.checkedIndex[i];
                        arr.push(obj);
                    }

                    var params = {"query":arr};
                    that.delMethod(params);
                    window.history.go(0);
                }, function(){});
            },
            /*删除或者删除修改我的报价*/
            delMethod(params){  //删除方法
                $.ajax({
                    url:config.USERID+"/4s/offer/batchDeleteCarPrice",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            layer.msg('删除成功', {icon: 1});
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
            },
            update(obj,e,_index){
              /*  var that = this;*/
                this.temp_items = [];
                this.temp_items = obj;

                layer.confirm('您确定要修改吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    layer.close(index);
                    $(".update_"+_index).show();
                    $(".show_"+_index).hide();

                }, function(){});
            },
            batchUpdate(){
                var that = this;
                layer.confirm('您确定要批量修改吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    layer.close(index);

                    if(that.checkedIndex.length>0){
                        that.mask_3 = layer.open({
                            type: 1,
                            title: '批量修改',
                            skin: 'layui-layer-rim', //加上边框
                            area : ['800px' , '400px'],
                            content: $(".batchAdd")
                        });

                        that.temp_arr = [];
                        /*筛选批量数据*/
                        for(var i=0;i<that.checkedIndex.length;i++){
                            for(var j = 0 ;j<that.arr_items.length;j++){
                                if(that.checkedIndex[i] == that.arr_items[j].carPriceId){
                                    that.temp_arr.push(that.arr_items[j]);
                                }
                            }
                        }

                        that.temps.brandName = that.temp_arr[0].brandName;
                        that.temps.carModelName = that.temp_arr[0].carModelName;
                        that.temps.carName = that.temp_arr[0].carName;

                        console.log(JSON.stringify(that.temp_arr));

                    }else{
                        layer.msg("请选择批量修改内容");
                    }
                }, function(){});
            },
            /*修改或者批量修改我的报价*/
            updateMethos(params){
                var that = this;
                $.ajax({
                    url:config.API_BASE+"/4s/offer/batchUpdateCarPrice",
                    method:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            that.items.areas = [];
                            layer.msg("修改成功");
//                            window.history.go(0);
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
            save(){

                if(this.items.lowPrice ==""){
                    this.items.lowPrice_=true;
                    this.items.lowPrice_msg="报价不能为空";
                    return;
                }else if(this.items.lowPrice < this.items.discount){
                    this.items.lowPrice_=true;
                    this.items.lowPrice_msg="报价要高于优惠价哦！";
                    return;
                }else{
                    this.items.lowPrice_=false;
                    this.items.lowPrice_msg="";
                }

                if(this.items.areas.length<=0){
                    layer.msg("请选择区域");
                    return;
                }

                var query = {};
                    query.carPriceId = this.temp_items.carPriceId;
                    query.stock = this.items.stock != "" ? this.items.stock:0;
                    query.onWay=this.items.onWay != "" ? this.items.onWay:0;
                    query.discount = this.items.discount != "" ? this.items.discount:0;
                    query.lowPrice = this.items.lowPrice;
                    query.createUser = config.USERID();
                    query.areas = this.items.areas;
                var arr = [];
                    arr[0] = query;
                var params = {"query":arr};

                this.updateMethos(params);
            },
            save2(){
                var that = this;
                if(that.items.areas.length<0){
                    return;
                }
                var arr = [];
                for (var i = 0;i<that.temp_arr.length; i++){
                    var query = {};
                    query.carPriceId = that.temp_arr[i].carPriceId;
                    query.stock = $(".stock_"+i).val();
                    query.onWay= $(".onWay_"+i).val();
                    query.discount = this.temps.discount;
                    query.lowPrice = this.temps.lowPrice;
                    query.createUser = config.USERID();
                    query.areas = this.items.areas;
                    arr.push(query);
                }

                var params = {"query":arr};
                this.updateMethos(params);
            },
            cancle(_index){
                $(".update_"+_index).hide();
                $(".show_"+_index).show();
            },
            cancle1(){
                layer.close(this.mask_1);
            },
            cancle2(){
                layer.close(this.mask_3);
            },
            cityClk(obj,_index){
//               /*点击下标是否第一个*/
                if(_index == 0){
//                    /*判断是直辖市*/
                    if(this.city_items.length>1){

                        for(var i =1 ;i < this.city_items.length;i++){
                            this.city_items.$set(i,{province:this.city_items[i].province,city:this.city_items[i].city,selected:false});
                        }

                    }
                    obj.selected = true;
                    this.city_items.$set(_index,{province:obj.province,city:obj.city,total:obj.total,selected:true,insert:true});
                }else{

                    if(obj.selected == undefined || obj.selected == "undefined"){
                        this.city_items.$set(_index,{province:obj.province,city:obj.city,selected:true});
                        this.city_items[0].total =this.city_items[0].total-1;
                        if(this.city_items[0].total == 0){
                            /*total 先不设置*/
                            this.city_items.$set(0,{province:this.city_items[0].province,city:this.city_items[0].city,total:this.city_items[0].total,selected:true})

                            for(var i = 1; i<this.city_items.length;i++){
                                this.city_items.$set(i,{province:this.city_items[i].province,city:this.city_items[i].city,selected:false});
                            }

                        }
                    }

                }
            },
            selectedProvinces(){
                this.city_items = this.provincecity[this.selectedKey];

                if(this.city_items.length>1){

                    var total = this.city_items.length;

                    for(var i = 1; i<this.city_items.length;i++){
                        /*剔除已选择过的*/
                        if(this.city_items[i].selected == true){
                            total =total-1;
                        }
                    }

                    if(this.city_items[0].insert == undefined){
                        this.city_items.splice(0,0,{"province":this.selectedKey,"city":this.selectedKey,"insert":true});

                    }

                    this.city_items.$set(0,{province:this.city_items[0].province,city:this.city_items[0].city,selected:this.city_items[0].selected,total:total,"insert":true});
                }
            },
            removeCity(obj){
                /*判断是否是直辖市*/
                if(obj.city == obj.province){

                    if(this.provincecity[obj.city].length>1){
                        /*total*/
                        obj.total = this.provincecity[obj.city].length -1;
                        for(var i = 0; i<this.provincecity[obj.city].length;i++){
                            if(i==0){
                                this.provincecity[obj.city].$set(i,{province:this.provincecity[obj.city][i].province,city:this.provincecity[obj.city][i].city,total:obj.total,selected:'undefined',insert:true})
                            }else{
                                this.provincecity[obj.city].$set(i,{province:this.provincecity[obj.city][i].province,city:this.provincecity[obj.city][i].city,selected:'undefined'})
                            }

                        }
                    }else{
                        obj.selected = 'undefined';
                    }

                }else{
                    obj.selected = 'undefined';
                }
            },
            agree(){
                layer.close(this.mask_1);
                var list = $(".filter_li li");
                this.items.areas = [];
                for(var i = 0 ; i< list.length;i++){
                    if(list.eq(i).text()=="全国"){
                        this.items.areas[0] = {"salesAreaName":"全国","salesAreaLevel":"1"}
                    }else if(list.eq(i).text().indexOf("省")>=0 || list.eq(i).text().indexOf("特别行政区")>=0  || list.eq(i).text()=="北京市" || list.eq(i).text()=="天津市" || list.eq(i).text()=="上海市" || list.eq(i).text()=="重庆市"){
                        this.items.areas.push({"salesAreaName":list.eq(i).text(),"salesAreaLevel":"2"})
                    }else{
                        this.items.areas.push({"salesAreaName":list.eq(i).text(),"salesAreaLevel":"3"})
                    }
                }
            },
            selectAllClk(){
                this.global = true;
                $("#selectedKey").find("option[value=0]").attr({"selected":true});
                $("#selectedKey").attr({"disabled":true});
                $("#global").addClass("selected");
            },
            removeAll(){
                $("#selectedKey").removeAttr("disabled");
                $("#global").removeClass("selected");
                this.global = false;
            }
        },
        watch:{
            'checkedIndex':{
                handler: function (val, oldVal) {
                   if(this.checkedIndex.length == this.arr_items.length){
                       this.checked = true;
                   }else{
                       this.checked = false;
                   }
                },
                //监听数组不用添加
                deep: true
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
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0I3RjI2OTE3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0I3RjI2OTA3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6lQwTQAAAA30lEQVR42pSSPQqEMBCFVwkixj9svIHsQWwUDysoVh5EbQSLpBRFiWDhDkZcYSVZXxEmw/fIzzxl27bXEyEpMc9zURSWZYVhiBBSpXSWZX3fd11XliV0RIZlWcAAK99O0yQyAJqmaVVVURRpmua6bhzH0FduH81vMo4j1O9dpmkahnF/wpUGUUpt2+b0jQHoPM9P2nGcJEl0XT8B9ZcehuFKY4yvjPqI/hr+pA/Duq5gYIxJ6cPQtm1d1/y/xfSRJUJI0zRQwGjwLkn4YOZBEPi+73kexEucLuVpvD8CDAAq4oPfXOYlMQAAAABJRU5ErkJggg==) no-repeat;
    }
    .batch-change .delete{
        display:inline-block;
        width:16px;
        height:16px;
        vertical-align: -3px;
        margin-right:3px;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M1RTE4MjU3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M1RTE4MjQ3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4bIPLcAAAA3ElEQVR42tySPQqDQBSE16gogmhjLXgGbxGw9QCey0tYCV7BM4iInYV/IBb+ZMwja9DC2GaKYfh44+LbFdZ1raqq73v2UZqmTdMgmKbpui7nuq5bliWgEIbhPM/sSqIoBkGwFbIsY7/JcZytMAxDFEWX057naZomIS3L0nUdgmEYbdsiqKoKH8fxG2IM/uAfsG3b93048vOtAyRJPMmyzF1RlDMkPdhN/UNh3xKtmXyapjM8FvI8j+O4LEvkJEnOcC9g67hzPJCiKIjWdc1PIIgBupztLd36h5cAAwAHk2/CnNyQYgAAAABJRU5ErkJggg==) no-repeat;
    }

    .table-box{
        width:890px;
        margin:0 auto;
    }
    .table-box table{
        border:1px solid #e5e5e5;
        margin-top:10px;
    }
    .table-box table th{
        height:36px;
        text-align:center;
        color:#333;
    }
    .table-box table td{
        height:70px;
        text-align:center;
    }
    .table-box table tr:hover{
        background:#fff5ef;
    }
    .table-box table .car-selected{
        width:30px;
    }
    .table-box table .car-model{
        width:60px;
    }
    .table-box table .car-style{
        width:160px;
    }
    .table-box table .car-out-color{
        width:64px;
    }
    .table-box table .car-int-color{
        width:64px;
    }
    .table-box table .car-com-pri{
        width:80px;
    }
    .table-box table .car-com-pri a{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDExNTQ0Mjg3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDExNTQ0Mjc3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz45a21hAAABeElEQVR42mL8+vUrAxi8/8G46CrLgcdMDz8xAbmK/P8c5f5Fa/4R5PgPUcAIUbr7AXPtUdavvxi1RP5pC/8Dilx9y3TtDRM3K0OzzS9Xhb9QpUB1RfvZVAX/tdr+1gSrg4Brb5lqDrPefs/U5whSzfjk7TfPNRySPP+WeP8EmgEEdz8wMjMxKPCB7P32myF6K/vzL0zbQn4wLb3O8vU3Q6f9b4g6IGg5ztZ4lA3C5mIFSQEVLL7KwrL/EZO2yD81QYS9f/8zIAOglI7oP6B3me5/ZFIX+seAFwBVP/jIxIIpYSX1F1OQlZmBBRh+N98xIYvGaP1lYUJxxK33TDI8/5iA4Xz1DROQA5coP8RafIANWd2V10z2sv8YH7/95rWGQ47v3wLPn1zYAithO/ujT+DAEuL4D4yP62+ZYrexA0mgtLLAf4g6uCBQAVAZNGJ3ASP2CBvQDGC4QAIOYi/QnhbkiEVLLsDgYwU6gP+fncy/GC1EcgEIMACUlbe8VOWw1wAAAABJRU5ErkJggg==) no-repeat;
        display:inline-block;
        width:14px;
        height:14px;
        vertical-align:-2px;
        margin-left:2px;
        position:relative;
    }
    .table-box table .car-com-pri a .prompt-mes{
        width: 257px;
        height: 52px;
        line-height:52px;
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAzCAYAAAB469bRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUJCNUQxQUQ2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUJCNUQxQUM2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTI2Y2JjZmYtYTdjOS1lOTQwLTg0MjctOWIyZWU3MjZhZGVkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmpyUH8AAALGSURBVHja7Nk7aFNRHIDxc2MSoVHakHSIiLSrOIm0DjoKLh06qIP4LirtIMUOPpBaOigIYsEOHSwupaIiPit0EHwgVexgQWtBcLDmaozNTWieTXI9fzkKiqir934/OG3SpMtJznfPSYKNLW0BpZQMywwA3ufKCOofwdmnN8vMB+A/EoCQ3EgkEswG4CO2bX/b+geZCsCfvp//Afg0AAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAABQKqhHXW7Yts1seEwsFlPhcPifnuu6rkqn06parTJxPmI1trRF9O8Veiw3QYAHdnajQwNbNm1cPxyPx61A4O8bPcdx1Pv55I3NHfuOmYuCyzR6mpS+LAGQS0TILH6OBB6Iuh7LJOgPb48Orlm9am80Gv3jP+TzeZVKfX7d1Xu6c/rlrGPeHATA2yTy1aB5seVOxbx58P+TACwdOjo4MD5ydoM+BqyLRCK/fWKlUlFONpu9emvyoF78X/SfinrUCIDnyevrWnL2g7c0tbYHzK6u4fiRA2t3be+439wcXxkKhX6+BNTrcu6vT72Y6drdc/KObAakCc67ZzVm0SdnRabAe/QCrpudXenM0KW5V3NvT8gZ/9fYZzIZNZ/8eFEv/glz5V8yu0EQAHjgjCcLurhtf9+1T6n0uN7p/3gwl8uphYzzuHNP7zl9t2COgDUdD7aEBAAe2AW45iwvC7vY13/+lD7rvykUCqpUKinHyX64MDLWk80tLurHyyx+AgDvRqA8NT2zcHfyUbde+EW99S8/ePL88Nj1e0k5JshxwRwb4DN8COgDTa3t8q2AfN3bMHFleGfAssJbd3RfNlt/ufrXufr701cBBgD4S+1csLBSwAAAAABJRU5ErkJggg==);
        position:absolute;
        top:-50px;
        left:-118px;
        display:none;
    }
    .table-box table .car-com-pri a:hover  .prompt-mes{
        display:block;
    }
    .table-box table .car-off-pri{
        width:80px;
    }
    .table-box table .car-last-pri{
        width:80px;
    }
    .table-box table .car-stock{
        width:50px;
    }
    .table-box table .car-way{
        width:50px;
    }
    .table-box table .car-place{
        width:80px;
    }
    .table-box table .car-operation{
        width:80px;
    }
    .table-box table .car-operation a{
        display:block;
    }
    .table-box table .car-operation a:hover{
        color:#ff791f;
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
</style>