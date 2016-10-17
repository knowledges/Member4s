<template>
    <div class="top-bar">
        <div class="brand-list clearfix">
            <p class="G_fl">主营品牌：<span>{{brand_name}}</span></p>

            <p class="G_fl" v-if="brandlist.length>1">副营品牌：<span v-for="list in brandlist"
                                                                 v-show="list.brand_name != brand_name">{{list.brand_name}}</span>
            </p>
        </div>
        <div class="details" id="J_GotoPos">
            <dl class="brands clearfix">
                <dt class="G_fl">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</dt>
                <div class="detailsCon">
                    <dd></dd>
                    <template v-if="brands.length > 0">
                        <dd v-for="brand in brands">
                            <a @click="choiceBrand(brand)" :class="checkedBrandId == brand.brandId ? 'acton' : ''"
                               class="style-box brandslink" title="{{brand.brandName}}">{{brand.brandName}}<b></b></a>
                        </dd>
                    </template>
                    <dd v-else>对不起，您暂无任何品牌！</dd>
                </div>
            </dl>

            <dl class="model clearfix">
                <dt class="G_fl">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
                <div class="detailsCon">
                    <dd class="selectall"><a @click="choiceAll('CarModel')"
                                             :class="checkedCarModelId == '' ? 'acton' : ''"
                                             class="style-box brandslink">全部<b></b></a></dd>
                    <dd v-for="model in dynamicCarModelLists">
                        <a @click="choiceCarModel(model)"
                           :class="checkedCarModelId == model.carModelId ? 'acton' : ''" class="style-box brandslink"
                           title="{{model.carModelName}}">{{model.carModelName}}<b></b></a>
                    </dd>

                </div>
            </dl>

            <div class="style clearfix">
                <dl class="car clearfix">
                    <dt class="G_fl">车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款：</dt>
                    <div class="detailsCon">

                        <dd class="selectall"><a @click="choiceAll('Car')" :class="checkedCarId == '' ? 'acton' : ''"
                                                 class="style-box carlink">全部<b></b></a></dd>
                        <dd v-for="car in dynamicCarLists">
                            <a @click="choiceCar(car,$event,null)"
                               :class="checkedCarId == car.carId ? 'acton' : ''" class="style-box carlink"
                               carId="{{car.carId}}" title="{{car.carName}}">
                                {{car.carName}}<b></b>
                            </a>
                        </dd>

                    </div>
                </dl>
            </div>

            <div class="outColor clearfix">
                <dl class="car clearfix">
                    <dt class="G_fl">外观颜色：</dt>
                    <div class="detailsCon">

                        <dd class="selectall"><a @click="choiceAll('OutColor')"
                                                 :class="checkedOutColorId == '' ? 'acton' : ''"
                                                 class="style-box colorlink">全部<b></b></a></dd>
                        <dd v-for="outColor in dynamicOutColorLists">
                            <!--预留：@mousedown="mulChoiceExColor('OutColor')"-->
                            <a @click="mulChoiceExColor(outColor)"
                               :class="checkedOutColorId.indexOf(outColor.id) > -1 ? 'acton' : ''"
                               class="style-box colorlink"
                               title="{{outColor.colorName}}" data-id="{{outColor.id}}">
                                <div class="carColor" :style="{'background':outColor.colorValue.split(' ')[0]}">
                                    <span v-if="outColor.colorValue.split(' ').length>1"
                                          :style="{'background':outColor.colorValue.split(' ')[1]}"></span>
                                </div>
                                {{outColor.colorName}}
                                <b></b>
                            </a>
                            <!--<a v-else @click="choiceExColor(outColor)" :class="checkedOutColorId == outColor.id ? 'acton' : ''" class="style-box colorlink"-->
                            <!--title="{{outColor.colorName}}" data-id="{{outColor.id}}">-->
                            <!--<div class="carColor" :style="{'background':outColor.colorValue.split(' ')[0]}">-->
                            <!--<span v-if="outColor.colorValue.split(' ').length>1"-->
                            <!--:style="{'background':outColor.colorValue.split(' ')[1]}"></span>-->
                            <!--</div>-->
                            <!--{{outColor.colorName}}-->
                            <!--<b></b>-->
                            <!--</a>-->

                        </dd>

                    </div>
                </dl>
            </div>

            <div class="inColor clearfix">
                <dl class="car clearfix">
                    <dt class="G_fl">内饰颜色：</dt>
                    <div class="detailsCon">

                        <dd class="selectall"><a @click="choiceAll('InColor')"
                                                 :class="checkedInColorId == '' ? 'acton' : ''"
                                                 class="style-box colorlink">全部<b></b></a>
                        </dd>
                        <dd v-for="inColor in dynamicInColorLists">
                            <a @click="mulChoiceInColor(inColor)"
                               :class="checkedInColorId.indexOf(inColor.id) > -1 ? 'acton' : ''"
                               class="style-box colorlink"
                               title="{{inColor.colorName}}" data-id="{{inColor.id}}">
                                <div class="carColor" :style="{'background':inColor.colorValue.split(' ')[0]}">
                                    <span v-if="inColor.colorValue.split(' ').length>1"
                                          :style="{'background':inColor.colorValue.split(' ')[1]}"></span>
                                </div>
                                {{inColor.colorName}}
                                <b></b>
                            </a>
                            <!--<a v-else @click="choiceInColor(inColor)" :class="checkedInColorId == inColor.id ? 'acton' : ''" class="style-box colorlink"-->
                            <!--title="{{inColor.colorName}}">-->
                            <!--<div class="carColor" :style="{'background':inColor.colorValue.split(' ')[0]}">-->
                            <!--<span v-if="inColor.colorValue.split(' ').length>1"-->
                            <!--:style="{'background':inColor.colorValue.split(' ')[1]}"></span>-->
                            <!--</div>-->
                            <!--{{inColor.colorName}}-->
                            <!--<b></b>-->
                            <!--</a>-->
                        </dd>

                    </div>
                </dl>
            </div>

        </div>
    </div>


    <offer-table :provinces="provinces" :chkcmid="checkedCarModelId" :chkcid="checkedCarId" :arr_items="arr_items"
                 :count="count"></offer-table>
    <div id="page2" style="margin:20px 0;text-align: center;"></div>

