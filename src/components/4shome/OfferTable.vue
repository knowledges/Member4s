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
                    优惠/元
                </th>
                <th>
                    报价/元
                </th>
                <th>
                    库存/辆
                </th>
                <th>
                    在途/辆
                </th>
                <th>
                    销售区域
                </th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="arr_offer.car_model_name=='' && arr_offer.car_name==''">
                <td colspan="11">
                    <p>没有搜索到内容......</p>
                </td>
            </tr>
            <tr>
                <td>{{arr_offer.car_model_name}}</td>
                <td>{{arr_offer.car_name}}</td>
                <td>{{arr_offer.interior_color_name}}</td>
                <td>{{arr_offer.exterior_color_name}}</td>
                <td>{{arr_offer.price}}</td>
                <td>{{arr_offer.discount}}</td>
                <td>{{arr_offer.low_price}}</td>
                <td>{{arr_offer.stock}}</td>
                <td>{{arr_offer.onway}}</td>
                <td>
                    <span v-if="arr_area_offer.length<=0">
                        暂无数据
                    </span>
                    <span v-for="arr in arr_area_offer">
                        {{arr.sales_area_name}}
                    </span>
                </td>
                <td>
                    <a v-on:click="jumpPage(arr_offer.id)">修改</a>
                    <a v-on:click="jumpPage(arr_offer.id)">历史</a>
                    <a v-on:click="jumpPage(arr_offer.id)">删除</a>
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
            arr_area_offer:{
                type:Array,
                default:()=>[]
            },
            arr_offer:{
                type:Object,
                default:()=>[]
            }
        },
        methods:{
           /* update(){
                layer.open({
                    type: 2,
                    title: '身份验证',
                    maxmin: true,
                    shadeClose: true, //点击遮罩关闭层
                    skin: 'layui-layer-rim', //加上边框
                    area : ['380px' , '310px'],
                    content: '/static/components/template/verify/identity.html'
                });
            }*/
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