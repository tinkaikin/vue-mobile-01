<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <!-- <van-icon v-if="!articleId" :name="article.is_collected ? 'star' : 'star-o'" @click="handleCollect"></van-icon> -->
      <van-button size="small" :disabled="!content.length||isNoFox" @click="handleAdd">发布</van-button>
    </div>
  </div>
</template>

<script>
import { addCommentOrReply } from '../../../api/articles.js'
import vm from '../../../utils/汽车总线/eventBus.js'
export default {
  name: 'AddComment',
  data () {
    return {
      content: '',
      // 自己添加了个开关,禁止2次发送 测试用
      isNoFox: false
    }
  },
  props: {
    target: {
      type: [Number, String]
    },
    art_id: {
      type: [Number, String]
    }
  },
  methods: {
    async handleAdd () {
      this.isNoFox = true
      // console.log(this.target,
      //   this.art_id,
      //   this.content) // 1. 测试 传过来和获取的内容是否符合 ok
      try {
        await addCommentOrReply({
          target: this.target, // 发布评论->文章id 发表回复->评论id
          art_id: this.art_id, // 发布评论->不需要传   发布回复->文章id
          content: this.content
        })
        console.log('发表成功') // 2.测试 网太慢了,虽然返回502,但是也是发送成功了!
        this.content = ''
        this.isNoFox = false
        vm.$emit('comment-list')
      } catch (error) {
        console.log('502')
        this.content = ''
        // this.$forceUpdate()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
