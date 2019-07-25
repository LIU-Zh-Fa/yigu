<template>
    <div class="spec_div" v-show="flag" @touchmove.prevent @mousewheel.prevent>
        <v-touch class="mask" tag="div" @tap="closeSpec"></v-touch>
        <div class="spec_info">
            <div class="spec_body">
               <div class="basic_info">
                    <img :src="goodimg">
                    <div>
                        <h5>{{goodname}}</h5>
                        <p>{{goodprice | price}}</p>
                    </div>
                </div>
                <div class="spec">
                    <p>规格</p>
                    <ul>
                        <v-touch 
                            v-for="item in specList" 
                            :key="item.id" 
                            :class="{'active':item.id === $route.params.goodid}"
                            tag="li"
                            @tap="changeSpec(item.id)"
                        >{{item.goodsStandard}}</v-touch>
                    </ul>
                </div>
                <div class="num_div">
                    <p>数量</p>
                    <div>
                        <v-touch tag="button" @tap="includeNum" :class="{'noactive':num <= 1}">-</v-touch>
                        <input type="number" v-model="num">
                        <v-touch tag="button" @tap="addNum">+</v-touch>
                    </div>
                </div>
                <v-touch tag="div" class="close" @tap="closeSpec"><i class="iconfont">&#xe60e;</i></v-touch>
            </div>
        </div>
        <div class="spec_bottom">
            <v-touch tag="div" @tap="addCar">加入购物车</v-touch>
            <v-touch tag="div" @tap="shoppingBuy">立即购买</v-touch>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import Observer from '@/common/observer'
import Vuex from 'vuex'
export default {
    props:["goodname","goodprice","goodimg","goodspec"],
    created(){
        this.$axios.get("/api/goods/specs",{
            params: {
                id: this.$route.params.goodid
            }
        }).then((res)=>{
            this.specList = res.data.list;
        })
        Observer.$on("detail_bottom_add",this.addCar)
    },
    data(){
        return {
            flag: false,
            specList: [],
            num: 1,
        }
    },
    watch: {
        specList(){
            this.$nextTick(()=>{
                new BScroll(".spec_info",{
                    tap: true,
                    momentumLimitTime: 0,
                });
            })
        }
    },
    filters: {
        price(val){
            return "￥"+Number(val).toFixed(2);
        }
    },
    methods: {
        openSpec(){
            this.flag = true;
        },
        closeSpec(){
            this.flag = false;
        },
        includeNum(){
            if(this.num <= 1) return;
            else this.num--;
        },
        addNum(){
            this.num++;
        },
        changeSpec(goodid){
            this.$router.push("/detail/"+goodid)
        },
        addCar(param){
            var n = param && param.n ? param.n : this.num;
            var obj = {
                goodid: this.$route.params.goodid,
                goodName: this.goodname,
                goodPrice: this.goodprice,
                goodImg: this.goodimg,
                goodSpec: this.goodspec,
                num: n,
                type: "yigu"
            }
            this.shopCarAdd(obj)
        },
        shoppingBuy(){
            this.addCar();
            this.$router.push("/shopcar")
        },
        ...Vuex.mapActions({
            shopCarAdd: "Shopcar/addCar"
        })
    }
}
</script>
<style lang="scss" scoped>
    .spec_div{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0,0,0,.2);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        .mask{
            flex: 1;
        }
        .spec_info{
            height: 6rem;
            background: #fff;
            width: 100%;
            position: relative;
            overflow: hidden;
            .spec_body{
                padding-bottom: .88rem;
                .basic_info{
                    display: flex;
                    padding: .22rem .22rem 0;
                    margin-bottom: .28rem;
                    img{
                        width: 1.95rem;
                        height: 1.95rem;
                    }
                    div{
                        padding-left: .22rem;
                        h5{
                            padding-top: .28rem;
                            font-size: 15px;
                            height: 1.4rem;
                        }
                        p{
                            color: #ff3434;
                            line-height: .44rem;
                            height: .44rem;
                            font-size: 14px;
                        }
                    }
                }
                .spec{
                    padding: .21rem .24rem;
                    display: flex;
                    p{
                        height: .32rem;
                        line-height: .32rem;
                        width: .8rem;
                        padding-right: .14rem;
                    }
                    ul{
                        flex: 1;
                        overflow: hidden;
                        padding-top: .42rem;
                        li{
                            float: left;
                            height: .5rem;
                            padding: .06rem .25rem;
                            background: #f0f0f0;
                            margin: 0 .28rem .17rem 0;
                            border-radius: .1rem;
                            &.active{
                                background: #ff3434;
                                color: #fff;
                            }
                        }
                    }
                }
                .num_div{
                    padding: .21rem .24rem;
                    margin-bottom: .28rem;
                    height: .95rem;
                    display: flex;
                    p{
                        flex: 1;
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
                .close{
                    position: absolute;
                    top: .1rem;
                    right: .1rem;
                    .iconfont{
                        font-size: 20px;
                    }
                }
            }
        }
        .spec_bottom{
            height: .88rem;
            display: flex;
            width: 100%;
            position: absolute;
            bottom: 0;
            div{
                flex: 1;
                text-align: center;
                line-height: .88rem;
                font-size: 14px;
                color: #fff;
                &:nth-child(1){
                    background: #ffac0a;
                }
                &:nth-child(2){
                    background: #f44;
                }
            }
        }
    }
</style>
