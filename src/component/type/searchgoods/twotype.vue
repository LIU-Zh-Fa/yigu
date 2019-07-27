<template>
  <BScroll ref="goodswrap">
    <div class="conBox">
      <router-link tag="div" :to="'/detail/'+item.id" class="goodsBox" v-for="(item,index) in goodsList" :key="index">
        <!-- pic -->
        <div class="goodsPic">
          <img :src="item.bigImg" alt>
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
            <i  @click.stop="addCar(index)" class="addCar iconfont icon-gouwuche"></i>
          </div>
        </div>
      </router-link>
    </div>
  </BScroll>
</template>
<script>
import Vuex, { mapActions } from "vuex";
import { type } from "os";
export default {
  activated() {
    // this.getgoods();
  },
  mounted() {
    this.$refs.goodswrap.getseaGoodsMore();
  },
  watch: {
    goodsList() {
      this.$refs.goodswrap.update();
    },
    // inputVal(){
    //   this.getgoods()
    // }
  },
  computed: {
    ...Vuex.mapState({
      goodsList: state => state.type.searchgoodsList,
      inputVal:state=>state.type.inputVal,
    })
  },
  updated() {
    this.$refs.goodswrap.getih();
  },
  methods: {
    ...mapActions({
      // getgoods: "type/getseaGoodsList"
    }),
    addCar(index){
      let obj ={
                goodid: this.goodsList[index].id,
                goodName: this.goodsList[index].goodsName,
                goodPrice: this.goodsList[index].mallPrice,
                goodImg: this.goodsList[index].bigImg,
                goodSpec: this.goodsList[index].goodsStandard,
                num: 1,
                type: "yigu"
      }
      console.log(obj)
      this.$store.dispatch("Shopcar/addCar",obj)
    }
  }
};
</script>
<style lang="scss" scoped>
$color: #f0f2f5;
// goods
.conBox {
  background: $color;
  padding-top: 1.54rem;
  overflow: auto;
  .goodsBox {
    width: 3.53rem;
    height: 5.15rem;
    float: left;
    margin: 0.06rem 0 0.12rem 0.14rem;
    border-radius: 0.5rem;
    .goodsPic {
      width: 3.53rem;
      height: 3.35rem;
      background: #fff;
      img {
        height: 100%;
        width: 100%;
        padding: 0 0.1rem;
      }
    }
    //
    .goodsInfo {
      background: #fff;
      padding: 0 0.1rem;
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
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        height: 0.4rem;
        line-height: 0.4rem;
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
        position: relative;
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
          position: absolute;
          right: .1rem;
          // z-index: 1000
        }
      }
    }
  }
  // }
}
</style>