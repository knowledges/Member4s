<template>
    <div class="main-container">
        <h2 class="sub-title">兑换成功</h2>
        <div class="content">
            <div class="hd">
                <i class="icon-suc"></i>兑换成功
            </div>
            <div class="bd">礼品已兑换成功，请等待我们的工作人员安排发货。</div>
            <div class="ft">
                <a v-link="{path:'/u/exchange/history'}">知道了</a>
                <a v-link="{path:'/u/exchange/cashing'}" class="dis">继续兑换</a>
            </div>
        </div>
    </div>
</template>
<style>
    .main-container{
        padding: 20px;
    }
    .main-container .sub-title{
        height: 15px;
        line-height: 15px;
        border-left: 4px solid #ff791f;
        padding-left: 10px;
        font-size: 14px;
    }
    .main-container .content{
        padding-top: 100px;
        text-align: center;
    }
    .main-container .content .hd{
        color: #333;
        font-size: 18px;
    }
    .main-container .content .bd{
        font-size: 14px;
        color:#666;
        margin: 20px 0 50px;
    }
    .main-container .content .ft a{
        display: inline-block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        background: #ff791f;
        color: #fff;
        font-size: 14px;
        margin: 0 10px;
    }
    .main-container .content .ft a.dis{
        background: #ccc;
    }
    .main-container .content .icon-suc{
        display: inline-block;
        width: 30px;
        height: 30px;
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUJGQkJDOEM4NDdGMTFFNkJBMDY4RUY5QzYyQjM0RjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJGQkJDOEQ4NDdGMTFFNkJBMDY4RUY5QzYyQjM0RjgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QkZCQkM4QTg0N0YxMUU2QkEwNjhFRjlDNjJCMzRGOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QkZCQkM4Qjg0N0YxMUU2QkEwNjhFRjlDNjJCMzRGOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqhzq0UAAAMDSURBVHjavJdLSFRRGMf/987DURrHwpkxG/FRJkUtFJTa9lB6rMpJpYLoAak9LJloJ7QQ2qmlAz1wEagNZEItypAgAhdiiyywB9JoJPlIB9N0dGb6zuWMjDL33hmd8Rv+i8P57vebe8/3nfMdofqTFRGYjlRCOkwqJOWQUvjcNGmI1Ed6Q3pNWlQLqFWZZ8FrSFUks4yPlWs/6RppgtRMauB/KqyJCtBy0iCpTgEazlL5M4M8RsRgDamF1M7fZK1m5TFaeExFMHNwkSoRO6vkMTVKYLYuJxB7YzEb5cBlpCuIn1Vzxgowy94mxN+agmUYBLOSsWwA2MJZEljP63SjjLH0DFwcZZ1GZGZ9NnRCQtgpxgyCY2YC/exb61GX24sb2S/k3ErYllkQK6goaHAmvQFFKXZpnKgxyrkWMPDOWEA1gg7nbE7kJx+XxpPeYdx3l8m55zKwab1QvZiIixmPsXvTAWn8e+E77rntmF4clXvEpF0v1CAacTnzCXYk7ZPGP+cH0OyuwMzShPKykDyyu3zCdhyz3EJaQvjVSNKk4GqWaxk6NNeHxh+lqlDGFHWiYVhu1p5WjyPmm6jNfrkcPGjJWgtqsp4jMzFfGn+dfU9vWo5/Pk8kH+qbWGQqlU2ujzOveHYmozqzA3uMh6TxFp2NSqUL6YZd0nhgphtO92ks+GcjXaEP4l5jiWzOv/vTCtfobQTgB30ZXMpoxcHUKtQQ1KzPkXz6PV14NHIBi4GFaFKjW1jyewOOwbx5r3/OIOdVaDqJs9saqU5X5mLvVBvaRx3wB3zRQMdJNpHqz0HQu0qefZ5neDhyfsVbvZ18gLZftdFCwTsSr8C7THZUfVE7oViCHbU48PlvD3omWtZSfeN8w5oWQtpbts10xPlkqggyQjuQp7wtjZc1h77Y6p7rOqkzDtBOHlu22WOZcorkjCHUyWP61PpqH+8S2HqMrQM4xmNUrYaq3STYeuSR7rBTLgrgJH8mTylZhSgvbcUhl7bNfG4q5NLWzeVVC/hfgAEAI77FlgIbJbQAAAAASUVORK5CYII=) no-repeat;
        margin-right: 15px;
        vertical-align: middle;
    }
</style>
