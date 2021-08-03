<template>
  <div class="tab-control">
    <div v-for="(item, index) in datas" 
        :key="item.key"
        
        @click="itemClick(index)"
        
        class="tab-item">
        <span :class="{active: curindex === index}">{{item}}</span>

    </div>
  </div>
</template>

<script>


export default {
  name: 'TabControl',
  
  props: {
    datas: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
     curindex: 0
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
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  
  }
  .tab-item {
    flex: 1;
    
  }
  .tab-item span {
    padding: 5px;
  }
  .active { color: var(--color-high-text);
    border-bottom: 2px solid var(--color-tint);
   
  }
  

</style>