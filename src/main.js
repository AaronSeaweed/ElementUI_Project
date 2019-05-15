import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import './assets/scss/main.css'
Vue.use(ElementUI)

Vue.prototype.$axios = axios;
// 正式
axios.defaults.baseURL = 'http://localhost:3000';
new Vue({
  el: '#app',
  render: h => h(App)
})
