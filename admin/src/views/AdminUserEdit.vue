<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
        <!-- 表单提交事件 native表示对组件绑定原生事件 prevent表示提交后不刷新界面 -->
        

            <el-form-item label="用户名" >
                <el-input v-model="model.username"></el-input>
            </el-form-item>

            <el-form-item label="用户密码" >
                <el-input show-password v-model="model.password"></el-input>
            </el-form-item>

            <el-form-item label="权限管理" >
                <el-select v-model="model.power" placeholder="请选择">
                    <el-option value="管理员">管理员</el-option>
                    <el-option value="普通用户">普通用户</el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit" v-permission>保存</el-button><!-- type组件按钮样式，native-type原生按钮样式 -->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return{
            model:{}
        }
    },
    methods:{
        async save(){//请求接口提交数据
            if(this.id){//通过id判断是访问修改还是新建的端口
                await this.$http.put(`rest/admin_users/${this.id}`,this.model)
            }else{
                await this.$http.post('rest/admin_users',this.model)
                console.log(this.model);
            }
            this.$router.push('/admin_users/list')//编程式导航，相当于点击了router-link:to="..."
            this.$message({//element添加到Vue实例原型上的方法
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/admin_users/${this.id}`)
            this.model = res.data   
        },
    },
    created(){
        this.id && this.fetch()//有id就把需要编辑的文档name获取到
    }
}
</script>