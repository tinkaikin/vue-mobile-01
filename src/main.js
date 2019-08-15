import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 vant组件库
import Vant, { Lazyload } from 'vant'
import VeeValidate from 'vee-validate'
import vee from './utils/veeValidata'

import 'vant/lib/index.css'
// 因为是模块开发所以使用import导入
import 'amfe-flexible/index.min.js'
import sleep from './utils/sleep'

import dayjs from './files/day'
// console.log(dayjs().from(dayjs('2019-07-10')))
// 注册成全局的过滤器

Vue.use(VeeValidate)
vee()
Vue.use(Vant)
Vue.use(Lazyload)

Vue.prototype.$sleep = sleep
Vue.config.productionTip = false

Vue.filter('relTime', (value) => {
  return dayjs().from(dayjs(value))
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
