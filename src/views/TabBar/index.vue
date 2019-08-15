<template>
  <div class='tabBar-container'>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 底部-tabbar
    首页 /
    我的 /mine
     -->

    <van-tabbar active-color="#0096fa" inactive-color="#000" v-model="activeIndex" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/mine">{{ $store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tab-bar',
  data () {
    return {
      activeIndex: 0 // 当前选中标签的名称或索引值 (索引从0开始)
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang='less'>
</style>
