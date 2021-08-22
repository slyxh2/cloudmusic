<template>
  <div>
    <h1>player</h1>
    <audio controls="controls"
           id="player"
           :src="songURL"
           autoplay></audio>
  </div>
</template>

<script>
export default {
  name: 'player',
  computed: {
    isPlay () {
      return this.$store.getters.getPlayState
    },
    songURL () {
      return `https://music.163.com/song/media/outer/url?id=${this.$store.getters.getSongId}.mp3`
    }
  },
  watch: {
    isPlay () {
      this.playSong()
    }
  },
  mounted () {
    // console.log(this.isPlay)
  },
  methods: {
    playSong () {
      var player = document.getElementById('player')
      if (this.isPlay) {
        player.play()
      } else {
        player.pause()
      }
    }
  }

}
</script>

<style>
</style>