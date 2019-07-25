<template>
    <div class="mymask" v-show="showFlag" @tap.stop="closeMask" @touchmove.prevent @mousewheel.prevent>
        <ul class="menu">
            <router-link to="/home" tag="li">
                <i class="iconfont">&#xe626;</i>
                <span>首页</span>
            </router-link>
            <router-link to="/wc/type" tag="li">
                <i class="iconfont">&#xe60d;</i>
                <span>分类</span>
            </router-link>
            <router-link to="/match" tag="li">
                <i class="iconfont">&#xe616;</i>
                <span>宅配</span>
            </router-link>
            <router-link to="/shopcar" tag="li">
                <i class="iconfont">&#xe6f2;</i>
                <span>购物车</span>
            </router-link>
            <router-link to="/mine" tag="li">
                <i class="iconfont">&#xe633;</i>
                <span>我的</span>
            </router-link>
        </ul>
        <div class="jiao"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showFlag: false
        }
    },
    methods:{
        closeMask(){
            this.showFlag = false
        },
        openMask(){
            this.showFlag = true
        }
    }
}
</script>
<style lang="scss" scoped>
    .mymask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0,0,0,0.2);
        z-index: 999;
        .menu{
            width: 100px;
            background: #fff;
            position: absolute;
            top: .9rem;
            right: .15rem;
            border-radius: .1rem;
            li{
                line-height: .75rem;
                height: .75rem;
                border-bottom: .01rem solid #eee;
                padding: 0 .2rem;
                color: #666;
                .iconfont{
                    font-size: 15px;
                    margin-right: .15rem;
                }
                span{
                    font-size: 13px;
                }
            }
        }
        .jiao{
            width: .3rem;
            height: .3rem;
            background: #fff;
            position: absolute;
            top: .75rem;
            right: .4rem;
            transform: rotate(45deg);
        }
    }
</style>