<template>
  <div class="bottom-menu">
    <CheckButton ref="check" class="select-all" :ischecked="screenAll" @click.native="allSelect"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span class="buy-product" @click="goCount">去计算({{cartCount}})</span>

    
  </div>
  
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton';
import {mapGetters} from 'vuex';
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['totalPrice', 'cartCount', 'screenAll', 'cartList', 'goCountUp'])
  },
  methods: {
    allSelect(){
      // let data = this.$refs.check.ischecked;
      // if(!data) {
      //   this.cartList.forEach(item => {
      //     item.checked = true;
      //   });
      // } else {
      //    this.cartList.forEach(item => {
      //     item.checked = false;
      //   });
      // }

      let data = this.screenAll;
      this.cartList.forEach(item => {
        item.checked = !data;
      })
    },
    goCount() {
      if(this.goCountUp) {
        this.$toast.show('请选中商品', 2000);
      }

    }
  }

}
</script>
<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
