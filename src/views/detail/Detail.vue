<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-image="topImages" />

      <detail-base-info :goods="goods" />

      <detail-shop-info :shopinfo="shop" />

      <detail-goods-info :details="detailInfo" @imageLoad="imageLoad" />

      <detail-param-info ref="params" :paramInfo="paramInfo" />

      <detail-comment-info ref="comment" :commentInfo="commentInfo" />

      <goods-list ref="recommend" :goods="commendgoods"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      commendgoods: [],
      themeTopYs: [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin],
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 800);
    },
  },
  created() {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid;

    // 2.根据 iid 请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.保存参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.commendgoods = res.data.list;
    });
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.ItemImgListener);
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>