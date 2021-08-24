<template >
  <div>
    <!-- 歌单开头部分 -->
    <div class="top-body">
      <div class="bg bg-blur"
           :style="{backgroundImage: 'url(' + listInf.playlist.coverImgUrl + ')' }"
           v-if="listInf.playlist.coverImgUrl"></div>
      <div class="top-main">
        <nav class="nav-bar">
          <van-icon name="arrow-left"
                    class="return-arrow"
                    @click="goBack" />
          <div>歌 单</div>
          <van-icon name="bullhorn-o"
                    class="right-icon"
                    @click="goPlayer" />
        </nav>
        <div class="information">
          <img class="list-image"
               v-if="listInf.playlist.coverImgUrl"
               :src="listInf.playlist.coverImgUrl">
          <div class="details">
            {{listInf.playlist.name}}
            <div class="creator">
              <img :src="listInf.playlist.creator.avatarUrl"
                   class="avatarImg">
              <span>{{listInf.playlist.creator.nickname}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <main class="song-list">
      <song-list :songList="songInf"></song-list>
    </main>
  </div>
</template>

<script>
import song from './song.vue'
export default {
  name: 'list',
  beforeRouteEnter (to, from, next) {
    //console.log(this.$route.meta)
    if (from.name === 'player') {
      to.meta.isBack = true
      //console.log('22')
    }
    next()
  },
  activated () {
    //console.log('acs')
    if (!this.$route.meta.isBack) {
      //console.log('22')
      this.getListInf()
    }
    this.$route.meta.isBack = false
  },
  components: {
    'song-list': song
  },
  created () {
    this.getListInf()
    //console.log('created')
  },
  data () {
    return {
      listInf: {},
      songInf: []
    }
  },
  methods: {
    async getListInf () {
      if (this.cookie) {
        const c = encodeURIComponent(this.cookie)
        //const { data: result } = await this.$http.post(`/playlist/detail?cookie=${c}&id=${this.listId}`)
        const { data: result } = await this.$http.get(`/playlist/detail?id=${this.listId}&cookie=${c}`)
        //console.log(result)
        this.listInf = result
        this.songInf = result.playlist.trackIds
      } else {
        const { data: result } = await this.$http.get(`/playlist/detail?id=${this.listId}`)
        this.listInf = result
        this.songInf = result.playlist.trackIds
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    goPlayer () {
      this.$router.push('/player')
    }
  },
  computed: {
    listId: function () {
      return window.sessionStorage.getItem('listId')
    },
    cookie: function () {
      return window.sessionStorage.getItem('cookie')
    }
  }
}
</script>

<style lang="less" scoped>
.song-list {
  position: absolute;
  top: 35%;
  width: 100%;
}
.top-body {
  color: #fff;
}
.top-main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.bg {
  height: 15em;
  text-align: center;
  line-height: 600px;
  z-index: -1;
}

.bg-blur {
  float: left;
  width: 100%;
  //background-size: cover;
  background-size: 150% 150%;
  filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
}

.return-arrow {
  color: black;
  display: inline-block;
  position: absolute;
  left: 0.5em;
  top: 1em;
}
.right-icon {
  color: black;
  display: block;
  position: absolute;
  right: 0.5em;
  top: 1em;
}
.nav-bar {
  width: 100%;
  text-align: center;
  font-size: 1.17em;
  padding: 1em 0 0 0;
}
.information {
  padding: 2em 0 0 0;
}
.list-image {
  width: 8em;
  height: 8em;
  padding: 0 0 2em 1em;
}
.avatarImg {
  width: 2em;
  height: 2em;
  border-radius: 50%;
  transform: translateY(20%);
}
.information {
  display: flex;
}
.details {
  padding: 1.5em 0 0 2em;
}
.creator {
  display: flex;
  align-items: baseline;
  padding: 1em 0 0 0;
}
</style>