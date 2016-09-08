<template>
    <div class="table">
        <p style="text-align: right;">
            共：3条
        </p>
        <table>
            <thead>
                <tr>
                    <th>时间</th>
                    <th>品牌</th>
                    <th>车型</th>
                    <th>车款</th>
                    <th>外观颜色</th>
                    <th>内饰颜色</th>
                    <th>官方价/元</th>
                    <th>特价/元</th>
                    <th>活动时间</th>
                    <th>库存/辆</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2016-9-8 15:39:05</td>
                    <td>奥迪</td>
                    <td>A1</td>
                    <td>日产轩逸2016款 1.6XV CVT自豪版</td>
                    <td>白色</td>
                    <td>黑色</td>
                    <td>458.500</td>
                    <td>457.500</td>
                    <td>
                        <p>2016-9-8 15:40:34</p>
                        <p>2016-9-8 15:40:40</p>
                    </td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>2016-9-8 15:39:05</td>
                    <td>奥迪</td>
                    <td>A1</td>
                    <td>日产轩逸2016款 1.6XV CVT自豪版</td>
                    <td>白色</td>
                    <td>黑色</td>
                    <td>458.500</td>
                    <td>457.500</td>
                    <td>
                        <p>2016-9-8 15:40:34</p>
                        <p>2016-9-8 15:40:40</p>
                    </td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>2016-9-8 15:39:05</td>
                    <td>奥迪</td>
                    <td>A1</td>
                    <td>日产轩逸2016款 1.6XV CVT自豪版</td>
                    <td>白色</td>
                    <td>黑色</td>
                    <td>458.500</td>
                    <td>457.500</td>
                    <td>
                        <p>2016-9-8 15:40:34</p>
                        <p>2016-9-8 15:40:40</p>
                    </td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
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
</style>