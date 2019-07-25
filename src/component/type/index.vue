<template>
  <div class="type">
    <div class="header">
      <i @click="back" class="iconfont icon-jiantou3 back"></i>
      <div class="searchbox">
        <span class="iconfont icon-iconset0157 searchfont"></span>
        <input type="text" placeholder="桃子">
      </div>
      <u class="iconfont icon-gengduo2"></u>
    </div>
    
    <div class="navBox">
      <!-- 横向导航 -->
      <div class="navListBox" ref="navListBox"> 
       <BScroll ref="navScroll">
        <ul>
           <v-touch :class="navHindex <0 ? 'activeRed' : '' " @tap="changeIndex" ref="all" tag="span">全部</v-touch>
          <v-touch v-for="(item,index) in conNav[navIndex].bcProductTypeEos" :class="index==navHindex ? 'activeRed' : ''"  @tap="navBoxIndex({index:index,id:item.tid})" tag="li" :key="index">{{item.tname}}</v-touch>
        </ul>
        </BScroll>
      </div>
    
</template>

<script>
import Vuex from "vuex";
import { log } from 'util';
export default {
  name: "type",
  created() {
    this.getNavlist();
    this.getgoodsInfo();
    
  },
  components: {},
  computed: {
    ...Vuex.mapState({
      conNav: state => state.type.conNav,
      goodsList: state => state.type.goodsList,
      navIndex:state => state.type.navIndex,
      navHindex:state => state.type.navBoxIndex,
      tId:state => state.type.tId,
      allId:state => state.type.allId,
      pageNo:state =>state.type.pageNo
    })
  },
  watch:{
    tId(){
       this.getgoodsInfo();
    },
    // pageNo(){
    //   this.getgoodsInfo();
    // }
    goodsList(){
      this.$refs.goodswrap.update()
    }
  },
  mounted(){
    this.$refs.goodswrap.getGoodsMore();
  },
  updated(){
    this.$refs.goodswrap.getih();
  },
  methods: {
    back() {
      this.$router.back();
    },
    ...Vuex.mapActions({
      getNavlist: "type/getNavlist",
      getgoodsInfo: "type/getgoodsInfo"
    }),
    // 竖向
    getNavIndex(idx){
      this.$store.dispatch("type/getNavIndex",idx)
      // this.getgoodsInfo();
      this.$refs.navScroll.handleTo(0,0);
    },

    // 横向
    navBoxIndex(index){
      let to = this.$refs.navListBox.getElementsByTagName("li")[index.index].offsetLeft
      let widthW = window.innerWidth;
      // console.log(widthW)
     console.log(to)
       this.$refs.navScroll.handleTo(to,widthW);
      this.$store.dispatch("type/navBoxIndex",index)
      // this.getgoodsInfo();
    },
    changeIndex(){
      this.$store.commit("type/changeIndex")
      // this.getgoodsInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
$color: rgb(255, 255, 255);
.type{
  height:100%;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.77rem;
  background: $color;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  // overflow: hidden;
  .back {
    position: absolute;
    left: 0.2rem;
    font-size: 0.32rem;
  }
  u {
    position: absolute;
    right: 0.2rem;
    font-size: 0.5rem;
  }
  .searchbox {
    width: 5.29rem;
    height: 70%;
    background: #f7f8fa;
    border-radius: 0.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
      border: 0;
      width: 100%;
      height: 100%;
      outline: none;
      border-radius: 20px;
      background: #f7f8fa;
    }
    .searchfont {
      margin-right: 0.05rem;
    }
  }
}

.navBox {
  height: 0.76rem;
  width: 100%;
  background: #fff;
  z-index: 50;
  border-bottom: 1px solid #ccc;
  display: flex;
  // overflow: auto;
  position: fixed;
  top: 0.77rem;
  left: 0;
  ul {
    width: 150%;
    height: 0.74rem;
    display: flex;
    li ,span{
      width: 1.48rem;
      color: rgb(85, 85, 85);
      font-size: 13px;
      margin: 0 0.1rem;
      text-align: center;
      height: 0.74rem;
      line-height: 0.74rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.conBox {
  height:100%;
  position: relative;
  .conNav {
    width: 25%;
    background: #fff;
    float: left;
    position: fixed;
    top: 1.53rem;
    left: 0;
    li {
      color: #909090;
      width: 100%;
      height: 0.89rem;
      line-height: 0.89rem;
      text-align: center;
      font-size: 13px;
    }
  }
  .scrollBox {
    height: 100%;
    width: 75%;
    overflow: auto;
    float: right;
    padding-top: 1.53rem;
    padding-bottom: 1rem;
    .goodsList {
      width: 100%;
      height: 2.27rem;
      display: flex;
      .goodsPic {
        width: 2.27rem;
        line-height: 2.27rem;
        text-align: center;
        padding: 0.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsInfo {
        padding-left: 0.2rem;
        width: 3.42rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        .ellipsis {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .goods-name {
          height: 0.42rem;
          color: #303030;
          margin-top: 0.2rem;
          font-size: 13px;
        }
        .goods-slogan {
          font-size: 11px;
          color: #939393;
        }
        .self-support {
          height: 0.6rem;
          margin-top: 0.27rem;
          font-size: 13px;
          .logo {
            color: red;
          }
          .morrow {
            background-color: red;
            padding: 2px;
            margin: 5px;
            color: #fff;
            border-radius: 0.16rem;
          }
          .express {
            color: #af52ef;
          }
        }
        .price-cart {
          height: 0.67rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .goods-price {
            color: red;
            font-size: 0.36rem;
            // font-weight: 600;
          }
          .add-cart {
            color: #fff;
            background: red;
            margin-right: 0.08rem;
            font-size: 0.32rem;
            padding: 0.08rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
}

.activeBlack{
  color: black!important
}
.activeRed{
  color:#fb1116!important
}
</style>