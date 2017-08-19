
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
Vue.use(Vuex)

const state={
	nav:null,
	page:'first',
	name:null,
	index:0,
	search:null,
	goods:[],
	type:false,
	userInfo:[],
	iarr:0
}

const mutations={
	changeNav(state,data){
		state.nav = data;
	},
	changeSearch(state,data){
		state.search = data;
	},
	changePage(state,message){
		state.index = message.index
		if(message.num == 1){
			state.page="first"
		}else{
			setTimeout(function(){
				state.page="second"
			},0)
			state.name = message.id
		}
	},
	pushGood(state,data){
		for(var i = 0, len =  state.goods.length; i < len; i ++){
			if(state.goods[i].title == data.title){
				state.goods[i].num += 1
				return
			}
		}
		state.goods.push(data)
	},
	changegoodnum(state,data){
		if(data.type == 1){
			state.goods[data.index].num += 1
		}
		if(data.type == 2){
			if(state.goods[data.index].num == 1){
				state.goods.splice(data.index,1)
			}else{
				state.goods[data.index].num -= 1
			}
			
		}
	},
	getInfo(state,info){
		state.userInfo.push(info);
		console.log(state.userInfo)
	},
	isLogin(state,type){
		state.type = type;
	},
	changeIarr(state,i){
		state.iarr = i;
	}
	
}

const store = new Vuex.Store({
	state,
	mutations
	
})


export default store