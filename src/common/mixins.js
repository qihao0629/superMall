import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop.vue";
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImageListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  deactivated() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  }
}


export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}
