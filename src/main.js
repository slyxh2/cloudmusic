import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import {button, NavBar, Toast, Icon, Field, Grid, GridItem, Tabbar, TabbarItem, Form, Swipe, SwipeItem, Lazyload  } from 'vant'
import 'vant/lib/index.less'
import axios from 'axios'

Vue.use(button)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Field)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)


axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
