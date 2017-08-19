<template>
	<div class="register">
		<div class="header">
			<a href="javascript:;" class="iconfont icon-arrow-left" @click="goBack"></a>
			<span>注册</span>
		</div>
		<div class="register-msg">
			请确保你的手机畅通，用于接收验证码短信
		</div>
		<div class="register-main">
			<input type="text" placeholder="请输入手机号" @input="checkUser"/>
			<input type="text" placeholder="请设置6~18位密码" @input="checkPassword"/>
			<input type="text" placeholder="请重新输入密码" @input="checkPassword2"/>
			<a href="javascript:;" :class="isOk?'active':''" @click="listInfo">注册</a>
		</div>
	</div>
</template>

<script>
	
	import { Toast } from 'mint-ui';
	export default {
		name:'register',
		data(){
			return {
				arr:[false,false,false],
				isOk:false,
				userInfo:null
			}
		},
		methods:{
			goBack(){
				window.history.back()
			},
			listInfo(){
				this.userInfo = {
					"username" : $(".register-main input:eq(0)").val(),
					"password" : $(".register-main input:eq(1)").val(),
				}
//				console.log(this.userInfo)
				this.$store.commit('getInfo',this.userInfo)
			},
			checkUser(){
				var value = $(".register-main input:eq(0)").val()
				var reg = /^0?(13|14|15|18)[0-9]{9}$/;
				if(!reg.test(value)){
//					Toast('请输入正确的手机号！')
					this.arr[0] = false;
					this.isOk = false;
				}else{
					this.arr[0] = true;
				}
			},
			checkPassword(){
				var value = $(".register-main input:eq(1)").val()
				var reg = /^[0-9a-zA-Z]{6,18}$/
				if(!reg.test(value)){
//					Toast({message:"请输入合法的密码！",duration: 1000})
					this.arr[1] = false;
					this.isOk = false;
				}else{
					if($(".register-main input:eq(1)").val() !== $(".register-main input:eq(2)").val()){
						this.isOk = false;
					}else{
						this.isOk = true;
					}
					this.arr[1] = true;
					
					
				}
			},
			checkPassword2(){
				if($(".register-main input:eq(1)").val() !== $(".register-main input:eq(2)").val()){
//					Toast("您两次输入的密码不一致！")
					this.arr[2] = false;
					this.isOk = false;
					
				}else if($(".register-main input:eq(1)").val() == $(".register-main input:eq(2)").val()){
					this.arr[2] = true;
					this.isOk = true;
					
				}
			}
		},
		mounted(){
			
			
		},
		updated(){
			if(this.arr[0]&&this.arr[1]&&this.arr[2]){
				$(".register-main a").attr('href',"#/login")
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.register{
		background:#fff;
		height:100%;
	}
	.header{
		width:100%;
		height:2.2rem;
		display:flex;
		align-items: center;
		border-bottom: 1px solid #dedede;
		color:#333;
		a{
			width:2.2rem;
			text-align: center;
			font-size:1.2rem;
			color:#333;
		}
		span{
			width:14.5rem;
			height:2.2rem;
			text-align: center;
			line-height: 2.2rem;
			color:#333;
		}
	}
	.register-msg{
		font-size:.6rem;
		color:#999;
		margin-top:1.4rem;
		margin-bottom:.8rem;
		text-align: center;
	}
	.register-main{
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
			color:#fff;
		}
	}
</style>