</template>
<script>
    import $ from 'jquery'
    import config from './../../config'
    import util from './../../util/util'
    import OfferTable from './OfferTable.vue'
    export default {

        route: {
            data({to})
            {
                this.$nextTick(function () {
                    var that = this;
                    that.getCarM(0);
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
                            /*if(fail.status == "401"){
                             sessionStorage.removeItem("SESSIONID");
                             layer.msg('登录失效，请重新登陆！');
                             that.$route.router.go("/login");
                             }*/

                        }
                    });
                });
            }
        },
        data()
        {
            return {
                brands: [], //品牌列表
                carModels: [], //车型列表
                cars: [], //车款列表
                checkedBrandId: "", //选中品牌id
                checkedCarModelId: "", //选中车型id
                checkedCarId: "",//选中车款id
                checkedOutColorId: '',//选中外观颜色id
                checkedOutColorArr: [], //已选外饰颜色数组
                checkedInColorArr: [], //已选内饰颜色数组
                checkedInColorId: '',//选中内饰颜色id
                dynamicCarLists: [], //指定品牌-车型下的车款
                dynamicCarModelLists: [], //指定品牌下的车型
                dynamicOutColorLists: [], //{动态}指定车款下的外观颜色列表
                dynamicInColorLists: [], //{动态}指定车款下的内饰颜色列表
                brand_name: "", //主营品牌
                brandlist: [], //副品牌
                isMulExColor: true, //外饰是否可多选，true: 可多选、false:不可多选
                isMulInColor: true, //内饰是否可多选，true: 可多选、false:不可多选
                cur: 1,
                count: 0,
                pagesize: 10,
                arr_items: [],
                temp_obj : {},
            }
        }
        ,
        components: {
            OfferTable
        }
        ,
        methods: {
            inArray(needle, array, bool)
            {
                if (typeof needle == "string" || typeof needle == "number") {
                    for (var i in array) {
                        if (needle === array[i]) {
                            if (bool) {
                                return i;
                            }
                            return true;
                        }
                    }
                    return false;
                }
            }
            ,
            /*
             * 获取地址列表
             * @method showlist
             * @param {Number} 品牌下标
             * @Interface 返回数据类型，{code：1， data:{brand:{Array}, car: {Object}, carModel:{Object}}, desc:''}
             * */
            getCarM(num)
            {
                var that = this;
                /*品牌*/
                $.ajax({
                    url: config.API_BASE + "/4s/prefer/findMyBrandModelCar",
                    method: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify({"query": {"userId": config.USERID()}}),
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
                                that.brandLoad({
                                    "brandId": that.brands[num].brandId,
                                    "brandName": that.brands[num].brandName
                                });
                            })

                        }
                    },
                    error: function (fail) {
                        if (fail.status == "401") {
                            var SESSIONID = sessionStorage.getItem("SESSIONID");
                            if (SESSIONID == null) {
                                that.$route.router.go("/login");
                            } else {
                                sessionStorage.removeItem("SESSIONID");
                                layer.msg('登录失效，请重新登陆！');
                                util.login();
                            }
                        }
                    }
                });

            }
            ,
            /*
             * 选中全部, 如果是车款的全选，打开内外饰的多选开关
             * @method choiceAll
             * @param {String} 类型字符串，如：CarModel:车型、ExColor：外观颜色
             * */
            choiceAll(name)
            {
                var typesArr = ['CarModel', 'Car', "OutColor", "InColor"],
                        dyIndex,
                        index,
                        i,
                        len;
                if (name === "OutColor" || name === "InColor") {
                    this["checked" + name + "Id"] = '';
                    this["checked" + name + "Arr"] = [];


                }
//<<<<<<< .mine
//
//                for(index; index < len; index++){
//                    this["checked" + typesArr[index] + "Id"] = '';
//=======
                else {
                    for (i = 0, len = typesArr.length; i < len; i++) {
                        typesArr[i] === name && (dyIndex = i + 1, index = i);
                    }
                    for (index; index < len; index++) {
                        this["checked" + typesArr[index] + "Id"] = '';
                    }
                    for (dyIndex; dyIndex < len; dyIndex++) {
                        this["dynamic" + typesArr[dyIndex] + "Lists"] = [];
                    }
//>>>>>>> .r7967
                }
                //this.isMulInColor = true;
                //this.isMulExColor = true;
                this.getActivityList(1);
            }
            ,
            /*
             * 默认加载第一个品牌
             * @method showlist
             * @param {Object} 选中品牌数据对象，如{"brandId": 1,"brandName": "宝马"}
             * */
            brandLoad(obj)
            {
                this.checkedBrandId = obj.brandId;
                this.dynamicCarModelLists = this.carModels[obj.brandId];
                this.getActivityList(1);
            }
            ,
            /*
             * 选择品牌
             * @method choiceBrand
             * @param {Object} 选中品牌数据对象
             * */
            choiceBrand(obj)
            {
                this.checkedBrandId = obj.brandId;
                this.checkedCarModelId = "";
                this.checkedCarId = "";
                this.checkedOutColorId = '';
                this.checkedInColorId = '';
                this.dynamicCarLists = [];
                this.dynamicCarModelLists = this.carModels[obj.brandId];
                this.dynamicOutColorLists = [];
                this.checkedInColorArr = [];
                this.checkedOutColorArr = [];
                this.dynamicInColorLists = [];
                this.getActivityList(1);
            }
            ,
            /*
             * 选择车型
             * @method choiceCarModel
             * @param {Object} 选中车型数据对象
             * */
            choiceCarModel(obj)
            {
                this.checkedCarModelId = obj.carModelId;
                this.checkedCarId = "";
                this.checkedOutColorId = '';
                this.checkedInColorId = '';
                this.dynamicOutColorLists = [];
                this.dynamicInColorLists = [];
                this.checkedInColorArr = [];
                this.checkedOutColorArr = [];
                this.dynamicCarLists = this.cars[obj.carModelId];
                this.getActivityList(1);
            }
            ,
            /*
             * 选择车款, 打开内外颜色的多选开关
             * @method choiceCar
             * @param {Object} 选中车型数据对象
             * */
            choiceCar(obj)
            {
                this.checkedCarId = obj.carId;
                //this.isMulInColor = true; //取消内饰颜色的多选
                //this.isMulExColor = true; //取消内饰颜色的多选
                this.checkedOutColorId = '';
                this.checkedInColorId = '';
                this.dynamicOutColorLists = [];
                this.dynamicInColorLists = [];
                this.checkedInColorArr = [];
                this.checkedOutColorArr = [];

                this.getColor(obj.carId);
                this.getActivityList(1);
            }
            ,
            /*
             * 外观颜色单选 (暂不使用)
             * @method ChoiceExColor
             * @param {Object} 选中颜色数据对象
             * */
            choiceExColor(obj)
            {
                this.checkedOutColorId = obj.id;
                this.getActivityList(1);
            }
            ,
            /*
             * 外观颜色多选
             * @method mulChoiceExColor
             * @param {Object} 选中颜色数据对象
             * */
            /* 预留右键反选功能 */
