<template>
  <div class="header">
    <router-link class="search-input" to="/sousuo">
    	<i class="iconfont icon-fangdajing"></i>
    	<label>搜索商品</label>
    </router-link>
    <a class="liebiao" href="#fenlei">
    	<i class="iconfont icon-liebiao1"></i>
    </a>
    
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      
    }
  },
  components:{
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
	height:2.2rem;
	background:white;
	padding-left:0.7rem;
	padding-top:0.5rem;
	border-bottom:1px solid #ebebeb;
	position:relative;
	.search-input{
		display:block;
		width:15.85rem;
		height:1.4rem;
		background:#f2f2f2;
		border-radius:.17rem;
		padding-left:0.4rem;
		
		i{
			color:#666;
			font-size:0.65rem;
			font-weight:600;
		}
		label{
			color:#999;
			font-size:0.6rem;
		}
	}
	.liebiao{
		position:absolute;
		display:block;
		top:0.65rem;
		right:0.5rem;
		i{
			color:#666;
			font-size:1.2rem;
		}
	}
}
</style>
