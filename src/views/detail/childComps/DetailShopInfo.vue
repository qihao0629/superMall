<template>
  <div class="detail-shop">
    <div class="shop-title">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="detail-middle">
      <div class="middle-item middle-left">
        <div class="sales-count">
          <div class="sales">{{shop.cSells | sellCountFilter}}</div>
          <div class="sales-des">总销量</div>
        </div>
        <div class="goods-count">
          <div class="goods">{{shop.cGoods}}</div>
          <div class="goods-des">全部宝贝</div>
        </div>
      </div>
      <div class="middle-item middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
  .detail-shop {
    padding: 25px 8px;
  }
  .shop-title {
    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }
  .shop-title img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }
  .shop-title .title {
    margin-left: 10px;
    vertical-align: center;
  }
  .detail-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .middle-item {
    flex: 1;
  }
  .middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .sales-count, .goods-count {
    font-size: 18px;
  }
  .sales-des, .goods-des {
    margin-top: 10px;
    font-size: 12px;
  }
  .middle-right {
    font-size: 13px;
    color: #333;
  }
  .middle-right table {
    width: 120px;
    margin-left: 30px;
  }
  .middle-right table td {
    padding: 5px 0;
  }
  .middle-right .score {
    color: #5ea732;
  }
  .middle-right .score-better {
    color: #f13e3a;
  }
  .middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }
  .middle-right .better-more span {
    background-color: #f13e3a;
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }
  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }

</style>
