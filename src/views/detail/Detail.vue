<template>
  <div id="detail">
    <!-- <h2>
      {{this.$route.params.iid}}
    </h2> -->
    <detail-nav-bar :datas="['商品', '参数', '评论', '推荐']" 
                    class="nav-bar" 
                    @getItemPositions="getItemPositions"
                    ref="nav"
                    ></detail-nav-bar>
    <b-scroll class="content" ref="scroll" @getPosition="getPosition">
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-goods :goods="goods"></detail-goods>
      <detail-shop :shop="shops"></detail-shop>
      <detail-info :detailInfo="detailInfos" @imageLoad="imageLoad"></detail-info>
      <detail-param :paramInfo="paramInfos" ref="param"></detail-param>
      <detail-comment ref="comment" :commentInfo="detailcomments"></detail-comment>
      <good-list :goods="detailcommands" ref="list"></good-list>
    </b-scroll>
    <back-top @click.native="backTop" v-show="isShowTab"></back-top>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
    

  </div>
</template>

<script>
import BScroll from 'components/common/bscroll/BScroll';
import GoodList from 'components/content/goodlist/GoodList';


import DetailNavBar from './childCopms/DetailNavBar.vue';
import DetailSwiper from './childCopms/DetailSwiper.vue';
import DetailGoods from './childCopms/DetailGoods.vue';
import DetailShop from './childCopms/DetailShop.vue';
import DetailInfo from './childCopms/DetailInfo.vue';
import DetailComment from './childCopms/DetailComment.vue';
import DetailParam from './childCopms/DetailParam.vue';
import DetailBottomBar from './childCopms/DetailBottomBar.vue';

import {getDetail, getCommand, Goods, Shop, GoodsParam} from 'network/detail.js';
import {imgListener, backTop} from 'common/mixin.js';
import {debounce} from 'common/utils.js'
export default {
  name: 'Detail',
  components: {
    BScroll,
    GoodList,
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShop,
    DetailInfo,
    DetailComment,
    DetailParam,
    DetailBottomBar
  },
  mixins: [imgListener, backTop],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfos: {},
      paramInfos: {},
      detailcomments: {},
      detailcommands: [],
      positions: [],
      getPositions: {},
      
      // refreshNew: null

    }
  }, 
  created() {
    this.id = this.$route.params.iid;
    // 获取商品数据
    getDetail(this.id).then(res => {
      
      const data = res.result;

      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      
      this.shops = new Shop(data.shopInfo);

      this.paramInfos = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      this.detailInfos = data.detailInfo;

      if (data.rate.list) {
        this.detailcomments = data.rate.list[0];
      }

      this.getPositions = debounce(() => {
        this.positions.push(0);
        this.positions.push(this.$refs.param.$el.offsetTop);
        this.positions.push(this.$refs.comment.$el.offsetTop);
        this.positions.push(this.$refs.list.$el.offsetTop);
        this.positions.push(Number.MAX_VALUE);
        // console.log(this.positions);
      })


      
      // this.refreshNew = debounce(this.$refs.scroll.refresh, 500);
    });
    getCommand().then(res => {
      // console.log(res);
      this.detailcommands = res.data.list;
    })

  },
  
  destroyed() {
    this.$bus.$off('imageLoad', this.refreshUp);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getPositions();
    },
    getPosition(position) {
      this.listenerBackTop(position);



      let length = this.positions.length;
      let positionY = -position.y
      // console.log(positionY)
      for (let i = 0; i < length-1; i++) {
        // if (this.currentIndex !== i && (positionY >= this.positions[i] && positionY < this.positions[i+1])) {
          
        //     this.currentIndex = i;
        //     console.log(this.currentIndex)
        //     this.$refs.nav.curindex = this.currentIndex
            
        //   }


        // 逻辑无敌！！！！
           if(this.currentIndex !== i && positionY >= this.positions[i]){
            
             this.$refs.nav.curindex = i;
            
           }
        }
    },
    getItemPositions(index) {
      this.$refs.scroll.scrollTop(0, (-this.positions[index]));
    },
    addToCart() {
      const products = {};

      products.iid = this.id;
      products.imgURL = this.topImages[0];
      products.title = this.goods.title;
      products.desc = this.goods.desc;
      products.realPrice = this.goods.realPrice;

      this.$store.dispatch('addCart', products).then(res => {
        this.$toast.show(res, 2000);
      })
    }
    
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .nav-bar {
    position: relative;
    

    z-index: 9;
  }
  .bottom-bar {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
  }
</style>