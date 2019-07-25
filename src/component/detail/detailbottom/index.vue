<template>
    <div class="detail_bottom">
        <div class="bottom_left">
            <div>
                <i class="iconfont">&#xe626;</i>
                <p>首页</p>
            </div>
            <div>
                <i class="iconfont">&#xe616;</i>
                <p>分类</p>
            </div>
            <div>
                <i class="iconfont">&#xe601;</i>
                <p>购物车</p>
                <span>{{num}}</span>
            </div>
        </div>
        <div class="bottom_right">
            <v-touch tag="div" @tap="addCar" class="add_car">加入购物车</v-touch>
            <v-touch tag="div" @tap="shoppingBuy" class="shopping_buy">立即购买</v-touch>
        </div>
    </div>
</template>
<script>
    import Observer from '@/common/observer'
    export default {
        data(){
            return {
                num: sessionStorage.goodNum ? sessionStorage.goodNum : 0
            }
        },
        methods: {
            addCar(){
                Observer.$emit("detail_bottom_add",{n:1});
                this.getNum();
            },
            shoppingBuy(){
                this.addCar()
                this.$router.push("/shopcar")
            },
            getNum(){
                this.num = sessionStorage.goodNum ? sessionStorage.goodNum : 0
            }
        }
    }
</script>
<style lang="scss" scoped>
    .detail_bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .87rem;
        background: #fff;
        z-index: 20;
        display: flex;
        >div{
            display: flex;
            flex: 1;
            width: 100%;
            div{
                flex:1;
                text-align: center;
                position: relative;
                .iconfont{
                    font-size: 14px;
                    display: block;
                    margin: .15rem auto .05rem;
                }
                p{
                    color: #666;
                }
                span{
                    position: absolute;
                    display: block;
                    width: .26rem;
                    height: .26rem;
                    font-size: 12px;
                    line-height: .26rem;
                    text-align: center;
                    border-radius: 50%;
                    background: #f44;
                    color: #fff;
                    top: 0.05rem;
                    right: 0.3rem;
                }
            }
            .add_car{
                height: .87rem;
                line-height: .87rem;
                background: #ffac0a;
                font-size: 13px;
                color: #fff;
            }
            .shopping_buy{
                height: .87rem;
                line-height: .87rem;
                background: #f44;
                font-size: 13px;
                color: #fff;
            }
        }

    }
</style>
