<template>
  <div class="all">
    <van-search placeholder="请输入搜索关键词"
                class="search"
                v-model="searchValue"
                @search="onSearch"
                show-action
                @cancel="onCancel">
    </van-search>

    <div class="search-result"
         v-if="searchFlag">
      <van-row class="song-block"
               v-for="(item, index) in searchResult"
               :key="index">
        <van-col span="2"
                 @click="playSong(item, index)">
          <span class="count">{{index + 1}}</span>
        </van-col>
        <van-col span="20"
                 @click="playSong(item, index)">
          <div class="song-container">
            <span v-if="item.name">{{item.name}}</span>
            <sub class="sub-name">{{item.artists[0].name}}-{{item.album.name}}</sub>
          </div>
        </van-col>
        <van-col span="2">
          <van-icon name="play-circle-o"
                    class="mv-play"
                    v-if="item.mvid"
                    @click="playMV(item.mvid)" />
        </van-col>

      </van-row>
    </div>
    <div class="hot-search"
         v-else>
      <div>热门搜索</div>
      <van-tag round
               size="large"
               type="primary"
               v-for="(item, index) in hotSearch"
               :key="index"
               color="#717ff9"
               class="hot-item"
               @click="clickHotSearch(item.first)">
        {{item.first}}
      </van-tag>
    </div>

  </div>
</template>

<script>
export default {
  name: 'search',
  beforeRouteEnter (to, from, next) {
    if (from.name === 'player') {
      to.meta.isBack = true
      //console.log('player')
    }
    next()
  },
  activated () {
    //console.log('acs')
    if (!this.$route.meta.isBack) {
      //console.log('22')
      this.getHotSearch()
    }
    this.$route.meta.isBack = false
  },
  created () {
    this.getHotSearch()
    //console.log('22')
  },
  data () {
    return {
      hotSearch: [],
      searchValue: '',
      searchResult: [],
      searchFlag: false,
      idList: []
    }
  },
  methods: {
    async getHotSearch () {
      const { data: result } = await this.$http.get('/search/hot')
      //console.log(result)
      this.hotSearch = result.result.hots
    },
    async onSearch () {
      this.searchFlag = true
      const { data: result } = await this.$http.get(`/search?keywords=${this.searchValue}&type=1`)
      //console.log(result)
      this.searchResult = result.result.songs
      this.searchResult.forEach(item => {
        this.idList.push(item.id)
      })
      //console.log(this.searchResult)
    },
    onCancel () {
      this.searchFlag = false
    },
    playMV (MVId) {
      this.$store.commit('setNewMVId', MVId)
      window.sessionStorage.setItem('MVId', this.$store.getters.getMVId)
      this.$router.push('/video')
    },
    playSong (song, index) {
      this.$store.commit('setSongId', song.id)
      this.$store.commit('setSongList', this.idList)
      this.$store.commit('setSongIndex', index)
      this.$store.commit('setDurationTime', song.duration)
      this.$router.push('/player')
    },
    clickHotSearch (item) {
      this.searchValue = item
      this.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: absolute;
  top: 3em;
  width: 100%;
}
.hot-search {
  position: absolute;
  top: 7em;
}
.hot-item {
  margin: 0.3em;
  font-size: 1em;
}
.search-result {
  position: absolute;
  top: 7em;
}
.count {
  display: block;
  padding: 0 1em 0 0;
}
.sub-name {
  display: block;
  color: #888;
}
.song-list {
  width: 100%;
  padding: 0 0 0 0.7em;
}
.song-block {
  display: flex;
  align-items: center;
  width: 100vw;
  border-bottom: 0.1px solid #888;
  border-left: none;
  border-right: none;
}
.song-container {
  padding: 0.5em 0 0 0;
}
</style>