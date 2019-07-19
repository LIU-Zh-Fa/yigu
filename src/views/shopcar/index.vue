<template>
  <div class="shopcar">
      <Header title="购物车"/>
  </div>
</template>

<script>


export default {
  name: 'shopcar',
  created(){
      this.$axios.get("/api/news/adviseImg?seat=93").then((res)=>{
          console.log(res)
      })
  },
  components: {
   
  }
}
</script>


