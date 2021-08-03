<template>
  <div id="home">
      <!-- 导航栏 -->
      <nav-bar id="nab-bar">
        <div slot="middle" class="middle">购物街</div>
      </nav-bar>
      <tab-control :datas="['流行', '新款', '精选']" 
                    @itemClick="itemClick" 
                    class="tab"
                    ref="tab1"
                    v-show="isShow"></tab-control>
      <!-- 滚动区域使用better-scroll -->
      <b-scroll class="content"
                ref="scroll"
                :probeType="3"
                :pullingUp= "true"
                @getPosition="getPosition"
                @pullingUp="pullingUp"
               >
        <home-swiper :banners="banner" class="newSwiper" @imgFinish="imgFinish"></home-swiper>
        <home-recommend :recommends="recommend"></home-recommend>
        <feature-view></feature-view>
        <tab-control :datas="['流行', '新款', '精选']" 
                      @itemClick="itemClick" 
                      ref="tab2"
                      ></tab-control>
        <good-list :goods="goodsName"></good-list>
        
      </b-scroll>
      <back-top @click.native="backTop" v-show="isShowTab"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import BScroll from 'components/common/bscroll/BScroll';
import TabControl from 'components/content/tabcontrol/TabControl';
import GoodList from 'components/content/goodlist/GoodList';


import HomeSwiper from './childCopms/HomeSwiper.vue';
import HomeRecommend from './childCopms/HomeRecommend.vue';
import FeatureView from './childCopms/FeatureView.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js';
import {imgListener, backTop} from 'common/mixin.js';


export default {
  name: 'Home',
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': { page: 1, list:[] },
        'new': { page: 1, list:[] },
        'sell': { page: 1, list:[] }

      },
      tabname: 'pop',
      
      tabPosition: 0,
      isShow: false,
      leavePosition: 0
      
    }
  },

  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    BScroll,
    TabControl,
    GoodList,
    
  },
  mixins: [imgListener, backTop],
  created() {
    // 请求轮播图数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

   
    
  },
 
  // 记录离开时的位置
  deactivated() {
    this.leavePosition = this.$refs.scroll.scroll.y;

    this.$bus.$off('imageLoad', this.refreshUp);    
  },
  // 回到之前浏览的位置
  activated() {
    this.$refs.scroll.scrollTop(0, this.leavePosition,0);
    this.$refs.scroll.refresh();
  },
  computed: {
    goodsName() {
      return this.goods[this.tabname].list;
    }
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        
        this.recommend = res.data.recommend.list;
        // console.log(this.recommend);
      })
    },
    getHomeGoods(type) {
      let page = this.goods[type].page;
      
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        page++;

        this.$refs.scroll.finishPullUp();
      })

    },
    itemClick(index) {
      switch (index) {
        case 0:
         this.tabname = 'pop'
          break;
        case 1:
          this.tabname = 'new';
          break;
        case 2:
          this.tabname = 'sell';
          break;
      }

        this.$refs.tab1.curindex = index
        this.$refs.tab2.curindex = index
    },
    getPosition(position) {
      this.listenerBackTop(position);
      
      this.isShow = -position.y > this.tabPosition;
    
    },
    pullingUp() {
      this.getHomeGoods(this.tabname);
    },
    imgFinish() {
      this.tabPosition = this.$refs.tab2.$el.offsetTop;
      
    }
  }

}
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }
  #home .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .middle {
    color: #fff;
  }
  #nab-bar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;
    
  }
  .tab{
    position: relative;
    top: 44px;
    z-index: 9;
    background-color: #fff;
  }
  
  

</style>

