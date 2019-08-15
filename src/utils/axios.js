import axios from 'axios'
import store from '../store'
import JSONBig from 'json-bigint'
import router from '../router'
// import { getToken } from './gsr-token'

/**
 * 1. 安装完json-bigint 下面配置好了--> 回到dialog.vue组件
 * 2. token过期了,判断返回401,让他回到登录页去->
 */

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

request.interceptors.request.use(function (config) {
  // 简写
  const { user } = store.state // 触发了5次都是 null
  config.url !== '/app/v1_0/authorizations' && user && (config.headers.Authorization = `Bearer ${user.token}`)
  return config
}, function (error) {
  return Promise.reject(error)
})

request.defaults.transformResponse = [function (data) {
  try {
    return JSONBig.parse(data)
  } catch (error) {
    return data
  }
}]

request.interceptors.response.use(function (response) {
  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, async function (error) {
  if (error.response.status === 401) {
    // location.hash = '#/login'
    // 用户是否登录了
    console.log('401')
    const user = store.state.user
    if (!user) {
      router.push('/login')
      return
    }
    // 如果有 user，那我们请求接口使用 refresh_token 获取新的访问 token
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(data)
      // 要重新发起请求
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: user.refresh_token
      })
      // 把本次因为 token 过期的请求继续发出去
      // 非刷新 token 的请求，使用 request 走我们的那个正常的请求拦截相关流程
      return request(error.config)
    } catch (error) {
      // 刷新 token 都请求失败，甭想了，直接去登录页
      router.push({
        name: 'login'
      })
    }
  }
  return Promise.reject(error)
})

export default request
