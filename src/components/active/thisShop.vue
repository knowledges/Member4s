<template>
    <div class="wrap">
        <div class="brand-list clearfix">
            <p class="G_fl">主营品牌：<span>123</span></p>
            <p class="G_fl">副营品牌：<span></span></p>
        </div>
        <div class="select-bar clearfix">
            <div class="select-box G_fl">
                <form action="#">
                    <select>
                        <option value="全部" selected="selected">全部</option>
                        <option value="在售" >在售</option>
                        <option value="停售">停售</option>
                        <option value="过期">过期</option>
                        <option value="未开始">未开始</option>
                        <option value="审核中">审核中</option>
                        <option value="审核失败">审核失败</option>
                    </select>
                </form>
            </div>
            <div class="total-num G_fr">共：<span>222</span>条</div>
        </div>
        <!--:arr_title="arr_title"-->
        <shop-table :stats="stats" :judge="judge" :idx="idx" :explain="explain" :pagesize="pagesize" :arr_items="arr_items"></shop-table>
        <div id="page2" style="margin:20px 0;text-align: center;"></div>
    </div>

</template>
<script>
    import ShopTable from './../../components/active/ShopTable.vue'
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
//            this.$http.get('TableTitle.json').then(function (response) {
//                var cToObj=eval("("+response.data+")");
//                this.$set("arr_title",cToObj.data);
//            });
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
//                arr_title:[],
                arr_items:[],
                cur: 1,
                all: 35,
                pagesize:10
            }
        },
        components:{
            ShopTable
        }
    }
</script>

