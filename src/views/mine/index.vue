<template>
  <div class="mine">
    <ul>
      <li @click="homeActive(item.id)" v-for="(item,index) in list" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mine",
  data() {
    return {
      list: [
        { id: "0700000000", name: "测试1" },
        { id: "0400000000", name: "测试2" },
        { id: "0600000000", name: "测试3" },
        { id: "0900000000", name: "测试4" },
        { id: "0500000000", name: "测试5" }
      ]
    };
  },
  methods:{
      homeActive(id){
      this.$store.dispatch("type/homeActive",id)
      this.$router.push("/type")
    }
  },
  components: {}
};
</script>
<style scoped>
.mine ul li {
  background: yellow;
  height: 100px;
  width: 100px;
  margin: 10px
}
</style>
