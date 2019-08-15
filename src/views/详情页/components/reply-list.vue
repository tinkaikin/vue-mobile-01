<template>
  <van-popup v-model="isShow" position="bottom" :style="{height:'75%'}">
    <van-cell>
      <div slot="icon">
        <img class="avatar" :src="commentFirst.aut_photo" alt="">
      </div>
      <div slot="title">
        <span>{{commentFirst.aut_name}}</span>
        <van-tag>楼主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{commentFirst.content}}</p>
        <p>
          <span>{{commentFirst.pubdate | relTime}}</span>
        </p>
      </div>
    </van-cell>
    <hr>
    <CommentList :source="commentFirst.com_id+''" :isCommet="false"></CommentList>
    <!-- 评论回复 -->
    <add-comment class="add-comment" :target="commentFirst.com_id+''" :art_id="articleId+''"></add-comment>
  </van-popup>
</template>

<script>
import vm from '../../../utils/汽车总线/eventBus.js'
// 调用组件
import CommentList from './comment-list'
import AddComment from './add-comment'
export default {
  name: 'ReplyList',
  components: {
    CommentList,
    AddComment
  },
  data () {
    return {
      isShow: false,
      commentFirst: {}
    }
  },
  computed: {
    'articleId' () {
      return this.$route.params.articleId
    }
  },
  created () {
    vm.$on('reply-show', (item) => {
      // console.log(item) // 1. 测试能不能通过bus把值传过来 ok
      this.commentFirst = item
      this.isShow = true
    })
  }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
</style>
