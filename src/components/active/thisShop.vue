<template>
    <div class="wrap">
        <div class="brand-list clearfix">
            <p class="G_fl">主营品牌：<span>奥迪</span></p>
            <p class="G_fl">副营品牌：<span>一汽大众</span> <span>别克</span><span>标致</span> </p>
        </div>
        <div class="select-bar clearfix">
            <div class="select-box G_fl">
                <select v-model="selectedKey" v-on:change="statusChange">
                    <option value="0" selected="selected">全部</option>
                    <option value="3" >在售</option>
                    <option value="4">停售</option>
                    <option value="5">过期</option>
                    <option value="2">未开始</option>
                    <option value="1">审核中</option>
                    <option value="6">审核失败</option>
                </select>
            </div>
            <div class="total-num G_fr">共：<span>{{count }}</span>条</div>
        </div>
        <!--:arr_title="arr_title"-->
        <shop-table :stats="stats" :judge="judge" :idx="idx" :explain="explain" :pagesize="pagesize" :arr_items="arr_items"></shop-table>
        <div id="page2" style="margin:20px 0;text-align: center;"></div>
    </div>

</template>
<script>
    import ShopTable from './../../components/active/ShopTable.vue'
    import config from './../../config'
    import {dateFilter} from './../../filters'
    import util from './../../util/util'
    import $ from 'jquery'
    export default {
        route:{
            data(){
                this.find = this.$route.params.findId;
                console.log("findId:"+this.find);
                this.getSpecialList(this.find ,1);
            }
        },
        ready(){
            var that = this;

            $.ajax({
                url:config.API_BASE+"/nl/common/provincecity",
                method:"POST",
                contentType: 'application/json; charset=utf-8',
                dataType:"json",
                beforeSend:function (request) {
                    request.setRequestHeader("sessionid",config.SESSIONID());
                },
                success:function (response) {
                    that.$set("arr_items",response.data.data);
//                },
//                error:function (fail) {
//                    if(fail.status == "401"){
//                        layer.msg('登录失效，请重新登陆！');
//                        that.$route.router.go("/login");
//                    }
                }
            });

//            this.$http.get('task.json').then(function (response) {
//                var cToObj=eval("("+response.data+")");
//                this.$set("arr_items",cToObj.data);
//            });
        },
        data(){
            return {
                session:"",
                selectedKey:"",
                API_BASE:"",
                stats:1,
                judge:true,
                idx:'4',
                explain:"如您对官方价有疑问，请致电400-138-0808。",
//                arr_title:[],
                arr_items:[],
                cur: 1,
                count: 0,
                pagesize:10,
                find:""
            }
        },
        components:{
            ShopTable
        },
        methods:{
            getSpecialList(status,cur){
                var arr = [];
                if(status == 0){
                    arr = [1,2,3,4,5,6];
                }else{
                    arr[0]=parseInt(status);
                }
                var ii = layer.load();
                var that = this;
                var url=  config.API_BASE +"/4s/special/list";
                var query={};
                query.user_id =  config.USERID();
                query.status = arr;
                query.pagenum = that.pagesize;
                query.page = cur;
                if(that.find!=0){
                    query.id = that.find;
                }

                var param = {query:query};
                $.ajax({
                    url:url,
                    method:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify(param),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID());
                    },
                    success:function (response) {
                        if(response.code == 0){
                            that.count = response.data.count;
                            that.$set("arr_items",response.data.rows);

                            if(response.data.count>that.pagesize){

                                laypage({
                                    cont: document.getElementById('page2'), //容器。值支持id名、原生dom对象，jquery对象,
                                    pages: Math.ceil(that.count/that.pagesize), //总页数
                                    curr:cur||1,
                                    skip: true, //是否开启跳页
                                    skin: '#ff9205;',
                                    groups: 7, //连续显示分页数
                                    first: 1, //将首页显示为数字1,。若不显示，设置false即可
                                    last: Math.ceil(that.count/that.pagesize), //将尾页显示为总页数。若不显示，设置false即可
                                    jump: function(obj, first){
                                        //回调
                                        //得到了当前页，用于向服务端请求对应数据
                                        var curr = obj.curr;
                                        if(!first){
                                            that.getSpecialList(that.selectedKey,curr);
                                        }
                                    }
                                });

                                that.$nextTick(function () {

                                    $(".laypage_btn").unbind("click").on('click',function(){
                                        if($(".laypage_skip").val()>0 && $(".laypage_skip").val()<=Math.ceil(that.count/that.pagesize)){
                                            that.getSpecialList(that.selectedKey,$(".laypage_skip").val());
                                        }else{
                                            layer.msg('请输入正确的跳转页码');
                                        }
                                    })

                                })
                            }
                        }
                        layer.close(ii);
//                    },error:function (fail) {
//                        if(fail.status == "401"){
//                            layer.msg('登录失效，请重新登陆！');
//                            that.$route.router.go("/login");
//                        }
                    }
                });
            },
            statusChange(){
                this.getSpecialList(this.selectedKey,1);
            }
        }
    }
</script>

<style>
    select{
        display: inline-block;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
    }
    .wrap{
        width:890px;
        margin:0 auto;
    }
    .brand-list p{
        font-weight:bold;
        font-size:14px;
        color:#666;
        margin:30px 30px 25px 0;
    }
    .brand-list p span{
        margin-right:20px;
    }
    .select-bar{
        height:40px;
        line-height:40px;
        background:#f5f5f5;
    }
    .select-bar .select-box{
   margin-left:10px;
    }
    .select-bar .total-num{
        margin-right:15px;
    }
</style>