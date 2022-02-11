<template>
    <div class="page-hero" v-if="model">

        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/logo.png" height="30">
            <div class="px-2 flex-1">
                <div class="text-white fs-md">王者荣耀&nbsp;&nbsp;&nbsp;&nbsp;攻略战</div>
            </div>
            <router-link tag="div" to="/" class="text-white fs-sm d-flex">更多英雄&nbsp;&nbsp;<span class="fs-xl">&gt;</span></router-link>
        </div>

        <div class="top" :style="{'background-image':`url(${model.banner})`}">
            <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
                <div class="fs-sm vivify fadeInLeft duration-1000" >{{model.title}}</div>
                <h2 class="my-2 vivify fadeInLeft delay-200 duration-1000">{{model.name}}</h2>
                <div class="fs-sm vivify fadeInLeft delay-300 duration-1500">{{model.categories.map(v => v.name).join('/')}}</div>
                <div class="d-flex jc-between pt-2">
                    <div class="scores d-flex ai-center" v-if="model.scores">
                        <span class="vivify fadeInLeft delay-200 duration-1000">难度</span>
                        <span class="badge bg-primary vivify fadeInLeft delay-200 duration-1000">{{model.scores.difficult}}</span>

                        <span class="vivify fadeInLeft delay-400 duration-1000">技能</span>
                        <span class="badge bg-blue vivify fadeInLeft delay-400 duration-1000">{{model.scores.skills}}</span>

                        <span class="vivify fadeInLeft delay-600 duration-1000">攻击</span>
                        <span class="badge bg-danger vivify fadeInLeft delay-600 duration-1000">{{model.scores.attack}}</span>

                        <span class="vivify fadeInLeft delay-800 duration-1000">生存</span>
                        <span class="badge bg-dark-3 vivify fadeInLeft delay-800 duration-1000">{{model.scores.survive}}</span>     
                    </div>
                    <router-link to="/" tag="div" class="text-grey d-flex ai-center">皮肤：9&nbsp;&nbsp;<span class="fs-xl">&gt;</span></router-link>
                </div>
            </div>
        </div>
        <!-- end of top -->

        <div>
            <div class="px-3 bg-white">
                <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
                    <div class="nav-item" :class="{'active':swiper_i === 0}" @click="$refs.swiper.swiper.slideTo(0)">
                        <div class="nav-link">英雄初识</div>
                    </div>
                    <div class="nav-item" :class="{'active':swiper_i === 1}" @click="$refs.swiper.swiper.slideTo(1)">
                        <div class="nav-link">进阶攻略</div>
                    </div>
                </div>
            </div>    

            <swiper :options="{autoHeight:true}" ref="swiper" @transitionStart="() => {swiper_i = $refs.swiper.swiper.activeIndex}">
                <swiper-slide>
                    <div>
                        <!-- button -->
                        <div class="p-3 d-flex bg-white" >
                        <router-link to="/" tag="button" class="btn btn-big flex-1 mr-2">
                            <i class="iconfont icon-bofang"></i>英雄介绍视频
                        </router-link>
                        <router-link to="/" tag="button" class="btn btn-big flex-1 ml-2">
                            <i class="iconfont icon-tupian"></i>一图识英雄
                        </router-link>
                        </div>

                        <!-- skills -->
                        <div class="skills p-3 bg-white">
                            <div class="d-flex jc-around mb-3">
                                <img :src="item.icon" v-for="(item,i) in model.skills" :key="item.name"
                               class="icon" :class="{active:currentSkillIndex === i}"
                               @click="currentSkillIndex = i">
                            </div>
                            <div v-if="currentSkill">
                                <div class="d-flex ai-center">
                                    <h3>{{currentSkill.name}}</h3>
                                    <span class="fs-sm ml-4 text-grey">(冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})</span>
                                </div>
                                <p>{{currentSkill.description}}</p>

                            </div>
                        </div>

                        <!-- 出装推荐 -->
                        <my-card plain icon="Menu" title="出装推荐" class="hero-items pb-2">
                            <div class="mb-2 fs-lg">顺风出装</div>
                            <div class="d-flex jc-between text-center border-bottom mb-3">
                                <div v-for="item in model.items1" :key="item._id" >
                                    <img class="icon" :src="item.icon" alt="item.name">
                                    <div class="mt-1 fs-sm">{{item.name}}</div>
                                </div>
                            </div>

                            <div class="mb-2 fs-lg">逆风出装</div>
                            <div class="d-flex jc-around text-center border-bottom">
                                <div v-for="item in model.items2" :key="item._id" >
                                    <img class="icon" :src="item.icon" alt="item.name">
                                    <div class="mt-1 fs-sm">{{item.name}}</div>
                                </div>
                            </div>
                        </my-card>

                        <!-- 使用技巧 -->
                        <my-card plain title="使用技巧" icon="Menu">
                            <p>{{model.usageTips}}</p>
                        </my-card>

                        <!-- 对抗技巧 -->
                        <my-card plain title="对抗技巧" icon="Menu">
                            <p>{{model.battleTips}}</p>
                        </my-card>

                        <!-- 团战思路 -->
                        <my-card plain title="团战思路" icon="Menu">
                            <p>{{model.teamTips}}</p>
                        </my-card>

                        <!-- 英雄关系 -->
                        <my-card plain title="英雄关系" icon="Menu">
                            <div class="py-3 fs-lg ">最佳搭档</div>
                            <div v-for="partner in model.partners" :key="partner.hero._id" class="d-flex mb-3">
                                <img :src="partner.hero.avatar" width="48" height="48" class="mr-3 plain ">
                                <p class="m-0">{{partner.description}}</p>
                            </div>
                        </my-card>
                    </div> 
                </swiper-slide>

                <swiper-slide class="bg-info">
                    <h1 v-for="i in 5" :key="i" class="text-center py-5 border-bottom">莫得数据 ^_^</h1>
                </swiper-slide>
            </swiper>
        </div>

    </div>
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
        id:{required:true}
    },
    data() {
        return {
            model:null,
            currentSkillIndex:0,
            swiper_i:0
        }
    },
    computed:{
        currentSkill(){
            console.log(this.model.skills[this.currentSkillIndex]);
            return this.model.skills[this.currentSkillIndex]
        }
    },
    methods: {
        async fetch(){
            const res = await this.$http.get(`/heroes/${this.id}`)
            this.model = res.data
            // console.log(JSON.stringify(this.model));
        }
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .page-hero{
        p{
            line-height: 1.5385rem;
        }
        .top{
            height: 50vw;
            background: #fff no-repeat top center;
            background-size: auto 100%;
            .info{
                background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));//线性渐变
                .scores{
                    .badge{
                        margin: 0 0.25rem;
                        display: inline-block;
                        width: 1.5rem;
                        height: 1.5rem;
                        line-height: 1.5rem;
                        text-align: center;
                        border-radius: 50%;
                        font-size: 0.5rem;
                        border: 1px solid rgba(255,255,255,0.2);
                        transform: scale(0.8);
                    }
                }
            }
        }
        .skills{
            img.icon{
                border: 3px solid map-get($map: $colors, $key: 'white');
                border-radius: 50%;
                width: 60px;
                height: 60px;
                &.active{
                    border:3px solid map-get($map: $colors, $key: 'primary');
                    border-radius: 50%;
                }
            }
        }
        .hero-items{
            img.icon{
                width: 3.5769rem;
                height: 3.5769rem;
                border-radius: 50%;
            }
        }

    }

    
</style>