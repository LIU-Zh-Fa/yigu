<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Tabbar v-if="this.$route.meta.tabbarFlag"/>
  </div>
</template>
<script>
import Tabbar from "@/common/tabbar";
export default {
  components:{
    Tabbar
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  /* overflow: auto; */
}

</style>
