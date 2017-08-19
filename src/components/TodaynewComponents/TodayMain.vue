<template>
    <div id="content" class="main" onresize="alert('You have changed the size of the window')">
			<div id="scroller">
				<div class="swiper-containern newbanner">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="(item,index) in msg?msg.banner_ads:null">
			        	<img :src="item.pic"/>
			        </div>
			    </div>
			    <div class="swiper-pagination"></div>
				</div>
				<div class="huodong">
					<a href="" v-for="(item,index) in msg?msg.module_ads.multi_block[0].data[0].child:null">
						<img :src="item.pic"/>
						<span v-text="item.words"></span>
					</a>
				</div>
				<div class="zhifacang">
					<img :src="item.pic" v-for="(item,index) in msg?msg.module_ads.multi_block[1].data[0].child:null"/>
				</div>
				<div class="single-img">
					<img :src="item.pic" v-for="(item,index) in msg?msg.module_ads.multi_block[2].data[0].child:null"/>
				</div>
				<div class="new-goods" v-for="good in goods?goods:null">
					<a href="">
						<div class="new-goods-header">
							<div class="new-goods-header-img">
								<img :src="good.logo_url"/>
							</div>
							<div class="new-goods-header-center">
								<p v-text="good.title"></p>
								<p v-text="good.coupon_tips"></p>
							</div>
							<div class="new-goods-header-right">
								<span v-text="good.mkt_info"></span>
								<i class="iconfont icon-icon"></i>
							</div>
						</div>
						<div class="new-goods-item" v-for="item in good?good.sub_data:null">
							<img :src="item.pic"/>
							<p><span v-text="item.cp"></span><span v-text="item.op"></span></p>
							<p v-text="item.title"></p>
						</div>
					</a>
				</div>
			</div>
		</div>
    
</template>

