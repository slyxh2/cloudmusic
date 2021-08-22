<template >
  <div>
    <!-- 歌单开头部分 -->
    <div class="top-body">
      <div class="bg bg-blur"
           :style="{backgroundImage: 'url(' + listInf.playlist.coverImgUrl + ')' }"
           v-if="listInf"></div>
      <div class="top-main">
        <nav class="nav-bar">
          <van-icon name="arrow-left"
                    class="return-arrow"
                    @click="goBack" />
          <div>歌 单</div>
          <van-icon name="bullhorn-o"
                    class="right-icon" />
        </nav>
        <div class="information">
          <img class="list-image"
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
  components: {
    'song-list': song
  },
  created () {
    this.getListInf()
  },
  data () {
    return {
      listInf: {},
      songInf: []
    }
  },
  methods: {
    async getListInf () {
      const { data: result } = await this.$http.get(`/playlist/detail?id=${this.listId}`)
      this.listInf = result
      //console.log(this.listInf)
      //this.getSongInf()
      this.songInf = result.playlist.trackIds
      //console.log(this.songInf)
    },
    goBack () {
      this.$router.push('/discover')
    }
  },
  computed: {
    listId: function () {
      return window.sessionStorage.getItem('listId')
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