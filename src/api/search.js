import request from '@/utils/axios.js'

/**
 * 联想建议
 * q: 关键字
 */
export const getSuggestion = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 搜索结果列表
 */
export const getSearch = ({
  page,
  perPage,
  q
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
