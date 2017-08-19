<template>
	<div class="global root-box">
		<h3>全球购<span class="iconfont icon-liebiao1" @click="gofenlei"></span></h3>
		<ul class="global-list">
			<li><img :src="list[0]? list[0].data[0].child[0].pic : '' "/></li>
			<li><img :src="list[0]? list[0].data[0].child[1].pic : '' "/></li>
			<li><img :src="list[1]? list[1].data[0].child[0].pic : '' "/></li>
			<li><img :src="list[1]? list[1].data[0].child[1].pic : '' "/></li>
		</ul>
		<div class="goods-box" v-infinite-scroll="loadMore"
	  infinite-scroll-disabled="loading"
	  infinite-scroll-distance="10">
			<div class="goods" v-for="good in goods" >
				<div class="big-pic">
					<img :src="good.shop_cover?good.shop_cover:'https://goods4.juancdn.com/bao/170525/6/e/592697a8a43d1f12c07e4751_750x350.jpg?imageMogr2/quality/88!/format/jpg'"/>
					<div>{{good.coupon.rules[0].aeBankInfo}}</div>
				</div>
			
				<div class="swiper-container">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide" v-for="small in good.shop_goods">
			            	<img :src="small.pic_url"/>
			            	<p>
			            		<span>￥{{small.cprice}}</span>
			            		<s>￥{{small.oprice}}</s>
			            	</p>
			            	<p>{{small.title}}</p>
			            </div>
			            <div class="swiper-slide lookAll">
			            	<img src="https://jp.juancdn.com/jpwebapp_v1/images_v1/icon/this_global_more.png?20160825"/>
			            </div>
			        </div>
	    		</div>
			</div>
		</div>
		<nav-tab></nav-tab>
		<to-top></to-top>
	</div>
</template>

<script>
	import NavTab from './NavTab'
	import ToTop from './ToTop'
	import {InfiniteScroll} from 'mint-ui'
	
	export default {
		name:'global',
		swiper:null,
		data(){
			return {
				num:2,
				list:[],
				goods:[]
			}
		},
		methods:{
			loadMore(){
		  		var that = this
			  	$.ajax({
					url:'https://shop.juanpi.com/gsort?key=310&type=6&zhouyi_ids=p8_c3_l1_18_51_5&machining=showshopgoods&page=' + this.num++ +'&rows=10',
					dataType:'jsonp',
					success:function(result){
//								console.log(result)
						result.list.forEach(function(item,i){
							that.goods.push(item);
						})
						console.log(that.goods)
					}
				})
			 },
			 gofenlei(){
		  		this.$router.push("/fenlei")
		  	},
		},
		components:{
			NavTab,
			ToTop
		},
		mounted(){
			var that = this;
			$.ajax({
				url:'https://jas.juanpi.com/pagetag/page?unique=module_ads%2Cbanner_ads&cid=310&zy_id=c3_l1_18_51_5&platform=m&_=1501551236443',
				dataType:'jsonp',
				success:function(result){
					that.list = result.module_ads.multi_block
				}
			})
			$.ajax({
				url:'https://shop.juanpi.com/gsort?key=310&type=6&zhouyi_ids=p8_c3_l1_18_51_5&machining=showshopgoods&page=1&rows=10',
				dataType:'jsonp',
				success:function(result){
					result.list.forEach(function(item,i){
						that.goods.push(item);
					})
					console.log(that.goods)
				}
			})
			
			
		},
		updated(){
			//实例化轮播图
			this.$options.swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        slidesPerView: 'auto',
		        paginationClickable: true,
		        spaceBetween: 10
		   	})
		}
	}
</script>

<style lang="scss" scoped>
	.nav-tab{
		z-index:1000;
		position:fixed;
		bottom:0;
	}
	.to-top{
		z-index:1000;
	}
	.global{
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
	.global-list{
		display: flex;
		flex-wrap: wrap;
		li{
			width:50%;
			img{
				width:100%;
			}
		}
		li:nth-child(n){
			border-right:1px solid #f2f2f3
		}
	}
	.goods-box{
		padding-bottom: 2.45rem;
	}
	.goods{
		.big-pic{
			position:relative;
			img{
				width:100%;
			}
			div{
				width:2.25rem;
				height:1.6rem;
				font-size:9px;
				color:#fff;
				
				background:url(https://jp.juancdn.com/jpwebapp_v1/images_v1/icon/top-jiaobiao.png) no-repeat;
				background-size:100% 100%;
				position:absolute;
				z-index: 2;
			    top: 0;
			    left: .42667rem;
			    line-height: .6rem;
			    padding: 1.2% 0 0 0;
			    background-size: contain;
			    text-align: center;
			    box-sizing: border-box;
			}
		}
		.swiper-container{
			margin-top:.5rem;
			.swiper-wrapper{
				
			}
			.swiper-slide{
				width:4.5rem;
				img{
					width:4.5rem;
				}
				p:nth-of-type(1){
					span{
						font-size:.6rem;
						color:#60e;
					}
					s{
						font-size:.5rem;
						color:#bbb;
					}
				}
				p:last-of-type{
					font-size:.6rem;
					color:#666;
					text-align: center;
					margin:.3rem 0 .8rem 0;
					line-height:.7rem;
				}
			}
			.lookAll{
				img{
					padding-right:.5rem;
				}
				
			}
			.swiper-slide:first-of-type{
			}
		}
	}
</style>