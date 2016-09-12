<template>
    <div class="table">
        <table>
            <thead>
            <tr>
                <th>
                    车型
                </th>
                <th>
                    车款
                </th>
                <th>
                    外观颜色
                </th>
                <th>
                    内饰颜色
                </th>
                <th>
                    官方价/元
                    <em> ! </em>
                    <div class="popup">
                        <h3>如您对官方价有疑问，请致电400-138-0808。</h3>
                    </div>
                </th>
                <th>
                    优惠价/元
                </th>
                <th>
                    活动时间
                </th>
                <th>
                    库存/辆
                </th>
                <th>
                    销售区域
                </th>
                <th>
                    状态
                </th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in arr_items" v-if="$index<pagesize">
                <td>{{item.car_model_name}}</td>
                <td>{{item.car_name}}</td>
                <td>{{item.exterior_color_name}}</td>
                <td>{{item.interior_color_name}}</td>
                <td>{{item.auth_price}}</td>
                <td>{{item.special_price}}</td>
                <td>
                    <p>{{item.start_date}}</p>
                    <p>{{item.endTimer}}</p>
                </td>
                <td>{{item.number}}</td>
                <td>{{item.sales_area}}</td>
                <td>
                    <p v-if="item.status==1">审核中</p>
                    <p v-if="item.status==2">未开始</p>
                    <p v-if="item.status==3">在售</p>
                    <p v-if="item.status==4">停售</p>
                    <p v-if="item.status==5">过期</p>
                    <p v-if="item.status==6">审核失败</p>
                </td>
                <td v-if="stats>0">
                    <a v-on:click="update(item)">修改</a>
                    <a v-link="{path:'/u/active/thisShop/1'}">历史</a>
                    <a v-on:click="del(item,$index)">删除</a>
                </td>
            </tr>
            <tr  v-if="arr_items.length<=0">
                <td colspan="11">
                    <div class="order-nodata">
                        <h4><i class="order-nobg"></i>抱歉，暂无相关信息！</h4>
                        <p>您可进入 <a v-link="{ path:'/u/manage'}" style="display: inline-block">报价管理</a> 页面更新底价信息</p>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="activeinfo" style="display: none;">
        <div class="layer_1">
            <dl class="clearfix">
                <dt>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</dt>
                <dd>奥迪</dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
                <dd>A1</dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款：</dt>
                <dd>2016款 30 FSL 舒适型</dd>
            </dl>
            <dl class="clearfix">
                <dt>外观颜色：</dt>
                <dd>黑色</dd>
                <dt>内饰颜色：</dt>
                <dd>灰色</dd>
            </dl>
            <dl class="clearfix">
                <dt>市&nbsp;&nbsp;场&nbsp;&nbsp;价：</dt>
                <dd>{{items.market}}元</dd>
            </dl>
            <dl class="clearfix">
                <dt>特&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</dt>
                <dd style="position: relative">
                    <input type="text" name="offer" v-model="items.offer"><em>元</em>
                </dd>
                <dd v-if="items.offer_" class="error"> <i></i>{{items.offer_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>活动时间：</dt>
                <dd>
                    <input type="text" id="start-date" v-model="items.start_date" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
                    至
                    <input type="text" id="end-date" v-model="items.end_date" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
                </dd>
                <dd v-if="items.timer_" class="error"> <i></i>{{items.timer_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>活动数量：</dt>
                <dd style="position: relative"><input type="number" name="number" v-model="items.number"> <em>辆</em></dd>
                <dd v-if="items.number_" class="error"><i></i>{{items.number_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>销售区域：</dt>
                <dd style="display: inline-block;height: 100%;width: 550px;">
                    <ul id="areas_" class="clearfix">
                        <li v-for="city in city_items | filterBy 'true' in 'selected'" track-by="$index">{{city.name}}</li>
                        <ul v-for="items in city_items">
                            <li v-for="city in items.city | filterBy 'true' in 'selected'" track-by="$index">{{city.name}}</li>
                        </ul>
                        <a href="javascript:;;" v-on:click="selectarea" class="a_style">选择区域</a>
                    </ul>
                </dd>
                <dd v-if="items.selectarea_"  class="error">
                    <i></i>
                    {{items.selectarea_msg}}
                </dd>
            </dl>
            <dl class="clearfix" style="position: relative;">
                <dt>活动图片：</dt>
                <dd>
                    <a class="upload-img a_style"  href="javascript:;;">
                        <label for="upload-file">上传文件</label>
                    </a>
                    <input type="file"  name="upload-file" id="upload-file" v-on:change="uploadfile($event)">
                    <span class="file_value">{{items.file_value}}</span>
                </dd>
                <dd v-if="items.file_"  class="error">
                    <i></i>{{items.file_msg}}
                </dd>
                <dd>
                    （图片尺寸不小于800*360px）
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>活动说明：</dt>
                <dd style="display: inline-block;width: 576px;height: 210px;">
                    <textarea name="desc" v-model="items.desc" cols="68" rows="8" placeholder="填写相关活动说明~" style="padding: 5px;text-indent: 2em;"></textarea>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button v-on:click="save">保存</button>
                    <button>取消</button>
                </dd>
            </dl>
        </div>
    </div>
    <div class="activearea" style="display: none;">
        <div class="layer_2">
            <dl class="clearfix">
                <dt>已选区域：</dt>
                <dd style="display: inline-block;width: 500px;height: 100%;">
                    <ul>
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
                        <li>全国</li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <select v-model="selectedKey" v-on:change="selectedProvinces">
                        <option value="0" selected>==请选择==</option>
                        <option v-for="province in provinces" v-bind:value="province">{{province}}</option>
                    </select>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd style="width: 500px;height: 100%;" class="city_dd">
                    <ul>
                        <!--<li v-for="province in city_items_province"-->
                            <!--v-on:click="cityClk(province,$index,$event,0)"-->
                            <!--:class="{'selected':province.selected==true}">-->
                            <!--{{province.name}}-->
                        <!--</li>-->
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
                    <button>取消</button>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import sub_zebra from './../../assets/js/sub_zebra.js'
    import Zebra_DatePicker from './../../assets/js/zebra_datepicker.src.js'
    import $ from 'jquery'
    import config from './../../config'
//    import  ActiveInfo from './ActiveInfo.vue'
    export default {
        props: {
            stats: Number,
            judge: Boolean,
            idx: String,
            explain: String,
            pagesize: Number,
            arr_title: {
                type: Array,
                default: ()=>[]
            },
            arr_items: {
                type: Array,
                default: ()=>[]
            }
        },
//        components:{
//            ActiveInfo
//        },
        ready(){
            var _this = this;

            $.get("/data/newcity.json",function (response) {
                var list = response.data;
                _this.provinces = list.provinces;
                _this.provincecity = list.provincecity;
            });

            $('#start-date').Zebra_DatePicker({
                direction: [false,new Date()],
                pair: $('#end-date'),
                format: 'Y-m-d',
                onSelect:function(){
                    $("#end-date").val("");
                }
            });

            $('#end-date').Zebra_DatePicker({
                direction: [true, new Date()],
            });
        },
        data(){
            return {
                items:{
                    market:458500.00,
                    offer:"",
                    offer_:false,
                    offer_msg:"",
                    start_date:"",
                    end_date:"",
                    timer_:false,
                    timer_msg:"",
                    number:"",
                    number_:false,
                    number_msg:"",
                    selectarea_:false,
                    selectarea_msg:"",
                    file_value:"",
                    file_:false,
                    file_msg:"",
                    desc:"",
                },
                _index:"",
                selectedKey:"",
                provinces:"",
                provincecity:"",
                city_items:[]
            }
        },
        methods:{
            update(obj){
                var info= layer.open({
                    type: 1,
                    title: '活动详情修改',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['750px' , '800px'],
                    content: $(".activeinfo")
                });
            },
            del(obj,_index){
                var that = this;
                layer.confirm('确定删除该活动吗？', {
                    title:'删除活动',
                    btn: ['确定','取消'] //按钮
                }, function(){
                    var ii = layer.load();
                    var url = config.API_BASE+"	/4s/special/delete/"+obj.id;
                    $.ajax({
                        url: url,
                        method: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        beforeSend:function (request) {
                            request.setRequestHeader("sessionid",config.SESSIONID);
                        },
                        success:function (request) {
                            /*TODO 缺少一个交互*/
                            that.arr_items.$remove(obj);

                            if(request.code == 0){
                                layer.msg('删除成功', {icon: 1});
                            }
                            layer.close(ii);
                        },error:function (fail) {
                            if(fail.status == "401"){
                                layer.msg('登录失效，请重新登陆！');
                                that.$route.router.go("/login");
                            }
                        }
                    });

                }, function(){
                    layer.msg('取消操作');
                });
            },
            selectarea(){
                var index = layer.open({
                    type: 1,
                    title: '选择区域',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['650px' , '600px'],
                    content: $(".activearea")
                });
            },
            uploadfile(e){
                var reader = new FileReader();
                reader.onload = function(e) {
                    var result = e.target.result;
                };
                var that = e.target;
                var filesType = that.files[0].type;
                if(filesType == "image/jpeg" || filesType == "image/jpg" || filesType == "image/png" || filesType == "image/gif" ){
                    if(that.files[0].size/1024>=10){
                        layer.msg('上传图片过大', {icon: 7});
                        that.files = {};
                    }else {
                        this.items.file_value = that.files[0].name;
                        reader.readAsDataURL(that.files[0]);
                        that.files = {};
                    }
                }else{
                    layer.msg('暂不支持该格式', {icon: 7});
                    that.files = {};
                }
            },
            save(){
                var items = this.items;
                if(items.offer == "" ||items.offer>items.market){
                    items.offer_ = true;
                    items.offer_msg="低价不可高于市场价";
                }else{
                    items.offer_ = false;
                }

                if(items.number == "" || items.number<=0){
                    items.number_ = true;
                    items.number_msg = "数量不小于1";
                }else{
                    items.number_ = false;
                }

                if(items.start_date == "" && items.end_date == ""){
                    items.timer_ = true;
                    items.timer_msg="结束时间不可早于开始时间";
                }else{
                    items.timer_ = false;
                }

                if(items.citys.length<=0){
                    items.selectarea_ = true;
                    items.selectarea_msg = "请选择区域";
                }else{
                    items.selectarea_ = false;
                }

                if(items.file_value==""){
                    items.file_=true;
                    items.file_msg = "请上传头像";
                }else{
                    items.file_=false;
                }

                layer.alert('已提交，正在审核中...<br/> 您可在本页面查看审核状态', {icon: 1,title:'完成修改'});
            },
            cityClk(obj,_index){
                console.log(_index);
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
                    console.log("选中的："+JSON.stringify(this.city_items[_index]));
                }else{

                    if(obj.selected == undefined || obj.selected == "undefined"){
                        this.city_items.$set(_index,{province:obj.province,city:obj.city,selected:true});
                        this.city_items[0].total =this.city_items[0].total-1;
                        console.log(this.city_items[0].total);
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

                    var total = this.city_items.length-1;

                    for(var i = 1; i<this.city_items.length;i++){
                        /*剔除已选择过的*/
                        if(this.city_items[i].selected == true){
                            total =total-1;
                        }
                    }

                    if(this.city_items[0].insert == undefined){
                        console.log("jinlaile");
                        this.city_items.splice(0,0,{"province":this.selectedKey,"city":this.selectedKey,"insert":true});

                    }

                    this.city_items.$set(0,{province:this.city_items[0].province,city:this.city_items[0].city,selected:this.city_items[0].selected,total:total,"insert":true});
                    console.log("第一次："+ JSON.stringify(this.city_items[0]));
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
                        console.log("rem:"+JSON.stringify(this.provincecity[obj.city]));
                    }else{
                        obj.selected = 'undefined';
                    }

                }else{
                    obj.selected = 'undefined';
                }
            },
            agree(){

            }
        }

    }
</script>

<style scoped>
    @import "./../../assets/css/datepicker.css";

    table {
        width: 100%;
        border: 1px solid #ccc;
    }

    table thead tr th {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
        background: #f1f2f3;
        color: #000000;
    }

    table thead tr th em {
        display: inline-block;
        width: 18px;
        height: 18px;
        color: #0a8ddf;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        -ms-border-radius: 10px;
        -o-border-radius: 10px;
        border-radius: 10px;
        border: 1px solid #0a8ddf;
        vertical-align: middle;
        cursor: pointer;
    }

    table thead tr th em ~ div {
        display: none;
    }

    em:hover ~ div {
        display: block;
    }

    table tbody tr:hover {
        background: #fff5ef;
        cursor: pointer;
    }

    table tbody tr td {
        border: 1px solid #ccc;
        text-align: center;
        padding: 20px 5px;
    }

    table tbody tr td a {
        display: block;
    }

    table tbody tr td a:hover, table tbody tr td a:active {
        color: #eb7350;
    }

    .table {
        position: relative;
        margin: 10px 0px;
    }

    .popup {
        position: absolute;
        top: -38px;
        left: 30%;
        background-image: url("../../assets/img/popup.png");
        width: 256px;
        height: 51px;
        background-size: 100% 100%;
    }

    .popup h3 {
        color: #999;
        line-height: 42px;
        display: inline-block;
        text-align: center;
        margin-left: 4px;
    }
    div.activeinfo {
        display: inline-block;
        padding: 20px;
        font-size: 16px;
    }

    .error{
        color: red;
    }
    .selected{
        color: #fa8c35!important;
        border: 2px solid #fa8c35!important;;
    }
    div dl {
        margin: 10px 0;
    }

    div dl dt, div dl dd {
        float: left;
        height: 35px;
        line-height: 35px;
    }
    div.layer_1 dl dt:nth-child(n+2){
        margin-left: 60px;
    }

    div dl dt {
        display: inline-block;
        width: 80px;
        text-align: right;
    }

    div dl dd {
        margin-left: 20px;
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
    .a_style{
        border: 1px solid #ff791f;
        color: #ff791f;
        background: #ffe5d3;
        padding: 4px 8px;
        border-radius: 4px;
    }

    .layer_2 ul li {
        /*margin: 10px ;*/
        position: relative;
        border: 2px solid #ccc;
        background:#FFF;
        color: #ccc;
        display: inline-block;
        width: 100px;
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
        background-image: url(/img/ico_warn.png);
        background-repeat: no-repeat;
        background-position: -82px 4px;
        background-size: 300px 150px;
    }

</style>