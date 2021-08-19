<template>
  <div>
    <!-- 导航栏部分 -->
    <van-nav-bar left-arrow
                 left-text="返回"
                 @click-left="goBack">

      <template #title>
        <h3 style="color: #fff">手机号登录</h3>
      </template>
    </van-nav-bar>
    <van-form @submit="handleSubmit">
      <van-field v-model="loginData.phone"
                 label="手机号"
                 placeholder="请输入手机号"
                 :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="loginData.password"
                 type="password"
                 label="密码"
                 placeholder="请输入密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit"
                    color="#717ff9">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginData: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    async handleSubmit () {
      const result = await this.$http.post('/login/cellphone', this.loginData)
      console.log(result)
    }
  }
}
</script>

<style lang="less">
@nav-bar-icon-color: #fff;
@nav-bar-text-color: #fff !important;
.van-nav-bar {
  background-color: #717ff9 !important;
  margin-bottom: 3em;
}
.van-icon-arrow-left {
  color: #fff;
}
</style>