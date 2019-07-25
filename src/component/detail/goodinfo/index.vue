<template>
    <div>
        <div class="good_tit">
            <div class="price"><span>￥</span>{{gooddata.mallPrice | price}}</div>
            <div class="tag">
                <p>自营</p>
                <p>次日达</p>
                <p>深圳平湖仓</p>
            </div>
            <div class="name">
                <p><span>{{gooddata.goodsName}}</span><span>{{gooddata.param2}}</span></p>
            </div>
        </div>
        <div class="good_info">
            <div>
                <span>时效</span>
                <p>当日16：00前下单，预计次日送达！</p>
            </div>
            <div>
                <span>提示</span>
                <p><span>产品图片及其描述仅作参考，请以收到时的实物为准</span><b>收货后商品如有损坏，请您当场拍下图片，并保留相关商品，在24小时之内及时联系售后客服，以便我们给您更换完好的商品！如非质量问题，概不退换！</b></p>
            </div>
            <div class="spec">
                <span>已选</span>
                <v-touch tag="p" @tap="openSpec">{{gooddata.goodsStandard}}，{{gooddata.minStripping}}{{gooddata.goodsUnit}}</v-touch>
            </div>
            <div class="city">
                <span>送至</span>
                <v-touch tag="p" @tap="openCity">{{province}} {{city}} {{county}}</v-touch>
            </div>
            <div>
                <span>重量</span>
                <p>{{gooddata.grossWeight}}/{{gooddata.goodsUnit}}</p>
            </div>
            <div>
                <span>运费</span>
                <p>全场满199元包邮（限深圳市），单笔不足运费8元起， 生鲜类仅限深圳同城！ </p>
            </div>
        </div>
        <div class="good_tag">
            <div class="tag_top">
                <v-touch tag="div" @tap="changeTag(1)"><p :class="{'active': tagIndex === 1}">商品介绍</p></v-touch>
                <v-touch tag="div" @tap="changeTag(2)"><p :class="{'active': tagIndex === 2}">规则参数</p></v-touch>
                <v-touch tag="div" @tap="changeTag(3)"><p :class="{'active': tagIndex === 3}">售后保障</p></v-touch>
            </div>
            <div class="tag_info">
                <div v-show="tagIndex === 1" class="tag_desc" v-html="goodDesc"></div>
                <div v-show="tagIndex === 2" class="tag_param">
                    <div>
                        <h5>基本信息</h5>
                        <p>品牌：{{gooddata.goodsBrand}}</p>
                        <p>产地：{{gooddata.address}}</p>
                        <p>毛重：{{gooddata.grossWeight}}</p>
                    </div>
                    <div>
                        <h5>包装信息</h5>
                        <p>包装：{{gooddata.goodsUnit}}</p>
                        <p>规格：{{gooddata.goodsStandard}}</p>
                    </div>
                    <div>
                        <h5>配送方式</h5>
                        <p>自营：当日16点前下单，次日送达，仅限深圳市； </p>
                        <p>代发：当日16点前下单，1-3天发货。</p>
                    </div>
                    <div>
                        <h5>存储方式</h5>
                        <p>保存：{{gooddata.param4}}</p>
                        <p>保质期：{{gooddata.param3}}</p>
                    </div>
                </div>
                <div v-show="tagIndex === 3" class="tag_server">
                    <ul>
                        <li>
                            <img src="http://m.egu365.cn/img/slogan_01.png">
                            <div>
                                <p>安全食品</p>
                                <span>官方实名认证</span>
                            </div>
                        </li>
                        <li>
                            <img src="http://m.egu365.cn/img/slogan_02.png">
                            <div>
                                <p>基地直供</p>
                                <span>食材最短供应链</span>
                            </div>
                        </li>
                        <li>
                            <img src="http://m.egu365.cn/img/slogan_03.png">
                            <div>
                                <p>全程冷链</p>
                                <span>食材新鲜不流失</span>
                            </div>
                        </li>
                        <li>
                            <img src="http://m.egu365.cn/img/slogan_04.png">
                            <div>
                                <p>双重检测</p>
                                <span>确保食材安全</span>
                            </div>
                        </li>
                        <li>
                            <img src="http://m.egu365.cn/img/slogan_05.png">
                            <div>
                                <p>五星服务</p>
                                <span>购物更省心省事</span>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <p>商品退换货</p>
                        <div>
                            <p>1、客户在收到商品后可享受“7日内无理由退货”，已标示不允许退货和鲜活易腐商品除外。</p>
                            <p>2、因产品质量问题发生退换货时，所换商品将在约定的时间重新配送，免收物流费。</p>
                            <p>3、因客户保存不善造成的商品损坏，我们将不予退换。</p>
                            <p>4、如商品存在质量问题，请保留质量物品原物，依谷验货人员将在接到投诉后12小时内上门验货。您也可以登陆依谷网在会员管理处向依谷客服人员投诉，并上传质量问题图片。</p>
                            <p>6、水果类商品不能以外观瑕疵、个人口感为由提出退换，如因其它品质问题退货，则需提出退货理由并填写商品拒收单给送货员，所退货品交由送货员带回。您或您的委托收货人的签字表示您对商品质量及数量无异议，依谷网有权不接受以此为由的退换货。</p>
                            <p>7、网上产品销售图片及信息仅供参照，因拍摄灯光及不同显示器色差等问题可能造成商品图片与实物有一定色差，一切以实物为准。 依谷网不接受以此为由的退换货。</p>
                            <p>8、发生退货后，请联系我们的客服，经客服工作人员核实后会为您办理退款。我们会将货款24小时内退至您的依谷网个人帐户中，以便于下次订购时使用；对于网银支付或使用支付宝支付的客户如需将款项退至原支付账户，将在申请退款后7日内到账。</p>
                            <p>以上规则最终解释权由依谷网所有。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <City ref="city" :updateCity="updateCity"/>
        <GoodSpec ref="spec" :goodname="gooddata.goodsName" :goodprice="gooddata.mallPrice" :goodimg="gooddata.goodsImg" :goodspec="gooddata.goodsStandard"/>
    </div>
