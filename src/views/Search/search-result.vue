<template>
  <div>
    <van-nav-bar
    fixed
    title="搜索结果"
    left-text="返回" left-arrow
    @click-left="$router.back()">
    </van-nav-bar>
    <van-list
        class="search-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item) in resultList"
          :key="item.art_id"
          :title="item.title"
        />
      </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
/**
 * 1. 根据传过来的数据,请求接口获取所有的数据-->创建接口 getSearch
 * 2. 进行不局,返回的数据,进行渲染
 * 3. 根据接口,有可能返回的数据每次都一样的情况下,处理,要求为最新的数据
 * 4. 使用下拉刷新的组件里面有提供一进入组件就触发的函数
 * 5. 有返回上一级的按钮
 * 6. 会出现缓存的效果,使用卸载组件的时候触发一个函数来干掉keep-alive
 */
export default {
  name: 'search-result',
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        q: this.$route.params.q
      },
      resultList: [], // 请求回的数据
      loading: false, // 加载状态 为true的时候会停止加载,并会一直转圈圈
      finished: false, // 加载全部
      list: []
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep(800)
      const res = await getSearch(this.reqParams)
      this.resultList.push(...res.results)
      this.reqParams.page++

      this.loading = false // 为 false的时候为下次onLoad准备
      if (res.results.length === 0) {
        this.finished = true
      }
    }
  },
  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang="less" scoped>
.search-list {
  margin-top: 92px;
}
.van-nav-bar {
  background-color: #0096fa;

  .van-nav-bar__title,
  .van-nav-bar__text,
  .van-icon {
    color: #fff;
  }
}
</style>
