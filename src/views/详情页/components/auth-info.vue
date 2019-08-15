<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
         <p>{{ article.aut_name }}</p>
        <p>{{ article.pubdate | relTime }}</p>
      </div>
    </div>
    <div>
      <van-button type="danger" @click="关注切换()" :loading="isLoading">{{ article.is_followed ? '已关注' : '关注下' }}</van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '../../../api/users-api.js'
export default {
  name: 'AuthInfo',
  props: {
    // 接收 父组件过来的 文章详情内容
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    // console.log(this.article) // 1. 测试父组件过来的 文章详情内容 失败/后来又成功了??
  },
  methods: {
    async 关注切换 () {
      this.isLoading = true
      const 已关注 = this.article.is_followed
      if (已关注) {
        await unFollowUser(this.article.aut_id)
      } else {
        await followUser(this.article.aut_id)
      }
      this.article.is_followed = !已关注
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
