<template>
  <div id="app">
    <keep-alive include="list">
      <router-view v-if="$route.meta.keepAlive"
                   :key="key"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <player class="player"></player>
  </div>
</template>
<script>
import player from './components/player/player.vue'

export default {
  components: {
    'player': player
  },
  data () {
    return {
    }
  },
  computed: {
    key () {
      return this.$store.getters.getListId
    }
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
