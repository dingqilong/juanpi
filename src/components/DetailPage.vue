<template>
	<div class="detail-page">
		<div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide" v-for="value in dataSku">
	            	<img :src="value.ss_av_zpic"/>
	            </div>
	        </div>
	        <!-- Add Pagination -->
	        <div class="swiper-pagination"></div>
	   	</div>
	   	<div class="price-box">
	   		<div class="price">
	   			<span>￥{{this.dataInfo?this.dataInfo.si_reprice:''}}</span>
	   			<s>￥{{this.dataInfo?this.dataInfo.si_price:''}}</s>
	   			<p>拼团价</p>
	   			<p>2人团</p>
	   			<span class="iconfont icon-shoucang"></span>
	   		</div>
	   		<div class="title">{{this.$route.params.title}}</div>
	   		<div class="manyou">
	   			<span class="iconfont icon-manbaibaoyou">  满29元包邮</span>
	   			<span class="iconfont icon-wo">  {{this.$route.params.join}}人已成团</span>
	   		</div>
	   		
	   	</div>
	   	<div class="toZhifa">
   			<img src="//tuan.juancdn.com/build/img/entrance.png" alt="" />
   		</div>
   		<div class="promise-box">
   			<span>24小时发货</span>
   			<span>7天包退</span>
   			<span>售后补贴</span>
   			<span>卷皮直发</span>
   			<i class="iconfont icon-sangedian"></i>
   		</div>
   		<div class="join-team">
   			<h3>
   				<span>可直接参TA们的团</span>
   				<span>拼团流程</span>
   				<span class="iconfont icon-icon"></span>
   			</h3>
   			<h4>
   				<img :src="person?person.avatar:''"/>
   				<div>
   					<p>
   						<span v-text="person?person.city:''"></span>
   						·
   						<span v-text="person?person.nickname:''"></span>
   					</p>
   					<p class="time">仅差1人成团    剩余<span></span>:<span></span>:<span></span></p>
   				</div>
   				<div>
   					去参团
   				</div>
   			</h4>
   		</div>
   		<div class="choose-box" @click="showBuy">
   			<span>请选择：颜色、尺码</span>
   			<i class="iconfont icon-icon"></i>
   		</div>
   		<div class="shop-box">
   			<img src="../../static/images/shop.png"/>
   			<div>
   				<p>今福缘食品小店</p>
   				<p>2378人以团</p>
   			</div>
   			<div>
   				<a href="javascript:;">
   					<span>进入店铺</span>
   					<i class="iconfont icon-icon"></i>
   				</a>
   			</div>
   		</div>
   		<div class="good-detail">
   			<a href="javascript:;">图文详情</a>
   			<a href="javascript:;">商品参数</a>
   			<a href="javascript:;">咨询与售后</a>
   		</div>
   		<div class="img-box">
   			<!--<img  v-for="x in 11"  :key="x" :src="getSrc"/>-->
   			<img v-for="n in [1,2,3,4,5,6,7,8,9,10,11]" :src="'../../static/images/' + n + '.jpg'"/>
   		</div>
   		<div class="bottom">
   			<img src="../../static/images/logo.png"/>
   		</div>
   		
   		<div class="footer-box">
   			<a href="#/todaynew">
   				<i class="iconfont icon-home"></i>
   				<span>首页</span>
   			</a>
   			<a href="#shopcar">
   				<i class="iconfont icon-cart"></i>
   				<span>购物车</span>
   				<span v-text="carnum"></span>
   			</a>
   			<a href="javascript:;" @click="showBuy">
   				<span>  ￥14.9</span>
   				<span>单独购买    </span>
   			</a>
   			<a href="javascript:;" @click="pushcar()">
   				<span>￥13.9</span>
   				<span>加入购物车</span>
   			</a>
   		</div>
   		
   		<div class="shelter" v-show="isShow"></div>
   		<transition name="gobuy">
   			<div class="buy-box" v-show="isShow">
   				<div class="buy-box-choosed">已选择
   					<p></p>
   					<span @click="closeBuy">X</span>
   				</div>
   				<div class="buy-box-info">
   				<div class="buy-box-type">
   					<h3>颜色</h3>
   					<div>
   						<a href="javascript:;" v-for="value in dataSku" @click="changeType">{{value.ss_av_zvalue}}</a>
   					</div>
   				</div>
   				<div class="buy-box-size">
   					<h3>尺码</h3>
   					<div>
   						<a href="javascript:;" @click="changeSize">{{dataSku?dataSku['1_101']?dataSku['1_101'].ss_av_fvalue:dataSku['1_0'].ss_av_fvalue:''}}</a>
   					</div>
   				</div>
   				<div class="buy-box-num">
   					<p>购买数量</p>
   					<div>
   						<a @click="changeNum('r')" class="reduceNum">-</a>
   						<span>1</span>
   						<a @click="changeNum('a')" class="addNum">+</a>
   					</div>
   					
   				</div>
   				</div>
   				<div class="buy-now">单独购买</div>
   				<img src=""/>
   			</div>
   		</transition>
   		
   		<to-top></to-top>
	</div>
