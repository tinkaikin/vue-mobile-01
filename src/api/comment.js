
import request from '@/utils/axios'

/**
 * type	是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * source	是		源id，文章id或评论id
 * offset	否		获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * limit	否		获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 */
export const getComments = ({
  isCommet = true,
  source,
  offset
  // limit
}) => {
  return request({
    method: 'get',
    url: `/app/v1_0/comments`,
    params: {
      type: isCommet ? 'a' : 'c',
      source,
      offset
      // limit
    }
  })
}
