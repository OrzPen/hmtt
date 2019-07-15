import MyBread from './my-bread.vue'
console.log(MyBread)

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
