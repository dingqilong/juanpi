<template>
    <div id="content" class="main" onresize="alert('You have changed the size of the window')" >
		<div id="scroller">
			<div class="ad">
				<div class="ad-top">
					<a href="" v-for="(item,index) in msg?msg[0].data[0].child:null"><img :src="item.pic"/></a>
				</div>
				<div class="ad-center">
					<a href="" v-for="(item,index) in msg?msg[1].data[0].child:null"><img :src="item.pic"></a>
				</div>
				<div class="ad-bottom">
					<img :src="msg?msg[2].data[0].child[0].pic:null"/>
				</div>
			</div>
			<div  class="new-goods" v-for="good in goods?goods:null">
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
			<!--<div class="gengxin">{{kind}}</div>-->
		</div>
	</div>
    
</template>

<script>

import {mapState} from 'vuex'



export default {
  name: 'main',
  data () {
    return {
      msg:null,
      goods:[],
      myScroll:null, 
      btn:true,
      num:1
    }
  },
  components:{
  	
  },
  
  watch:{
  	kind:function(){
  		this.getMsg(String(this.kind))
  	}
  },
  
  computed:{
  	kind:function(){
  		return /^\d{4}$/.test(this.$store.state.name)?this.$store.state.name:this.$store.state.name.slice(0,3)
  	},

  	...mapState(['name'])
  },
  
  methods:{
  	getMsg(key){
  		let that = this
		$.ajax({
			url:'https://jas.juanpi.com/pagetag/page?unique=module_ads%2Cbanner_ads&cid='+key+'&zy_id=c3_l1_18_51_5&platform=m&_=1501569137764&callback=jsonp1',
			
			jsonp:"callback",
			dataType:'jsonp',
			success:function(data){
				that.msg = data.module_ads.multi_block
			}
		})
		$.ajax({
			url:'https://shop.juanpi.com/zxg?key='+key+'&type=6&zhouyi_ids=p8_c3_l1_18_51_5&machining=gsortzxg&page=1&rows=10&dtype=JSONP&cm=1&cm_cate=312&callback=gsort_callback',
			dataType:'jsonp',
			success:function(data){
				that.goods = data.list
			}
		})
	},
  	loadMore(key) {
  		
  		let that = this	  
  		if(this.btn){
  			this.btn = false;
  			setTimeout(() => {
			    $.ajax({
					url:'https://shop.juanpi.com/zxg?key='+key+'&type=6&zhouyi_ids=p8_c3_l1_18_51_5&machining=gsortzxg&page='+(++that.num)+'&rows=10&dtype=JSONP&cm=1&cm_cate=312&callback=gsort_callback',
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
  mounted(){
  	this.getMsg(String(this.kind))
  	var that = this
  	this.myScroll = new iScroll("content",{
			snapThreshold:15,
			
			//开始滚动，打开计时器，计算已滚动的值，当超过200时，
			onScrollStart:function(){					
				
			},
			onScrollMove:function(){
				
			},
			onScrollEnd:function(){
				if(-(this.y)>($("#scroller").height()-$("#content").height()-10)){
					that.loadMore(String(that.kind))
				}
			}
	});
  },
  updated(){
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
		.ad{
			.ad-top{
				height:4.975rem;
				img{
					width:25%;
					height:100%;
				}
			}
			.ad-center{
				height:4.975rem;
				margin-bottom:0.5rem;
				a{
					display:inline-block;
					width:25%;
					height:100%;
				}
				img{
					width:100%;
					height:100%;
				}
			}
			.ad-bottom{
				height:2.4rem;
				img{
					width:100%;
					height:100%;
				}
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
						padding-top:0.4rem;
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
				.new-goods-item:nth-of-type(n){
					border-right: 2px solid #ebebeb;
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
			}
		}
	}
}
</style>
