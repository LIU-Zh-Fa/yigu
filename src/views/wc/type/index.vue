<template>
    <div class="type">
        <div class="top">
            <img src="http://wmall.wochu.cn/h5/classify/img/icon-search-40@2x.png">
            <div>支持首字母搜索</div>
        </div>
        <div class="fg"></div>
        <div class="menu">
            <ul class="menu_left">
                <v-touch tag="li"
                    v-for="(item,index) in parentList" 
                    :key="index" 
                    @tap="changeMenu(item.id)"
                    :class="{'active':item.id === menuId}"
                ><p>{{item.name}}</p></v-touch>
            </ul>
            <div class="menu_right">
                <div class="tj_menu" v-if="menuId === -1">
                    <div v-if="tjList[0]">
                        <h3 class="tit" v-if="tjList[0]">{{tjList[0].name}}</h3>
                        <ul>
                            <v-touch tag="li" v-for="(item,index) in tjList[0].children" 
                                :key="index"
                                @tap="goActive(item.urlType,item.url,item.url)"
                            >
                                <img :src="item.imgUrl">
                                <p>{{item.name}}</p>
                            </v-touch>
                        </ul>
                    </div>
                    <div class="fg"></div>
                    <div v-if="tjList[1]">
                        <h3 class="tit" v-if="tjList[1]">{{tjList[1].name}}</h3>
                        <ul>
                            <v-touch tag="li" v-for="(item,index) in tjList[1].children" 
                                :key="index"
                                @tap="goActive(item.urlType,item.url,item.url)"
                            >
                                <img :src="item.imgUrl">
                                <p>{{item.name}}</p>
                            </v-touch>
                        </ul>
                    </div>
                </div>
                <div class="menu" 
                    v-for="(meunobj,index) in menuList"
                    v-show="meunobj.parentId === menuId"
                    :key="index"
                >
                    <ul>
                        <v-touch tag="li" v-for="(item,index) in meunobj.list" :key="index" @tap="goGoodList(meunobj.parentId,item.id)">
                            <img :src="item.checkicon">
                            <p>{{item.name}}</p>
                        </v-touch>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vuex from 'vuex'
export default {
    data(){
        return {
            menuId: -1
        }
    },
    methods:{
        changeMenu(id){
            this.menuId = id;
        },
        goActive(urlType,url,name){
            if(urlType === "1"){
                var actId = url.split("?")[1].split("=")[1];
                this.$router.push("/wc/list/active/"+actId);
            }else if(urlType === "3"){
                this.$router.push("/wc/list/tjlist/"+name);
            }
        },
        goGoodList(parentId,menuid){
            this.$router.push("/wc/list/goodlist/"+parentId+"/"+menuid);
        },
        ...Vuex.mapActions({
            getData: "WcType/getData"
        })
    },
    created(){
        this.getData()
    },
    computed: {
        ...Vuex.mapState({
            parentList: state=>state.WcType.parentList,
            tjList: state=>state.WcType.tjList,
            menuList: state=>state.WcType.menuList,
        })
    }
}
</script>
<style scoped lang="scss">
    .type{
        display: flex;
        flex-direction: column;
        height: 100%;
        .top{
            width: 7.1rem;
            height: .68rem;
            margin: .12rem .24rem;
            line-height: .62rem;
            border-radius: .12rem;
            padding: 0 .24rem;
            border: .01rem solid #ccc;
            overflow: hidden;
            box-sizing: border-box;
            img{
                width: .4rem;
                height: .4rem;
                float: left;
                margin-top: .14rem;
            }
            div{
                width: 6.12rem;
                height: .62rem;
                float: right;
                font-size: 14px;
                line-height: .68rem;
                color: #ccc;
            }
        }
        .fg{
            height: .22rem;
            background: #f4f5f7;
        }
        .menu{
            flex: 1;
            display: flex;
            .menu_left{
                width: 1.8rem;
                color: #666;
                font-size: 15px;
                height: 100%;
                overflow: auto;
                li{
                    box-sizing: border-box;
                    width: 100%;
                    height: 1rem;
                    padding: .26rem 0;
                    line-height: .6rem;
                    text-align: center;
                    font-size: 14px;
                    &.active p{
                        color: #6eb042;
                        font-size: 16px;
                        height: .6rem;
                        border-left: .06rem solid #6eb042;
                    }
                }
            }
            .menu_right{
                flex: 1;
                border-left: .01rem solid #e5e5e5;
                height: 100%;
                overflow: auto;
                .tj_menu{
                    .tit{
                        width: 100%;
                        height: .9rem;
                        line-height: .9rem;
                        background: #fff;
                        text-align: center;
                        overflow: hidden;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    >div{
                        overflow: hidden;
                    }
                    .fg{
                        width: 100%;
                        height: .22rem;
                        background: #f4f5f7;
                    }
                }
                ul{
                    width: 100%;
                    padding: .2rem .02rem 0 .22rem;
                    box-sizing: border-box;
                    li{
                        float: left;
                        width: 1.58rem;
                        margin-right: .22rem;
                        height: 2.2rem;
                        text-align: center;
                        img{
                            width: 1rem;
                            height: 1rem;
                            display: inline-block;
                        }
                        p{
                            height: .86rem;
                            width: 1rem;
                            color: #666;
                            line-height: .34rem;
                            padding-top: .2rem;
                            margin: 0 auto;
                        }
                    }
                }
            }
        }
    }
</style>
