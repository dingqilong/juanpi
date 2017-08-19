<template>
  <div class="mine root-box">
    <div class="header">
    	<div class="user-top">
    		<i class="iconfont icon-arrow-left" @click="goBack"></i>
    		<h2>个人中心<p v-if="isShow" @click="changeType">退出</p></h2>
    		
    	</div>
    	<div class="user-login">
    		<div class="user-loginIn" v-if="!isShow">
    			<router-link to="/register">注册</router-link>
	    		<i></i>
	    		<router-link to="/login">登录</router-link>
    		</div>
    		<div class="my-info" v-if="isShow">
    				<p>{{this.$store.state.userInfo[this.$store.state.iarr].username}}</p>
    				<p>我的资料、收货地址</p>
    				<span class="iconfont icon-icon"></span>
    		</div>
    	</div>
    </div>
    <div class="user-box">
    	<a href="" class="user-orderform">
    		<span>我的订单</span>
    		<span><span>全部订单</span><span class="iconfont icon-icon"></span></span>
    	</a>
    	<div class="user-item">
    		<a href=""><i class="iconfont icon-daifukuan"></i><p>待付款</p></a>
    		<a href=""><i class="iconfont icon-daichengtuan"></i><p>待成团</p></a>
    		<a href=""><i class="iconfont icon-daishouhuo1"></i><p>待收货</p></a>
    		<a href=""><i class="iconfont icon-tuikuan"></i><p>退款/售后</p></a>
    	</div>
    	<div class="interval"></div>
    	<div class="user-items">
    		<a href=""><span>我的收藏</span><span class="iconfont icon-icon"></span></a>
    		<a href=""><span>我的拼团</span><span class="iconfont icon-icon"></span></a>
    		<a href=""><span>VIP钻石卡</span><span class="iconfont icon-icon"></span></a>
    		<a href=""><span>优惠券</span><span class="iconfont icon-icon"></span></a>
    	</div>
    	<div class="interval"></div>
    	<div class="user-items">
    		<a href=""><span>客服中心</span><span class="iconfont icon-icon"></span></a>
    		<a href=""><span>关于卷皮</span><span class="iconfont icon-icon"></span></a>    			</div>
    		<div class="interval"></div>
    	<div id="foot">
		    <div class="foot-nav">
		        <a href="">返回首页</a>
		        <a href="">客户端</a>
		        <a href="">电脑版</a>
		    </div>
		    <div class="foot-copyright"></div>
		    <h4>copyright © 武汉奇米网络科技有限公司</h4>
				</div>
    </div>
    <nav-tab></nav-tab>
  </div>
</template>

<script>
import NavTab from './NavTab'
export default {
  name: 'mine',
  data () {
    return {
     	isShow:false
    }
  },
  methods:{
  	goBack(){
				window.history.back()
			},
  	changeType(){
  		this.isShow = !this.isShow;
  		this.$store.commit("isLogin",false)
  	}
  },
  components:{
  	NavTab
  },
  mounted(){
  	if(this.$store.state.type){
  		this.isShow = true;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-tab{
	position:fixed;
	bottom:0;
}
.mine{
	.header{
		background:#ff464e;
		.user-top{
			position:relative;
			height:2.2rem;						
			color:white;
			h2{
				font-size:0.9rem;
				text-align:center;
				font-weight:100;
				line-height:2.2rem;
				position:relative;
				p{
					position:absolute;
					right:.5rem;
					top:0rem;
					font-size:.75rem;
				}
				
			}
			i{
				font-size:1.2rem;
				position:absolute;
				z-index:2;
				top:0.55rem;
				left:0.7rem;
			}
		}
		.user-login{
			height:5rem;
			
			.user-loginIn{
				height:5rem;
			display:flex;
			justify-content:center;
			}
			.my-info{
				color:#fff;
				font-size:1rem;
				height:100%;
				position:relative;
				padding:1.5rem 0 0 1rem;
				p:nth-child(2){
					font-size:.7rem;
					margin-top:.5rem;
				}
				span{
					position: absolute;
					right:1rem;
					top:2.3rem;
				}
			}
			a{
				display:block;
				line-height:5rem;
				padding:0 2.4rem;
				color:white;
			}
			i{
				border-right:2px solid #fff;
				height:1rem;
				position:relative;
				top:2rem;
			}
		}
	}
	.user-box{
		background:white;
		.user-orderform{
			display:flex;
			justify-content:space-between;
			margin:0 0.7rem 0 0.9rem;
			border-bottom:1px solid #ebebeb;
			font-size:0.75rem;
			height:2.4rem;
			line-height:2.4rem;
			background:white;
			color:#333;
			span:nth-of-type(2){
				color:#999;
				font-size:0.7rem;
				span:nth-of-type(2){
					font-size:0.8rem;
					margin-left:0.2rem;
					font-weight:900;
				}
			}
		}
		.user-item{
			padding:0.75rem 0 0.6rem 0;
			height:3.95rem;
			a{
				display:block;
				width:25%;
				float:left;
				height:2.6rem;
				color:#666;
				text-align:center;
				i{
					font-size:1.4rem;
					
				}
				p{
					padding-top:0.3rem;
					font-size:0.6rem;
				}
			}
		}
		.user-items{
			a{
				display:flex;
				justify-content:space-between;
				margin:0 0.7rem 0 0.9rem;
				border-bottom:1px solid #ebebeb;
				font-size:0.75rem;
				height:2.4rem;
				line-height:2.4rem;
				background:white;
				color:#333;
				span:nth-of-type(2){
					color:#999;
					font-size:0.8rem;
					margin-left:0.2rem;
					font-weight:900;
				}
			}
			a:last-of-type{
				border:none;
			}
		}
		#foot{
			.foot-nav{
				font-size:0.6rem;
				display:flex;
				justify-content:space-around;
				padding:0.625rem 0;
				color:#666;
			}
			.foot-copyright{
				height:2rem;
				margin:0 0.9rem;
				border-bottom:1px solid #ebebeb;
			}
			h4{
				margin:0 3rem;
				font-size:0.6rem;
				color:#bbb;
				font-weight:100;
				text-align:center;
				position:relative;
				top:-0.3rem;
				background:white;
			}
		}
	}
	.interval{
		height:0.5rem;
		background:#f4f4f8;
	}
}
</style>
