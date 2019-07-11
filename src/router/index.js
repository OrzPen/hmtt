import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
// 导入首页模块
import Home from '../views/home'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    // 配置首页路由规则
    { name: 'home', path: '/', component: Home }
  ]
})
export default router
