import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import music from '../components/music/music.vue'
import login from '../components/user/login.vue'
import mobileLogin from '../components/user/mobile_login'
import discover from '../components/discover/discover.vue'
import list from '../components/discover/list.vue'
import video from '../components/discover/video.vue'
import player from '../components/player/controller.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/home', component: home, redirect: '/discover', children: [{path: '/discover', component: discover}, 
  {path: '/music', component: music}]},
  {path: '/login', component: login}, {path: '/mobile', component: mobileLogin},
  {path: '/list', component: list}, {path: '/video', component: video},
  {path: '/player', component: player}
]

const router = new VueRouter({
  routes
})

export default router
