<template >
  <div class="nav-tab" v-show="msg">
  	
    <router-link to="/todaynew" >
    	<img :src="path=='/todaynew'?urll[0]:url[0]" />
    	<span v-html="msg?msg[0].title:''"></span>
    </router-link>
    <router-link to="/zhifa" >
    	<img :src="path=='/zhifa'?urll[1]:url[1]" />
    	<span v-html="msg?msg[1].title:''"></span>
    </router-link>
    <router-link to="/global" >
    	<img :src="path=='/global'?urll[2]:url[2]" />
    	<span v-html="msg?msg[2].title:''"></span>
    </router-link>
    <router-link to="/shopcar" >
    	<img :src="path=='/shopcar'?urll[3]:url[3]" />
    	<span v-html="msg?msg[3].title:''"></span>
    </router-link>
    <router-link to="/mine" >
    	<img :src="path=='/mine'?urll[4]:url[4]" />
    	<span v-html="msg?msg[4].title:''"></span>
    </router-link>
  </div>
</template>

<script>
//import Vue from 'vue'
//	const NavTab = Vue.extend({
//		name:'navtab'
//	})
//	Vue.component('nav-tab',NavTab)
//	export default NavTab

import {mapState} from 'vuex'

export default {
  name: 'nav-tab',
  data () {
    return {
      url:[],
      urll:[],
      path:"",
    }
  },
  methods:{
  	
  },
  computed:{
  	msg:function(){
  		return this.$store.state.nav
  	},
  	...mapState(['nav'])
  },
  mounted(){
  	let that = this;
  	this.path = this.$route.path
  	if(!this.msg){
  		$.ajax({
				url:'http://getdouban.duapp.com/getJson.php',
				data:{
					src:'https://m.juanpi.com/index/getMenu?select=1_1'
				},
				dataType:'jsonp',
				success:function(data){
					that.$store.commit('changeNav',data.menu_list)
					for(var i = 0; i < 5; i ++){
						that.url.push(that.msg[i].bg_icon)
					}
					for(var i = 0; i < 5; i ++){
						that.urll.push(that.msg[i].act_icon)
					}
				}
			})
  	}else{
  		for(var i = 0; i < 5; i ++){
				that.url.push(this.msg[i].bg_icon)
			}
			for(var i = 0; i < 5; i ++){
				this.urll.push(this.msg[i].act_icon)
			}
  	}
		
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav-tab{
	height:2.45rem;
	display:flex;
	background:#fff;	
	width:100%;
	border-top:1px solid #ebebeb;
	a{
		display:block;
		height:100%;
		width:20%;
		display:flex;
		flex-direction:column;
		align-items:center;
		color:#333;
		img{
			display:block;
			margin:0;
			padding:0;
			width:1.2rem;
			height:1.7rem;
			padding:0.25rem 0;
			border:none;
		}
		span{
			font-size:0.5rem;
		}
	}
	.router-link-active{
		color:#FF464E;
	}
	
}
</style>
