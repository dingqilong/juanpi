<template>
  <div class="searchlist root-box">
    <div class="header">
    	<span class="iconfont icon-arrow-left" @click="back"></span>
    	<div class="sousuo">
    		<span class="iconfont icon-fangdajing"></span>
    		<input type="text" name="" id="" v-model="msg" @keyup.enter="loadMore(1)"/>
    	</div>
    	<span class="qu" @click="back">取消</span>
    </div>
	  <div class="sort">
	  	<span class="moren active" @click="change('.moren')" type="1">默认</span>
	  	<span class="price" @click="change('.price')" type="2">价格<i class="iconfont icon-shangxia"></i></span>
	  	<span class="sales" @click="change('.sales')" type="3">销量</span>
	  </div>
	  <ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" class="goods-item">
	  	<li v-for="(good,index) in goods?goods:null">
	  		<img :src="good.picurl"/>
	  		<p><span v-text="'￥'+good.tuan_price?good.tuan_price:good.reprice"></span><span>拼</span><span v-text="'￥'+good.oprice"></span></p>
	  		<p v-text="good.title"></p>
	  	</li>
	  </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {InfiniteScroll} from 'mint-ui';
import Vue from 'vue'
export default {
  name: 'searchlist',
  data () {
    return {
      msg:null,
      goods:[],
      num:1,
      isUp:1
    }
  },
  methods:{
  	getGoods(){
  		let that =this
  		$.ajax({
  			url:"http://getdouban.duapp.com/getJson.php",
  			data:{
  				src:"https://m.juanpi.com/search?keyword="+that.msg+"&&user_groupids=p8_c3_a1_l1_222&page="+(++that.num)+"&is_ajax=1&order=&sort=&isstock=0"
  			},
  			jsonp:'callback',
  			dataType:'jsonp',
  			success:function(data){
  				that.goods = data.data
  				console.log(that.goods)
  			}
  		})
  	},
  	//https://m.juanpi.com/search?keyword=%E5%84%BF%E7%AB%A5%E5%A5%97%E8%A3%85&&user_groupids=p8_c3_a1_l1_222&page=1&is_ajax=1&order=&sort=&cat_threeids=&price_range=
  	scroll(){
  		if(document.body.scrollTop > 44){
				$(".sort").css({
  				position:'fixed',
  				top:0
  			})
  		}else{
  			$(".sort").css({
  				position:'relative',
  			})
  		}
  	},
  	loadMore(str){
  		var that = this
			if(str){
				that.goods = []
			}
	  	$.ajax({
  			url:"http://getdouban.duapp.com/getJson.php",
  			data:{
  				src:"https://m.juanpi.com/search?keyword="+that.msg+"&&user_groupids=p8_c3_a1_l1_222&page="+(++that.num)+"&is_ajax=1&order=&sort=&isstock=0"
  			},
  			jsonp:'callback',
  			dataType:'jsonp',
  			success:function(data){
  				data.data.list.forEach(function(item,index){
  					that.goods.push(item)
  				})
  				console.log(data)
  			}
  		})
	  },
	  back(){
  		window.history.back()
  	},
	  
	  change(ele){		//有问题啊啊啊啊啊啊啊！！！！！
	  	let that = this
	  	if($(ele).attr('type') == 2){
	  		var arr = this.goods
		  	for(var i=0;i<arr.length-1;i++){
	        for(var j=0;j<arr.length-1-i;j++){
	            if(arr[j].tuan_price>arr[j+1].tuan_price){
	                var temp=arr[j];
	                arr[j]=arr[j+1];
	                arr[j+1]=temp;
	            }
	        }
	    	}
		  	
  			if(that.isUp == 1){
  				that.isUp = 2
  				this.goods = [];
		  		this.goods = arr;
  			}else{
  				that.isUp = 1
  				this.goods = [];
		  		this.goods = arr.reverse();
  			}	  		
	  	}
	  	$(".sort span").removeClass("active")
  		$(ele).addClass("active")
	  }
  	
  },
  computed:{
  	search:function(){
  		return this.$store.state.search
  	},
  	...mapState(['search'])
  },
  components:{
  },
  mounted(){
  	this.msg = this.search;
  	//this.getGoods()
  	document.addEventListener('scroll',this.scroll,false);
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.searchlist{
	background:white;
	.header{
		height:2.2rem;
		border-bottom: 1px solid #dedede;
		padding-top:0.45rem;
		position:relative;
		.icon-arrow-left{
			position: absolute;
			font-size:1.2rem;
			left:0.6rem;
			top:0.6rem;
			color:#666;
		}
		.sousuo{
			margin:0 2.65rem 0 2.4rem;
			border: 1px solid #bbb;
    	border-radius: 2px;
    	padding-bottom:0.2rem;
			span{
				font-size:0.7rem;
				padding:0;
				color:#999;
				margin-left:0.4rem;
				margin-right:0.2rem;
				font-weight:900;
				position:relative;
				top:-0.05rem;
				
			}
			input{
				border:none;
				font-size:0.65rem;
				line-height:1;
				width:11rem;
				outline:none;
				border:none;
				color:#999;
			}
		}
		.qu{
			position:absolute;
			right:0.6rem;
			top:0.7rem;
			font-size:0.75rem;
			color:#333;
		}	
	}
	.sort{
		background:#fff;
		height:2rem;
		width:100%;
		padding:0.25rem 0;
		border-bottom: 1px solid #ebebeb;
		span{
			display:block;
			float:left;
			width:33%;
			text-align:center;
			border-right: 1px solid #ebebeb;
			font-size:0.7rem;
			line-height:1.4rem;
		}
		span:nth-of-type(3){
			border:none;
		}
		span:nth-of-type(2){
			i{
				font-size:0.5rem;
				color:#999;
				margin-left:0.2rem;				
			}
		}
	}
	.goods-item{
		background:#f4f4f8;
		overflow:hidden;
		li{
			background:#fff;
			width:9.315rem;
			float:left;
			height:12.2rem;
			margin:0.12rem 0.12rem 0 0;
			img{
				width:100%;
				heigth:9.375rem;
			}
			p:nth-of-type(1){
				margin-left:0.4rem;
				span:nth-of-type(1){
					font-size:0.75rem;
					color:#ff464e;
				}
				span:nth-of-type(2){
					font-size:0.4rem;
					background:#ff464e;
					color:#fff;
					margin:0 0.2rem 0 0.2rem;
					line-height:1;
				}
				span:nth-of-type(3){
					font-size:0.55rem;
					color:#bbb;
					text-decoration:line-through;
				}
			}
			p:nth-of-type(2){
				margin-left:0.4rem;
				margin-top:0.2rem;
				font-size:0.6rem;
				line-height:1rem;
			}
		}
		li:nth-of-type(2n){
			margin-right:0;
		}
	}
	.active{
		color:#ff464e!important;
	}
}
</style>
