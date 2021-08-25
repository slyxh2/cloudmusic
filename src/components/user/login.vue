<template>
  <div>
    <h2 class="title">茗 心 云 音 乐</h2>
    <van-button round
                type="info"
                plain
                hairline
                :block="true"
                to="mobile">手机登录</van-button>
    <span class="guest"
          @click="guestIn">游客进入
      <van-icon name="arrow" />
      <van-icon name="arrow" />
    </span>
    <div class="intro">
      <span>此项目数据基于网易云音乐，您可以登录您的网易云帐号</span>
      <span>仅供学习！！！</span>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    guestIn () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
  height: 15vh;
  width: 15vh;
}
.title {
  color: #717ff9;
  margin-top: 4em;
}
.van-button {
  border-color: #717ff9;
  color: #717ff9;
  margin-top: 3em;
  width: 80%;
}
.guest {
  color: #717ff9;
  cursor: pointer;
  margin-top: 2em;
  font-size: 0.9em;
}
.intro {
  padding-top: 1em;
  color: #717ff9;
}
</style>