<style>
    .wrap{
        width:890px;
        margin:0 auto;
    }
    .brand-list p{
        font-weight:bold;
        font-size:14px;
        color:#666;
        margin:30px 30px 25px 0;
    }
    .brand-list p span{
        margin-right:20px;
    }
    .select-bar{
        height:40px;
        line-height:40px;
        background:#f5f5f5;
    }
    .select-bar .select-box{
   margin-left:10px;
    }
    .select-bar .total-num{
        margin-right:15px;
    }

    /*.table-box table{*/
        /*border:1px solid #e5e5e5;*/
        /*margin-top:10px;*/
    /*}*/
    /*.table-box table th{*/
        /*height:36px;*/
        /*text-align:center;*/
        /*color:#333;*/
    /*}*/
    /*.table-box table td{*/
        /*height:70px;*/
        /*text-align:center;*/
        /*border: 1px solid #ccc;*/
    /*}*/
    /*.table-box table tr:hover{*/
        /*background:#fff5ef;*/
    /*}*/
    /*.table-box table .car-model{*/
        /*width:60px;*/
    /*}*/
    /*.table-box table .car-style{*/
        /*width:160px;*/
    /*}*/
    /*.table-box table .car-out-color{*/
        /*width:64px;*/
    /*}*/
    /*.table-box table .car-int-color{*/
        /*width:64px;*/
    /*}*/
    /*.table-box table .car-com-pri{*/
        /*width:80px;*/
    /*}*/
    /*.table-box table .car-com-pri a{*/
        /*background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDExNTQ0Mjg3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDExNTQ0Mjc3MzQ2MTFFNjg4MjNBMDYwMTlCM0VGRTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyYjdkZmU3LThjZDQtOWE0NC05ZDJmLTZkMjJlNmM3YWI5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz45a21hAAABeElEQVR42mL8+vUrAxi8/8G46CrLgcdMDz8xAbmK/P8c5f5Fa/4R5PgPUcAIUbr7AXPtUdavvxi1RP5pC/8Dilx9y3TtDRM3K0OzzS9Xhb9QpUB1RfvZVAX/tdr+1gSrg4Brb5lqDrPefs/U5whSzfjk7TfPNRySPP+WeP8EmgEEdz8wMjMxKPCB7P32myF6K/vzL0zbQn4wLb3O8vU3Q6f9b4g6IGg5ztZ4lA3C5mIFSQEVLL7KwrL/EZO2yD81QYS9f/8zIAOglI7oP6B3me5/ZFIX+seAFwBVP/jIxIIpYSX1F1OQlZmBBRh+N98xIYvGaP1lYUJxxK33TDI8/5iA4Xz1DROQA5coP8RafIANWd2V10z2sv8YH7/95rWGQ47v3wLPn1zYAithO/ujT+DAEuL4D4yP62+ZYrexA0mgtLLAf4g6uCBQAVAZNGJ3ASP2CBvQDGC4QAIOYi/QnhbkiEVLLsDgYwU6gP+fncy/GC1EcgEIMACUlbe8VOWw1wAAAABJRU5ErkJggg==) no-repeat;*/
        /*display:inline-block;*/
        /*width:14px;*/
        /*height:14px;*/
        /*vertical-align:-2px;*/
        /*margin-left:2px;*/
        /*position:relative;*/
    /*}*/
    /*.table-box table .car-com-pri a .prompt-mes{*/
        /*width: 257px;*/
        /*height: 52px;*/
        /*line-height:52px;*/
        /*background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAzCAYAAAB469bRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOWMwNWE1NS0zZGVkLTBjNDYtOTMyOS0xNGQ4ZTQ4ZWY3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUJCNUQxQUQ2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUJCNUQxQUM2RTg4MTFFNkJDNDdFOTkxQkY5MDZCQTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTI2Y2JjZmYtYTdjOS1lOTQwLTg0MjctOWIyZWU3MjZhZGVkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5YzA1YTU1LTNkZWQtMGM0Ni05MzI5LTE0ZDhlNDhlZjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmpyUH8AAALGSURBVHja7Nk7aFNRHIDxc2MSoVHakHSIiLSrOIm0DjoKLh06qIP4LirtIMUOPpBaOigIYsEOHSwupaIiPit0EHwgVexgQWtBcLDmaozNTWieTXI9fzkKiqir934/OG3SpMtJznfPSYKNLW0BpZQMywwA3ufKCOofwdmnN8vMB+A/EoCQ3EgkEswG4CO2bX/b+geZCsCfvp//Afg0AAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAABQKqhHXW7Yts1seEwsFlPhcPifnuu6rkqn06parTJxPmI1trRF9O8Veiw3QYAHdnajQwNbNm1cPxyPx61A4O8bPcdx1Pv55I3NHfuOmYuCyzR6mpS+LAGQS0TILH6OBB6Iuh7LJOgPb48Orlm9am80Gv3jP+TzeZVKfX7d1Xu6c/rlrGPeHATA2yTy1aB5seVOxbx58P+TACwdOjo4MD5ydoM+BqyLRCK/fWKlUlFONpu9emvyoF78X/SfinrUCIDnyevrWnL2g7c0tbYHzK6u4fiRA2t3be+439wcXxkKhX6+BNTrcu6vT72Y6drdc/KObAakCc67ZzVm0SdnRabAe/QCrpudXenM0KW5V3NvT8gZ/9fYZzIZNZ/8eFEv/glz5V8yu0EQAHjgjCcLurhtf9+1T6n0uN7p/3gwl8uphYzzuHNP7zl9t2COgDUdD7aEBAAe2AW45iwvC7vY13/+lD7rvykUCqpUKinHyX64MDLWk80tLurHyyx+AgDvRqA8NT2zcHfyUbde+EW99S8/ePL88Nj1e0k5JshxwRwb4DN8COgDTa3t8q2AfN3bMHFleGfAssJbd3RfNlt/ufrXufr701cBBgD4S+1csLBSwAAAAABJRU5ErkJggg==);*/
        /*position:absolute;*/
        /*top:-50px;*/
        /*left:-118px;*/
        /*display:none;*/
    /*}*/
    /*.table-box table .car-com-pri a:hover  .prompt-mes{*/
        /*display:block;*/
    /*}*/
    /*.table-box table .car-off-pri{*/
        /*width:80px;*/
    /*}*/
    /*.table-box table .car-act-time{*/
        /*width:110px;*/
    /*}*/
    /*.table-box table .car-stock{*/
        /*width:50px;*/
    /*}*/
    /*.table-box table .car-place{*/
        /*width:50px;*/
    /*}*/
    /*.table-box table .car-state{*/
        /*width:80px;*/
    /*}*/
    /*.table-box table .car-operation{*/
        /*width:80px;*/
    /*}*/
    /*.table-box table .car-operation a{*/
        /*display:block;*/
    /*}*/
    /*.table-box table .car-operation a:hover{*/
        /*color:#ff791f;*/
    /*}*/
</style>