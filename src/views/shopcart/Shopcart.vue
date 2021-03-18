<template>
  <div id="shopcart-nav">
    <nav-bar class="nav-bar"><div slot="center">购物车({{ cartLength }})</div></nav-bar>
    <scroll class="content" ref="scroll">
      <shopcart-list></shopcart-list>
    </scroll>
    <shopcart-bottom-bar></shopcart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ShopcartList from "./childComps/ShopcartList";
import ShopcartBottomBar from "./childComps/ShopcartBottomBar"

import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    Scroll,
    ShopcartList,
    ShopcartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
#shopcart-nav {
  position: relative;
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>

