import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from "./http"
Vue.prototype.$http = http  //定义一个在Vue原型上的方法，使得在任意界面使用this.$http

Vue.mixin({
  methods:{//实例中每个组件都可以使用的代码块
    getHeaders(){
      return {Authorization:`Bearer ${localStorage.token || ''}`}
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
