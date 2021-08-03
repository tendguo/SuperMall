<template>
  <div ref="wrapper" class="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: 'BScroll',
  data() {
    return {
      scroll: null,
      
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
      
    })

    if(this.probeType == 2||this.probeType == 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('getPosition', position);
      })
    }

    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })
    }
  },
  methods: {
    scrollTop(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    }
  }
  
}
</script>

<style scoped>
  .wrapper {
    height: 100vh;
  }
</style>