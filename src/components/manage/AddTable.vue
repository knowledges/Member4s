<template>
    <div class="batch-change">
        <a v-on:click="batchUpdate" style="cursor: pointer;"><i class="change"></i>批量添加</a>
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
                <td><input type="checkbox" class="all" v-model="checkedIndex" :value="$index"/></td>
                <!--<td><input type="checkbox" class="all" v-model="checkedIndex" :value="item.carId"/></td>-->
                <td>{{item.carModelName}}</td>
                <td>{{item.carName}}</td>
                <td>{{item.exteriorColorName}}</td>
                <td>{{item.interiorColorName}}</td>
                <td>{{item.price}}</td>
                <td width="100">
                    <!--<span class="show_{{$index}}">{{item.discount}}</span>-->
                    <input type="number" class="update_{{$index}} discount_{{$index}}" v-on:keyup="calc(item,$index)" v-on:click="calc(item,$index)" value="{{item.discount}}" style="display: none;">
                    <p v-if="items.discount_" class="error">
                        <i></i>
                        {{items.discount_msg}}
                    </p>
                </td>
                <td width="100">
                    <!--<span class="show_{{$index}}">{{item.lowPrice}}</span>-->
                    <input type="text" class="update_{{$index}}  lowPrice_{{$index}}" readonly value="{{item.lowPrice}}" style="display: none;">
                    <p v-if="items.lowPrice_" class="error">
                        <i></i>
                        {{items.lowPrice_msg}}
                    </p>
                </td>
                <td  width="60">
                    <!--<span class="show_{{$index}}">{{item.stock}}</span>-->
                    <input type="number" class="update_{{$index}}  stock_{{$index}}" value="{{item.stock}}" style="display: none;">
                    <p v-if="items.stock_" class="error">
                        <i></i>
                        {{items.stock_msg}}
                    </p>
                </td>
                <td width="60">
                    <!--<span class="show_{{$index}}">{{item.onWay}}</span>-->
                    <input type="number" class="update_{{$index}} onWay_{{$index}}" value="{{item.onWay}}" style="display: none;">
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
                        <button v-on:click="update(item,$event,$index)" class="update" style="cursor: pointer;border: none; background: #FFF;">添加</button>
                        <!--<p><a v-link="{path:'/u/manage/myOffer/find/0/'+item.carId+'/'+item.exteriorColorId+'/'+item.interiorColorId+'/info'}"  style="cursor: pointer;">历史</a></p>-->
                        <p><a href="#" @click.prevent="getHistoryList(item)">历史</a></p>
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
                        <!--<p>您可在 <a v-link="{ path:'/u/manage/add'}" style="display: inline-block">“新增报价”</a> 页面筛选此款车，手动添加报价</p>-->
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <div class="activearea" style="display: none;">
        <div class="layer_2">
            <dl class="clearfix">
                <dt>已选区域：</dt>
                <dd style="display: inline-block;width: 490px;height: 100%;min-height: 45px;border-bottom: 1px solid #ccc;">
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
                <dd style="width: 490px;height: 100%;" class="city_dd">
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
                    <th class="car-out-color">外观颜色</th>
                    <th class="car-int-color">内饰颜色</th>
                    <th class="car-stock">库存/辆</th>
                    <th class="car-way">在途/辆</th>
                    <th class="car-com-pri">官方价/元</th>
                    <th class="car-off-pri">优惠价/元</th>
                    <th class="car-last-pri">报价/元</th>
                    <th class="car-place">销售区域</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="temp in temp_arr" track-by="$index" v-show="$index==0">
                    <td>{{temp.exteriorColorName}}</td>
                    <td>{{temp.interiorColorName}}</td>
                    <td>
                        <input type="number" class="stocks_{{$index}}" value="{{temp.stock}}">
                    </td>
                    <td>
                        <input type="number" class="onWays_{{$index}}" value="{{temp.onWay}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        {{temp.price}}
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <input type="number"  v-model="temps.discount" v-on:keyup="batchCalc(temp)" v-on:click="batchCalc(temp)" value="{{temp.discount}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <input type="text" v-model="temps.lowPrice" readonly value="{{temp.lowPrice}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <p>
                            <span v-for="city in items.areas" track-by="$index">{{city.salesAreaName}}</span>
                        </p>
                        <a href="javascript:;;" class="selected" v-on:click="selectarea(temp)">选择</a>
                    </td>
                </tr>
                <tr v-for="temp in temp_arr"  track-by="$index" v-show="temp_arr.length>1 && $index>0 ">
                    <td>{{temp.interiorColorName}}</td>
                    <td>{{temp.exteriorColorName}}</td>
                    <td>
                        <input type="number" class="stocks_{{$index}}" value="{{temp.stock}}">
                    </td>
                    <td>
                        <input type="number" class="onWays_{{$index}}" value="{{temp.onWay}}">
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
    
    <history-tpl :history="history"></history-tpl>
</template>
<script >
    import $ from 'jquery'
    import config from './../../config'
    import util from './../../util/util'
    import historyTpl from './../historyTpl.vue'
    export default {
        props:{
            count:{
              type:Number
            },
            arr_items: {
                type: Array,
                default: ()=>[]
            }
        },
        ready(){
        },
        components:{
	        historyTpl
	    },
        data(){
            return {
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
                    lowPrice:"",
                    brandName:"",
                    carModelName:"",
                    carName:""
                },
                history: {
                    index:0,
                    brandName: '',
                    carModelName: '',
                    carName: '',
                    exColorName: '',
                    inColorName: '',
                    titleList:['创建时间', '官方价 / 元', '优惠价 / 元', '活动时间'],
                    list:[]
                },
                provinces:"",
                provincecity:"",
                clone_provincecity:"",
                mask_1:"",
                mask_3:"",
                selectedKey:"",
                global:false,
                city_items:[],
            }
        },
        methods:{
//      	新改的历史
        	getHistoryList(item){
                var self = this,
                    query = {},
                    params = {};
                console.log(item);
                query.user_id = config.USERID();
                query.interior_color_id = item.interiorColorId;
                query.exterior_color_id= item.exteriorColorId;
                query.pagenum = 100;
                query.page = 1;
                query.car_id = item.carId;
                params = {"query":query};

                self.history.brandName = item.brandName;
                self.history.carModelName = item.carModelName;
                self.history.carName = item.carName;
                self.history.exColorName = item.exteriorColorName;
                self.history.inColorName = item.interiorColorName;

                $.ajax({
                    url:config.API_BASE+"/4s/activityTrend/list/",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data: JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        console.log(response);
                        if(response.code === 0){
                            self.history.list = response.data.rows;
                            self.history.index = layer.open({
                                type: 1,
                                title: '历史记录',
                                skin: 'layui-layer-rim', //加上边框
                                area : ['750px' , '800px'],
                                content: $("#J_HistoryPop")
                            });
                        }else{
                            layer.msg(request.desc);
                        }
                    },
                    error:function(fail){
                        if(fail.status == "401"){
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                });

            },
        	
            getRelationship(){
                var that = this;

                /*获取省市关系*/
                $.ajax({
                    url:config.API_BASE+"/nl/common/provincecity",
                    method:"POST",
                    contentType:"application/json; charset=utf-8",
                    datatype:"json",
                    cache:true,
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        var list = response.data;
                        that.$set("provinces",list.provinces);
                        that.$set("provincecity",list.provincecity);
                        that.$set("clone_provincecity",list.provincecity);

                        that.selectedKey="江苏省";
                        that.selectedProvinces();

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
            calc(item,index){
                setTimeout(function () {
                    var num = $(".discount_"+index).val()!=""?$(".discount_"+index).val():0;
                    var val = item.price-num;
                    $(".lowPrice_"+index).val(val);
                },500);
            },
            batchCalc(item){
                var that = this;
                setTimeout(function (){
                    that.temps.lowPrice = item.price - that.temps.discount;
                },500)
            },
            batchUpdate(){
                var that = this;
                layer.confirm('您确定要批量添加吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    layer.close(index);

                    if(that.checkedIndex.length>0){
                        that.mask_3 = layer.open({
                            type: 1,
                            title: '批量添加',
                            skin: 'layui-layer-rim', //加上边框
                            area : ['800px' , '400px'],
                            content: $(".batchAdd"),
                            cancel:function () {
                                /*修改弹框初始化*/
                                that.removeAll();
                                that.selectedKey = "0";
                                that.city_items = [];
                                that.items.areas = [];
                            }
                        });

                        that.temp_arr = [];
                        /*筛选批量数据*/
                        for(var i=0;i<that.checkedIndex.length;i++){
                            for(var j = 0 ;j<that.arr_items.length;j++){
                                if(that.checkedIndex[i] == j){
                                    that.temp_arr.push(that.arr_items[j]);
                                }
                            }
                        }

                        that.temps.brandName = that.temp_arr[0].brandName;
                        that.temps.carModelName = that.temp_arr[0].carModelName;
                        that.temps.carName = that.temp_arr[0].carName;
                        that.getRelationship();
//                        console.log(JSON.stringify(that.temp_arr));

                    }else{
                        layer.msg("请选择批量修改内容");
                    }
                }, function(){});
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
                        this.checkedIndex.push(i);
                    }
                }
            },
            selectarea(obj){
                /*把选择对象放到零时变量中*/
                this.mask_1 = layer.open({
                    type: 1,
                    title: '选择区域',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['590px' , '420px'],
                    content: $(".activearea")
                });
            },
            update(obj,e,_index){
                $(".update").attr("disabled",true);
                $(e.target).removeAttr("disabled");

                  var that = this;
                this.temp_items = [];
                this.temp_items = obj;

                layer.confirm('您确定要添加吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    layer.close(index);
                    that.getRelationship();
                    $(".update_"+_index).show();
                    $(".show_"+_index).hide();
                    $("input[type='checkbox']").attr("disabled","true");
                    $(".update").attr("disabled",true);
                    $(e.target).removeAttr("disabled");
                }, function(){});
            },
            /*修改或者批量修改我的报价*/
            updateMethos(params,num,obj){
                var that = this;
                $.ajax({
                    url:config.API_BASE+"/4s/offer/batchAddCarPrice",
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
                            layer.msg("添加成功");
                            if(num == 1){
                                that.arr_items.$remove(obj);
                                that.count--;
                                $(".update,input[type='checkbox']").removeAttr("disabled");
                            }else{
                                that.checkedIndex

                                window.history.go(0);
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
            save(obj,e,index){
                var discount_  =$(".discount_"+index).val()!=""?$(".discount_"+index).val():0;
                if(parseInt(obj.price) < parseInt(discount_)){
                    layer.msg("优惠价小于等于官方价！",{icon:2})
                    return;
                }

                if($(".stock_"+index).val()==""||$(".stock_"+index).val()<0){
                    layer.msg("库存/辆不能为空且大于等于0！",{icon:2})
                    return;
                }
                if($(".onWay_"+index).val()==""||$(".onWay_"+index).val()<0){
                    layer.msg("在途/辆不能为空且大于等于0！",{icon:2})
                    return;
                }

                if(this.items.areas.length<=0){
                    layer.msg("请选择区域",{icon:2});
                    return;
                }

                var query = {};
                query.carId = this.temp_items.carId;
                query.exteriorColorId = this.temp_items.exteriorColorId;
                query.interiorColorId = this.temp_items.interiorColorId;
                query.price = this.temp_items.price;
                query.stock =$(".stock_"+index).val();
                query.onWay=$(".onWay_"+index).val();
                query.discount =discount_;
                query.lowPrice =$(".lowPrice_"+index).val()!=""?$(".lowPrice_"+index).val():obj.price;
                query.userId = config.USERID();
                query.areas = this.items.areas;

                var arr = [];
                arr[0] = query;
                var params = {"query":arr};
                var that = this;
                layer.confirm('确定该款车<strong style="color:red;">优惠：' + discount_ + '元</strong>吗？', {
                    title: '提示',
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    that.updateMethos(params,1,that.temp_items);
                    /*修改弹框初始化*/
                    that.removeAll();
                    that.selectedKey = "0";
                    that.city_items = [];
                    that.items.areas = [];
                }, function () {
                    $(".update_"+index).hide();
                    $(".show_"+index).show();
                    $(".update,input[type='checkbox']").removeAttr("disabled");
                });

//                this.arr_items.$remove(this.temp_items);
            },
            cancle(_index){
                $(".update_"+_index).hide();
                $(".show_"+_index).show();
                $(".update,input[type='checkbox']").removeAttr("disabled");

                /*修改弹框初始化*/
                this.removeAll();
                this.selectedKey = "0";
                this.city_items = [];
                this.items.areas = [];
            },
            removeAll(){
                $("#selectedKey").removeAttr("disabled");
                $("#global").removeClass("selected");
                this.global = false;
            },
            removeCity(obj){
                /*判断是否是直辖市*/
                if(obj.city == obj.province){

                    if(this.provincecity[obj.city].length>1){
                        /*total*/
                        obj.total = this.provincecity[obj.city].length;
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
                        if(this.city_items[0].total == 1){
                            /*total 先不设置*/
                            this.city_items.$set(0,{province:this.city_items[0].province,city:this.city_items[0].city,total:this.city_items[0].total,selected:true})

                            for(var i = 1; i<this.city_items.length;i++){
                                this.city_items.$set(i,{province:this.city_items[i].province,city:this.city_items[i].city,selected:false});
                            }

                        }
                    }

                }
            },
            selectAllClk(){
                this.getRelationship(null);
                this.global = true;
                $("#selectedKey").find("option[value=0]").attr({"selected":true});
                $("#selectedKey").attr({"disabled":true});
                $("#global").addClass("selected");
            },
            selectedProvinces(){
                this.city_items = this.provincecity[this.selectedKey];

                if(this.city_items!=undefined && this.city_items.length>1){

                    if(this.city_items[0].insert == undefined){
                        this.city_items.splice(0,0,{"province":this.selectedKey,"city":this.selectedKey,"insert":true});
                    }
                    var total = this.city_items.length;
                    for(var i = 1; i<this.city_items.length;i++){
                        /*剔除已选择过的*/
                        if(this.city_items[i].selected == true){
                            total =total-1;
                        }
                    }

                    this.city_items.$set(0,{province:this.city_items[0].province,city:this.city_items[0].city,selected:this.city_items[0].selected,total:total,"insert":true});
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
            cancle1(){
                layer.close(this.mask_1);
            },
            save2(){
                var that = this;
                if(parseInt(that.temp_arr[0].price) < parseInt(this.temps.discount)){
                    layer.msg("优惠价小于等于官方价！",{icon:2})
                    return;
                }

                if(this.items.areas.length<=0){
                    layer.msg("请选择区域",{icon:2});
                    return;
                }
                var arr = [];
                for (var i = 0;i<that.temp_arr.length; i++){
                    var query = {};
                    query.carId = that.temp_arr[i].carId;
                    query.exteriorColorId = this.temp_arr[i].exteriorColorId;
                    query.interiorColorId = this.temp_arr[i].interiorColorId;
                    query.price = this.temp_arr[i].price;
                    if(i==0){
                        if($(".stocks_"+i).eq(0).val() == "" || $(".stocks_"+i).eq(0).val()<0){
                            layer.msg("库存/辆不能为空且大于等于0",{icon:2});
                            return ;
                        }
                        query.stock = $(".stocks_"+i).eq(0).val();

                        if($(".onWays_"+i).eq(0).val() == "" || $(".onWays_"+i).eq(0).val()<0){
                            layer.msg("在途/辆不能为空且大于等于0",{icon:2});
                            return ;
                        }
                        query.onWay= $(".onWays_"+i).eq(0).val();
                    }else{
                        if($(".stocks_"+i).eq(1).val() == "" || $(".stocks_"+i).eq(1).val()<0){
                            layer.msg("库存/辆不能为空且大于等于0",{icon:2});
                            return ;
                        }
                        query.stock = $(".stocks_"+i).eq(1).val();

                        if($(".onWays_"+i).eq(1).val() == "" || $(".onWays_"+i).eq(1).val()<0){
                            layer.msg("在途/辆不能为空且大于等于0",{icon:2});
                            return ;
                        }
                        query.onWay= $(".onWays_"+i).eq(1).val();
                    }
                    query.discount = this.temps.discount=="" ? 0 :this.temps.discount;
                    query.lowPrice = this.temps.lowPrice == "" ? that.temp_arr[0].price : this.temps.lowPrice;
                    query.userId = config.USERID();
                    query.areas = this.items.areas;
                    arr.push(query);
                }
                var params = {"query":arr};
                layer.confirm('确定该款车<strong style="color:red;">优惠：' + that.temps.discount + '元</strong>吗？', {
                    title: '提示',
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    that.updateMethos(params,2,null);
                    /*修改弹框初始化*/
                    that.removeAll();
                    that.selectedKey = "0";
                    that.city_items = [];
                    that.items.areas = [];
                }, function () {
                    /*window.history.go(0);*/
                });
            },
            cancle2(){
                layer.close(this.mask_3);
                /*修改弹框初始化*/
                this.removeAll();
                this.selectedKey = "0";
                this.city_items = [];
                this.items.areas = [];
            },
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
    select{
        display: inline-block;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0 10px;
        margin-left: 10px;
        outline: none;
    }
    .selected{
        color: #fa8c35!important;
        border: 2px solid #fa8c35!important;;
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
        margin:0 auto;
    }
    .table-box table{
        width: 100%;
        border:1px solid #e5e5e5;
        margin-top:20px;
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
    .car-selected{
        width:30px;
    }
    .car-model{
        width:60px;
    }
    .car-style{
        width:160px;
    }
    .car-out-color{
        width:64px;
    }
    .car-int-color{
        width:64px;
    }
    .car-com-pri{
        width:80px;
    }
    .car-com-pri a{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDExNTQ0Mjg3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDExNTQ0Mjc3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz45a21hAAABeElEQVR42mL8+vUrAxi8/8G46CrLgcdMDz8xAbmK/P8c5f5Fa/4R5PgPUcAIUbr7AXPtUdavvxi1RP5pC/8Dilx9y3TtDRM3K0OzzS9Xhb9QpUB1RfvZVAX/tdr+1gSrg4Brb5lqDrPefs/U5whSzfjk7TfPNRySPP+WeP8EmgEEdz8wMjMxKPCB7P32myF6K/vzL0zbQn4wLb3O8vU3Q6f9b4g6IGg5ztZ4lA3C5mIFSQEVLL7KwrL/EZO2yD81QYS9f/8zIAOglI7oP6B3me5/ZFIX+seAFwBVP/jIxIIpYSX1F1OQlZmBBRh+N98xIYvGaP1lYUJxxK33TDI8/5iA4Xz1DROQA5coP8RafIANWd2V10z2sv8YH7/95rWGQ47v3wLPn1zYAithO/ujT+DAEuL4D4yP62+ZYrexA0mgtLLAf4g6uCBQAVAZNGJ3ASP2CBvQDGC4QAIOYi/QnhbkiEVLLsDgYwU6gP+fncy/GC1EcgEIMACUlbe8VOWw1wAAAABJRU5ErkJggg==) no-repeat;
        display:inline-block;
        width:14px;
        height:14px;
        vertical-align:-2px;
        margin-left:2px;
        position:relative;
    }
    .car-com-pri a .prompt-mes{
        width: 257px;
        height: 52px;
        line-height:52px;
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAzCAYAAAB469bRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUJCNUQxQUQ2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUJCNUQxQUM2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTI2Y2JjZmYtYTdjOS1lOTQwLTg0MjctOWIyZWU3MjZhZGVkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmpyUH8AAALGSURBVHja7Nk7aFNRHIDxc2MSoVHakHSIiLSrOIm0DjoKLh06qIP4LirtIMUOPpBaOigIYsEOHSwupaIiPit0EHwgVexgQWtBcLDmaozNTWieTXI9fzkKiqir934/OG3SpMtJznfPSYKNLW0BpZQMywwA3ufKCOofwdmnN8vMB+A/EoCQ3EgkEswG4CO2bX/b+geZCsCfvp//Afg0AAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAABQKqhHXW7Yts1seEwsFlPhcPifnuu6rkqn06parTJxPmI1trRF9O8Veiw3QYAHdnajQwNbNm1cPxyPx61A4O8bPcdx1Pv55I3NHfuOmYuCyzR6mpS+LAGQS0TILH6OBB6Iuh7LJOgPb48Orlm9am80Gv3jP+TzeZVKfX7d1Xu6c/rlrGPeHATA2yTy1aB5seVOxbx58P+TACwdOjo4MD5ydoM+BqyLRCK/fWKlUlFONpu9emvyoF78X/SfinrUCIDnyevrWnL2g7c0tbYHzK6u4fiRA2t3be+439wcXxkKhX6+BNTrcu6vT72Y6drdc/KObAakCc67ZzVm0SdnRabAe/QCrpudXenM0KW5V3NvT8gZ/9fYZzIZNZ/8eFEv/glz5V8yu0EQAHjgjCcLurhtf9+1T6n0uN7p/3gwl8uphYzzuHNP7zl9t2COgDUdD7aEBAAe2AW45iwvC7vY13/+lD7rvykUCqpUKinHyX64MDLWk80tLurHyyx+AgDvRqA8NT2zcHfyUbde+EW99S8/ePL88Nj1e0k5JshxwRwb4DN8COgDTa3t8q2AfN3bMHFleGfAssJbd3RfNlt/ufrXufr701cBBgD4S+1csLBSwAAAAABJRU5ErkJggg==);
        position:absolute;
        top:-50px;
        left:-118px;
        display:none;
    }
    .car-com-pri a:hover  .prompt-mes{
        display:block;
    }
    .car-off-pri{
        width:80px;
    }
    .car-last-pri{
        width:80px;
    }
    .car-stock{
        width:50px;
    }
    .car-way{
        width:50px;
    }
    .car-place{
        width:80px;
    }
    .car-operation{
        width:80px;
    }
    .car-operation a{
        display:block;
    }
    .car-operation a:hover{
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
        background: url('../../assets/img/close_1.png') no-repeat;
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
</style>
