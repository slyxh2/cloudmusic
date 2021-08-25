<template>
  <div id="author">
    <h1 style="text-align: center">联 系 作 者</h1>
    <div class="top">
      <!-- <img src="../../assets/author.jpg"
           class="avatar"> -->
      <a href="https://sm.ms/image/sP6H5WfjDgO7xoy"
         target="_blank"><img src="https://i.loli.net/2021/08/25/sP6H5WfjDgO7xoy.jpg"
             class="avatar"></a>
      <h3>Patrick Huang</h3>
    </div>
    <div class="contact">
      <img src="../../assets/wechat.png"
           class="icon"
           @click="show"
           v-if="!flag">
      <img src="../../assets/active_wechat.png"
           class="icon"
           @click="show"
           v-else>
      <a href="https://gitee.com/patrick-huang"
         target="_blank">
        <img src="../../assets/gitee.png"
             class="icon">
      </a>
      <a href="https://github.com/slyxh2"
         target="_blank">
        <img src="../../assets/github.png"
             class="icon">
      </a>
    </div>
    <div class="QR-container">
      <!-- <img src="../../assets/QR.png"
           class="QR"
           v-if="flag"> -->
      <a href="https://sm.ms/image/pfklUGuNxhywHM1"
         target="_blank"><img src="https://i.loli.net/2021/08/25/pfklUGuNxhywHM1.png"
             alt="QR.png"
             class="QR"
             v-if="flag"></a>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false
    }
  },
  methods: {
    show () {
      this.flag = !this.flag
    }
  }
}
</script>

<style lang="less" scoped>
#author {
  background-color: #717ff9;
  width: 50vw;
  height: 100vh;
  color: white;
  position: absolute;
  top: 0;
}
.avatar {
  width: 5em;
  height: 5em;
  border-radius: 50%;
}
.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5em;
}
.icon {
  width: 2em;
  height: 2em;
}
.contact {
  display: flex;
  justify-content: space-evenly;
  padding-top: 3em;
}
.QR {
  width: 12em;
  height: 12em;
  padding-top: 1em;
}
.QR-container {
  display: flex;
  justify-content: center;
}
</style>