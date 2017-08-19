<template>
  <div class="todaynew root-box">
		<component :is="header"></component>
		<today-nav></today-nav>
		<component :is="main"></component>
    <nav-tab></nav-tab>
  </div>
</template>

<script>
import NavTab from './NavTab'
import TodayHeadfirst from './TodaynewComponents/TodayHeadfirst'
import TodayHeadsecond from './TodaynewComponents/TodayHeadsecond'
import TodayNav from './TodaynewComponents/TodayNav'
import TodayMain from './TodaynewComponents/TodayMain'
import TodayMainSecond from './TodaynewComponents/TodayMainSecond'

import {mapState} from 'vuex'

export default {
  name: 'todaynew',
  data () {
    return {

    }
  },
  // 
  //
	methods:{

	},
  mounted(){
  	
  },
  computed:{
  	main:function(){
  		return this.$store.state.page == "first"?"mainfirst":"mainsecond"
  	},
  	header:function(){
  		return this.$store.state.page == "first"?"headerfirst":"headersecond"
  	},
  	x:function(){
  		console.log("name")
  		return this.$store.state.name
  	},

  	...mapState(['page','name'])
  	
  },
  components:{
  	NavTab,
  	"headerfirst":TodayHeadfirst,
  	"headersecond":TodayHeadsecond,
  	TodayNav,
  	"mainfirst":TodayMain,
  	"mainsecond":TodayMainSecond
  },
  updated(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.todaynew{
	display:flex;
	flex-direction:column;
	justify-content: space-between;
}
</style>
