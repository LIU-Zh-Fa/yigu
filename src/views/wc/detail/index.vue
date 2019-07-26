<template>
    <div class="goodinfo">
        <div class="info_body">
            <div class="swiper">
                <v-touch tag="div" class="back" @tap="back()">
                    <img src="http://wmall.wochu.cn/h5/mall/img/vueimg/refer.png">
                </v-touch>
                <mySwiper :goodid="goodid"/>
            </div>
            <div class="main">
                <h3>{{goodinfo.goodsName}}</h3>
                <p class="desc" v-if="goodinfo.description != ''">{{goodinfo.description}}</p>
                <div class="price">
                    <span>￥{{goodinfo.price}}</span>
                    <span v-show="goodinfo.price !== goodinfo.marketPrice">￥{{goodinfo.marketPrice}}</span>
                </div>
                <p class="icon"><span v-for="(mark,index) in goodinfo.goodsAttributeImg" :key="index">{{mark===1?'免洗':'免切'}}</span></p>
                <div class="sign" v-if="goodinfo.goodsLabel && goodinfo.goodsLabel.length > 0">
                    <img :src="goodinfo.goodsLabel.length >0 ? goodinfo.goodsLabel[0].labelUrl : ''">
                </div>
            </div>
            <div class="navigation">
                <img src="http://wmall.wochu.cn/h5/mall/img/vueimg/navigation.png">
            </div>
            <div class="info">
                <div><span>产地：</span><span>{{goodinfo.origin1}}</span></div>
                <div><span>保质期：</span><span>{{goodinfo.shelfLife}}</span></div>
                <div><span>规格：</span><span>{{goodinfo.specification}}</span></div>
                <div><span>存储条件：</span><span>{{goodinfo.storageCondition}}</span></div>
            </div>
            <div tag="div" class="message">
                <p>商品评价</p>
                <img src="http://wmall.wochu.cn/h5/mall/img/vueimg/next.png">
            </div>
            <div class="advice">
                <span></span>
                <p>猜你喜欢</p>
            </div>
            <LoveList  :goodid="goodid"/>
            <div class="info_img" v-html="goodinfo.descriptionDetail"></div>
        </div>
        <div class="info_footer">
            <div class="add" v-if="goodinfo.goodsStock > 0">
                <div class="left">
                    <img src="http://wmall.wochu.cn/h5/mall/img/vueimg/catr.png">
                    <span>0</span>
                </div>
                <v-touch tag="div" @tap="addCar" class="right">加入购物车</v-touch>
            </div>
            <div class="nofood" v-else>补货中</div>
        </div>
    </div>
