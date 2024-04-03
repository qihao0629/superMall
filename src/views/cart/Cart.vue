<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar/>
  </div>
</template>

<script>
//直接引用vuex中的getter方法。
import {mapGetters} from "vuex";

import NavBar from "@/components/common/navBar/NavBar.vue";
import CartList from "@/views/cart/childComps/CartList.vue";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar.vue";

export default {
  name: "Cart",
  mounted() {

  },
  computed: {
    //直接引用原有名字
    ...mapGetters(['cartLength']),
    //映射方法名字
    // ...mapGetters({
    //   length: "cartLength"
    // })
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
  .cart-list {
    height: calc(100% - 44px - 49px - 40px)
  }
</style>
