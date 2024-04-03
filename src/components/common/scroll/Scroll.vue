<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<!--
  ref如果是绑定在组件中的，那么通过this.$refs.name获取的是一个组件对象
  ref如果是绑定在普通元素中，那么通过this.$refs.name获取的是一个元素对象
-->
<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bs: null
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      // 这个属性目前虽然也能解决scroll滑动的问题，但是切换页面的时候，会触发上拉加载的方法，不知道是什么问题，待探索
      // observeDOM: true,
      probeType: this.probeType,

      click: true,
      pullUpLoad: this.pullUpLoad
    })
    if (this.probeType === 2 || this.probeType ===3) {
      this.bs.on('scroll', (position) => {
        this.$emit('scroll',position)
      })
    }
    if (this.pullUpLoad) {
      this.bs.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //scrollTo（x, y, time(ms))
      this.bs && this.bs.scrollTo && this.bs.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.bs && this.bs.finishPullUp && this.bs.finishPullUp()
    },
    refresh() {
      this.bs.refresh()
    },
    getScrollY() {
      return this.bs.y ? this.bs.y : 0
    }
  }
}
</script>

<style scoped>

</style>
