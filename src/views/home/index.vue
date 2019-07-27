<template>
  <div class="home">
    <div class="header">
      <div class="batescoll">
        <BScroll ref="nav2Scroll">
            <ul v-if="scoll" > 
              <router-link 
                 tag='li'
                 to='/home/home2'
                 active-class='sel'
                 >
                依谷热卖</router-link>
              <router-link 
                 tag='li'
                 :to='"/home/nav/"+item.tid+"/"+item.id'
                 active-class='sel'
                 @click="navBoxIndex(index)"
                 v-for="(item,index) in list" :key="index"
                >{{item.tname}}</router-link>
            </ul>
            <ul v-if="!scoll" class="header_ul">
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
        </BScroll> 
      </div>
        <div class="border">
        </div>      
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
      scoll:true
    }
  },
  methods: {
     navBoxIndex(index) {
       console.log(this.$refs);
       
      let t = this.$refs.navListBox.getElementsByTagName("li")[index.index + 1]
        .offsetLeft;
      let w = window.innerWidth;
      let uw = this.$refs.navListBox.getElementsByTagName("ul")[0].offsetWidth;
      let lw = this.$refs.navListBox.getElementsByTagName("li")[0].offsetWidth;
      let obj = { t, w, uw, lw };
      this.$refs.navScroll.handleTo(obj);
    },
     handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
     if(scrollTop > 0){
       this.scoll = false;
     }else{
        this.scoll = true;
     }
    },
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
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
    .batescoll{
      width: 100%;
      height: .72rem;
    }
    .header{
      .header_ul{
        top: 0rem;
      }
      ul{
        position: fixed;
        z-index: 20;
        height: .72rem;
        display: flex;
        overflow-x: auto;
        background: #fff;
        width: max-content;
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
