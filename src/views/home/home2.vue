<template>
  <div class="home">
    
    <div class="seach">
      <div class="seach_div">
        <div class="iconfont">&#xe62f;</div>
       <v-touch tag="input" type="text" placeholder="桃子" @tap="goseach"/>
      </div>
    </div>
    <HomeSeacher ></HomeSeacher>
    <Banner></Banner>
    <ul class="nav1">
      <li v-for="(item,index) in list2" :key="index">
        <img :src="item.img" alt />
        <div>{{item.name}}</div>
      </li>
    </ul>
    <ul class="nav2">
      <v-touch tag="li" v-for="(item,index) in list" :key="index" @tap="gotype(item.tid)">
        <div class="nav2_img">
          <img v-lazy="item.timage" alt />
        </div>
        <div>{{item.tname}}</div>
      </v-touch>
      <v-touch tag="li" @tap="gotype(1)">
        <div class="nav2_img">
          <img src="http://oss.egu365.com/upload/mobile-all-categories.jpg" alt />
        </div>
        <div>全部分类</div>
      </v-touch>
    </ul>
    <div class="notice-wrap">
      <div class="notice-1">
        <img src="@/component/home/img/notice_bg.jpg" alt />
        <i></i>
        <Banner2></Banner2>
      </div>
    </div>
    <Banner3></Banner3>
    <div class="border">
      <div class="border_top">
        <img src="@/component/home/img/hot_sale_bg.jpg" alt class="early-wrap_img" />
        <div class="early-wrap">
          <img :src="border[0].bgImg1" alt class="early-wrap_img"  v-if="show"/>
          <div class="early-show-more">查看更多 》</div>
          <div class="early-goods-wrap">
            <div class="early-goods-head">尝鲜季</div>
            <div class="early-head-desc">购鲜，每月一次的舌尖之旅</div>
          </div>
          <ul class="early-goods-list">
            <v-touch tag="li" v-for="(item,index) in border" :key="index" @tap="goxiangqing(item.goodsId)">
              <img v-lazy="item.goodsImg" alt />
              <div>{{item.goodsName}}</div>
            </v-touch>
          </ul>
        </div>
      </div>
      <div class="border_foot">
        <img :src="border2[0].bgImg1" alt class="early-wrap_img" v-if="show"/>
        <div class="early-goods-wrap">
          <div class="early-goods-head">热销榜</div>
          <div class="early-head-desc">热卖，单品销量名次排行榜</div>
        </div>
        <ul class="early-goods-list">
          <v-touch tag="li" v-for="(item,index) in border2" :key="index" @tap="goxiangqing(item.goodsId)">
            <img v-lazy="item.goodsImg" alt />
            <div>{{item.goodsName}}</div>
            <div style="color:red;font-size:.3rem">￥{{item.mallPrice}}</div>
          </v-touch>
        </ul>
      </div>
    </div>
    <img src="@/component/home/img/today_advise.jpg" alt style="width:100%;margin-top:-.2rem;" />
    <div v-for="(item,index) in list" :key="index">
      <Banner4 :bgImg1="item.bgImg1" :id="item.id"></Banner4>
    </div>
    <img src="@/component/home/img/guess_you_like.jpg" alt style="width:100%;margin-top:-.2rem;" />
    <div class="footer">
      <ul>
        <v-touch tag="li" v-for="(item,index) in footer" :key="index" @tap="goxiangqing(item.goodid)" class="footer_div">
          <img :src="item.goodImg" alt="">
          <div class="footer_div3">{{item.goodName}}</div>
          <div class="footer_div2">
            ￥{{item.goodPrice}}
          <i class="iconfont i"> &#xe600; </i> 
          </div>
        </v-touch>
      </ul>
    </div>
  </div>
