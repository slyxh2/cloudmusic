<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in swipeImg"
                      :key="index">
        <img v-lazy="image"
             width="100%" />
      </van-swipe-item>
    </van-swipe>
    <!-- 推荐歌单 -->
    <div class="small-title">
      <span style="color: #717ff9; font-size: 1.2em">推荐歌单</span>
      <van-icon name="arrow"
                color="#717ff9" />
    </div>
    <div class="recommand-container">
      <div id="recommand"
           v-for="(item, index) in recommandList"
           :key="index">
        <img :src="item.uiElement.image.imageUrl"
             class="recommandImg"
             @click="showList(item)">
        <span>{{item.uiElement.mainTitle.title}}</span>
      </div>
    </div>
    <!-- 独家放送 -->
    <div class="small-title">
      <span style="color: #717ff9; font-size: 1.2em">独家放送</span>
      <van-icon name="arrow"
                color="#717ff9" />
    </div>
    <special></special>
    <router-view name="player"></router-view>
  </div>
</template>

<script>
import special from './special.vue'
export default {
  name: 'discover',
  components: {
    'special': special
  },
  mounted () {
    this.getImg()
  },
  data () {
    return {
      homeInf: {},
      swipeImg: [],
      recommandList: []
    }
  },
  methods: {
    async getImg () {
      const { data: result } = await this.$http.get('/homepage/block/page')
      this.homeInf = result.data
      //console.log(result.data)
      if (result.code !== 200) return this.$toast.fail('加载信息失败，请刷新重试')
      // get swipe image
      result.data.blocks[0].extInfo.banners.forEach(el => {
        this.swipeImg.push(el.pic)
      })
      this.recommandList = result.data.blocks[1].creatives
    },
    showList (item) {
      this.$store.commit('setNewListId', item.creativeId)
      window.sessionStorage.setItem('listId', this.$store.getters.getListId)
      this.$router.push('/list')
    }
  }
}
</script>

<style>
.recommand-container {
  height: 20em;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-between;
  padding: 0 0 3em 0;
}
.samll-title {
  display: inline-block;
  color: #717ff9;
}
.van-swipe {
  position: absolute;
  top: -3em;
}
.van-swipe__track {
  height: 9.8em !important;
  padding: 0;
  margin: 0;
}
.van-swipe__indicators {
  bottom: 1em !important;
}
.recommandImg {
  width: 8em;
  height: 8em;
}
#recommand {
  width: 33.3333%;
}
</style>