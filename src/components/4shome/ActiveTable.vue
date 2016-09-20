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
                    特价/元
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
                <tr v-if="arr_active.car_model_name == '' && arr_active.car_name==''">
                    <td colspan="11">
                        <p>没有搜索到内容......</p>
                    </td>
                </tr>
                <tr>
                    <td>{{arr_active.car_model_name}}</td>
                    <td>{{arr_active.car_name}}</td>
                    <td>{{arr_active.interior_color_name}}</td>
                    <td>{{arr_active.exterior_color_name}}</td>
                    <td>{{arr_active.price}}</td>
                    <td>{{arr_active.special_price}}</td>
                    <td>
                        <p>{{arr_active.start_date}}</p>
                        <p>{{arr_active.end_date}}</p>
                    </td>
                    <td>{{arr_active.number}}</td>
                    <td>
                        <span v-if="arr_area_active.length<=0">暂无数据</span>
                        <span v-for="arr in arr_area_active">
                            {{arr.sales_area_name}}
                        </span>
                    </td>
                    <td>
                        <p v-if="arr_active.status==1">审核中</p>
                        <p v-if="arr_active.status==2">未开始</p>
                        <p v-if="arr_active.status==3">在售</p>
                        <p v-if="arr_active.status==4">停售</p>
                        <p v-if="arr_active.status==5">过期</p>
                        <p v-if="arr_active.status==6">审核失败</p>
                    </td>
                    <td>
                        <a v-if="arr_active.status==3" v-link="{path:'/u/active/thisShop/find/'+arr_active.id}">停售</a>
                        <a v-if="arr_active.status==4" v-link="{path:'/u/active/thisShop/find/'+arr_active.id}">在售</a>
                        <a v-if="arr_active.status==2 || arr_active.status==4 || arr_active.status==6" v-link="{path:'/u/active/thisShop/find/'+arr_active.id}">修改</a>
                        <!--<a v-if="arr_active.status==2 || arr_active.status==5 " v-bind:href="'/u/active/thisShop/find/'+arr_active.id">删除</a>-->
                        <a v-if="arr_active.status==2 || arr_active.status==5 " v-link="{path:'/u/active/thisShop/find/'+arr_active.id}">删除</a>
                        <!--<a v-link="{path:'/u/active/thisShop/1'}">历史</a>-->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        props:{
            stats:Number,
            judge:Boolean,
            idx:String,
            explain:String,
            pagesize:Number,
            column:Number,
            arr_area_active:{
                type:Array,
                default:()=>[]
            },
            arr_active:{
                type:Object,
                default:()=>{}
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