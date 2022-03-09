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

Vue.directive('permission',{
  async bind(el){
    const res = await http.get('/getuser')
    const power = res.data.power
    if(power === "普通用户"){
      el.setAttribute('disabled',false)
      el.classList.add("ban")
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
