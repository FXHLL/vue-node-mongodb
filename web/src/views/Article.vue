<template>
    <!-- v-if  防止加载页面时，model还未获取到数据导致页面中的数据获取失败报错 -->
    <div class="page-article" v-if="model">
        <div class="d-flex py-3 px-2 border-bottom">
            <i class="iconfont icon-fanhui text-info_1" @click="$router.push('/')"></i>
            <strong class="flex-1 fs-lg text-info_1">{{model.title}}</strong>
            <div class="text-grey fs-xs mr-3">{{model.created | date}}</div>
        </div>
        <div v-html="model.body" class="px-4 fs-xl" style="line-height:2.1538rem"></div>
    </div>
</template>

<script>
export default {
    props:{
        id:{required:true}
    },
    data() {
        return {
            model:null
        }
    },
    methods: {
        async fetch(){
            const res = await this.$http.get(`/articles/${this.id}`)
            this.model = res.data
        }
    },
    filters:{
        date(val){
            return val.match(/\d{4}-\d{2}-\d{2}/).join()
        }
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang="scss">
    .page-article{

        img{
            width: 100%;
            height: auto;
        }
        iframe{
            width: 100%;
            height: auto;
        }
    }
</style>