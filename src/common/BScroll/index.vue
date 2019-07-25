<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>


<script>
import BScroll from "better-scroll";
export default {
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      tap: true,
      pullUpLoad: true,
      scrollX:true
    });
  console.log(this.scroll);
   
  },
  methods: {
    handleTo(obj) {
      let {t,w,uw,lw} = obj
      if(t<=(w/2)){
        this.scroll.scrollTo(0, 0, 500);
      }else if((uw-t-(lw/2))<(w/2)){
        console.log(uw-t)
        this.scroll.scrollTo(-(uw-w), 0, 500);
      }
      else{
        this.scroll.scrollTo(-(t-(w/2)+(lw/2)), 0, 500);
      }
      
    },

    getGoodsMore() {
      this.scroll.on("pullingUp", () => {
        if(this.$store.state.type.flag){
          this.$store.state.type.pageNo++
        this.$store.dispatch("type/getMoregoodsInfo");
        }else{
          // this.$store.state.type.pageNo =1
        }
         
      });
    },
     getseaGoodsMore() {
      this.scroll.on("pullingUp", () => {
        if(this.$store.state.type.flag){
          this.$store.state.type.pageNo++
        this.$store.dispatch("type/getseaMoreGoodsList");
        }else{
          // this.$store.state.type.pageNo =1
        }
         
      });
    },
    update(){
         //当数据加载完毕以后
        this.scroll.finishPullUp();//当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
    },
    getih(){
        this.scroll.refresh();//重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    }
  }
};
</script>
<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
</style>