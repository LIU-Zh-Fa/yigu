<template>
  <div class="header">
    <i @click="back" class="iconfont icon-jiantou3 back"></i>
    <div class="searchbox">
      <span class="iconfont icon-iconset0157 searchfont"></span>
      <input type="text" :placeholder="hotList[0]" @focus="changesearchFlag">
    </div>
    <u class="iconfont icon-gengduo2" @click="openMask"></u>
    <MyMask ref="mymask"/>
  </div>
</template>

<script>
import Vuex from "vuex";
export default {
  methods: {
    back() {
      this.$router.back();
    },
    changesearchFlag() {
      this.$store.commit("type/changesearchFlag");
    },
    openMask() {
      this.$refs.mymask.openMask();
    }
  },
  computed: {
    ...Vuex.mapState({
      hotList: state => state.type.hotList
    })
  }
};
</script>
<style lang="scss" scoped>
$color: rgb(255, 255, 255);
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
</style>