<template>
    <div class="shopcar">
        <Header title="购物车"/>
        <ul v-show="carlist.length > 0" class="car_list">
            <li v-for="item in carlist" :key="item.goodid">
                <div class="check">
                    <input type="checkbox" v-model="item.flag">
                    <v-touch tag="div" :class="{'active':item.flag === true}" @tap="changeFlag(item.goodid)"><p></p></v-touch>
                </div>
                <div class="pic">
                    <img :src="item.goodImg">
                </div>
                <div class="info">
                    <h5><span>{{item.goodName}}</span><v-touch tag="i" @tap="goodDel(item.goodid)" class="iconfont">&#xe63d;</v-touch></h5>
                    <div class="spec"><span>次日达</span><span>{{item.goodSpec}}</span></div>
                    <div class="price">
                        <p>{{item.goodPrice | price}}</p>
                        <div>
                            <v-touch tag="button" @tap="goodReduce(item.goodid)" :class="{'noactive':item.num <= 1}">-</v-touch>
                            <input type="number" v-model="item.num" @change="goodNumChange">
                            <v-touch tag="button" @tap="goodInc(item.goodid)">+</v-touch>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="nocarlist" v-show="carlist.length <=0 ">
            <img src="http://m.egu365.cn/img/cart.svg">
            <p>去逛逛</p>
        </div>
        <div class="like_list">
            <img src="http://m.egu365.cn/img/guess_you_like.jpg">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0">
                <v-touch tag="li" v-for="item in list" :key="item.id" 
                    @tap="handleTap($event,{
                        goodid:item.id,
                        goodName:item.goodsName,
                        goodPrice:item.mallPrice,
                        goodImg:item.goodsImg,
                        goodSpec:item.goodsStandard})">
                    <img :src="item.goodsImg">
                    <p>{{item.goodsName}}</p>
                    <p><span>{{item.salePrice | price}}</span>
                        <i class="iconfont">&#xe600;</i>
                    </p>
                </v-touch>
            </ul>
        </div>
        <div class="car_bottom">
            <div class="car_left">
                <div class="check">
                    <input type="checkbox" :checked="allCheck">
                    <v-touch tag="div" :class="{'active':allCheck === true}" @tap="changeAll"><p></p></v-touch>
                    <span>全选</span>
                </div>
                <div class="allPrice">
                    <p>合计：<span>{{allPrice | price}}</span></p>
                </div>
            </div>
            <div class="car_right">去结算</div>
        </div>
    </div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import Vuex from 'vuex'
