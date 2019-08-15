import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setUser as aaa } from './utils/gsr-token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken()
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 将数据放到本地存储  //在哪里调用呢? 去登录组件去
      aaa(state.user)
    }
  },
  actions: {

  }
})
