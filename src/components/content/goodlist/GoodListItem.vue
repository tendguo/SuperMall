<template>
  <div class="goods-item"> 
    <div class="goods-info">
      <img v-lazy="showImg" @load="imageLoad" @click="goDetail">
      <p>{{goodlist.title}}</p>
      <span class="price">{{goodlist.price}}</span>
      <span class="collect">{{goodlist.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodlist: {
      type: Object,
      default() {
        return null
      }
    }
  },
  computed: {
    showImg() {
      return this.goodlist.image || this.goodlist.img || this.goodlist.showLarge.img;

    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('imageLoad');
      
    },
    goDetail() {
      // this.$toast.show('商品不存在', 2000);
      this.$router.push("/detail/" + this.goodlist.iid);
    }
  }
}
</script>
<style scoped>
  .goods-item {
    padding-bottom: 10px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    /* position: absolute; */
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>