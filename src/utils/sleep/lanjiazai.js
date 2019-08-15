
function 懒加载 () {
  // 没用文件
  // import Vue from 'vue'
  // import App from './App.vue'
  // import VueLazyload from 'vue-lazyload'
  // Vue.use(VueLazyload)
  // // or with options
  // Vue.use(VueLazyload, {
  //   preLoad: 1.3,
  //   error: 'dist/error.png',
  //   loading: 'dist/loading.gif',
  //   attempt: 1
  // })
  // import VueLazyload from 'vue-lazyload'
  // Vue.use(VueLazyload)
}

function 修改时间格式的 () {
  // npm install dayjs --save

import dayjs from 'dayjs'
import relaviveTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relaviveTime)
// console.log(dayjs().from(dayjs("2019-07-10")));
}
