import { debounce } from "./utils";
import BackTop from 'components/content/backtop/BackTop';


export const imgListener = {
  data() {
    return {
      refreshUp: null
    }
  },
  mounted() {
    this.refreshUp = debounce(this.$refs.scroll.refresh, 100);
    
    this.$bus.$on('imageLoad', this.refreshUp);
  }
}

export const backTop = {
  components: {
    BackTop
  },

  data() {
    return {
      isShowTab: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTop(0, 0, 500);
    },
    listenerBackTop(position) {
      this.isShowTab = -position.y > 1000;
    }
  }
}