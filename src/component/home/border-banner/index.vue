<template>
  <div class="border-banner">
    <img :src="this.bgImg1" alt="">
    <div class="header"> 查看更多 》</div>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img v-lazy="item.goodImg" alt="">
        <div class="p">{{item.goodName}}</div>
        <div style="color:red;font-size:.32rem">
          ￥{{item.goodPrice}}
          <i class="iconfont i"> &#xe600; </i> 
        </div>
      </li>
      <li style="text-align:center;line-height:3rem;">
        查看更多 >
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  props:["bgImg1","id"],
  name: 'home2',
  components: {
   
  },
  data() {
    return {
      list:[]
    }
  },
  methods: {
    init(){      
      this.$axios .get("http://api.egu365.cn/news/adviseGoods?seat="+this.id)
      .then((data) => {
          data.data.list.forEach(element => {
            this.list.push({
              goodImg:element.bseGoodsEo.goodsImg,
              goodSpec:element.bseGoodsEo.goodsStandard,
              goodName:element.goodsName,
              goodId:element.goodsId,
              goodPrice:element.mallPrice
            })
          });
      })
    }
  },
  created() {
    this.init();
  },
}
</script>
<style lang="scss" scoped>
  .border-banner{
      position: relative;
      height: 5.18rem;
    img{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: 1;
    }
    .header{
      z-index: 2;
      width: 100%;
      color: #fff;
      top: 1rem;
      font-size: .2rem;
      text-align: center;
      position: absolute;
    }
    ul{
      position: absolute;
      top:1.5rem;
      width: 100%;
      display: flex;
      overflow-x: auto;
      z-index: 4;
      li{
        background-color: #fff;
        margin-left: .1rem;
        margin-right: .1rem;
        padding-right: .2rem;
        width: 2.26rem;
        height: 3.4rem;
        font-size: .26rem;
        flex-shrink: 0;
        display: inline-block;
        img{
          width: 2.26rem;
        }
        .p{
          margin-top: 2.3rem;
          padding: 0 .1rem;
          width:2.26rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .i{
            background: red;
            border-radius: 50%;
            color: #fff;
            padding: .09rem;
            float: right;
        }
      }
    }
  }
</style>
