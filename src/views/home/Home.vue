<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 轮播图 -->
    <home-swiper :homebanners='banners'></home-swiper>

    <!-- 推荐栏 -->
    <home-recommend-view :homerecommends="recommends"></home-recommend-view>
    <h2>首页</h2>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'

import {getHomeMultidata} from "network/home"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
