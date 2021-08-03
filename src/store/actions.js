

export const actions = {
  addCart(context, payload) {
    
    return new Promise((resolve, reject) => {
      let oldProducts = context.state.cartList.find(item => item.iid === payload.iid);

      if(oldProducts) {
        context.commit('addCount', oldProducts);
        resolve('添加购物车成功');
      } else {
        payload.count = 1;
        context.commit('addToCart', payload);
        resolve('添加购物车成功');
      }
    })

  }
}