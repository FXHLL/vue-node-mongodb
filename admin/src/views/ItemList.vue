<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="items" style="width: 100%">
        <!-- 注入数据 -->
        <el-table-column prop="_id" label="ID" width="220">
        <!-- 对应列内容的字段名 -->
        </el-table-column>
        <el-table-column prop="name" label="物品名称" width="220">
        </el-table-column>

        <el-table-column prop="icon" label="图标" width="220">
            <template v-slot="scope">
                <img :src="scope.row.icon" style="height:3rem;">
            </template>
        </el-table-column>

        <el-table-column
        fixed="right"
        label="编辑"
        width="220">
        <template v-slot="scope">
            <!-- 在elementui的table表格当中，v-slot = "scope"，scope.row指的是当前这一行的所有数据 -->
            <!-- https://www.cnblogs.com/Timeouting-Study/p/15477083.html -->
            <el-button
            @click = "$router.push(`/items/edit/${scope.row._id}`)"
            type="text"
            size="small">
            编辑
            </el-button>
            <el-button
            @click = "remove(scope.row)"
            type="text"
            size="small">
            删除
            </el-button>
        </template>
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    methods:{
        async fetch(){
            const res = await this.$http.get('rest/items')
            this.items = res.data
        },
        async remove(row){
            this.$confirm(`是否删除分类 "${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`rest/items/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.fetch()//删除后重新获取分类
            }).catch(()=>{})
        }
    },
    created(){
        this.fetch()
    }
}

</script>