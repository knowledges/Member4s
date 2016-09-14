<template>
    <div class="table">
        <p style="text-align: right;">
            共：{{count}}条
        </p>
        <table>
            <thead>
                <tr>
                    <th>时间</th>
                    <th>品牌</th>
                    <th>车型</th>
                    <th>车款</th>
                    <th>外观颜色</th>
                    <th>内饰颜色</th>
                    <th>官方价/元</th>
                    <th>特价/元</th>
                    <th>活动时间</th>
                    <th>库存/辆</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="history in historys">
                    <td>{{history.createTime}}</td>
                    <td>{{history.brandName}}</td>
                    <td>{{history.carModelName}}</td>
                    <td>{{history.carName}}</td>
                    <td>{{history.exteriorColorName}}</td>
                    <td>{{history.interiorColorName}}</td>
                    <td>{{history.price}}</td>
                    <td>{{history.specialPrice}}</td>
                    <td>
                        <p>{{history.startDate}}</p>
                        <p>{{history.endDate}}</p>
                    </td>
                    <td>{{history.number}}</td>
                </tr>
            </tbody>
        </table>
        <div id="page2" style="margin:20px 0;text-align: center;"></div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import config from './../../config'
    export default{
        ready(){
            console.log("sessionid:",config.SESSIONID);
            this.getHistoryList(1);
        },
        data(){
            return {
                historys:[],
                cur:1,
                count:0,
                pagesize:10
            }
        },
        methods:{
            getHistoryList(cur){
                var any = this.$route.params.any.split('/');

                var ii = layer.load();
                var that = this;
                var query = {};
                query.user_id = "199";
                query.interior_color_id = any[2];
                query.exterior_color_id= any[1];
                query.pagenum = that.pagesize;
                query.page = cur;
                query.car_id = any[0];
                var params = {"query":query};

                $.ajax({
                    url:config.API_BASE+"/4s/activityTrend/list/",
                    method:"POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType:"json",
                    data:JSON.stringify(params),
                    beforeSend:function (request) {
                        request.setRequestHeader("sessionid",config.SESSIONID||JSON.parse(sessionStorage.getItem("SESSIONID")).session.sessionid);
                    },
                    success:function (response) {
                        if(response.code == 0){
                            that.count = response.data.count;
                            that.$set("historys",response.data.rows);

                            layer.close(ii);
                            console.log("总数："+ Math.ceil(that.count/that.pagesize))
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
                                        that.getHistoryList(curr);
                                    }
                                }
                            });

                            that.$nextTick(function () {

                                $(".laypage_btn").unbind("click").on('click',function(){
                                    if($(".laypage_skip").val()>0 && $(".laypage_skip").val()<=Math.ceil(that.count/that.pagesize)){
                                        that.getSpecialList($(".laypage_skip").val());
                                    }else{
                                        layer.msg('请输入正确的跳转页码');
                                    }
                                })

                            })

                        }
                    },
                    error:function(fail){
                        if(fail.status == "401"){
                            layer.msg('登录失效，请重新登陆！');
                            that.$route.router.go("/login");
                        }
                    }
                })
            }
        }
    }
</script>
<style scoped>
    table{
        width: 100%;
        border:1px solid #ccc;
    }
    table thead tr th{
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
        background: #f1f2f3;
        color: #000000;
    }
    table thead tr th em {
        display: inline-block;
        width: 18px;
        height: 18px;
        color: #0a8ddf;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        -ms-border-radius: 10px;
        -o-border-radius: 10px;
        border-radius: 10px;
        border: 1px solid #0a8ddf;
        vertical-align: middle;
        cursor: pointer;
    }
    table thead tr th em~div{
        display: none;
    }
    em:hover~div{ display: block; }

    table tbody tr:hover{
        background: #fff5ef;
        cursor: pointer;
    }
    table tbody tr td{
        border: 1px solid #ccc;
        text-align: center;
        padding: 20px 5px;
    }
    table tbody tr td a {
        display: block;
    }
    table tbody tr td a:hover ,table tbody tr td a:active {
        color: #eb7350;
    }
    .table{
        position: relative;
        margin: 10px 15px;
    }
</style>