export default {
    name: 'shopcar',
    created(){
        this.getData();
    },
    data(){
        return {
            list: [],
            pageNum: 1,
            loading: false
        }
    },
    methods: {
        ...Vuex.mapActions({
            changeFlag: "Shopcar/changeFlag",
            goodDel: "Shopcar/goodDel",
            goodInc: "Shopcar/goodInc",
            goodReduce: "Shopcar/goodReduce",
            goodNumChange: "Shopcar/goodNumChange",
            changeAll: "Shopcar/changeAll"
        }),
        getData(){
            this.loading = true;
            this.$axios.get("/api/goods/list",{
                params:{
                    sorts: "hits asc",
                    pageNo: this.pageNum
                }
            }).then((res)=>{
                this.list = this.list.concat(res.data.list);
                this.loading = false;
            })
        },
        loadMore(){
            this.pageNum++;
            this.getData()
        },
        handleTap(e,obj){
            if(e.target.tagName === "I"){
                let good = {...obj,num:1,type:'yigu'};
                this.$store.dispatch("Shopcar/addCar",good)
            }else{
                this.$router.push("/detail/"+obj.goodid)
            }
        }
    },
    filters: {
        price(val){
            return '￥'+Number(val).toFixed(2)
        }
    },
    computed: {
        ...Vuex.mapState({
            carlist: state=>state.Shopcar.carlist,
            allCheck: state=>state.Shopcar.allCheck
        }),
        ...Vuex.mapGetters({
            allPrice: "Shopcar/allPrice"
        })
    }
}
</script>
<style lang="scss" scoped>
    .shopcar{
        padding-top: .77rem;
        padding-bottom: 0.88rem;
        .car_list{
            li{
                padding: .11rem .11rem .11rem 0;
                display: flex;
                height: 2.28rem;
                width: 100%;
                .check{
                    width: .74rem;
                    height: 2.06rem;
                    padding: .9rem .1rem 0 .28rem;
                    input{
                        display: none;
                    }
                    div{
                        width: 0.36rem;
                        height: .36rem;
                        border-radius: 50%;
                        border: 1px solid #ddd;
                        box-sizing: border-box;
                        position: relative;
                        p{
                            width: .25rem;
                            height: .15rem;
                            border-bottom: .03rem solid #fff;
                            border-left: .03rem solid #fff;
                            box-sizing: border-box;
                            transform: rotate(-45deg);
                            position: absolute;
                            left: .05rem;
                            top: .05rem;
                            display: none;
                        }
                        &.active{
                            background: #f44;
                            border: 0;
                            p{
                                display: block;
                            }
                        }
                    }
                }
                .pic{
                    width: 2.05rem;
                    height: 2.05rem;
                    margin-right: .1rem;
                    img{
                        width: 100%;
                    }
                }
                .info{
                    flex: 1;
                    h5{
                        font-size: 14px;
                        position: relative;
                        height: .75rem;
                        .iconfont{
                            position: absolute;
                            right: 0;
                            top: 0.05rem;
                        }
                    }
                    .spec{
                        height: 0.4rem;
                        margin-top: .11rem;
                        span{
                            display: inline-block;
                            padding: .05rem .12rem;
                            margin-right: .11rem;
                            height: 0.4rem;
                            line-height: .3rem;
                            color: #fff;
                            border-radius: .2rem;
                            &:nth-child(1){
                                background: #f44;
                            }
                            &:nth-child(2){
                                background: #ccc;
                            }
                        }
                    }
                    .price{
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #f00200;
                        height: .54rem;
                        line-height: .54rem;
                        margin-top: .11rem;
                        p{
                            font-size: 15px;
                        }
                        div{
                            width: 1.61rem;
                            display: flex;
                            button{
                                width: 0.49rem;
                                border: 0;
                                outline: none;
                                float: left;
                                background: #f3f2f5;
                                color: #666;
                                &.noactive{
                                    color: #c9c9c9;
                                    background: #f7f8fa;
                                }
                            }
                            input{
                                width: .56rem;
                                border: 0;
                                outline: none;
                                float: left;
                                text-align: center;
                                color: #999
                            }
                        }
                    }
                }
            }
        }
        .nocarlist{
            width: 100%;
            padding: 2.4rem 0;
            text-align: center;
            background: #f0f2f5;
            overflow: hidden;
            img{
                width: 1.88rem;
                margin: 0 auto;
            }
            p{
                display: inline-block;
                height: .5rem;
                line-height: .5rem;
                margin-top: .3rem;
                border-radius: .25rem;
                padding: 0 .3rem;
                background: #fff;
            }
        }
        .like_list{
            width: 100%;
            img{
                width: 100%;
            }
            ul{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li{
                    width: 50%;
                    padding: .1rem;
                    img{
                        width: 100%;
                    }
                    p{
                        height: .57rem;
                        line-height: .57rem;
                        position: relative;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        span{
                            font-size: 16px;
                            color: #f44
                        }
                        .iconfont{
                            position: absolute;
                            width: .4rem;
                            height: .4rem;
                            line-height: .4rem;
                            text-align: center;
                            border-radius: 50%;
                            color: #fff;
                            background: #f44;
                            right: 0.1rem;
                            top: 0.1rem;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .car_bottom{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .88rem;
            line-height: .88rem;
            display: flex;
            z-index: 99;
            background: #fff;
            .car_left{
                flex: 1;
                display: flex;
                justify-content: space-between;
                .check{
                    padding-left: .2rem;
                    input{
                        display: none;
                    }
                    div{
                        width: 0.36rem;
                        height: .36rem;
                        border-radius: 50%;
                        border: 1px solid #ddd;
                        box-sizing: border-box;
                        position: relative;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: .2rem;
                        p{
                            width: .25rem;
                            height: .15rem;
                            border-bottom: .03rem solid #fff;
                            border-left: .03rem solid #fff;
                            box-sizing: border-box;
                            transform: rotate(-45deg);
                            position: absolute;
                            left: .05rem;
                            top: .05rem;
                            display: none;
                        }
                        &.active{
                            background: #f44;
                            border: 0;
                            p{
                                display: block;
                            }
                        }
                    }
                }
                .allPrice{
                    margin-right: .1rem;
                    span{
                        color: #f44;
                        font-size: 16px;
                    }
                }
            }
            .car_right{
                width: 1.93rem;
                background: #f44;
                text-align: center;
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>

