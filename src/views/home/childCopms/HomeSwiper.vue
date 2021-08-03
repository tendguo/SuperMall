<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgFinish">
      </a>
    </swiper-item>
  </swiper>

</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'


export default {
  name: 'HomeSwiper',
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
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imgFinish() {
      if(!this.isLoad) {
        this.$emit('imgFinish');
        this.isLoad = true;
      }
      
    }
  }
}
</script>


  