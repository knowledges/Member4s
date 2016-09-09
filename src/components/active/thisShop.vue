<template>
    <div class="wrap">
        <div class="brand-list clearfix">
            <p class="G_fl">主营品牌：<span>123</span></p>
            <p class="G_fl">副营品牌：<span></span></p>
        </div>
        <div class="select-bar clearfix">
            <div class="select-box G_fl">
                <form action="#">
                    <select v-model="selectedKey" v-on:change="statusChange">
                        <option value="0" selected="selected">全部</option>
                        <option value="3" >在售</option>
                        <option value="4">停售</option>
                        <option value="5">过期</option>
                        <option value="2">未开始</option>
                        <option value="1">审核中</option>
                        <option value="6">审核失败</option>
                    </select>
                </form>
            </div>
            <div class="total-num G_fr">共：<span>222</span>条</div>
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
    import $ from 'jquery'
    export default {
        ready(){
            this.getSpecialList(0);
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
                all: 35,
                pagesize:10
            }
        },
        components:{
            ShopTable
        },
        methods:{
            getSpecialList(status){
                var arr = [];
                if(status == 0){
                    arr = [1,2,3,4,5,6];
                }else{
                    arr.push(status);
                }
                var ii = layer.load();
                var that = this;
                var url=  config.API_BASE +"/4s/special/list";
                var query={};
//                query.user_id =  config.USERID;
                query.user_id =  "186";
                query.status = arr;
                query.pagenum = this.pagesize;
                query.page = 1;
//                query.createtime =dateFilter(new Date().getTime(),4);

                var param = {query:query};
                $.ajax({
                    url:url,
                    method:'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data:JSON.stringify(param),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID);
                    },
                    success:function (response) {
                        if(response.code == 0){
                            that.$set("arr_items",response.data);

                            if(response.data.length>that.pagesize){
                                laypage({
                                    cont: document.getElementById('page2'), //容器。值支持id名、原生dom对象，jquery对象,
                                    pages: 100, //总页数
                                    skip: true, //是否开启跳页
                                    skin: '#ff9205;',
                                    groups: 7, //连续显示分页数
                                    first: 1, //将首页显示为数字1,。若不显示，设置false即可
                                    last: 100, //将尾页显示为总页数。若不显示，设置false即可
                                    jump: function(obj, first){
                                        //回调
                                        //得到了当前页，用于向服务端请求对应数据
                                        var curr = obj.curr;
                                    }
                                });
                            }
                        }
                        layer.close(ii);
                    },error:function (fail) {
                        if(fail.status == "401"){
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                });
            },
            statusChange(){
                this.getSpecialList(this.selectedKey);
            }
        }
    }
</script>

<style>
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