<template>
  <div id="sort">
    <nav-bar class="nav-bar">
      <div slot="middle">商品分类</div>
    </nav-bar>
    <div class="contentarea">
      
      <sort-menu :menuInfo="sortList" @itemClick="itemClickOne"></sort-menu>
      
      <div id="tab-content" ref="scroll">
        <sort-content :contentLists="subSortList"></sort-content>
        <tab-control :datas="['综合', '新品', '热销']" @itemClick="itemClick" class="tab"></tab-control>
        <good-list :goods="goodsData" class="good-list"></good-list>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabcontrol/TabControl';
import GoodList from 'components/content/goodlist/GoodList'

import SortMenu from './childCopms/SortMenu.vue';
import SortContent from './childCopms/SortContent.vue'

import {getSort, getSubSort, getSortDetail} from 'network/sort.js'
import BScroll from '../../components/common/bscroll/BScroll.vue';
export default {
  name: 'Sort',
  components: {
    NavBar,
    TabControl,
    GoodList,
    SortMenu,
    SortContent,
    BScroll
  },
  data() {
    return {
      sortList: [],
    
      curindex: -1,
      subSortList: [],
      sortListDetails: {
        'pop' : { list: [] },
        'new' : { list: [] },
        'sell' : { list: [] }
      },
      tabname: 'pop'
    }
  },
  created() {
    this.getSort();
  },
  computed: {
    goodsData() {
      return this.sortListDetails[this.tabname].list;
    }
  },
  methods: {
    getSort() {
      getSort().then(res => {
        // console.log(res);
        this.sortList = res.data.category.list;
        // console.log(this.sortList);
        // console.log(this.sortList[0].maitKey);

        this.getSubSort(0);
      })
    },
    getSubSort(index) {
      this.curindex = index;
      let mkey = this.sortList[index].maitKey;
      // console.log(mkey);
      getSubSort(mkey).then(res => {
        // console.log(res);
        // console.log(this.curindex);
        this.subSortList = res.data.list;
        // console.log(this.subSortList);
      })
      this._getSortDetail("pop");
      this._getSortDetail("new");
      this._getSortDetail("sell");
    },
    _getSortDetail(type) {
      // console.log(this.curindex);
      let miniWallkey = this.sortList[this.curindex].miniWallkey;
      // console.log(miniWallkey);
      getSortDetail(miniWallkey, type).then(res => {
        // console.log(res);
        this.sortListDetails[type].list = res;
        
        
      })
    },

    itemClickOne(index) {
      this.getSubSort(index);
    },
    itemClick(index) {
      switch (index) {
        case 0:
          this.tabname = 'pop'
          break;
        case 1:
          this.tabname = 'new'
          break;
        case 2:
          this.tabname = 'sell'
          break;
        default:
          break;
      }
    }
  }

}
</script>
<style scoped>
  #sort {
    height: 100vh;
  }
  
  

  .contentarea {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    
    flex: 1;
  }
  .good-list {
    width: 275px;
  }

  .tab{
    position: sticky;
    top: 0;
    z-index: 9;
    background-color: #fff;
  }
</style>

