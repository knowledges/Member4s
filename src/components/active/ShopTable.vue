<template>
    <div class="table">
        <table>
            <thead>
            <tr>
                <th>
                    车型
                </th>
                <th>
                    车款
                </th>
                <th>
                    外观颜色
                </th>
                <th>
                    内饰颜色
                </th>
                <th>
                    官方价/元
                    <em> ! </em>
                    <div class="popup">
                        <h3>如您对官方价有疑问，请致电400-138-0808。</h3>
                    </div>
                </th>
                <th>
                    优惠价/元
                </th>
                <th>
                    活动时间
                </th>
                <th>
                    库存/辆
                </th>
                <th>
                    销售区域
                </th>
                <th>
                    状态
                </th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in arr_items" v-if="$index<pagesize">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.color_A}}</td>
                <td>{{item.color_B}}</td>
                <td>{{item.price_A}}</td>
                <td>{{item.price_B}}</td>
                <td>
                    <p>{{item.startTimer}}</p>
                    <p>{{item.endTimer}}</p>
                </td>
                <td>{{item.stock}}</td>
                <td>{{item.area}}</td>
                <td>{{item.statue}}</td>
                <td v-if="stats>0">
                    <a v-on:click="update(item)">修改</a>
                    <a v-link="{path:'/u/active/thisShop/1'}">历史</a>
                    <a v-on:click="del(item)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="activeinfo" style="display: none;">
        <active-info></active-info>
    </div>
</template>

<script>
    import  ActiveInfo from './ActiveInfo.vue'
    export default {
        props: {
            stats: Number,
            judge: Boolean,
            idx: String,
            explain: String,
            pagesize: Number,
            arr_title: {
                type: Array,
                default: function () {
                    return []
                }
            },
            arr_items: {
                type: Array,
                default: ()=>[]
            }
        },
        components:{
            ActiveInfo
        },
        methods:{
            update(obj){
                layer.open({
                    type: 1,
                    title: '活动详情修改',
                    maxmin: true,
                    shadeClose: true, //点击遮罩关闭层
                    skin: 'layui-layer-rim', //加上边框
                    area : ['750px' , '800px'],
                    content: $(".activeinfo")
                });
            },
            del(obj){
                layer.confirm('确定删除该活动吗？', {
                    title:'删除活动',
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.msg('删除成功', {icon: 1});
                }, function(){
                    layer.msg('取消操作');
                });
            }
        }

    }
</script>

<style scoped>
    @import "./../../assets/css/datepicker.css";

    table {
        width: 100%;
        border: 1px solid #ccc;
    }

    table thead tr th {
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

    table thead tr th em ~ div {
        display: none;
    }

    em:hover ~ div {
        display: block;
    }

    table tbody tr:hover {
        background: #fff5ef;
        cursor: pointer;
    }

    table tbody tr td {
        border: 1px solid #ccc;
        text-align: center;
        padding: 20px 5px;
    }

    table tbody tr td a {
        display: block;
    }

    table tbody tr td a:hover, table tbody tr td a:active {
        color: #eb7350;
    }

    .table {
        position: relative;
        margin: 10px 0px;
    }

    .popup {
        position: absolute;
        top: -38px;
        left: 30%;
        background-image: url("../../assets/img/popup.png");
        width: 256px;
        height: 51px;
        background-size: 100% 100%;
    }

    .popup h3 {
        color: #999;
        line-height: 42px;
        display: inline-block;
        text-align: center;
        margin-left: 4px;
    }
    div.activeinfo {
        display: inline-block;
        padding: 20px;
        font-size: 16px;
    }
</style>