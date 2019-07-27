<template>
    <div class="swiper-container goodinfo">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                <img :src="item.imgSrc" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    props: ["goodid"],
    data(){
        return {
            list:[],
            mySwiper:''
        }
    },
    methods:{
        getData(){
            this.$axios.get("/api/goods/imgs",{
                params:{
                    id: this.goodid
                }
            }).then((res)=>{
                this.list = res.data.list;
            })
        }
    },
    created(){
        this.getData()
    },
    watch: {
        list(newVal){
            this.$nextTick(()=>{
                if(!this.mySwiper && newVal){
                    this.mySwiper = new Swiper ('.goodinfo', {
                        loop: true, // 循环模式选项
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                        autoplay: {
                            delay: 4000,
                            disableOnInteraction: false,
                        },
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'fraction',
                        }
                    })
                }else{
                    if(!newVal){
                        this.mySwiper.destroy()
                        this.mySwiper = ''
                    }
                }
            })
        },
        goodid(){
            this.getData()
        }
    }
}
</script>
<style scoped lang="scss">
    .swiper-container{
        width: 100%;
        height: 7.5rem;
        border-bottom: .01rem solid #999;
        img{
            height: 100%;
            width: 100%;
        }
        .swiper-pagination{
            background: #e9e9eb;
            color: #acacad;
            padding: 0 .15rem;
            position: absolute;
            width: max-content;
            left: 6.5rem;
            bottom: .1rem;
            border-radius: .2rem;
            height: .4rem;
            line-height: .4rem;
            font-size: 10px;
        }
    }
</style>
