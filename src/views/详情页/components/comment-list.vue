<template>
  <!-- 封装成一个组件, 别的地方也要用 -->
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in com_List" :key="index">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate| relTime}}</span>
            ·
            <span @click="onshowReply(item)">回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '../../../api/comment.js'
import vm from '../../../utils/汽车总线/eventBus.js'
/**
 * 1. 根据数据的不同,展示不同的n内容--> 靠父组件传过来的值来展示不同的内容
 * 2. 根据接口来
 */
export default {
  name: 'CommentList',
  props: {
    isCommet: {
      type: Boolean,
      default: true
    },
    source: {
      type: [String, Number]
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      // 新加的
      com_List: [],
      offset: null
    }
  },
  created () {
    vm.$on('comment-list', () => {
      console.log('重新刷新')
      this.onLoad()
    })
  },
  methods: {
    // 发布后重新渲染

    async onLoad () {
      // console.log('onLoad')
      this.$sleep(800)
      const res = await getComments({
        isCommet: this.isCommet, // 外部 默认是 true 为a , fasle为 c
        source: this.source, // 外部来的
        offset: this.offset
        // limit
      })
      // console.log(res) // 1. 测试 能通过文章id获取到评论列表
      if (res.results.length === 0) {
        this.loading = false
        this.finished = true
      } else {
        this.com_List.push(...res.results)
        this.offset = res.last_id
        this.loading = false
      }
    },
    onshowReply (item) {
      // item :当前评论的人,和内容
      // 要传到领一个不同级的组件 是用bus
      vm.$emit('reply-show', item)
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
