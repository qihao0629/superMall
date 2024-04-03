<template>
  <div class="detail-swiper">
    <swiper class="swiper" ref="swiper">
      <swiper-item class="swiper-item" v-for="item in topImages">
        <img :src="item" alt="" @load="loadImage">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
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
    startInit() {
      setTimeout(() => {
        this.$refs.swiper.startInit()
      },0)
    },
    loadImage() {
      if (!this.isLoad){
        this.$emit('loadImage')
        this.isLoad = true
      }
    }
  },
  components: {
    Swiper,SwiperItem
  }
}
</script>

<style scoped>
  .swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
