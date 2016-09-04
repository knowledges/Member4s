<template>
    <div class="table">
        <table>
            <thead>
                <tr>
                    <th v-for="title in arr_title">
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
                        <a>修改</a>
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
            arr_title:{
                type:Array,
                default:function () {
                    return []
                }
            },
            arr_items:{
                type:Array,
                default:()=>[]
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