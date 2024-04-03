import {addCartGoodsCounter, addToCart} from "@/store/mutations-types";

export default {
  //mutations唯一的目的是修改state中的状态
  //mutations中的每个方法尽可能的完成的事件比较单一
  [addCartGoodsCounter](state, payload){
    payload.count++
  },
  [addToCart](state, payload){
    payload.checked = true
    state.carts.push(payload)
  }
}
