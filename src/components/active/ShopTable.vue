<template>
    <div class="table table-box">
        <table>
            <thead>
                <tr>
                    <th class="car-model">
                        车型
                    </th>
                    <th class="car-style">
                        车款
                    </th>
                    <th class="car-out-color">
                        外观颜色
                    </th>
                    <th class="car-int-color">
                        内饰颜色
                    </th>
                    <th class="car-com-pri">官方价/元
                        <a class="prompt">
                            <div class="prompt-mes">如您对官方有疑问，请致电 400-138-0808</div>
                        </a>
                    </th>
                    <th class="car-off-pri">
                        特价/元
                    </th>
                    <th class="car-place">
                        活动时间
                    </th>
                    <th class="car-stock">
                        库存/辆
                    </th>
                    <th class="car-place">
                        销售区域
                    </th>
                    <th  class="car-operation">
                        状态
                    </th>
                    <th class="car-way">操作</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="item in arr_items" v-show="$index < pagesize">
                <td>{{item.car_model_name}}</td>
                <td>{{item.car_name}}</td>
                <td>{{item.exterior_color_name}}</td>
                <td>{{item.interior_color_name}}</td>
                <td>{{item.auth_price}}</td>
                <td>{{item.special_price}}</td>
                <td>
                    <p>{{item.start_date}}</p>
                    <p>至</p>
                    <p>{{item.end_date}}</p>
                </td>
                <td>{{item.number}}</td>
                <td>{{item.sales_area}}</td>
                <td>
                    <p v-if="item.status == 1" class="status_review">审核中</p>
                    <p v-if="item.status == 2" class="status_unbegin">未开始</p>
                    <p v-if="item.status == 3" class="status_suc">在售</p>
                    <p v-if="item.status == 4" class="status_fail">停售</p>
                    <p v-if="item.status == 5" class="status_fail">过期</p>
                    <p v-if="item.status == 6" class="status_fail">审核失败</p>
                </td>
                <td v-if="stats > 0">
                    <a href="#" v-if="item.status == 3" @click.prevent="stop(item,$index)">停售</a>
                    <a href="#" v-if="item.status == 4" @click.prevent="goto(item,$index)">在售</a>
                    <a href="#" v-if="item.status == 2 || item.status == 4 || item.status == 6" @click.prevent="update(item,$index)">修改</a>
                    <a href="#" v-if="item.status == 2 || item.status == 5 " @click.prevent="del(item,$index)">删除</a>
                    <!--<a v-link="{path:'/u/active/thisShop/1'}">历史</a>-->
                </td>
            </tr>
            <tr  v-if="arr_items.length <= 0">
                <td colspan="11">
                    <div class="order-nodata">
                        <h4><i class="order-nobg"></i>抱歉，暂无相关信息！</h4>
                        <p>您可进入 <a v-link="{ path:'/u/active/add'}" style="display: inline-block">新增活动</a> 页面更新底价信息</p>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="activeinfo" style="display: none;">
        <div class="layer_1">
            <dl class="clearfix spe">
                <dt>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</dt>
                <dd v-text="items.brandName"></dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
                <dd v-text="items.carModelName"></dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款：</dt>
                <dd v-text="items.carName"></dd>
            </dl>
            <dl class="clearfix spe">
                <dt>外观颜色：</dt>
                <dd v-text="items.exteriorColorName"></dd>
                <dt>内饰颜色：</dt>
                <dd v-text="items.interiorColorName"></dd>
            </dl>
            <dl class="clearfix">
                <dt>市&nbsp;&nbsp;场&nbsp;&nbsp;价：</dt>
                <dd>{{items.price}}元</dd>
            </dl>
            <dl class="clearfix">
                <dt>特&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</dt>
                <dd style="position: relative">
                    <input type="text" name="offer" v-model="items.special_price"><em>元</em>
                </dd>
                <dd v-if="items.offer_" class="error"> <i></i>{{items.offer_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>活动时间：</dt>
                <dd>
                    <input type="text" id="start-date" v-model="items.start_date" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
                    至
                    <input type="text" id="end-date"  class="end-date" v-model="items.end_date" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
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
                <dd>
                    <div class="clearfix sales-area j_salesArea">
                        <span v-for="city in items.areas" track-by="$index">{{city.sales_area_name}}</span>
                        <a href="javascript:;;" @click="selectarea" class="a_style">选择区域</a>
                    </div>
                </dd>
                <dd v-if="items.selectarea_"  class="error">
                    <i></i>
                    {{items.selectarea_msg}}
                </dd>
            </dl>
            <dl class="clearfix" style="position: relative;">
                <dt>活动图片：</dt>
                <dd>
                    <form enctype="multipart/form-data">
                        <div>
                            <a class="upload-img a_style"  href="javascript:;">
                                <label for="upload-file" style="cursor: pointer;">上传文件</label>
                            </a>
                            （图片尺寸不小于800*360px）
                        </div>
                        <div class="fileInner">
                            <input type="file"  name="upload-file" id="upload-file" @change="uploadfile($event)">
                            <div class="imgbox"><img :src="items.file_img" alt=""/></div>
                        </div>

                        <p class="file_value">{{items.file_value}}</p>

                    </form>
                </dd>
                <dd v-if="items.file_"  class="error">
                    <i></i>{{items.file_msg}}
                </dd>

            </dl>
            <dl class="clearfix">
                <dt>活动说明：</dt>
                <dd>
                    <textarea name="desc" v-model="items.desc" cols="64" rows="8" placeholder="填写相关活动说明~" ></textarea>
                </dd>
            </dl>
            <div class="btn-box">
                <button @click="save" class="btn-confirm">确定</button>
                <button @click="cancle" class="btn-cancle">取消</button>
            </div>

        </div>
    </div>
    <div class="activearea" style="display: none;">
        <div class="layer_2">
            <dl class="clearfix">
                <dt>已选区域：</dt>
                <dd>
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

            <dl class="clearfix optional-area">
                <dt>可选区域：</dt>
                <dd>
                    <div class="line"></div>
                    <ul class="clearfix">
                        <li v-on:click="selectAllClk" class="btn-global" id="global">全国</li>
                    </ul>
                </dd>
                <dd>
                    <select v-model="selectedKey" id="selectedKey" v-on:change="selectedProvinces">
                        <option value="0" selected>--- 请选择 ---</option>
                        <option v-for="province in provinces" v-bind:value="province">{{province}}</option>
                    </select>
                </dd>
                <dd class="city_dd">
                    <ul v-if="!global" class="clearfix">
                        <li v-for="city in city_items" v-on:click="cityClk(city, $index)"
                            class="city_li" :class="{'selected':city.selected==true, 'no-slt': city.nosel == true}">
                            {{city.city}}
                        </li>
                    </ul>
                    <div class="line"></div>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <div class="btn-box">
                        <button @click="agree" class="btn-confirm G_btn_a">确定</button>
                        <button @click="cancle1" class="btn-cancle G_btn_c">取消</button>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script scoped>
    import sub_zebra from './../../assets/js/sub_zebra.js'
    import Zebra_DatePicker from './../../assets/js/zebra_datepicker.src.js'
    import $ from 'jquery'
    import config from './../../config'
    import util from './../../util/util'
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
        ready(){
        $('#start-date').Zebra_DatePicker({
            direction: true,
            pair: $('#end-date'),
            format: 'Y-m-d',
            onSelect:function(){
                $("#end-date").val("");
            }
        });

        $('#end-date').Zebra_DatePicker({
            direction: 1
        });
        },
        data(){
            return {
                items:{
                    brandName:"",
                    carModelName:"",
                    carName:"",
                    interiorColorName:"",
                    exteriorColorName:"",
                    price:"",
                    special_price:"",
                    offer_:false,
                    offer_msg:"",
                    start_date:"",
                    end_date:"",
                    timer_:false,
                    timer_msg:"",
                    number:"",
                    number_:false,
                    number_msg:"",
                    areas:[],
                    selectarea_:false,
                    selectarea_msg:"",
                    file_src:"",
                    file_img:"",
                    file_value:"",
                    file_:false,
                    file_msg:"",
                    desc:""
                },
                _index:"",
                selectedKey:"",
                provinces:"",
                provincecity:"",
                clone_provincecity:"",
                city_items:[],
                global:false,
                mask_1:"",
                mask_2:"",
                rem_item:[],
                temp_items:{},
                temp_index:""
            }
        },
        methods:{
            /*
            *
            * 状态说明
            * 1:审核中 2:未开始 3:在售 4:停售 5:过期 6:审核失败
            *
            * */

            getRelationship(obj){
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
                        that.$set("provinces", list.provinces);
                        that.$set("provincecity", list.provincecity);
                        that.$set("clone_provincecity", list.provincecity);
                        if(obj !== null){
                            that.getSaleAreaByArray(obj);
                        }
                    },
                    error:function (fail) {
                        if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            util.login();
                        }
                    }
                });
            },
            updateCarActivityStatus(obj, status, _index){
                var that = this;
                var ii = layer.load();
                var query = {};
                query.id = obj.id;
                query.user_id = config.USERID();
                query.status = status;
                var params = {"query": query};

                $.ajax({
                    url: config.API_BASE + "/4s/activity/updateCarActivityStatus/",
                    method: "POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data: JSON.stringify(params),
                    beforeSend: function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success: function (response) {
                        layer.close(ii);
                        if(response.code==0){
                            that.arr_items[_index]['status'] = status;
                            layer.msg('完成修改');
                        }
                    },
                    error: function (fail) {
                        if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            util.login();
                        }
                    }
                })
            },
            /*
            * 改变状态为停售
            * @method stop
            * @param {Object} obj:当前数据对象
            * @param {Number} index: 当前索引
            * */
            stop(obj, index){
                var that = this;
                layer.confirm('您确定要停售吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    that.updateCarActivityStatus(obj, 4, index);
                }, function(){
                });

            },
            goto(obj,_index){
                var that = this;
                layer.confirm('您确定要在售吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    that.updateCarActivityStatus(obj,3,_index);
                }, function(){
                });

            },
            getSaleAreaByArray(obj){
                var that = this;
                that.rem_item = obj;
                that.items.areas = [];
                that.items.id = obj.id;
                that.items.brandName = obj.brand_name;
                that.items.carModelName = obj.car_model_name;
                that.items.car_id = obj.car_id;
                that.items.carName = obj.car_name;
                that.items.price = obj.auth_price;
                that.items.special_price = obj.special_price;
                that.items.interior_color_id = obj.interior_color_id;
                that.items.interiorColorName = obj.interior_color_name;
                that.items.exterior_color_id = obj.exterior_color_id;
                that.items.exteriorColorName = obj.exterior_color_name;
                that.items.number = obj.number;
                that.items.start_date = obj.start_date;
                that.items.end_date = obj.end_date;
                that.items.file_img = obj.car_image;
                that.items.desc = obj.description;
                var str = obj.sales_area;
                var list = str.substring(1,str.length-1).split(",");

                for(var i = 0 ; i< list.length;i++){
                    if(list[i].trim()=="全国"){
                        that.items.areas.push({"sales_area_name":"全国","sales_area_level":"1"})
                        that.global = true;
                        $("#selectedKey").attr({"disabled":true});
                        $("#global").addClass("selected");
                    }else if(list[i].trim().indexOf("省")>=0 || list[i].trim().indexOf("特别行政区")>=0  || list[i].trim()=="北京市" || list[i].trim()=="天津市" || list[i].trim()=="上海市" || list[i].trim()=="重庆市"){
                        that.items.areas.push({"sales_area_name":list[i],"sales_area_level":"2"});
                        var arr = that.provincecity[list[i].trim()];
                        if(arr.length > 1){
                            /* 把省插入到第一的位置 */
                            arr.splice(0,0,{"province":list[i].trim(),"city":list[i].trim(),"insert":true})
                            for(var j =0 ;j <arr.length;j++){
                                if(j == 0){
                                    that.provincecity[list[i].trim()].$set(j,{province:arr[j].province,city:arr[j].city,total:that.provincecity[list[i].trim()].length-1,selected:true,"insert":true});
                                }else{
                                    that.provincecity[list[i].trim()].$set(j,{province:arr[j].province,city:arr[j].city,selected:false});
                                }
                            }
                        }else{
                            arr[0].selected = true;
                            that.provincecity[list[i].trim()].$set(0,{province:arr[0].province,city:arr[0].city,selected:true,insert:true});
                        }
                    }else{
                        that.items.areas.push({"sales_area_name":list[i].trim(),"sales_area_level":"3"})
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
            /*
             * 重新修改选中的特价车数据
             * @method update
             * @param {Object} obj: 当前数据对象
             * @param {Number} index: 当前索引
             * */
            update(obj, _index){
                this.temp_items = obj;
                this.temp_index = _index;
                var that = this;
                layer.confirm('您确定要修改吗？', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    layer.close(index);
                    that.getRelationship(obj);
                    that.mask_2 = layer.open({
                        type: 1,
                        title: '活动详情修改',
                        skin: 'layui-layer-rim', //加上边框
                        area : ['660px' , '800px'],
                        content: $(".activeinfo"),
                        cancel:function () {
                            /*修改弹框初始化*/
                            that.removeAll();
                            that.selectedKey = "0";
                            that.city_items = [];
                         /*   that.items.areas = [];*/
                        }

                    });
                }, function(){
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
                            request.setRequestHeader("sessionid",config.SESSIONID());
                        },
                        success:function (request) {
                            if(request.code == 0){
                                layer.msg('删除成功', {icon: 1});
                                that.arr_items.$remove(obj);
                            }
                            layer.close(ii);
                        },error:function (fail) {
                            if(fail.status == "401"){
                                sessionStorage.removeItem("SESSIONID");
                                layer.msg('登录失效，请重新登陆！');
                                util.login();
                            }
                        }
                    });

                }, function(){
                    layer.msg('取消操作');
                });
            },
            selectarea(){
                this.mask_1 = layer.open({
                    type: 1,
                    title: '选择区域',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['600px' , '420px'],
                    content: $(".activearea")
                });
            },
            uploadfile(e){
                var _this = this;
                var reader = new FileReader();
                var that = e.target;
                var filesType = that.files[0].type;

                if(filesType == "image/jpeg" || filesType == "image/jpg" || filesType == "image/png" || filesType == "image/gif" ){
                    if(that.files[0].size/1024/1024>=10){
                        layer.msg('上传图片过大');
                        that.files = {};
                    }else {
                        var MAXWIDTH  = 580;
                        var MAXHEIGHT = 230;
                        var img, imgBox = $(that).closest('.fileInner').find('.imgbox');

                        imgBox.html('<img class="imghead">');
                        img = imgBox.find('.imghead').get(0);

                        img.onload = function(){
                            var rect = _this.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                            img.width  =  rect.width;
                            img.height =  rect.height;
                            img.style.marginTop = rect.top+'px';
                        }

                        this.items.file_value = that.files[0].name;
                        reader.onload = function(evt){
                            img.src = evt.target.result;
                            _this.items.file_img = evt.target.result;
                        }
                        reader.readAsDataURL(that.files[0]);
                        that.files = null;
                    }
                }else{
                    layer.msg('暂不支持该格式');
                    that.files = null;
                }
            },
            clacImgZoomParam( maxWidth, maxHeight, width, height ){
                var param = {top:0, left:0, width:width, height:height};
                if( width>maxWidth || height>maxHeight )
                {
                    var rateWidth = width / maxWidth;
                    var rateHeight = height / maxHeight;

                    if( rateWidth > rateHeight )
                    {
                        param.width =  maxWidth;
                        param.height = Math.round(height / rateWidth);
                    }else
                    {
                        param.width = Math.round(width / rateHeight);
                        param.height = maxHeight;
                    }
                }

                param.left = Math.round((maxWidth - param.width) / 2);
                param.top = Math.round((maxHeight - param.height) / 2);
                return param;
            },
            save(){
                var items = this.items;
                if(items.special_price == "" ){
                    items.offer_ = true;
                    items.offer_msg="特价不能为空";
                    return;
                }else if(items.special_price>items.market){
                    items.offer_ = true;
                    items.offer_msg="特价不可高于市场价";
                    return;
                }else{
                    items.offer_ = false;
                }

                if(items.start_date == "" || items.end_date == ""){
                    items.timer_ = true;
                    items.timer_msg="开始时间或结束时间不能为空";
                    return;
                }else if(items.start_date>items.end_date){
                    items.timer_ = true;
                    items.timer_msg="结束时间不可早于开始时间";
                    return;
                }else{
                    items.timer_ = false;
                }

                if(items.number == "" || items.number<=0){
                    items.number_ = true;
                    items.number_msg = "数量不小于1";
                    return;
                }else{
                    items.number_ = false;
                }

                if($(".j_salesArea > span").length <= 0){
                    items.selectarea_ = true;
                    items.selectarea_msg = "请选择区域";
                    return false;
                }else{
                    items.selectarea_ = false;
                }

//                items.file_value=="" ||
                if(items.file_img == "" && items.file_value==""){
                    items.file_=true;
                    items.file_msg = "请上传图片";
                    return;
                }else{
                    items.file_=false;
                }

                var that = this;

                var ii = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
                if($("#upload-file")[0].files[0] !== undefined){
                    var formd = new FormData();
                    formd.append("img",$("#upload-file")[0].files[0]);
                    $.ajax({
                        type: "POST",
                        contentType: false,
                        processData: false,
                        url: config.PHP_API + "/index.php/api/upload_file",
                        data:formd,
                        success: function(data) {
                            if(data.code == 0){
                                that.items.file_img = data.img_url;
                                that.updataActive();
                            }else{
                                layer.msg("保存失败",{icon: 7});
                            }
                            layer.close(ii);
                        }
                        ,error: function(xhr, type){
                        }
                    });
                }else{
                    that.updataActive();
                    layer.close(ii);
                }
            },
            cancle(){
                layer.close(this.mask_2);
                /*修改弹框初始化*/
                this.removeAll();
                this.selectedKey = "0";
                this.city_items = [];
                /*   that.items.areas = [];*/
            },
            updataActive(){
                var that = this;

                var query={};
                    query.id = that.items.id;
                    query.user_id = config.USERID();
                    query.interior_color_id = that.items.interior_color_id;
                    query.exterior_color_id = that.items.exterior_color_id;
                    query.car_image = that.items.file_img;
                    query.car_id = that.items.car_id;
                    query.price = that.items.price;
                    query.special_price = that.items.special_price;
                    query.start_date = dataFilter(that.items.start_date)+" 00:00:01";
                    query.end_date = dataFilter(that.items.end_date)+" 23:59:58";
                    query.number = that.items.number;
                    query.status = "";
                    query.remark = "";
                    query.description = that.items.desc;
                    query.createuser = config.USERID();
                    query.areas = that.items.areas;

                var params = {"query":query};
                function dataFilter(time) {
                    var date = new Date(time);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    return year+"-"+month+"-"+day;
                }
                $.ajax({
                    url: config.API_BASE + "/4s/activity/updateCarActivity/",
                    method: "POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            layer.alert('已提交，正在审核中...<br/> 您可在本页面查看审核状态', {icon: 1,title:'完成修改'});
                            layer.close(that.mask_2);

                            var arr = [];
                            for (var i = 0 ; i<that.items.areas.length;i++){
                                arr.push(that.items.areas[i].sales_area_name);
                            }
                            that.arr_items.$set(that.temp_index, {
                                "id": that.items.id,
                                "auth_price":that.items.price,
                                "car_image":that.items.file_img,
                                "brand_name":that.temp_items.brand_name,
                                "car_model_name":that.temp_items.car_model_name,
                                "car_name":that.temp_items.car_name,
                                "description":that.items.desc,
                                "end_date":that.items.end_date,
                                "exterior_color_id":that.items.exterior_color_id,
                                "exterior_color_name":that.items.exterior_color_name,
                                "interior_color_id":that.items.interior_color_id,
                                "interior_color_name":that.items.interior_color_name,
                                "number":that.items.number,
                                "sales_area":arr,
                                "special_price":that.items.special_price,
                                "start_date":that.items.start_date,
                                "status":1
                            });
                            /*clear*/
                            that.special_price="";
                            that.offer_=false;
                            that.offer_msg="";
                            that.start_date="";
                            that.end_date="";
                            that.timer_=false;
                            that.timer_msg="";
                            that.number="";
                            that.number_=false;
                            that.number_msg="";
                            that.areas=[];
                            that.selectarea_=false;
                            that.selectarea_msg="";
                            that.file_src="";
                            that.file_img="";
                            that.file_value="";
                            that.file_=false;
                            that.file_msg="";
                            that.desc="";

                            /*修改弹框初始化*/
                            that.removeAll();
                            that.selectedKey = "0";
                            that.city_items = [];
                        }
                    },
                    error:function (fail) {
                        if(fail.status == "401"){
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            util.login();
                        }
                    }
                })
            },
            cityClk(obj,_index){
//               /*点击下标是否第一个*/
                if(_index == 0){
//                    /*判断是直辖市*/
                    if(this.city_items.length>1){

                        for(var i =1 ;i < this.city_items.length;i++){
                            this.city_items.$set(i,{province:this.city_items[i].province,city:this.city_items[i].city,selected:false, nosel: true});
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
                                this.city_items.$set(i,{province:this.city_items[i].province,city:this.city_items[i].city,selected:false, nosel: true});
                            }

                        }
                    }

                }
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
                        this.items.areas[0] = {"sales_area_name":"全国","sales_area_level":"1"}
                    }else if(list.eq(i).text().indexOf("省")>=0 || list.eq(i).text().indexOf("特别行政区")>=0  || list.eq(i).text()=="北京市" || list.eq(i).text()=="天津市" || list.eq(i).text()=="上海市" || list.eq(i).text()=="重庆市"){
                        this.items.areas.push({"sales_area_name":list.eq(i).text(),"sales_area_level":"2"})
                    }else{
                        this.items.areas.push({"sales_area_name":list.eq(i).text(),"sales_area_level":"3"})
                    }
                }
            },
            cancle1(){
                layer.close(this.mask_1);
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
            selectAllClk(){
                this.getRelationship();
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
        }

    }
