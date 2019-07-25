import Vue from 'vue'
import Router from 'vue-router'

//主路由
import home from "@/router/home"
import type from "@/router/type"
import card from "@/router/card"
import shopcar from "@/router/shopcar"
import mine from "@/router/mine"
import detail from "@/router/detail"
import wc from "@/router/wc"


//二级路由
import searchgoods from "@/router/type/searchgoods"

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path:"/",
      redirect:"/home/home2"
    },
    home,
    type,
    card,
    shopcar,
    mine,
    detail,
    wc,
    

    searchgoods,
    {
      path:"**",
      redirect:"/home"
    }
  ],
})

