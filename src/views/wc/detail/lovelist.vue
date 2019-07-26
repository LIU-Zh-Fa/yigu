<template>
    <div>
        <ul class="listone">
            <v-touch tag="li" v-for="(item,index) in lovelist" :key="index" 
                @tap="handleClick($event,{
                    goodid: item.goodsGuid,
                    goodName: item.goodsName,
                    goodPrice: item.price,
                    goodImg: item.picUrl,
                    goodSpec: ''
                })"
            >
                <img :src="item.picUrl">
                <h3>{{item.goodsName}}</h3>
                <p class="oprice">￥{{item.marketPrice}}</p>
                <p class="price">￥{{item.price}}</p>
                <img class="addcar" src="http://wmall.wochu.cn/h5/home/vueimg/add.png">
            </v-touch>
        </ul>
    </div>
</template>
<script>
import Vuex from 'vuex'
export default {
    props:["goodid"],
    created(){
        this.getData();
    },
    data(){
        return {
            lovelist:''
        }
    },
    methods:{
        getData(){
            this.$axios.get("/wochu/client/v1/goods/getGoodsRelevantList",{
                params:{
                    parameters: {"goodsGuid": this.goodid}
                }
            }).then((res)=>{
                this.lovelist = res.data.data.userloving;
            })
        },
        handleClick(e,obj){
            if(e.target.tagName === "IMG" && e.target.className === "addcar"){
                let good = {...obj,num:1,type:"wochu"}
                this.shopCarAdd(good)
            }else{
                this.$router.push("/wc/detail/"+obj.goodid);
            }
        },
        ...Vuex.mapActions({
            shopCarAdd: "Shopcar/addCar"
        })
    },
    watch:{
        goodid(newVla){
            this.getData()
        }
    }
}
</script>
<style scoped lang="scss">
    .listone{
        width: 100%;
        overflow: auto;
        display: flex;
        height: 4.02rem;
        padding: .26rem 0 0 .24rem;
        box-sizing: border-box;
        li{
            flex: 0;
            height: 3.52rem;
            margin-right: .36rem;
            width: 1.9rem;
            position: relative;
            &:nth-last-child(1){
                padding-right: .2rem;
            }
            >img{
                width: 1.9rem;
                height: 1.9rem;
            }
            h3{
                margin-top: .24rem;
                width: 1.9rem;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #666;
                font-weight: normal;
            }
            .oprice{
                height: .24rem;
                margin-top: .14rem;
                font-size: 10px;
                color: #bababa;
                text-decoration: line-through;
            }
            .price{
                height: .24rem;
                margin-top: .1rem;
                font-size: 12px;
                color: #001e00;
                line-height: .24rem;
            }
            .addcar{
                position: absolute;
                width: .48rem;
                height: .48rem;
                bottom: .28rem;
                left: 1.42rem;
            }
        }
    }
</style>