</template>

<script>
	import axios from  'axios'
	import ToTop from './ToTop'
	import Vue from 'vue'
	import {mapState} from 'vuex'
	export default{
		name:'detail',
		data(){
			return{
				dataInfo:null,
				dataSku:null,
				person:null,
				time:null,
				num:1,
				goodNum:1,
				isShow:false,
				arr:null,
				getdata:[],
			}
		},
		methods:{
			showBuy:function(){
				this.isShow = !this.isShow;
				console.log(this.dataSku)
			},
			closeBuy:function(){
				this.isShow = !this.isShow;
			},
			changeType:function(e){
				$(".buy-box-type a").css({
					"border": "#4a4a4a solid 1px",
					"color": "#4a4a4a",
					"background":"#fff"
				})	
				$(e.target).css({
					"background":'#ff464e',
					"color":"#fff",
					"border":"none"
				})
			},
			changeSize:function(e){
				$(".buy-box-size a").css({
					"border": "#4a4a4a solid 1px",
					"color": "#4a4a4a",
					"background":"#fff"
				})	
				$(e.target).css({
					"background":'#ff464e',
					"color":"#fff",
					"border":"none"
				})
			},
			changeNum:function(type){
				if(type == 'r'){
					if(this.goodNum == 1){
						return
					}else{
						$(".buy-box-num span").html(--this.goodNum)
					}
					
				}
				if(type == 'a'){
					$(".buy-box-num span").html(++this.goodNum)
				}
			},
			getTime:function(){
				var that = this;
				setInterval(function(){
					var hour = parseInt(that.time/3600);
					var minute = parseInt(that.time % 3600 /60) 
					var second = that.time % 3600 % 60 
					$('.time>span:eq(0)').html(hour>=10?hour:'0'+hour);
					$('.time>span:eq(1)').html(minute>=10?minute:'0'+minute);
					$('.time>span:eq(2)').html(second>=10?second:'0'+second);
					that.time--;
				},1000)
			},
			pushcar(){
				var data = {'title':this.$route.params.title,'price':this.dataInfo.si_reprice,'oprice':this.dataInfo.si_cprice,'num':1,'imgurl':this.dataSku['1_101'].ss_av_zpic,'kind':this.dataSku['1_101'].ss_av_zvalue+this.dataSku['1_101'].ss_av_fvalue,'id':this.$route.params.id,'join':this.$route.params.join}
				this.$store.commit("pushGood",data)
				console.log(this.$store.state.goods)
			}
		},
		components:{
			ToTop
		},
		computed:{
			carnum:function(){
				var nu = 0
				this.$store.state.goods.forEach(function(item,i){
					nu += item.num
				})
				return nu
			},
			...mapState(['goods'])
		},
		mounted(){
			var that = this
			angel.$on("toDetail",function(data){
				data.forEach(function(item,i){
					that.getdata.push(item)
				})
			})
			$.ajax({
				url:'http://getdouban.duapp.com/getJson.php',
				data:{
					src:'https://tuan.juanpi.com/pintuan/getSku?gid='+ this.$route.params.id +'&pid='+ this.$route.params.id+'&pt_type=2&is_vip=0'
				},
				jsonp:"callback",
				dataType:'jsonp',
				success:function(result){
					console.log(result)
					that.dataInfo = result.info
					that.dataSku = result.sku
					

				}
			})
			$.ajax({
				url:'http://getdouban.duapp.com/getJson.php',
				data:{
					src:'https://tuan.juanpi.com/pintuan/ajax_guess_like?pg_id='+ this.$route.params.id
				},
				dataType:'jsonp',
				success:function(result){
					console.log(result)
					that.person = result.data.near[0]
					that.time = result.data.near[0].remaining_time
				}
			})
			this.getTime()
		},
		updated(){
			$(".buy-box-choosed>p").html($(".buy-box-type>div>a:eq(0)").html())
			$(".buy-box img").attr('src',$(".swiper-wrapper .swiper-slide:eq(1) img").attr('src'))
			 var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        paginationType: 'fraction',
		        loop:true
		    });
