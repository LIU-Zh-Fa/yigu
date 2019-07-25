
export default {
    state: {
        carlist: sessionStorage.carlist ? JSON.parse(sessionStorage.carlist) : [],
        goodNum: sessionStorage.goodNum ? Number(sessionStorage.goodNum) : 0, 
        allCheck : sessionStorage.allCheck ? sessionStorage.allCheck : true
    },
    mutations: {
        addCar(state,param){
            if(state.carlist.length > 0){
                var bStop = true;
                for(var i = 0; i < state.carlist.length; i++){
                    if(state.carlist[i].goodid === param.goodid){
                        state.carlist[i].num += param.num;
                        state.goodNum += param.num;
                        bStop = false;
                        break;
                    }
                }
                if(bStop){
                    state.goodNum += param.num;
                    state.carlist.push({...param,flag:true});
                }
            }else{
                state.carlist.push({...param,flag:true});
                state.goodNum = param.num;
            }
            sessionStorage.carlist = JSON.stringify(state.carlist)
            sessionStorage.goodNum = state.goodNum;
        },
        changeFlag(state,goodid){
            var bStop = true;
            for(var i = 0;i<state.carlist.length;i++){
                if(state.carlist[i].goodid === goodid){
                    state.carlist[i].flag = !state.carlist[i].flag;
                    if(!state.carlist[i].flag) bStop = false;
                    break;
                }
            }
            state.allCheck = bStop;
            sessionStorage.carlist = JSON.stringify(state.carlist)
            sessionStorage.goodNum = state.goodNum;
            sessionStorage.allCheck = state.allCheck;
        },
        goodDel(state,goodid){
            for(var i = 0;i<state.carlist.length;i++){
                if(state.carlist[i].goodid === goodid){
                    state.goodNum -= state.carlist[i].num;
                    state.carlist.splice(i,1);
                    break;
                }
            }
            sessionStorage.carlist = JSON.stringify(state.carlist)
            sessionStorage.goodNum = state.goodNum;
        },
        goodInc(state,goodid){
            for(var i = 0;i<state.carlist.length;i++){
                if(state.carlist[i].goodid === goodid){
                    state.goodNum++;
                    state.carlist[i].num++;
                    break;
                }
            }
            sessionStorage.carlist = JSON.stringify(state.carlist)
            sessionStorage.goodNum = state.goodNum;
        },
        goodReduce(state,goodid){
            for(var i = 0;i<state.carlist.length;i++){
                if(state.carlist[i].goodid === goodid){
                    if(state.carlist[i].num <= 1){
                        return;
                    }
                    state.goodNum--;
                    state.carlist[i].num--;
                    break;
                }
            }
            sessionStorage.carlist = JSON.stringify(state.carlist)
            sessionStorage.goodNum = state.goodNum;
        },
        goodNumChange(state){
            sessionStorage.carlist = JSON.stringify(state.carlist)
            sessionStorage.goodNum = state.goodNum;
        },
        changeAll(state){
            state.allCheck = !state.allCheck;
            for(var i = 0;i<state.carlist.length;i++){
                state.carlist[i].flag = state.allCheck;
            }
            sessionStorage.allCheck = state.allCheck;
        }
    },
    actions: {
        addCar({commit},params){
            commit("addCar",params)
        },
        changeFlag({commit},params){
            commit("changeFlag",params)
        },
        goodDel({commit},params){
            commit("goodDel",params)
        },
        goodInc({commit},params){
            commit("goodInc",params)
        },
        goodReduce({commit},params){
            commit("goodReduce",params)
        },
        goodNumChange({commit}){
            commit("goodNumChange")
        },
        changeAll({commit}){
            commit("changeAll")
        }
    },
    getters:{
        allPrice(state){
            let price = 0;
            for(var i = 0;i<state.carlist.length;i++){
                if(state.carlist[i].flag){
                    price += (state.carlist[i].num * state.carlist[i].goodPrice)
                }
            }
            return price
        }
    },
    namespaced: true
  }
  
    