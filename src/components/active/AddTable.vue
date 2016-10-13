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
                <th class="car-operation">操作</th>
            </tr>
            </thead>
            <tbody>
                <tr  v-if="arr_items.length<=0">
                    <td colspan="11">
                        <div class="order-nodata">
                            <h4><i class="order-nobg"></i>抱歉，暂无相关信息！</h4>
                            <!--<p>您可进入 <a v-link="{ path:'/u/manage'}" style="display: inline-block">报价管理</a> 页面更新底价信息</p>-->
                        </div>
                    </td>
                </tr>
            <template v-else>
                <tr v-for="item in arr_items">
                    <td>{{item.carModelName}}</td>
                    <td>{{item.carName}}</td>
                    <td>{{item.exteriorColorName}}</td>
                    <td>{{item.interiorColorName}}</td>
                    <td>{{item.price}}</td>
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <!--<td></td>-->
                    <td v-if="stats>0">
                        <a href="#" @click.prevent="update(item)" class="G_btn_a">添加</a>
                        <a href="#" @click.prevent="getHistoryList(item)">历史</a>
                    </td>
                </tr>
            </template>
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
            </dl>
            <dl class="clearfix spe">
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
                    <input type="text" name="special_price" maxlength="11" v-model="items.special_price | changeToNull" placeholder="请填写该车的特价"><em>元</em>
                </dd>
                <dd v-if="items.offer_" class="error"> <i></i>{{items.offer_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>活动时间：</dt>
                <dd>
                    <input type="text" id="start-date" v-model="items.start_date" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
                    至
                    <input type="text" id="end-date" class="end-date" v-model="items.end_date" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
                </dd>
                <dd v-if="items.timer_" class="error"> <i></i>{{items.timer_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>活动数量：</dt>
                <dd style="position: relative"><input type="text" maxlength="11" v-model="items.number | changeToNumber"> <em>辆</em></dd>
                <dd v-if="items.number_" class="error"><i></i>{{items.number_msg}}</dd>
            </dl>
            <dl class="clearfix">
                <dt>销售区域：</dt>
                <dd>
                    <div class="clearfix sales-area j_salesArea">
                        <span v-for="city in items._areas" track-by="$index">{{city.sales_area_name}}</span>
                        <a href="javascript:;" @click="selectarea" class="a_style">选择区域</a>
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
                            <input type="file"  name="upload-file" id="upload-file" v-on:change="uploadfile($event)">
                            <div class="imgbox">
                                <img :src="items.file_img" class="imghead" alt=""/>
                            </div>
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
                    <textarea name="desc" v-model="items.desc" cols="64" rows="8" placeholder="填写相关活动说明~"></textarea>
                </dd>
            </dl>
        </div>
    </div>
    <div class="activearea" style="display: none;">
        <select-area></select-area>
    </div>

    <history-tpl :history="history"></history-tpl>

</template>

<script>
    import sub_zebra from './../../assets/js/sub_zebra.js'
    import Zebra_DatePicker from './../../assets/js/zebra_datepicker.src.js'
    import $ from 'jquery'
    import historyTpl from './../historyTpl.vue'
    import config from './../../config'
    import util from './../../util/util'
    import SelectArea from './../template/SelecteArea.vue'
    export default {
        props: {
            stats: Number,
            judge: Boolean,
            idx: String,
            explain: String,
            pagesize: Number,
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
                    number: 1,
                    number_:false,
                    number_msg:"",
                    areas:[],
                    _areas:[],
                    selectarea_:false,
                    selectarea_msg:"",
                    file_src:"",
                    file_img:"",
                    file_value:"",
                    file_:false,
                    file_msg:"",
                    desc:"",
                },
                _index:"",
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
                mask_1:"",
                mask_2:"",
                rem_item:[]
            }
        },
        components:{
            historyTpl,
            SelectArea
        },
        methods:{
            setInnerHeight(){
                var winHeight= $(window).height(),
                newHeight = (winHeight - 43 - 30) + 'px';
                return newHeight;
            },
            getHistoryList(item){
                var self = this,
                        query = {},
                        params = {};
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
                        if(response.code === 0){
                            self.history.list = response.data.rows;
                            var h = self.setInnerHeight();
                            self.history.index = layer.open({
                                type: 1,
                                title: '历史记录',
                                skin: 'layui-layer-rim', //加上边框
                                area : ['750px' , h],
                                content: $("#J_HistoryPop"),
                                success : function(layero, index){
                                }
                            });
                        }else{
                            layer.msg(request.desc);
                        }
                    },
                    error:function(fail){
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
            judge(event){
                var $this = $(event.target);
                if(isNaN(parseInt(this.items.special_price))){
                    $this.addClass('err');
                    this.items.special_price = '';
                }else{
                    $this.removeClass('err');
                }
            },
            update(obj){
                var that = this,
                        h = that.setInnerHeight();

                if(that.$children[0].provincecity!=undefined){
                    that.$children[0].getRelationship(null,0);
                }else{
                    that.$children[1].getRelationship(null,0);
                }
                that.rem_item = obj;
                that.items.brandName = obj.brandName;
                that.items.carModelName = obj.carModelName;
                that.items.car_id = obj.carId;
                that.items.carName = obj.carName;
                that.items.price = obj.price;
                that.items.interior_color_id = obj.interiorColorId;
                that.items.interiorColorName = obj.interiorColorName;
                that.items.exterior_color_id = obj.exteriorColorId;
                that.items.exteriorColorName = obj.exteriorColorName;

                layer.open({
                    type: 1,
                    title: '活动详情添加',
                    skin: 'layui-layer-rim', //加上边框
                    scrollbar: false,
                    area : ['660px' , h],
                    btn: ['保存', '取消'],
                    content: $(".activeinfo"),
                    yes: function(index, layero){
                        var items = that.items;
                        if(items.special_price == "" ){
                            items.offer_ = true;
                            items.offer_msg="特价不能为空";
                            return false;
                        }else if(parseInt(items.special_price, 10) > parseInt(items.price, 10)){
                            items.offer_ = true;
                            items.offer_msg="特价不可高于市场价";
                            return false;
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

                        if(items.start_date == "" && items.end_date == ""){
                            items.timer_ = true;
                            items.timer_msg="结束时间不可早于开始时间";
                            return;
                        }else{
                            items.timer_ = false;
                        }

                        if($(".j_salesArea > span").length<=0){
                            items.selectarea_ = true;
                            items.selectarea_msg = "请选择区域";
                            return;
                        }else{
                            items.selectarea_ = false;
                        }

                        if(items.file_value == ""){
                            items.file_ = true;
                            items.file_msg = "请上传图片";
                            return false;
                        }else{
                            items.file_ = false;
                        }

                        var ii = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});

                        var formd = new FormData();
                        formd.append("img",$("#upload-file")[0].files[0]);
                        $.ajax({
                            type: "POST",
                            contentType: false,
                            processData: false,
                            url: config.PHP_API + "/index.php/api/upload_file",
                            data: formd,
                            success: function(data) {
                                if(data.code==0){
                                    that.items.file_img = data.img_url;
                                    var query= {};

                                    query.user_id =  config.USERID();
                                    query.interior_color_id = that.items.interior_color_id;
                                    query.exterior_color_id = that.items.exterior_color_id;
                                    query.car_image = that.items.file_img;
                                    query.car_id = that.items.car_id;
                                    query.price = that.items.price;
                                    query.special_price = that.items.special_price;
                                    query.start_date = that.items.start_date+" 00:00:01";
                                    query.end_date = that.items.end_date+" 23:59:58";
                                    query.number = that.items.number;
                                    query.status = "";
                                    query.remark = "";
                                    query.description = that.items.desc;
                                    query.createuser =  config.USERID();
                                    query.areas = that.items._areas;

                                    var params = {"query":query};

                                    $.ajax({
                                        url:config.API_BASE+"/4s/activity/addCarActivity/",
                                        method:"POST",
                                        contentType: 'application/json; charset=utf-8',
                                        dataType:"json",
                                        data:JSON.stringify(params),
                                        beforeSend:function (request) {
                                            request.setRequestHeader("sessionid",config.SESSIONID());
                                        },
                                        success:function (response) {
                                            if(response.code == 0){
                                                that.arr_items.$remove(that.rem_item);
                                                layer.closeAll();
                                                layer.alert('已提交，正在审核中...<br/> 您可在::本店活动::查看审核状态', {icon: 1,title:'完成修改'});
                                                that.arr_items.$remove(that.rem_item);
                                                /*clear*/
                                                that.clearAllDb();
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
                                    })
                                }
                            }
                            ,error: function(xhr, type){
                            }
                        });
                    },
                    btn2: function(index){
                        that.clearAllDb();
                    }
                });
            },
            /*
            * 清空弹窗中所有数据
            * @method clearAllDb
            * @auth 遇。
            * */
            clearAllDb(){
                var that = this ,_idx = 1;
                that.items.brandName = "";
                that.items.carModelName = "";
                that.items.carName = ""
                that.items.interiorColorName = "";
                that.items.exteriorColorName="";
                that.items.price=""
                that.items.special_price="";
                that.items.offer_ = false;
                that.items.offer_msg = "";
                that.items.start_date = "";
                that.items.end_date = "";
                that.items.timer_ = false;
                that.items.timer_msg = "";
                that.items.number = 1;
                that.items.number_ = false;
                that.items.number_msg = "";
                that.items._areas = [];
                that.items.selectarea_ = false;
                that.items.selectarea_msg = "";
                that.items.file_src = "";
                that.items.file_img = "";
                that.items.file_value = "";
                that.items.file_ = false;
                that.items.file_msg = "";
                that.items.desc = "";
                if(that.$children[0].provincecity!=undefined){
                    _idx = 0;
                }
                that.$children[_idx].removeAll();
                that.$children[_idx].selectedKey = "0";
                that.$children[_idx].city_items = [];
            },
            /**
             * 初始化选择地区
             * */
            selectarea(){
                this.mask_1 = layer.open({
                    type: 1,
                    title: '选择区域',
                    skin: 'layui-layer-rim', //加上边框
                    area : ['600px' , '420px'],
                    content: $(".activearea")
                });
            },
            /**
             * 点击type='file' 上传图片
             * */
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
//                        var img, imgBox = $(that).closest('.fileInner').find('.imgbox');
//
//                        imgBox.html('<img class="imghead">');
//                        img = imgBox.find('.imghead').get(0);
//
//                        img.onload = function(){
//                            var rect = _this.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
//                            img.width  =  rect.width;
//                            img.height =  rect.height;
//                            img.style.marginTop = rect.top+'px';
//                        }

                        this.items.file_value = that.files[0].name;

                        reader.onload = function(evt){
                            //img.src = evt.target.result;
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
            }
        },
        filters:{
        /*
        * 自定义过滤器
        *
        * */
        changeToNull: {
            // model -> view
            // 在更新 `<input>` 元素之前格式化值
            read(val) {
                return val
            },
            // view -> model
            // 在写回数据之前格式化值
            write(val, oldVal) {
                var number = val.replace(/[^\d.]/g, '');
                return number === '' ? '' : isNaN(number) ? '' : parseInt(number, 10)
            }
        },
        changeToNumber: {
            // model -> view
            // 在更新 `<input>` 元素之前格式化值
            read(val) {
                return parseInt(val, 10)
            },
            // view -> model
            // 在写回数据之前格式化值
            write(val, oldVal) {
                var number = +val.replace(/[^\d.]/g, '')
                return number === '' ? 1 : parseInt(number, 10) === 0 ? 1 : isNaN(number) ? 1 : parseInt(number, 10)
            }
        }
    }
    }
</script>

<style scoped>
    @import "./../../assets/css/datepicker.css";
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
    }
    .activeinfo .imgbox img{
        max-width: 580px;
        max-height: 270px;
        border: 2px dotted #bfbfbf;
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