</script>

<style scoped>
    @import "./../../assets/css/datepicker.css";
    .status_suc{
        color: #00c100;
    }
    .status_review{
        color: #0088c3;
    }
    .status_unbegin{
        color: #0088c3;
    }
    .status_fail{
        color: #f40a0a;
    }
    /* Button group */
    .G_btn_a,.G_btn_b,.G_btn_c,.G_btn_d,.G_btn_e{padding:0 10px 0 10px;white-space:nowrap;display:inline-block; border-radius:2px; height:26px;line-height:26px; *line-height:26px; text-decoration:none; font-size:14px; min-width:40px; text-align:center; outline:none; border: none;cursor:pointer;}
    .G_btn_a:hover,.G_btn_b:hover,.G_btn_c:hover,.G_btn_d:hover,.G_btn_e:hover{text-decoration:none;}
    .G_btn_a{background:#ff8140; color:#fff;}
    .G_btn_a:hover{background:#f7671d;}
    .G_btn_b{background:#2194ff;color:#fff;}
    .G_btn_c{background:#ccc;color:#fff;box-shadow: 0px 1px 2px rgba(0,0,0,0.25);}
    .G_btn_c:hover{background:#bbb;}
    .G_btn_d{background:#fff; color:#000; border: 1px solid #B1B1B1;/*box-shadow: 0px 1px 2px rgba(0,0,0,0.25);*/}
    .G_btn_d:hover{background:#ddd;}
    .G_btn_e{background:#FF4242; color:#fff; border:1px solid #F00;/*box-shadow: 0px 1px 2px rgba(0,0,0,0.25);*/}
    .G_btn_e:hover{background:#F00;}
    .G_btn_a_disable, .G_btn_a_disable:hover{
        background: #ffc09f;
        color: #fff;
        border: 1px solid #fbbd9e;
        box-shadow: none;
        cursor: default;
    }
    .G_btn_disabled, .G_btn_disabled:hover{
        color: #FFF;
        background: #aaa;
        cursor: default;
    }
    .btn_22px{display:inline-block;height:20px;line-height:21px; *line-height:20px; min-width:28px;}
    .btn_24px{display:inline-block;height:22px;line-height:23px; *line-height:20px; min-width:28px;}
    .btn_26px{display:inline-block;height:24px;line-height:25px; *line-height:20px; min-width:28px;}
    .btn_28px{display:inline-block;height:26px;line-height:27px; *line-height:20px; min-width:28px;}
    .btn_30px{display:inline-block;height:28px;line-height:29px; *line-height:28px; width:60px; font-size:14px;}
    .btn_32px{display:inline-block;height:32px;line-height:33px; *line-height:32px;font-size:14px;}
    .btn_34px{display:inline-block;height:34px;line-height:35px; padding:0 15px; font-size:14px;}
    .btn_42px{display:inline-block;height:42px;line-height:43px; font-size:14px;}
    .btn_54px{display:inline-block;height:54px;line-height:55px; padding:0 15px; font-size:26px;}
    .btn_100P{display:inline-block;height:42px;line-height:43px; width:100%; font-size:20px;}
    .btn_100P u{text-decoration: none!important;}

    .err{
        background: #FED9D9!important;
        border: 1px solid #FD8080!important;
        color: #8C8C8C!important;
    }
    table thead tr th{
        border: 1px solid #ccc;
        text-align: center;
        background: #f1f2f3;
        color: #000000;
    }
    table tbody tr td{
        border: 1px solid #ccc;
        text-align: center;
    }
    table tbody tr td a {
        display: block;
        margin-bottom: 5px;
    }

    .table-box{
        width: 100%;
        margin:0 auto;
    }
    .table-box table{
        width: 100%;
        border: 1px solid #e5e5e5;
        margin-top: 20px;
    }
    .table-box table th{
        height:36px;
        text-align:center;
        color:#333;
    }
    .table-box table td{
        padding: 15px 5px;
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
    .activeinfo {
        display: inline-block;
        padding: 20px;
        font-size: 14px;
    }
    .activeinfo dl{
        margin-bottom: 17px;
        line-height: 26px;
    }
    .activeinfo dt{
        float: left;
    }
    .activeinfo dd{
        float: left;
    }
    .activeinfo input{
        padding-left: 10px;
        margin-right: 5px;
        font-size: 12px;
        height: 26px;
        line-height: 26px;
    }
    .activeinfo .end-date{
        margin-left: 5px;
    }
    .activeinfo .btn-box{
        text-align: center;
    }
    .activeinfo button{
        height: 30px;
        line-height: 30px;
        padding: 0 50px;
        margin: 0 10px;
        font-size: 16px;
        background: #fa8c35;
        color: #FFF;
        border-radius: 3px;
        border: none;
        cursor: pointer;
    }
    .activeinfo .btn-cancle{
        background: #ccc;
    }
    .activeinfo  textarea{
        padding: 10px;
    }
    .activeinfo .spe dd{
        margin-right: 50px;
    }
    .activeinfo .imgbox{
        margin-top: 10px;
        border: 1px dotted #bfbfbf;
    }
    .activeinfo .file_value{
        margin: 10px 0;
    }
    .activeinfo  .sales-area span{
        display: inline-block;
        padding: 0 10px;
        margin-right: 10px;
        background: #e8e8e8;
        margin-bottom: 10px;
    }
    .error{
        color: red;
        margin-left: 15px;
    }
    .selected{
        color: #fa8c35!important;
        border: 1px solid #fa8c35!important;;
    }
    .layer_2{
        padding-top: 15px;
    }
    .layer_2 dl{
        margin-bottom: 10px;
    }

    .layer_2 dl dt{
        float: left;
        width: 100px;
        text-align: right;
        height: 28px;
        line-height: 28px;
    }
    .layer_2 dl dd{
        margin-left: 110px;
    }
    .layer_2 .city_dd{
        margin-top: 20px;
    }
    .layer_2 dd li{
        float: left;
        display: inline;
        line-height: 24px;
        padding: 0 10px;
        position: relative;
        border: 1px solid #5f5c5c;
        background:#FFF;
        color: #5f5c5c;
        text-align: center;
        cursor: pointer;
        margin-bottom: 13px;
        margin-right: 13px;
    }
    .layer_2 ul li i{
        display: block;
        width: 19px;
        height: 19px;
        position: absolute;
        right: -9px;
        top: -9px;
        background: url('../../assets/img/close_1.png') no-repeat;
        background-position: 0 0!important;
    }
    .layer_2 .optional-area dl{
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }
    .layer_2 ul .no-slt{
        background-color: #F9F9F9;
        color: #C2C2C2;
        border: 1px solid #C2C2C2;
        cursor: not-allowed;
    }
    .layer_2 select{
        display: inline-block;
        height: 26px;
        line-height: 26px;
        padding-left: 5px;
        border-color: #5f5c5c;
        outline: none;
    }
    .layer_2 .btn-global{
        padding: 0 30px;
    }
    .layer_2 .line{
        height: 1px;
        line-height: 1px;
        font-size: 0;
        background: #ddd;
        margin-bottom: 10px;
    }
    .layer_2 .btn-box button{
        margin: 0 10px;
    }
    div dl dd input[type="file"]{
        position: absolute;
        left: 0;
        width: 85px;
        height: 35px;
        z-index: 2;
        opacity: 0;
    }
    .a_style{
        display: inline-block;
        border: 1px solid #ff791f;
        color: #ff791f;
        background: #ffe5d3;
        padding: 0 8px;
        height: 22px;
        line-height: 22px;
        border-radius: 2px;
        font-size: 12px;
    }
    .a_style:hover{
        text-decoration: none;
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
        background-image: url(../../assets/img/ico_warn.png);
        background-repeat: no-repeat;
        background-position: -82px 4px;
        background-size: 300px 150px;
    }
</style>
