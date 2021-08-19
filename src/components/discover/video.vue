<template>
  <div>
    <van-icon name="arrow-left"
              class="return"
              @click="handleClick" />
    <video class="mv-play"
           controls="controls"
           :src="MVUrl"></video>
    <div class="intro">
      <span class="padding-top">{{MVInf.name}}</span>
      <van-row class="padding-top">
        <van-col span="18"
                 class="play-count">
          歌手： {{MVInf.artistName}}
        </van-col>
        <van-col span="6"
                 class="play-count">
          播放：{{(MVInf.playCount / 10000).toFixed(2)}}万
        </van-col>
      </van-row>
      <span class="play-count padding-top">发行：{{MVInf.publishTime}}</span>
    </div>
    <span class="padding-top">相关推荐 ></span>
    <van-row v-for="(item, index) in similiarMV"
             :key="index"
             class="similiar"
             @click="playMV(item.id)">
      <van-col span="10">
        <img :src="item.cover"
             class="similiar-cover">
      </van-col>
      <van-col span="14"
               class="flex-box">
        <div class="similiar-title">
          <div>{{item.name}}</div>
          <div class="play-count">{{item.artistName}}</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  created () {
    this.getMV()
    this.getSimiliar()
  },
  data () {
    return {
      MVInf: {},
      MVUrl: '',
      similiarMV: []
    }
  },
  computed: {
    MVId: function () {
      return this.$store.getters.getMVId
      console.log(this.$store.getters.getMVId)
    }
  },
  methods: {
    async getMV () {
      const { data: result } = await this.$http.get(`/mv/detail?mvid=${this.MVId}`)
      this.MVInf = result.data
      const { data: res } = await this.$http.get(`/mv/url?id=${this.MVId}`)

      this.MVUrl = res.data.url
    },
    async getSimiliar () {
      const { data: result } = await this.$http.get(`/simi/mv?mvid=${this.MVId}`)
      //console.log(result)
      this.similiarMV = result.mvs
    },
    playMV (MVId) {
      //console.log(MVId)
      this.$store.commit('setNewMVId', MVId)
      //console.log('22')
      //this.$router.go(0)
    },
    handleClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.return {
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  z-index: 1;
}
.mv-play {
  width: 100%;
  height: 30%;
}
.play-count {
  color: #888;
  font-size: 0.8em;
}
.padding-top {
  display: block;
  padding-top: 1em;
}
.similiar-cover {
  height: 5em;
  width: 10em;
}
.similiar {
  padding: 0.2em 0 0 0.4em;
}
.similiar-title {
  padding: 1em 0 0 0;
}
</style>