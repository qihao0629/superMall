<template>
  <div>
    <tab-bar p-back-ground-color="#e6e6e6">
      <tab-bar-item path="/home" p-active-color="coral">
        <img slot="item-icon" src="@/assets/img/tabBar/home.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabBar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="@/assets/img/tabBar/category.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabBar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="@/assets/img/tabBar/cart.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabBar/cart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="@/assets/img/tabBar/profile.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabBar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import tabBar from "@/components/common/tabBar/TabBar.vue";
import tabBarItem from "@/components/common/tabBar/TabBarItem.vue";

export default {
  name: "MainTabBar",
  components: {tabBarItem, tabBar}
}
</script>

<style scoped>

</style>
