import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import axios from 'axios'
// 设置axios基准路径,默认加载路径前的路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置请求头
axios.defaults.headers = {
  // token认证需要的字段,值前面注意加上前缀bearer+空格
  Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtt')).token
}
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
