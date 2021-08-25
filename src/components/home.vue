<template>
  <div>
    <!-- 导航栏部分 -->
    <van-nav-bar>
      <template #left>
        <van-icon name="more-o"
                  size="20"
                  color="#fff"
                  @click="showAuthor" />
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
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
    <!-- 页尾 -->
    <van-tabbar v-model="active"
                ref="barRef"
                @change="handelChange">
      <van-tabbar-item icon="home-o"
                       to="/discover">发现音乐</van-tabbar-item>
      <van-tabbar-item icon="search"
                       to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="/user">帐号</van-tabbar-item>
    </van-tabbar>
    <van-overlay :show="show"
                 @click="show = false">
      <div class="wrapper"
           @click.stop>
        <author></author>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import author from './author/author.vue'
export default {
  created () {
    //console.log('home')
  },
  updated () {
    if (window.sessionStorage.getItem('activeIndex')) {
      this.active = parseInt(window.sessionStorage.getItem('activeIndex'))
    } else {
      this.active = 0
    }
  },
  components: {
    'author': author
  },
  data () {
    return {
      active: 0,
      show: false
    }
  },
  methods: {
    handelChange () {
      window.sessionStorage.setItem('activeIndex', this.active)
    },
    goPlayer () {
      this.$router.push('/player')
    },
    showAuthor () {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
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