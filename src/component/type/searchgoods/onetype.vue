<template>
<BScroll>
  <div class="conBox">
    <div class="goodsBox" v-for="(item,index) in goodsList" :key="index">
      <!-- pic -->
      <div class="goodsPic">
        <img :src=item.bigImg alt>
      </div>
      <!-- info -->
      <div class="goodsInfo">
        <p class="goodsName ellipsis">{{item.goodsName}}</p>
        <p class="googsSlogan ellipsis">{{item.slogan}}</p>
        <div class="selfSupport">
          <span class="wordLeft">自营</span>
          <span class="morrow">次日达</span>
          <span class="wordRight">深圳仓平湖</span>
        </div>

        <div class="goodsPrice">
          <span class="price">¥{{item.mallPrice.toFixed(2)}}</span>
          <i class="addCar iconfont icon-gouwuche"></i>
        </div>
      </div>
    </div>
  </div>
  </BScroll>
</template>
<script>
import Vuex from "vuex"
export default {
   computed:{
    ...Vuex.mapState({
      goodsList:state=>state.type.searchgoodsList
    })
  },
};
</script>
<style lang="scss" scoped>
$color: #f0f2f5;
// goods
.conBox {
  background: $color;
  margin-top: 1.54rem;
  // height: 100%;
  overflow: hidden;
  .goodsBox {
    width: 100%;
    height: 2.29rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goodsPic {
      width: 30%;
      background: #fff;
      img {
        height: 2.29rem;
        width: 100%;
        padding: 0 0.1rem;
      }
    }
    //
    .goodsInfo {
      background: #fff;
      padding: 0 0.1rem;
      width: 70%;
      height: 2.29rem;
      .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 0.4rem;
        font-size: 13px;
        line-height: 0.4rem;
      }
      .goodsName {
        color: #4f4f4f;
      }
      .googsSlogan {
        color: #939393;
      }
      .selfSupport {
        display: flex;
        align-items: center;
        font-size: 13px;
        height: 0.4rem;
        line-height: 0.4rem;
        margin-top: .1rem;
        .wordLeft {
          color: red;
        }
        .morrow {
          color: #fff;
          background: red;
          padding: 1px 2px;
          border-radius: 0.14rem;
          height: 0.32rem;
          line-height: 0.32rem;
          text-align: center;
          margin: 0 .15rem;
        }
        .wordRight {
          color: #af52ef;
        }
      }
      .goodsPrice {
        height: 0.65rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: red;
          font-size: 18px;
        }
        .addCar {
          color: #fff;
          background: red;
          font-size: 22px;
          margin: 1px;
          border-radius: 50%;
          margin-right: .1rem;
          padding: 2px;
        }
      }
    }
  }
}
</style>