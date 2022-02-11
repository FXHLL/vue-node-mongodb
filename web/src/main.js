import Vue from 'vue'
import App from './App.vue'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
// Vue.use(VueAwesomeSwiper, {  
//   // 小圆点
//   pagination: {
//     el: '.swiper-pagination'
//   },
//   autoplay:true,
//   // 循环播放
//   loop: true 
// })
import './assets/scss/vivify.min.css'
import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

import router from './router'

Vue.config.productionTip = false

import CardList from './components/CardList.vue'
Vue.component('my-card-list',CardList)

import Card from './components/Card.vue'
Vue.component('my-card',Card)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  // baseURL:'http://localhost:3000/web/api'
  baseURL:process.env.VUE_APP_API_URL || '/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
