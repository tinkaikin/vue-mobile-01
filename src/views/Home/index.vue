<template>
  <div class="home-container">
    <!-- 顶部的 navbar 导航 -->
    <van-nav-bar title="首页" fixed @click.native="$router.push({name:'search'})"></van-nav-bar>
    <!-- 标签列表 -->
    <van-tabs
      class="channel-tabs"
      v-model="activeChannelIndex"
      :lazy-render="false"
      @change="changeTab"
    >
      <div slot="nav-right" class="wap-nav">
        <van-icon name="wap-nav" @click="isFootShow=true"></van-icon>
      </div>
      <!-- :title="channel.name" 标签名 -->
      <van-tab :title="channel.name" v-for="(channel) in channels" :key="channel.id">
        <!-- 下拉刷新数据 channel.isLoading=false 的时候表示加载完成 -->
        <!-- v-model= 初始值为false 表示  下拉刷新的字隐藏掉  -->
        <van-pull-refresh
          v-model="channel.isLoading"
          @refresh="onRefresh"
          :success-text="refreshSuccessText">
          <!-- s=内容列表 activeChannel.loading=false 表示加载完-->
          <!-- s=内容列表 activeChannel.finished=false 表示还有-->
          <van-list
            v-model="activeChannel.loading"
            :finished="activeChannel.finished||false"
            finished-text="没有更多了"
            @load="onLoad">
            <!-- 文章的每一项 -->
            <van-cell
              @click.native="goToComment(item)"
              v-for="item in activeChannel.articles"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <!-- 渲染数据 看文档 -->
              <div slot="label"

               >
                <template v-show="item.cover.type">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(itemlala,index) in item.cover.images" :key="index">
                      <van-image :src="itemlala" lazy-load/>
                    </van-grid-item>
                  </van-grid>
                </template>

                <p class="container">
                  <span>作者 : {{item.aut_name}}</span>
                  &nbsp;
                  <span>评论 : {{item.comm_count}}</span>
                  &nbsp;
                  <span>时间 : {{item.pubdate | relTime}}</span>
                  &nbsp;
                  <van-icon
                    @click.stop="showMoreActionDia(item)"
                    name="cross"
                    style="float: right;padding:5px;"
                  />
                </p>
              </div>
            </van-cell>
          </van-list>
          <!-- e=内容列表 -->
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <dialog-tin v-model="show" :activeItem="activeItem" @dislike-success="handleDislikeSuccess"></dialog-tin>

    <!-- 底部弹出框 v-model="isFootShow"-->
    <channel
      v-model="isFootShow"
      :channels="channels"
      :activeChannelIndex="activeChannelIndex"
      @handleActiveChannelIndex="handleActiveChannelIndex"
      @parent-component="handledeleteSuccess()"
    ></channel>
  </div>
</template>

<script>
import { getChannelsDefaultOrUser } from '../../api/channel.js'
import { getArticles } from '../../api/articles.js'
import { mapState } from 'vuex'

import DialogTin from './components/Dialog'
import Channel from './components/Channel'

