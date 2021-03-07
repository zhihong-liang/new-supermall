<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in homerecommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    homerecommends: {
      type: Array,
      dafault() {
        return []
      }
    }    
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 15px 0 30px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item{
    flex: 1;
  }

  .recommend-item img {
    width: 90px;
    height: 90px;
    margin-bottom: 10px;
  }
</style>
