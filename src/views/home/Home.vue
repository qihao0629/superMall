<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center"><h2>购物街</h2></div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pulling-type="false" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control"
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
import BackTop from "@/components/content/backTop/BackTop.vue";

import {
  getHomeMultiData,
  getHomeGoods
} from "@/network/home";


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
    BackTop
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
      isShowBackTop: false
    }
  },
  created() {

    //1.请求多个数据
    this.getHomeMultiData()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
//3.监听item中图片加载完成
    // this.$bus.$on('itemImageLoad', () => {
    //   this.$refs.scroll.refresh()
    //   console.log('图片加载完成')
    // })
  },
  methods: {
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
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },
    loadMore() {
      console.log('上啦加载了')
      this.getHomeGoods(this.currentType)
    },
    //网络请求
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }).catch(err => {
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = res.data.page + 1
        console.log(this.goods[type].list);
        // this.$refs.scroll.finishPullUp()
      }).catch(err => {
        // this.$refs.scroll.finishPullUp()
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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
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
