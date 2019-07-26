import axios from 'axios';
export default {
    state: {
        allgoodlist: [],
        asclist: [],
        descList: [],
        list: [],
        tit: ''
    },
    mutations: {
        getAllList(state,list){
            state.allgoodlist = list;
            state.list = state.allgoodlist;
        },
        getAscList(state,list){
            state.asclist = list;
            state.list = state.asclist;
        },
        getDescList(state,list){
            state.descList = list;
            state.list = state.descList;
        },
        getTit(state,{list,parentid}){
            sessionStorage.CategoryList = JSON.stringify(list)
            list.forEach((item)=>{
                if(item.id == parentid){
                    state.tit = item.name;
                }
            })
        },
        getList(state,order){
            if(order === 1){
                state.list = state.allgoodlist;
            }else if(order === 2){
                state.list = state.asclist;
            }else if(order === 3){
                state.list = state.descList;
            }
        }
    },
    actions: {
        getData({commit},params){
            if(params.order === 1){
                if(this.state.WcList.allgoodlist.length === 0){
                    axios.get("http://api9.wochu.cn/api/goods/getcategoryandgoods",{
                        params:{
                            orderId: params.order,
                            categoryId: params.parentid
                        }
                    }).then((res)=>{
                        commit("getAllList",res.data.data.categories);
                    });
                }else{
                    commit("getList",params.order)
                }
            }else if(params.order === 2){
                if(this.state.WcList.asclist.length === 0){
                    axios.get("http://api9.wochu.cn/api/goods/getcategoryandgoods",{
                        params:{
                            orderId: params.order,
                            categoryId: params.parentid
                        }
                    }).then((res)=>{
                        commit("getAscList",res.data.data.categories);
                    });
                }else{
                    commit("getList",params.order)
                }
            }else if(params.order === 3){
                if(this.state.WcList.descList.length === 0){
                    axios.get("http://api9.wochu.cn/api/goods/getcategoryandgoods",{
                        params:{
                            orderId: params.order,
                            categoryId: params.parentid
                        }
                    }).then((res)=>{
                        commit("getDescList",res.data.data.categories);
                    });
                }else{
                    commit("getList",params.order)
                }
            }
            
            if(!sessionStorage.CategoryList){
                axios.get("/wochu/client/v1/Goods/GetCategoryListFromPid",{
                    params:{
                        parameters: {"parentId":0}
                    }
                }).then((res)=>{
                    commit("getTit",{list:res.data.data,parentid:params.parentid})
                })
            }else{
                commit("getTit",{list:JSON.parse(sessionStorage.CategoryList),parentid:params.parentid})
            }
        }
    },
    namespaced: true
  }
