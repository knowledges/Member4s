<template>
    <div class="batch-change">
        <a v-on:click="batchUpdate" style="cursor: pointer;"><i class="change"></i>批量添加</a>

        <p class="G_fr">共：<span>{{count}}</span>条</p>
    </div>

    <!--<p>checked:id {{checkedIndex | json}}</p>-->
    <div class="table-box">
        <table border=1 cellspacing=0 cellpadding=0>
            <thead>
                <tr>
                <th class="car-selected"><input type="checkbox" id="all" v-model="checkedAll" :checked="checkedAll"
                                                v-on:click="allChecked"/></th>
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
            </thead>
            <tbody>
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
                        <input type="number" class="update_{{$index}} discount_{{$index}}" v-on:keyup="calc(item,$index)"
                               v-on:click="calc(item,$index)" value="{{item.discount}}" style="display: none;">

                        <p v-if="items.discount_" class="error">
                            <i></i>
                            {{items.discount_msg}}
                        </p>
                    </td>
                    <td width="100">
                        <!--<span class="show_{{$index}}">{{item.lowPrice}}</span>-->
                        <input type="text" class="update_{{$index}}  lowPrice_{{$index}}" readonly value="{{item.lowPrice}}"
                               style="display: none;">

                        <p v-if="items.lowPrice_" class="error">
                            <i></i>
                            {{items.lowPrice_msg}}
                        </p>
                    </td>
                    <td width="60">
                        <!--<span class="show_{{$index}}">{{item.stock}}</span>-->
                        <input type="number" class="update_{{$index}}  stock_{{$index}}" value="{{item.stock}}"
                               style="display: none;">

                        <p v-if="items.stock_" class="error">
                            <i></i>
                            {{items.stock_msg}}
                        </p>
                    </td>
                    <td width="60">
                        <!--<span class="show_{{$index}}">{{item.onWay}}</span>-->
                        <input type="number" class="update_{{$index}} onWay_{{$index}}" value="{{item.onWay}}"
                               style="display: none;">

                        <p v-if="items.onWay_" class="error">
                            <i></i>
                            {{items.onWay_msg}}
                        </p>
                    </td>
                    <td>
                        <p class="show_{{$index}}">{{item.saleArea}}</p>

                        <p class="update_{{$index}}" style="display: none;">
                            <span v-for="city in items.areas" class="cityStyle"
                                  track-by="$index">{{city.salesAreaName}}</span>
                        </p>

                        <p class="update_{{$index}}" style="display: none;"><a class="selected"
                                                                               v-on:click="selectarea(item)">请选择</a></p>
                    </td>
                    <td>
                        <div class="show_{{$index}}">
                            <button v-on:click="update(item,$event,$index)" class="update"
                                    style="cursor: pointer;border: none; background: #FFF;">添加
                            </button>
                            <!--<p><a v-link="{path:'/u/manage/myOffer/find/0/'+item.carId+'/'+item.exteriorColorId+'/'+item.interiorColorId+'/info'}"  style="cursor: pointer;">历史</a></p>-->
                            <!--<p><a href="#" @click.prevent="getHistoryList(item)">历史</a></p>-->
                        </div>
                        <div class="update_{{$index}}" style="display: none;">
                            <p><a class="save" v-on:click="save(item,$event,$index)">保存</a></p>

                            <p><a class="cancle" v-on:click="cancle($index)">取消</a></p>
                        </div>
                    </td>
                </tr>
                <tr v-if="arr_items.length<=0">
                    <td colspan="12">
                        <div class="order-nodata">
                            <h4><i class="order-nobg"></i>暂无此款车的报价！</h4>
                            <!--<p>您可在 <a v-link="{ path:'/u/manage/add'}" style="display: inline-block">“新增报价”</a> 页面筛选此款车，手动添加报价</p>-->
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="activearea" style="display: none;">
        <select-area></select-area>
    </div>

    <div class="batchAdd" style="display: none;">
        <div class="add table-box">
            <dl class="clearfix">
                <dt>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</dt>
                <dd v-text="temps.brandName"></dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
                <dd v-text="temps.carModelName"></dd>
                <dt>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款：</dt>
                <dd v-text="temps.carName"></dd>
            </dl>
            <table style="min-height: 200px">
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
                        <input type="number" v-model="temps.discount" v-on:keyup="batchCalc(temp)"
                               v-on:click="batchCalc(temp)" value="{{temp.discount}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <input type="text" v-model="temps.lowPrice" readonly value="{{temp.lowPrice}}">
                    </td>
                    <td rowspan="{{temp_arr.length}}">
                        <p>
                            <span v-for="city in items.areas" class="cityStyle"
                                  track-by="$index">{{city.salesAreaName}}</span>
                        </p>
                        <a href="javascript:;;" class="selected" v-on:click="selectarea(temp)">选择</a>
                    </td>
                </tr>
                <tr v-for="temp in temp_arr" track-by="$index" v-show="temp_arr.length>1 && $index>0 ">
                    <td>{{temp.exteriorColorName}}</td>
                    <td>{{temp.interiorColorName}}</td>
                    <td>
                        <input type="number" class="stocks_{{$index}}" value="{{temp.stock}}">
                    </td>
                    <td>
                        <input type="number" class="onWays_{{$index}}" value="{{temp.onWay}}">
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

    </div>

    <history-list :history="history"></history-list>
