
import request from '@/utils/axios'

/**
 * 获取文章列表
 * 1. 添加了 对文章不喜欢的请求接口-> 回到 Dialog组件里去调用
 * 2. 添加一个 拉黑用户的api  /app/v1_0/user/blacklists-> dailog调用
 * 3. 添加一个举报的api 注意409 此用户已举报过该文章（冲突）/根据请求所需的参数变异一下->
 * 4. 添加获取全部频道列表  /app/v1_0/channels
 * 5. 添加一个用户添加频道的接口 /app/v1_0/user/channels put
 * 6. 添加一个删除用户指定频道
 * 7. 根据id获取文章详情
 * 8. 文章的评论或回复
 */

/**
 * 删除用户指定频道
 */
export const deleUserChannel = (ID) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${ID}`
  })
}

// 添加一个用户添加频道
/**
 * 批量修改用户频道列表（重置式）
 * channels:[
 *  {
 *    id:1 频道id
 *    seq:1 -> 顺序序号
 * }
 * ]
 *
 * id-> 要求排除第一个
 * seq 要求从2开始
 */
export const resetUserChannels = (channels) => {
  return request({
    method: 'put',
    url: `/app/v1_0/user/channels`,
    data: { channels }
  })
}
/* eslint-disable */

// 添加获取全部频道列表
export const getChannels = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/channels`
  })
}


/**
 *
 * target	integer	必须		举报的文章id
    type	integer	必须		举报类型： 
    0-其他问题，
    1-标题夸张，
    2-低俗色情，
    3-错别字多，
    4-旧闻重复，
    5-广告软文，
    6-内容不实，
    7-涉嫌违法犯罪，
    8-侵权'
    remark	string	非必须		其他问题 的附加说明

 */
export const reportsArticles = ({
  articleId,
  type,
  remark = ''
}) => {
  return request({
    method: 'post',
    url: `/app/v1_0/article/reports`,
    data: {
      target:articleId,
      type,
      remark
    }
  })
}



/**
 *  /app/v1_1/articles
 *  channel_id 是频道ID
    timestamp 是时间戳整数单位毫秒时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
    with_top 是0或1是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
 */


export const getArticles = ({
  channel_id,
  timestamp,
  with_top
}) => {
  return request({
    method: 'get',
    url: `/app/v1_1/articles`,
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}

/**
 * 对文章不喜欢
 * articleId 需要文章id
 */
export const dislikesArticle = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
/**
 *  /app/v1_0/user/blacklists
 * post
 * target	integer	必须		关注目标（被关注的用户id）	
 */

export const blacklists= (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: articleId
    }
  })
}

/**
 * 文章详情
 */
export const getArticleDetail = articleId => {
  return request({
      method: 'GET',
      url: `/app/v1_0/articles/${articleId}`
  })
}

/**
 * 8. 添加评论 || 添加回复
 *
 * target	integer	必须		评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * content	string	必须		评论内容
 * art_id	integer	非必须		文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 */

export const addCommentOrReply = ({ target, content = '', art_id = null }) => {
  return request({
      method: 'POST',
      url: `/app/v1_0/comments`,
      data: {
          target, // 发布评论->文章id 发表回复->评论id
          content,
          art_id // 发布评论->不需要传  发布回复->文章id
      }
  })
}