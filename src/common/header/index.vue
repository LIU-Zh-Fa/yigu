<template>
  <div class="header">
      <i @click="back" class="iconfont icon-jiantou3"></i>
      <h2>{{title}}</h2>
      <u class="iconfont icon-gengduo2"></u>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "购物车"
    }
  },
  methods: {
      back(){
          this.$router.back()
      }
  },
};
</script>

<style lang="scss" scoped>
$color:rgb(255, 255, 255);

.header{
    width: 100%;
    height: .77rem;
    background: $color;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top:0;
    z-index:100;
    border-bottom: 1px solid #ccc;
    h2{
        font-size: .28rem;
        color:#444;
    }
    i{
        position: absolute;
        left: .3rem;
        font-size: .44rem;
    }
    u{
        position: absolute;
        right:  .3rem;
        font-size: .46rem;  
    }
}

</style>