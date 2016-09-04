<template>
    <div class="table">
        <table>
            <thead>
            <tr>
                <th v-for="title in arr_title_active">
                    {{title.name}}
                    <em v-if="judge && $index==idx"> ! </em>
                    <div class="popup"  v-if="judge && $index==idx">
                        <h3 v-text="explain"></h3>
                    </div>
                </th>
                <th v-if="stats>0">操作</th>
            </tr>
            </thead>
            <tbody>
                <!--<tr v-if="arr_active.length<=0">-->
                    <!--<td colspan="{{arr_title_active.length+1}}">-->
                        <!--<p>没有搜索到内容......</p>-->
                    <!--</td>-->
                <!--</tr>-->
            <!--<tr v-for="item in arr_active" v-if="$index<pagesize">-->
                <tr>
                    <td>A1</td>
                    <td>2016款 30 FSL 舒适型</td>
                    <td>白色</td>
                    <td>灰色</td>
                    <td>485800.00</td>
                    <td>1,600.00</td>
                    <td>45700,00</td>
                    <td>10</td>
                    <td>2</td>
                    <td>南京市</td>
                    <td v-if="stats>0">
                        <a v-on:click="update">修改</a>
                        <a>历史</a>
                        <a>删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props:{
            stats:Number,
            judge:Boolean,
            idx:String,
            explain:String,
            pagesize:Number,
            column:Number,
            arr_title_active:{
                type:Array,
                default:function () {
                    return []
                }
            },
            arr_active:{
                type:Array,
                default:()=>[]
            }
        },
        methods:{
            update(){
                layer.open({
                    type: 2,
                    title: '身份验证',
                    maxmin: true,
                    shadeClose: true, //点击遮罩关闭层
                    skin: 'layui-layer-rim', //加上边框
                    area : ['380px' , '310px'],
                    content: '/static/components/template/verify/identity.html'
                });
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
        /*margin: 10px 15px;*/
    }
    .popup{
        position: absolute;
        top: -38px;
        left: 30%;
        background-image: url("../../assets/img/popup.png");
        width: 256px;
        height: 51px;
        background-size: 100% 100%;
    }
    .popup h3{
        color: #999;
        line-height: 42px;
        display: inline-block;
        text-align: center;
        margin-left: 4px;
    }
</style>