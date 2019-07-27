<template>
    <div id="footer">
      <ul>
        <router-link tag="li" v-for="(item,index) in tabbar" :key="index" :to="item.path">
          <i class="iconfont" v-html="item.icon"></i>
          <span>{{item.title}}</span>
        </router-link>
      </ul>
    </div>
</template>
<script>
export default {
  name: "tabBar",
  data() {
    return {
      tabbar: [
        {
          title: "首页",
          path: "/home/home2",
          icon: "&#xe626;"
        },
        {
          title: "分类",
          path: "/type",
          icon: "&#xe616;"
        },
        {
          title: "卡兑换",
          path: "/card",
          icon: "&#xe6c4;"
        },
        {
          title: "购物车",
          path: "/shopcar",
          icon: "&#xe6f2;"
        },
        {
          title: "用户",
          path: "/mine",
          icon: "&#xe633;"
        }
      ]
    };
  }
};
</script>

<style  lang="scss" scoped>
#footer {
  width: 100%;
  height: 0.98rem;
  /* height: 1rem; */
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  z-index: 2000;
  border-top: 1px solid #ccc;
}
#footer ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#footer li {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #797d82;
  font-size: 0.2rem;
}
#footer > ul > li > span {
  display: block;
  text-align: center;
  padding-top: 0.06rem;
  color: #666;
  font-size: 0.24rem;
  font-weight: 600;
}
#footer > ul > li.router-link-active {
  color: #ff4c48;
}
#footer > ul > li.router-link-active span {
  color: #ff4c48;
}
#footer > ul > li > i {
  font-size: 0.44rem;
  text-align: center;
}
</style>