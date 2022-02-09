<template>
    <div>
        <el-card class="card" header="请先登录">
            <el-form :model="item" @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="item.username"></el-input>                   
                </el-form-item>
                <el-form-item label="密码">
                    <el-input show-password v-model="item.password"></el-input>                   
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit"
                    style="float:right;">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            item:{}
        }
    },
    methods:{
        async login(){
            const res = await this.$http.post('login',this.item)
            // sessionStorage.token = res.data.token   //浏览器关闭则token移除
            localStorage.token = res.data.token  //将token写入浏览器本地存储
            console.log(res.data.token);
            console.log(localStorage.token);

            this.$router.push('/')
            this.$message({
                type:'success',
                message:"登陆成功！"
            })
        }
    }
}
</script>

<style>
    .card{
        width:25rem;
        margin: 6rem auto;
    }
</style>