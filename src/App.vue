<template>
  <div id="app" class="app">
    <keep-alive include="Home,Category,Cart,Profile">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "@/components/content/MainTabBar/MainTabBar.vue";

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import "assets/css/base.css";
</style>