</template>
<script>
    import $ from 'jquery'
    import config from './../../config'
    import util from './../../util/util'
    import historyList from './historyList.vue'
    import SelectArea from './../template/SelecteArea.vue'
    export default {
        props: {
            count: {
                type: Number
            },
            arr_items: {
                type: Array,
                default: ()=>
                        []
            }
        },
        ready()
        {
        }
        ,
        components: {
            historyList,
            SelectArea
        }
        ,
        data()
        {
            return {
                checkedAll: "false",
                checkedIndex: [],
                items: {
                    areas: [],
                    _areas: [],
                    discount: "",
                    discount_: false,
                    discount_msg: "",
                    lowPrice: "",
                    lowPrice_: false,
                    lowPrice_msg: "",
                    stock: "",
                    stock_: false,
                    stock_msg: "",
                    onWay: "",
                    onWay_: false,
                    onWay_msg: ""
                },
                temp_items: {},
                temp_arr: [],
                temps: {
                    interiorColorName: "",
                    exteriorColorName: "",
                    stock: "",
                    onWay: "",
                    discount: "",
                    lowPrice: "",
                    brandName: "",
                    carModelName: "",
                    carName: ""
                },
                history: {
                    index: 0,
                    brandName: '',
                    carModelName: '',
                    carName: '',
                    exColorName: '',
                    inColorName: '',
                    titleList: ['创建时间', '官方价 / 元', '优惠价 / 元', '报价 / 元'],
                    list: []
                },
                mask_1: "",
                mask_3: "",
            }
        }
        ,
        methods: {
            /**
             * _idx:根据组件的个数来下下面 if else 的条件的。
             * 目前默认为两个组件
             * */
            clearChildDb()
            {
                var that = this;

                var _idx = 1;
                if (that.$children[0].provincecity != undefined) {
                    _idx = 0;
                }
                that.$children[_idx].removeAll();
                that.$children[_idx].selectedKey = "0";
                that.$children[_idx].city_items = [];
                that.items.areas = [];
            }
            ,
//      	新改的历史
            getHistoryList(item)
            {
                var self = this,
                        query = {},
                        params = {};
                query.userId = config.USERID();
                query.interiorColorId = item.interiorColorId;
                query.exteriorColorId = item.exteriorColorId;
                query.pagenum = 100;
                query.page = 1;
                query.carId = item.carId;
                params = {"query": query};

                self.history.brandName = item.brandName;
                self.history.carModelName = item.carModelName;
                self.history.carName = item.carName;
                self.history.exColorName = item.exteriorColorName;
                self.history.inColorName = item.interiorColorName;

                $.ajax({
                    url: config.API_BASE + "/4s/offerTrend/list/",
                    method: "POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    data: JSON.stringify(params),
                    beforeSend: function (request) {
                        request.setRequestHeader("sessionid", config.SESSIONID());
                    },
                    success: function (response) {
                        if (response.code === 0) {
                            var winHeight = $(window).height(),
                                    newHeight = (winHeight - 43 - 30) + 'px';

                            self.history.list = response.data.rows;
                            self.history.index = layer.open({
                                type: 1,
                                title: '历史记录',
                                skin: 'layui-layer-rim', //加上边框
                                area: ['750px', newHeight],
                                content: $("#J_HistoryPop")
                            });
                        } else {
                            layer.msg(request.desc);
                        }
                    },
                    error: function (fail) {
                        if (fail.status == "401") {
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                });

            }
            ,
            /**
             * 优惠价计算
             * */
            calc(item, index)
            {
                setTimeout(function () {
                    var num = $(".discount_" + index).val() != "" ? $(".discount_" + index).val() : 0;
                    var val = item.price - num;
                    $(".lowPrice_" + index).val(val);
                }, 500);
            }
            ,
            /**
             * 报价=实际价格-优惠价
             * */
            batchCalc(item)
            {
                var that = this;
                setTimeout(function () {
                    that.temps.lowPrice = item.price - that.temps.discount;
                }, 500)
            }
            ,
            /**
             * 初始化批量添加弹框
             * */
            batchUpdate()
            {
                var that = this;
                layer.confirm('您确定要批量添加吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function (index) {
                    layer.close(index);
                    if (that.checkedIndex.length > 0) {
                        that.mask_3 = layer.open({
                            type: 1,
                            title: '批量添加',
                            skin: 'layui-layer-rim', //加上边框
                            area: ['800px', '500px'],
                            btn: ['保存', '取消'],
                            content: $(".batchAdd"),
                            yes: function (index, layero) {
                                if (parseInt(that.temp_arr[0].price) < parseInt(that.temps.discount)) {
                                    layer.msg("优惠价小于等于官方价！", {icon: 2})
                                    return;
                                }

                                if (that.items.areas.length <= 0) {
                                    layer.msg("请选择区域", {icon: 2});
                                    return;
                                }
                                var arr = [], str = /^[1-9]\d*$/;

                                for (var i = 0; i < that.temp_arr.length; i++) {
                                    var query = {};
                                    query.carId = that.temp_arr[i].carId;
                                    query.exteriorColorId = that.temp_arr[i].exteriorColorId;
                                    query.interiorColorId = that.temp_arr[i].interiorColorId;
                                    query.price = that.temp_arr[i].price;
                                    if (i == 0) {

                                        if (!str.test($(".stocks_" + i).eq(0).val())) {
                                            layer.msg("第1行库存/辆的个数只能是1~9之间的数字！", {icon: 2});
                                            return;
                                        }
                                        query.stock = $(".stocks_" + i).eq(0).val();

                                        if (!str.test($(".onWays_" + i).eq(0).val())) {
                                            layer.msg("第1行在途/辆的个数只能是1~9之间的数字!", {icon: 2});
                                            return;
                                        }
                                        query.onWay = $(".onWays_" + i).eq(0).val();

                                    } else {
                                        if (!str.test($(".stocks_" + i).eq(1).val())) {
                                            layer.msg("第" + (1 + i) + "行库存/辆的个数只能是1~9之间的数字！", {icon: 2});
                                            return;
                                        }
                                        query.stock = $(".stocks_" + i).eq(1).val();

                                        if (!str.test($(".onWays_" + i).eq(1).val())) {
                                            layer.msg("第" + (1 + i) + "行在途/辆的个数只能是1~9之间的数字!", {icon: 2});
                                            return;
                                        }
                                        query.onWay = $(".onWays_" + i).eq(1).val();
                                    }
                                    query.discount = that.temps.discount == "" ? 0 : that.temps.discount;
                                    query.lowPrice = that.temps.lowPrice == "" ? that.temp_arr[0].price : that.temps.lowPrice;
                                    query.userId = config.USERID();
                                    query.areas = that.items.areas;
                                    arr.push(query);
                                }
                                var params = {"query": arr};
                                layer.confirm('确定该款车<strong style="color:red;">优惠：' + (that.temps.discount != "" ? that.temps.discount : 0) + '元</strong>吗？', {
                                    title: '提示',
                                    btn: ['确定', '取消'] //按钮
                                }, function (index) {
                                    layer.close(index);
                                    that.updateMethos(params, 2, null);
                                }, function () {
                                });
                            },
                            btn2: function (index) {
                                layer.closeAll();
                                /*修改弹框初始化*/
                                that.clearChildDb();
                            },
                            cancel: function () {
                                that.clearChildDb();
                            }
                        });

                        that.temp_arr = [];
                        /*筛选批量数据*/
                        for (var i = 0; i < that.checkedIndex.length; i++) {
                            for (var j = 0; j < that.arr_items.length; j++) {
                                if (that.checkedIndex[i] == j) {
                                    that.temp_arr.push(that.arr_items[j]);
                                }
                            }
                        }

                        that.temps.brandName = that.temp_arr[0].brandName;
                        that.temps.carModelName = that.temp_arr[0].carModelName;
                        that.temps.carName = that.temp_arr[0].carName;
                        /**
                         * _idx:根据组件的个数来下下面 if else 的条件的。
                         * 目前默认为两个组件
                         * */
                        if (that.$children[0].provincecity != undefined) {
                            that.$children[0].getRelationship(null, 0);
                        } else {
                            that.$children[1].getRelationship(null, 0);
                        }
                    } else {
                        layer.msg("请选择批量修改内容");
                    }
                }, function () {
                });
            }
            ,
            /**
             * 全选
             * */
            allChecked()
            {
                if (!$("#all").attr("checked")) {
                    this.checkedIndex = [];
                    $(".all").removeAttr("checked");
                    for (var i = 0; i < this.arr_items.length; i++) {
                        $(".all").eq(i).attr("checked", "true");
                        this.checkedIndex.push(i);
                    }
                } else {
                    this.checkedIndex = [];
                    $(".all").removeAttr("checked");
                }
            }
            ,
            /**
             * 初始化选中地区弹框
             * */
            selectarea(obj)
            {
                /*把选择对象放到零时变量中*/
                this.mask_1 = layer.open({
                    type: 1,
                    title: '选择区域',
                    skin: 'layui-layer-rim', //加上边框
                    area: ['590px', '420px'],
                    content: $(".activearea")
                });
            }
            ,
            update(obj, e, _index)
            {
                $(".update").attr("disabled", true);
                $(e.target).removeAttr("disabled");

                var that = this;
                this.temp_items = [];
                this.temp_items = obj;

                layer.confirm('您确定要添加吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function (index) {
                    layer.close(index);
                    /**
                     * _idx:根据组件的个数来下下面 if else 的条件的。
                     * 目前默认为两个组件
                     * */
                    if (that.$children[0].provincecity != undefined) {
                        that.$children[0].getRelationship(null, 0);
                    } else {
                        that.$children[1].getRelationship(null, 0);
                    }
                    $(".update_" + _index).show();
                    $(".show_" + _index).hide();
                    $("input[type='checkbox']").attr("disabled", "true");
                    $(".update").attr("disabled", true);
                    $(e.target).removeAttr("disabled");
                }, function () {
                });
            }
            ,
            /**
             * 修改或者批量修改我的报价
             * */
            updateMethos(params, num, obj)
            {
                var ii = layer.msg('保存中......', {icon: 16, shade: [0.5, '#000'], time: 0});
                var that = this;
                $.ajax({
                    url: config.API_BASE + "/4s/offer/batchAddCarPrice",
                    method: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(params),
                    beforeSend: function (request) {
                        request.setRequestHeader("sessionid", config.SESSIONID());
                    },
                    success: function (response) {
                        if (response.code == 0) {
                            layer.msg("添加成功......");
                            layer.close(this.mask_3);
                            layer.close(ii);
                            if (num == 1) {
                                that.items.areas = [];
                                that.arr_items.$remove(obj);
                                that.count--;
                                $(".update,input[type='checkbox']").removeAttr("disabled");
                            } else {
                                setTimeout(function () {
                                    that.checkedIndex = [];
                                    that.$parent.getActivityList(0);
                                    layer.closeAll();
                                    that.items.areas = [];
                                    that.checkedIndex = [];
                                    $(".add input").val("");
                                }, 800)
                            }
                        } else {
                            layer.close(ii);
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
            /**
             * 添加
             * */
            save(obj, e, index)
            {
                var discount_ = $(".discount_" + index).val() != "" ? $(".discount_" + index).val() : 0;
                var str = /^[1-9]\d*$/;

                if (parseInt(obj.price) < parseInt(discount_)) {
                    layer.msg("优惠价小于等于官方价！", {icon: 2})
                    return;
                }

                if (!str.test($(".stock_" + index).val())) {
                    layer.msg("库存/辆的个数只能是1~9之间的数字！", {icon: 2})
                    return;
                }

                if (!str.test($(".onWay_" + index).val())) {
                    layer.msg("在途/辆的个数只能是1~9之间的数字！", {icon: 2})
                    return;
                }

                if (this.items.areas.length <= 0) {
                    layer.msg("请选择区域", {icon: 2});
                    return;
                }

                var query = {};
                query.carId = this.temp_items.carId;
                query.exteriorColorId = this.temp_items.exteriorColorId;
                query.interiorColorId = this.temp_items.interiorColorId;
                query.price = this.temp_items.price;
                query.stock = $(".stock_" + index).val();
                query.onWay = $(".onWay_" + index).val();
                query.discount = discount_;
                query.lowPrice = $(".lowPrice_" + index).val() != "" ? $(".lowPrice_" + index).val() : obj.price;
                query.userId = config.USERID();
                query.areas = this.items.areas;

                var arr = [];
                arr[0] = query;
                var params = {"query": arr};
                var that = this;
                layer.confirm('确定该款车<strong style="color:red;">优惠：' + discount_ + '元</strong>吗？', {
                    title: '提示',
                    btn: ['确定', '取消'] //按钮
                }, function (index) {
                    layer.close(index);
                    that.updateMethos(params, 1, that.temp_items);
                    that.clearChildDb();
                }, function () {
                    $(".update_" + index).hide();
                    $(".show_" + index).show();
                    $(".update,input[type='checkbox']").removeAttr("disabled");
                });

            }
            ,
            /**
             * 取消添加
             * */
            cancle(_index)
            {
                $(".update_" + _index).hide();
                $(".show_" + _index).show();
                $(".update,input[type='checkbox']").removeAttr("disabled");
                this.clearChildDb();
            }
        }
    }
</script>
<style scoped>
    @import "../../assets/css/tables.css";
    [v-cloak] {
        display: none;
    }

    .selected {
        color: #fa8c35 !important;
        border: 1px solid #fa8c35 !important;;
    }

    .batch-change {
        width: 890px;
        margin: 0 auto;
    }

    .batch-change a {
        padding-right: 30px;
    }

    .batch-change .change {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: -3px;
        margin-right: 3px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0I3RjI2OTE3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0I3RjI2OTA3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6lQwTQAAAA30lEQVR42pSSPQqEMBCFVwkixj9svIHsQWwUDysoVh5EbQSLpBRFiWDhDkZcYSVZXxEmw/fIzzxl27bXEyEpMc9zURSWZYVhiBBSpXSWZX3fd11XliV0RIZlWcAAK99O0yQyAJqmaVVVURRpmua6bhzH0FduH81vMo4j1O9dpmkahnF/wpUGUUpt2+b0jQHoPM9P2nGcJEl0XT8B9ZcehuFKY4yvjPqI/hr+pA/Duq5gYIxJ6cPQtm1d1/y/xfSRJUJI0zRQwGjwLkn4YOZBEPi+73kexEucLuVpvD8CDAAq4oPfXOYlMQAAAABJRU5ErkJggg==) no-repeat;
    }

    .batch-change .delete {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: -3px;
        margin-right: 3px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M1RTE4MjU3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M1RTE4MjQ3MzMxMTFFNkI4NUU4NjQyQjc5MDE1MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4bIPLcAAAA3ElEQVR42tySPQqDQBSE16gogmhjLXgGbxGw9QCey0tYCV7BM4iInYV/IBb+ZMwja9DC2GaKYfh44+LbFdZ1raqq73v2UZqmTdMgmKbpui7nuq5bliWgEIbhPM/sSqIoBkGwFbIsY7/JcZytMAxDFEWX057naZomIS3L0nUdgmEYbdsiqKoKH8fxG2IM/uAfsG3b93048vOtAyRJPMmyzF1RlDMkPdhN/UNh3xKtmXyapjM8FvI8j+O4LEvkJEnOcC9g67hzPJCiKIjWdc1PIIgBupztLd36h5cAAwAHk2/CnNyQYgAAAABJRU5ErkJggg==) no-repeat;
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

    div dl {
        margin: 10px 0;
    }

    div.add dl dt, div.add dl dd {
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

    div.add button {
        padding: 5px 60px;
        /*margin: 20px 15px;*/
        font-size: 16px;
        background: #fa8c35;
        color: #FFF;
        border: none;
        cursor: pointer;
    }

    div.activearea button {
        padding: 0 10px 0 10px;
        white-space: nowrap;
        display: inline-block;
        border-radius: 2px;
        height: 26px;
        line-height: 26px;
        text-decoration: none;
        font-size: 14px;
        min-width: 40px;
        text-align: center;
        outline: none;
        border: none;
        cursor: pointer;
        background: #fa8c35;
        color: #FFF;
    }

    div dl dd button:hover {

    }

    div dl dd button:last-child {
        background: #ccc;
    }

    div dl dd button:last-child:hover {
        background: #666;
    }

    .add {
        padding: 0px 20px;
    }

    .add table tr th, .add table tr td {
        border: 1px solid #b3b3b3;
        padding: 5px 10px;
        text-align: center;
    }

    .add table thead th {
        background: #CCCCCC;
    }

    .add table tr td input[type="text"] {
        display: inline-block;
        width: 80px;
    }

    .cityStyle {
        display: inline-block;
        padding: 0 10px;
        margin-right: 10px;
        background: #e8e8e8;
        margin-bottom: 10px;
    }
</style>
