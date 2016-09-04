<template>
    <div class="UC_main_r">
        <div class="U_info" role="新消息">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <li class="icon-new-uc icon-news"></li>
                    <li>您已保存 <em>0</em> 个地址，还能设置 <em>8</em> 个</li>
                </ul>
            </div>
        </div>
        <div class="address_magment ohd" id="J_address_magment">
            <ul class="address_listbox clearfix">
                <li>
                    <a v-on:click="">
                        <i class="add" v-on:click="newAddress"></i>
                        添加新地址
                    </a>
                </li>
                <li>
                    <div>
                        <h2>张全蛋</h2>
                        <p>188188188188188</p>
                        <p><span>江苏省</span><span>南京市</span><span>玄武区</span></p>
                        <p>研发三区F栋2区</p>
                        <p>(210000)</p>
                        <p class="setting">
                            <a v-if="!selected" class="orange" v-on:click="setting(1)">设为默认</a>
                            <a v-if="selected" class="orange" v-on:click="setting(0)">取消默认</a>
                            <a class="orange" v-on:click="modify">修改</a>
                            <a class="orange" v-on:click="delete">删除</a>
                        </p>
                        <i class="selected" v-if="selected" role="选中"></i>
                    </div>
                </li>
            </ul>
            <div class="add_new addre" v-if="address">
                <dl>
                    <dt class="star"><em>*</em>收货人：</dt>
                    <dd>
                        <input type="text" class="receiver">
                        <div class="tips">
                            <p class=""></p>
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt class="star"><em>*</em>手机号：</dt>
                    <dd><input type="text" class="telephone">
                        <div class="tips"></div>
                    </dd>
                </dl>
                <dl>
                    <dt class="star"><em>*</em>地址：</dt>
                    <dd>
                        <select class="provice" name="proveice" data-lvl="0">
                            <option value="0">选择省</option>
                        </select>
                        <select class="city" name="city" data-lvl="1">
                            <option value="0">选择市</option>
                        </select>
                        <select class="area" name="district" data-lvl="2">
                            <option value="0">选择区</option>
                        </select>
                        <input type="text" class="address" placeholder="请输入详细地址">
                        <div class="tips"></div>
                    </dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>
                        <input type="checkbox" class="default" id="default" checked="">
                        <label for="default" class="default_txt">设为默认地址</label>
                    </dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>
                        <input type="submit" class="submit G_btn_a" value="保存">
                        <input type="submit" class="cancel G_btn_c" value="取消">
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                address:false,
                selected:false
            }
        },
        methods:{
            newAddress(){
                this.address = ! this.address
            },
            setting(num){
                var msg = "设置为默认值";
                    if(num==0){
                        msg = "取消默认";
                        this.selected = !this.selected;
                    }else {
                        this.selected = !this.selected;
                    }
                layer.msg(msg);
            },
            modify(){
                this.address = true;
            },
            delete(){
                layer.confirm('确认删除该地址吗？', {
                    title:'删除地址',
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.msg('店家了确定',{icon:1});
                }, function(){
                    layer.msg('我在想想');
                });
            }
        }
    }
