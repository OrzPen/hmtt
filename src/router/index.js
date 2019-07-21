import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
// 导入首页模块
import Home from '../views/home'
import WelCome from '../views/wecome'
import NotFound from '../views/404/404.vue'
import Article from '../views/article'
import Image from '../views/image'
import Publish from '../views/publish'
import Comment from '../views/comment'
import Setting from '../views/setting'
import Fans from '../views/fans'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    // 配置首页路由规则
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: WelCome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/setting', name: 'setting', component: Setting },
        { path: '/fans', name: 'fans', component: Fans }
      ]
    },
    // 请求一个路径,如果没有对应的规则,此时认为是404请求
    // 匹配的过程是根据路由顺序从上到下,从前到后一个一个去匹配
    // 所以为了优化网页没有对应路由规则的情况,在路由规则最后面定义一条规则
    // 用来显示404页面,路径走到这个位置,就证明没有任何程序去处理这个路径
    { path: '*', name: '404', component: NotFound }
  ]
})
// 登录后,在本地储存的用户信息
// 如果储存了用户信息,证明登陆过,如果没有储存,表示没有登录,跳转回login登录
// 使用路由导航,每一次跳转,去校验登录的状态,没登录跳转/login,登陆了next()放行
router.beforeEach((to, form, next) => {
  // 原始写法
  // 如果是登录页面,放行
  // if (to.path === '/login') return next()
  // // 判断登录状态
  // const user = window.sessionStorage.getItem('hmtt')
  // // 如果user存在,放行
  // if (user) {
  //   next()
  // } else {
  //   // 否则跳转回登录页
  //   next('/login')
  // }

  // 优化写法
  const user = window.sessionStorage.getItem('hmtt')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
