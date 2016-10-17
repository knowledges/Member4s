<template>
    <div class="header-return">
        <a href="javascript:history.back(1);" class="G_fr"><i class="icon-new-uc2 icon-return"></i>返回礼品列表</a>
    </div>
    <div class="main-container">

        <h2 class="sub-title clearfix"><a v-link="{path:'/u/accout/address'}" class="G_fr linker-operation" target="_blank">管理收货地址</a>收货地址确定</h2>

        <div class="address-list shipping-address">
            <div class="list"  v-if="addlist.length > 0">
                <div :id="'addr-' + item.id"  v-for="(i, item) in addlist | limitBy 8" @click="changeDistributionAddress(item, $event)" @mouseenter="addActiveClass(i, $event)" @mouseleave="removeActiveClass(i, $event)" data-act="modify" :data-addrid="item.id" :class="item.id == defAddressId ? 'addr-cur' : ''" class="addr address-option-binded" tabindex="1">
                    <div class="inner">
                        <div class="addr-hd" title="{{item.receipt_province}}{{item.receipt_city}}{{item.receipt_quarter}}{{item.receipt_address}}({{item.receiver}}收)">
                            <span class="prov">{{item.receipt_province}}</span>
                            <span class="city">{{item.receipt_city}}</span>
                            <span>（</span><span class="name">{{item.receiver}}</span><span> 收）</span>
                        </div>
                        <div title="{{item.receipt_quarter}}{{item.receipt_address}}" class="addr-bd">
        <span class="dist">
                </span>
                            <span class="j_4tip"></span>
                            <span class="street">{{item.receipt_quarter}}{{item.receipt_address}}</span>
                            <span class="phone"></span>
                            <p class="last">{{item.telphone}}</p></div>
                    </div><ins class="curmarker"></ins>
                    <ins v-if="item.status == 1" class="deftip">默认地址</ins>
                    <div class="floater"></div>
                </div>
            </div>
            <div v-else class="null-list">
                <h1 class="hd"><i class="icon-null"></i>对不起！您暂无任何收货地址</h1>
                <p class="tips">（ 如果您已添加新的收货地址，请 <a href="#" @click.prevent="reloadCurPage">刷新</a>此页面~ ）</p>
                <p class="bd"><a  v-link="{path:'/u/accout/address'}" target="_blank">立即添加收货地址</a></p>
            </div>
        </div>

        <h2 class="sub-title">兑换礼品确定</h2>
        <table class="goodsorder-table">
            <colgroup>
                <col class="tab-col4" />
                <col class="tab-col2" />
                <col class="tab-col2" />
                <col class="tab-col2" />
            </colgroup>
            <thead>
            <tr>
                <th>商品名称</th>
                <th>兑换积分</th>
                <th>数量</th>
                <th>小计</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <div class="good clearfix">
                        <div class="face">
                            <img :src="good.faceImg">
                            <div class="gift-bottom clearfix">
                                <p class="G_fl">积分：<span>{{good.integral}}</span></p>
                                <p class="G_fl">数量：<span>{{good.number}}</span></p>
                            </div>
                        </div>
                        <div class="txt">{{good.name}}</div>
                    </div>
                    </td>
                <td>{{good.integral}}积分</td>
                <td>
                    <div class="tb-amount-widget">
                        <span>1</span>
                    <div v-if="good.integral > SESSIONID.total_jifen" class="tips">
                        兑换积分不足~
                        <i></i>
                    </div>
                    </div>
                </td>
                <td>{{good.integral * defaultNum}}积分</td>
            </tr>
            </tbody>
        </table>
        <div class="btn-box">
            <div v-show="addlist.length <= 0"><span class="s">( <b>*</b>  必须有选择<b>1</b>个收货地址，如若暂无任何收货地址，请添加一个收货地址~ )</span><button class="disabled">确定兑换</button></div>
            <button v-else @click.prevent="authVerification">确定兑换</button>
        </div>
    </div>
    <div class="auth-verification-box j_authVerificationBox" style="display: none;">
        <dl>
            <dt>手机号</dt>
            <dd><input name="tel" disabled v-model="verificationTel" /></dd>
        </dl>
        <dl>
            <dt>验证码</dt>
            <dd><input type="text" class="code" @keyup.enter="ajaxSubmit"  v-model="code" placeholder="请输入验证码" maxlength="6"/><button class="send-code">获取验证码</button></dd>
        </dl>
        <p class="tips"><i class="icon-null"></i>如果手机号有变动，请与对应的公关人员联系！</p>
        <div class="btn-box">
            <button @click.prevent="ajaxSubmit">确定</button>
            <button class="cancle disabled">取消</button>
        </div>
    </div>
