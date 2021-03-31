<template>
  <scroll class="content">
    <div class="tab-menu">
      <div class="tabmenu-list">
        <div class="tabmenu-list-item" 
            v-for="(item,index) in categories" 
            :key="index"
            :class="{actived: currentindex === index}"
            @click="btnClick(index)">
            {{item.title}}
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'TabMenu',
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentindex: 0
    }
  },
  components: {
    Scroll
  },
  methods: {
    btnClick(index) {
      this.currentindex = index;
      this.$emit('getItemData', index)
    }
  }
}
</script>
<style scoped>
  .content {
    height: calc(100vh - 44px - 49px);
    background-color: #f6f6f6;
  }

  .tab-menu {
    height: 100%;
    width: 100px;
  }
  
  .tabmenu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .actived {
    background-color: #fff;
    color: var(--color-tint);
    border-left: 5px solid var(--color-tint);
    color: var(--color-tint);
    font-weight: bolder;
  }
</style>