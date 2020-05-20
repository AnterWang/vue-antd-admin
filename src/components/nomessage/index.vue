<template>
	<div class="box">
		<img class="img" :style="imgStyle" src="https://hh-oss-html.miyapay.com/hhops/picture/1567564340589632abf7d610f">
		<div class="text">{{message}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			message:{
				type: String,
				default: '暂无信息'
			},
			imgStyle:{
				type: String
			}
		},
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.box{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.img{
			width: 200px;
			height: 200px;
			background-size: 100%;
			padding: 30px;
		}
		.text{
			font-size: 14px;
			color: #999999;
			white-space: pre-line;
			text-align: center;
		}
	}
</style>
