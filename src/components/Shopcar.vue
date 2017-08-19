<template>
  <div class="shopcar root-box">
		<div class="header">
			<h2>购物车</h2>
			<span>编辑</span>
		</div>
		<div class="goods">
			<div class="good" v-for="(item,index) in goods" >
				<img :src="item.imgurl" @click="toDetail(item.id,item.title,item.join)"/>
				<div class="message">
					<p v-text="item.title"></p>
					<p v-text="item.kind"></p>
					<p><span v-text="'￥'+item.price"></span><span v-text="'￥'+item.oprice"></span></p>
					<div class="num">
						<button @click="changeNum(2,index)">-</button>
						<span v-text="item.num"></span>
						<button @click="changeNum(1,index)">+</button>
					</div>
				</div>
			</div>
		</div>
		<div class="jiesuan">
			<div class="xuan"></div>
			<div class="heji">
				<p><span>合计</span><span v-text="'￥'+allprice"></span></p>
			</div>
			<button v-text="'去结算('+carnum+')'"></button>
		</div>
    <nav-tab></nav-tab>
  </div>
</template>

<script>
import NavTab from './NavTab'
import {mapState} from 'vuex'
export default {
  name: 'shopcar',
  data () {
    return {
      msg: 'shopcar'
    }
  },
  computed:{
  	goods:function(){
  		return this.$store.state.goods
  	},
  	carnum:function(){
			var nu = 0
			this.$store.state.goods.forEach(function(item,i){
				nu += item.num
			})
			return nu
		},
		allprice:function(){
			var n = 0
			this.$store.state.goods.forEach(function(item,i){
				n += item.num*item.price
			})
			return n.toFixed(2)
		},
  	...mapState(['goods'])
  },
  methods:{
  	changeNum(type,index){
  		this.$store.commit("changegoodnum",{'type':type,'index':index})
  	},
  	toDetail(id,title,join){
  		this.$router.push("/detail/"+id+"/"+title+"/"+join)
  	}
  },
  components:{
  	NavTab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav-tab{
	position:fixed;
	bottom:0;
}
button{
	outline:none;
}
.shopcar{
	.header{
		border-bottom: 1px solid #ebebeb;
		background:#fff;
		h2{
			font-weight:100;
			font-size:0.9rem;
			line-height:2.2rem;
			text-align:center;
			color:#333;
		}
		span{
			position:absolute;
			right:0.7rem;
			top:0.65rem;
			font-size:0.75rem;
			color:#333;
		}
	}
	.goods{
		padding-left:0.7rem;
		background:#fff;
		margin-bottom:4.875rem;
		.good{
			height:6.125rem;
			padding:0.8rem 0.7rem 0.8rem 0;
			img{
				margin-right:0.6rem;
				float:left;
				width:4.5rem;
				height:4.5rem;
			}
			.message{
				float:left;
				height:4.5rem;
				width:10.7rem;
				position:relative;
				p:nth-of-type(1){
					font-size:0.7rem;
					color:#333;
					line-height:1;
				}
				p:nth-of-type(2){
					font-size:0.7rem;
					color:#bbb;
					line-height:1.4;
					margin-top:0.15rem;
				}
				p:nth-of-type(3){
					position:absolute;
					left:0;
					bottom:0;
					span:nth-of-type(1){
						font-size:0.7rem;
						color:#ff464e;
						margin-right:0.3rem;
					}
					span:nth-of-type(2){
						font-size:0.55rem;
						color:#bbb;
					}
				}
				.num{
					position:absolute;
					right:0;
					bottom:0;
					button{
						width:1.15rem;
						height:1.15rem;
						border:none;
						background:#f4f4f8;
					}
					span{
						font-size:0.7rem;
						color:#333;
						margin:0.2rem;
						line-height:1.15rem;
					}
				}
			}
		}
	}
	.jiesuan{
		height:2.425rem;
		width:100%;
		background:#fff;
		position:fixed;
		bottom:2.45rem;
		button{
			float:right;
			width:5.625rem;
			height:2.45rem;
			border:none;
			padding:none;
			margin:none;
			color:#fff;
			font-size:0.9rem;
			line-height:2.45rem;
			background:#ff464e;
		}
		p{
			float:left;
			font-size:0.7rem;
			width:8.175rem;
			padding-top:0.2rem;
			text-align:right;
			span:nth-of-type(1){
				color:#333;
			}
			span:nth-of-type(2){
				color:#ff464e;
			}
		}
		.xuan{
			float:left;
			width:4.675rem;
			height:100%;
		}
	}
}
</style>
