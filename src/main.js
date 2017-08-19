// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(Mint);
window.angel = new Vue()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
