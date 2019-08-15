<template>
  <div>
    <van-nav-bar title="个人信息" left-text="返回" right-text="保存" left-arrow @click-left="$router.back()" @click-right="handleSave" />

    <van-cell-group>
      <van-cell is-link title="头像" @click="isUploadPhotoShow = true">
        <div slot="default">
          <img width="30" :src="user.photo" alt="">
        </div>
      </van-cell>
      <van-cell is-link title="昵称" :value="user.name" />
      <van-cell is-link title="介绍" value="内容" />
    </van-cell-group>

    <van-cell-group>
      <van-cell is-link title="性别" :value="user.gender === 0 ? '男' : '女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>

  <!-- 弹出更改图片的对话框 -->
  <!-- @upload-success='user.photo=$event' 接收返回的值,并直接赋值了 -->
  <upload-photo v-model="isUploadPhotoShow" @upload-success='user.photo=$event'></upload-photo>
  </div>
</template>

<script>
import { getCurrentProfileInfo, updateUserProfile } from '../../api/users-api.js'
import UploadPhoto from './components/upload-photo'
export default {
  name: 'UserProfile',
  components: {
    UploadPhoto
  },
  data () {
    return {
      user: {
        name: null, // 昵称 只能1-7位数
        photo: null, // 头像 base64编码处理
        gender: null, // 性别，0-男，1-女
        birthday: null, // 生日，格式'2018-12-20'
        realName: null, // 真实姓名
        idNumber: null, // 身份证号
        idCardFront: null, // 身份证正面照片   base64编码处理
        idCardBack: null, // 身份证背面照片   base64编码处理
        idCardHandheld: null, // 手持身份证照片   base64编码处理
        intro: null // 个人介绍
      },
      isUploadPhotoShow: false
    }
  },

  created () {
    this.loadUserProfile()
  },

  methods: {

    async handleSave () {
      // this.user.name = 'NoteBook'
      // console.log(this.user) // 3. 测试看数据获取的到吗? ok
      await updateUserProfile({
        name: 'NoBook'
      })
      this.$toast.success('修改成功')
      this.$router.back()
      // console.log('修改成功', res) // 2. 测试修改一个数据后能不能成功
    },
    async loadUserProfile () {
      const toast = this.$toast.loading({
        duration: 0, // 配置为 0 表示持续展示 loading
        mask: false, // 是否展示遮罩
        forbidClick: true, // 禁用背景点击
        message: '加载中...'
      })
      try {
        const data = await getCurrentProfileInfo()
        this.user = data
        // console.log(data) // 1. 测试 能获取到数据
      } catch (err) {
        this.$toast.fail('加载用户信息失败')
      }
      toast.clear()
    }
  }
}
</script>

<style lang="less" scoped></style>
