import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import axios from './api/axios'
import components from './components/index.js'
// 引入全局样式
import './style/index.less'
Vue.use(components)

Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
