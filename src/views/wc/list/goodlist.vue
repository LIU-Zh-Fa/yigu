<template>
    <div class="tjlist">
        <div class="title">
            <v-touch tag="div" class="tit_left"  @tap="back()">
                <img src="http://wmall.wochu.cn/h5/hotlist/img/back.png?v=d0c1db9a95">
            </v-touch>
            <div class="tit_right">
                <img src="http://wmall.wochu.cn/h5/classify/img/icon-search-40@2x.png">
                <img src="http://wmall.wochu.cn/h5/hotlist/img/icon-cart-60@3x.png?v=80ccbcf8e7">
                <p>67</p>
            </div>
            <h2>{{tit}}</h2>
            <ul>
                <li 
                    v-for="(goodlist,index) in allgoodlist" 
                    :key="index"
                    :class="{'active':menuid == goodlist.id}"
                    @click="chengemenuid(goodlist.id)"
                >{{goodlist.name}}</li>
            </ul>
            <div class="order">
                <v-touch tag="div" :class="{'active':order === 1}" @tap="changeorder('no')">特惠</v-touch>
                <v-touch tag="div" :class="{'active':order !== 1}" @tap="changeorder()">价格<span
                    :class="{'asc':order === 3,'desc':order === 2}"
                ></span></v-touch>
            </div>
            <div class="fg"></div>
        </div>
        <ul class="good_list" v-for="(goodlist,index) in list" :key="index" v-show="goodlist.id == menuid">
            <v-touch tag="li" v-for="(item,index) in goodlist.goods" :key="index" 
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
                    <p class="desc">{{item.description}}</p>
                    <p class="mark">
                        <span v-for="(mark,index) in item.goodsAttributeImg" :key="index">{{mark===1?'免洗':'免切'}}</span>
                    </p>
                    <p class="price"><span>￥{{item.price}}</span><span v-show="item.price !== item.marketPrice">￥{{item.marketPrice}}</span></p>
                    <div class="add">
                        <img class="addimg" src="http://wmall.wochu.cn/h5/hotlist/img/icon-listcart-75@3x.png?v=24d2b0ab1a">
                    </div>
                </div>
            </v-touch>
        </ul>
    </div>
</template>
<script>
import Vuex from 'vuex'
export default {
    data(){
        return {
            menuid:'',
            order:1
        }
    },
    created(){
        this.menuid = this.$route.params.menuid;
        this.getdata();
    },
    methods: {
        getdata(){
            this.$store.dispatch("WcList/getData",{order:this.order,parentid:this.$route.params.parentid})
        },
        back(){ 
            this.$router.go(-1);
        },
        chengemenuid(id){
            this.menuid = id;
        },
        changeorder(type){
            if(type === 'no'){
                this.order = 1;
            }else{
                if(this.order === 1 || this.order === 2){
                    this.order = 3;
                }else{
                    this.order = 2;
                }
            }
            this.getdata()
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
    },
    computed: {
        ...Vuex.mapState({
            list: state=>state.WcList.list,
            allgoodlist: state=>state.WcList.allgoodlist,
            tit: state=>state.WcList.tit
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
            height: 2.86rem;
            line-height: .9rem;
            text-align: center;
            position: relative;
            position: fixed;
            width: 100%;
            background: #fff;
            z-index: 10;
            top: 0;
            h2{
                font-size: 15px;
                height: .92rem;
                font-weight: normal;
                border-bottom: 1px solid #ddd;
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
                display: flex;
                img{
                    width: .44rem;
                    margin-left: .4rem;
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
            ul{
                width: 100%;
                box-sizing: border-box;
                overflow: auto;
                display: flex;
                font-size: 14px;
                border-bottom: 1px solid #ddd;
                box-sizing: border-box;
                height: 1rem;
                li{
                    flex-shrink: 0;
                    line-height: 1rem;
                    text-align: center;
                    padding: 0 .3rem;
                    box-sizing: border-box;
                    &.active{
                        color: #6eb042;
                        border-bottom: .04rem solid #6eb042;
                    }
                }
            }
            .order{
                display: flex;
                width : 100%;
                font-size: 14px;
                box-sizing: border-box;
                div{
                    flex: 1;
                    &.active{
                        color: #6eb042;
                        .asc{
                            background-position-y: -.3rem; 
                        }
                        .desc{
                            background-position-y: -.6rem; 
                        }
                    }
                    span{
                        width: .14rem;
                        height: .3rem;
                        display: inline-block;
                        background: url(http://wmall.wochu.cn/h5/classify/img/icon-fenlei-arrow@3x.png) 0 0 no-repeat;
                        vertical-align: middle;
                        background-size: 100%;
                        margin-left: .1rem;
                    }
                }
            }
            .fg{
                width: 100%;
                height: .16rem;
                background: #f4f5f7;
            }
        }
        >ul{
            margin-top: 2.86rem;
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
                        line-height: .42rem;
                        font-size: 15px;
                        font-weight: bold;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-bottom: .1rem;
                        color: #666;
                    }
                    .desc{
                        width: 100%;
                        height: .34rem;
                        line-height: .32rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-bottom: .18rem;
                        white-space: nowrap;
                        color: #666;
                        letter-spacing: .01rem;
                    }
                    .mark{
                        overflow: hidden;
                        width: 2.1rem;
                        height: .4rem;
                        margin-bottom: .04rem;
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
        }
    }
</style>