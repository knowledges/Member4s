<template>
	<div id="orderSearch">
		<input type="text" :placeholder="placeinfo" />
		<button class="G_f14">{{butinfo}}</button>
	</div>
</template>
<script>
	new Vue({
        el: '#orderSearch',
        data: {
            placeinfo: '请输入关键字',
            butinfo: '订单搜索'
        }
    })
	
	export default {
        props: {
            placeinfo: '',
            butinfo: ''
        },
    }
</script>
<style scoped>
	#orderSearch{
		width: 210px;
		height: 26px;
		line-height: 26px;
		border: 1px solid #cccccc;
		position: absolute;
		right: 0;
		top: 0;
	}
	#orderSearch input[type=text]{
		width: 125px;
		float: left;
		padding-left: 5px;
		height: 26px;
		line-height: 26px;
		color: #cccccc;
		font-family: simsun;
		border: none;
		outline: none;
	}
	#orderSearch button{
		width: 78px;
		background: #ff791f;
		text-align: center;
		height: 28px;
		line-height: 28px;
		margin: -1px;
		float: right;
		display: inline-block;
		color: #fff;
		border: none;
		outline: none;
		cursor: pointer;
	}
</style>