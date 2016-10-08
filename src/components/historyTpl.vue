<template>
    <div class="history-pop" id="J_HistoryPop">
        <div class="base-info clearfix">
            <div class="clearfix">
                <dl>
                    <dt>品&nbsp;&nbsp;牌：</dt>
                    <dd>{{history.brandName}}</dd>
                </dl>
                <dl>
                    <dt>车&nbsp;&nbsp;型：</dt>
                    <dd>{{history.carModelName}}</dd>
                </dl>
                <dl>
                    <dt>车&nbsp;&nbsp;款：</dt>
                    <dd>{{history.carName}}</dd>
                </dl>
            </div>
            <div class="clearfix">
                <dl>
                    <dt>外观颜色：</dt>
                    <dd>{{history.exColorName}}</dd>
                </dl>
                <dl>
                    <dt>内饰颜色：</dt>
                    <dd>{{history.inColorName}}</dd>
                </dl>
            </div>
        </div>
        <table class="history-info-list">
            <thead>
            <th v-for="item in history.titleList">{{item}}</th>
            </thead>
            <tbody>
            <tr v-if="history.list.length <= 0"  >
                <td colspan="4" class="null">
                    对不起，暂无任何历史记录！
                </td>
            </tr>
            <template  v-else>
                <tr v-for="item in history.list">
                    <td>{{item.createTime}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.specialPrice}}</td>
                    <td>
                        <p>
                            {{item.startDate}}
                        </p>
                        <p>至</p>
                        <p>
                            {{item.endDate}}
                        </p></td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        props: {
            history: {}
        }
    }
</script>
<style scoped>
    /* 历史记录列表 */
    .history-pop{
        display: none;
        padding: 20px;
        font-size: 14px;
    }
    .history-pop .base-info{
        margin-bottom: 10px;
    }
    .history-pop .base-info dl{
        float: left;
        display: inline;
        margin: 0 20px 10px 0;
    }
    .history-pop .base-info dt{
        float: left;
        width: 110px;
        margin-right: 3px;
        color:#b5b4b4;
        text-align: right;
    }
    .history-pop .base-info dd{
        float: left;
    }
    .history-pop .history-info-list{
        width: 100%;
    }
    .history-pop .history-info-list tr:nth-child(even){
        background: #f2fbff;
    }
    .history-pop .history-info-list td, .history-pop .history-info-list th{
        padding: 10px;
        border: 1px solid #999;
        text-align: center;
    }
    .history-pop .history-info-list th{
        background: #f1f2f3;
    }
    .history-pop .history-info-list td{
        font-size: 14px;
    }
    .history-pop .history-info-list .null{
        padding: 20px 0;
        color: #999;
    }
</style>