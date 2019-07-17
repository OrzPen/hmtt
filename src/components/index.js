import MyBread from './my-bread.vue'
import MyChannel from './my-channel.vue'

console.log(MyBread)

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
