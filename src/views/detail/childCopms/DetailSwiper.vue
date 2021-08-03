<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in banners" :key="item.id">
      <img :src="item">
    </swiper-item>
  </swiper>

</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'


export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
    
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  }
  
}
</script>

<style scoped>
  .detail-swiper {
      height: 300px;
      overflow: hidden;
    }
</style>


  