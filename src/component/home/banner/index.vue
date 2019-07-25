<template>
    <div class="banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" 
                 v-for='(item,index) of list'
                :key='index'
                >
                    <img :src="item.img" alt="" class="banner_img">
                </div>
                
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import  Swiper from 'swiper' //引入swiper
import "swiper/dist/css/swiper.min.css";
export default {
     data() {
            return {
                list:[]
            }
        },
    methods: {
        initswiper() {
           new Swiper ('.swiper-container', {
              loop: true, // 循环模式选项
              autoplay:true,
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
            })        
        },
        initdata(){
            let url = "http://api.egu365.cn/news/adviseImg?seat=90";
            this.$axios.get(url)
            .then((data) => {
                 this.list = data.data.list

                 this.$nextTick(() => {
                     this.initswiper();
                 })
            })
        }
    },
    created() {
        this.initdata();
    },
}
</script>
<style lang="scss" scoped>

.banner{
    .banner_img{
         width: 100%;
         height: 50%;
    }
    .swiper-comtainer{
        width: 7.5rem;
        height: 2.96rem;
    }
}

</style>
