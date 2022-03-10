<template>
    <div>
        <el-container style="height: 100vh"><!-- 100vh表示屏幕高度 https://blog.csdn.net/weixin_42192534/article/details/80289782 -->
        <el-aside width="200px" style="background-color: #2b3e56">
            <el-menu 
            router  
            unique-opened 
            :default-active="$route.path"
            background-color="#2b3e56"
            text-color="#fff"
            active-text-color="#42b581"><!-- 启用router会在激活导航时以 index 作为 path 进行路由跳转 -->

            <el-submenu index="1">
                <template slot="title"><i class="el-icon-document"></i>内容管理</template>

                <el-menu-item-group>
                  <template slot="title">物品</template>
                  <el-menu-item index="/items/create">新建物品</el-menu-item>
                  <el-menu-item index="/items/list">物品列表</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template slot="title">英雄</template>
                  <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
                  <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template slot="title">文章</template>
                  <el-menu-item index="/articles/create">新建文章</el-menu-item>
                  <el-menu-item index="/articles/list">文章列表</el-menu-item>
                </el-menu-item-group>

            </el-submenu>

            <el-submenu index="2">
                <template slot="title"><i class="el-icon-message"></i>运营管理</template>

                <el-menu-item-group>
                  <template slot="title">广告</template>
                  <el-menu-item index="/ads/create">新建广告</el-menu-item>
                  <el-menu-item index="/ads/list">广告列表</el-menu-item>
                </el-menu-item-group>

            </el-submenu>

            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>系统管理</template>

                <el-menu-item-group>
                  <template slot="title">分类</template>
                  <el-menu-item index="/categories/create">新建分类</el-menu-item>
                  <el-menu-item index="/categories/list">分类列表</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template slot="title">管理员</template>
                  <el-menu-item index="/admin_users/create">新建用户</el-menu-item>
                  <el-menu-item index="/admin_users/list">用户列表</el-menu-item>
                </el-menu-item-group>


            </el-submenu>
            
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="text-align: right; font-size: 13px">
            <span style="float:left;font-size:15px">王者荣耀后台编辑</span>
            <span>{{user.username}}/{{user.power}}</span>
            <i class="el-icon-mobile-phone" style="margin-left:20px;color:#fff">： </i>
            <el-dropdown>
                
                <i class="el-icon-arrow-down" style="margin-right:15px;color:#fff;cursor:pointer"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="web">移动界面</el-dropdown-item>
                <el-dropdown-item @click.native="github">github</el-dropdown-item>
                <el-dropdown-item @click.native="exit">重新登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </el-header>
            
            <el-main >
            <router-view :key="$router.path">
            </router-view>
            <!-- 使用路由路径区分 -->
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>



<style>
  .el-header {
    background-color: rgb(69 84 104);
    color: #fff;
    line-height: 60px;
  }
  .el-menu{
    border: 0;
  }
  

</style>

<script>
  export default {
    data() {
      return {
        user:{}
      }
    },
    methods: {
      async getuser(){
        const res = await this.$http.get('/getuser')
        this.user = res.data
      },
      web(){
        window.open(location.origin)
      },
      github(){
        window.open('https://github.com/FXHLL/vue-node-mongodb')
      },
      exit(){
        this.$router.push('/login')
      }
    },
    created(){
      this.getuser()
    }
  };
</script>