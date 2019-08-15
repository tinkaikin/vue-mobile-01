<template>
  <div>
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择"  @click="弹出系统选择框()"/>
        <!-- 插入一个 文本域,隐藏->需要js来触发  -->
        <input style="display: none;" type="file" ref="input"
         @change="changeFile" >
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { updateUserPhoto } from '../../../api/users-api.js'
export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    }
  },

  computed: {
    fileDomObj () {
      return this.$refs['input']
    }
  },

  methods: {

    // 选中照片后触发-->获取上传的内容
    changeFile (e) {
      const photo = e.target.files[0]
      // console.log(photo) // 2. 测试能不能获取到文件的内容
      // 使用原生的对象转 base64
      const reader = new FileReader()
      reader.readAsDataURL(photo)
      reader.onload = (aa) => {
        // 获取返回的 结果有2种 一是: e的target.resilt 获取
        // 二是: reader.result
        // console.log(reader.result) // 3. 测试 能获取到 转base64的码了
        ImagePreview({
          images: [reader.result],
          showIndex: false, // 是否显示页面码
          // startPosition: 1,  // 默认显示第0张
          onClose: () => {
            // 预览关闭后触发--> // 打开对话框
            this.openDia()
          }
        })
      }
    },
    openDia () {
      // do something
      // 打开确认框
      this.$dialog
        .confirm({
          title: '是否确认修改头像'
        })
        .then(() => {
          // 最后再这里上传图片
          this.updateImage()
        })
        .catch(() => {})
    },
    //
    async updateImage () {
      // 先封装api
      const res = await updateUserPhoto('photo', this.fileDomObj.files[0])
      // console.log(res) // 4. 测试能获取到返回的内容了
      if (res.photo) {
        this.$emit('input', false) // 关闭
        this.$emit('upload-success', res.photo) // 把结果传回组件
      } else {
        this.$toast('上传失败')
      }
    },
    弹出系统选择框 () {
      // console.log(this.fileDomObj) // 1. 测试 能获取到 input的dom对象
      this.fileDomObj.click()
    }
  }
}
</script>

<style>
</style>
