<template>
  <div id="app">
    <keep-alive include="list discover">
      <router-view></router-view>
    </keep-alive>
    <player class="player"></player>
  </div>
</template>
<script>
import player from './components/player/player.vue'

export default {
  components: {
    'player': player
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
}
.player {
  display: none;
}
</style>
