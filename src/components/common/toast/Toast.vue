<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false,
      timer:null
    }
  },
  methods: {
    show(message, duration = 2000) {
      this.isShow = true
      this.message = message
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 13px;
    color: white;
    background-color: rgba(0,0,0,0.75);
    border-radius: 7px;
    z-index: 1000000;
  }
</style>
