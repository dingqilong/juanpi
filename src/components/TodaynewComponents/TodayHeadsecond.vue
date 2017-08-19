<template>
  <div class="header">
    <img src="../../assets/logo.png"/>
    <i class="iconfont icon-liebiao1" @click="go"></i>
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
  },
  methods:{
  	go(){
  		this.$router.push("/fenlei")
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
	height:2.2rem;
	position:relative;
	padding-top:0.5rem;
	text-align:center;
	border-bottom: 1px solid #ebebeb;
	background:white;
	img{
		width:2.4rem;
		height:1.2rem;
	}
	i{
		padding-top:0.1rem;
		font-size:1.1rem;
		position:absolute;
		right:0.5rem;
		color:#666;
	}
}
</style>
