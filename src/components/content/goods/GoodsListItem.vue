<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img v-lazy="getImg" :key="getImg" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">¥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    goodsItemClick() {
      let iid = this.getIid
      this.$router.push({path: '/detail', query: {iid}})
    }
  },
  computed: {
    getImg() {
      return (this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img)
    },
    getIid() {
      return this.goodsItem.iid || this.goodsItem.item_id
    }
  }
}
</script>

<style scoped>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("@/assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
