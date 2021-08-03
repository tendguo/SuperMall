<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div slot="middle" class="middle">
        <div v-for="(item, index) in datas" :key="item.id" class="item" @click="itemClick(index)">
          <span :class="{active: curindex === index}">{{item}}</span>
        </div>
      </div>

    </nav-bar>
  </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
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
      curindex: 0,
      
    }
  },
  methods: {
    itemClick(index) {
      this.curindex = index;
      
      this.$emit('getItemPositions', index);
    },
    backClick() {
      this.$router.back();
    }
  }

}
</script>

<style scoped>
  .nav-bar {
    background-color: #fff;
  }
  .nav-bar img {
    margin-top: 13px;
  }
  .middle {
    display: flex;
  }
  .item {
    flex: 1;
    color: #666;
  }
  .active{
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-tint);
  }
  span{
    padding: 5px;
  }
</style>