
export default {
    state: {
        showFlag: false
    },
    mutations: {
        openMask(state){
            state.showFlag = true;
        },
        closeMask(state){
            state.showFlag = false;
        }
    },
    actions: {
        openMask({commit}){
            commit("openMask")
        },
        closeMask({commit}){
            commit("closeMask")
        }
    },
    namespaced: true
  }
  
    