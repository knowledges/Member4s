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
                    特价/元
                </th>
                <th class="car-place">
                    活动时间
                </th>
                <th class="car-stock">
                    库存/辆
                </th>
                <th class="car-place">
                    销售区域
                </th>
                <th width="50">
                    状态
                </th>
                <th class="car-operation">操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-if="istrue">
                    <td colspan="11" style="font-size: 16px;">
                        <div class="order-nodata">
                            <h4><i class="order-nobg"></i>抱歉，暂无相关信息！</h4>
                            <p>您可进入 <a v-link="{ path:'/u/active/thisShop/find/0'}">活动车款</a> 页面查看信息</p>
                        </div>
                    </td>
                </tr>
                <tr v-if="!istrue">
                    <td>{{arr_active.car_model_name}}</td>
                    <td>{{arr_active.car_name}}</td>
                    <td>{{arr_active.exterior_color_name}}</td>
                    <td>{{arr_active.interior_color_name}}</td>
                    <td>{{arr_active.price}}</td>
                    <td>{{arr_active.special_price}}</td>
                    <td>
                        <p>{{arr_active.start_date}}</p>
                        至
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
                        <a v-if="arr_active.status==3" v-link="{path:'/u/active/thisShop/find/0'}">停售</a>
                        <a v-if="arr_active.status==4" v-link="{path:'/u/active/thisShop/find/0'}">在售</a>
                        <a v-if="arr_active.status==2 || arr_active.status==4 || arr_active.status==6" v-link="{path:'/u/active/thisShop/find/0'}">修改</a>
                        <a v-if="arr_active.status==2 || arr_active.status==5 " v-link="{path:'/u/active/thisShop/find/0'}">删除</a>
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
            column:Number,
            arr_area_active:{
                type:Array,
                default:()=>[]
            },
            arr_active:{
                type:Object,
                default:()=>{}
            }
        },
        computed: {
            /**
             * 监听对象是否是空
             * */
            sum: function() {
                var obj = this.arr_active;
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
