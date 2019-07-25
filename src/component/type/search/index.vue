<template>
  <div class="search">
    <div class="inputBox">
      <div class="inputCon">
        <i class="iconfont icon-iconset0157"></i>
        <input type="text" :placeholder=hotList[0] @input="getinputVal($event)">
      </div>
      <div>
        <v-touch tag="button" @tap="changesearchFlag">取消</v-touch>
      </div>
     
    </div>
    <!-- dddddd -->
     <div class="hotWord">
        <ul>
          <v-touch tag="li" @tap="changePage(item)" v-for="(item,index) in resList" :key="index">
            <span>{{item}}</span>
            <i class="iconfont icon-jiantou2"></i>
          </v-touch>
        </ul>
      </div>
    <!--  -->
    <div class="conList">
      <div class="hotList clear">
        <h1>热门搜索</h1>
        <div class="hotListbox">
          <ul class="clear">
            <v-touch tag="li" @tap="changePage(item)" v-for="(item,index) in hotList" :key="index">{{item}}</v-touch>
          </ul>
        </div>
      </div>
      <!--  -->
      <div class="historyList hotList">
        <h1>历史搜索</h1>
        <div class="historyListBox">
          <ul>
            <v-touch tag="li" v-for="(item,index) in historyList" @tap=changePage(item) :key="index">{{item}}</v-touch>
          </ul>
        </div>
        <v-touch tag="button" @tap="claerHis" class="clearBtn">清空历史记录</v-touch>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import Vuex from "vuex";
export default {
  created() {
    this.getHotword();
  },
  computed: {
    ...Vuex.mapState({
      hotList: state => state.type.hotList,
      inputVal:state=>state.type.inputVal,
      resList:state=>state.type.resList,
      historyList:state=>state.type.historyList
    })
  },
  
  methods: {
    changesearchFlag() {
      this.$store.commit("type/changesearchFlag");
    },
    ...Vuex.mapActions({
      getHotword: "type/getHotlist",
    }),
    getinputVal(e){
      let val = e.target.value;
      this.$store.dispatch("type/getActioninputVal",val)
    },
    changePage(item){
      this.$store.dispatch("type/changeActionPage",item)
      this.$store.dispatch("type/getseaGoodsList",item)
      this.$router.push("/searchgoods")
    },
    claerHis(){
      this.$store.commit("type/claerHis");
    }
  }
};
</script>
<style lang="scss" scoped>
$color: #f0f2f5;
.inputBox {
  width: 100%;
  height: 0.96rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  .inputCon {
    width: 80%;
    height: 60%;
    background: $color;
    display: flex;
    align-items: center;
    border-radius: 15px;
    margin-left: 12px;
    input {
      height: 90%;
      width: 85%;
      border: 0;
      background: $color;
      outline: none;
    }
    i {
      margin: 10px;
    }
  }
  button {
    color: #666;
    border: 0;
    background: #fff;
    margin-right: 10px;
    outline: none;
  }
}
.hotWord{
  margin-top: 0.96rem;
  ul{
    width: 100%;
    li{
      height: .73rem;
      line-height:.73rem;
      margin-left:.3rem;
      border-bottom: 1px solid $color;
      color: #888;
      padding-right: .1rem;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      i{
        font-size: 12px;
      }
    }
  }
}
.conList {
  margin-bottom: 0.98rem;
  width: 100%;
  .hotList {
    margin-bottom: 10px;
    width: 100%;
    .hotListbox {
      min-height: 2rem;
    }
    h1 {
      color: #888;
      padding-left: 10px;
      height: 1.18rem;
      width: 100%;
      line-height: 1.18rem;
      background: #fff;
    }
    ul {
      width: 100%;
      li {
        float: left;
        color: #777;
        margin: 0.14rem 0 0 0.5rem;
        background: #f6f6f6;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: 13px;
        padding: 0 0.18rem;
        border-radius: 0.22rem;
      }
    }
    .historyListBox {
      min-height: 1.5rem;
    }
    .clearBtn {
      border: 1px solid #d9d9d9;
      margin-left: 30%;
      font-size: 15px;
      width: 2.84rem;
      height: 0.56rem;
      color: #777;
      background: #fff;
      border-radius: 0.26rem;
      outline: none;
    }
  }
}
.footer {
  width: 100%;
  height: 0.98rem;
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  z-index: 3000;
}
</style>

