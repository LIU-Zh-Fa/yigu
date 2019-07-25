<template>
    <div class="banner">
        <div class="swiper-container2">
            <div class="swiper-wrapper">
                <div class="swiper-slide" 
                 v-for='(item,index) of list'
                :key='index'
                >
                    {{item.name}}
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
           new Swiper ('.swiper-container2', {
              direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项
              autoplay:true,
            })        
        },
        initdata(){
            let url = "http://api.egu365.cn/news/adviseImg?seat=92";
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
    .swiper-comtainer{
        width: 3.1rem;
        height: .24rem;
        // font-size: 12px;
    }
}

</style>
