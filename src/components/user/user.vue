<template>
  <div id="user">
    <template v-if="logState">
      <div class="top">
        <img :src="userInf.profile.avatarUrl"
             class="avatar"
             v-if="userInf.profile.avatarUrl">
        <div class="nickname">{{userInf.profile.nickname}}</div>
      </div>
      <div class="logout">
        <van-button type="danger"
                    @click="logout">退出登录</van-button>
      </div>

      <div class="small-title">
        <span style="color: #717ff9; font-size: 1.2em">歌单</span>
        <van-icon name="arrow"
                  color="#717ff9" />
      </div>
      <van-row v-if="songList"
               @click="showList(songList.id)">
        <van-col>
          <img :src="songList.coverImgUrl"
               class="cover">
        </van-col>
        <van-col v-if="songList"
                 class="title">
          <div>{{songList.name}}</div>
          <sub class="sub-name">{{songList.trackCount}}首，播放{{songList.playCount}}次</sub>
        </van-col>
      </van-row>
      <div class="small-title">
        <span style="color: #717ff9; font-size: 1.2em">收藏的歌单</span>
        <van-icon name="arrow"
                  color="#717ff9" />
      </div>
      <van-row v-for="(item, index) in likeList"
               :key="index"
               @click="showList(item.id)">
        <van-col>
          <img :src="item.coverImgUrl"
               class="cover">
        </van-col>
        <van-col v-if="item"
                 class="title">
          <div>{{item.name}}</div>
          <sub class="sub-name">{{item.trackCount}}首，播放{{item.playCount | formatTimes}}次</sub>
        </van-col>
      </van-row>
    </template>
    <template v-else>
      <h2 style="color: #717ff9; text-align: center;">您尚未登录</h2>
      <van-button round
                  type="info"
                  plain
                  hairline
                  :block="true"
                  to="mobile">手机登录</van-button>
    </template>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    //console.log(this.$route.meta)
    if (from.name === 'mobile') {
      to.meta.ls = true
      console.log('mobile')
    }
    next()
  },
  activated () {
    //console.log('acs')
    if (this.$route.meta.ls) {
      //console.log('22')
      this.getUserInf()
      this.$router.go(0)
      this.$route.meta.ls = false
    }

  },
  created () {
    this.getUserInf()
  },
  data () {
    return {
      userInf: {},
      songList: {},
      likeList: []
    }
  },
  computed: {
    logState () {

      return window.sessionStorage.getItem('cookie') ? true : false


    }
  },
  methods: {
    async getUserInf () {
      const c = window.sessionStorage.getItem('cookie')
      const cookie = encodeURIComponent(c)
      const { data: result } = await this.$http.get(`/login/status?cookie=${cookie}`)
      this.userInf = result.data
      //console.log(this.userInf)
      //if (!result.data.account) return this.$toast.fail('获取用户信息失败，请重新登录')

      const { data: res } = await this.$http.get(`/user/playlist?uid=${this.userInf.profile.userId}`)
      //console.log(res)
      this.songList = res.playlist[0]
      res.playlist.splice(0, 1)
      this.likeList = res.playlist
      //console.log(this.likeList)
    },
    showList (listId) {
      this.$store.commit('setNewListId', listId)
      window.sessionStorage.setItem('listId', this.$store.getters.getListId)
      this.$router.push('/list')
    },
    async logout () {
      this.$http.get('/logout')
      window.sessionStorage.removeItem('cookie')
      this.$store.commit('logout')
      this.$router.go('/discover')
    }
  },
  filters: {
    formatTimes (e) {
      e = parseInt(e)
      if (e > 100000000) {
        e = e / 100000000
        const nE = e.toFixed(2)
        return `${nE}亿`
      } else if (e > 10000) {
        e = e / 10000
        const nE = e.toFixed(2)
        return `${nE}万`
      } else {
        return e
      }
    }
  }
}
</script>

<style lang="less" scoped>
#user {
  padding-bottom: 4em;
}
.avatar {
  width: 6em;
  height: 6em;
  border-radius: 50%;
  padding: 0.5em;
}
.nickname {
  color: #717ff9;
}
.top {
  transform: translateY(-2em);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover {
  width: 4em;
  height: 4em;
}
.small-title {
  padding: 1em 0 1em 0;
}
.sub-name {
  display: block;
  padding-top: 0.5em;
  color: #888;
}
.title {
  padding: 0.5em 0 0 0.5em;
}
.logout {
  display: flex;
  justify-content: center;
}
</style>