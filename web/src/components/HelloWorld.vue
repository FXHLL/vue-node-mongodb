<template>
  <div class="hello">
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/轮播1.jpg" alt="">
      </swiper-slide>  
      <swiper-slide>
        <img src="../assets/images/轮播2.jpg" alt="">
      </swiper-slide>  
      <swiper-slide>
        <img src="../assets/images/轮播3.jpg" alt="">
      </swiper-slide>  
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>

import {swiper,swiperSlide} from 'vue-awesome-swiper'
import "swiper/dist/css/swiper.css"

export default {
  name: 'HelloWorld',
  components:{
    swiper,swiperSlide
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        // Some Swiper option/callback...
        autoplay: true, //可选选项，自动滑动
        loop: true,//循环切换
      }
    }
  }
}
</script>


