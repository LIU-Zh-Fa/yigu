<template>
    <div class="gswiper">
        <div class="goodswiper swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                    <img :src="item.picUrl">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'
export default {
    props:["goodid"],
    data(){
        return {
            list:[],
            myswiper:''
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios.get("http://api9.wochu.cn/client/v1/goods/imgLoopList",{
                params:{
                    parameters: {"goodsGuid":this.goodid}
                }
            }).then((res)=>{
                this.list = res.data.data;
            })
        },
    },
    watch:{
        goodid(newVla){
            this.getData();
        },
        list(){
            this.$nextTick(()=>{
                if(!this.mySwiper){
                    this.mySwiper = new Swiper ('.goodswiper', {
                        loop: true, // 循环模式选项
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
                    this.mySwiper.update()
                }
                
            })
        }
    }
}
</script>
<style scoped lang="scss">
    .swiper-container{
        height: 7.5rem;
        position: relative;
        img{
            width: 100%;
        }
        .swiper-pagination{
            background: rgba(0,0,0,.8);
            color: #fff;
            position: absolute;
            bottom: .84rem;
            left: 6.3rem;
            width: max-content;
            height: .52rem;
            line-height: .52rem;
            opacity: .5;
            padding: 0 .15rem;
            border-radius: .2rem;
            font-size: 10px;
        }
    }
</style>