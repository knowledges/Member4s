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
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.color_A}}</td>
                <td>{{item.color_B}}</td>
                <td>{{item.price_A}}</td>
                <td>{{item.price_B}}</td>
                <td>
                    <p>{{item.startTimer}}</p>
                    <p>{{item.endTimer}}</p>
                </td>
                <td>{{item.stock}}</td>
                <td>{{item.area}}</td>
                <td>{{item.statue}}</td>
                <td v-if="stats>0">
                    <a v-on:click="update(item)">修改</a>
                    <a v-link="{path:'/u/active/thisShop/1'}">历史</a>
                    <a v-on:click="del(item)">删除</a>
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
                        <li class="selected" v-for="city in city_items | filterBy 'true' in 'selected'" track-by="$index">{{city.name}}<i v-on:click="removeProvince(city)" ></i></li>
                    </ul>
                    <ul v-for="items in city_items">
                        <li class="selected" v-for="city in items.city | filterBy 'true' in 'selected'" track-by="$index">{{city.name}}<i v-on:click="removeCity(city)"></i></li>
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
                    <select name="" id="selectedCitys" v-on:change="selectedCitys">
                        <option value="0">==请选择==</option>
                        <optgroup label="{{item.letter}}" v-for="item in city_items">
                            <option value="{{$index+1}}" v-bind:p_id="item.id">{{item.name}}</option>
                        </optgroup>
                    </select>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd style="width: 500px;height: 100%;" class="city_dd">
                    <ul>
                        <li v-for="province in city_items_province"
                            v-on:click="cityClk(province,$index,$event,0)"
                            :class="{'selected':province.selected==true}">
                            {{province.name}}
                        </li>
                        <li v-for="city in city_items_citys"
                            v-on:click="cityClk(city,$index,$event,1)"
                            class="city_li" :class="{'selected':city.selected==true}">
                            {{city.name}}
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
            $.get("/data/city.json",function (data) {
                _this.city_items = data;
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
                    citys:[],
                    selectarea_:false,
                    selectarea_msg:"",
                    file_value:"",
                    file_:false,
                    file_msg:"",
                    desc:"",
                },
                city_items:[],
                city_items_childs:[],
                city_items_province:[],
                city_items_citys:[],
                citys:[],
                _index:""
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
            del(obj){
                layer.confirm('确定删除该活动吗？', {
                    title:'删除活动',
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.msg('删除成功', {icon: 1});
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
            cityClk(obj,index,e,num){
                if(num == 0){
                    debugger;
                   obj.selected = true;
                   this.city_items_province.$set(index,{id:obj.id,name:obj.name,letter:obj.letter,city:obj.city,count:obj.count,selected:true});
                   this.city_items.$set(this._index-1,{id:obj.id,name:obj.name,letter:obj.letter,city:obj.city,selected:true,count:obj.count});
                    if(obj.city != undefined){
                        for(var i = 0; i<obj.city.length;i++){
                            this.city_items_citys.$set(i,{id:obj.city[i].id,name:obj.city[i].name,selected:false});
                            this.city_items[this._index-1].city.$set(i,{id:obj.city[i].id,name:obj.city[i].name,selected:false});
                        }
                    }
                }else{
                    debugger;
                    if(obj.selected == undefined || obj.selected == "undefined"){
                        obj.selected = true;
                        this.city_items_citys.$set(index,{id:obj.id,name:obj.name,selected:true});
                        var city_items = this.city_items[this._index-1];
                        city_items.city.$set(index,{id:obj.id,name:obj.name,selected:true});
                        city_items.count = city_items.count-1;
                        if(city_items.count<=0){
                            this.city_items_province.$set(0,{id:city_items.id,name:city_items.name,letter:city_items.letter,city:city_items.city,count:city_items.count,selected:true});
                            this.city_items.$set(this._index-1,{id:city_items.id,name:city_items.name,letter:city_items.letter,selected:true,city:city_items.city,count:city_items.count});
                            for(var i = 0; i<city_items.city.length;i++){
                                this.city_items[this._index-1].city.$set(i,{id:city_items.city[i].id,name:city_items.city[i].name,selected:false});
                            }
                        }
                    }
                }
            },
            selectedCitys(){

                this._index = $("#selectedCitys option:selected").val();
                this.city_items_province =[];
                this.city_items_province.push(this.city_items[this._index-1]);
                this.city_items_citys = this.city_items[this._index-1].city;
            },
            removeProvince(city){
                city.selected = 'undefined';
                var _cur = city.letter,_idx="";
                for(var i = 0 ; i< this.city_items.length;i++){
                    if(this.city_items[i].letter == _cur){
                        _idx = i;
                    }
                }
                var city_items = this.city_items[_idx];
                this.city_items.$set(_idx,{id:city_items.id,name:city_items.name,letter:_cur,city:city_items.city,selected:'undefined',count:city.city.length});
                for(var i = 0; i<city.city.length;i++){
                    city.city[i].selected = 'undefined';
                    this.city_items[_idx].city.$set(i,{id:city.city[i].id,name:city.city[i].name,selected:'undefined'});
                }

                /*强制如果删除是当前页的省，就手动删掉class*/
                if(this.city_items_province[0].name == city.name){
                    $(".city_dd ul li").eq(0).removeClass("selected");
                }
            },
            removeCity(city){
                city.selected = 'undefined';
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
</style>