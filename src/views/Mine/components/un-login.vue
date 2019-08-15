<template>
  <div class="not-login">
    <div class="circle" @click="$router.push({ name: 'login' })">
      <span>登录</span>
    </div>
  </div>
</template>

<script>
/**
 * 测试一下 如果没登入则跳到 #/login?redirect=%2Fmy  好奇怪
 */
export default {}
</script>

<style lang="less">
.not-login {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 100px;
    height: 100px;
    padding: 40px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
  }
}
</style>
