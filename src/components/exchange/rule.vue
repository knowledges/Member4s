<template>
    <div class="introduce clearfix">
        <p class="orange-icon G_fl"></p>
        <p class="introduce-tit">什么是积分</p>
        <p class="introduce-bd">积分是购车惠为4S店用户提供的虚拟币，积分可兑换礼品。</p>
    </div>
    <div class="introduce clearfix">
        <p class="orange-icon G_fl"></p>
        <p class="introduce-tit">积分等级及兑换次数标准</p>
        <div class="table-wrap">
            <table border=1 cellspacing=0 cellpadding=0>
                <tr>
                    <th class="grade">等级</th>
                    <th class="section">积分区间</th>
                    <th class="frequency">单月有效兑换次数</th>
                </tr>
                <tr>
                    <td>初级</td>
                    <td>5000以下</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>中级</td>
                    <td>5000-10000</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>高级</td>
                    <td>10000以上</td>
                    <td>3</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="introduce clearfix">
        <p class="orange-icon G_fl"></p>
        <p class="introduce-tit">什么是积分</p>
        <p class="introduce-bd">1）报价数量超过该品牌车款（包括外观颜色和内饰颜色）总数量50%，获得积分2000，积分可兑换礼品</p>
        <p class="introduce-bd"> 2）每个月有10个不同的车款的报价被判定为底价且需要超过24小时不上调价格，获得积分500，30款奖励800分</p>
        <p class="introduce-bd">3）以季度为单位（1-3月，4-6月，7-9月，10-12月），车款报价成为底价次数少于200次，扣除积分500</p>
        <p class="spec-matter">次数的计算方式</p>
        <p class="dif-matter">a、车款报价成为底价超过24小时算一次数</p>
        <p class="dif-matter">b、车款报价成为底价被计分，价格不变仍为底价的条件下后每3天为一个单位，计算一次</p>
        <p class="introduce-bd">4）底价车款每被询价一次，增加20积分。（不退单）</p>
        <p class="introduce-bd">5）如果因线上报价高于线下销售价格，发生询价退单，扣50积分</p>
        <p class="introduce-bd">6）产生定车订单（包括底价车和特价车），根据价格区间不同，获得不同的积分，价格与积分对应关系</p>
        <p class="dif-matter">a、15万以下得300积分</p>
        <p class="dif-matter">b、15-30万得500积分</p>
        <p class="dif-matter">c、30万以上得800积分</p>
        <p class="introduce-bd">7）如果有订车订单，无法完成轿车，扣除500积分</p>
        <p class="introduce-bd">8）月获得积分超过3000分的，月底再返还当月积分的30%</p>
    </div>
</template>
<style>
    .introduce{
        width:890px;
        margin:30px auto;
    }
    .introduce .orange-icon{
        height:14px;
        width:4px;
        background:#ff791f;
        margin-top:4px;
        margin-right:10px;
        vertical-align: -2px;
    }
    .introduce .introduce-tit{
        font-weight:bold;
        font-size:14px;
    }
    .introduce .introduce-bd{
        color:#666;
        margin-top:20px;
    }
    .introduce .dif-matter{
        margin-left:24px;
    }
    .introduce .spec-matter{
        margin-left:16px;
    }
    .table-wrap{
        width:840px;
        margin:18px auto 30px;
    }
    .table-wrap table{
        font-size:14px;
        border:1px solid #ccc;
    }
    .table-wrap table th{
        font-weight:bold;
        color:#666;
        background:#f5f5f5;
        height:36px;
        text-align:center;
    }
    .table-wrap table td{
        color:#808080;
        height:36px;
        text-align:center;
    }
    .table-wrap table .grade{
        width:260px;
    }
    .table-wrap table .section{
        width:296px;
    }
    .table-wrap table .frequency{
        width:280px;
    }
</style>