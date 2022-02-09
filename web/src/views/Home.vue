<template>
  <div class="home">

    <swiper :options="swiperOption" >  
      <swiper-slide> 
        <img class="w-100" src="../assets/images/轮播1.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/轮播2.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/轮播3.jpg" alt="">
      </swiper-slide>

      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-4 text-dark-2" v-for="n in 12" :key="n">
          <i :class="['sprite',`sprite-news-${n}`]"></i>
          <div class="pb-2 fs-sm">{{navItemsDiv[n-1]}}</div>
        </div>
      </div>

      <div class="bg-light py-2 d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span class="fs-sm">收起</span>
      </div>
    </div>

    <!-- end of nav icons -->

    <!-- <my-card title="新闻资讯" icon="Menu">

      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>            
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>      
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>     
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>      
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div >

      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>热门</span>
              <span>元歌皮肤设计大赛精彩创意赏析第七期</span>
              <span>01/21</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>

    </my-card> -->

    <my-card-list title="新闻资讯" icon="Menu" :categories="newCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${items._id}`"
         class="py-2 d-flex ai-center" v-for="(items,i) in category.newsList" :key="i">
          <span class="top_line  fs-sm text-red">{{items.categoryName}}</span>
          <span class="fs-lg flex-1 mx-2 text-ellipsis">{{items.title}}</span>
          <span class="text-grey-1  fs-sm">{{items.created | date}}</span>
        </router-link>
      </template>
    </my-card-list>


    <my-card-list title="英雄列表" icon="card-hero" :categories="heroesCats" hero_swiper v-if="heroesCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link :to="`/heroes/${hero._id}`" tag="div" v-for="(hero,i) in category.heroList" :key="i"
          style="width:20%;" class="p-2">
            <img :src="hero.avatar" :alt="hero.name" class="w-100">
            <div class="text-center">{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </my-card-list>

    <my-card title="精彩视频" icon="Video">
      <h1 class="text-center">莫得数据 ^_^</h1>
    </my-card>

  </div>
</template>

<script>
//vue-awesome-swiper3.1.3版本，局部引入的组件化引入，请注意:options的填写
import {swiper,swiperSlide} from 'vue-awesome-swiper'
//swiper是上述插件自动下载，额外安装出现问题，请根据版本路径选择
import "swiper/dist/css/swiper.css"

import dayjs from 'dayjs'

export default {
  name:'Home',
  components:{
    swiper,
    swiperSlide
  },
  data() {
    return {
      navItemsDiv:['爆料站','故事站','周边商场','体验服','新人专区','荣耀 传承','王者营地','公众号','版本介绍','对局环境','IP共创计划','创意互动营'],
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        },
        // Some Swiper option/callback...
        autoplay: true, //可选选项，自动滑动
        loop: true,//循环切换
      },
      newCats:[],
      heroesCats:[]
    }
  },
  methods:{
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newCats = res.data
    },
    async fetchHeroesCats(){
      const res = await this.$http.get('heroes/list')
      this.heroesCats = res.data
    }
  },
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  created(){
    this.fetchNewsCats()
    this.fetchHeroesCats()
  }
}
</script>

<style lang="scss">//scoped只对当前组件内生效，完全私有化，故无法覆盖外部样式类

  @import '../assets/scss/_variables.scss';

  .pagination-home{
    .swiper-pagination-bullet{
      opacity: 1;
      border-radius: 0.1538rem;
      background-color: map-get($colors, 'white' );
      &.swiper-pagination-bullet-active{
        background-color: map-get($colors, 'info' );
      }
    }
  }

  .nav-icons{
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item{
      width: 25%;
      height: 3.8462rem;
      border-right: 1px solid $border-color;
      &:nth-child(4n+0){
        border-right: none;
      }
    }
  }

  .top_line{
    border:1px solid map-get($colors, 'red');
    border-radius: 0.1923rem;
    padding:0.0769rem 0.1538rem;
    white-space: nowrap;
  }


</style>