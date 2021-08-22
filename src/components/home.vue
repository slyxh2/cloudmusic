<template>
  <div>
    <!-- 导航栏部分 -->
    <van-nav-bar>
      <template #left>
        <van-icon name="more-o"
                  size="20"
                  color="#fff" />
      </template>
      <template #right>
        <van-icon name="bullhorn-o"
                  size="20"
                  color="#fff"
                  @click="goPlayer" />
      </template>
      <template #title>
        <h3 style="color: #fff">茗 心 云 音 乐</h3>
      </template>
    </van-nav-bar>
    <main>
      <router-view></router-view>

    </main>
    <!-- 页尾 -->
    <van-tabbar v-model="active"
                ref="barRef"
                @change="handelChange">
      <van-tabbar-item icon="home-o"
                       to="/discover">关于作者</van-tabbar-item>
      <van-tabbar-item icon="search"
                       to="/music">发现音乐</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="/user">帐号</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  updated () {
    if (window.sessionStorage.getItem('activeIndex')) {
      this.active = parseInt(window.sessionStorage.getItem('activeIndex'))
    } else {
      this.active = 0
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    handelChange () {
      window.sessionStorage.setItem('activeIndex', this.active)
    },
    goPlayer () {
      this.$router.push('/player')
    }
  }
}
</script>

<style lang="less" scoped>
iframe {
  position: fixed;
  bottom: 3em;
  margin: auto;
}
.van-tabbar {
  background-color: #717ff9;
}
.van-nav-bar {
  background-color: #717ff9 !important;
}
.search {
  border-radius: 40px;
  z-index: 10;
  width: 100%;
  height: 10% !important;
}
.van-nav-bar__left {
  padding: 0 0 0 10px;
}
</style>