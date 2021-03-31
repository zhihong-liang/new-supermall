<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>

    <div class="category-list content">
      <!-- 侧边菜单栏 -->
      <tab-menu :categories="categorymenu" @getItemData="getItemData"/>

      <!-- 中间内容栏 -->
      <scroll class="tab-content" ref="scroll">
        <div>
          <!-- 内容栏中的推荐 -->
          <category-tab-content class="category-tab-left" :tabcontent="categoryData"/>

          <!-- 内容栏中的控制栏 -->
          <tab-control :titles="['综合','新品','销量']" @tabClick="tabclick"/>

          <!-- 内容栏中的推荐内容 -->
          <category-goods-list :goods="showGoods"></category-goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from 'components/common/tabmenu/TabMenu'
import CategoryTabContent from './childcomps/CategoryTabContent'
import TabControl from 'components/content/tabControl/TabControl'
import CategoryGoodsList from 'components/content/goods/GoodsList'

import Scroll from "components/common/scroll/Scroll";

import { itemListenerMixin, backTopMixin } from "common/mixin"
import { debounce } from 'common/utils'

import { getCateMenu,getCategories,getCategoriesData } from "network/category"

export default {
  name: "Category",
  data() {
    return {
      categorymenu: [],
      categoryData: [],
      categoryrecommend: {
        pop: [],
        new: [],
        sell: []
      },
      currentindex: 0,
      currentpage: 'pop'
    }
  },
  components: {
    Scroll,
    NavBar,
    TabMenu,
    CategoryTabContent,
    TabControl,
    CategoryGoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  created(){
    this._getCateMenu();
  },
  mounted() {
  },
  computed: {
    showGoods() {
      return this.categoryrecommend[this.currentpage];
    }
  },
  methods: {
    /**
     * 网络相关的操作
     */
    _getCateMenu() {
      getCateMenu().then((res) => {
        this.categorymenu = res.data.category.list
        this.getItemData(0);
      })

    },
    getItemData(index) {
      this.currentindex = index; 
      const mailKey = this.categorymenu[index].maitKey;
      getCategories(mailKey).then(res => {
        this.categoryData = res.data.list
      })
      this.getRecommend('pop');
      this.getRecommend('new');
      this.getRecommend('sell');
    },
    getRecommend(type) {
      const miniWallkey = this.categorymenu[this.currentindex].miniWallkey;
      getCategoriesData(miniWallkey, type).then(res => {
        this.categoryrecommend[type] = res
      })
    },

    /**
     * 页面点击的事件
     */
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentpage = 'pop';
          break;
        case 1:
          this.currentpage = 'new';
          break;
        case 2:
          this.currentpage = 'sell';
          break;
      }
    }
  },
};
</script>

<style scoped>
*{
  touch-action: pan-y;
}
#category {
  height: 100vh;
}

.category-nav {
  background-color: var(--color-tint);
  color: #fff;
  left: 0;
  right: 0;
  top: 0;
}

.category-list{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  /* height: 100%; */

  display: flex;
  overflow: hidden;
}

.tab-content{
  flex: 1;
  height: calc(100vh - 44px - 49px);
  background-color: #fff;
}

.category-tab-left {
  padding: 20px 8px;
}
</style>
