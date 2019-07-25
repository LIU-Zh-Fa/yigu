<template>
  <div class="searchgoods">
    <Searchtop v-if="!this.$store.state.type.searchFlag"></Searchtop>
    <Search v-if="this.$store.state.type.searchFlag"></Search>
    <!-- nav -->
    <div class="navBox" v-if="!this.$store.state.type.searchFlag">
      <ul>
        <v-touch tag="li" @tap="getInnhtml($event)" sort="1">默认</v-touch>
        <v-touch tag="li" @tap="getInnhtml($event)" sort="2">销量</v-touch>
        <v-touch tag="li" @tap="getInnhtml($event)" sort="3">
          价格
          <i class="iconfont icon-sanjiaotop"></i>
        </v-touch>
        <v-touch tag="li" @tap="getInnhtml($event)" sort="4">
          价格
          <i class="iconfont icon-sanjiaoxia"></i>
        </v-touch>
        <v-touch tag="li"  @tap="flagType" sort="5">
          <i :class="flag?'iconfont icon-fenlei' :'iconfont icon-fenlei5'"></i>
        </v-touch>
      </ul>
    </div>
    <!-- goods -->
    <div class="scrollbox">
      <Onetype v-if="!this.$store.state.type.searchFlag" v-show="!flag"></Onetype>
      <Twotype v-if="!this.$store.state.type.searchFlag" v-show="flag"></Twotype>
    </div>
   
  </div>
</template>
<script>
import Searchtop from "@/component/type/searchtop";
import Search from "@/component/type/search";
import Twotype from "@/component/type/searchgoods/twotype.vue";
import Onetype from "@/component/type/searchgoods/onetype.vue";

export default {
  data() {
    return {
      flag : true,
    }
  },
  components: {
    Searchtop,
    Search,
    Twotype,
    Onetype
  },
  methods:{
    getInnhtml(e){
      let inhtm = e.target.getAttribute("sort")
      this.$store.dispatch("type/sortHandler",inhtm)
    },
    flagType(){
      this.flag = !this.flag;
    }
  }
};
</script>
<style lang="scss" scoped>
$color: #f0f2f5;

// nav
.navBox {
  //   margin-top: 0.98rem;
  width: 100%;
  position: fixed;
  top: 0.77rem;
  left: 0;
  display: flex;
  z-index: 100;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.65rem;
    background: #fff;
    li {
      font-size: 13px;
      color: #777;
      .icon-fenlei5{
        font-size: 16px!important;
      }
    }
  }
}
.scrollbox{
  height: 100%;
}
.searchgoods{
  height: 100%;
}
</style>
