<template>
  
  <div class="swiper-containern todaynav">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in msg?msg[0].subtab:null" @click="changePage(item.seldefault,item.link.slice(26,30),index)">{{item.title}}</div>
        
    </div>
	</div>
 
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'todaynav',
  data () {
    return {
    }
  },
  
  methods:{
  	changePage(num,id,index){
  		console.log(index)
  		$(".swiper-slide").removeClass("topnav-active")
  		$(".swiper-slide").eq(index).addClass("topnav-active")
  		this.$store.commit("changePage",{'num':num,'id':id,'index':index})
  	}
  },
  
  computed:{
  	msg:function(){
  		return this.$store.state.nav
  	},
  	index:function(){
  		return this.$store.state.index
  	},
  	...mapState(['nav','index'])
  },
  components:{
  	
  },
  mounted(){
  	let that = this
    let timer = setInterval(function(){
    	if(that.msg){
    		clearInterval(timer)
    		var swiper = new Swiper('.todaynav', {    
			    slidesPerView:'auto',
			    
			  });	
			  $(".swiper-slide").eq(that.index).addClass('topnav-active')
    	}
    },100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todaynav{
	height:1.9rem;
	background:white;
	font-size:0.7rem;
	line-height:1.9rem;
	position:relative;
	overflow:hidden;
	.swiper-slide{
		text-align:center;
		width:2rem;
		padding:0 0.25rem;
		margin:0 0.5rem;
		box-sizing:border-box;
	}
	.swiper-wrapper{
		position:relative;
	}
}
.topnav-active{
	color:#FF464E;
	border-bottom:2px solid #ff464e
}
</style>
