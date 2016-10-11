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
    table thead tr th{
        border: 1px solid #ccc;
        text-align: center;
        background: #f1f2f3;
        color: #000000;
    }
    table tbody tr td{
        border: 1px solid #ccc;
        text-align: center;
    }
    table tbody tr td a {
        display: block;
    }
    .table-box{
        width:870px;
        margin:0 auto;
    }
    .table-box table{
        border:1px solid #e5e5e5;
        margin-top:10px;
    }
    .table-box table th{
        height:36px;
        text-align:center;
        color:#333;
    }
    .table-box table td{
        height:70px;
        text-align:center;
    }
    .table-box table tr:hover{
        background:#fff5ef;
    }
    .table-box table .car-selected{
        width:30px;
    }
    .table-box table .car-model{
        width:60px;
    }
    .table-box table .car-style{
        width:160px;
    }
    .table-box table .car-out-color{
        width:64px;
    }
    .table-box table .car-int-color{
        width:64px;
    }
    .table-box table .car-com-pri{
        width:80px;
    }
    .table-box table .car-com-pri a{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDExNTQ0Mjg3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDExNTQ0Mjc3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz45a21hAAABeElEQVR42mL8+vUrAxi8/8G46CrLgcdMDz8xAbmK/P8c5f5Fa/4R5PgPUcAIUbr7AXPtUdavvxi1RP5pC/8Dilx9y3TtDRM3K0OzzS9Xhb9QpUB1RfvZVAX/tdr+1gSrg4Brb5lqDrPefs/U5whSzfjk7TfPNRySPP+WeP8EmgEEdz8wMjMxKPCB7P32myF6K/vzL0zbQn4wLb3O8vU3Q6f9b4g6IGg5ztZ4lA3C5mIFSQEVLL7KwrL/EZO2yD81QYS9f/8zIAOglI7oP6B3me5/ZFIX+seAFwBVP/jIxIIpYSX1F1OQlZmBBRh+N98xIYvGaP1lYUJxxK33TDI8/5iA4Xz1DROQA5coP8RafIANWd2V10z2sv8YH7/95rWGQ47v3wLPn1zYAithO/ujT+DAEuL4D4yP62+ZYrexA0mgtLLAf4g6uCBQAVAZNGJ3ASP2CBvQDGC4QAIOYi/QnhbkiEVLLsDgYwU6gP+fncy/GC1EcgEIMACUlbe8VOWw1wAAAABJRU5ErkJggg==) no-repeat;
        display:inline-block;
        width:14px;
        height:14px;
        vertical-align:-2px;
        margin-left:2px;
        position:relative;
    }
    .table-box table .car-com-pri a .prompt-mes{
        width: 257px;
        height: 52px;
        line-height:52px;
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAzCAYAAAB469bRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUJCNUQxQUQ2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUJCNUQxQUM2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTI2Y2JjZmYtYTdjOS1lOTQwLTg0MjctOWIyZWU3MjZhZGVkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmpyUH8AAALGSURBVHja7Nk7aFNRHIDxc2MSoVHakHSIiLSrOIm0DjoKLh06qIP4LirtIMUOPpBaOigIYsEOHSwupaIiPit0EHwgVexgQWtBcLDmaozNTWieTXI9fzkKiqir934/OG3SpMtJznfPSYKNLW0BpZQMywwA3ufKCOofwdmnN8vMB+A/EoCQ3EgkEswG4CO2bX/b+geZCsCfvp//Afg0AAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAABQKqhHXW7Yts1seEwsFlPhcPifnuu6rkqn06parTJxPmI1trRF9O8Veiw3QYAHdnajQwNbNm1cPxyPx61A4O8bPcdx1Pv55I3NHfuOmYuCyzR6mpS+LAGQS0TILH6OBB6Iuh7LJOgPb48Orlm9am80Gv3jP+TzeZVKfX7d1Xu6c/rlrGPeHATA2yTy1aB5seVOxbx58P+TACwdOjo4MD5ydoM+BqyLRCK/fWKlUlFONpu9emvyoF78X/SfinrUCIDnyevrWnL2g7c0tbYHzK6u4fiRA2t3be+439wcXxkKhX6+BNTrcu6vT72Y6drdc/KObAakCc67ZzVm0SdnRabAe/QCrpudXenM0KW5V3NvT8gZ/9fYZzIZNZ/8eFEv/glz5V8yu0EQAHjgjCcLurhtf9+1T6n0uN7p/3gwl8uphYzzuHNP7zl9t2COgDUdD7aEBAAe2AW45iwvC7vY13/+lD7rvykUCqpUKinHyX64MDLWk80tLurHyyx+AgDvRqA8NT2zcHfyUbde+EW99S8/ePL88Nj1e0k5JshxwRwb4DN8COgDTa3t8q2AfN3bMHFleGfAssJbd3RfNlt/ufrXufr701cBBgD4S+1csLBSwAAAAABJRU5ErkJggg==);
        position:absolute;
        top:-50px;
        left:-118px;
        display:none;
    }
    .table-box table .car-com-pri a:hover  .prompt-mes{
        display:block;
    }
    .table-box table .car-off-pri{
        width:80px;
    }
    .table-box table .car-last-pri{
        width:80px;
    }
    .table-box table .car-stock{
        width:50px;
    }
    .table-box table .car-way{
        width:50px;
    }
    .table-box table .car-place{
        width:80px;
    }
    .table-box table .car-operation{
        width:80px;
    }
    .table-box table .car-operation a{
        display:block;
    }
    .table-box table .car-operation a:hover{
        color:#ff791f;
    }
    .order-nodata h4{
        color: #4c4c4c;
        font-size: 18px;
        line-height: 46px;
    }
    .order-nodata p a{
        display: inline-block;
        color: #2194fe;
    }
    .order-nodata .order-nobg{
        width: 30px;
        height: 30px;
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        margin-right: 8px;
        background-image: url(../../assets/img/ico_warn.png);
        background-repeat: no-repeat;
        background-position: -82px 4px;
        background-size: 300px 150px;
    }
</style>
