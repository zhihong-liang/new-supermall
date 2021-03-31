<template>
  <div id="category-tab-content">
    <div class="category-tab-item" v-for="(item,index) in tabcontent" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="item-title">
          <span>{{item.title}}</span>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategoryTabContent',
  props: {
    tabcontent: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>
<style scoped>
  #categort-tab-content {
    width: 100%;
  }

  .category-tab-item {
    width: 81px;
    margin: 5px 5px 0 0;
    font-size: 12px;
    text-align: center;

    display: inline-block;
  }

  .category-tab-item img {
    width: 80%;
  }

  .category-tab-item .item-title {
    margin-top: 15px;
  }

</style>