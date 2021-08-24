<template>
  <div>
    <input type="range"
           class="bar"
           ref="barRef"
           min="0"
           :max="duration"
           :value="current"
           step="1"
           @change="handleChange">
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    duration () {
      const durationTime = this.$store.getters.getDurationTime
      const d = this.calculateDuration(durationTime)
      return d
    },
    current () {
      const currentTime = this.$store.getters.getCurrentTime
      const c = this.calculateCurrent(currentTime)
      return c
    }
  },
  methods: {
    calculateDuration (e) {
      var time = new Date(e)
      return time.getMinutes() * 60 + time.getSeconds()
    },
    calculateCurrent (e) {
      e = Math.floor(e)
      const min = Math.floor(e / 60)
      const sec = e % 60
      return min * 60 + sec
    },
    handleChange () {
      //const durationTime = this.$store.getters.getDurationTime
      //const currentTime = this.$store.getters.getCurrentTime
      //const newTime = this.$refs.barRef.value / 100 * this.duration
      //console.log()
      this.$store.commit('changeState')
      this.$store.commit('setNewTime', this.$refs.barRef.value)
    }
  }
}
</script>

<style lang="less" scoped>
.bar {
  width: 75vw;
}
</style>