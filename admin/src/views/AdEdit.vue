<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
        <!-- 表单提交事件 native表示对组件绑定原生事件 prevent表示提交后不刷新界面 -->

            <el-form-item label="名称" >
                <el-input v-model="model.name"></el-input>
            </el-form-item>

            <el-form-item label="广告">
                <el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
                <el-row type="flex" style="flex-direction:column">
                    <el-col v-for="(item,index) in model.items" :key="index"  :md="12"
                    style="margin-top:1rem;">
                        <el-form-item label="跳转链接">
                            <el-input v-model="item.url" style="width:35rem"></el-input>
                        </el-form-item>
                        <el-form-item label="广告图标" style="margin-top:1rem">
                            <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL+'/upload'"
                            :show-file-list="false"
                            :on-success="(res)=>{$set(item,'image',res.url)}"
                            :headers="getHeaders()"
                            >
                            <!-- 使用$set显式赋值原因：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新 -->
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item >
                            <el-button size="small" type="danger" @click="model.items.splice(index,1)">
                                删除
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
            model:{
                items:[]
            }
        }
    },
    methods:{
        async save(){//请求接口提交数据
            if(this.id){//通过id判断是访问修改还是新建的端口
                await this.$http.put(`rest/ads/${this.id}`,this.model)
            }else{
                await this.$http.post('rest/ads',this.model)
                console.log(this.model);
            }
            this.$router.push('/ads/list')//编程式导航，相当于点击了router-link:to="..."
            this.$message({//element添加到Vue实例原型上的方法
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/ads/${this.id}`)
            this.model = res.data   
        }
    },
    created(){
        this.id && this.fetch()//有id就把需要编辑的文档name获取到
    }
}
</script>