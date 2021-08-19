<template>
  <div class="song-list">
    <van-row class="song-block"
             v-for="(item, index) in songInf"
             :key="index">
      <van-col span="2">
        <span class="count">{{index + 1}}</span>
      </van-col>
      <van-col span="20">
        <div class="song-container">
          <span v-if="item.songs">{{item.songs[0].name}}</span>
          <sub class="sub-name">{{item.songs[0].ar[0].name}}-{{item.songs[0].al.name}}</sub>
        </div>
      </van-col>
      <van-col span="2">
        <van-icon name="play-circle-o"
                  class="mv-play"
                  v-if="item.songs[0].mv" />
      </van-col>

    </van-row>
  </div>
</template>

<script>
export default {
  name: 'song',
  props: ["songList"],
  data () {
    return {
      songInf: []
    }
  },
  created () {
    this.getSong()
  },
  methods: {
    getSong () {
      this.songList.forEach(async item => {
        const { data: result } = await this.$http.get(`/song/detail?ids=${item.id}`)
        this.songInf.push(result)
      })
      console.log(this.songInf)
    }
  }
}
</script>

<style lang="less" scoped>
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
  //padding: 0 0 0.8em 0;
  // border: 1px solid red;
  width: 100%;
  border-bottom: 0.1px solid #888;
  border-left: none;
  border-right: none;
}
.song-container {
  padding: 0.5em 0 0 0;
}
</style>