<template>
	<div class="toTop" v-if="isShow">
		<a @click="toTop" class="iconfont icon-top"></a>
	</div>
</template>

<script>
	
	export default{
		name:'toTop',
		data () {
			return{
				scroll:'',
				isShow:false
			}
		},
		methods:{
			mouseScroll:function(){
				this.scroll = document.body.scrollTop;
				if(this.scroll > 100){
					this.isShow = true
				}else{
					this.isShow = false
				}
			},
			toTop(){
				document.body.scrollTop = 0;
			}
		},
		mounted(){
			window.addEventListener('scroll',this.mouseScroll);
		}
		
	}
</script>

<style lang="scss" scoped>
.toTop{
	width:2rem;
	height:2rem;
	background:#fff;
	border-radius: 2rem;
	position: fixed;
	bottom:3.2rem;
	right:1rem;
	text-align: center;
	line-height:2rem;
	a{
		font-size:1rem;
	}
}
</style>