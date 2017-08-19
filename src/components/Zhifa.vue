<template>
  <div class="zhifa root-box">
   	<h3>生活仓库<span class="iconfont icon-liebiao" @click="go"></span></h3>
   	<div class="list-nav">
   		<a href="javascript:;" @click="changeActive('sort',true,$event)" class="active">默认</a>
   		<a href="javascript:;" @click="changeActive2">价格
   			<img :src="src" alt="" />
   		</a>
   		<a href="javascript:;" @click="changeActive('join_number',false,$event)">销量</a>
   	</div>
   	
   	<div class="list-con">
   		<ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" > 
   			<li v-for="good in goods" @click="give">
   				<router-link :to="'/detail/'+good.goods_id+'/'+good.title+'/'+good.join_number">
   					<img :src="good.pic_url" alt="" />
	   				<p>
	   					<span>￥{{good.tuan_price}}</span>
	   					<span>拼</span>
	   					<s>￥{{good.oprice}}</s>
	   				</p>
	   				<p>
	   					<span>直发</span>
	   					<span>{{good.title}}</span>
	   				</p>
   				</router-link>
	   		</li>
   				
   		</ul>
   	</div>
    <nav-tab></nav-tab>
    <to-top></to-top>
  </div>
</template>

<script>
import NavTab from './NavTab'
import ToTop from './ToTop'
import {InfiniteScroll} from 'mint-ui';
import Vue from 'vue'

