<template>
    <div>
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
            <dd style="position: relative"><input type="text" name="offer" v-model="offer">  <em>元</em></dd>
            <dd v-if="offer_"> <i></i>{{offer_msg}}</dd>
        </dl>
        <dl class="clearfix">
            <dt>活动时间：</dt>
            <dd>
                <input type="text" id="start-date" v-model="start_date" v-on:click="setStart" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
                至
                <input type="text" id="end-date" v-model="end_date" v-on:click="setEnd" readonly class="select-date" placeholder="年/月/日&nbsp;&nbsp;&nbsp;时/分">
            </dd>
            <dd v-if="timer_"> <i></i>{{timer_msg}}</dd>
        </dl>
        <dl class="clearfix">
            <dt>活动数量：</dt>
            <dd style="position: relative"><input type="number" name="number" v-model="number"> <em>辆</em></dd>
            <dd v-if="number_"><i></i>{{number_msg}}</dd>
        </dl>
        <dl class="clearfix">
            <dt>销售区域：</dt>
            <dd>
                <ul id="areas_" class="clearfix">
                    <li v-for="city in cirys">
                        {{city.name}}
                    </li>
                    <a href="javascript:;;" v-on:click="selectarea" class="a_style">选择区域</a>
                </ul>
            </dd>
            <dd v-if="selectarea_" style="display: none;">
                <i></i>
                {{selectarea_msg}}
            </dd>
        </dl>
        <dl class="clearfix" style="position: relative;">
            <dt>活动图片：</dt>
            <dd>
                <a class="upload-img a_style"  href="javascript:;;">
                    <label for="upload-file">上传文件</label>
                </a>
                <input type="file"  name="upload-file" id="upload-file" v-on:change="uploadfile">
                <span class="file_value">{{file_value}}</span>
            </dd>
            <dd v-if="file_">
                <i></i>{{file_msg}}
            </dd>
            <dd>
                （图片尺寸不小于800*360px）
            </dd>
        </dl>
        <dl class="clearfix">
            <dt>活动说明：</dt>
            <dd style="display: inline-block;width: 576px;height: 210px;">
                <textarea name="desc" v-model="desc" cols="68" rows="8" placeholder="填写相关活动说明~" style="padding: 5px;text-indent: 2em;"></textarea>
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
</template>
<script>
    export  default {
        ready(){

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
                    cirys:[],
                    selectarea_:false,
                    selectarea_msg:"",
                    file_value:"",
                    file_:false,
                    file_msg:"",
                    desc:"",

                }
            }
        },
        methods:{
            setStart(){},
            setEnd(){},
            selectarea(){},
            uploadfile(){},
            save(){}
        }
    }
</script>

<style scoped>
    div dl {
        margin: 10px 0;
    }

    div dl dt, div dl dd {
        float: left;
        height: 35px;
        line-height: 35px;
    }
    div dl dt:nth-child(n+2){
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
</style>