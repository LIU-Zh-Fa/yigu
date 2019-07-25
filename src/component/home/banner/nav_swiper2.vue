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
            })        
        },
        initdata(){
            let url = "http://api.egu365.cn/news/adviseImg?seat=93";
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
        margin-left: .2rem;
         width: 95%;
         height: 50%;
    }
    .swiper-comtainer{
        width: 7.5rem;
        height: 1rem;
    }
}

</style>
