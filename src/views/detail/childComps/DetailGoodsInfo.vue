<template>
  <div class="goods-info">
    <div class="info-desc">
      <div class="start"/>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"/>
    </div>
    <div class="info-key">{{detailImage.key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailImage.list" v-lazy="item" :key="index" @load="imageLoad" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$emit('imageLoad')
    }
  },
  computed: {
    detailImage() {
      if (this.detailInfo && this.detailInfo.detailImage) {
        return this.detailInfo.detailImage[0]
      }else {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::after, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
