<template>
  <div class="typeBox">
    <Search v-if="this.$store.state.type.searchFlag"/>
    <Typelist v-if="!this.$store.state.type.searchFlag"/>
  </div>
</template>
<script>
import Search from "@/component/type/search";
import Typelist from "@/component/type/typelist";
export default {
  components: {
    Search,
    Typelist
  }
};
</script>
<style lang="scss" scoped>
.typeBox{
  height: 100%;
}
</style>

