<template>
  <nav-bar>
    <div slot="middle" class="middle">购物车({{cartListLength}})</div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import {mapGetters} from 'vuex';
export default {
  name: 'CartNavBar',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartListLength'])
  }
}
</script>

<style scoped>
  .middle {
    color: #fff;
  }
</style>