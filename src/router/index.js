import Vue from 'vue'
import Router from 'vue-router'
import Todaynew from '@/components/Todaynew'
import Zhifa from '@/components/Zhifa'
import Global from '@/components/Global'
import Shopcar from '@/components/Shopcar'
import Mine from '@/components/Mine'
import Sousuo from '@/components/Sousuo'
import SearchList from '@/components/SearchList'
import Fenlei from '@/components/Fenlei'
import DetailPage from '@/components/DetailPage'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
  	{path: '/',redirect:"/todaynew"},
    {path: '*',redirect:"/todaynew"},
    {path: '/todaynew',name: 'todaynew',component: Todaynew},
    {path: '/zhifa',name: 'zhifa',component: Zhifa},
    {path: '/global',name: 'globel',component: Global},
    {path: '/shopcar',name: 'shopcar',component: Shopcar},
    {path: '/mine',name: 'mine',component: Mine},
    {path: '/sousuo',name: 'shopcar',component: Sousuo},
    {path: '/searchlist',name: 'mine',component: SearchList},
    {path: '/fenlei',name: 'mine',component: Fenlei},
    {path:'/detail/:id/:title/:join',name:'detail',component:DetailPage},
    {path:'/register',name:'register',component:Register},
    {path:'/login',name:'login',component:Login}
  ]
})
