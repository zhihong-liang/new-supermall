<template>
  <div>
    <div class="shopcart-list">
      <shopcart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"/>
    </div>
  </div>
</template>

<script>
import ShopcartListItem from "./ShopcartListItem"

import { mapGetters } from "vuex"

export default {
  name: "ShopcartList",
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  components: {
    ShopcartListItem
  }
}
</script>
<style scoped>
  
</style>