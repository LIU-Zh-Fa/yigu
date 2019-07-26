<template>
    <div class="active">
        <div class="top">
            <v-touch tag="div" class="top_left" @tap="back()">
                <img src="http://wmall.wochu.cn/h5/activityTemplate/img/ac-back.png">
            </v-touch>
            <div class="top_right">
                <img src="http://wmall.wochu.cn/h5/activityTemplate/img/ac-share.png">
                <v-touch tag="img" @tap="goCar" src="http://wmall.wochu.cn/h5/activityTemplate/img/ac-cart.png"></v-touch>
            </div>
        </div>
        <div v-for="(item,index) in goodlist" :key="index">
            <div class="topimg" v-if="item.templateType === 0">
                <img :src="item.imageUrl">
            </div>
            <ul v-if="item.templateType === 2">
                <v-touch tag="li" v-for="(gitem,gindex) in item.shelveList" :key="gindex" @tap="handleClick($event,{
                    goodid: gitem.goodsGuid,
                    goodName: gitem.goodsName,
                    goodPrice: gitem.price,
                    goodImg: gitem.icon,
                    goodSpec: ''
                })">
                    <div>
                        <img :src="gitem.icon">
                        <h3>{{gitem.goodsName}}</h3>
                        <p><span>￥{{gitem.price}}</span><span v-if="gitem.price !== gitem.marketPrice">￥{{gitem.marketPrice}}</span></p>
                        <div class="addcar">加入购物车</div>
                    </div>
                </v-touch>
            </ul>
        </div>
    </div>
</template>
<script>
import Vuex from 'vuex'
export default {
    data(){
        return{
            goodlist:[]
        }
    },
    created(){
        var actId = this.$route.params.actid;
        this.$axios.get("/wwochu/client/v1/goods/activityTemplate",{
            params:{
                parameters: {"aTId":actId}
            }
        }).then((res)=>{
            this.goodlist = res.data.data.areaList;
        })
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        handleClick(e,obj){
            if(e.target.tagName === "DIV" && e.target.className === "addcar"){
                let good = {...obj,num:1,type:"wochu"}
                this.shopCarAdd(good)
            }else{
                this.$router.push("/wc/detail/"+obj.goodid);
            }
            
        },
        goCar(){
            this.$router.push("/shopcar")
        },
        ...Vuex.mapActions({
            shopCarAdd: "Shopcar/addCar"
        })
    }
}
</script>
<style lang="scss" scoped>
    .active{
        background: #e0e0e0;
        .top{
            position: fixed;
            top: .58rem;
            height: .84rem;
            line-height: .84rem;
            width: 100%;
            .top_left{
                float: left;
            }
            .top_right{
                float:right;
                display: flex;
            }
            img{
                width: .84rem;
                margin: 0 .2rem
            }
        }
        .topimg{
            img{
                width: 100%;
            }
        }
        ul{
            li{
                box-sizing: border-box;
                padding: 0 .13rem .26rem .26rem;
                width: 50%;
                float: left;
                text-align: center;
                background: #e0e0e0;
                >div{
                    background: #fff;
                    padding-bottom: .22rem;
                    img{
                        width: 100%;
                    }
                    h3{
                        width: 100%;
                        height: .94rem;
                        line-height: .36rem;
                        font-size: 15px;
                        font-weight: normal;
                        padding: .2rem .4rem 0 .4rem;
                        box-sizing: border-box;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    p{
                        line-height: .3rem;
                        margin-top: .06rem;
                        span:nth-child(1){
                            color: #c5331e;
                            font-size: 15px;
                            font-weight: bold;
                        }
                        span:nth-child(2){
                            text-decoration: line-through;
                            margin-left: .1rem;
                            color: grey;
                            font-size: 13px;
                            font-weight: bold;
                        }
                    }
                    div{
                        height: .6rem;
                        margin: .22rem auto 0;
                        width: 2.2rem;
                        text-align: center;
                        background: #ffe313;
                        color: #000;
                        font-size: 14px;
                        border-radius: .3rem;
                        line-height: .6rem;
                    }
                }
            }
        }
    }
</style>