<template>
  <div class="Boss-slide" ref="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
    name: "SwiperItem",
	}
</script>

<style scoped>
  .Boss-slide {
    width: 100%;
    flex-shrink: 0;
  }

  .Boss-slide img {
    width: 100%;
  }
</style>