//		    $(".swiper-pagination-fraction").css({
//				right:'.6rem'
//	    	})
	}

	}
</script>

<style lang="scss" scoped>
	i{
		font-style:normal;
	}
	.detail-page{
		background: #f5f5f5;
	}
    @mixin a(){
		font-size:.7rem;
		width:5rem;
		height:1.5rem;
		line-height:1.5rem;
		border: #4a4a4a solid 1px;
		border-radius: .1rem;
		color: #4a4a4a;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	.swiper-container{
		position:relative;
		img{
			width:100%;
		}
		.swiper-pagination-fraction{
			background:#6b6b6b;
			color:#fff;
			font-size:.5rem;
			width:1.8rem;
			height:1rem;
			line-height:1rem;
			text-align: center;
			position:absolute;
			bottom:.6rem;
			left:88%;
		}
	}
	.price-box{
		padding-left: .59733rem;
   		padding-right: .59733rem;
   		background:#fff;
		.price{
			display: flex;
			align-items: flex-end;
			padding-top: .512rem;
			span:first-of-type{
				color:#ff464e;
				font-size:1.024rem
			}
			s{
				color:#bbb;
				font-size:.6rem;
				margin:0 .42667rem;
			}
			p{
				background: #ff464e;
			    color: #fff;
			    font-size: 9px;
			    height:.7rem;
			    margin-right: .6rem;
			}
			span:nth-of-type(2){
				padding-left:5rem;
				font-size:1.2rem;
			}
		}
		.title{
			font-size:.85rem;
			color:#333;
			padding:.5rem 0 .4rem 0;
		}
		.manyou{
			padding-bottom:.5rem;
			span{
				font-size:9px;
				color:#999;
			}
			span:first-child{
				padding-right:5rem;
			}
		}
		
	}
	.toZhifa{
		img{
			width:100%;
		}
	}
	.promise-box{
		height: 2.048rem;
	    font-size: 12px;
	    color: #666;
	    padding-left: .59733rem;
	    padding-right: .59733rem;
	    background:#fff;
	    margin-top:.4rem;
	    margin-bottom:.4rem;
	    line-height:2.048rem;
	    span{ 
	    	position:relative;
	    	padding-left:.4rem;
	    	margin-left:.7rem;
	    }
	    span:first-child{
	    	margin-left:0;
	    }
	    span:before {
		    content: '';
		    position: absolute;
		    width: .17067rem;
		    height: .17067rem;
		    border-radius: 50%;
		    top: 50%;
		    transform: translateY(-50%);
		    left: 0;
		    background: #ff464e;
		    opacity: .5;
		}
		i{
			margin-left:2rem;
		}
	}
	.join-team{
		padding-left: .59733rem;
	    padding-right: .59733rem;
	    background:#fff;
	    
		h3{
			height:2rem;
			line-height:1.87733rem;
			font-weight:100;
			border-bottom: 1px solid #ebebeb;
			span:nth-child(1){
				font-size:.7rem;
				color:#333;
			}
			span:nth-child(2){
				font-size:.7rem;
				color:#999;
				margin-left:7.2rem;
			}
			span:nth-child(3){
				font-size:.7rem;
				font-weight:900;
				line-height:.7rem;
				color:#999;
			}
		}
		h4{
			font-weight:100;
			padding-top: .512rem;
    		padding-bottom: .512rem;
    		display: flex;
    		align-items: center;
    		img{
    			width: 1.70667rem;
    			height: 1.70667rem;
    			margin-right: .42667rem;
    		}
    		div:nth-of-type(1){
    			width:11.9rem;
    			font-size:.6rem;
    			color:#666;
    			span{
    				line-height:.85rem;
    			}
    		}
    		div:nth-of-type(2){
    			font-size:.7rem;
    			flex: 0 0 auto;
			    width: 2.90133rem;
			    height: 1.10933rem;
			    line-height:1.10933rem;
			    text-align: center;
			    color: #ff464e;
			    border: 1px solid #ff464e;
			    padding: 0;
			    border-radius: .08533rem;
    		}
		}
	}
	.choose-box{
		padding-left: .59733rem;
	    padding-right: .59733rem;
	    margin-bottom:.4rem;
	    margin-top:.4rem;
	    height:2.5rem;
	    line-height:2.5rem;
	    background:#fff;
		span{
			font-size:.75rem;
			color:#333;
		}
		i{
			margin-left:9.3rem;
			font-size:.7rem;
			font-weight:900;
			line-height:.7rem;
			color:#999;
		}
	}
	.shop-box{
		padding-left: .59733rem;
	    padding-right: .59733rem;
		background:#fff;
		display: flex;
		align-items: center;
		height:3.6rem;
	    margin-bottom:.4rem;
		img{
			width:2.2rem;
		}
		div:nth-of-type(1){
			padding-left:.5rem;
			p:nth-child(1){
				font-size:.7rem;
				color:#4a4a4a;
				line-height:1.2rem;
			}
			p:nth-child(2){
				font-size:.4rem;
				color:#666;
			}
		}
		div:nth-of-type(2){
			margin-left:5rem;
			a{
				border: 1px #4a4a4a solid;
				display: flex;
				justify-content: center;
				align-items: center;
				height:1.3rem;
				span{
					padding-left:.4rem;
					font-size:.5rem;
					color:#4a4a4a;
				}
				i{
					font-size:.5rem;
					font-weight:900;
					line-height:.6rem;
					padding-left:.2rem;
					padding-right:.2rem;
					
					color:#999;
				}
			}
		}
	}
	.good-detail{
		background:#fff;
		padding: .46933rem .42667rem;
		display: flex;
		a{
		   	font-size:.7rem;
		   	color:#666;
		    height: 1.5rem;
		    line-height: 1.5rem;
		    text-align: center;
		    border-top: 1px solid #666;
		    border-bottom: 1px solid #666;
		    border-left: 1px solid #666;
		    width:33.33%;
		}
		a:nth-child(1){
			border-radius:.2rem 0 0 .2rem ;
		}
		a:nth-child(3){
		    border-right: 1px solid #666;
			border-radius:0 .2rem .2rem 0;
		    
		}
	}
	.img-box{
		img{
			width:100%;
		}
	}
	.bottom{
		padding-top: .55467rem;
    	padding-bottom: .34133rem;
    	text-align: center;
    	padding-bottom:2.4rem;
		img{
			width:2rem;
		}
	}
	.footer-box{
		position:fixed;
		bottom:0;
		width:100%;
		background:#fff;
		display: flex;
		height:2.4rem;
		a{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height:2.4rem;
		}
		a:nth-child(1){
			color:#666;
			font-size:.5rem;
			width:2.5rem;
			i{
				font-size:1rem;
				font-weight: 900;
				margin-bottom:.2rem;
			}
			
		}
		a:nth-child(2){
			color:#666;
			font-size:.5rem;
			width:2.5rem;
			position:relative;
			span:nth-of-type(2){
				position:absolute;
				top:0;
				right:0.2rem;
				font-size:0.6rem;
				line-height:0.65rem;
				display:block;
				width:0.7rem;
				height:0.7rem;
				background:red;
				color:#fff;
				border-radius:0.35rem;
				text-align:center;
			}
			i{
				font-size:1rem;
				font-weight: 100;
				margin-bottom:.1rem;
			}
		}
		a:nth-child(3){
			color:#333;
			font-weight:900;
			width:5.2rem;
			font-size:.6rem;
			span{
				line-height:.8rem;
			}
		}
		a:nth-child(4){
			background-color: #ff464e;
			width:8.5rem;
			span{
				color:#fff;
				font-weight:900;
				font-size:.6rem;
				line-height:.8rem;
			}
		}
	}
	.shelter{
		position:fixed;
		z-index:1001;
		width:100%;
		height:100%;
		top:0;
		left:0;
		background:rgba(0,0,0,.8)
	}
	.buy-box{
		width:100%;
		height:19rem;
		background:#fff;
		position:fixed;
		z-index:1002;
		bottom:0;
		.buy-box-info{
			overflow: scroll;
			height:80%;
			padding-bottom:2.4rem;
		}
		.buy-box-choosed{
			color:#4a4a4a;
			font-size:.7rem;
			display:flex;
			height:2.5rem;
			line-height:2.5rem;
			padding-left:6.5rem;
			p{
				margin-left:.2rem;
				width:6rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			span{
				margin-left:3rem;
				font-size:1rem;
				color:#4a4a4a;
			}
		}
		.buy-box-type{
			padding-left:.8rem;
			padding-right:.8rem;
			margin-top:1.5rem;
			color:#4a4a4a;
			font-size:.75rem;
			h3{
				margin-bottom:.8rem;
				font-weight:100;
			}
			div{
				display:flex;
				flex-wrap: wrap;
				justify-content: space-between;
				a{
					@include a();
					margin-bottom:.3rem;	
				}
			}
			
		}
		
		.buy-box-size{
			padding-left:.8rem;
			padding-right:.8rem;
			margin-top:.5rem;
			color:#4a4a4a;
			font-size:.75rem;
			h3{
				font-weight:100;
			}
			div{
				margin-top:.5rem;
				a{
					display: block;
					@include a();
				}
			}
		}
		.buy-box-num{
			padding-left:.8rem;
			padding-right:.8rem;
			margin-top:1.5rem;
			color:#4a4a4a;
			font-size:.8rem;
			display: flex;
			div{
				padding-left:9rem;
				display: flex;
				a{
					display: block;
					width:1rem;
					height:1rem;
					line-height:1rem;
					text-align: center;
					color:#ff464e;
					background:#f7f7f7;
				}
				span{
					height:1rem;
					width:2rem;
					text-align: center;
					line-height:1rem;
					font-size:.6rem;
				}
			}
		}
		.buy-now{
			width:100%;
			height:2.4rem;
			background:#ff464e;
			font-size:1rem;
			color:#fff;
			line-height:2.4rem;
			text-align: center;
			position:absolute;
			bottom:0;
		}
		img{
			width:5rem;
			height:5rem;
			position:absolute;
			top:-2rem;
			left:.5rem;
		}
	}
	.gobuy-enter,.gobuy-leave-to{
		bottom: -19rem;
	}
	.gobuy-enter-active,.gobuy-leave-active{
		transition:  all .6s;
	}
</style>