<template>
    <div>
        <el-container style="height: 100vh"><!-- 100vh表示屏幕高度 https://blog.csdn.net/weixin_42192534/article/details/80289782 -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-openeds="['$route.path']" unique-opened :default-active="$route.path"><!-- 启用router会在激活导航时以 index 作为 path 进行路由跳转 -->

            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>内容管理</template>

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
                <template slot="title"><i class="el-icon-message"></i>系统管理</template>

                <el-menu-item-group>
                  <template slot="title">分类</template>
                  <el-menu-item index="/categories/create">新建分类</el-menu-item>
                  <el-menu-item index="/categories/list">分类列表</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                  <template slot="title">管理员</template>
                  <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                  <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
                </el-menu-item-group>


            </el-submenu>
            
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>前台界面</el-dropdown-item>
                <el-dropdown-item>github</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>后台界面</span>
            </el-header>
            
            <el-main>
            <router-view :key="$router.path"></router-view>
            <!-- 使用路由路径区分 -->
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>



<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
  };
</script>