export default {
  name: 'zhifa',
  data () {
    return {
    	scroll:'',
    	num:2,
    	num2:0,
    	src:'https://jp.juancdn.com/jpwebapp_v1/images_v1/icon/sort_default.png?19dae1b0-1&sv=a8351a1e',
 			srcArr:['https://jp.juancdn.com/jpwebapp_v1/images_v1/icon/sort_up.png','https://jp.juancdn.com/jpwebapp_v1/images_v1/icon/sort_down.png'],
      goods: []
    }
  },
  methods:{
  	give(){
  		angel.$emit("toDetail",this.goods)
  	},
  	changeActive:function(type,isUp,e){
  		this.src = 'https://jp.juancdn.com/jpwebapp_v1/images_v1/icon/sort_default.png?19dae1b0-1&sv=a8351a1e'
  		$(".list-nav a").removeClass('active')
  		$(e.currentTarget).addClass('active')
  		this.num2 = 0;
  		this.goods.sort(function(a,b){
  			if(isUp){
  				return a[type] - b[type];
  			}else{
  				return b[type] - a[type];
  			}
	  			
  		})
  	},
  	changeActive2:function(e){
  		$(".list-nav a").removeClass('active')
  		$(e.currentTarget).addClass('active')
  		this.src = this.srcArr[this.num2]
  		var that =this;
			this.goods.sort(function(a,b){
				if(that.num2 == 0){
	  			return a.tuan_price - b.tuan_price;
	  		}else{
	  			return b.tuan_price - a.tuan_price;
	  		}
  		})
			this.num2 ++;
  		if(this.num2 > 1){
  			this.num2 = 0
  		}
  	},
  	
  	mouseScroll(){
  		this.scroll = document.body.scrollTop;
  		if(this.scroll > 50){
  			$('.list-nav').css({
  				"position":"fixed",
  				"top":"0px",
  				"background":"#fff",
  				"width":"100%"
  			})
  		}else{
  			$('.list-nav').css({
  				"position":"static"
  			})
  		}
  		
  	},
  	loadMore(){
  		var that = this
	  	$.ajax({
					url:'https://shop.juanpi.com/gsort?key=%7B%22cdt%22%3A%7B%22stock%22%3A%222%22%2C%22is_show_presale%22%3A%220%22%2C%22hot_type%22%3A%5B%221%22%2C%223%22%5D%2C%22source_type%22%3A%5B%221%22%5D%2C%22fcate%22%3A%22490%22%2C%22sale_type%22%3A2%7D%2C%22order%22%3A%7B%22show_stime%22%3A%22desc%22%2C%22sales%22%3A%22desc%22%7D%7D&type=50&zhouyi_ids=p8_c3_l1_18_51_5&machining=danpin&page='+ this.num++ +'&rows=10',
					dataType:'jsonp',
					success:function(result){
						console.log(result)
						result.list.forEach(function(item,i){
							that.goods.push(item);
						})
					}
				})
	  },
	  go(){
  		this.$router.push("/fenlei")
  	}
  },
  components:{
  	NavTab,
  	ToTop
  },
  mounted(){
		window.addEventListener('scroll',this.mouseScroll);
		var angel = new Vue()
  	var that = this
  	$.ajax({
				url:'https://shop.juanpi.com/gsort?key=%7B%22cdt%22%3A%7B%22stock%22%3A%222%22%2C%22is_show_presale%22%3A%220%22%2C%22hot_type%22%3A%5B%221%22%2C%223%22%5D%2C%22source_type%22%3A%5B%221%22%5D%2C%22fcate%22%3A%22490%22%2C%22sale_type%22%3A2%7D%2C%22order%22%3A%7B%22show_stime%22%3A%22desc%22%2C%22sales%22%3A%22desc%22%7D%7D&type=50&zhouyi_ids=p8_c3_l1_18_51_5&machining=danpin&page=1&rows=10',
				dataType:'jsonp',
				success:function(result){
					result.list.forEach(function(item,i){
						that.goods.push(item);
					})
				}
		})
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/**{
	margin:0;
	padding:0;
}*/
.nav-tab{
		position:fixed;
		bottom:0;
	}
	.zhifa{
		background:#fff;
	}
	h3{
		height:2.5rem;
		color:#333;
		line-height:2.5rem;
		text-align: center;
		font-size:.9rem;
		font-weight:100;
		position:relative;
		border-bottom:1px solid #f2f2f3;
		span{
			position:absolute;
			right:0.8rem;
			top:center;
			font-size:1rem;
		}
	}
	.list-nav{
		display: flex;
		justify-content:space-between;
		border-bottom: 1px solid #f2f2f3;
		padding:.1rem 0;
		a{
			width:33%;
			height:2.1rem;
			font-size:.8rem;
			line-height:2.3rem;
			text-align: center;
			border-right: 1px solid #f2f2f3;
			position:relative;
			img{
				width:.6rem;
				position:absolute;
				top:.68rem;
				right:1.3rem;
			}
		}
	}
	/*点击改变颜色*/
	.active{
		color:#ff464e;
	}
	.list-con{
		ul{
			display: flex;
			flex-wrap: wrap;
			padding-bottom:2.45rem;
			li{
				font-size:.7rem;
				width:49%;
				img{
					width:100%;
				}
				p:nth-of-type(1){
					display: flex;
					margin:.4rem 0;
					span:nth-child(1){
						color:#ff464e;
						font-size:.8rem;
						margin-left:.2rem;
					}
					span:nth-child(2){
						margin:0 .2rem;
						display: block;
						width:.8rem;
						height:.8rem;
						background:#ff464e;
						line-height:.8rem;
						text-align: center;
						color:#fff;
						font-size:.6rem;
					}
					s{
						color:#bbb;
						font-size:.5rem;
					}
				}
				p:nth-of-type(2){
					display:flex;
					margin-bottom:.8rem;
					span:nth-child(1){
						margin:0 .3rem;
						color:#ff464e;
						display: block;
						width:1.4rem;
						height:.7rem;
						border:1px solid #ff464e;
						font-size:.2rem;
						line-height:.7rem;
						text-align: center;
					}
					span:nth-child(2){
						font-size:.65rem;
						color:#333;
					}
				}
			}
			li:nth-of-type(n){
				margin-right:0.1rem;
			}
		}
		
	}
</style>
