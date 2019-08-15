<template>
  <div class="login">
    <!-- navbar部分 -->
    <van-nav-bar title="登录" />
    <form action="/" method="get">
      <van-cell-group>
        <!-- v-validate="'required|mobile'"  自定义验证规则 -->
        <!-- :error-message="errors.first('phone')" 错误后返回的消息 -->
        <van-field
          v-model="users.mobile"
          v-validate="'required|mobile'"
          name="电话号码"
          :error-message="errors.first('电话号码')"
          required
          clearable
          label="电话号码"
          right-icon="question-o"
          placeholder="请输入电话号码"
          @click-right-icon="$toast('question')"
        />

        <van-field
          v-model="users.code"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
        <van-field
          v-model="users.sms"
          required
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <van-button type="info" block @click.prevent="login" :loading='loading' >登录</van-button>
    </form>
    <!-- 测试 -->
     <!--
      1. 使用v-validate指令 值为规则名
      2. 设置name属性
      3. 错误提示 errors.first('name属性值')
     -->
    <!-- <input v-validate="'required|email'" name="aaa" type="text">
    <span>{{ errors.first('aaa') }}</span> -->
    <!-- <input v-validate="'required|mobile'" name="phone" type="text">
    <span>{{ errors.first('phone') }}</span> -->

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { loginApi } from '../api/users-api.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      users: {
        mobile: '18801134129',
        code: '246810',
        sms: null // 验证码
      },
      loading: false // 加载动画
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['setUser']),
    login () {
      // 使用 验证 通过的回调函数
      try {
        this.loading = true
        this.$validator.validate().then(async valid => {
          if (!valid) {
            this.loading = false
            return
          }
          const data = await loginApi(this.users)
          // 登录成功后
          // this.$store.commit('setUser', data)
          // this.$router.push('/')
          // 方式二：使用查询字符串记录起来
          this.setUser(data)
          const redirect = this.$route.query.redirect || '/'
          this.$router.push(redirect)
          this.loading = false
        })
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>
  .van-nav-bar {
    background-color: #0096fa;

    .van-nav-bar__title {
        color: white;
    }
}
</style>
