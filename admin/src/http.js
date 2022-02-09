import axios from "axios"

const http = axios.create({
    // baseURL:"http://localhost:3000/admin/api"
    baseURL:process.env.VUE_APP_API_URL || '/admin/api'
})

import Vue from "vue"
import router from './router'

//设定请求拦截器
http.interceptors.request.use(function (config) {
    if(localStorage.token){//防止传递错误数据,jwt.verify报错
        config.headers.Authorization = 'Bearer ' + (localStorage.token)
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

//设定响应拦截器
http.interceptors.response.use(res => {
    return res
},err => {
    if(err.response.data.message){
        Vue.prototype.$message.error(err.response.data.message)//$message是elui挂在实例上的方法
        if(err.response.status === 401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http