<template>
    <div class="UC_main_r">
        <div class="fill_in_info">
            <dl class="clearfix">
                <dt>当前密码：</dt>
                <dd><input type="text" v-model="cur_password" placeholder="请输入当前使用密码"></dd>
            </dl>
            <dl class="clearfix">
                <dt>新密码：</dt>
                <dd>
                    <input type="text" v-model="new_password" placeholder="请输入新密码">
                </dd>
            </dl>
            <dl class="clearfix">
                <dt>确认密码：</dt>
                <dd>
                    <input type="text" v-model="agree_password" placeholder="请再次输入新密码">
                    (6-16个英文字母、数字或符号)
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <ul class="clearfix">
                        <li>安全级别：</li>
                        <li :class="low?'red':''">低</li>
                        <li :class="middle?'yellow':''">中</li>
                        <li :class="high?'green':''">高</li>
                    </ul>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt></dt>
                <dd>
                    <button>保存</button>
                    <button>取消</button>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default{
        data(){
            return{
                cur_password:'',
                new_password:'',
                agree_password:'',
                low:false,//低
                middle:false,//中
                high:false//高

            }
        }
    }
</script>

<style scoped>
    .red{
        color: red!important;
        border-bottom: 4px solid  red!important;;
    }
    .yellow{
        color: orange!important;;
        border-bottom: 4px solid orange!important;;
    }
    .green{
        color: green!important;;
        border-bottom: 4px solid green!important;;
    }
    .UC_main_r div{
        padding: 45px 80px 0 80px;
        font-size: 16px;
    }
    .UC_main_r div dl{
        margin: 20px 0;
    }
    .UC_main_r div dl dt,.UC_main_r div dl dd{
        float: left;
        height: 35px;
        line-height: 35px;
    }
    .UC_main_r div dl dt{
        display:inline-block;
        width: 80px;
        text-align: right;
    }
    .UC_main_r div dl dd{
        margin-left: 20px;
        text-align: left;
    }
    .UC_main_r div dl dd ul li{
        float: left;
    }
    .UC_main_r div dl dd ul li:nth-child(n+2){
        padding: 0 35px;
        margin: 0 2px;
        border-bottom: 4px solid #ccc;
        font-size: 12px;
        color: #ccc;
    }
    .UC_main_r div dl dd input[type="text"]{
        padding: 0 5px;
        border: 1px solid #CCCCCC;
        height: 34px;
        width: 380px;
    }
    .UC_main_r div dl dd button{
        padding: 5px 60px;
        margin: 0 15px;
        background: #fa8c35;
        color: #FFF;
        border: none;
        cursor: pointer;
    }
    .UC_main_r div dl dd button:last-child{
        background: #ccc;
    }
    .fill_in_info  dl:last-child{
        padding: 20px 0 40px 0;
    }
</style>