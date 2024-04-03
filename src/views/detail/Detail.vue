<template>
  <div id="detail">
    <detail-nav-bar ref="detailNavBar" @titleClick="titleClick"/>
    <scroll class="scroll" ref="scroll" @scroll="contentScroll">
      <detail-swiper ref="detailSwiper" :top-images="topImages" @loadImage="imageLoad"></detail-swiper>
      <detail-bases-info ref="detailBaseInfo" :goods="goods"></detail-bases-info>
      <detail-shop-info ref="detailShopInfo" :shop="shop"></detail-shop-info>
      <detail-goods-info ref="detailGoodsInfo" :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="detailParamsInfo" :param-info="goodsParams"/>
      <detail-comment-info ref="detailCommentInfo" :comment-info="commentInfo"/>
      <detail-recommend-info ref="detailRecommendInfo" :recommend-list="recommendList"/>
    </scroll>
    <detail-bottom-bar class="detail-bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar.vue";
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper.vue";
import DetailBasesInfo from "@/views/detail/childComps/DetailBasesInfo.vue";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo.vue";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo.vue";
import DetailRecommendInfo from "@/views/detail/childComps/DetailRecommendInfo.vue";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar.vue";

import {backTopMixin, itemListenerMixin} from "@/common/mixins";
import {debounce} from "@/common/utils";
import {addCart} from "@/store/actions-types";
import {mapActions} from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {
        type: Object,
        default() {
          return {}
        }
      },
      shop: {
        type: Object,
        default() {
          return {}
        }
      },
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommendList:[],
      getThemeTopY:null,
      themeTopYs:[],
      currentIndex: 0,
    }
  },
  created() {
    this.iid = this.$route.query.iid
    this.getThemeTopY = debounce(() => {
      if (this !== undefined &&
        this.themeTopYs !== undefined) {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.detailParamsInfo ? this.$refs.detailParamsInfo.$el.offsetTop : 0)
        this.themeTopYs.push(this.$refs.detailCommentInfo ? this.$refs.detailCommentInfo.$el.offsetTop : 0)
        this.themeTopYs.push(this.$refs.detailRecommendInfo ? this.$refs.detailRecommendInfo.$el.offsetTop : 0)
        this.themeTopYs.push(Number.MAX_VALUE)
      }
    },200)
  },
  mounted() {
    this.loadData()
  },

  methods: {
    ...mapActions([addCart]),
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],0)
    },
    addToCart() {
      console.log('-----');
      const goods = {}
      goods.iid = this.iid
      goods.title = this.goods.title
      goods.price = this.goods.lowNowPrice
      goods.desc = this.goods.desc
      goods.image = this.topImages[0]
      // this.$store.dispatch(addCart, goods).then(res => {
      //   console.log(res)
      // })
      this.addCart(goods).then(res => {
        this.$toast.show(res)
      })


    },
    contentScroll(position){
      this.listenerShowBackTop(position)
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = i
        }
      }
    },
    imageLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    /**加载数据*/
    loadData() {
      getDetail(this.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        this.shop = new Shop(res.result.shopInfo)
        this.detailInfo = res.result.detailInfo
        this.goodsParams = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
        if (res.result.rate.cRate !== 0){
          this.commentInfo = res.result.rate.list[0]
        }else {
          this.commentInfo = {}
        }
        this.$refs.detailSwiper.startInit()
      }).catch(err => {

      })
      getRecommend().then(res => {
        this.recommendList = res.data.list
      }).catch(err => {

      })
    }
  },

  watch: {
    $route (to, from) {
      this.iid = to.query.iid
      this.loadData()
      this.$refs.scroll.scrollTo(0,0,0)
    },
  },
  mixins: [itemListenerMixin,backTopMixin],
  components: {
    DetailRecommendInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBasesInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
