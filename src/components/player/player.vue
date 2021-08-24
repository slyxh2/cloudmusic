<template>
  <div>
    <h1>player</h1>
    <audio controls="controls"
           id="player"
           :src="songURL"
           @timeupdate="timeUpdate"></audio>
  </div>
</template>

<script>
export default {
  updated () {
    var player = document.getElementById('player')
    player.play()
  },
  computed: {
    isPlay () {
      return this.$store.getters.getPlayState
    },
    songURL () {
      return `https://music.163.com/song/media/outer/url?id=${this.$store.getters.getSongId}.mp3`
    },
    currentTime () {
      return this.$store.getters.getCurrentTime
    },
    isChanging () {
      return this.$store.getters.getChangeState
    }
  },
  watch: {
    isPlay () {
      this.playSong()
    },
    isChanging () {
      var player = document.getElementById('player')
      player.pause()
      const newTime = this.$store.getters.getNewTime
      player.currentTime = newTime
      player.play()
    }
  },
  methods: {
    playSong () {
      var player = document.getElementById('player')
      if (this.isPlay) {
        player.play()
      } else {
        player.pause()
      }
    },
    timeUpdate (e) {
      this.$store.commit('setCurrentTime', e.target.currentTime)
    }
  }

}
</script>

<style>
</style>