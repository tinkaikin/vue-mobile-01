<template>
  <div>
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(searchText)"
      @cancel="onCancel"
    />
    <!-- 联想建议 -->
    <van-cell-group v-if="resultsList.length&&searchText.trim()">
      <van-cell
        icon="search"
        v-for="(item,index) in resultsList"
        :key="index"
        @click="onSearch(item)"
      >
        <div stole="title" v-html="hightlight(item,searchText)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史搜索记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon
          @click="isDeleteData=true"
          v-show="!isDeleteData"
          slot="right-icon"
          name="delete"
          style="line-height:inherit"
        ></van-icon>
        <div v-show="isDeleteData">
          <span style="margin-right:10px" @click="removeHistoy">全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <van-cell
        :class="{colorRed:isDeleteData}"
        v-for="(item,index) in loacSearchKey"
        :key="index"
        @click="!isDeleteData?onSearch(item):null"
        :title="item">
        <van-icon
          @click="deleteHistory(item,index)"
        v-show="isDeleteData" slot="right-icon" name="close" style="line-height:inherit"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
import { debounce } from '../../utils/防抖函数/debounce.js'
/**
 * 1. 布局/
 * 2. 输入关键字,请求数据/
 *    2-1 配置接口->api
 *    2-2 调用接口->一进入组件触发
 * 3. 返回数据是数组->遍历渲染/
 * 4. 关键字高亮/ -->把字符串用关键字分割成数组-->包装在标签里-->并用这个标签又拆分成字符串
 * 5. 防抖/ -->防抖函数debounce
 * 6. 点击/回车,携带关键字跳转/ 使用$router.black()
 *
 * 7. 数组去重--> 使用e6的 Set对象
 * 8. 历史记录布局展示
 * 9. 历史记录-本地存储
 */
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      resultsList: [],
      isDeleteData: false,
      loacSearchKey: JSON.parse(window.localStorage.getItem('search-key')) || []
    }
  },
  watch: {
    // 1. 防抖处理
    searchText: debounce(async function (newValue) {
      newValue = newValue.trim()
      if (!newValue.length) {
        return
      }
      try {
        const data = await getSuggestion(newValue)
        this.resultsList = data.options
      } catch (error) {
        console.log(error)
      }
    }, 800)
  },
  methods: {
    // m1. 事件处理函数->跳转并携带参数
    onSearch (queryText) {
      if (!queryText.length) {
        return
      }
      this.$router.push({
        name: 'search-result',
        params: { q: queryText }
      })
      // 2. 存储数据搜索历史记录
      const arr = new Set(this.loacSearchKey)
      arr.add(queryText)
      this.loacSearchKey = [...arr]
      window.localStorage.setItem('search-key', JSON.stringify(this.loacSearchKey))
      this.searchText = ''
      this.isDeleteData = false
    },
    onCancel () {
      // console.log('onCancel--')
      this.$router.push({ name: 'home' })
    },
    // 3. 清空历史记录
    removeHistoy () {
      window.localStorage.removeItem('search-key')
      this.loacSearchKey = []
      this.$toast('清空成功')
      this.isDeleteData = false
    },
    // 4. 关键字高亮/
    hightlight (item, searchText) {
      searchText = searchText.trim().toLowerCase()
      return item
        .toLowerCase()
        .split(searchText)
        .join(`<span style="color:red;">${searchText}</span>`)
    },
    // 5. 删除其中一项历史记录
    deleteHistory (item, index) {
      this.loacSearchKey.splice(index, 1)
      window.localStorage.setItem('search-key', JSON.stringify(this.loacSearchKey))
      this.$toast('删除成功')
    }
  }
}
</script>

<style  lang="less" scoped>
.colorRed{
  color: red;
}
</style>
