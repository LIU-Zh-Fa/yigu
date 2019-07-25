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
    getGoodsMore() {
      this.scroll.on("pullingUp", () => {
        //在一次上拉加载的动作后，这个时机一般用来去后端请求数据。  
        // this.$store.state.movie.pageNum++
        // if(this.$store.state.movie.pageNum > (this.$store.state.movie.allMovieId.length-12)/10){
        //   this.$store.state.movie.pageNum = 1;
        //   this.$store.state.movie.pageNum++
        // }
        // this.$store.dispatch("movie/getActionMoreMovie"); 
        // // this.$store.dispatch("movie/getMutationNowMovie"); 
        alert(1)
        console.log(this.$store)     
        this.$store.state.type.pageNo++ 
        this.$store.dispatch("type/getgoodsInfo"); 
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