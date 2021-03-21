import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  // 添加到购物车
  addCart(context, payload) {
    // 第一种方式
    // let oldProduct = null;
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }

    return new Promise((resolve, reject) => {
      // 第二种方式：查找之前数组中是否有该商品
      let product = context.state.cartList.find(item => item.iid === payload.iid)

      if (product) {
        // product.count += 1;
        context.commit(ADD_COUNTER, product)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}