<template>
  <div class="home">
    <div class="header">
      <ul>
        <router-link 
           tag='li'
           to='/home/home2'
           active-class='sel'>
          依谷热卖</router-link>
        <router-link 
           tag='li'
           :to='"/home/nav/"+item.tid+"/"+item.id'
           active-class='sel'
           v-for="(item,index) in list" :key="index"
          >{{item.tname}}</router-link>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>


export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      list:[],
    }
  },
  methods: {

    init(){
       let idlist = [];
      this.$axios.get("http://api.egu365.cn/news/adviseSeats?type=10")
      .then((data) => {
        data.data.list.forEach(element =>{
          idlist.push({
            bgImg1:element.bgImg1,
            bgImg2:element.bgImg2,
            id:element.id
          })
        })
        this.$axios.get("http://api.egu365.cn/goods/classify")
          .then((data) => {
              let index = 0;
              data.data.list.forEach(element => {
                this.list.push({
                  tid:element.tid,
                  tname:element.tname,
                  timage:element.timage,
                  bgImg1:idlist[index].bgImg1,
                  bgImg2:idlist[index].bgImg2,
                  id:idlist[index].id,
                })
                 index++
              });
          })
      })
    }
  },
  created() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
   
    .header{
      ul{
        width: 100%;
        display: flex;
        overflow-x: auto;
        border-bottom: 1px solid rgb(211, 211, 211);
        li{
          line-height: .72rem;
          text-align: center;
          flex-shrink: 0;
          width: 1.7rem;
          height: .72rem;
          padding:0 .1rem; 
          
        }
      }
    }
    .sel{
      border-bottom: 2px solid red;
    }
</style>
