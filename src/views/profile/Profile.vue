<template>
  <div id="Profile">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar"><div slot="center">校长商城</div></nav-bar>

    <!-- 登录状态栏 -->
    <login></login>

    <!-- 个人账户 -->
    <account></account>

    <!-- 更多功能 -->
    <more-function/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Login from "./childComps/login"
import Account from "./childComps/Account"
import MoreFunction from "./childComps/MoreFunction"
export default {
  name: 'Profile',
  components: {
    NavBar,
    Login,
    Account,
    MoreFunction
  }
}
</script>

<style scoped>
  #Profile {
    width: 100%;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
