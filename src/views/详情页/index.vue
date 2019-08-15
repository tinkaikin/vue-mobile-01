<template>
  <div class="article">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div>
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 把整个 article 传过去-->
      <auth-info :article="article"></auth-info>
      <!-- 文章内容 v-html="文章内容"-->
      <div class="article-content" v-html="article.content">

      </div>
      <!-- 更多操作 -->
      <more-action></more-action>
       <!-- 评论列表 -->
      <comment-list :source="articleId+''"></comment-list>
      <!-- 弹出 回复组件 -->
      <reply-list></reply-list>
      <!-- 发布评论 -->
      <add-comment class="add-comment" :target="articleId+''"></add-comment>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info.vue'
import MoreAction from './components/more-action.vue'
import CommentList from './components/comment-list'
import ReplyList from './components/reply-list'
import AddComment from './components/add-comment'

import { getArticleDetail } from '../../api/articles.js'
/**
 * 1. 获取文章的详情信息(包括 作者的信息-> 把作者的信息传给作者的组件)
 * 2.
 */
export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction,
    CommentList,
    ReplyList,
    AddComment
  },
  data () {
    return {
      article: {
        // art_id: 12345,
        // attitude: 0,
        // aut_id: 1,
        // aut_name: '森龙',
        // aut_photo: 'http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU',
        // ch_id: 6,
        // content: '<p>xxxxxxxxxxxxxxxxxxxxxx</p>',
        // is_collected: false,
        // is_followed: true,
        // pubdate: '2019-07-16T18:16:38',
        // recomments: [],
        // title: '11111111xxxxxxxxxxx'
      } // 返回的数据

    }
  },
  computed: {
    'articleId' () {
      return this.$route.params.articleId
    }
  },
  created () {
    // console.log(this.articleId) // 1.测试能正常获取到文章id 141314
    // 获取文章详情
    this.loadArticle()
  },
  methods: {
    // 获取文章详细信息 getArticleDetail(文章Id)

    async loadArticle () {
      const toast = this.$toast.loading({
        duration: 0, // 配置为 0 表示持续展示 loading
        mask: false, // 是否展示遮罩
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      })
      try {
        const 文章Id = this.articleId
        const data = await getArticleDetail(文章Id)
        this.article = data
        // console.log(data) // 2. 测试返回的数据有哪些,是什么类型的data={....}
      } catch (err) {
        this.$toast.fail('加载失败')
      }
      toast.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  // padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400px;
  }
  .article-content {
    font-size: 20px;
  }
}
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
