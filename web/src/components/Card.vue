<template>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center" :class="{'border-bottom':!plain && !hero_swiper,'pb-3':!plain }">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <h3 class="flex-1 fs-xl pl-2 m-0">{{title}}</h3>
        <i v-if="!plain" class="iconfont icon-more"></i>
      </div>
      <div class="card-body pt-2">
          <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean},//布尔值默认false
        hero_swiper:{type:Boolean}
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .card{
        border-bottom: 1px solid $border-color;
    }

</style>