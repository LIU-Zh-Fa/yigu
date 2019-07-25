<template>
    <div>
      <div class="seach">
        <div class="seach_div">
            <div class="iconfont">&#xe62f;</div>
            <input type="text" placeholder="桃子" @click="goseach">
        </div>
      </div>
      <div class="border">
          <img :src="img" alt="" class="img1">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <img v-lazy="item.goodImg" alt="">
              <p>{{item.goodName}}</p>
              <p style="font-size:.2rem;color: #939393;">{{item.slogan}}</p>
              <div class="self-support">
              </div>
              <div class="footer_div2">
                ￥{{item.goodPrice}}
                <i class="iconfont i"> &#xe600; </i> 
              </div>
            </li>
          </ul>
      </div>
    </div>
</template>
<script>
export default {
  watch: {
  '$route':'init'
  },
  data() {
    return {
      img:"",
      list:[],
      id:"",
      name:""
    }
  },
    methods: {
      goseach(){
        // this.$router.push("/home/nav/0200000000")
      },
      init(){
        this.list.length = 0;
        this.id = this.$route.params.id;
        this.name = this.$route.params.name;        
        this.$axios.get(`http://api.egu365.cn/news/adviseSeat?id=${this.name}`)
        .then((data) => {
          this.img = data.data.obj.bgImg2;
        });
        this.$axios.get(`http://api.egu365.cn/goods/list?tid=${this.id}&sorts=hits+asc&seat=${this.name}&pageNo=1`)
        .then((data) => {
          data.data.list.forEach(element => {
            this.list.push({
              goodName: element.goodsName,
              goodImg: element.icoImg,
              goodPrice: element.makePrice,
              goodsSpec: element.goodsStandard,
              goodid: element.id,
              slogan:element.slogan
            })
          });
          console.log(this.list);
          
        })

      }
    },
    created() {
      this.init();
    },
}
</script>
<style lang="scss" scoped>
  .seach{
    width: 100%;
    background: #fff;
    border-bottom:1px solid #999;
     .seach_div{
      display: flex;
      background: rgba(194, 194, 194,.2);
      width: 6.8rem;
      height: .6rem;
      border-radius: 12px;
      margin: .2rem 0 .2rem .1rem;
      .iconfont{
        margin: .13rem .1rem 0 .2rem;
      }
      input{
        padding-left: .1rem;
        width: 6rem;
        opacity: 1;
        color: #999;
        background-color: transparent;
        border: none;
        outline:none;
      }
    }
  }
  .border{
    position: relative;
    .img1{
      width: 100%;
      position: absolute;
      top: 0;
    }
    ul{
      position: absolute;
      top:1.4rem;
      padding: .15rem;
      padding-bottom: 1rem;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      background: rgba(179, 177, 177,.1);
      li{
        background: #fff;
        margin: .1rem;
        .footer_div2{
            padding-right: .25rem;
            font-size: .3rem;
            color: red;
            padding-left: .2rem;
            .i{
              background: red;
              border-radius: 50%;
              color: #fff;
              padding: .05rem;
              float: right;
            }
          }
        img{
          width: 3.26rem;
        }
        p{
          font-size: .28rem;
          padding: .05rem .2rem;
          width:3.4rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
</style>