export default {
  name: 'homeIndex',
  components: {
    DialogTin,
    Channel
  },
  data () {
    return {
      show: false,
      isFootShow: false, // 底部弹框
      channels: [], // 请求频道的名称({id,name.+articles,+isLoading,+loading,+finished,+timestamp})
      activeChannelIndex: 0, // 列表切换的表识
      activeItem: {},
      refreshSuccessText: ''
    }
  },
  created () {
    this.loadChannels() // 组件进来发送ajax请求
  },
  computed: {
    ...mapState(['user']),
    // c2. 当前选中的频道
    activeChannel () {
      return this.channels[this.activeChannelIndex] // {id,name.+articles,+isLoading,+loading,+finished,+timestamp}
    }
  },
  methods: {
    //
    goToComment (item) {
      this.$router.push({
        name: 'article',
        params: {
          articleId: item.art_id
          // articleId: 141314
        }
      })
    },
    // m1. 被动触发根据子组件选中的频道,父组件对应选中
    handleActiveChannelIndex (index) {
      this.activeChannelIndex = index
      this.isFootShow = false
    },
    // m2. 被动触发处理拉黑后,手动把拉黑从数组中移除
    handleDislikeSuccess (id) {
      const index = this.activeChannel.articles.findIndex(
        item => item.art_id === id
      )
      this.activeChannel.articles.splice(index, 1)
      this.show = false
    },
    // m3. 点击X显示对话框, 赋值给activeItem->再传子组件
    showMoreActionDia (item) {
      this.show = true
      this.activeItem = item
    },
    // m4. 下拉刷新触发的函数
    async onRefresh () {
      this.activeChannel.timestamp = Date.now()
      const data = await this.loadArticles() // 调用获取文章方法

      if (data.results.length) {
        // 如果有数据 则...
        this.activeChannel.articles = data.results
        this.activeChannel.timestamp = data.pre_timestamp
        await this.onLoad()
        this.$toast('刷新成功')
      } else {
        // 否则...
        this.refreshSuccessText = '无最新数据'
      }
      this.activeChannel.loading = false // 最后 关闭加载状态
      this.activeChannel.isLoading = false
    },

    // m5. 下拉触发
    async onLoad () {
      await this.$sleep(800)
      let data = []
      data = await this.loadArticles()
      // 如果返回结果 没时间 且 没数据放回 则.....
      if (!data.pre_timestamp && data.results.length === 0) {
        this.activeChannel.finished = true
        this.activeChannel.loading = false
        return
      }
      // 如果 返回结果 有时间 但是 没有数据的时候 则...
      if (data.pre_timestamp && data.results.length === 0) {
        this.activeChannel.timestamp = data.pre_timestamp // 第一次 无数据的时候
        data = await this.loadArticles() // 在发一次请求
      }
      this.activeChannel.timestamp = data.pre_timestamp // 更新时间戳,下次获取是更新的值
      this.activeChannel.articles.push(...data.results)
      this.activeChannel.loading = false // 最后 关闭加载状态
    },

    // -------------------------------请求
    // m6. 获取频道
    async loadChannels () {
      const user = this.user
      const localChannels = JSON.parse(window.localStorage.getItem('channels'))
      // 如果 用户没登录 且 本地有缓存 则...
      if (!user && localChannels) this.channels = localChannels

      // 如果 用户没登录 且 没有缓存  或者  用户登录了
      if ((!user && !localChannels) || user) {
        const data = await getChannelsDefaultOrUser()
        data.channels.forEach(el => {
          el.articles = [] // 数据列表
          el.isLoading = false // 下拉刷新 false表示加载完成
          el.loading = false // 加载状态
          el.finished = false // 是否已加载完成
          el.timestamp = Date.now()
        })
        this.channels = data.channels
      }
    },
    // m7. 获取文章数据列表
    async loadArticles () {
      const { id, timestamp } = this.activeChannel
      const data = await getArticles({
        channel_id: id,
        timestamp,
        with_top: 1
      })
      return data
    },
    // m8
    handledeleteSuccess () {
      // activeChannel 当前选中的频道 . 文章 .长度
      if (!this.activeChannel.articles.length) {
        this.activeChannelIndex = 0
        this.activeChannel.loading = true
        this.onLoad()
      }
    },
    // m9
    changeTab () {
      this.onLoad()
    }
  },
  watch: {
    // w1. 监听用户是否登录
    async user () {
      await this.loadChannels() // 调用 获取频道方法
      // 手动 在触发 onLoad
      // 没想到的点 为什么要异步请求? 为了防止还没请求回来就切换了,然后回来请求不了的问题
      // 为什么从新开启 loading: true, //回答:从新加载
      // Cannot set property 'loading' of undefined 为什么找不到 // 要使用计算属性
      // 当变化时,重新加载当前激活频道的数据
      this.activeChannel.loading = true
      await this.onLoad()
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  margin-bottom: 100px;
}
.van-nav-bar {
  background-color: #0096fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
.van-tabs {
  & /deep/ .van-tabs__wrap {
    width: 90%;
    position: fixed;
    top: 92px;
    z-index: 1;
  }
  & /deep/ .van-tabs__content {
    padding-top: 184px;
  }
  & /deep/ .van-tabs__line {
    background-color: #0096fa;
  }
  & /deep/ .van-tab--active {
    color: #0096fa;
  }
}
.channel-tabs /deep/ .wap-nav {
  position: fixed;
  right: 0px;
  padding: 10px 10px;
  top: 100px;
  background-color: #fff;
}
</style>
