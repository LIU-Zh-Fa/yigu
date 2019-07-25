<template>
    <div class="detail">
        <Header :title="tit"/>
        <MySwiper :goodid="this.$route.params.goodid" />
        <GoodInfo :goodid="this.$route.params.goodid" />
        <DetailBottom :goShopCar="goShopCar"/>
    </div>
</template>

<script>
import MySwiper from '@/component/detail/myswiper'
import GoodInfo from '@/component/detail/goodinfo'
import DetailBottom from '@/component/detail/detailbottom'
export default {
    name: 'detail',
    components: {
        MySwiper,
        GoodInfo,
        DetailBottom
    },
    created(){
        this.getData();
    },
    data(){
        return {
            tit:''
        }
    },
    methods:{
        getData(){
            this.$axios.post("/api/goods/publish",
                'id='+this.$route.params.goodid,
                {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            ).then((res)=>{
                this.tit = res.data.obj.goodsName
            })
        },
        goShopCar(){
            this.$router.push("/shopcar")
        }
    },
    watch: {
        $route:{
            handler(newV){
                if(newV.name==='detail'){
                    this.getData();
                }
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
    .detail{
        padding-top: .77rem;
        padding-bottom: .87rem;
    }
</style>