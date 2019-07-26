<template>
    <div class="tjlist">
        <div class="title">
            <div class="tit_left"  @click="back()">
                <img src="http://wmall.wochu.cn/h5/hotlist/img/back.png?v=d0c1db9a95">
            </div>
            <div class="tit_right">
                <img src="http://wmall.wochu.cn/h5/hotlist/img/icon-cart-60@3x.png?v=80ccbcf8e7">
                <p>67</p>
            </div>
            <h2>{{tit}}</h2>
        </div>
        <ul class="good_list" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="0"
        >
            <v-touch tag="li" v-for="(item,index) in goodlist" :key="index" 
                @tap="handleClick($event,{
                    goodid: item.goodsGuid,
                    goodName: item.goodsName,
                    goodPrice: item.price,
                    goodImg: item.picUrl,
                    goodSpec: ''
                })">
                <div class="info_left">
                    <img :src="item.picUrl">
                </div>
                <div class="info_right">
                    <h3>{{item.goodsName}}</h3>
                    <p class="mark">
                        <span v-for="(mark,index) in item.goodsAttributeImg" :key="index">{{mark===1?'免洗':'免切'}}</span>
                    </p>
                    <p class="price"><span>￥{{item.price}}</span><span>￥{{item.marketPrice}}</span></p>
                    <div class="add">
                        <img class="addimg" src="http://wmall.wochu.cn/h5/hotlist/img/icon-listcart-75@3x.png?v=24d2b0ab1a">
                    </div>
                </div>
            </v-touch>
            <div class="more" v-if="pageIndex === pageCount || pageCount === 0">没有更多了~</div>
            <div class="more" v-else>下拉加载更多~</div>
        </ul>
    </div>
</template>
<script>
import Vuex from 'vuex'
import { InfiniteScroll } from 'mint-ui';
export default {
    data(){
        return {
            pageIndex: 0,
            tit: '',
            goodlist:[],
            pageCount: '',
            loading:false
        }
    },
    created(){
        this.getData();
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        loadMore(){
            this.getData()
        },
        getData(){
            if(this.pageIndex === this.pageCount || this.pageCount === 0)return;
            this.pageIndex++;
            this.loading = true;
            this.$axios.get("/wochu/client/v1/goods/SearchByTagName",{
                params:{
                    parameters: {"tagname":this.$route.params.tagname,"pageSize":10,"pageIndex":this.pageIndex,"orderId":0}
                }
            }).then((res)=>{
                this.tit = this.$route.params.tagname;
                this.goodlist = this.goodlist.concat(res.data.data.items);
                this.pageCount = res.data.data.pagination.pageCount;
                this.loading = false;
            })
        },
        handleClick(e,obj){
            if(e.target.tagName === "IMG" && e.target.className === "addimg"){
                let good = {...obj,num:1,type:"wochu"}
                this.shopCarAdd(good)
            }else{
                this.$router.push("/wc/detail/"+obj.goodid);
            }
        },
        ...Vuex.mapActions({
            shopCarAdd: "Shopcar/addCar"
        })
    }
}
</script>
<style lang="scss" scoped>
    .tjlist{
        height: 100%;
        display: flex;
        flex-direction: column;
        .title{
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            position: relative;
            border-bottom: 1px solid #ddd;
            position: fixed;
            width: 100%;
            background: #fff;
            top: 0;
            z-index: 10;
            h2{
                font-size: 15px;
                font-weight: normal;
            }
            .tit_left{
                left: .24rem;
                position: absolute;
                top: .2rem;
                img{
                    width: .64rem;
                }
            }
            .tit_right{
                position: absolute;
                right:.24rem;
                top: .2rem;
                img{
                    width: .44rem;
                }
                p{
                    position: absolute;
                    right: -.05rem;
                    top: 0rem;
                    height: .3rem;
                    width: .3rem;
                    font-size: 12px;
                    background: #ee7c1b;
                    border-radius: 50%;
                    line-height: .3rem;
                    color: #fff;
                    text-align: center;
                }
            }
        }
        ul{
            margin-top: .9rem;
            flex: 1;
            li{
                width: 100%;
                height: 2.92rem;
                padding: .4rem .24rem .32rem;
                border-bottom: .01rem solid #e5e5e5;
                box-sizing: border-box;
                .info_left{
                    float:left;
                    width: 2.2rem;
                    height: 2.2rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .info_right{
                    margin-left: .2rem;
                    float: right;
                    width: 4.6rem;
                    height: 100%;
                    position: relative;
                    h3{
                        width: 100%;
                        height: .84rem;
                        line-height: .42rem;
                        font-size: .3rem;
                        font-weight: 600;
                        letter-spacing: .02rem;
                        overflow: hidden;
                        margin-bottom: .1rem;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        color: #666;
                    }
                    .mark{
                        overflow: hidden;
                        width: 2.1rem;
                        height: .4rem;
                        margin-bottom: .04rem;
                        margin-top: .3rem;
                        span{
                            display: inline-block;
                            width: .6rem;
                            height: .4rem;
                            color: #6eb042;
                            font-size: 11px;
                            border: .01rem solid #6eb042;
                            border-radius: .12rem;
                            text-align: center;
                            line-height: .36rem;
                            margin-right: .1rem;
                            box-sizing: border-box;
                        }
                    }
                    .price{
                        span{
                            &:nth-child(1){
                                color: #ff5918;
                                margin-right: .2rem;
                                font-size: 16px;
                            }
                            &:nth-child(2){
                                text-decoration: line-through;
                                color: #ccc;
                            }
                        }
                    }
                    .add{
                        width: .52rem;
                        height: .52rem;
                        position: absolute;
                        right: 0;
                        bottom: 0rem;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
            .more{
                color: #666;
                font-size: 14px;
                text-align: center;
                line-height: 1rem;
            }
        }
    }
</style>