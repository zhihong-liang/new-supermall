<template>
    <swiper class="detail-swiper">
      <swiper-item class="detail-swiper-item" v-for="(item,index) in topImage" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }

  .detail-swiper-item img{
    margin-left: 122px;
    width: 200px;
    height: 300px;
    max-width: 100%;
    max-height: 100%;
  }
</style>