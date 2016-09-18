<template>
    <div class="UC_main_r">
        <div class="upload_div clearfix">
            <div class="upload_div_left">
                <div class="action">
                    <a class="upload-img">
                        <label for="upload-file"><i class="icon-upload"></i> 立即上传</label>
                    </a>
                    <input type="file" name="upload-file" id="upload-file" v-on:change="btnUploadFile($event)">
                    <p>仅支持jpg,jpeg,png,gif,且图片小于3M</p>
                </div>
                <div class="imageBox">
                    <div class="thumbBox"></div>
                    <div class="spinner" style="display: none;">Loading...</div>
                </div>
                <div class="recommend">
                    <h3 class="recommend-title">推荐头像</h3>
                    <ul class="recommend-ul clearfix">
                        <li><a v-on:click="recommendBtn('/img/default.png')"><img src="/img/default.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_1.png')"><img src="/img/head_1.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_2.png')"><img src="/img/head_2.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_3.png')"><img src="/img/head_3.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_4.png')"><img src="/img/head_4.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_5.png')"><img src="/img/head_5.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_6.png')"><img src="/img/head_6.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_7.png')"><img src="/img/head_7.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_8.png')"><img src="/img/head_8.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_9.png')"><img src="/img/head_9.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_10.png')"><img src="/img/head_10.png" alt=""></a></li>
                        <li><a v-on:click="recommendBtn('/img/head_11.png')"><img src="/img/head_11.png" alt=""></a></li>
                    </ul>
                    <button class="save" id="btnCrop" v-on:click="btnCrop">保存</button>
                    <button class="cancle">取消</button>
                </div>
            </div>
            <div class="upload_div_right">
                <h4>预览效果</h4>
                <h5>您可以在此娱乐最终生成的头像效果</h5>
                <div class="cropped">
                    <img src="/img/default.png" class="large" alt="120*120">
                    <p>120*120像素</p>
                    <img src="/img/default.png" class="medium" alt="80*80">
                    <p>80*80像素</p>
                    <img src="/img/default.png" class="small" alt="60*60">
                    <p>60*60像素</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import cropbox from './../../assets/js/cropbox'
    export default {
        ready(){
            this.cropper = $('.imageBox').cropbox(this.options);
        },
        data(){
            return {
                options :{
                    thumbBox: '.thumbBox',
                    spinner: '.spinner',
                    imgSrc: '/img/default.png'
                },
                cropper :""
            }
        },
        methods:{
            btnUploadFile(e){
                var _this = this;
                var reader = new FileReader();
                reader.onload = function(e) {
                    _this.options.imgSrc = e.target.result;
                    _this.cropper = $('.imageBox').cropbox(_this.options);
                };
                var that = e.target;
                var filesType = that.files[0].type;
                if(filesType == "image/jpeg" || filesType == "image/jpg" || filesType == "image/png" || filesType == "image/gif" ){
                    if(that.files[0].size/1024>=3){
                        layer.msg('上传图片过大', {icon: 7});
                        that.files = {};
                    }else {
                        reader.readAsDataURL(that.files[0]);
                        that.files = {};
                    }
                }else{
                    layer.msg('暂不支持该格式', {icon: 7});
                    that.files = {};
                }
            },
            btnCrop(){
                var img = this.cropper.getDataURL();
                $('.large,.medium,.small').attr("src","");
                $('.large').attr("src",img);
                $('.medium').attr("src",img);
                $('.small').attr("src",img);
                $(".productImg img").attr("src",img);
                layer.msg('头像设置成功', {icon: 1});
            },
            recommendBtn(imgSrc){
                this.options.imgSrc =imgSrc;
                this.cropper = $('.imageBox').cropbox(this.options);
            }
        }
    }
</script>

<style scoped>
    .upload_div{
        padding: 30px 60px;
    }
    .upload_div_left{
        float: left;
        width: 500px;
        height: 800px;
    }
    .upload-img{
        display: inline-block;
        padding: 10px 35px;
        border: 1px solid #e6e6e6;
        font-size: 16px;
        color: #333333
    }
    .upload-img i{
        display: inline-block;
        width: 21px;
        height: 21px;
        background-image: url('/img/icon-upload.png');
        background-size: 100% 100%;
        vertical-align: middle;
    }
    .action{
        position: relative;
    }
    .action p {
        margin: 10px;
    }
    input[type='file']{
        display: inline-block;
        width: 160px;
        height: 46px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        z-index: 2;
        cursor: pointer;
    }
    .imageBox{
        position: relative;
        height: 280px;
        width: 480px;
        border: 1px solid #f0f0f0;
        background: #fafafa;
        overflow: hidden;
        background-repeat: no-repeat;
        cursor: move;
    }
    .imageBox .thumbBox {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 120px;
        margin-top: -60px;
        margin-left: -60px;
        box-sizing: border-box;
        /*border: 1px solid rgb(102, 102, 102);*/
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.1);
        background: none repeat scroll 0% 0% transparent;
    }
    .imageBox .spinner {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        line-height: 400px;
        background: rgba(0,0,0,0.7);
    }
    .recommend-title{
        margin-left: 10px;
        font-size: 16px;
    }
    .recommend ul li{
        float: left;
        margin: 6px;
        display: inline-block;
        width: 70px;
        height: 70px;
        border-radius: 100px;
    }
    .recommend ul li a,.recommend ul li a img{
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    button{
        padding: 5px 50px;
        margin: 35px 10px;
        border: none;
        color: #FFF;
        font-size: 16px;
        cursor: pointer;
    }
    .save{
        background: #fa8c35;
    }
    .save:hover{
        background: #ff791f;
    }
    .cancle{
        background: #cccccc;
    }
    .cancle:hover{
        background: #999999;
    }
    .upload_div_right{
        float: left;
        width: 290px;
        height: 550px;
        border-left: 1px dashed #f0f0f0;
    }
    .upload_div_right h4{
        margin-left: 20px;
        margin-top:30px;
        font-size: 16px;
        color: #333;
    }
    .upload_div_right h5{
        margin-left: 20px;
        font-size: 14px;
        color: #999;
    }
    .upload_div_right .cropped{
        text-align: center;
    }
    .upload_div_right .cropped img{
        margin-top: 20px;
        border-radius: 100px;
        overflow: hidden;
    }
    .large{
        display: inline-block;
        width: 120px;
        height: 120px;
    }
    .medium{
        display: inline-block;
        width: 80px;
        height:80px;
    }
    .small{
        display: inline-block;
        width: 60px;
        height:60px;
    }
</style>
