import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
// 导入首页模块
import Home from '../views/home'
import WelCome from '../views/wecome'
import NotFound from '../views/404/404.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    // 配置首页路由规则
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: WelCome }
      ]
    },
    // 请求一个路径,如果没有对应的规则,此时认为是404请求
    // 匹配的过程是根据路由顺序从上到下,从前到后一个一个去匹配
    // 所以为了优化网页没有对应路由规则的情况,在路由规则最后面定义一条规则
    // 用来显示404页面,路径走到这个位置,就证明没有任何程序去处理这个路径
    { path: '*', name: '404', component: NotFound }
  ]
})
export default router
