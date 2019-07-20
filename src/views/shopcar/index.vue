<template>
  <div class="shopcar">
      <Header title="购物车"/>
      <v-touch tag="div" @tap="openCity">打开城市</v-touch>
      <City ref="city"/>
  </div>
</template>

<script>
import City from '@/component/detail/city'

export default {
  name: 'shopcar',
  components: {
      City
  },
  methods:{
      openCity(){
          this.$refs.city.openCity();
      }
  }
}
</script>
<style lang="scss" scoped>
    .shopcar{
        padding-top: .77rem;
    }
</style>

