<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in swipeImg"
                      :key="index">
        <img v-lazy="image"
             class="swipe-img" />
      </van-swipe-item>
    </van-swipe>
    <div class="blank"></div>
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
    <div class="special">
      <div class="small-title">
        <span style="color: #717ff9; font-size: 1.2em;">独家放送</span>
        <van-icon name="arrow"
                  color="#717ff9" />
      </div>
      <special></special>
    </div>

    <!-- 推荐MV -->
    <mv></mv>
  </div>
</template>

<script>
import special from './special.vue'
import mv from './mv.vue'
export default {
  name: 'discover',
  activated () {
    //console.log('acs')
  },
  components: {
    'special': special,
    'mv': mv
  },
  created () {
    this.isFirstEnter = true
    //console.log('created')
  },
  mounted () {
    this.getImg()
  },
  data () {
    return {
      homeInf: {},
      swipeImg: [],
      recommandList: [],
      isFirstEnter: false
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
.van-swipe {
  position: absolute;
  top: 2.8em;
  width: 100vw;
  height: 22vh;
}
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

.recommandImg {
  width: 8em;
  height: 8em;
}
#recommand {
  width: 33.3333%;
}
.special {
  padding: 1em 0 0 0;
}
.blank {
  width: 100vw;
  height: 25vh;
  background-color: #fff;
}
.swipe-img {
  width: 100vw;
  height: 22vh;
}
</style>