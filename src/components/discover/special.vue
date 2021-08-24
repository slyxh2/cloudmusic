<template>
  <div id="special">
    <van-row>
      <van-col span="11"
               v-if="specialList[1]"
               @click="handleClick(specialList[1])">
        <img :src="specialList[1].picUrl"
             class="small-img">
        <div>{{specialList[1].name}}</div>
      </van-col>
      <van-col span="11"
               offset="1"
               v-if="specialList[2]"
               @click="handleClick(specialList[2])">
        <img :src="specialList[2].picUrl"
             class="small-img">
        <div>{{specialList[2].name}}</div>
      </van-col>
    </van-row>
    <van-row v-if="specialList[0]">
      <van-col span="24"
               @click="handleClick(specialList[0])">
        <img :src="specialList[0].picUrl"
             class="big-img">
        <div>{{specialList[0].name}}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  created () {
    this.getSpecialList()
  },
  data () {
    return {
      specialList: []
    }
  },
  methods: {
    async getSpecialList () {
      const { data: result } = await this.$http.get('/personalized/privatecontent')
      this.specialList = result.result
      //console.log(result)
    },
    handleClick (item) {
      //this.$store.commit('setNewMVId', item.id)
      window.sessionStorage.setItem('MVId', item.id)
      this.$router.push('/video')
    }
  }
}
</script>

<style lang="less" scoped>
#special {
  width: 100%;
  padding: 0 0 1em 0;
}
.small-img {
  width: 48vw;
  height: 15vh;
}
.big-img {
  width: 100%;
  height: 20vh;
}
</style>