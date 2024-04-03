import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from "@/components/common/toast";

import loading from "@/assets/img/common/placeholder.png"

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: require('@/assets/img/common/error.png'),//图片错误的替换图片路径(可以使用变量存储)
  loading: loading,//正在加载的图片路径(可以使用变量存储)
  // attempt: 1
})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)


//解决客户端点击300ms延迟
FastClick.attach(document.body)
//使用懒加载插件


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
