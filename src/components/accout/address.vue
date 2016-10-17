<template>
    <div>

        <div class="U_info" role="新消息">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <li class="icon-new-uc icon-news"></li>
                    <li>您已保存 <em>{{addlist.length}}</em> 个地址，还能设置 <em>{{8 - addlist.length}}</em> 个</li>
                </ul>
                <button v-if="addlist.length < 8" class="btn-add" @click="addNewAddr">新增收货地址</button>
            </div>
        </div>

        <div class="address-list shipping-address">
            <div class="list"  v-if="addlist.length > 0">
                <div :id="'addr-' + item.id"  v-for="(i, item) in addlist | limitBy 8" @mouseenter="addActiveClass(i, $event)" @mouseleave="removeActiveClass(i, $event)" data-act="modify" :data-addrid="item.id" :class="item.status == 1 ? 'addr-cur' : ''" class="addr address-option-binded" tabindex="1">
                    <div class="inner">
                        <div class="addr-hd" title="{{item.receipt_province}}{{item.receipt_city}}{{item.receipt_quarter}}{{item.receipt_address}}({{item.receiver}}收)">
                            <span class="prov">{{item.receipt_province}}</span>
                            <span class="city">{{item.receipt_city}}</span>
                            <span>（</span><span class="name">{{item.receiver}}</span><span> 收）</span>
                        </div>
                        <div title="{{item.receipt_quarter}}{{item.receipt_address}}" class="addr-bd">
        <span class="dist">
                </span>
                            <span class="j_4tip"></span>
                            <span class="street">{{item.receipt_quarter}}{{item.receipt_address}}</span>
                            <span class="phone">{{item.telphone}}</span>
                            <p class="last"></p>
                        </div>
                        <div class="addr-toolbar">
                            <a title="修改地址" @click.prevent="modifyAddr(item)" href="#" class="modify">修改</a>
                            <a title="删除地址" @click.prevent="del(item, $index)" href="#" class="modify j_delAddr">删除</a>

                            <a v-if="item.status != 1" title="设置默认地址" @click.prevent="setting(item, $event)" href="#" target="_blank" class="modify j_delAddr">设置默认</a>
                        </div>
                    </div><ins class="curmarker"></ins>
                    <ins v-if="item.status == 1" class="deftip">默认地址</ins>
                    <div class="floater"></div>
                </div>
            </div>
            <div v-else class="null-list">
                <h1 class="hd"><i class="icon-null"></i>对不起！您暂无任何收货地址</h1>
                <p class="bd"><a href="#" @click.prevent="addNewAddr">立即添加收货地址</a></p>
            </div>
        </div>
        <div class="new-address-box" id="J_addressInfoPop">
            <validator name="validateaddr">
            <h2><span>( <em>*</em>星号为必填项 )</span> </h2>
            <dl>
                <dt>收货人姓名 <em>*</em></dt>
                <dd><input v-model="addrInfo.receiver" initial="off" v-validate:receiver = "['username']" class="i-text" placeholder="长度不超过25个字符" /></dd>
                <dd  v-show="$validateaddr.receiver.username">
                    <div class="msg-box">
                        <div class="msg msg-error show" id="J_MsgDivision">
                            <i></i>
                            <div class="msg-cnt tsl" data-phase-id="d_p_mapRecomend">收货人不能为空且长度不超过25个字符</div>
                        </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>所在地区 <em>*</em></dt>
                <dd>
                    <div @click="operaAreasPop" class="virtual-select">
                        <div  class="city-title has-city-title">
                            <input v-model="addrInfo.proviceSelected"  initial="off"  v-validate:provice-selected = "['username']" disabled="disabled" />
                            <input v-model="addrInfo.citySelected"  initial="off"  v-validate:city-selected = "['username']" disabled="disabled" />
                            <input v-model="addrInfo.areaSelected"  initial="off"  v-validate:area-selected = "['username']" disabled="disabled" />
                        </div>
                        <!--<div v-else class="city-title">请选择省市区</div>-->

                        <div class="vt-menu-button-dropdown"></div>
                        <div v-show="isAddresPop" class="address-overlay">
                            <div class="address-overlay-content">
                                <div class="city-select-warp">
                                    <div class="city-select-tab">
                                        <a class="current" @click.stop = "cityTab('city-province', $event)" attr-cont="" >省份</a>
                                        <a class="" @click.stop = "cityTab('city-city', $event)" attr-cont="city-city">城市</a>
                                        <a class="" @click.stop = "cityTab('city-district', $event)" attr-cont="city-district">县区</a>
                                    </div>
                                    <div class="city-select-content">
                                        <div class="city-select city-province">
                                            <dl class="clearfix city-select-province">
                                                <dd>
                                                    <a v-for="item in proviceItems" :title="item"  href="javascript:;" @click.stop = "choiceCity(item, 0, $event)"   :class="item === addrInfo.proviceSelected ? 'current' : ''">{{item}}</a>
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="city-select city-city" style="display: none;">
                                            <dl class="clearfix city-select-city">
                                                <dd>
                                                    <a v-for="item in cityItems" :title="item"  href="javascript:;" @click.stop = "choiceCity(item, 1, $event)"   :class="item === addrInfo.citySelected ? 'current' : ''">{{item}}</a>
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="city-select city-district" style="display: none;">
                                            <dl class="clearfix city-select-district">
                                                <dd>
                                                    <a v-for="item in areaItems" :title="item"  href="javascript:;" @click.stop = "choiceArea(item)"   :class="item === addrInfo.areaSelected ? 'current' : ''">{{item}}</a>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </dd>
                <dd v-show="$validateaddr.proviceSelected.username">
                    <div class="msg-box">
                        <div class="msg msg-error show" id="J_MsgDivision">
                            <i></i>
                            <div class="msg-cnt tsl" data-phase-id="d_p_mapRecomend">请选择省份/城市/县区</div>
                        </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>详细地址 <em>*</em></dt>
                <dd>
                    <textarea v-model="addrInfo.detailedAddress" initial="off" v-validate:detailed-address = "['noempty']"  class="detailed-address" autocomplete="off" name="addressDetail" id="J_Street" aria-label="详细地址" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"></textarea>
                </dd>
                <dd  v-show="$validateaddr.detailedAddress.noempty">
                    <div class="msg-box">
                        <div class="msg msg-error show" id="J_MsgDivision">
                            <i></i>
                            <div class="msg-cnt tsl" data-phase-id="d_p_mapRecomend">您如实填写详细收货地址，确保准备送达！</div>
                        </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>手机号码 <em>*</em></dt>
                <dd>
                    <input name="mobile"  v-model="addrInfo.telphone" initial="off" v-validate:telphone = "['tel']" class="i-text" aria-label="手机号码" type="text" placeholder="电话号码、手机号码必须填一项" value="">
                </dd>
                <dd  v-show="$validateaddr.telphone.tel">
                    <div class="msg-box">
                        <div class="msg msg-error show" id="J_MsgDivision">
                            <i></i>
                            <div class="msg-cnt tsl" data-phase-id="d_p_mapRecomend">请输入正确的手机号码~</div>
                        </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt></dt>
                <dd>
                    <input  type="checkbox" type="checkbox" v-model="addrInfo.status" :true-value="'1'" :false-value="'0'" class="i-chk" name="defaultAddress" id="J_SetDefault">
                    <label for="J_SetDefault" class="tsl">设置为默认收货地址</label>
                </dd>
            </dl>
            </validator>
        </div>

    </div>

