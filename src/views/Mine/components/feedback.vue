<template>
  <div class="chat">
    <van-nav-bar fixed title="聊天" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>

    <div class="chat-window" ref="chat-window">
      <van-cell :class="item.from!=='myself'?'left':'right'" v-for="(item,index) in msgs" :key="index" :value="item.msg" />
      <div class="clear"></div>
    </div>

    <van-cell-group border class="sendmsg">
      <van-field border v-model="msg" center>
        <van-button slot="button" size="small" type="primary"
          @click="sendMsg"
          :disabled="isConnect||!msg.length"
         >发送</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Chat',
  components: {},
  data () {
    return {
      msg: '你好,小智机器人',
      msgs: [],
      socket: null, // 定义一次连接后的实例
      isConnect: false // 当为false的时候禁止发送
    }
  },
  watch: {},
  methods: {
    // 发送消息
    sendMsg () {
      // 4. 点击完再走一遍
      this.setSocket()
    },
    // 2. 发送消
    sendMsgToRobat () {
      this.socket.emit('message', {
        msg: this.msg,
        timestamp: Date.now()
      })
      // 手动给机器人发送第一条消息
      this.msgs.push({
        msg: this.msg,
        from: 'myself' // 自定义的属性,用于区别是服务器返回的还是用户发son的
      })
      this.msg = ''
      this.recMsgFromRobat()
    },
    // 3. 收消息
    recMsgFromRobat () {
      this.socket.on('message', (data) => {
        // console.log('接收到的消息为--->', data)
        this.msgs.push({
          msg: data.msg,
          from: 'yourself' // 自定义的属性,用于区别是服务器返回的还是用户发son的
        })
      })
      this.isConnect = false
    },
    // 1. 主要是连接和发送第一次
    setSocket () {
      // 第一次连接
      this.socket = io('http://ttapi.research.itcast.cn', {
        query: {
          token: this.$store.state.user.token
        }
      })
      this.socket.on('connect', () => {
        console.log('连接成功') // 能打印,连接成功
        this.isConnect = true
        this.sendMsgToRobat()
      })
    }
  },
  created () {
    if (this.$store.state.user) {
      this.setSocket()
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar {
  background-color: #1989fa;
  .van-nav-bar__title {
    color: #ffffff;
  }
}

.sendmsg {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.sendmsg /deep/ .van-cell {
  border: 1px solid black;
}

.chat .chat-window {
  position: relative;
  top: 92px;
  font-size: 14px;
}
.chat /deep/ .van-nav-bar__text {
  color: #ffffff;
}
.clear {
  height: 102px;
}
.chat-window /deep/ .left .van-cell__value {
  color: red;
}
.chat-window /deep/ .right .van-cell__value {
  color: green;
}
</style>
