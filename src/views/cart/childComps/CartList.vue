<template>
  <div id="cart-list">
    <b-scroll>
      <cart-list-item v-for="item in cartList" :key="item.id" :itemInfo="item"></cart-list-item>
    </b-scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue';
import BScroll from 'components/common/bscroll/BScroll';
import {mapGetters} from 'vuex';
export default {
  name: 'CartList',
  components: {
    CartListItem,
    BScroll
  },
  computed: {
    ...mapGetters(['cartList'])
  }

}
</script>