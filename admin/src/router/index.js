import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'//引入组件页面
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'//引入组件页面
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{isPublic:true}//
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {path:'/categories/create',component:CategoryEdit},//定义子组件切换规则
      {path:'/categories/list',component:CategoryList},
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},//编辑分类也使用新建分类页面  
      {path:'/items/create',component:ItemEdit},
      {path:'/items/list',component:ItemList},
      {path:'/items/edit/:id',component:ItemEdit,props:true},//编辑分类也使用新建分类页面  
      {path:'/heroes/create',component:HeroEdit},
      {path:'/heroes/list',component:HeroList},
      {path:'/heroes/edit/:id',component:HeroEdit,props:true},//编辑分类也使用新建分类页面 
      {path:'/articles/create',component:ArticleEdit},
      {path:'/articles/list',component:ArticleList},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},//编辑分类也使用新建分类页面  
      {path:'/ads/create',component:AdEdit},
      {path:'/ads/list',component:AdList},
      {path:'/ads/edit/:id',component:AdEdit,props:true},//编辑分类也使用新建分类页面  
      {path:'/admin_users/create',component:AdminUserEdit},
      {path:'/admin_users/list',component:AdminUserList},
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true}
      
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,form,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/Login')
  }
  next()
})//路由守卫

export default router
