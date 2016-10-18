<template>
    <div class="table table-box">
        <table>
            <thead>
                <tr>
                    <th class="car-model">
                        车型
                    </th>
                    <th class="car-style">
                        车款
                    </th>
                    <th class="car-out-color">
                        外观颜色
                    </th>
                    <th class="car-int-color">
                        内饰颜色
                    </th>
                    <th class="car-com-pri">官方价/元
                        <a class="prompt">
                            <div class="prompt-mes">如您对官方有疑问，请致电 400-138-0808</div>
                        </a>
                    </th>
                    <th class="car-off-pri">
                        优惠/元
                    </th>
                    <th class="car-last-pri">
                        报价/元
                    </th>
                    <th class="car-stock">
                        库存/辆
                    </th>
                    <th class="car-way">
                        在途/辆
                    </th>
                    <th class="car-place">
                        销售区域
                    </th>
                    <th  class="car-operation">操作</th>
                </tr>
            </thead>
            <tbody>
            <tr v-if="istrue">
                <td colspan="11" style="font-size: 16px;">
                    <div class="order-nodata">
                        <h4><i class="order-nobg"></i>抱歉，暂无相关信息！</h4>
                        <p>您可进入 <a v-link="{ path:'/u/manage/myOffer/find/0'}">报价管理</a> 页面查看信息</p>
                    </div>
                </td>
            </tr>
            <tr v-if="!istrue">
                <td>{{arr_offer.car_model_name}}</td>
                <td>{{arr_offer.car_name}}</td>
                <td>{{arr_offer.exterior_color_name}}</td>
                <td>{{arr_offer.interior_color_name}}</td>
                <td>{{arr_offer.price}}</td>
                <td>{{arr_offer.discount}}</td>
                <td>{{arr_offer.low_price}}</td>
                <td>{{arr_offer.stock}}</td>
                <td>{{arr_offer.onway}}</td>
                <td>
                    <span v-if="arr_area_offer == null ||arr_area_offer.length<=0">
                        暂无数据
                    </span>
                    <span v-for="arr in arr_area_offer">
                        {{arr.sales_area_name}}
                    </span>
                </td>
                <td>
                    <a v-link="{path:'/u/manage/myOffer/find/0'}">修改</a>
                    <a v-link="{path:'/u/manage/myOffer/find/0'}">历史</a>
                    <a v-link="{path:'/u/manage/myOffer/find/0'}">删除</a>
                    <!--<a v-on:click="jumpPage(arr_offer.id)">修改</a>-->
                    <!--<a v-on:click="jumpPage(arr_offer.id)">历史</a>-->
                    <!--<a v-on:click="jumpPage(arr_offer.id)">删除</a>-->
                </td>
            </tr>
            </tbody>
        </table>
        {{sum}}
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
            arr_area_offer:{
                type:Array,
                default:()=>[]
            },
            arr_offer:{
                type:Object,
                default:()=>{}
            }
        },
        computed: {
            /**
             * 监听对象是否是空
             * */
            sum: function() {
                var obj = this.arr_offer;
                this.istrue = $.isEmptyObject(obj);
                return ;
            }
        },
        data(){
            return {
                istrue:false
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/tables.css";
    [v-cloak] {
        display: none;
    }
</style>
