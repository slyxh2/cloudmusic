<template>
  <div class="controller"
       v-if="songInf[0]">
    <div class="bg bg-blur"
         :style="{backgroundImage: 'url(' + songInf[0].al.picUrl + ')' }"></div>
    <div class="top-bar">
      <van-row>
        <van-col span="4">
          <van-icon name="arrow-left"
                    class="return-arrow"
                    size="1.5em"
                    @click="goBack" />
        </van-col>
        <van-col span="10"
                 offset="3">
          <div v-if="songInf[0]"
               class="title">
            <div>{{songInf[0].name}}</div>
            <div class="sub-title">{{songInf[0].ar[0].name}}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div v-if="songInf[0]"
         class="cover-image-container">
      <img :src="songInf[0].al.picUrl"
           class="cover-image">
    </div>
    <div>
      <span>{{currentTime | formatTime}}</span>
      <div>{{songInf[0].dt | formatDuration}}</div>
    </div>
    <div class="control-bar"
         v-if="flag">
      <img src="../../assets/last.png"
           class="next-last"
           @click="lastSong">
      <img src="../../assets/play.png"
           class="play"
           @click="play"
           v-if="!isPlay">
      <img src="../../assets/pause.png"
           class="play"
           @click="play"
           v-else>
      <img src="../../assets/next.png"
           class="next-last"
           @click="nextSong">
    </div>

  </div>
</template>

<script>
export default {
  created () {
    this.getSongInf()
  },
  data () {
    return {
      songInf: [],
      flag: true,
      trigger: 1
    }
  },
  computed: {
    songId () {
      return this.$store.getters.getSongId
      //return window.sessionStorage.getItem('songId')
    },
    isPlay () {
      return this.$store.getters.getPlayState
    },
    currentTime () {
      return this.$store.getters.getCurrentTime
    }
  },
  watch: {
    trigger () {
      this.$nextTick(() => {
        this.flag = true
        this.getSongInf()
      })
    }
  },
  filters: {
    formatTime (e) {
      e = Math.floor(e)
      const min = Math.floor(e / 60)
      const sec = e % 60 + ''
      const nSec = sec.padStart(2, '0')
      return `${min}:${nSec}`
    },
    formatDuration (e) {
      var time = new Date(e)
      return `${time.getMinutes()}:${time.getSeconds()}`
    }
  },
  methods: {
    play () {
      this.$store.commit('changePlayState')
    },
    async getSongInf () {
      const { data: result } = await this.$http.get(`/song/detail?ids=${this.songId}`)

      this.songInf = result.songs
      //console.log(this.songInf)
    },
    goBack () {
      this.$router.go(-1)
    },
    nextSong () {
      this.trigger += 1
      const list = this.$store.getters.getSongList
      var newIndex = this.$store.getters.getSongIndex + 1
      if (newIndex === list.length) {
        newIndex = 0
      }
      this.$store.commit('setSongIndex', newIndex)
      const nextSong = list[newIndex]
      this.$store.commit('setSongId', nextSong)
    },
    lastSong () {
      this.trigger += 1
      const list = this.$store.getters.getSongList
      var newIndex = this.$store.getters.getSongIndex - 1
      if (newIndex < 0) {
        newIndex = list.length
      }
      this.$store.commit('setSongIndex', newIndex)
      const nextSong = list[newIndex]
      this.$store.commit('setSongId', nextSong)
    }
  }
}
</script>

<style lang="less" scoped>
.return-arrow {
  color: black;
  display: inline-block;
  padding: 0.5em 0 0 0.5em;
}
.sub-title {
  font-size: 0.8em;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover-image {
  width: 20em;
  height: 20em;
  border-radius: 50%;
}
.cover-image-container {
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.control-bar {
  text-align: center;
}
.next-last {
  width: 15%;
  padding: 0 2em;
}
.play {
  width: 20%;
  transform: translateY(10%);
}
</style>