</template>
<style scoped>
    .auth-verification-box{
        padding: 18px;
    }
    .auth-verification-box dl{
        line-height: 30px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #808080;
        overflow: hidden;
    }
    .auth-verification-box .tips{
        text-align: center;
        color: #666;
    }
    .auth-verification-box dt{
        float: left;
        width: 45px;
    }
    .auth-verification-box dd{
        margin-left: 55px;
    }
    .auth-verification-box .btn-box{
        text-align: center;
        margin-top: 25px;
    }
    .auth-verification-box dd input{
        width: 210px;
        height: 28px;
        line-height: 28px;
        border:1px solid #ccc;
        color:#777;
        padding-left: 10px;
    }
    .auth-verification-box dd .code{
        width: 125px;
    }
    .auth-verification-box dd .send-code{
        width: 85px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ccc;
        border-left: none;
        vertical-align: -1px;
        cursor: pointer;
        background: #fff;
    }
    .auth-verification-box dd .send-code:hover{
        background: #ccc;
    }
    .main-container .sub-title{
        height: 15px;
        line-height: 15px;
        border-left: 4px solid #ff791f;
        padding-left: 10px;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .header-return {
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        background: #f5f5f5;
        font-size: 14px;
    }
    .icon-new-uc2 {
        display: inline-block;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABkCAYAAACLtWCLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTZBNkE3RTQ1RjlFMTFFNjg3QjdERjdGN0IxOEUzMzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTZBNkE3RTU1RjlFMTFFNjg3QjdERjdGN0IxOEUzMzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NkE2QTdFMjVGOUUxMUU2ODdCN0RGN0Y3QjE4RTMzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NkE2QTdFMzVGOUUxMUU2ODdCN0RGN0Y3QjE4RTMzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhdusDAAAASrSURBVHja7Jh7iJRVGIdnZiftuihCZRmWV5SUcNdCyEow09Q08rYlu5mCXf4pEkmwJMpKNhOLLqItKpoLG5UoVuQNQwx3N7IsUkFzrdyiNcXcrN11el75fcuZ41y+mak/kjnwcL7LOb855z3v+54zXzSRSET80tjY2JdqBoyCodADfoN9sBM2lJWVHXH7RF0hBPpQvQt3we/wLeyHZugJQ2AwdIOtMAfBo0lCiMyjqoZ6eIYG2yNpCm1Hq+0tarvkvBAvNvNgPMzmYY3XyZ7fDrt497H37mmqV3kejTnP70khsoPKfmQKbOH+M/c97ZdSDbrARp7Ie1QV0JsOTdzfxPVhWM39LL99LJK+VGiqTfp1W6U58HCqxpmEzo84y30oofWwiin101QHUK2EmrRCNKqF4Z4hZ1KZcQ/xroX6AHzC89meLa9xR3Qj7OXhvZ7YGKpx8LpWdZwnUiFnTXLIl825YBs8Saf9GRzSwma5IqCatvP9ELmNag0MhGM2SnvshEg5mAl6KXyqEGlM60cIjqB6CG6Fa6E7nIBf4AtYh8DetEFbSIlF/qVSFMpe4s6SL6Z6xEICOkIMoJ9y97zO5UfkUa7fNocLHCxboc9gOeV8+lQHU5sLlWFFFIffUd1v4eTaKKGkn2vZrr6dNuoCl2vI/anGpul4TnY5ofvSwJ6BUIczuuthorJhwsuO7bBJcRfMKGlE7tx3ajfNb/md1RguN4h4IwpGFdNOsiejkOxVmmUAl6QbUYnmb1PbTbU75Izag50lMPBfItfypwbRKdQGU/MQMluedae2yLYaDH3c/AT+NkMzzTZvIeIagdWT7AChc0HSLmK+s9SZ4kEbJWLn9P5FqmlwRmLmwAt4X5cyZ9NhiFbuDI2+17M3qR6HO+G0GZl33+SU/B2RG+j8YyGJzY6AozKJXOTbURxjhmn3HEzXWWCWly1Cj+gpeB7WwgR4P1QaSVFsl1gIS5Sn9uRrozYFZ0ShczJfocucsOkhsZynVgVX23lI972U9Mo1iB/gV39EV0FXZb+77aRvKVUbwSm1Oa3rWmWJr1n1mmBE9l/jHV1HhdnENsDe0OT82Eb4yMnntm0fQOyYdV4GFskLNORVEu1Ik1rdclDu8URcv16vP3WntCq5BKDlpZMxrcKVzqpEZauwxTLlV/ECQ+xSnXxnFhq0r8ER4u1QoSN6DO4rNI1YRmhlNJsCPzJHbNHLw87+nqmUKCOMdUOkRcndDNdfIWArOVoeXuLsZTHVVXLOT12hB+EluEPBWa2IN68eoet2HbI65GN2cH3hf578Ccib4bqChBB41tw/OLrkdPSTgH1EqdPKmYF/znlEiNi2c1QiVlpwumx/KZKONSb6lv4F+Mn/QyW443LarYj/cYEQIuVKn31DLpKJvILY4k6hhoaG4NiST/kSRiLYGtPf8Z/yFBoGn7tTi2rHqMw3nfgfEKZpD3MP5K2KxYg+IgxUDF7htDmb6gxpm+AKCL6TNGODnl4bE3nADC7xjF+0FjoR3sU/KjuCH8CYjNFPQ0stb8Bk/7uj1645YkLZwEVKs7zvU/w2UhQqChWFikJFoaLQfyn0jwADAIO8AvhYsiV8AAAAAElFTkSuQmCC) no-repeat;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-right: 5px;
    }
    .icon-return {
        background-position: 0 -60px;
    }
    .main-container .sub-title .linker-operation{
        color:#fe802c;
        font-size: 12px;
    }
    .null-list{
        padding: 20px 0;
        text-align: center;
    }
    .null-list .hd {
        color: #666;
        font-size: 16px;
        line-height: 46px;
    }
    .null-list .tips{
        color: #999;
        font-size: 12px;
        margin-bottom: 10px;
    }
    .null-list .tips a{
        color:#0492e8;
    }
    .null-list .bd a {
        display: inline-block;
        color: #fff;
        cursor: pointer;
        background: #0492e8;
        height: 26px;
        padding: 0 10px;
        line-height: 26px;
        border-radius: 3px;
    }
    .null-list .bd a:hover{
        text-decoration: none;
        background: #01b2ff;
    }
   .icon-null {
       display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
       vertical-align: -5px;
        background-image: url(data:image/png;base64,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);
        background-repeat: no-repeat;
       background-position: -96px 1px;
        background-size: 230px;
    }
    .main-container{
        padding: 0 20px;
    }
    .btn-box{
        text-align: right;
        padding-bottom: 10px;
    }
    .btn-box button{
        padding: 0 15px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #ff7a1f;
        color: #fff;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 2px;
        margin: 0 10px;
    }
    .btn-box .disabled{
        background: #cecece;
        cursor: default;
    }
    .btn-box .s{
        margin-right: 10px;
    }
    .btn-box .s b{
        color: #f00;
    }
    .order-nodata{
        text-align: center;
        border: 1px solid #e5e5e5;
        margin-top: 10px;
        padding: 85px 0;
        font-size: 16px;
        color: #666666;
        line-height: 40px;
    }
    .order-nodata h4{
        color: #4c4c4c;
        font-size: 18px;
        line-height: 46px;
    }
    .order-nodata p a{
        color: #2194fe;
    }
    .good .face{
        float: left;
        width: 160px;
    }
    .good .face img{
        width: 100%;
    }
    .good .txt{
        padding-top: 14px;
        line-height: 24px;
        margin-left: 180px;
        text-align: left;
    }
    .gift-bottom{
        height: 26px;
        line-height: 26px;
        background: #f0f0f0;
    }
    .gift-bottom p{
        width: 50%;
        text-align: center;
    }
    .goodsorder-table{
        width:100%;
    }
    .goodsorder-table tbody td{
        padding: 10px 0;
    }
    .goodsorder-table thead{
        height: 26px;
        line-height: 26px;
        background: #f5f5f5;
    }
    .goodsorder-table thead th,.goodsorder-table tbody td{
        text-align: center;
    }
    .goodsorder-table .tab-col4{
        width: 40%;
    }
    .goodsorder-table .tab-col2{
        width: 20%;
    }

    .top-bar{
        width:890px;
        margin:0 auto;
    }
    .user-notice p{
        margin-top:20px;
    }
    .user-notice i{
        display:inline-block;
        background:url(../../assets/img/icon-notice.png) no-repeat;
        height:16px;
        width:12px;
        vertical-align: -2px;
        margin-right:5px;
        color:#ff6700;
    }
    .user-notice a{
        color:#ff6700;
    }
    h2{
        font-size:14px;
        margin-top:28px;
        margin-bottom:30px;
    }
    h2 span{
        font-size:12px;
        color:#999;
        margin-left:10px;
    }
    .gift-list li{
        border-bottom:1px solid #e6e6e6;
        margin-bottom:30px;
    }
    .gift-left-box{
        margin-left:20px;
        margin-bottom:30px;
    }
    .num_full{
        background: #f0f0f0;
        width:260px;
    }
    .num_full p{
        width:45%;
        margin-left:10px;
    }
    .gift-right-box{
        margin-left:20px;
        width:564px;
        position:relative;
        height:160px;
    }
    .gift-right-box h3{
        color:#666;
        margin-top:10px;
    }
    .gift-right-box p{
        color:#c6c6c6;
    }
    .gift-right-box .gift-introduce{
        margin:10px auto;
    }
    .gift-right-box .exchange-now{
        display:block;
        width:80px;
        height:24px;
        text-align:center;
        line-height:24px;
        border-radius:12px;
        color:#ff791f;
        border:1px solid #ff791f;
        position:absolute;
        left:0;
        bottom:10px;
    }
    .gift-right-box a:hover{
        background:#ff791f;
        color:#fff;
    }
    /* 地址 */
    .shipping-address .addr {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 237px;
        height: 106px;
        margin: 0 30px 20px 0;
        color: #666;
        cursor: pointer;
        outline: none;
    }
    .shipping-address .addr .inner {
        z-index: 2;
        position: relative;
        height: 85px;
        padding: 11px 15px;
        background: url(data:image/png;base64,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) no-repeat;
        overflow: hidden;
    }
    .shipping-address .addr-cur .inner {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABqCAMAAABnJibdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDEzNUUxODA3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDEzNUUxODE3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMTM1RTE3RTdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTM1RTE3RjdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrIDFsEAAAMAUExURaxkaPr6+tvd2ufr9uXs9LpjXOXp87lkX9/d49za3+Hc4zJcsLFlZ/39/eDc3axlbq1iaejs+LdiX/v//6lkZ0twt9/a4bdiW/3/+uHh4d7Y4t/X4y9cr9ze2e/v7+fr9OLq9TRart/e3KtmZ93c2DBYr6hlbLRkXbliWjVasjJbs0lvuKplaLpiYC5brklutd7Z4LRkYy5csi9bsq1jbd3d4TNcrrllWy9dq0tvukpuuLhlYatjZ+Ps9TNcrC9csTFZrzFbqrVkYElvujNYsTFbr7hjXv///f/+/93d3f7///7+/v7//d3d37hjYLpiXrdkXt7e3v/9/tze3fz//93d2/3//jJar/7+/7dkYNzc3P//+/7+/N7c3f/9/zFbsTFbrTJasf3+///+/DBartvd3Nze27hjXN7d29/d3rdiXebt9Uhut7lhXfz//S9crdzd3/3//N3f3tzc3v/+/TJcst7e4KplaqtkauLd5P7/+7ZjXUltudvc3jJbreHb5d3b3TNbsd7c3+js9eXl5bdkXDBarDFcq7hiYeTq9t3f3DFarExwut3a4ebt993c2tzc2jBdsODc2+DY4zBasP79///9/OXp9Uttt//++v/8/+Tr9d3e4Ofu+N/f3+js97lkXebs+P79+01uu9/b3Klna7ViXrZmX7dlWuDd5NzZ4rdjYePc47VlXeXs9tre3eLb6/7/+qlkaatma0tsu97d2blhX0ltt+Te4uTq+ERtvLpgX9/a3vX19apja0xxuE5wuqliaKtiaf/8/tzb4ExuuOTk5C9esDBYrbxjX9vb2eXo9zNZrN/e49rc17lhYPz9/+Ps8+Lb49/d4DRaq/7/+d3Y3t7Y5N7Z3admat/Y4Nnd3t7f2uHd3f/++9re3+DW3ktrtuXb5k1vtrNjXLZhXjNata1naEltu+bm5i9dsuTd5enr9+zt8kVvt0tttbNjZOHc4E5wt+nq7ktxuklwv09vuOPb5uDd5vHx8fv//LtjX7tiXuLa5U5wuP////3d7HUAAA0CSURBVHja7F13eBTHFV8QsoiOKkCY+LABO9gES7KwLWODQS63U3b32l7v6hKqqAtRJHo3xYBt3HvDvfee3rsTpydOnN6bk5c3K+2ejP4MX/7Y40knfXtTf/PKzO6beSvB2fOYSb7rfEGmdXWa172HWJC9xXab11pyQ1BLXtdkXj+tze/V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);
    }
    .shipping-address .addr-cur .curmarker {
        visibility: visible;
    }
    .shipping-address .addr-active .inner {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAABqCAMAAABnJibdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDEzNUUxODA3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDEzNUUxODE3Q0M3MTFFMkI1OUM5QkEzMENDMDQyMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMTM1RTE3RTdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTM1RTE3RjdDQzcxMUUyQjU5QzlCQTMwQ0MwNDIyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrIDFsEAAAMAUExURaxkaPr6+tvd2ufr9uXs9LpjXOXp87lkX9/d49za3+Hc4zJcsLFlZ/39/eDc3axlbq1iaejs+LdiX/v//6lkZ0twt9/a4bdiW/3/+uHh4d7Y4t/X4y9cr9ze2e/v7+fr9OLq9TRart/e3KtmZ93c2DBYr6hlbLRkXbliWjVasjJbs0lvuKplaLpiYC5brklutd7Z4LRkYy5csi9bsq1jbd3d4TNcrrllWy9dq0tvukpuuLhlYatjZ+Ps9TNcrC9csTFZrzFbqrVkYElvujNYsTFbr7hjXv///f/+/93d3f7///7+/v7//d3d37hjYLpiXrdkXt7e3v/9/tze3fz//93d2/3//jJar/7+/7dkYNzc3P//+/7+/N7c3f/9/zFbsTFbrTJasf3+///+/DBartvd3Nze27hjXN7d29/d3rdiXebt9Uhut7lhXfz//S9crdzd3/3//N3f3tzc3v/+/TJcst7e4KplaqtkauLd5P7/+7ZjXUltudvc3jJbreHb5d3b3TNbsd7c3+js9eXl5bdkXDBarDFcq7hiYeTq9t3f3DFarExwut3a4ebt993c2tzc2jBdsODc2+DY4zBasP79///9/OXp9Uttt//++v/8/+Tr9d3e4Ofu+N/f3+js97lkXebs+P79+01uu9/b3Klna7ViXrZmX7dlWuDd5NzZ4rdjYePc47VlXeXs9tre3eLb6/7/+qlkaatma0tsu97d2blhX0ltt+Te4uTq+ERtvLpgX9/a3vX19apja0xxuE5wuqliaKtiaf/8/tzb4ExuuOTk5C9esDBYrbxjX9vb2eXo9zNZrN/e49rc17lhYPz9/+Ps8+Lb49/d4DRaq/7/+d3Y3t7Y5N7Z3admat/Y4Nnd3t7f2uHd3f/++9re3+DW3ktrtuXb5k1vtrNjXLZhXjNata1naEltu+bm5i9dsuTd5enr9+zt8kVvt0tttbNjZOHc4E5wt+nq7ktxuklwv09vuOPb5uDd5vHx8fv//LtjX7tiXuLa5U5wuP////3d7HUAAA0CSURBVHja7F13eBTHFV8QsoiOKkCY+LABO9gES7KwLWODQS63U3b32l7v6hKqqAtRJHo3xYBt3HvDvfee3rsTpydOnN6bk5c3K+2ejP4MX/7Y40knfXtTf/PKzO6beSvB2fOYSb7rfEGmdXWa172HWJC9xXab11pyQ1BLXtdkXj+tze/V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);
    }

    .shipping-address .addr .addr-hd {
        width: 100%;
        border-bottom: 1px solid #F2F2F2;
        padding: 0 0 5px;
        margin-bottom: 5px;
        height: 18px;
        line-height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .shipping-address .addr .city {
        font-weight: 700;
        max-width: 64px;
        margin-right: 10px;
        _width: 64px;
    }
    .shipping-address .addr .name {
        max-width: 64px;
        margin-right: 3px;
    }
    .shipping-address .addr .addr-hd span {
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .shipping-address .addr .addr-bd {
        height: 55px;
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
    }
    .shipping-address .address-option-binded .addr-bd {
        height: 36px;
    }
    .shipping-address .addr .addr-bd span {
        margin-right: 3px;
        word-break: break-all;
        word-wrap: break-word;
    }
    .shipping-address .addr-toolbar {
        display: none;
    }
    .shipping-address .address-option-binded .addr-toolbar {
        display: block;
    }
    .shipping-address .addr .curmarker {
        z-index: 3;
        position: absolute;
        background-position:-322px 0;
        width: 28px;
        height: 28px;
        top: 77px;
        right: 1px;
        visibility: hidden;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDkwRDM2NkE4NDYzMTFFNkIzRTA5MENFQUVBMDRENUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDkwRDM2NkI4NDYzMTFFNkIzRTA5MENFQUVBMDRENUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0OTBEMzY2ODg0NjMxMUU2QjNFMDkwQ0VBRUEwNEQ1RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0OTBEMzY2OTg0NjMxMUU2QjNFMDkwQ0VBRUEwNEQ1RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt58LboAAAImSURBVHjavJbhUttADIQl2emvTuHBCoUnbZ2EPhl/mPokdnXnBFqIQ7HjjIkTbu7TSitdJCLkUvdPk1A+XOL6pRqdmFwEOBhgwJC0OnCvfYziosDZ2sCtGnZXQTYJAnbFlG4NsMRJvVWlhK4D3APm3Fc7AAqsCSSdukZKd8zfiWtR4BYwnVmzGHAAzM5YtwiQymj6Dj4sawNZs6J0H25zCV8RSGUOWC8idR8m1dcBDunGWjWbgXwaOLmRt4OpXpW5TCEsCJxq1sOT0SxCUI6wnJfQq6glQrpzBIFEPOgxB/ZfyhDkmLAppXhZHc6cJx3e7zCyBWswPSUDzIA+MNqmPktHImLzqm5EBFRboGQyz005lBfnYA2D083izJS+7LNo6aOSH84dHIP6S87MEWvunbNzTN173fCIr95tHDunZrS+NIOY1OccyG2O3ZSnrNE9oKyZJqxLGxlrHfW72eH9Vp/xVMtCRkXfMrVQWaNhZXv5rceJmvrw2RX/8RPA9/qsCAOIZge6UOW2QIl6O+G72h74/g924NqxpdLeO4BP9dmhn9qmY1SzfMf7oF1LN5waVV9tGzv8/Qc4zJxncxc3HVsWaGu0YrbJNBReAXfahS9wVNU0RrrZtPZtyF+/2s49z+Yub4ZKNUhWickH5fgjisqyRq05PwVsSjZQ94SnzcuqX12L7oRpLJngcPvQ5H/rynjpVPRkz3bgbGBzfP0m4+OjPAswAIkUpPYFUULUAAAAAElFTkSuQmCC) no-repeat;
    }
    .shipping-address .addr-cur .curmarker {
        visibility: visible;
    }
    .shipping-address .addr .setdefault, .shipping-address .addr .deftip {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 2px;
        text-decoration: none;
        display: block;
        filter: alpha(opacity=70);
        opacity: .7;
        z-index: 3;
    }
    .shipping-address .addr .deftip {
        background: #CCC;
        color: #FFF;
    }
    .shipping-address .addr-def .deftip {
        display: block;
    }
    .shipping-address .option .container {
        padding: 6px 5px;
    }
    .shipping-address .control {
        min-height: 25px;margin-top:15px;
    }
    .shipping-address .control .surplus_addr{margin-left:10px}
    .shipping-address .manageAddr {
        float: right;
    }
</style>
<script>
    import util from '../../util/util'
    import config from '../../config'
    import $ from 'jquery'
    import gf1 from "../../assets/img/gift-1.jpg"
    import gf2 from "../../assets/img/gift-2.jpg"
    import gf3 from "../../assets/img/gift-3.jpg"
    import gf4 from "../../assets/img/gift-4.jpg"
    import gf5 from "../../assets/img/gift-5.jpg"
    import gf6 from "../../assets/img/gift-6.jpg"
    import gf7 from "../../assets/img/gift-7.jpg"
    import gf8 from "../../assets/img/gift-8.jpg"

    export default {
        route:{
            data(){
        this.SESSIONID = JSON.parse(sessionStorage.getItem("SESSIONID")) ;
        this.find = this.$route.params.goodsId;
        var that = this;
        that.good = that.goods[this.find];
        this.verificationTel = this.SESSIONID.tel;
        document.title = "积分兑换";
    }
    },
    ready(){
        var layerLoading = layer.msg('加载中...', {icon: 16,shade : [0.5,'#000']});
        var that = this;
        var url = config.API_BASE+"/4s/accountmanagement/addrlist";
        var query = {};
        query.uid = config.USERID();
        var param = { query:query };


        $.ajax({
            url:url,
            type:'POST',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify(param),
            beforeSend:function (request) {
                request.setRequestHeader("sessionid",config.SESSIONID());
            },
            success:function(response){
                if(response.code == 0){
                    layer.close(layerLoading);
                    that.addlist = response.data;
                    $.each(that.addlist, function(i, item){
                        if(item.status == 1){
                            that.defAddressId = item.id;
                        }
                    });

                }else {
                    layer.close(layerLoading);
                }
            },
            error:function(fail){
                if(fail.status == "401"){
                    var SESSIONID = sessionStorage.getItem("SESSIONID");
                    if(SESSIONID == null){
                        that.$route.router.go("/login");
                    }else{
                        sessionStorage.removeItem("SESSIONID");
                        layer.msg('登录失效，请重新登陆！');
                        util.login();
                    }
                }
            }
        })
    },
    data(){
        return {
            SESSIONID:{},
            goods:[
                {
                    "id": "g001",
                    "faceImg": gf1,
                    "integral": 400,
                    "number": "充足",
                    "name": "ZIPPO打火机（1个)",
                    "body": "<p class=\"gift-introduce\">名称：ZIPPO锻纱</p><p class=\"gift-introduce\">工艺：表面镀铬/喷射打磨&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产地：美国宾夕法尼亚</p><p class=\"gift-introduce\">外壳：纯铜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内胆：白钢&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尺寸：55*35*12mm  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;火机重量55g</p>"
                },
                {
                    "id": "g002",
                    "faceImg": gf2,
                    "integral": 400,
                    "number": "充足",
                    "name": "500元苏果购物卡（1张）",
                    "body": "<p class=\"gift-introduce\">以收到的商品实物为主。本卡仅限在苏果超市直营店使用。本卡可分次使用，不能充值，不找零，不提取现 金，金额使用完后，由苏果超市回收。本卡不记名、不挂失、遗失不补。购卡时苏果超市已向购卡人开具了发票，使用本卡时不再重复提供发票。 </p>"
                },
                {
                    "id": "g003",
                    "faceImg": gf3,
                    "integral": 400,
                    "number": "充足",
                    "name": "500元大润发超市购物卡（1张）",
                    "body": "<p class=\"gift-introduce\">本卡使用范围以购卡的章程或协议为准。本卡可分次使用，卡内金额用完后，此卡回收。本卡不挂失、不提 取现金、不计息、丢失不补。有效期三年（自发卡之日起）。如过期，可到开卡门店服务台办理延续手续。本卡需妥善保存，请勿接触手机等磁性物质，并保持卡面清洁。持卡人应依据由本公司制定的法律许可范围内的使用规则进行使用。</p>"
                },
                {
                    "id": "g004",
                    "faceImg": gf4,
                    "integral": 400,
                    "number": "充足",
                    "name": "古驰(GUCCI)花之舞香水 75ML（1瓶）",
                    "body": "<p class=\"gift-introduce\">商品名称：古驰(GUCCI)花之舞香水</p><p class=\"gift-introduce\">商品规格：75ML&nbsp;&nbsp;&nbsp;&nbsp;L&nbsp;&nbsp;类型：EDP淡香精L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产地：法国L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包装：正装香水有外盒，有塑封</p><p class=\"gift-introduce\">保质期：5年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;香调：花香调；前调：橘子、牡丹；中调：玫瑰、规划；后调：广藿香、檀香</p>"
                },
                {
                    "id": "g005",
                    "faceImg": gf5,
                    "integral": 2000,
                    "number": "充足",
                    "name": "2000元金鹰商场购物卡（1张）",
                    "body": "<p class=\"gift-introduce\">以收到的商品实物为主。金鹰贵宾积分卡可在全国金鹰连锁店使用。金鹰贵宾积分卡可分次使用，不可兑换 现金。金鹰贵宾积分卡不记名，不挂失，丢失后不予办理补卡，请持卡人妥善保管，新版金鹰贵宾积分卡购物时不再享受VIP积分，新版金鹰贵宾积分卡有效期为三年，过期可至客服中心提供延期服务。</p>"
                },
                {
                    "id": "g006",
                    "faceImg": gf6,
                    "integral": 3800,
                    "number": "充足",
                    "name": "Apple iPad Air 2 金色 64G WLAN版 9.7英寸平板电脑（1台）",
                    "body": "<p class=\"gift-introduce\">【屏幕描述】 高分辨率 Retina 显示屏，多点触摸，采用防油渍防指纹涂层 全层压显示屏 抗反射涂层,264 ppi；【摄像头】iSight摄像头：800万像素自动对焦；FaceTime摄像头：120万像素照片；720p HD高清视频</p>"
                },
                {
                    "id": "g007",
                    "faceImg": gf7,
                    "integral": 6500,
                    "number": "充足",
                    "name": "iphone 6s 16G 金色（1台）",
                    "body": "<p class=\"gift-introduce\">【颜色】玫瑰金色；【网络】2G、3G、4G全网通；【存储】 机身内存16GB ROM(全新状态 可用存储空间 11.2GB)；支持广阔视角的双域像素；郑敏采用防滑油渍防指纹涂层；支持多种语言文字同时显示。</p>"
                },
                {
                    "id": "g008",
                    "faceImg": gf8,
                    "integral": 7000,
                    "number": "充足",
                    "name": "古驰GUCCI女士玫瑰色PVC双G单肩手提包353440 KGDHZ 9777（1个)",
                    "body": "<p class=\"gift-introduce\">Gucci在皮鞋制作上有着自己的见解，每款产品都融汇了悠久的历史和高标准的制作工艺。Gucci做工考究， 整体手工车缝走线，平整均匀，大方优雅同时不失现代美感。独特的风格、优质的材质，贴合剪裁及细密的针脚精致耐用，彰显品牌制作工艺。</p>"
                }
            ],
            good: {},
            defaultNum: '1',
            find:0,
            addlist: [],
            defAddressId: '',
            defAddress:{},
            verificationTel: "",
            code: '',
            codemd5: ''
        }
    },
    methods:{
        addActiveClass(i, event){
            $(event.target).addClass('addr-active');
        },
        removeActiveClass(i, event){
            $(event.target).removeClass('addr-active');
        },
        changeDistributionAddress(item, event){
            this.defAddressId = item.id;
            this.defAddress = item;
        },
        reloadCurPage(){
            window.location.reload();
        },
        authVerification(){
            var that = this;
            layer.open({
                type: 1,
                title: '身份验证',
                skin: 'layui-layer-rim', //加上边框
                area : ['340px'],
                content: $('.j_authVerificationBox'),
                success: function($layer, index){
                    var url = config.PHP_API + "/index.php/Api/sendMessages";
                    var	mobile = that.verificationTel;
                    var	tpl_id = "5774";
                    var formd = new FormData();
                    formd.append("mobile", mobile);
                    formd.append("tpl_id",tpl_id);

                    $layer.find('.cancle').on('click', function(){
                        layer.close(index);
                    });
                    $layer.find('.send-code').on('click', function(e){
                        var $btn = $(this);
                        $.ajax({
                            url: url,
                            type:'POST',
                            contentType: false,
                            processData: false,
                            data: formd,
                            success: function(response){
                                if(response.code == 0){
                                    that.codemd5 = '';
                                    that.codemd5 = response.md5code;
                                    layer.msg('验证码发送成功');
                                    var seed = 60,
                                            _timer = null;
                                    $btn.attr("disabled",true);
                                    $btn.css({"border":"1px solid #ccc","color":"#666","cursor":"not-allowed"});
                                    function tips() {
                                        if(seed<=0){
                                            $btn.html("获取验证码");
                                            seed = 60;
                                            clearInterval(_timer);
                                            $btn.attr("disabled",false);
                                            $btn.css({"border":"1px solid #ff791f","color":"#ff791f","cursor":"pointer"});
                                            return ;
                                        }
                                        seed -- ;
                                        $btn.html(seed+"秒后重试");
                                    }
                                    _timer = setInterval(tips,1001);
                                }else{
                                    layer.msg(response.desc);
                                }
                            },
                            error:function(fail){
                                if(fail.status == "401"){
                                    var SESSIONID = sessionStorage.getItem("SESSIONID");
                                    if(SESSIONID == null){
                                        that.$route.router.go("/login");
                                    }else{
                                        sessionStorage.removeItem("SESSIONID");
                                        layer.msg('登录失效，请重新登陆！');
                                        util.login();
                                    }
                                }
                            }
                        });

                    });
                    $layer.find('.send-code').on('click', function(e){

                    });

                }
            });
        },
        ajaxSubmit(){
            var layerLoading = layer.msg('订单提交中...', {icon: 16,shade : [0.5,'#000']});
            var that = this;
            var url = config.API_BASE+"/4s/score/add";
            var query = {};
            query.user_id = config.USERID();
            query.role = that.SESSIONID.role;
            query.goods_id = that.good.id;
            query.goods_name = that.good.name;
            query.score_value = that.good.integral;
            query.address_id = that.defAddress.id;
            query.code = that.code;
            query.tel = that.verificationTel;
            query.md5code = that.codemd5;
            var param = { query:query };
            if(this.addlist.length <= 0){
                layer.msg("请至少添加或者选择一个收货地址~");
                return false;
            }
            $.ajax({
                url:url,
                type:'POST',
                dataType: 'JSON',
                contentType: 'application/json; charset=utf-8',
                data:JSON.stringify(param),
                beforeSend:function (request) {
                    request.setRequestHeader("sessionid",config.SESSIONID());
                },
                success:function(response){
                    if(response.data[0] == 1){
                        layer.closeAll();
                        var sessionid = JSON.parse(sessionStorage.getItem("SESSIONID"));
                        var find = that.good.integral;
                        sessionid.total_jifen -= find;
                        sessionStorage.setItem("SESSIONID",JSON.stringify(sessionid));
                        that.$root.$children[0].$children[1].init();

                        that.$route.router.go("/u/exchange/cashing/order/succ");
                    }else{
                        layer.closeAll();
                        layer.msg(response.data[1]);
                    }
                },
                error:function(fail){
                    if(fail.status == "401"){
                        var SESSIONID = sessionStorage.getItem("SESSIONID");
                        if(SESSIONID == null){
                            that.$route.router.go("/login");
                        }else{
                            sessionStorage.removeItem("SESSIONID");
                            layer.msg('登录失效，请重新登陆！');
                            util.login();
                        }
                    }
                }
            });

        }
    },
    filters:{
        changeToNumber: {
            // model -> view
            // 在更新 `<input>` 元素之前格式化值
            read(val) {
                return parseInt(val, 10)
            },
            // view -> model
            // 在写回数据之前格式化值
            write(val, oldVal) {
                var number = +val.replace(/[^\d.]/g, '')
                return number === '' ? 1 : isNaN(number) ? 1 : parseInt(number, 10)
            }
        }
    }
    }
</script>
