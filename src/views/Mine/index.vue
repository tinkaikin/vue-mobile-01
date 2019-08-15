<template>
  <div class='mine-container'>
    <un-login v-if="!$store.state.user"></un-login>
    <user-info v-else></user-info>
  </div>
</template>

<script>
import UnLogin from './components/un-login'
import UserInfo from './components/user-info'
export default {
  name: 'minIndex',
  components: {
    UnLogin,
    UserInfo
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang='less'></style>
