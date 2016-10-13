<template>
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
        <dl class="clearfix">
            <dt>可选区域：</dt>
            <dd>
                <div class="line"></div>
                <ul class="clearfix">
                    <li v-on:click="selectAllClk" id="global">全国</li>
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
            </dd>
        </dl>
        <dl class="clearfix">
            <dt></dt>
            <dd>
                <div class="line"></div>
                <button class="agree" v-on:click="areaAgree">确定</button>
                <button class="cancle" v-on:click="areaCancle">取消</button>
            </dd>
        </dl>
    </div>
</template>
<style scoped>
    select{
        display: inline-block;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0 10px;
        outline: none;
    }
    .selected{
        color: #fa8c35!important;
        border: 1px solid #fa8c35!important;;
    }
    .layer_2  dl dt {
        display: inline-block;
        width: 80px;
        text-align: right;
    }
    .layer_2  dl dt {
        display: inline-block;
        width: 80px;
        text-align: right;
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
    button{
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
    .cancle{
        background: #ccc;
    }
    .cancle:hover{
        background: #666;
    }
</style>
<script>
    import $ from 'jquery'
    import config from './../../config'
    import util from './../../util/util'
    export  default{
        data(){
            return {
                global:false,
                provinces:"",
                provincecity:"",
                selectedKey:"",
                city_items:[]
            }
        },
        methods:{
            /**
             * 获取省市关系
             * obj 当前选择对象中的地区
             * statue:0 添加【特价车、报价】中的地区加载后的操作
             *       1 修改【特价车、报价】中的地区加载后的操作
             * */
            getRelationship(obj,statue){
                var that = this;
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
                        if(statue != undefined && statue == 1){
                            if(obj !== null){
                                that.getSaleAreaByArray(obj);
                            }
                        }else if(statue == 0){
                            that.selectedKey="江苏省";
                            that.selectedProvinces();
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
            /**
             * 根据选择地区显示到弹出框中
             * */
            getSaleAreaByArray(obj){
                var that = this;
                that.rem_item = obj;
                that.$parent.items.areas = [];
                that.$parent.items._areas = [];
                that.$parent.items.id = obj.id;
                that.$parent.items.brandName = obj.brand_name;
                that.$parent.items.carModelName = obj.car_model_name;
                that.$parent.items.car_id = obj.car_id;
                that.$parent.items.carName = obj.car_name;
                that.$parent.items.price = obj.auth_price;
                that.$parent.items.special_price = obj.special_price;
                that.$parent.items.interior_color_id = obj.interior_color_id;
                that.$parent.items.interiorColorName = obj.interior_color_name;
                that.$parent.items.exterior_color_id = obj.exterior_color_id;
                that.$parent.items.exteriorColorName = obj.exterior_color_name;
                that.$parent.items.number = obj.number;
                that.$parent.items.start_date = obj.start_date;
                that.$parent.items.end_date = obj.end_date;
                that.$parent.items.file_img = obj.car_image;
                that.$parent.items.desc = obj.description;
                var str = obj.sales_area;
                var list = str.substring(1,str.length-1).split(",");

                for(var i = 0 ; i< list.length;i++){
                    if(list[i].trim()=="全国"){
                        that.$parent.items.areas.push({"sales_area_name":"全国","sales_area_level":"1"})
                        that.$parent.items._areas.push({"sales_area_name":"全国","sales_area_level":"1"})
                        that.global = true;
                        $("#selectedKey").attr({"disabled":true});
                        $("#global").addClass("selected");
                    }else if(list[i].trim().indexOf("省")>=0 || list[i].trim().indexOf("特别行政区")>=0  || list[i].trim()=="北京市" || list[i].trim()=="天津市" || list[i].trim()=="上海市" || list[i].trim()=="重庆市"){
                        that.$parent.items.areas.push({"sales_area_name":list[i],"sales_area_level":"2"});
                        that.$parent.items._areas.push({"sales_area_name":list[i],"sales_area_level":"2"});
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
                        that.$parent.items.areas.push({"sales_area_name":list[i].trim(),"sales_area_level":"3"})
                        that.$parent.items._areas.push({"sales_area_name":list[i].trim(),"sales_area_level":"3"})
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
            /**
            * 移除全国，打开selected 事件，显示地区
            * */
            removeAll(){
                $("#selectedKey").removeAttr("disabled");
                $("#global").removeClass("selected");
                this.global = false;
            },
            /**
             * 取消选中的省、市
             * */
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
            /**
             * 选中全国，关闭selected 事件，隐藏地区
             * */
            selectAllClk(){
                this.getRelationship(null,0);
                this.global = true;
                $("#selectedKey").find("option[value=0]").attr({"selected":true});
                $("#selectedKey").attr({"disabled":true});
                $("#global").addClass("selected");
            },
            /**
             * 省市切换
             * */
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
            /**
             * 选中省市
             * */
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
            /**
             * 提交
             * */
            areaAgree(){
                layer.close(this.$parent.mask_1);
                var list = $(".filter_li li");
                this.$parent.items.areas = [];
                this.$parent.items._areas = [];
                for(var i = 0 ; i< list.length;i++){
                    if(list.eq(i).text()=="全国"){
                        this.$parent.items.areas[0] = {"salesAreaName":"全国","salesAreaLevel":"1"};
                        this.$parent.items._areas[0] = {"sales_area_name":"全国","sales_area_level":"1"};
                    }else if(list.eq(i).text().indexOf("省")>=0 || list.eq(i).text().indexOf("特别行政区")>=0  || list.eq(i).text()=="北京市" || list.eq(i).text()=="天津市" || list.eq(i).text()=="上海市" || list.eq(i).text()=="重庆市"){
                        this.$parent.items.areas.push({"salesAreaName":list.eq(i).text(),"salesAreaLevel":"2"});
                        this.$parent.items._areas.push({"sales_area_name":list.eq(i).text(),"sales_area_level":"2"});
                    }else{
                        this.$parent.items.areas.push({"salesAreaName":list.eq(i).text(),"salesAreaLevel":"3"})
                        this.$parent.items._areas.push({"sales_area_name":list.eq(i).text(),"sales_area_level":"3"})
                    }
                }
                console.log("父类："+JSON.stringify(this.$parent.items.areas));
            },
            /**
             * 取消
             * */
            areaCancle(){
                layer.close(this.$parent.mask_1);
            },
        }
    }
</script>
