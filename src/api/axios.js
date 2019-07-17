// 封装axios
import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({
  // 设置axios基准路径,默认加载路径前的路径
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // axios默认有转换方式JSON.parse(),但是会有js最大值的限制,所以在这里修改默认的转换方式
  transformResponse: [(data) => {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})
instance.interceptors.request.use(config => {
  // config 请求配置对象
  // 修改config
  const user = window.sessionStorage.getItem('hmtt')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 创建promise对象的方式  new Promise() 结果可能成功可能失败
  // Promise.resolve() 创建一个成功的promise
  // Promise.reject() 创建一个失败的promise
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  // 如果响应状态码是 401 拦截到登录页面
  // error.response.status 状态码
  if (error.response && error.response.status === 401) {
    // hash 是location提供获取操作 地址栏的#后的地址的属性
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