//            $curEl.on("contextmenu", function(e){
//                return false;
//            });
//            if(event.which === 1){ //鼠标左键点击
//
//            }else if(event.which === 3){ //鼠标右键点击
//
//            }
            mulChoiceExColor(obj)
            {
                var newStr = '';

                if (this.inArray(obj.id, this.checkedOutColorArr)) {
                    this.checkedOutColorArr.$remove(obj.id);
                } else {
                    this.checkedOutColorArr.push(obj.id);
                }

                if (this.checkedOutColorArr.length > 0) {
                    for (var i = 0, len = this.checkedOutColorArr.length; i < len; i++) {
                        newStr += ",'" + this.checkedOutColorArr[i] + "'";
                    }
                    this.checkedOutColorId = newStr.substr(1);
                } else {
                    this.checkedOutColorId = '';
                }

                this.getActivityList(1);
            }
            ,
            /*
             * 内饰颜色单选 (暂不使用)
             * @method mulChoiceExColor
             * @param {Object} 选中颜色数据对象
             * */
            choiceInColor(obj)
            {
                this.checkedInColorId = obj.id;
                this.getActivityList(1);
            }
            ,
            /*
             * 内饰颜色多选
             * @method mulChoiceExColor
             * @param {Object} 选中颜色数据对象
             * */
            mulChoiceInColor(obj)
            {
                var newStr = '';
                if (this.inArray(obj.id, this.checkedInColorArr)) {
                    this.checkedInColorArr.$remove(obj.id);
                } else {
                    this.checkedInColorArr.push(obj.id);
                }

                if (this.checkedInColorArr.length > 0) {
                    for (var i = 0, len = this.checkedInColorArr.length; i < len; i++) {
                        newStr += ",'" + this.checkedInColorArr[i] + "'";
                    }
                    this.checkedInColorId = newStr.substr(1);
                } else {
                    this.checkedInColorId = '';
                }
                //var inColorArr = [];

                //inColorArr = (this.checkedInColorId.split(',')).shift();
                //this.isMulExColor = false; //取消外观颜色的多选
                this.getActivityList(1);
            }
            ,
            /*
             * 根据车款id，获取内外饰颜色
             * @method getColor
             * @param {Object} 车款id
             * */
            getColor(carId)
            {
                var that = this;
                var query = {};
                query.userId = config.USERID();
                query.carId = carId;
                var params = {"query": query};
                $.ajax({
                    url: config.API_BASE + "/4s/prefer/findMyCarColorByCarId",
                    method: "POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data: JSON.stringify(params),
                    beforeSend: function (request) {
                        request.setRequestHeader("sessionid", config.SESSIONID());
                    },
                    success: function (response) {
                        if (response.code == 0) {
                            that.dynamicOutColorLists = response.data.exteriorColorList;
                            that.dynamicInColorLists = response.data.interiorColorList;
                        }
                    },
                    error: function (fail) {
                        if (fail.status == "401") {
                            var SESSIONID = sessionStorage.getItem("SESSIONID");
                            if (SESSIONID == null) {
                                that.$route.router.go("/login");
                            } else {
                                sessionStorage.removeItem("SESSIONID");
                                layer.msg('登录失效，请重新登陆！');
                                util.login();
                            }
                        }
                    }
                });
            }
            ,
            /*分页*/
            getActivityList(cur)
            {
                var ii = layer.msg('加载中', {icon: 16, shade: [0.5, '#000']});
                var that = this;
                var query = {};

                query.pagenum = this.pagesize;
                query.page = cur;
                query.userId = config.USERID();
                query.brandId = that.checkedBrandId;      //品牌id
                query.carModelId = that.checkedCarModelId;      //车型id
                query.carId = that.checkedCarId;
                query.exteriorColorId = (that.checkedOutColorId);
                query.interiorColorId = (that.checkedInColorId);
                var params = {"query": query};

                $.ajax({
                    url: config.API_BASE + "/4s/offer/findMyOfferlist",
                    method: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(params),
                    beforeSend: function (request) {
                        request.setRequestHeader("sessionid", config.SESSIONID());
                    },
                    success: function (response) {
                        if (response.code == 0) {
                            that.count = response.data.count;
                            that.$set("arr_items", response.data.rows);
                            if (response.data.count > that.pagesize) {
                                laypage({
                                    cont: document.getElementById('page2'), //容器。值支持id名、原生dom对象，jquery对象,
                                    pages: Math.ceil(that.count / that.pagesize), //总页数
                                    curr: cur || 1,
                                    skip: true, //是否开启跳页
                                    skin: '#ff9205;',
                                    groups: 7, //连续显示分页数
                                    first: 1, //将首页显示为数字1,。若不显示，设置false即可
                                    last: Math.ceil(that.count / that.pagesize), //将尾页显示为总页数。若不显示，设置false即可
                                    jump: function (obj, first) {
                                        //回调
                                        //得到了当前页，用于向服务端请求对应数据
                                        var curr = obj.curr;
                                        if (!first) {
                                            that.getActivityList(curr);
                                        }
                                        $(".laypage_btn").unbind("click").on('click', function () {
                                            if ($(".laypage_skip").val() > 0 && $(".laypage_skip").val() <= Math.ceil(that.count / that.pagesize)) {
                                                that.getActivityList($(".laypage_skip").val(), newobj);
                                            } else {
                                                layer.msg('请输入正确的跳转页码');
                                            }
                                        })
                                    }
                                });
                            } else {
                                $("#page2").empty();
                            }
                            that.$nextTick(function () {
                                this.$children[0]._data.checkedIndex = [];
                                this.$children[0]._data.checkedAll = false;
                            });
                        }
                        layer.close(ii);
                    },
                    error: function (fail) {
                        if (fail.status == "401") {
                            var SESSIONID = sessionStorage.getItem("SESSIONID");
                            if (SESSIONID == null) {
                                that.$route.router.go("/login");
                            } else {
                                sessionStorage.removeItem("SESSIONID");
                                layer.msg('登录失效，请重新登陆！');
                                util.login();
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .error {
        color: red;
    }

    .selected {
        color: #fa8c35 !important;
        border: 1px solid #fa8c35 !important;;
    }

    .actived {
        background: #fa8c35 !important;
        color: #fff !important;
    }

    .wrap {
        width: 890px;
        margin: 0 auto;
    }

    .top-bar {
        font-size: 14px;
        color: #666;
        width: 890px;
        margin: 0 auto;
    }

    .top-bar .brand-list p {
        font-weight: bold;
        margin: 30px 30px 15px 0px;
    }

    .top-bar .brand-list p span {
        margin-right: 20px;
    }

    .details .brands a, .details .model a {
        display: inline-block;
        padding: 0 10px;
        height: 26px;
        line-height: 26px;
        color: #666;
        border-radius: 4px;
        vertical-align: -2px;
        font-size: 14px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }

    .top-bar .details .brands a:hover {
        background: #fa8c35;
        color: #fff;
    }

    .top-bar .details .model a:hover {
        background: #fa8c35;
        color: #fff;
    }

    .top-bar .details a.style-box:hover {
        text-decoration: none;
    }

    .eait {
        color: #fb8c33;
        cursor: pointer;
    }

    .eait:hover {
        color: #fe5a05;
    }

    .top-bar .details .model {
        margin: 12px auto;
        position: relative;
    }

    .top-bar .details .model i {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 3px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUFDQTg1MjI3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUFDQTg1MjE3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGEwM2FjYWYtYWUxNy02NTRhLWE5M2EtYzY1NTRhMTA5N2JiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PutZE7UAAAC+SURBVHjaYviPCxxc9D9F4v/ZLUAmEwNWcG4rw9UDDF/fM0yIBLIZgQrRVRxazDArg0HJiEFcheHocgZ+MQxFEBX//oLYKqYMkmoM2g6oipBVAAETM0PRKgYjbyQ3HVyEriJtJlAFiIlQMTsTXYVdDIQHtu7CDoaeYFwqwCb9+s5wdAWDhg0uFWBFwPAAKuIWYNCyx6oCrOjyHhB9eiODoBRD6XpMFUDAwvDsFoNbJoORF4OmLQMrB9bwBwgwACjfaVYf91T7AAAAAElFTkSuQmCC) no-repeat;
    }

    dl dd {
        display: inline-block;
    }

    .top-bar .details .style, .top-bar .details .outColor, .top-bar .details .inColor {
        margin-bottom: 12px;
        position: relative;
    }

    .top-bar .details .style-box {
        display: inline-block;
        padding: 0 10px;
        margin: 2px 0;
        height: 26px;
        border: 1px dashed #ccc;
        /*background:#f5f5f5;*/
        font-size: 14px;
        text-align: center;
        line-height: 26px;
        border-radius: 3px;
        margin-right: 10px;
        vertical-align: -2px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
    }

    .top-bar .details .style .style-box:hover, .top-bar .details .outColor .style-box:hover, .top-bar .details .inColor .style-box:hover {
        color: #fff;
        background: #fa8c35;
    }

    .top-bar .details .acton {
        border: 1px solid #ff9205;
        background: #fff;
    }

    .top-bar .details .style-box b {
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

    .top-bar .details .acton b {
        display: block;
    }

    .top-bar .details .style i {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 3px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUM2QTMxNzk3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUM2QTMxNzg3MzEyMTFFNjgxRUFGMzNBOEU4MzU2NzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGEwM2FjYWYtYWUxNy02NTRhLWE5M2EtYzY1NTRhMTA5N2JiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsOHs3AAAAC1SURBVHjaYvz//z8DIcCES+Lf1S2/pzr/u3sYpyKg3P9HZxh+fP67uQLIZsS0DmjG350tjBJajAIy/67vYOASQlcEUcHw/x+QzSipwygoxyhnwoRLBRD8f3GNUc2ZSduHBaHiyua/u1rhKhgYmZjda5mUbREOx65C2xsRBP/vH8WjAqzoz0+gFxhlDHGpACkChse/6zsZOXgZZY2xqgAp+vfwBMhNtw8w8oiyBPVjqgACgAADABfIYX8VdYt8AAAAAElFTkSuQmCC) no-repeat;
    }

    table input[type="text"], table input[type="number"] {
        display: inline-block;
        width: 80%;
        text-align: center;
    }

    table a.selected {
        display: inline-block;
        padding: 2px 8px;
        color: #FFF;
        broder: 1px solid #fe791e;
        color: #fe791e;
        background: #ffe4d2;
        cursor: pointer;
    }

    table a.save {
        display: inline-block;
        padding: 2px 8px;
        color: #FFF;
        border: none;
        background: #f98c37;
        cursor: pointer;
    }

    table a.save:hover {
        border: none;
        background: #f26108;
    }

    table a.cancle {
        margin-top: 5px;
        display: inline-block;
        padding: 2px 8px;
        color: #FFF;
        border: none;
        background: #cccccc;
        cursor: pointer;
    }

    table a.cancle:hover {
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

    .order-nodata h4 {
        color: #4c4c4c;
        font-size: 18px;
        line-height: 46px;
    }

    .order-nodata p a {
        color: #2194fe;
    }

    .order-nodata .order-nobg {
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

    div dl dt {
        width: 70px;
    }

    div dl dt, div dl dd {
        float: left;
        height: 35px;
        line-height: 35px;
    }

    div.add dl dt:nth-child(n+2) {
        margin-left: 60px;
    }

    div.layer_2 dl dt {
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

    div dl dd em {
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

    div dl dd input[type="text"], div dl dd input[type="number"] {
        padding: 0 5px;
        border: 1px solid #CCCCCC;
        height: 34px;
    }

    div dl dd input[type="file"] {
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

    div dl dd button:hover {
    }

    div dl dd button:last-child {
        background: #ccc;
    }

    div dl dd button:last-child:hover {
        background: #666;
    }

    .layer_2 ul li {
        margin: 5px 10px !important;
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
        border: none !important;
        background: #FFF;
        color: #000;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .layer_2 ul li i {
        position: absolute;
        right: -10px;
        top: -10px;
        background: url('../../assets/img/close_1.png') no-repeat;
        background-position: 0 0 !important;
    }

    .city_dd li {
        margin: 10px;
    }

    .car_dd li {
        width: 248px;
        padding: 0 0 !important;
    }

    option {
        text-align: center;
    }

    .carColor {
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

    .carColor span {
        height: 7px;
        width: 100%;
        display: block;
        margin: 0;
        padding: 0;
    }

    .detailsCon {
        width: 818px;
        float: right;
    }

    .brandslink {
        width: 95px;
    }

    .carlink {
        width: 225px;
    }

    .colorlink {
        width: 122px;
    }
</style>
