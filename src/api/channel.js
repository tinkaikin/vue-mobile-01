/**
 * 获取频道数据
 */

import request from '@/utils/axios'

/**
 * 获取首页频道资讯列表
 * 已登录(设置请求头 token) 用户关注的频道的列表
 * 未登录 默认列表
 */

export const getChannelsDefaultOrUser = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/channels`
  })
}
