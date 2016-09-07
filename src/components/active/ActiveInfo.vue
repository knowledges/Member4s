<template>
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
            <dd>
                <ul id="areas_" class="clearfix">
                    <li v-for="city in items.citys">
                        {{city.name}}
                    </li>
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
    <div class="activearea layer_2" style="display: none;">
        <dl class="clearfix">
            <dt>已选区域：</dt>
            <dd>
                <ul>
                    <li>福建省<i></i></li>
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
                <select name="" id="" v-on:change="selectedCitys">
                    <option value="0">==请选择==</option>
                    <optgroup label="{{item.letter}}" v-for="item in city_items">
                        <option value="{{$index+1}}">{{item.name}}</option>
                    </optgroup>
                </select>
            </dd>
        </dl>
        <dl class="clearfix">
            <dt></dt>
            <dd style="width: 560px;">
                <ul>
                    <li v-for="citys in city_items_childs.citys" v-on:click="cityClk(citys)">{{citys.name}}</li>
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
</template>
<script>
    import sub_zebra from './../../assets/js/sub_zebra.js'
    import Zebra_DatePicker from './../../assets/js/zebra_datepicker.src.js'
    import $ from 'jquery'
    export  default {
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
                city_items_childs:[]
            }
        },
        methods:{
            selectarea(){
                var index = layer.open({
                    type: 1,
                    title: '选择区域',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['750px' , '800px'],
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
            cityClk(obj){

            },
            selectedCitys(){

            },
            agree(){

            }
        }
    }
</script>

<style scoped>
    .error{
        color: red;
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
        margin: 10px ;
        border: 1px solid #e6e6e6;
        background:#FFF;
        display: inline-block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
    option{
        text-align: center;
    }
</style>