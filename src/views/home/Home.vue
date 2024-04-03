<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center"><h2>购物街</h2></div>
    </nav-bar>
    <tab-control class="tab-control"
                 ref="tabControl1"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper ref="homeSwiper" :banners="banners" @swiperImageLoad="imageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control ref="tabControl2"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView.vue";
import HomeFeatureView from "@/views/home/childComps/HomeFeatureView.vue";

import NavBar from "@/components/common/navBar/NavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";


import {
  getHomeMultiData,
  getHomeGoods
} from "@/network/home";

import {backTopMixin, itemListenerMixin} from "@/common/mixins";

export default {
  name: "Home",
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:1, list:[]},
        'new': {page:1, list:[]},
        'sell': {page:1, list:[]},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
  created() {
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    //1.请求多个数据
    this.getHomeMultiData()
//3.监听item中图片加载完成
  },
  activated() {
    this.$refs.homeSwiper.startSwiper()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.$refs.homeSwiper.stopSwiper()
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    imageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      this.listenerShowBackTop(position)
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    //网络请求
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        this.$refs.homeSwiper.startInit()
      }).catch(err => {
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = res.data.page + 1
        this.$refs.scroll.finishPullUp()
      }).catch(err => {
        this.$refs.scroll.finishPullUp()
      })
    }
  },
}
</script>

<style scoped>
  #home {
    height: 100vh;
    width: 100vw;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    //position: fixed;
    //left: 0;
    //right: 0;
    //top: 0;
    //bottom: 0;
    //z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
