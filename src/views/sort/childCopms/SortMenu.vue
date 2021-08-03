<template> 
  <div class="sort-content">
    
    <div class="sort-menu-item" 
    :class="{active: curindex === index}"
          v-for="(item, index) in menuInfo" 
          :key="index"
          @click="itemClick(index)">
          {{item.title}}
    </div>
    
  </div>
    
 
  
</template>

<script>
import BScroll from 'components/common/bscroll/BScroll'
export default {
  name: 'SortMenu',
  components: {
    BScroll
  },
  data() {
    return {
      curindex:0
    }
  },
  props: {
    menuInfo: {
      type: Array,
      default: []
    }
  },
  methods: {
    itemClick(index) {
      this.curindex = index;
      this.$emit('itemClick', index);
    }
  }
}
</script>
<style scoped>
  .sort-content {
    background-color: #f6f6f6;
    box-sizing: border-box;
    width: 100px;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    
  }
  ::-webkit-scrollbar {
	  width: 0px;
  }
  

  .sort-menu-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .sort-menu-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
