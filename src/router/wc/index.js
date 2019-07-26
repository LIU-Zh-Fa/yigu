import wctype from './wctype'
import wclist from './wclist'
import wcdetail from './wcdetail'
export default {
    path:"/wc",
    component:()=>import("@/views/wc"),
    children:[
        wctype,
        wclist,
        wcdetail
    ],
    meta:{
        tabbarFlag:false
    },
    name:"wc",
  }
  