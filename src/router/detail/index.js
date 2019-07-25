export default {
    path:"/detail/:goodid",
    component:()=>import("@/views/detail"),
    meta:{
        tabbarFlag:false
    },
    name:"detail",
  }
  