</template>
<script>
import Banner from "@/component/home/banner/index";
import Banner2 from "@/component/home/banner/nav_swiper";
import Banner3 from "@/component/home/banner/nav_swiper2";
import Banner4 from "@/component/home/border-banner";
import HomeSeacher from "@/component/type/search/index.vue";
import Vuex from 'vuex'
export default {
  data() {
    return {
      list: [],
      list2: [],
      list3: [],
      swiper: [],
      border: [],
      border2: [],
      footer: [],
      show:false,
      show2:true
    };
  },
  components: { Banner, Banner2, Banner3, Banner4 },
    methods: {
    goxiangqing(obj){
      this.$router.push("/detail/"+obj)
    },  
    goseach() {
     this.show2 = true;
     this.$router.push("/searchgoods")
    },
    gotype(id){
      console.log(id);
      this.$store.dispatch("type/homeActive",id)
      this.$router.push("/type")
    },     
    init() {
      this.$axios
        .get("http://api.egu365.cn/goods/list?sorts=hits+asc&pageNo=1")
        .then(data => {
          data.data.list.forEach(element => {
            this.footer.push({
              goodName: element.goodsName,
              goodImg: element.icoImg,
              goodPrice: element.makePrice,
              goodsSpec: element.goodsStandard,
              goodid: element.id
            });
          });
        });
      this.$axios
        .get("http://api.egu365.cn/news/adviseAll?id=95&pageSize=3")
        .then(data => {
          let _bgImg1 = "";
          let bcPublishedGoodsEos = [];
          for (const key in data.data.obj) {
            if (
              data.data.obj["bgImg1"] ||
              data.data.obj["bcPublishedGoodsEos"]
            ) {
              _bgImg1 = data.data.obj["bgImg1"];
              bcPublishedGoodsEos = data.data.obj["bcPublishedGoodsEos"];
            }
          }
          bcPublishedGoodsEos.forEach(element => {
            this.border2.push({
              bgImg1: _bgImg1,
              goodsId: element.goodsId,
              goodsName: element.goodsName,
              goodsImg: element.bseGoodsEo.goodsImg,
              mallPrice: element.mallPrice
            });
          });
        });
      this.$axios
        .get("http://api.egu365.cn/news/adviseAll?id=94&pageSize=4")
        .then(data => {
          let _bgImg1 = "";
          let bcPublishedGoodsEos = [];
          for (const key in data.data.obj) {
            if (
              data.data.obj["bgImg1"] ||
              data.data.obj["bcPublishedGoodsEos"]
            ) {
              _bgImg1 = data.data.obj["bgImg1"];
              bcPublishedGoodsEos = data.data.obj["bcPublishedGoodsEos"];
            }
          }
          bcPublishedGoodsEos.forEach(element => {
            this.border.push({
              bgImg1: _bgImg1,
              goodsId: element.goodsId,
              goodsName: element.goodsName,
              goodsImg: element.bseGoodsEo.goodsImg
            });
          });
          this.show = true;
        });
      this.$axios
        .get("http://api.egu365.cn/news/adviseImg?seat=92")
        .then(data => {
          data.data.list.forEach(element => {
            this.swiper.push({
              name: element.name
            });
          });
        });
      let idlist = [];
      this.$axios
        .get("http://api.egu365.cn/news/adviseImg?seat=91")
        .then(data => {
          data.data.list.forEach(element => {
            this.list2.push({
              img: element.img,
              name: element.name
            });
          });
        });
      this.$axios
        .get("http://api.egu365.cn/news/adviseSeats?type=10")
        .then(data => {
          data.data.list.forEach(element => {
            idlist.push({
              bgImg1: element.bgImg1,
              bgImg2: element.bgImg2,
              id: element.id
            });
          });
          this.$axios.get("http://api.egu365.cn/goods/classify").then(data => {
            let index = 0;
            data.data.list.forEach(element => {
              this.list.push({
                tid: element.tid,
                tname: element.tname,
                timage: element.timage,
                bgImg1: idlist[index].bgImg1,
                bgImg2: idlist[index].bgImg2,
                id: idlist[index].id
              });
              index++;
            });
          });
        });
    }
  },
  created() {
    this.init();
  },

};
</script>
<style lang="scss" scoped>
.home {
  // height: 2000px;
  padding-bottom: 0.8rem;
}
.seach {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #999;
  .seach_div {
    display: flex;
    background: rgba(194, 194, 194, 0.2);
    width: 6.8rem;
    height: 0.6rem;
    border-radius: 12px;
    margin: 0.2rem 0 0.2rem 0.1rem;
    .iconfont {
      margin: 0.13rem 0.1rem 0 0.2rem;
    }
    input {
      padding-left: 0.1rem;
      width: 6rem;
      opacity: 1;
      color: #999;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }
}
.nav1 {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0.5rem 0.3rem 0 0.3rem;
  text-align: center;
  background: #ffffff(175, 81, 81);
  justify-content: space-between;
  li {
    img {
      width: 0.97rem;
      margin-bottom: 0.1rem;
    }
  }
}
.nav2 {
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem 0.23rem 0 0.23rem;
  justify-content: space-between;
  text-align: center;
  background: #fff;
  li {
    .nav2_img {
      width: 1.2rem;
      text-align: center;
    }
    img {
      width: 1.1rem;
    }
  }
}
.notice-wrap {
  width: 100%;
  background-color: #fff;
  margin-top: 0.3rem;
  padding: 0.1rem 0.15rem;
  overflow: hidden;
  .notice-1 {
    display: flex;
    font-size: 0.1rem;
    height: 0.5rem;
    border-radius: 0.1rem;
    line-height: 0.5rem;
    border: 0.01rem solid #ddd;
    i {
      width: 0.37rem;
      height: 0.37rem;
    }
    img {
      margin-top: 0.1rem;
      margin-left: 0.1rem;
      width: 0.84rem;
      height: 0.24rem;
    }
  }
}
.border {
  .border_top {
    position: relative;
    .early-wrap_img {
      width: 100%;
    }
    .early-wrap {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      .early-show-more {
        color: #788976;
        position: absolute;
        right: 0;
        bottom: 4rem;
        font-size: 0.2.8rem;
        padding-right: 0.2rem;
      }
      .early-goods-wrap {
        width: calc(100% - 0.68968rem);
        height: 3.2rem;
        background-color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        text-align: center;
        margin-left: 0.34484rem;
        margin-right: 0.34484rem;
        margin-bottom: 0.34484rem;
        border-radius: 0.1rem;
        .early-goods-head {
          height: 0.6rem;
          line-height: 0.6rem;
          color: #42e32f;
          font-size: 0.3rem;
        }
        .early-head-desc {
          height: 0.28rem;
          line-height: 0.28rem;
          color: #394b37;
          font-size: 0.2rem;
        }
      }
      .early-goods-list {
        display: flex;
        position: absolute;
        top: 3.3rem;
        left: 0.3rem;
        padding: 0.12rem;
        z-index: 3;
        img {
          width: 1.55rem;
          margin: 0.05rem;
          border-radius: 0.1rem;
        }
        div {
          width: 1.4rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: #222;
          font-size: 0.25rem;
          line-height: 0.46rem;
          margin: 0.05rem 0.1rem;
          border-radius: 0.1rem;
          background-color: #f4f4f4;
        }
      }
    }
  }
  .border_foot {
    position: relative;
    top: -0.1rem;
    height: 3.8rem;
    .early-wrap_img {
      width: 100%;
      height: 3.7rem;
    }
    .early-goods-wrap {
      width: calc(100% - 0.68968rem);
      height: 3.5rem;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      text-align: center;
      margin-left: 0.34484rem;
      margin-right: 0.34484rem;
      margin-bottom: 0.34484rem;
      border-radius: 0.1rem;
      .early-goods-head {
        height: 0.6rem;
        line-height: 0.6rem;
        color: #42e32f;
        font-size: 0.3rem;
      }
      .early-head-desc {
        height: 0.28rem;
        line-height: 0.28rem;
        color: #394b37;
        font-size: 0.2rem;
      }
    }
    .early-goods-list {
      display: flex;
      position: absolute;
      top: 0.8rem;
      left: 0.3rem;
      padding: 0.1rem;
      z-index: 3;
      li {
        border: 1px solid rgba(209, 209, 208, 0.5);
        margin: 0 0.1rem;
        text-align: center;
      }
      img {
        margin-left: 0.2rem;
        width: 1.6rem;
      }
      div {
        width: 2rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #222;
        font-size: 0.25rem;
        line-height: 0.46rem;
        border-radius: 0.1rem;
      }
    }
  }
}
.footer{
  padding: .2rem .1rem .2rem .2rem;
  background: rgba(187, 187, 187,.3);
  ul{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .footer_div{
    margin-right: .35rem;
    width: 3.2rem;
    .footer_div2{
      width:3.4rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: .32rem;
      color: red;
    }
    .footer_div2{
      padding-right: .25rem;
    }
    img{
      width: 3.4rem;
    }
    .i{
        background: red;
        border-radius: 50%;
        color: #fff;
        padding: .05rem;
        float: right;
      }
  }
}
</style>