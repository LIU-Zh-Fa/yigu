import axios from 'axios';
export default {
    state: {
        parentList: sessionStorage.WTparentList ? JSON.parse(sessionStorage.WTparentList) : [],
        tjList: sessionStorage.WTtjList ? JSON.parse(sessionStorage.WTtjList) : [],
        menuList: sessionStorage.WTmenuList ? JSON.parse(sessionStorage.WTmenuList) : [],
    },
    mutations: {
        gettjList(state,params){
            state.tjList = [];
            state.tjList = params;
            sessionStorage.WTtjList = JSON.stringify(state.tjList);
        },
        getmenuList(state,list){
            state.parentList = [];
            state.menuList = [];
            var parentId = ''
            list.forEach(item => {
                if(item.parentId != 0){
                    if(parentId !== item.parentId){
                        state.menuList.push({parentId:item.parentId,list:[]});
                        state.menuList[state.menuList.length -1 ].list.push(item);
                        parentId = item.parentId;
                    }else{
                        state.menuList[state.menuList.length -1 ].list.push(item);
                    }
                }else{
                    state.parentList.push(item);
                }
            });
            var obj = {checkicon: "",
                description: "",
                displayIndex: -1,
                id: -1,
                menu: 1,
                name: "推荐",
                parentId: 0,
                path: "/",
                uncheckicon: ""
            }
            state.parentList.unshift(obj);
            sessionStorage.WTparentList = JSON.stringify(state.parentList);
            sessionStorage.WTmenuList = JSON.stringify(state.menuList);
        }
    },
    actions: {
        getData({commit},params){
            if(!sessionStorage.WTtjList){
                axios.get("/wochu//client/v1/goods/GetCategoryRecommendList").then((res)=>{
                    commit("gettjList",res.data.data)
                });
            }
            if(!sessionStorage.WTparentList || !sessionStorage.WTmenuList){
                axios.get("/wochu/client/v1/goods/GetCategoryListByMenuId",{
                    params:{
                        parameters: {"menu":0}
                    }
                }).then((res)=>{
                    var list = res.data.data.sort((a,b) => {
                        return a.parentId - b.parentId;
                    });
                    commit("getmenuList",list)
                })
            }
        }
    },
    namespaced: true
  }
