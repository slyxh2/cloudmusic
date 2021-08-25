import Vue from 'vue'
import VueRouter from 'vue-router'
//import home from '../components/home.vue'
const home = () => import(/* webpackChunkName: "g1" */ '../components/home.vue')
//import search from '../components/search/search.vue'
const search = () => import(/* webpackChunkName: "g1" */ '../components/search/search.vue')
//import login from '../components/user/login.vue'
const login = () => import(/* webpackChunkName: "g1" */ '../components/user/login.vue')
//import mobileLogin from '../components/user/mobile_login'
const mobileLogin = () => import(/* webpackChunkName: "g2" */ '../components/user/mobile_login')
//import discover from '../components/discover/discover.vue'
const discover = () => import(/* webpackChunkName: "g2" */ '../components/discover/discover.vue')
//import list from '../components/discover/list.vue'
const list = () => import(/* webpackChunkName: "g2" */ '../components/discover/list.vue')
//import video from '../components/discover/video.vue'
const video = () => import(/* webpackChunkName: "g3" */ '../components/discover/video.vue')
//import player from '../components/player/controller.vue'
const player = () => import(/* webpackChunkName: "g3" */ '../components/player/controller.vue')
//import user from '../components/user/user.vue'
const user = () => import(/* webpackChunkName: "g2" */ '../components/user/user.vue')

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},

  {path: '/home', component: home, redirect: '/discover', name: 'home', meta:{keepAlive: true, index: 3},
  children: [{path: '/discover', component: discover, name: 'discover', meta:{keepAlive: true, isBack: false, index: 3}}, 
  {path: '/search', component: search, name: 'search', meta:{keepAlive: true, isBack: false, index: 3}},
  {path: '/user', component: user, name: 'user', meta:{keepAlive: true, isBack: true, ls: false, index: 3}}]},

  {path: '/login', component: login, meta:{keepAlive: false, index: 1}},
  {path: '/mobile', component: mobileLogin, name:'mobile', meta: {index: 2}},
  {path: '/list', component: list, name: 'list', meta:{keepAlive: true, isBack: false, list: true, meta:{index: 4}}}, 
  {path: '/video', component: video, meta:{index: 4}},
  {path: '/player', component: player, name: 'player', meta:{index: 4}}
]

const router = new VueRouter({
  routes
})

export default router
