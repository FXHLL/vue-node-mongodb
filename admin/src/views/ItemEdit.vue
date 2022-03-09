<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
        <!-- 表单提交事件 native表示对组件绑定原生事件 prevent表示提交后不刷新界面 -->
            <el-form-item label="名称" >
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标" >
                <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="afterUpload"
                :headers="getHeaders()"
                >
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                await this.$http.put(`rest/items/${this.id}`,this.model)
            }else{
                await this.$http.post('rest/items',this.model)
            }
            this.$router.push('/items/list')//编程式导航，相当于点击了router-link:to="..."
            this.$message({//element添加到Vue实例原型上的方法
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data   
        },
        afterUpload(res){
            // this.model.icon = res.url
            this.$set(this.model,"icon",res.url)//因为 Vue 无法探测普通的新增 property 
        }
    },
    created(){
        this.id && this.fetch()//有id就把需要编辑的文档name获取到
    }
}
</script>
