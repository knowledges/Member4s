<template>
    <div class="UC_main_r">
        <div class="U_info" role="新消息">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <li class="icon-new-uc icon-news"></li>
                    <li>新消息 <em>12</em> 条</li>
                    <li><a href="#" class="orange">立即查看>></a></li>
                </ul>
            </div>
            <div class="U_info_content">
                <ul class="U_info_c_ul clearfix">
                    <li><h3>喵喵店主</h3>，欢迎您！</li>
                    <li>
                        初级会员
                    </li>
                    <li>
                        积分：<em>2000</em>
                    </li>
                    <li>
                        <a href="">积分规则>></a>
                    </li>
                    <ul>
                        <li>常用信息设置 <i role="三角形"></i></li>
                        <li><a href="">基本资料</a> </li>
                        <li><a href="">地址管理</a></li>
                        <li><a href="">投向管理</a></li>
                        <li><a href="">修改密码</a></li>
                    </ul>
                </ul>
                <ul class="U_info_c_ul clearfix">
                    <li>新订单 <em>8</em> </li>
                    <li>|</li>
                    <li>已付定金 <em>5</em> </li>
                    <li>|</li>
                    <li>待提车 <em>10</em></li>
                </ul>
            </div>
        </div>
        <div class="U_new_order" role="订单表">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <li class="nav_title_li_border"></li>
                    <li><strong>最新订单</strong></li>
                </ul>
                <div class="nav_title_right">
                    <a href="">查看订单</a>
                </div>
            </div>
        </div>
        <div class="U_new_eye" role="报价">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <i role="icon"></i>
                    <li class="nav_title_li_border"></li>
                    <li><strong>最新报价</strong></li>
                </ul>
                <div class="nav_title_right">
                    <a href="">报价管理</a>
                </div>
            </div>
        </div>
        <div class="U_new_active" role="活动">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <li class="nav_title_li_border"></li>
                    <li><strong>最新活动</strong></li>
                </ul>
                <div class="nav_title_right">
                    <a href="">报价管理</a>
                </div>
            </div>
        </div>
        <div class="U_new_integral" role="积分兑换">
            <div class="nav_title clearfix">
                <ul class="nav_title_left">
                    <li class="nav_title_li_border"></li>
                    <li><strong>积分兑换</strong></li>
                    <li><a>前往兑换</a></li>
                </ul>
            </div>
        </div>
        <button id="test1" v-on:click="tipes">小小提示层</button>
        <mould-table :stats="stats" :judge="judge" :idx="idx" :explain="explain" :pagesize="pagesize"  :arr_title="arr_title" :arr_items="arr_items"></mould-table>
        <nav-pagination :cur="cur" :all="all" v-on:btn-click="listen"></nav-pagination>

        <div id="page2" style="text-align: center;"></div>

    </div>
</template>

<script>
    import {loader} from '../util/util'
    import NavPagination from '../components/NavPagination.vue'
    import MouldTable from '../components/template/MouldTable.vue'
    import $ from 'jquery'

    export default {
        ready(){
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

            this.$http.get('TableTitle.json').then(function (response) {
                var cToObj=eval("("+response.data+")");
                this.$set("arr_title",cToObj.data);
            });
            this.$http.get('task.json').then(function (response) {
                var cToObj=eval("("+response.data+")");
                this.$set("arr_items",cToObj.data);
            });
        },
        data(){
            return {
                stats:1,
                judge:true,
                idx:'4',
                explain:"如您对官方价有疑问，请致电400-138-0808。",
                arr_title:[],
                arr_items:[],
                cur: 1,
                all: 35,
                pagesize:10,
                msg: ''
            }
        },
        components:{
            NavPagination,
            MouldTable
        },
        methods:{
            listen(data){
                this.msg = '你点击了'+data+ '页'
            },
            tipes(){
                layer.msg('hello Layer')
            }
        }
    }
</script>

<style scoped>
    .active{
        color: orange;
    }
</style>