<template>
  <div class="fenlei root-box">
    <div class="header">
    	<i class="iconfont icon-arrow-left" @click="back"></i>
    	<h2>全部分类</h2>
    </div>
    <router-link class="gosearch" to="/sousuo">
    	<i class="iconfont icon-fangdajing"></i>
    	<span>搜索商品</span>
    </router-link>
    <div class="li-box">
    	<ul class="li-box-l">
    		<li v-for="(item,index) in msg?msg:null" @click="change(index,$event)"  v-text="item.name"></li>
    	</ul>
    	<div class="li-box-r">
    		<div class="leixing" v-for="(item,index) in goods?goods.secondCateList:null" @click="gosearch(item.name)">
    			<img :src="'https://s2.juancdn.com'+item.icon"/>
    			<p v-text="item.name"></p>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'fenlei',
  data () {
    return {
      msg:null,
      index:0
    }
  },
  computed:{
  	goods:function(){
  		return this.msg?this.msg[this.index]:null
  	}
	},
  methods:{
  	getMsg(){
  		let that = this
  		$.ajax({
				url:'https://m.juanpi.com/cate/catelist?pf=8&area=4&bi=222&dtype=jsonp&_=1501726546440&callback=jsonp2',
				dataType:'jsonp',
				success:function(data){
					that.msg = data
					console.log(data)
				}
			})
  	},
  	change(index,e){
  		$(".li-box-l li").removeClass("active")
  		$(e.path[0]).addClass("active")
  		this.index = index
  	},
  	gosearch(key){
  		this.$store.commit("changeSearch",key);
  		this.$router.push("/searchlist")
  	},
  	back(){
  		window.history.back()
  	}
  },
  mounted(){
		this.getMsg()		
		
  },
  updated(){
  	if(this.index == 0){
  		$("ul li").eq(0).addClass("active")
  	}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fenlei{
	background:white;
	display:flex;
	flex-direction:column;
	.header{
		height:2.2rem;
		border-bottom: 1px solid #dedede;
		position:relative;
		background:white;
		h2{
			font-size:0.9rem;
			line-height:2.2rem;
			text-align:center;
			font-weight:100;
			color:#333;
			margin-left:0.6rem;
		}
		i{
			position:absolute;
			font-size:1.2rem;
			top:0.6rem;
			left:0.6rem;
			color:#666;
		}
	}
	.gosearch{
		display:block;
		margin:0.58rem;
		height:1.525rem;
		border: 1px solid #bbb;
    border-radius: 2px;
    background-color: #fff;
    
		i{
			font-size:0.8rem;
			color:#999;
			margin-left:0.3rem;
			font-weight:900;
		}
		span{
			font-size:0.65rem;
			color:#999;
			line-height:1.525rem;
		}
	}
	.li-box{
		overflow:hidden;
		flex:1;
		.li-box-l{
			float:left;
			width:4.7rem;
			height:100%;
			background:#f9f9f9;
			li{
				height:2.25rem;
				border-bottom: 1px solid #ebebeb;
    		cursor: pointer;
   			border-left: 4px solid #f9f9f9;
   			background:#f9f9f9;
   			text-indent: 0.75rem;
   			text-align:left;
   			line-height:2.25rem;
   			font-size:0.7rem;
   			color:#333;
			}	
			.active{
				border-left:2px solid #ff464e;
   			background:#fff;
			}		
			li:last-of-type{
				border-bottom:none;
			}
		}
		.li-box-r{
			float:left;
			width:13.3rem;
			height:100%;
			overflow:auto;
			margin-left:0.75rem;
			.leixing{
				width:4.25rem;
				height:4.675rem;
				padding:0 0.65rem;
				float:left;
				img{
					width:2.9rem;
					height:2.9rem;
				}
				p{
					font-size:0.6rem;
					text-align:center;
					color:#333;
				}
			}
		}
	}
	
}

</style>
