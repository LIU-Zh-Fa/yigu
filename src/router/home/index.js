
export default {
    path:"/home",
    component:()=>import("@/views/home"),
    meta:{
        tabbarFlag:true
    },
    name:"home",
    children:[
        {
            path:"nav/:id/:name",
            component:()=>import("@/views/home/nav"),
            meta:{
                tabbarFlag:true
            },
            name:"nav",
        },
        {
            path:"home2",
            component:()=>import("@/views/home/home2"),
            meta:{
                tabbarFlag:true
            },
            name:"home2",
        }
    ]
  }
  