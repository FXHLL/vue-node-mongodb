<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
        <!-- 表单提交事件 native表示对组件绑定原生事件 prevent表示提交后不刷新界面 -->
        
            <el-form-item label="上级分类">
                <el-select v-model="model.parent" placeholder="请选择" >
                    <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
                    <!--:key=排序提示 :label=显示值 :value=传给后台值-->
                    <!-- 故选中的数据item._id提交给了model.parent -->
                </el-select>
            </el-form-item>

            <el-form-item label="名称" >
                <el-input v-model="model.name"></el-input>
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
            model:{},
            parents:[]
        }
    },
    methods:{
        async save(){//请求接口提交数据
            if(this.id){//通过id判断是访问修改还是新建的端口
                await this.$http.put(`rest/categories/${this.id}`,this.model)
            }else{
                await this.$http.post('rest/categories',this.model)
                console.log(this.model);
            }
            this.$router.push('/categories/list')//编程式导航，相当于点击了router-link:to="..."
            this.$message({//element添加到Vue实例原型上的方法
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/categories/${this.id}`)
            this.model = res.data   
        },
        async fetchParent(){
            const res = await this.$http.get('rest/categories')
            this.parents = res.data
        }
    },
    created(){
        this.fetchParent()
        this.id && this.fetch()//有id就把需要编辑的文档name获取到
    }
}
</script>