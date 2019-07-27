<template>
  <div class="type">
    <SearchTop></SearchTop>

    <div class="navBox" ref="navBox">
      <!-- 横向导航 -->
      <div class="navListBox" ref="navListBox">
        <BScroll ref="navScroll">
          <ul>
            <v-touch
              :class="navHindex <0 ? 'activeRed' : '' "
              @tap="changeIndex"
              ref="all"
              tag="li"
            >全部</v-touch>
            <div v-if="conNav[navIndex]" class="lala">
            <v-touch
              v-for="(item,index) in conNav[navIndex].bcProductTypeEos"
              :class="index==navHindex ? 'activeRed' : ''"
              @tap="navBoxIndex({index:index,id:item.tid})"
              tag="li"
              :key="index"
            >{{item.tname}}</v-touch></div>
          </ul>
        </BScroll>
      </div>
    </div>

    <div class="conBox">
      <!-- 竖向导航 -->
      <div class="conNav">
        <ul>
          <v-touch
            v-for="(item,idx) in conNav"
            :key="idx"
            :class=" HXactiveId==item.tid ? 'activeBlack' : ''"
            @tap="getNavIndex({idx:idx,id:item.tid})"
            tag="li"
          >{{item.tname}}</v-touch>
        </ul>
      </div>

      <!-- 商品详情 -->
      <keep-alive>
        <div class="scrollBox">
          <BScroll ref="goodswrap">
            <div class="conMain">
              <router-link
                tag="div"
                :to="'/detail/'+item.id"
                class="goodsList"
                v-for="(item,index) in goodsList"
                :key="index"
              >
                <div class="goodsPic">
                  <img :src="item.bigImg" alt>
                </div>

                <div class="goodsInfo">
                  <h1 class="goods-name ellipsis">{{item.goodsName}}</h1>
                  <h2 class="goods-slogan ellipsis">{{item.slogan}}</h2>
                  <div class="self-support">
                    <i class="logo">自营</i>
                    <i class="morrow">次日达</i>
                    <i class="express">深圳平湖仓</i>
                  </div>
                  <div class="price-cart flx">
                    <i class="goods-price flx-1">¥{{item.salePrice.toFixed(2)}}</i>
                    <i class="iconfont icon-gouwucheman add-cart" @click.stop="addCar(index)"></i>
                  </div>
                </div>
              </router-link>
            </div>
          </BScroll>
        </div>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import SearchTop from "@/component/type/searchtop";

import { setTimeout } from "timers";
export default {
  name: "type",
  created() {
    this.getNavlist();
  },
  activated() {
    this.getgoodsInfo();
  },
  components: {
    SearchTop
  },
  computed: {
    ...Vuex.mapState({
      conNav: state => state.type.conNav,
      goodsList: state => state.type.goodsList,
      navIndex: state => state.type.navIndex,
      navHindex: state => state.type.navBoxIndex,
      tId: state => state.type.tId,
      HXactiveId: state => state.type.HXactiveId,
      allId: state => state.type.allId,
      pageNo: state => state.type.pageNo
    })
  },
  watch: {
    tId() {
      this.getgoodsInfo();
    },
    goodsList() {
      this.$refs.goodswrap.update();
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.goodswrap.getGoodsMore();
      }, 3000);
    });
  },
  updated() {
    this.$refs.goodswrap.getih();
  },
  methods: {
    ...Vuex.mapActions({
      getNavlist: "type/getNavlist",
      getgoodsInfo: "type/getgoodsInfo"
    }),
    // 竖向
    getNavIndex(idx) {
      this.$store.dispatch("type/getNavIndex", idx);
      this.$refs.navScroll.handleTo({ t: 0, w: 0 });
    },

    // 横向
    navBoxIndex(index) {
      let t = this.$refs.navListBox.getElementsByTagName("li")[index.index + 1]
        .offsetLeft;
      let w = window.innerWidth;
      let uw = this.$refs.navListBox.getElementsByTagName("ul")[0].offsetWidth;
      let lw = this.$refs.navListBox.getElementsByTagName("li")[0].offsetWidth;
      // console.log(widthLI);
      let obj = { t, w, uw, lw };
      this.$refs.navScroll.handleTo(obj);
      this.$store.dispatch("type/navBoxIndex", index);
    },
    changeIndex() {
      this.$store.commit("type/changeIndex");
    },
    addCar(index) {
      let obj = {
        goodid: this.goodsList[index].id,
        goodName: this.goodsList[index].goodsName,
        goodPrice: this.goodsList[index].mallPrice,
        goodImg: this.goodsList[index].bigImg,
        goodSpec: this.goodsList[index].goodsStandard,
        num: 1,
        type: "yigu"
      };
      this.$store.dispatch("Shopcar/addCar", obj);
    },
    // homeActive(id){
    //   this.$store.dispatch("type/homeActive",id)
    // }
  }
};
</script>
<style lang="scss" scoped>
$color: rgb(255, 255, 255);
.type {
  height: 100%;
}
.lala{
  display: flex;
  width:max-content;
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
  .navListBox {
    width: 100%;
    // height: 0.74rem;
    ul {
      width: max-content;
      height: 0.74rem;
      display: flex;
      // position: absolute;
      li {
        flex-shrink: 0;
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
}

.conBox {
  height: 100%;
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
    // overflow: auto;
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
          position: relative;
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
            position: absolute;
            right: 0.1rem;
          }
        }
      }
    }
  }
}

.activeBlack {
  color: black !important;
}
.activeRed {
  color: #fb1116 !important;
}
</style>