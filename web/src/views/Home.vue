<template>
  <div class="home">

    <swiper :options="swiperOption" >  
      <swiper-slide> 
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/194/20220123/c89c1fbdd5c89216fa073db8c73976d7.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/194/20220206/a3f661174ac986b0d79226a8a9ca80c3.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="//ossweb-img.qq.com/upload/adw/image/194/20220127/ad3e7fff8e5744490295e77bf9ea7e4a.jpeg" alt="">
      </swiper-slide>

      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-2 text-center">
      <div class="nav-body d-flex flex-wrap pt-3" :class="{nav_pack:nav_pack}">
        <div class="nav-item mb-2 text-dark-2 d-flex flex-column ai-center" v-for="n in 12" :key="n">
          <i class="flex-1" :class="['sprite',`sprite-news-${n}`]"></i>
          <div class="py-1 fs-sm">{{navItemsDiv[n-1]}}</div>
        </div>
      </div>

      <div class="bg-light py-1 d-flex ai-center jc-center" @click="nav_pack = !nav_pack">
        <div v-if="nav_pack">
          <i class="sprite sprite-arrow mr-1" style="transform:rotate(180deg);"></i>
          <span class="fs-sm">展开</span>
        </div>
        <div v-else>
          <i class="sprite sprite-arrow mr-1"></i>
          <span class="fs-sm">收起</span>
        </div>

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


    <my-card-list title="英雄列表" icon="card-hero" :categories="heroesCats" hero_swiper v-if="heroesCats != []">
      <template #hero_swiper>
        <swiper :options="swiperOption" class="my-3 boder-bottom">
          <swiper-slide>
            <img class="w-100" src="//ossweb-img.qq.com/upload/webplat/info/yxzj/20211116/310571306364037.png" alt="" height="116">
          </swiper-slide>

          <swiper-slide>
            <img class="w-100" src="//ossweb-img.qq.com/upload/webplat/info/yxzj/20210623/39070448590418.jpg" alt="" height="116">
          </swiper-slide>

          <swiper-slide>
            <img class="w-100" src="//ossweb-img.qq.com/upload/webplat/info/yxzj/20220106/782111465173105.jpg" alt="" height="116">
          </swiper-slide>
          <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
        </swiper>
      </template>

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
      heroesCats:[],
      nav_pack:true
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
    width: 100%;
    .nav-body{
      height: 14.0385rem;
      transition: 0.3s height;
      &.nav_pack{
        height:5.3846rem;
        overflow-x: auto;
        overflow-y: hidden;
        flex-wrap: nowrap;
      }
      .nav-item{
        flex-shrink: 0;
        width: 25%;
        height: 3.8462rem;
        border-right: 1px solid $border-color;
        &:nth-child(4n+0){
          border-right: none;
        }
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