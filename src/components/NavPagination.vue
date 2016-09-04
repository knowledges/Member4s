<template>
    <div class="page-bar clearfix">
        <ul>
            <!--v-if="cur!=1"-->
            <li><a v-on:click="cur--">上一页</a></li>
            <li v-for="index in indexs" v-bind:class="{ active: cur == index}">
                <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="cur!=all" class="bar-right"><a v-on:click="cur++">下一页</a></li>
            <li class="bar-last"><a>共{{all}}页</a></li>
            <li class="bar-last"><a>跳转至 <input type="text" class="jump">页</a></li>
            <li class="bar-last"><a class="sure"  v-on:click="jumpClick">确定</a></li>
        </ul>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        props: ['cur', 'all'],
        data(){
            return{}
        },
        computed: {
            indexs: function () {
                var left = 1
                var right = this.all
                var ar = []
                if (this.all >= 11) {
                    if (this.cur > 5 && this.cur < this.all - 4) {
                        left = this.cur - 5
                        right = this.cur + 4
                    } else {
                        if (this.cur <= 5) {
                            left = 1
                            right = 10
                        } else {
                            right = this.all
                            left = this.all - 9
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                return ar
            }
        }
        ,
        methods: {
            btnClick(data)
            {
                if (data != this.cur) {
                    this.cur = data
                    this.$dispatch('btn-click', data)

                }
            },
            jumpClick(){
                var current = $(".jump").val();
                if(current<=0 || current==""){
                    return
                }
                this.cur  = current;
                this.$dispatch('jump-click', current)
            }
        }
    }
</script>

<style lang="css">
    ul, li {
        margin: 0px;
        padding: 0px;
    }
    .page-bar{
        text-align: center;
    }
    .page-bar li {
        list-style: none;
        display: inline-block;

    }
    .page-bar li button{
        padding: 10px;
        color: #FFF;
        background:#ff9205;
        border-radius: 4px;
        border:none;
    }
    .page-bar li:first-child > a {
        margin-right: 15px
    }
    .bar-right{
        margin-left: 15px
    }
    .page-bar a {
        border: 1px solid #ddd;
        text-decoration: none;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #000;
        cursor: pointer
    }

    .page-bar a:hover {
        border:1px solid #ff9205;
        color:#ff9205;
    }

    .page-bar .active a {
        color: #fff;
        cursor: default;
        background-color: #ff9205;
        border-color: #ff9205;
    }

    .page-bar i {
        font-style: normal;
        color: #d44950;
        margin: 0px 4px;
        font-size: 12px;
    }
    .bar-last{
        color: #000;
    }

    .bar-last:first-child{
        color: #CCC;
    }

    .bar-last a{
        border: none;
    }
    .bar-last a:hover{
        border: none;
        color: #000;
    }
    .sure{
        padding:5px 10px;
        color: #FFFFFF!important;
        background: #ff9205;
        border-radius: 4px;
        font-size: 16px;
    }
    .jump{
        display: inline-block;
        padding: 0 2px;
        margin: 0 5px;
        width: 60px;
        height: 20px;
    }
</style>