</template>
<script>
    import City from '../city'
    import GoodSpec from '../goodspec'
    export default {
        data(){
            return {
                gooddata:{},
                province: window.sessionStorage.provkey ? JSON.parse(window.sessionStorage.provkey).name : '北京',
                city: window.sessionStorage.citykey ? JSON.parse(window.sessionStorage.citykey).name : '北京',
                county: window.sessionStorage.countykey ? JSON.parse(window.sessionStorage.countykey).name : '东城区',
                tagIndex: 1,
                goodDesc: ''
            }
        },
        created(){
            this.getData();
        },
        components:{
            City,GoodSpec
        },
        watch:{
            $route:{
                handler(newV){
                    if(newV.name==='detail'){
                        this.getData();
                    }
                },
                deep: true
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
                    this.gooddata = res.data.obj.bseGoodsEo;
                    this.gooddata.goodsId = res.data.obj.goodsId;
                    this.gooddata.goodsName = res.data.obj.goodsName;
                    this.gooddata.mallPrice = res.data.obj.mallPrice;
                })
                this.$axios.get("/api/goods/desc",{
                    params: {
                        id: this.$route.params.goodid
                    }
                }).then((res)=>{
                    this.goodDesc = res.data.obj.goodsDesc;
                })
            },
            openCity(){
                this.$refs.city.openCity();
            },
            openSpec(){
                this.$refs.spec.openSpec();
            },
            updateCity(){
                this.province = JSON.parse(window.sessionStorage.provkey).name;
                this.city = JSON.parse(window.sessionStorage.citykey).name;
                this.county = JSON.parse(window.sessionStorage.countykey).name;
            },
            changeTag(index){
                this.tagIndex = index;
            }
        },
        filters:{
            price(val){
                return Number(val || 0).toFixed(2);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .good_tit{
        padding: .42rem .24rem;
        border-bottom: .01rem solid #aaa;
        .price{
            color: #ec231b;
            font-size: 25px;
            font-weight: bold;
            span{
                font-size: 16px;
            }
        }
        .tag{
            height: 1rem;
            display: flex;
            align-items: center;
            p{
                height: .32rem;
                line-height: .32rem;
                margin-right: .2rem;
                &:nth-child(1){
                    color: #ec231b;
                }
                &:nth-child(2){
                    background: #ec231b;;
                    color: #fff;
                    border-radius: .16rem;
                    padding: 0 .1rem;
                }
                &:nth-child(3){
                    color: #af5fef;
                }
            }
        }
        .name{
            font-size: 14px;
            font-weight: bold;
            color: #262626;
            span:nth-child(1){
                margin-right: .2rem;
            }
        }
    }
    .good_info{
        div{
            padding: .24rem;
            margin-bottom: .24rem; 
            color: #999;
            display: flex;
            span{
                width: .7rem;
            } 
            p{
                flex: 1;
                color: #666;
                span{
                    color: #ec231b;
                }
                b{
                    display: block;
                    font-weight: normal;
                }
            }
            &.spec p{
                color: #ec231b;
                font-weight: bold;
            }
        }
    }
    .good_tag{
        .tag_top{
            display: flex;
            div{
                flex: 1;
                width: 100%;
                text-align: center;
                height: .75rem;
                line-height: .7rem;
                color: #666;
                p{
                    width: max-content;
                    display: inline-block;
                    box-sizing: border-box;
                    &.active{
                        border-bottom: .05rem solid #f44;
                    }
                }
            }
        }
        .tag_info{
            .tag_desc{
                /deep/ img{
                    width: 100%;
                }
            }
            .tag_param{
                >div{
                    margin: .22rem;
                    padding: .17rem;
                    border-bottom: .04rem solid #eee;
                    h5{
                        font-size: 13px;
                        color: #030000;
                        line-height: .5rem;
                    }
                    p{
                        font-size: 12px;
                        color: #60605e;
                        line-height: .32rem;
                    }
                }
            }
            .tag_server{
                ul{
                    padding-top: .17rem;
                    overflow: hidden;
                    li{
                        width: 50%;
                        float: left;
                        box-sizing: border-box;
                        padding: .11rem .17rem;
                        height: 1.1rem;
                        display: flex;
                        align-items: center;
                        img{
                            width: .8rem;
                            height: .8rem;
                            margin-top: .15rem;
                            margin-right: .2rem;
                        }
                        div{
                            p{
                                color:#f00;
                                line-height: .38rem;
                                text-align: center;
                                font-size: 14px;
                            }
                            span{
                                color: #666;
                            }
                        }
                    }
                }
                >div{
                    padding: .14rem;
                    >p{
                        font-size: 15px;
                        margin: .14rem 0;
                        color: #fd7400;
                        line-height: .4rem;
                    }
                    div{
                        p{
                            text-indent: 24px;
                            font-size: 12px;
                            line-height: .4rem;
                            color: #666
                        }
                    }
                }
            }
        }
    }
</style>
