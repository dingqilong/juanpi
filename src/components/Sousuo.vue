<template>
  <div class="sousuo root-box">
    <div class="header">
    	<i class="iconfont icon-fangdajing"></i>
    	<input type="text" :placeholder="msg?msg.jump_keywords[0].text:null" value="" @keyup.enter="postSearch()"/>
    	<a href="#todaynew">取消</a>
    </div>
  
	  <div class="search">
	  	<p class="search-title">热搜</p>
	  	<div class="keywords">
	  		<div @click="postSearch(msg?msg.jump_keywords[0].text:null)"  class="key" v-text="msg?msg.jump_keywords[0].text:null"></div>
	  		<div @click="postSearch(good?good.text:null)"  class="key" v-for="good in msg?msg.hot_keywords:null" v-text="good.text"></div>
	  	</div>
	  	<p class="search-title">搜索历史</p>
	  	<p class="search-title">常用分类</p>
	  	<div class="search-ul">
	  		<div @click="postSearch(li?li.text:null)"  v-for="li in msg?msg.hot_category:null" v-text="li.text"></div>
	  	</div>
	  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'sousuo',
  data () {
    return {
      msg:null
    }
  },
  computed:{
  	
  	...mapState(['search'])
  },
  methods:{
  	getSearch(){
  		let that = this
			$.ajax({
				url:'http://getdouban.duapp.com/getJson.php',
				data:{
					src:'https://m.juanpi.com/keywords/search?plateform=m&zy_ids=c3_l1_18_51_5'
				},
				jsonp:"callback",
				dataType:'jsonp',
				success:function(data){
					that.msg = data
				}
			})
  	},
  	postSearch(key){
  		if(!key){
  			this.$store.commit("changeSearch",$("input").val())
  		}else{
  			this.$store.commit("changeSearch",key)
  		}
  		this.$router.push("/searchlist")
  	}
  },
  mounted(){
  	this.getSearch()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sousuo{
	background:white;
	.header{
		height:2.225rem;
		border-bottom:1px solid #ebebeb;
		padding-top:0.5rem;
		padding-left:0.7rem;
		position:relative;
		i{
			position:absolute;
			font-size:0.7rem;
			color:#999;
			top:0.8rem;
			left:1.1rem;
		}
		input{
			width:15.11rem;
			height:1.4rem;
			padding-left:1.55rem;
			border-radius:0.2rem;
			border:none;
			background:#f2f2f2;
			color:#999;
			font-size:0.6rem;
			margin-right:0.3rem;
			outline:none;
		}
		a{
			font-size:0.75rem;
			color:#333;
		}
	}
	.search{
		padding:0 0.7rem;
		.search-title{
			font-size:0.7rem;
			margin-top:0.7rem;
			color:#999;
			line-height:1.4;
		}
		.keywords{
			overflow:hidden;
			.key{
				float:left;
				font-size:0.6rem;
				color:#666;
				margin:0.4rem 0.5rem 0.15rem 0;
				padding:0.25rem 0.5rem;
				background:#f4f4f4;
				border-radius:0.2rem;
				line-height:1.4;
			}
			.key:nth-of-type(1){
				color:#ff464e;
			}
		}
		.search-ul{
			div{
				display:inline-block;
				width:2.5rem;
				height:2.5rem;
				margin:0.4rem 1.2rem 0 0;
				font-size:0.6rem;
				color:#666;
				border-radius:1.25rem;
				line-height:2.5rem;
				text-align:center;
			}
			div:nth-of-type(1){
				background-color:rgba(176, 185, 255, 0.2);
			}
			div:nth-of-type(2){
				background-color:rgba(255,203,90,.2);
			}
			div:nth-of-type(3){
				background-color:rgba(255,161,134,.2);
			}
			div:nth-of-type(4){
				background-color:rgba(146,231,141,.2);
			}
			div:nth-of-type(5){
				background-color:rgba(255,146,170,.2);
				margin:0.4rem 0 0 0;
			}
			
		}
	}
}
</style>
