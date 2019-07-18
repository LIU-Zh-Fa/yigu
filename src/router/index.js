import Vue from 'vue'
import Router from 'vue-router'

//主路由
import home from "@/router/home"
import type from "@/router/type"
import card from "@/router/card"
import shopcar from "@/router/shopcar"
import mine from "@/router/mine"



Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path:"/",
      redirect:"/home"
    },
    home,
    type,
    card,
    shopcar,
    mine,
    
    {
      path:"**",
      redirect:"/home"
    }
  ],
})

