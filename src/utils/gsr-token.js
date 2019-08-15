
// 实现并导出set/get/remove token 的方法
// 导出到哪里? 如何使用?

// USER_KEY 允许更改这个 token的名字
const USER_KEY = 'tinToken'

export const getToken = () => JSON.parse(window.localStorage.getItem(USER_KEY))

export const setUser = (data) => window.localStorage.setItem(USER_KEY, JSON.stringify(data))

export const removeUser = () => window.localStorage.removeItem(USER_KEY)