</template>
<script>
    import config from '../../config'
    import $ from 'jquery'
    import util from './../../util/util'

    export default{
        ready(){
        this.showlist();
    },
    data(){
        return{
            defAddressId: '', //默认地址ID
            isAddresPop: false, // 地址弹窗布尔值 （false:未显示 true:显示）
            addrInfo:{  //地址信息
                'id': '',
                'receiver': '', //收货人姓名
                'proviceSelected': '', //省份
                'citySelected': '', //城市
                'areaSelected': '', //县区
                'detailedAddress': '', //详细地址
                'telphone': '', //收货人电话
                'status': '0' //默认地址状态
            },
            titMsg:"新增地址",
            selectAll: [], //所有身份城市县区列表
            proviceItems: [], //省份列表
            cityItems: [], //城市列表
            areaItems:  [], //县区列表
            addlist: [] //地址列表
        }
    },
    methods:{
        /*
         * 获取地址列表
         * @method showlist
         * @auth 遇。
         * */
        showlist(){
            var that = this;
            var lay = layer.msg('加载中', {icon: 16,shade : [0.5,'#000']});
            var url = config.API_BASE+"/4s/accountmanagement/addrlist";
            var query = {};
            query.uid = config.USERID();
            var param = { query:query };

            $.ajax({
                url:url,
                type:'POST',
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                data:JSON.stringify(param),
                beforeSend:function (request) {
                    request.setRequestHeader("sessionid",config.SESSIONID());
                },
                success:function(response){
                    if(response.code == 0){
                        layer.close(lay);
                        that.addlist = response.data;
                        $.each(that.addlist, function(i, item){
                            if(item.status == 1){
                                that.defAddressId = item.id;
                            }
                        });

                    }else{
                        layer.close(lay);
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
            })

        },
        /*
         * 添加鼠标经过class
         * @method addActiveClass
         * @auth 遇。
         * */
        addActiveClass(i, event){
            $(event.target).addClass('addr-active');
        },
        /*
         * 移除鼠标经过class
         * @method removeActiveClass
         * @auth 遇。
         * */
        removeActiveClass(i, event){
            $(event.target).removeClass('addr-active');
        },
        /*
         * 获取所有省份城市县区列表，如果isModifyFlag为true表示为修改，则会初始化省市区的选中
         * @auth 遇。
         * @method requestCityData
         * @param {Boolean} isModifyFlag:是否为修改（true-是，false-否）
         * */
        requestCityData(isModifyFlag){
            var that = this;
            $.ajax({
                url: config.API_BASE+'/static/areas.json',
                type:'GET',
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                beforeSend:function (request) {
                    request.setRequestHeader("sessionid",config.SESSIONID());
                },
                success:function(response){
                    that.$set("selectAll", response);
                    var province = [];
                    $.map(response, function(val, key){
                        province.push(key);
                    });
                    that.$set("proviceItems", province);
                    isModifyFlag && that.buildCity();
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
        /*
         * 操作地址弹窗，点击隐藏 | 显示
         * @auth 遇。
         * @method operaAreasPop
         * */
        operaAreasPop(){
            this.selectAll.length > 0 || this.requestCityData();
            this.isAddresPop ? this.isAddresPop = false : this.isAddresPop = true;
        },
        /*
         * 省份/城市/县区之间tab切换
         * @method getAllAreas
         * @auth 遇。
         * @param {String} 代表选择器class名称的字符串
         * @param {Object} 鼠标事件对象
         * */
        cityTab(name, event){
            var $this = $(event.target),
                    $addressOverlay = $this.closest('.address-overlay'),
                    $citySelect = $addressOverlay.find('.city-select'),
                    $curCityBox = $addressOverlay.find('.' + name);

            $citySelect.hide();
            $curCityBox.show();
            $this.siblings().removeClass('current');
            $this.addClass('current');
        },
        /*
         * 省份/城市 选择，选中自动联动切换
         * @method choiceCity
         * @auth 遇。
         * @param {Object} 当前数据对象
         * @param {Number} 等级 0: 省份，1：城市， 2：县区
         * */
        choiceCity(item, lvl, event){
            var that = this,
                    $this = $(event.target),
                    $addressOverlay = $this.closest('.address-overlay'),
                    $cityTrigger = $addressOverlay.find('.city-select-tab a'),
                    $cityBox = $addressOverlay.find('.city-select'),
                    cityArr = ['provice', 'city', 'area'],
                    completeSelName = cityArr[lvl] + 'Selected',
                    completeArrName = cityArr[lvl + 1] + 'Items',
                    i = lvl + 1,
                    items = [];
            $cityBox.hide();
            $cityBox.eq(lvl + 1).show();
            $cityTrigger.removeClass('current');
            $cityTrigger.eq(lvl + 1).addClass('current');

            while(i < cityArr.length){
                this['addrInfo'][cityArr[i] + 'Selected'] = '';
                i += 1;
            }
            this['addrInfo'][completeSelName] = item;

            if(lvl === 1){
                this.buildArea();
            }else{
                this.buildCity();
            }
        },
        /*
         * 根据省份名称生成城市列表
         * @method buildCity
         * @auth 遇。
         * @param {String} 省份名称
         * */
        buildCity(){
            var proviceName = this.addrInfo.proviceSelected,
                    items = [];
            $.map(this.selectAll[proviceName], function(val, key){
                items.push(key);
            });
            this.$set('cityItems', items);
            this.addrInfo.citySelected != '' && this.buildArea();
        },
        /*
         * 根据城市名称生成县区列表
         * @method buildArea
         * @auth 遇。
         * @param {String} 城市名称
         * */
        buildArea(){
            var cityName = this.addrInfo.citySelected,
                    items = this.selectAll[this.addrInfo.proviceSelected][cityName];
            this.$set('areaItems', items);
        },
        /*
         * 县区选择，且详细的街道地址会根据县区的选中，而打开可编辑
         * @method choiceArea
         * @auth 遇。
         * @param {Object} 当前数据对象
         * */
        choiceArea(item){
            this.addrInfo.areaSelected = item;
            this.isAddresPop = false;
        },
        /*
         * 设置默认收货地址
         * @method setting
         * @auth 遇。
         * @param {Object} 当前数据对象
         * */
        setting(item){
            var that = this;
            that.address = false;
            var url = config.API_BASE+"/4s/accountmanagement/setdefault";
            var query = {};
            query.uid = config.USERID();
            query.id = item.id;
            var param = { query:query };
            if(item.status == 0){
                $.ajax({
                    url:url,
                    type:'POST',
                    dataType: 'JSON',
                    contentType: 'application/json; charset=utf-8',
                    data:JSON.stringify(param),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function(response){
                        if(response.code == 1){
                            layer.msg('设置成功');
                            // 遍历addlist里的数据，将其数据中的状态改为0,并将当前的状态设置为1
                            for(var i=0; i<that.addlist.length; i++){
                                that.addlist[i].status = '0';
                            }
                            item.status = '1';
                            that.defAddressId = item.id;
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
            }

        },
        /*
         * 新增收货地址，主要功能重置所有地址信息为空
         * @auth 遇。
         * @method addNewAddr
         * */
        addNewAddr(){
            this.addrInfo.id = '';
            this.addrInfo.receiver = '';
            this.addrInfo.proviceSelected = '';
            this.addrInfo.citySelected = '';
            this.addrInfo.areaSelected = '';
            this.addrInfo.detailedAddress = '';
            this.addrInfo.telphone = '';
            this.addrInfo.status = '0';
            this.createPop();
        },
        /*
         * 删除地址
         * @method del
         * @auth 遇。
         * @param {Object} 当前数据对象
         * */
        del(item){
            var that = this;
            that.address = false;
            layer.confirm('确认删除该地址吗？', {
                title:'删除地址',
                btn: ['确定','取消'] //按钮
            },function(){
                var url = config.API_BASE+"/4s/accountmanagement/deladdress";
                var query = {};
                query.id = item.id;
                var param = { query:query };

                $.ajax({
                    url:url,
                    type:'POST',
                    dataType: 'JSON',
                    contentType: 'application/json; charset=utf-8',
                    data:JSON.stringify(param),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function(response){
                        that.addlist.$remove(item);
                        if(response.code == 0){
                            layer.msg('已删除成功');
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
                })
            }, function(){
            });
        },
        /*
         * 修改收货地址
         * @method setting
         * @auth 遇。
         * @param {Object} 当前数据对象
         * */
        modifyAddr(item){
            var that = this;
            this.isAddresPop = false;
            this.addrInfo.id = item.id;
            this.addrInfo.receiver = item.receiver;
            this.addrInfo.proviceSelected = item.receipt_province;
            this.addrInfo.citySelected = item.receipt_city;
            this.addrInfo.areaSelected = item.receipt_quarter;
            this.addrInfo.detailedAddress = item.receipt_address;
            this.addrInfo.telphone = item.telphone;
            this.addrInfo.status = item.status;

            this.requestCityData(!0);
            this.createPop();
        },
        /*
         * 生成地址编辑框弹窗
         * @method createPop
         * @auth 遇。
         * */
        createPop(){
            var that = this;
            layer.open({
                type: 1,
                title: that.titMsg,
                shadeClose: true,
                skin: 'layui-layer-rim', //加上边框
                area : ['480px'],
                content: $("#J_addressInfoPop"),
                btn: ['保存', '取消'],
                closeBtn: 0,
                yes: function(index, layero){
                    that.$validate(true, function () {
                        if(!that.$validateaddr.invalid){
                            var url = '',
                                    query = {};
                            query.user_id = config.USERID();
                            query.receiver = that.addrInfo.receiver;
                            query.receipt_province = that.addrInfo.proviceSelected;
                            query.receipt_city = that.addrInfo.citySelected;
                            query.receipt_quarter = that.addrInfo.areaSelected;
                            query.receipt_address = that.addrInfo.detailedAddress;
                            query.telphone = that.addrInfo.telphone;
                            query.status = that.addrInfo.status;

                            var param = { query:query };

                            that.addrInfo.id !== '' ? (url = config.API_BASE+"/4s/accountmanagement/updateaddress", query.id = that.addrInfo.id) : url = config.API_BASE+"/4s/accountmanagement/addaddress";

                            $.ajax({
                                url: url,
                                type: 'POST',
                                dataType: 'JSON',
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(param),
                                beforeSend: function(request) {
                                    request.setRequestHeader("sessionid",config.SESSIONID());
                                },
                                success: function(response){
                                    if(response.code == 0){
                                        var i, newAddrId = '';
                                        if(that.addrInfo.id !== ''){
                                            for(i = 0; i < that.addlist.length; i++){
                                                that.addlist[i].status = '0';
                                                if(that.addlist[i].id == that.addrInfo.id){
                                                    that.addlist[i].receiver = that.addrInfo.receiver;
                                                    that.addlist[i].receipt_province = that.addrInfo.proviceSelected;
                                                    that.addlist[i].receipt_city = that.addrInfo.citySelected;
                                                    that.addlist[i].receipt_quarter = that.addrInfo.areaSelected;
                                                    that.addlist[i].receipt_address = that.addrInfo.detailedAddress;
                                                    that.addlist[i].telphone = that.addrInfo.telphone;
                                                    that.addlist[i].status = that.addrInfo.status;
                                                }
                                            }
                                        }else{
                                            for(i = 0; i < that.addlist.length; i++){
                                                that.addlist[i].status = 0;
                                            }
                                            newAddrId = response.data;
                                            that.addlist.push({
                                                id: newAddrId,
                                                receiver : that.addrInfo.receiver,
                                                receipt_province : that.addrInfo.proviceSelected,
                                                receipt_city : that.addrInfo.citySelected,
                                                receipt_quarter : that.addrInfo.areaSelected,
                                                receipt_address : that.addrInfo.detailedAddress,
                                                telphone : that.addrInfo.telphone,
                                                status : that.addrInfo.status
                                            });
                                        }
                                        layer.close(index);
                                        layer.msg('保存成功');
                                    }else{
                                        layer.msg('保存失败');
                                    }
                                },
                                error: function(fail){
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
                        }
                    });
                },
                btn2: function(index){
                    //console.log(index);
                }
            });
        }
    }
    }
</script>
<style scoped>
    .msg {
        padding: 4px 4px 4px 24px;
        font-size: 12px;
        line-height: 16px;
        color: #404040;
        background-color: #FFFFE5;
        border: 1px solid #FFCC7F;
        overflow: hidden;
        zoom: 1;
        display: inline-block;
        zoom: 1;
    }
    .msg-error, .msg-stop, .msg-b-error, .msg-b-stop {
        background-color: #FFF2F2;
        border-color: #FF8080;
    }
    .msg-cnt {
        font-size: 12px;
    }
    .msg i {
        float: left;
        width: 20px;
        height: 20px;
        margin-left: -20px;
        background-image: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        background-size: 200px;
    }
    .msg-error i {
        background-position: -57px 1px;
    }
    .btn-add{
        float: right;
        padding: 0 15px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #ff7a1f;
        color: #fff;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 2px;
        margin: 0 10px;
    }
    /* 地址编辑 */
    .new-address-box{
        display: none;
        color: #333;
    }
    .new-address-box h2{
        padding-left: 100px;
        margin: 15px 0;
    }
    .new-address-box dl {
        position: relative;
        padding-left: 105px;
        padding-bottom: 10px;
        zoom: 1;
        text-align: left;
    }
    .new-address-box .i-chk, .new-address-box label {
        vertical-align: middle;
        outline: none;
    }
    input[type="checkbox"], input[type="radio"] {
        box-sizing: border-box;
        padding: 0;
    }
    .new-address-box dt{
        display: inline;
        float: left;
        width: 100px;
        margin-left: -105px;
        text-align: right;
        height: 26px;
        line-height: 26px;
    }
    .new-address-box dt em {
        color: #f00;
        font-style: normal;
    }
    .new-address-box .detailed-address {
        display: block;
        margin: 0;
        padding: 3px;
        width: 292px;
        height: 82px;
        border: 1px solid #afafaf;
        font-size: 12px;
    }
    .new-address-box .i-text {
        border: 1px solid #afafaf;
        padding: 3px;
        width: 200px;
        height: 18px;
        line-height: 18px;
        vertical-align: middle;
    }
    .virtual-select {
        width: 282px;
        border: 1px solid #ccc;
        font-size: 12px;
        padding: 4px 8px;
        outline: 0;
        position: relative;
        cursor: pointer;
    }
    .virtual-select .vt-menu-button-dropdown {
        position: absolute;
        top: 10px;
        right: 8px;
        width: 10px;
        height: 5px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoCAYAAADpE0oSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMDcvMTMw9/FFAAAAkklEQVRYhe3W0QqAIAwF0Gv0rX7Ufna9aNQwcauQ4u4pcHSYwW5JVTGjlikqYcKEfwGvjt7TihMRAEDO2falkZeFJq6offaUGz5OWqeN4C64db1RfBjufNMQnhiLhAkT/hw8HIsiokB7ZZZzlPNnY7G3j3t7/DZ8hUdQwBcSe6Od2qDv/YG08thbjEXChAl/D94AcPM/RZiYNrgAAAAASUVORK5CYII=) -10px -25px no-repeat;
    }
    .city-title {
        margin-right: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #ccc;
    }
    .city-title input,  .city-title input:disabled{
        width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        border:none;
        background: none;
    }
    .address-overlay{
        position: absolute;
        left:-1px;
        top:26px;
        z-index: 10;
        outline: 0;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .city-select-tab {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        width: 299px;
        height: 34px;
        background: #f0f0f0;
    }
    .has-city-title {
        color: #333;
    }
    .city-select-tab a {
        float: left;
        display: inline;
        margin-bottom: -1px;
        padding: 8px 20px;
        width: 58px;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid rgba(0, 0, 0, 0);
        color: #4D4D4D;
        text-align: center;
        outline: 0;
    }
    .city-select-tab a:hover{
        text-decoration: none;
    }
    .city-select-tab .current {
        background: #fff;
        border-bottom: 1px solid #fff;
        color: #f60;
    }
    .city-select {
        border: 1px #ccc solid;
        border-top: 0;
        padding: 10px 15px;
        width: 268px;
        background: #fff;
        font-size: 12px;
    }
    .city-select dl {
        line-height: 2;
        clear: both;
        padding: 3px 0;
        margin: 0;
    }
    .city-select a {
        display: inline-block;
        color: #4D4D4D;
        outline: 0;
        text-decoration: none;
        white-space: nowrap;
        margin-right: 2px;
        width: 65px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;;
    }
    .city-select a:hover, .city-select a:focus {
        background-color: #fff8f3;
        border-radius: 2px;
        color: #f60;
    }
    .city-select a.current {
        background-color: #f60;
        color: #fff;
        border-radius: 2px;
    }
    /*store*/
    .nav_title {
        padding: 20px;
    }
    .nav_title .nav_title_left {
        float: left;
        padding: 10px;
        display: inline-block;
        /*width: 50%;*/
    }
    .nav_title .nav_title_left li {
        float: left;
        padding-left: 5px;
        margin: 0;
        display: inline-block;
    }
    .nav_title .nav_title_left .icon-news {
        background-position: -60px -290px;
    }
    .nav_title .nav_title_left em {
        color: #ff7920;
    }
    /* 地址 */
    .shipping-address{
        margin-left: 30px;
        margin-top: 20px;
    }
    .shipping-address .addr {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 237px;
        height: 106px;
        margin: 0 30px 20px 0;
        color: #666;
        outline: none;
    }
    .shipping-address .addr .inner {
        z-index: 2;
        position: relative;
        height: 85px;
        padding: 11px 15px;
        background: url(data:image/png;base64,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) no-repeat;
        overflow: hidden;
    }
    .shipping-address .addr-cur .inner {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABqCAMAAABnJibdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDEzNUUxODA3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDEzNUUxODE3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMTM1RTE3RTdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTM1RTE3RjdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrIDFsEAAAMAUExURaxkaPr6+tvd2ufr9uXs9LpjXOXp87lkX9/d49za3+Hc4zJcsLFlZ/39/eDc3axlbq1iaejs+LdiX/v//6lkZ0twt9/a4bdiW/3/+uHh4d7Y4t/X4y9cr9ze2e/v7+fr9OLq9TRart/e3KtmZ93c2DBYr6hlbLRkXbliWjVasjJbs0lvuKplaLpiYC5brklutd7Z4LRkYy5csi9bsq1jbd3d4TNcrrllWy9dq0tvukpuuLhlYatjZ+Ps9TNcrC9csTFZrzFbqrVkYElvujNYsTFbr7hjXv///f/+/93d3f7///7+/v7//d3d37hjYLpiXrdkXt7e3v/9/tze3fz//93d2/3//jJar/7+/7dkYNzc3P//+/7+/N7c3f/9/zFbsTFbrTJasf3+///+/DBartvd3Nze27hjXN7d29/d3rdiXebt9Uhut7lhXfz//S9crdzd3/3//N3f3tzc3v/+/TJcst7e4KplaqtkauLd5P7/+7ZjXUltudvc3jJbreHb5d3b3TNbsd7c3+js9eXl5bdkXDBarDFcq7hiYeTq9t3f3DFarExwut3a4ebt993c2tzc2jBdsODc2+DY4zBasP79///9/OXp9Uttt//++v/8/+Tr9d3e4Ofu+N/f3+js97lkXebs+P79+01uu9/b3Klna7ViXrZmX7dlWuDd5NzZ4rdjYePc47VlXeXs9tre3eLb6/7/+qlkaatma0tsu97d2blhX0ltt+Te4uTq+ERtvLpgX9/a3vX19apja0xxuE5wuqliaKtiaf/8/tzb4ExuuOTk5C9esDBYrbxjX9vb2eXo9zNZrN/e49rc17lhYPz9/+Ps8+Lb49/d4DRaq/7/+d3Y3t7Y5N7Z3admat/Y4Nnd3t7f2uHd3f/++9re3+DW3ktrtuXb5k1vtrNjXLZhXjNata1naEltu+bm5i9dsuTd5enr9+zt8kVvt0tttbNjZOHc4E5wt+nq7ktxuklwv09vuOPb5uDd5vHx8fv//LtjX7tiXuLa5U5wuP////3d7HUAAA0CSURBVHja7F13eBTHFV8QsoiOKkCY+LABO9gES7KwLWODQS63U3b32l7v6hKqqAtRJHo3xYBt3HvDvfee3rsTpydOnN6bk5c3K+2ejP4MX/7Y40knfXtTf/PKzO6beSvB2fOYSb7rfEGmdXWa172HWJC9xXab11pyQ1BLXtdkXj+tze/V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);
    }
    .shipping-address .addr-cur .curmarker {
        visibility: visible;
    }
    .shipping-address .addr-active .inner {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABqCAMAAABnJibdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDEzNUUxODA3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDEzNUUxODE3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMTM1RTE3RTdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTM1RTE3RjdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrIDFsEAAAMAUExURaxkaPr6+tvd2ufr9uXs9LpjXOXp87lkX9/d49za3+Hc4zJcsLFlZ/39/eDc3axlbq1iaejs+LdiX/v//6lkZ0twt9/a4bdiW/3/+uHh4d7Y4t/X4y9cr9ze2e/v7+fr9OLq9TRart/e3KtmZ93c2DBYr6hlbLRkXbliWjVasjJbs0lvuKplaLpiYC5brklutd7Z4LRkYy5csi9bsq1jbd3d4TNcrrllWy9dq0tvukpuuLhlYatjZ+Ps9TNcrC9csTFZrzFbqrVkYElvujNYsTFbr7hjXv///f/+/93d3f7///7+/v7//d3d37hjYLpiXrdkXt7e3v/9/tze3fz//93d2/3//jJar/7+/7dkYNzc3P//+/7+/N7c3f/9/zFbsTFbrTJasf3+///+/DBartvd3Nze27hjXN7d29/d3rdiXebt9Uhut7lhXfz//S9crdzd3/3//N3f3tzc3v/+/TJcst7e4KplaqtkauLd5P7/+7ZjXUltudvc3jJbreHb5d3b3TNbsd7c3+js9eXl5bdkXDBarDFcq7hiYeTq9t3f3DFarExwut3a4ebt993c2tzc2jBdsODc2+DY4zBasP79///9/OXp9Uttt//++v/8/+Tr9d3e4Ofu+N/f3+js97lkXebs+P79+01uu9/b3Klna7ViXrZmX7dlWuDd5NzZ4rdjYePc47VlXeXs9tre3eLb6/7/+qlkaatma0tsu97d2blhX0ltt+Te4uTq+ERtvLpgX9/a3vX19apja0xxuE5wuqliaKtiaf/8/tzb4ExuuOTk5C9esDBYrbxjX9vb2eXo9zNZrN/e49rc17lhYPz9/+Ps8+Lb49/d4DRaq/7/+d3Y3t7Y5N7Z3admat/Y4Nnd3t7f2uHd3f/++9re3+DW3ktrtuXb5k1vtrNjXLZhXjNata1naEltu+bm5i9dsuTd5enr9+zt8kVvt0tttbNjZOHc4E5wt+nq7ktxuklwv09vuOPb5uDd5vHx8fv//LtjX7tiXuLa5U5wuP////3d7HUAAA0CSURBVHja7F13eBTHFV8QsoiOKkCY+LABO9gES7KwLWODQS63U3b32l7v6hKqqAtRJHo3xYBt3HvDvfee3rsTpydOnN6bk5c3K+2ejP4MX/7Y40knfXtTf/PKzO6beSvB2fOYSb7rfEGmdXWa172HWJC9xXab11pyQ1BLXtdkXj+tze/V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);
    }
    .shipping-address .addr-active .inner .addr-toolbar{
        display: block;
    }
    .shipping-address .addr .addr-hd {
        width: 100%;
        border-bottom: 1px solid #F2F2F2;
        padding: 0 0 5px;
        margin-bottom: 5px;
        height: 18px;
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .shipping-address .addr .city {
        font-weight: 700;
        max-width: 64px;
        margin-right: 10px;
        _width: 64px;
    }
    .shipping-address .addr .name {
        max-width: 64px;
        margin-right: 3px;
    }
    .shipping-address .addr .addr-hd span {
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .shipping-address .addr .addr-bd {
        height: 55px;
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
    }
    .shipping-address .address-option-binded .addr-bd {
        height: 36px;
    }
    .shipping-address .addr .addr-bd span {
        margin-right: 3px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .shipping-address .addr-toolbar {
        display: none;
    }
    .shipping-address .addr-toolbar a{
        color: #C97;
        cursor: pointer;
        margin: 0 5px;
    }

    .shipping-address .addr .curmarker {
        z-index: 3;
        position: absolute;
        background-position:-322px 0;
        width: 28px;
        height: 28px;
        top: 77px;
        right: 1px;
        visibility: hidden;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDkwRDM2NkE4NDYzMTFFNkIzRTA5MENFQUVBMDRENUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDkwRDM2NkI4NDYzMTFFNkIzRTA5MENFQUVBMDRENUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0OTBEMzY2ODg0NjMxMUU2QjNFMDkwQ0VBRUEwNEQ1RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0OTBEMzY2OTg0NjMxMUU2QjNFMDkwQ0VBRUEwNEQ1RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt58LboAAAImSURBVHjavJbhUttADIQl2emvTuHBCoUnbZ2EPhl/mPokdnXnBFqIQ7HjjIkTbu7TSitdJCLkUvdPk1A+XOL6pRqdmFwEOBhgwJC0OnCvfYziosDZ2sCtGnZXQTYJAnbFlG4NsMRJvVWlhK4D3APm3Fc7AAqsCSSdukZKd8zfiWtR4BYwnVmzGHAAzM5YtwiQymj6Dj4sawNZs6J0H25zCV8RSGUOWC8idR8m1dcBDunGWjWbgXwaOLmRt4OpXpW5TCEsCJxq1sOT0SxCUI6wnJfQq6glQrpzBIFEPOgxB/ZfyhDkmLAppXhZHc6cJx3e7zCyBWswPSUDzIA+MNqmPktHImLzqm5EBFRboGQyz005lBfnYA2D083izJS+7LNo6aOSH84dHIP6S87MEWvunbNzTN173fCIr95tHDunZrS+NIOY1OccyG2O3ZSnrNE9oKyZJqxLGxlrHfW72eH9Vp/xVMtCRkXfMrVQWaNhZXv5rceJmvrw2RX/8RPA9/qsCAOIZge6UOW2QIl6O+G72h74/g924NqxpdLeO4BP9dmhn9qmY1SzfMf7oF1LN5waVV9tGzv8/Qc4zJxncxc3HVsWaGu0YrbJNBReAXfahS9wVNU0RrrZtPZtyF+/2s49z+Yub4ZKNUhWickH5fgjisqyRq05PwVsSjZQ94SnzcuqX12L7oRpLJngcPvQ5H/rynjpVPRkz3bgbGBzfP0m4+OjPAswAIkUpPYFUULUAAAAAElFTkSuQmCC) no-repeat;
    }
    .shipping-address .addr-cur .curmarker {
        visibility: visible;
    }
    .shipping-address .addr .setdefault, .shipping-address .addr .deftip {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 2px;
        text-decoration: none;
        display: block;
        filter: alpha(opacity=70);
        opacity: .7;
        z-index: 3;
    }
    .shipping-address .addr .deftip {
        background: #CCC;
        color: #FFF;
    }
    .shipping-address .addr-def .deftip {
        display: block;
    }
    .shipping-address .option .container {
        padding: 6px 5px;
    }
    .shipping-address .control {
        min-height: 25px;margin-top:15px;
    }
    .shipping-address .control .surplus_addr{margin-left:10px}
    .shipping-address .manageAddr {
        float: right;
    }

    .null-list{
        padding: 20px 0;
        text-align: center;
    }
    .null-list .hd {
        color: #666;
        font-size: 16px;
        line-height: 46px;
    }
    .null-list .tips{
        color: #999;
        font-size: 12px;
        margin-bottom: 10px;
    }
    .null-list .tips a{
        color:#0492e8;
    }
    .null-list .bd a {
        display: inline-block;
        color: #fff;
        cursor: pointer;
        background: #0492e8;
        height: 26px;
        padding: 0 10px;
        line-height: 26px;
        border-radius: 3px;
    }
    .null-list .bd a:hover{
        text-decoration: none;
        background: #01b2ff;
    }
    .icon-null {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        vertical-align: -5px;
        background-image: url(data:image/png;base64,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);
        background-repeat: no-repeat;
        background-position: -96px 1px;
        background-size: 230px;
    }

</style>
