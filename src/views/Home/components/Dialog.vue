
<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input')"
      closeOnClickOverlay
      :showCancelButton="false"
      :showConfirmButton="false"
    >
      <van-cell-group v-if="!isReportShow">
        <van-cell icon="location-o" title="不感兴趣" @click="handleNoLike"/>
        <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReportShow=true"/>
        <van-cell icon="location-o" title="拉黑作者" @click="handleAth"/>
      </van-cell-group>

      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReportShow=false"/>
        <van-cell
        @click="handelReportsArticles(item.type)"
        :title="item.title" icon="location-o" v-for="item in reports" :key="item.type"/>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
/**
 *  1. 快速布局->声明数据->正常显示页面了
    2. 点击不敢兴趣, 发数据-> 去api封装请求接口
    3. 引入dislikesArticle 接口-> 挂一个点击事件 测试 发现需要 文章id->id太长需要安装json-bigint
    4. npm i json-bigint 去请求哪里去配置一下-> axios.js
    5. 需要参数为文章id ,-> 重父组件里获取
    6. 接收 父传过来的数据 测试-> 获取到父组件传过来的文章{id}把id解构出来/测试
    7. 正常返回数据后,把对话框关闭,然后假假的,把当前数组的那一项删除,并给个提示/
    8. 回到home组件里去删除把当前的id传过去->
    9. 拉黑作者/拿到id发起请求/请求成功/放回值-> 配置一个拉黑的接口-> 引入/同样的使用
    10. 举报功能/先把举报的数据遍历好(变成数组前先配置一下)/先配置接口/看参数->
    11. 把数据变异成数组[{type:0, value:名字}] reportsArticles
    12. 点击发起请求/判断409为举报过了
    13. 下拉刷新->到home页面去了
 */
import { dislikesArticle, blacklists, reportsArticles } from '@/api/articles.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isReportShow: false, // 显示不同的内容
      reports: [
        { title: '其他问题', type: 0 },
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 }
      ]
    }
  },
  methods: {
    // 举报
    async handelReportsArticles (type) {
      try {
        await reportsArticles({
          articleId: this.activeItem.art_id,
          type
        })
        this.$toast('举报成功')
        this.$emit('input', false)
      } catch (error) {
        if (error.response.status === 409) {
          this.$toast('举报过了')
          this.$emit('input', false)
        } else {
          this.$toast('举报失败')
        }
      }
    },
    // 拉黑
    async handleAth () {
      const artId = this.activeItem.art_id
      try {
        await blacklists(artId)
        this.$emit('dislike-success', artId)
        this.$toast('操作成功')
      } catch (errer) {
        this.$toast('操作失败')
      }
    },
    async handleNoLike () {
      const artId = this.activeItem.art_id
      try {
        await dislikesArticle(artId)
        this.$emit('dislike-success', artId)
        this.$toast('操作成功')
      } catch (errer) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
