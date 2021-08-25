<template>
  <div id="app">
    <transition :name="transitionName"
                mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && !$route.meta.list"
                     class="view"></router-view>
        <router-view v-if="$route.meta.keepAlive && $route.meta.list"
                     class="view"
                     :key="key"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"
                   class="view"></router-view>
    </transition>

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
      transitionName: ''
    }
  },
  computed: {
    key () {
      return this.$store.getters.getListId
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      //console.log(this.transitionName)
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

.view {
  width: 100%;
  position: absolute;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