<script>
import ToTop from '../ToTop'
import axios from 'axios'
export default {
  name: 'main',
  data () {
    return {
      msg:null,
      goods:null,
      mySwiper:null,
      myScroll:null,
      btn:true,
      num:1
    }
  },
 
  components:{
  	ToTop,
  },
  methods:{
  	getMsg(){
  		let that = this
		$.ajax({
			url:'http://getdouban.duapp.com/getJson.php',
			data:{
				src:'https://jas.juanpi.com/pagetag/page?unique=module_ads%2Cbanner_ads%2Ctopbanner%2Cpopup_ads&cat_name=newest_zhe&zy_id=c3_l1_18_51_5&platform=m&_=1501487236708'
			},
			jsonp:"callback",
			dataType:'jsonp',
			success:function(data){
				that.msg = data.data;
			}
		})
		$.ajax({
			url:'https://shop.juanpi.com/zxg?key=zuixinzhekou&type=1&zhouyi_ids=p8_c3_l1_18_51_5&machining=gsortzxg&page=1&rows=10&dtype=JSONP&cm=1&cm_channel=1&callback=gsort_callback',
			dataType:'jsonp',
			success:function(data){
				that.goods = data.list;
			}
		})		
	},
  	loadMore() {
  		
  		let that = this	  
  		if(this.btn){
  			this.btn = false;
  			setTimeout(() => {
			    $.ajax({
					url:'https://shop.juanpi.com/zxg?key=zuixinzhekou&type=1&zhouyi_ids=p8_c3_l1_18_51_5&machining=gsortzxg&page='+(++that.num)+'&rows=10&dtype=JSONP&cm=1&cm_channel=1&callback=gsort_callback',
					dataType:'jsonp',
					success:function(data){
						data.list.forEach(function(item,i){
							that.goods.push(item)
						})
					}
				})
			    that.btn = true
			  }, 1500);
  		}
		
	}
  },
  mounted:function(){
  	let that = this
  	this.getMsg()
  	this.myScroll = new iScroll("content",{
		snapThreshold:15,
		onScrollEnd:function(){
			if(-(this.y)>($("#scroller").height()-$("#content").height()-10)){
				that.loadMore()
			}
		}
	});
		
	$(".newbanner").delegate(".swiper-pagination","click",function(){
		$(".swiper-pagination-bullet").css({
    		width:"0.3rem",
			height:"0.3rem",
			background:"white"
    	})
	})
	/*setInterval(function(){
		if($(".swiper-pagination-bullet")){
			$(".swiper-pagination-bullet").css({
	    		width:"0.3rem",
				height:"0.3rem",
				background:"white"
	    	}).parent().css({
	    		display:"block"
	    	})
		}
	},100)*/
	
  },
  updated:function(){
  	if(this.msg&&!this.mySwiper){		
		this.mySwiper = new Swiper('.newbanner', {
	        pagination: '.swiper-pagination',
	        slidesPerView: 1,
	        slidesPerColumn: 1,
	        //paginationClickable: true,
	        loop:true,
	        autoplay : 3000,
			speed:1000
    	});
    	$(".swiper-pagination-bullet").css({
    		width:"0.3rem",
			height:"0.3rem",
			background:"white"
    	})
    	
    }
  	this.myScroll.refresh()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{
	flex:1;
	overflow: hidden;
	position:relative;
	background:#f4f4f8;
	#scroller{
		.newbanner{
			position:relative;
			.swiper-pagination{
				bottom:0.2rem;
				span{
					display:block;
					width:0.3rem;
					height:0.3rem;
					background:#fff;
				}
			}
			.swiper-slide{
				height:7.125rem;
				img{
					width:100%;
					height:100%
				}
			}
			.swiper-pagination{
				
			}
		}
		.huodong{
			height:4.475rem;
			background:white;
			display:flex;
			a{
				display:flex;
				flex-direction:column;
				align-items:center;
				width:25%;
				
				img{
					display:block;
					width:100%;
					height:100%;
					
				}
				span{
					font-size:0.6rem;
				}
			}
		}
		.zhifacang{
			height:11.625rem;
			margin-top:0.54rem;
			background:white;
			overflow:hidden;
			img{
				float:left;
			}
			img:nth-of-type(1){
				width:50%;
				height:11.4rem;
			}
			img:nth-of-type(2){
				width:50%;
				height:5.8125rem;
				border-left: 1px solid #ebebeb;
				border-bottom: 1px solid #ebebeb;
			}
			img:nth-of-type(3){
				width:50%;
				height:5.8125rem;
				border-left: 1px solid #ebebeb;
			}
		}
		.single-img{
			height:2.4rem;
			margin-top:0.5rem;
			img{
				width:100%;
				height:100%;
			}
		}
		.new-goods{
			height:13.85rem;
			margin-bottom:0.5rem;
			background:white;
			a{
				display:block;
				height:100%;
				.new-goods-header{					
					height:2.8rem;
					padding:0.5rem 0.6rem;
					.new-goods-header-img{
						margin-right:0.4rem;
						float:left;
						width:1.8rem;
						height:1.8rem;
						border: 1px solid #ebebeb;
						padding-top:0.475rem;
						img{
							width:100%;
							height:0.85rem;
						}
					}
					.new-goods-header-center{
						float:left;
						width:11.25rem;
						height:1.8rem;
						p{
							overflow: hidden;
				    	text-overflow: ellipsis;
				    	white-space: nowrap;
				    	line-height:1.4;
						}
						p:nth-of-type(1){
							font-size:0.7rem;
							color:#666;
						}
						p:nth-of-type(2){
							font-size:0.59rem;
							color:#999;
						}
						
					}
					.new-goods-header-right{
						float:left;
						width:3.95rem;
						height:1.8rem;
						font-size:0.59rem;
						position:relative;
						color:#999;
						span{
							line-height:1.8rem;
						}
						i{
							position:absolute;
							top:0.6rem;
							right:-0.3rem;
						}
					}
				}
				.new-goods-item{
					float:left;
					width:9.375rem;
					height:11.05rem;
					line-height:1.4;
					padding:0 0.6rem 0.6rem 0.6rem;
					img{
						display:block;
						width:8.175rem;
						height:8.175rem;
					}
					p:nth-of-type(1){
						span:nth-of-type(1){
							font-size:0.75rem;
							color:red;
						}
						span:nth-of-type(2){
							font-size:0.35rem;
							color:#999;
							padding-left:0.3rem;
						}
					}
					p:nth-of-type(2){
						font-size:0.59rem;
						color:#666;
					}
				}
				.new-goods-item:nth-of-type(n){
					border-right: 2px solid #ebebeb;
				}
			}
		}
	}
}
</style>