</template>
<script>
import mySwiper from './myswiper'
import LoveList from './lovelist'
export default {
    data(){
        return {
            goodid:'',
            goodinfo:'',
            lovelist:[]
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        getData(){
            this.$axios.get("http://api9.wochu.cn/api/goods/goods/detail",{
                params: {
                    goodsGuid: this.goodid
                }
            }).then((res)=>{
                this.goodinfo = res.data.data;
            });
        },
        addCar(){
            let good = {
                goodid: this.goodid,
                goodName: this.goodinfo.goodsName,
                goodPrice: this.goodinfo.price,
                goodImg: this.goodinfo.picUrl,
                goodSpec: '',
                num:1,
                type:"wochu"
            }
            this.$store.commit("Shopcar/addCar",good);
        }
    },
    components:{
        mySwiper,LoveList
    }, 
    created(){
        this.goodid = this.$route.params.goodid;
        this.getData()
    }, 
    watch:{
        $route:{
            handler(nVal){
                this.goodid = nVal.params.goodid;
                this.getData()
            },
            deep:true,
            immediate:true,
        }
    }
}
</script>
<style lang="scss" scoped>
    .goodinfo{
        background: #f4f4f4;
        height: 100%;
        .info_body{
            overflow: auto;
            margin-bottom: 1rem;
            .swiper{
                position: relative;
                .back{
                    width: .54rem;
                    height: .54rem;
                    position: absolute;
                    top: .56rem;
                    left: .24rem;
                    z-index: 10;
                    img{
                        width: 100%;
                    }
                }
            }
            .main{
                background: #fff;
                margin: -.48rem 0 0 .24rem;
                width: 7.02rem;
                box-shadow: 1px -1px 20px rgba(34,34,34,.3);
                position: relative;
                border-radius: 10px;
                padding-top: .46rem;
                z-index: 2;
                padding-bottom: .32rem;
                box-sizing: content-box;
                h3{
                    color: #001e00;
                    margin: 0 0 0 .23rem;
                    height: .45rem;
                    line-height: .44rem;
                    font-size: 18px;
                }
                .desc{
                    font-size: 14px;
                    color: #999;
                    margin: .23rem 0 0 .23rem;
                    line-height: .42rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .price{
                    margin: .25rem 0 0 .23rem;
                    float: left;
                    overflow: hidden;
                    span{
                        &:nth-child(1){
                            font-size: 18px;
                            color: #ff5918;
                            float: left;
                        }
                        &:nth-child(2){
                            font-size: 13px;
                            color: #ccc;
                            margin: .05rem 0 0 .28rem;
                            float: left;
                            text-decoration: line-through;
                        }
                    }
                }
                .icon{
                    float: right;
                    margin: .1rem .32rem 0 0;
                    span{
                        display: block;
                        width: .62rem;
                        height: .46rem;
                        border: .02rem solid #6eb042;
                        text-align: center;
                        line-height: .46rem;
                        border-radius: .12rem;
                        font-size: .26rem;
                        color: #6eb042;
                        margin: 0 0 0 .22rem;
                        float: right;
                    }
                }
                &:after{
                    content: "";
                    display: block;
                    clear: both;
                }
                .sign{
                    position: absolute;
                    top: -.26rem;
                    left: .38rem;
                    height: .52rem;
                    img{
                        width: .62rem;
                        margin-left: .08rem;
                    }
                }
            }
            .navigation{
                width: 100%;
                height: 1rem;
                img{
                    width: 100%;
                    margin-top: .32rem;
                }
            }
            .info{
                height: 1.46rem;
                background: #fff;
                padding: .42rem 0 0 .24rem;
                box-sizing: content-box;
                div{
                    float: left;
                    font-size: 14px;
                    width: 3.51rem;
                    color: #001e00;
                    &:nth-child(3),&:nth-child(4){
                        margin-top: .5rem;
                    }
                    span:nth-child(1){
                        color: #999;
                    }
                }
                &:after{
                    content: '';
                    clear: both;
                    display: block;
                }
            }
            .message{
                background: #fff;
                height: .9rem;
                line-height: .9rem;
                padding: 0 .24rem;
                font-size: 15px;
                margin-top: .22rem;
                box-sizing: content-box;
                p{
                    float: left;
                }
                img{
                    width: .14rem;
                    float: right;
                    margin-top: .3rem;
                }
            }
            .advice{
                height: .9rem;
                line-height: .9rem;
                font-size: 15px;
                color: #001e00;
                text-align: center;
                position: relative;
                background: #f4f4f4;
                span{
                    display: block;
                    height: 1px;
                    width: 4.7rem;
                    position: absolute;
                    top: .45rem;
                    left: 1.4rem;
                    background: #001e00;
                }
                p{
                    width: 1.68rem;
                    display: inline-block;
                    background: #f4f4f4;
                    position: relative;
                }
            }
            .info_img /deep/ img{
                width: 100%;
            }
        }
        .info_footer{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1rem;
            z-index: 4;
            .add{
                display: flex;
                .left{
                    width: 1.8rem;
                    height: 1rem;
                    background: #eb481c;
                    position: relative;
                    img{
                        width: .42rem;
                        margin: .26rem 0 0 .68rem;
                    }
                    span{
                        font-size: 11px;
                        color: #ff5918;
                        background: #fff;
                        position: absolute;
                        width: .3rem;
                        height: .3rem;
                        text-align: center;
                        line-height: .3rem;
                        top: .2rem;
                        left: 1rem;
                        border-radius: 50%;
                    }
                }
                .right{
                    flex: 1;
                    background: #ff5918;
                    color: #fff;
                    font-size: .32rem;
                    text-align: center;
                    height: 1rem;
                    line-height: 1rem;
                }
            }
            .nofood{
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1rem;
                z-index: 5;
                background: #e5e5e5;
                font-size: 18px;
                text-align: center;
                line-height: 1rem;
            }
        }
    }
</style>