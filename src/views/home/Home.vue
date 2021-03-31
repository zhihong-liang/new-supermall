<template>
  <div id="home" class="wrapper">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
      />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @backtopshow="backtopshow"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper 
        :homebanners="banners" 
        @swiperImageLoad.once="swiperImageLoad">
      </home-swiper>

      <!-- 推荐栏 -->
      <home-recommend-view :homerecommends="recommends"></home-recommend-view>

      <!-- 本周流行 -->
      <home-feature-view />

      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />

      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backtopClick" v-show="backupshow"></back-top>
    <!-- 组件是不能监听点击的 -->
    <!-- 修饰 .native 修饰什么时候使用？ -->
    <!-- 1.在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听。 -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemListenerMixin, backTopMixin} from "common/mixin"
import { debounce } from "common/utils.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      bscroll: null,
      backupshow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  // mixin 混入
  mixins: [itemListenerMixin, backTopMixin],
  
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2。请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // // 1. 监听 item 中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 50);

    // // 对监听的事件进行保存
    // this.ItemImgListener = () => {
    //   refresh();
    // }

    // this.$bus.$on("itemImageLoad", this.ItemImgListener);
  },
  // 组件重新活跃时回到离开前的滚动位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  // 保存离开组件前的滚动距离
  deactivated() {
    // 1.保存 Y 值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.ItemImgListener)
  },
  methods: {
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },

    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 点击回到顶部
    // backtopClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    // "点击回顶部"组件的显示和隐藏
    backtopshow(position) {
      // 1.判断 BackTop 是否显示
      if (position.y <= -1840) {
        this.backupshow = true;
      } else {
        this.backupshow = false;
      }
      // 2.决定 tabControl 是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // tabControl 的吸顶效果
    // 获取 tabControl 的 offsetTop
    // 所有的组件都有一个属性 $el：用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
};
</script>

<style scoped>
*{
  touch-action: pan-y;
}
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: relative; */
  /* left: 0;
  right: 0;
  top: 0; */
  /* z-index: 7; */
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}

/* .content {
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>
