<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners">
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      //默认值要用函数
      default() {
        return []
      }
    }
  },
  components: {Swiper, SwiperItem}
}
</script>

<style scoped>

</style>
