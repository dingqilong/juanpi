<template>
	<div class="login">
		<div class="header">
			<a href="javascript:;" class="iconfont icon-arrow-left" @click="goBack"></a>
			<span>登录</span>
			<router-link to="/register" >注册</router-link>
		</div>
		<div class="login-nav">
			<a href="javascript:;">卷皮账号登录</a>
			<a href="javascript:;">手机快捷登录</a>
		</div>
		<div class="login-main">
			<input type="text" placeholder="手机号/邮箱/用户名"/>
			<input type="text" placeholder="密码" @input="yanzheng"/>
			<a href="javascript:;" :class="isOk?'active':''" @click="goMy">登录</a>
		</div>
		<div class="no-login">
			<input type="checkbox" id="aaa"/>
			<label for="aaa">两周内免登录</label>
			<a href="">忘记密码?</a>
		</div>
		<div class="third-party">
			<h4>第三方账号快捷登录</h4>
			<h5>
				<img src="../../static/images/qq.png" alt="" />
				<img src="../../static/images/taobao.png" alt="" />
				<img src="../../static/images/sina.png" alt="" />
			</h5>
			<h6>
				<span>全场包邮</span>
				<span>100%人工质检</span>
				<span>7天放心退</span>
			</h6>
		</div>
	</div>
</template>

<script>
	export default {
		name:'login',
		data(){
			return {
				msg:[],
				isOk:false
			}
		},
		methods:{
			goBack(){
				window.history.back()
			},
			yanzheng(){
//				console.log(this.msg)
				var username = $(".login-main input:eq(0)").val();
				var password = $(".login-main input:eq(1)").val();
				for(var i = 0; i < this.msg.length; i ++){
					if(this.msg[i].username == username && this.msg[i].password == password){
						this.isOk = true;
						break;
					}else{
						this.isOk = false;
					}
				}
				
			},
			goMy(){
				var username = $(".login-main input:eq(0)").val();
				var password = $(".login-main input:eq(1)").val();
				for(var i = 0; i < this.msg.length; i ++){
					if(this.msg[i].username == username && this.msg[i].password == password){
						$(".login-main a").attr("href","#/mine")
						this.$store.commit("changeIarr",i)
						this.$store.commit("isLogin",true)
						break;
					}
				}
				
				
			}
		},
		mounted(){
			this.msg = this.$store.state.userInfo;
		}
	}
</script>

<style scoped lang="scss">
	i{
		font-style:normal;
	}
	.login{
		background:#fff;
		height:100%;
	}
	.header{
		width:100%;
		height:2.2rem;
		display:flex;
		align-items: center;
		border-bottom: 1px solid #dedede;
		
		background: #ff5a61;
	    background: -webkit-gradient(linear,left top,right 		bottom,color-stop(0,#ff5a61),color-stop(1,#fd631c));
	    background: -webkit-linear-gradient(-30deg,#ff5a61 50%,#fd631c);
	    background: -webkit-linear-gradient(300deg,#ff5a61 50%,#fd631c);
	    background: linear-gradient(150deg,#ff5a61 50%,#fd631c);
		a{
			width:2.2rem;
			text-align: center;
			font-size:1.2rem;
			color:#fff;
		}
		
		span{
			width:14.5rem;
			height:2.2rem;
			text-align: center;
			line-height: 2.2rem;
			color:#fff;
		}
		a{
			color:#fff;
			font-size:.7rem;
		}
	}
	.login-nav{
		width:100%;
		display: flex;
		margin-bottom:.4rem;
		a{
			display: flex;
			justify-content: center;
			width:50%;
			height:2.2rem;
			line-height:2.2rem;
			font-size:.7rem;
			color:#999;
		}
	}
	.login-main{
		padding:0 .6rem ;
		input{
			width:100%;
			height:2.4rem;
			border:none;
			color:#333;
			font-size:.7rem;
			border-bottom: 1px solid #dedede;
			outline: none;
		}
		a{
			width:100%;
			height:2.4rem;
			line-height:2.4rem;
			display: block;
			text-align: center;
			margin-top:1.25rem;
			font-size:.9rem;
			color:#fff;
			background: #dbdbdb;
		}
		.active{
			background:#ff464e;
		}
	}
	.no-login{
		margin-top:.6rem;
		font-size:.7rem;
		padding:0 .6rem ;
		color:#999;
		position:relative;
		input{
			margin:0;
			position:absolute;
			top:center;
		}
		label{
			padding-left:1rem;
		}
		a{
			font-size:.7rem;
			color:#999;
			float:right;
		}
	}
	.third-party{
		padding:0 .6rem ;
		h4{
			font-size:.6rem;
			color:#999;
			text-align: center;
			margin:4rem 0 2rem 0;
		}
		h5{
			padding-bottom:1.1rem;
			border-bottom: 1px solid #ebebeb;
			img{
				width:2.4rem;
				margin-left:2.5rem;
			}
		}
		h6{
			display: flex;
			justify-content: space-between;
			font-size:.6rem;
			color:#999;
			font-weight:100;
			margin-top:1rem;
		}
	}
</style>