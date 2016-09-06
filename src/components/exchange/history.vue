<template>
    <div class="table-wrap">
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
                <td class="time">{{item.time}}</td>
                <td class="action">{{item.xingwei}}</td>
                <td class="integral" :class="parseInt(item.integral) > 0 ? 'add' : 'minus'">{{item.integral}}</td>
                <td class="note">{{item.remarks}}</td>
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
        ready(){

        },
        data(){
            return {
                stats:0,
                judge:false,
                idx:'4',
                explain:"如您对官方价有疑问，请致电400-138-0808。",
                arr_title: [
                    {
                        "name": "时间",
                        "width":""
                    },
                    {
                        "name": "行为",
                        "width":""
                    },
                    {
                        "name": "积分",
                        "width":""
                    },
                    {
                        "name": "备注",
                        "width":""
                    }
                ],
                arr_items:[
                    {time: '2016-08-07 09:27', xingwei: '积分兑换500元苏果购物卡', integral: '+500', remarks:'订单号：201614512124'},
                    {time: '2016-08-07 04:27', xingwei: '积分兑换500元苏果购物卡', integral: '-50', remarks:'订单号：201614512124'},
                    {time: '2016-08-08 06:27', xingwei: '积分兑换500元苏果购物卡', integral: '+100', remarks:'订单号：201614512124'},
                    {time: '2016-08-19 07:27', xingwei: '积分兑换500元苏果购物卡', integral: '-200', remarks:'订单号：201614512124'},
                    {time: '2016-08-15 08:27', xingwei: '积分兑换500元苏果购物卡', integral: '+500', remarks:'订单号：201614512124'}
                ],
                cur: 1,
                all: 35,
                pagesize:10,
                msg: ''
            }
        }
    }
</script>

<style>
    .table-wrap{
        width:860px;
        margin:20px auto 40px;
    }
    .table-wrap table{
        border:1px solid #e6e6e6;
        text-align:center;
        color:#666;
    }
    .table-wrap table td{
        line-height:34px;
        border:1px solid #e6e6e6;
    }
    .table-wrap table th{
        font-size:14px;
        text-align:center;
        font-weight:normal;
        background:#fff;
    }
    .table-wrap table th,td{
        height:36px;
    }
    .table-wrap .time{
        width:200px;
    }
    .table-wrap .action{
        width:260px;
    }
    .table-wrap .add{
        color:#00AA00;
    }
    .table-wrap .minus{
        color:#f21717;
    }
    .table-wrap .integral{
        width:125px;
    }
    .table-wrap .note{
        width:270px;
    }

</style>