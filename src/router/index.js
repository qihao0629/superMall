import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from "@/views/home/Home.vue";
// import Category from "@/views/category/Category.vue";
// import Cart from "@/views/cart/Cart.vue";
// import Profile from "@/views/profile/Profile.vue";

//懒加载形式
const Home = () => import('@/views/home/Home.vue')
const Category = () => import('@/views/category/Category.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Profile= () => import('@/views/profile/Profile.vue')
const Detail= () => import('@/views/detail/Detail.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const VueRouterPush = VueRouter.prototype.push
const VueRouterReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => {
    console.log(err);
  })
}
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

export default router
