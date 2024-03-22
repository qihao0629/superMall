<template>
  <div id="tab-bar" :style="tabBarStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    pBackGroundColor: {
      type: String,
      default(){
        return '#006666'
      }
    }
  },
  computed : {
    tabBarStyle() {
      return {backgroundColor : this.pBackGroundColor}
    }
  }
}
</script>

<style scoped>

  #tab-bar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -3px 1px rgba(0,0,0,0.2);
  }

</style>
