<template>
  <div id="mv">
    <div class="small-title">
      <span style="color: #717ff9; font-size: 1.2em">推荐MV</span>
      <van-icon name="arrow"
                color="#717ff9" />
    </div>
    <div class="main">
      <van-row v-for="(item, index) in mvList"
               :key="index"
               class="mv-block"
               @click="playMV(item.id)">
        <van-col span="12">
          <img :src="item.picUrl"
               class="cover">
        </van-col>
        <van-col span="12">
          <div class="name">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>

  </div>
</template>

<script>
export default {
  created () {
    this.getMV()
  },
  data () {
    return {
      mvList: []
    }
  },
  methods: {
    async getMV () {
      const { data: result } = await this.$http.get('/personalized/mv')
      //console.log(result)
      this.mvList = result.result
      //console.log(this.mvList)
    },
    playMV (MVId) {
      this.$store.commit('setNewMVId', MVId)
      window.sessionStorage.setItem('MVId', this.$store.getters.getMVId)
      this.$router.push('/video')
    }
  }
}
</script>

<style lang="less" scoped>
#mv {
  padding-bottom: 4em;
}
.cover {
  width: 12em;
  height: 8em;
}
.name {
  padding: 1em 0 0 0;
}
.mv-block {
  padding: 0 0 0.2em 0;
}
</style>