export const getters = {
  cartListLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  totalPrice(state) {
    return state.cartList.filter(item => item.checked).reduce((preprice, item) => {
      return preprice + item.realPrice * item.count;
    }, 0);
  },
  cartCount(state) {
    return state.cartList.length;
  },
  screenAll(state) {
    if(state.cartList.length) {
      return !state.cartList.find(item => !item.checked);
    } else {
      return false;
    }
    
  },
  goCountUp(state) {
    if(state.cartList.length === 0) {
      return true;
    } else {
      return !state.cartList.find(item => item.checked);
      
    }
  }

}