<template>
  <div class="cart-list">
    <scroll class="scroll" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index"/>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Scroll from "@/components/common/scroll/Scroll.vue";
import CartListItem from "@/views/cart/childComps/CartListItem.vue";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: 100%;
    overflow: hidden;
  }
  .scroll {
    height: 100%;
  }
</style>
