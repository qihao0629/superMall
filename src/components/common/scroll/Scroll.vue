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
      default: 0
    },
    pullingType: {
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
      // 这个属性也能解决scroll滑动的问题
      observeDOM: true,
      probeType: this.probeType,
      click: true,
      pullUpLoad: false
    })
    this.bs.on('scroll', (position) => {
      this.$emit('scroll',position)
    })
    this.bs.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
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
      this.bs && this.bs.refresh && this.bs.refresh()
    }
  }
}
</script>

<style scoped>

</style>
