<template>
    <my-card :title="title" :icon="icon" :hero_swiper="hero_swiper">
      <!-- 英雄详情的轮播,由hero_swiper参数控制 -->
      <div v-if=" hero_swiper">
          <swiper :options="swiperOption" class="my-3 boder-bottom">
            <swiper-slide>
              <img class="w-100" src="../assets/images/1.jpg" alt="" height="116">
            </swiper-slide>
  
            <swiper-slide>
              <img class="w-100" src="../assets/images/2.png" alt="" height="116">
            </swiper-slide>

            <swiper-slide>
              <img class="w-100" src="../assets/images/3.jpg" alt="" height="116">
            </swiper-slide>
            <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
          </swiper>
      </div>
      
      <div class="nav jc-between">
        <div class="nav-item" 
        :class="{active:activeNum === i}"
        v-for="(category,i) in categories" :key="i"
        @click = "$refs.list.swiper.slideTo(i)">
          <div class="nav-link">{{category.name}}</div>            
        </div>
      </div>
      <div class="pt-3"> 
        <swiper ref="list" :options="{autoHeight:true}" @transitionStart="()=>{activeNum = $refs.list.swiper.activeIndex}">
          <swiper-slide v-for="(category,i) in categories" :key="i">
              <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </my-card>
</template>

<script>

//vue-awesome-swiper3.1.3版本，局部引入的组件化引入，请注意:options的填写
import {swiper,swiperSlide} from 'vue-awesome-swiper'
//swiper是上述插件自动下载，额外安装出现问题，请根据版本路径选择
import "swiper/dist/css/swiper.css"


export default {
    components:{
        swiper,
        swiperSlide
    },
    props:{
        title:{type:String,required:true},//required:必须传递的参数 
        icon:{type:String,required:true},
        categories:{type:Array,required:true},
        hero_swiper:{type:Boolean}//轮播图的显示
    },
    data() {
        return {
            activeNum:0
        }
    }
}
</script>