</script>
<style>
    .UC_main_r {
        display: inline-block;
        letter-spacing: normal;
        word-spacing: normal;
        vertical-align: top;
        font-size: 12px;
        min-height: 600px;
        padding-bottom: 20px;
    }
    .orange{
        color:#ff791f;
    }
    /*store*/
    .nav_title {
        margin: 10px 0 0 0;
    }
    .nav_title .nav_title_left {
        float: left;
        margin-left: 20px;
        padding: 10px;
        display: inline-block;
        width: 50%;
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
    /*新增地址*/
    .address_listbox li{
        float: left;
        margin: 30px;
    }
    .address_listbox li:first-child{
        border: 2px dashed #ccc;
        color: #CCCCCC;
        font-size: 16px;
    }
    .address_listbox li:first-child a{
        position: relative;
        display: inline-block;
        width: 240px;
        height: 160px;
        border: 2px dashed #ccc;
        color: #CCCCCC;
        font-size: 16px;
        text-align: center;
        line-height: 230px;
        cursor: pointer;
    }
    .address_listbox li:first-child a i{
        position: absolute;
        top: 25%;
        left: 40%;
        display: inline-block;
        width: 60px;
        height: 60px;
        background: url('/img/add.png') no-repeat;
        background-size: 100% 100%;
    }
    .address_listbox li:nth-child(n+2) div{
        position: relative;
        display: inline-block;
        width: 240px;
        height: 162px;
        border: 1px solid #ccc;
        color: #CCCCCC;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }
    .address_listbox li:nth-child(n+2) div h2 {
        margin-left: 20px;
        padding: 8px 0;
        font-size: 18px;
        color: #000000;
        text-align: left;
    }
    .address_listbox li:nth-child(n+2) div p{
        margin-left: 20px;
        padding: 2px 0;
        text-align: left;
        font-size: 12px;
        color: #666;
    }
    p.setting{
        display: none;
        text-align: right!important;
        margin-right: 20px;
    }
    i.selected{
        position: absolute;
        bottom: 0;
        right: 0;
        display: none;
        width: 18px;
        height: 18px;
        background: url('/img/ico_warn.png') no-repeat;
        background-position: -86px -58px;
    }
    .address_listbox li:nth-child(n+2) div:hover{
        border: 1px solid #ff791f;
    }
    .address_listbox li:nth-child(n+2) div:hover p.setting{
        display: block;
    }
    .address_listbox li:nth-child(n+2) div:hover i.selected{
        display: block;
    }

    .address_magment .add_new ,.address_magment .address_listbox{
        margin-left: 80px;
    }
    .address_magment .add_new dl{
        margin-bottom: 25px;
        position: relative;
    }
    .address_magment .add_new dl dt{
        width: 75px;
        height: 30px;
        position: absolute;
        left: 0;
        font-size: 14px;
        line-height: 30px;
        color: #666;
    }
    .address_magment .add_new dl .star{
        padding-left: 10px;
        text-align: right;
    }
    .address_magment .add_new dl .star em{
        color: #ee1515;
    }
    .address_magment .add_new dl dd{
        margin-left: 90px;
        position: relative;
    }
    .address_magment .add_new dl dd input[type="text"]{
        height: 28px;
        line-height: 28px;
        border-radius: 3px;
        border:1px solid #ccc;
        text-indent: 10px;
        color: #666;
        font-size: 14px;
    }
    .address_magment .add_new dl dd .tips{
        display: inline-block;
        line-height: 30px;
        margin-left: 10px;
    }
    .address_magment .add_new dl dd .tips .error{color: #ed1b23;  }
    .address_magment .add_new dl dd .tips .suc{	color: #29ed0b;  }
    .address_magment .add_new dl dd select{
        width: 120px;
        margin-right: 5px;
        height: 30px;
        text-indent: 10px;
        border-radius: 3px;
        color: #666;
        font-size: 14px;
    }
    .address_magment .add_new .receiver,.address_magment .add_new .address,.address_magment .add_new .telephone{
        width: 50%;
        min-width: 200px;
    }
    .address_magment .add_new .address{
        display: inline-block;
        margin-top: 20px;
    }
    .address_magment .add_new .default{
        position: absolute;
        top: 7px;
    }
    .address_magment .add_new .default_txt{
        margin-left: 15px;
        line-height: 26px;
        color: #666;
    }
    .address_magment .add_new .submit{
        padding: 5px 60px;
        background: #fa8c35;
        color: #FFF;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin-right: 20px;
    }
    .address_magment .add_new .cancel{
        padding: 5px 60px;
        margin-right: 20px;
        background: #ccc;
        color: #FFF;
        border: none;
        cursor: pointer;
        font-size: 16px;
    }
</style>