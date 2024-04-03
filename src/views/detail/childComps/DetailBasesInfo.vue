<template>
  <div class="detail-base">
    <div class="detail-title">{{goods.title}}</div>
    <div class="detail-price">
      <span class="price">{{goods.price}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discountDesc" v-if="goods.discountDesc">{{goods.discountDesc}}</span>
    </div>
    <div class="detail-columns">
      <span v-for="item in goods.columns">{{item}}</span>
    </div>
    <div class="detail-services">
      <div class="services" v-for="columns in servicesColumns">
        <div class="service" v-for="service in goods.services.slice((columns-1)*3,(columns-1)*3+3)">
          <img :src="service.icon" alt="">
          <span>{{service.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBasesInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    servicesColumns(){
      if (this.goods && this.goods.services && this.goods.services.length) {
        return  Math.ceil(this.goods.services.length / 3)
      }else {
        return 0
      }
    }
  }
}
</script>

<style scoped>

  .detail-base {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .detail-title {
    color: #222;
  }
  .detail-price {
    margin-top: 10px;
  }
  .price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .old-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .discountDesc {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .detail-columns {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .detail-services {
    padding: 10px 5px;
  }

  .services {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
  }

  .detail-services img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
  .detail-services span {
    font-size: 13px;
    color: #333;
    height: 30px;
  }


</style>
