import {addCart} from "@/store/actions-types";

export default {
  [addCart]: function (context, payload) {
    return new Promise((resolve, reject) => {
      let product = context.state.carts.find(item => item.iid === payload.iid)
      if (product) {
        context.commit('addCartGoodsCounter', product)
        resolve('添加商品数量加1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加商品成功')
      }
    })
  }
}
