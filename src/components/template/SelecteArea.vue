<template>
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
</template>
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
    div.layer_2  dl dt {
        display: inline-block;
        width: 80px;
        text-align: right;
    }

    div.layer_2 dl dd {
        margin-left: 2px;
        text-align: left;
    }

    div.layer_2 dl dd i {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: sub;
        position: absolute;
        right: -10px;
        top:-10px;
        background: url('/assets/img/close_1.png') no-repeat;
        background-position: 0 0!important;
    }
    div.layer_2 dl dd em{
        position: absolute;
        right: 8px;
        top: 0;
        color: #999;
    }
    div.layer_2 dl dd ul li {
        float: left;
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
    div.layer_2 dl dd button {
        padding: 5px 60px;
        margin: 20px 15px;
        font-size: 16px;
        background: #fa8c35;
        color: #FFF;
        border: none;
        cursor: pointer;
    }
    div.layer_2 dl dd button:last-child{
        background: #ccc;
    }
    div.layer_2 dl dd button:last-child:hover{
        background: #666;
    }
</style>
<script>
    export  default{
        data(){
            return {
                provinces:"",
                provincecity:"",
                clone_provincecity:"",
                mask_1:"",
                mask_3:"",
                selectedKey:"",
                global:false,
                city_items:[]
            }
        },
        methods:{
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
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            util.login();
                        }
                    }
                });
            },
            removeAll(){
                $("#selectedKey").removeAttr("disabled");
                $("#global").removeClass("selected");
                this.global = false;
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
        }
    }
</script>