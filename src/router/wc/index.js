import wctype from './wctype'
export default {
    path:"/wc/type",
    component:()=>import("@/views/wc"),
    children:[
        wctype,
    ],
    meta:{
        tabbarFlag:false
    },
    name:"wc",
  }
  