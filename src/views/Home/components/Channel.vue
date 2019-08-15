<template>
  <div class='channel'>
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '95%' }"
      >
        <div class="channel">
          <div class="channel-head">
            <div>
              <span class="title">我的频道</span>
              <span class="desc">点击进入频道</span>
            </div>
            <div>
              <van-button
                type="danger"
                plain
                size="mini"
                @click='changeState()'
              >{{!isChangeState?'编辑':'完成'}}</van-button>
            </div>
          </div>
          <van-grid class="channel-content" :gutter="10" clickable>
            <!-- channels{id,name.+articles,+isLoading,+loading,+finished,+timestamp} -->
            <van-grid-item
              v-for="(item,index) in channels"
              :key="item.id"
              :text="item.name">
              <span class="text" :class="{active: !isChangeState && activeChannelIndex===index}"
              @click="handleUserClick(item,index)"

              >{{item.name}}</span>
              <van-icon v-show="isChangeState&&index!==0" class="close-icon" name="close"
              />
            </van-grid-item>
          </van-grid>
        </div>

        <div class="channel">
          <div class="channel-head">
            <div>
              <span class="title">频道推荐</span>
              <span class="desc">点击添加频道</span>
            </div>
          </div>
          <van-grid class="channel-content" :gutter="10" clickable>
            <van-grid-item
              v-for="(item) in restChannels"
              :key="item.id"
              text="文字">
              <div class="info">
                <span class="text"
                @click="handleAddChannel(item)"
                >{{item.name}}</span>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </van-popup>
  </div>
</template>

<script>
import { getChannels, resetUserChannels, deleUserChannel } from '@/api/articles.js'
import { mapState } from 'vuex'
/**
 * 1. value是传过来的 配置props->布局->:将我的频道的频道数据进行渲染和高亮显示
 * 2. 数据从哪里来的,/外面不是获取到数据了吗?传进来 channels /下面数据如何渲染?/获取全部频道->
 * 3. 引接口getChannels/返回数据 {id: 2, name: "开发者资讯"}/不够,要改变一下/如何上下分开-> todo
 * 4. 点击那个那个就高亮外面和里面数据相连->接收activeChannelIndex
 * 5. 筛选频道数据/[1,2,3]和[1,2]/通过id来筛选/先获取我的频道的id/和全部频道匹配/去放回false的值/遍历
 * 6. 点击剩余的数据,跑到上面去1,要发请求 2. 不需要发请求/先做2/
 * 7. 本地存储/一定是用户没登录的情况下->拿到用户信息-> 本地解决 -> 1发起请求/配置接口-> 对接口的分析
 * 8. 点击编辑/切换状态-> 点击×减一个 ->isChangeState=!isChangeState 处理删除->导入deleUserChannel
 */
export default {
  name: 'Channel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array,
      default: () => []
    },
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isChangeState: false // 编辑状态改变
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    ...mapState(['user']),
    // 保存剩余数据
    'restChannels' () {
      // 全部id
      const userChannelIds = this.channels.map((item) => {
        return item.id
      })
      return this.allChannels.filter((i) => {
        return !userChannelIds.includes(i.id)
      })
    }
  },
  methods: {
    // 去优化一下 "isChangeState = !isChangeState"
    changeState () {
      console.log(123)
    },
    // m1. 点击编辑切换状态后点击
    async handleUserClick (item, index) {
      if (this.isChangeState) {
        if (index === 0) return
        this.channels.splice(index, 1)
        // 编辑状态 点击后做什么
        if (this.user) {
          await deleUserChannel(item.id)
          // 让父组件重新更新当前频道的数据
          this.$emit('parent-component')
        } else {
          window.localStorage.setItem('channels', JSON.stringify(this.channels))
        }
      } else {
        this.$emit('handleActiveChannelIndex', index)
      }
    },
    // m2. 追加一个频道
    handleAddChannel (item) {
      this.channels.push(item)
      this.changeChannel()
    },
    // m3. 统一处理数据
    async changeChannel () {
      if (this.user) {
        // 数据库存储 参数是把所有的
        const data = this.channels.slice(1).map((item, i) => {
          return {
            id: item.id,
            seq: i + 2
          }
        })
        await resetUserChannels(data)
        console.log('操作成功')
      } else {
        // 本地存储
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
    // m3. 获取全部频道
    async getAllChannels () {
      try {
        const data = await getChannels()
        // console.log(data.channels) //  {id: 2, name: "开发者资讯"}
        data.channels.forEach(el => {
          el.articles = []
          el.isLoading = false
          el.loading = false
          el.finished = false
          el.timestamp = Date.now()
        })
        this.allChannels = data.channels
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
