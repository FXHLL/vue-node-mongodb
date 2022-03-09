<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
        <!-- 表单提交事件 native表示对组件绑定原生事件 prevent表示提交后不刷新界面 -->

        <el-tabs type="border-card" value="basic">
            <el-tab-pane label="基础信息" name="basic">
                <el-form-item label="英雄名称" >
                    <el-input v-model="model.name"></el-input>
                </el-form-item>

                <el-form-item label="头像" >
                    <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL+'/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(model,'avatar',res.url)"
                    :headers="getHeaders()"
                    >
                    <img v-if="model.avatar" :src="model.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="背景图" >
                    <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL+'/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(model,'banner',res.url)"
                    :headers="getHeaders()"
                    >
                    <img v-if="model.banner" :src="model.banner" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="称号" >
                    <el-input v-model="model.title"></el-input>
                </el-form-item>

                <el-form-item label="职业">
                    <el-select v-model="model.categories" multiple placeholder="请选择">
                        <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="难度">
                    <el-rate style="margin-top:0.7rem;" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                </el-form-item>
                <el-form-item label="技能">
                    <el-rate style="margin-top:0.7rem;" :max="9" show-score v-model="model.scores.skills"></el-rate>
                </el-form-item>
                <el-form-item label="攻击">
                    <el-rate style="margin-top:0.7rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
                </el-form-item>
                <el-form-item label="生存">
                    <el-rate style="margin-top:0.7rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
                </el-form-item>
                
                <el-form-item label="顺风出装">
                    <el-select filterable v-model="model.items1" multiple placeholder="请选择">
                        <el-option
                        v-for="item in items"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="逆风出装">
                    <el-select filterable v-model="model.items2" multiple placeholder="请选择">
                        <el-option
                        v-for="item in items"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="使用技巧">
                    <el-input type="textarea" v-model="model.usageTips"></el-input>
                </el-form-item>
                <el-form-item label="对抗技巧">
                    <el-input type="textarea" v-model="model.battleTips"></el-input>
                </el-form-item>
                <el-form-item label="团战技巧">
                    <el-input type="textarea" v-model="model.teamTips"></el-input>
                </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="技能" >
                <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                    <el-col v-for="(item,index) in model.skills" :key="index"  :md="12">
                        <el-form-item label="技能名称">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>
                        <el-form-item label="技能图标" >
                            <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL+'/upload'"
                            :show-file-list="false"
                            :headers="getHeaders()"
                            :on-success="(res)=>{$set(item,'icon',res.url)}"
                            >
                            <!-- 使用$set显式赋值原因：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新 -->
                            <img v-if="item.icon" :src="item.icon" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="冷却值">
                            <el-input v-model="item.delay" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="消耗">
                            <el-input v-model="item.cost" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="技能描述">
                            <el-input v-model="item.description" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" @click="model.skills.splice(index,1)">
                                删除
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="最佳搭档" >
                <el-button @click="model.partners.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                    <el-col v-for="(item,index) in model.partners" :key="index"  :md="12">

                        <el-form-item label="英雄">
                            <el-select v-model="item.hero" filterable placeholder="请选择">
                                <el-option
                                v-for="hero in heroes"
                                :key="hero._id"
                                :label="hero.name"
                                :value="hero._id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="描述">
                            <el-input v-model="item.description" type="textarea"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button size="small" type="danger" @click="model.skills.splice(index,1)">
                                删除
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>

        </el-tabs>

            <el-form-item style="margin-top:0.7rem; margin-left:50rem">
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
            categories:[],
            items:[],
            heroes:[],
            model:{
                categories:[],
                scores:{},
                skills:[],
                items1:[],
                items2:[],
                partners:[]
            },
        }
    },
    methods:{
        async save(){//请求接口提交数据
            if(this.id){//通过id判断是访问修改还是新建的端口
                await this.$http.put(`rest/heroes/${this.id}`,this.model)
            }else{
                await this.$http.post('rest/heroes',this.model)
            }
            this.$router.push('/heroes/list')//编程式导航，相当于点击了router-link:to="..."
            this.$message({//element添加到Vue实例原型上的方法
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            this.model = Object.assign({}, this.model, res.data);//防止对象属性覆盖
            console.log(this.data);
        },

        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },
        async fetchItems(){
            const res = await this.$http.get(`rest/items`)
            this.items = res.data
        },
        async fetchHeroes(){
            const res = await this.$http.get(`rest/heroes`)
            this.heroes = res.data
            console.log(res.data);
        }
    },
    created(){
        this.fetchCategories()
        this.fetchItems()
        this.fetchHeroes()
        this.id && this.fetch()//有id就把需要编辑的文档name获取到
    }
}
</script>
