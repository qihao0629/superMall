<template>
  <swiper ref="swiper">
    <swiper-item v-for="(item, index) in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
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
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad")
        this.isLoad = true
      }
    },
    startInit() {
      this.$refs.swiper.startInit()
    },
    startSwiper() {
      this.$refs.swiper.startTimer()
    },
    stopSwiper() {
      this.$refs.swiper.stopTimer()
    }
  },
  components: {Swiper, SwiperItem}
}
</script>

<style scoped>

</style>
