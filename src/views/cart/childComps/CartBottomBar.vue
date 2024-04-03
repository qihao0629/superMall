<template>
  <div class="bottom-bar">
    <div class="check-block">
      <check-button class="check-box" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="total">
      合计：¥ {{totalPrice}}
    </div>
    <div class="calculate" @click="calculateClick">
      去计算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/views/cart/childComps/CheckButton.vue";
import {mapGetters} from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList','cartLength']),
    totalPrice() {
      return this.$store.state.carts.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartLength === 0) return false
      let isChecked = true
      for (const item of this.cartList) {
        if (!item.checked){
          return false
        }
      }
      return isChecked
      // return !this.cartList.find(item => !item.checked)
      // return !(this.cartList.filter(item => !item.checked).length > 0)
    }
  },
  methods: {
    checkClick() {
      // if (this.isSelectAll){
      //   this.cartList.forEach(item => item.checked = false)
      // }else {
      //   this.cartList.forEach(item => item.checked = true)
      // }
      let isCheckedAll = this.isSelectAll
      this.cartList.forEach(item => item.checked = !isCheckedAll)
    },
    calculateClick(){
      if (!this.checkLength) {
        this.$toast.show('请选则商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #e9e9e9;
  }
  .check-block {
    display: flex;
    align-items: center;
  }
  .check-block span {
    margin-left: 10px;
  }
  .check-box {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .total {
    margin-left: 20px;
  }
  .calculate {
    position: absolute;
    right: 0;
    padding:0 15px;
    color: white;
    background-color: red;
  }
</style>
