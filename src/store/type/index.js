import axios from "axios";
export default {
  state: {
    // typeList初始值
    conNav: [],
    goodsList: JSON.parse(window.sessionStorage.getItem("goodsList")) || [],
    navIndex: 0,
    navBoxIndex: -1,
    allId: '',
    tId: '',
    HXactiveId:JSON.parse(window.sessionStorage.getItem("HXactiveId")) || '0200000000',
    pageNo: 1,
    flag: true,

    // ********************8搜索页面初始值*******************************
    searchFlag: false,
    inputVal: "",
    hotList: [],
    historyList: JSON.parse(window.sessionStorage.getItem("historyList")) || [],
    resList: [],

    // *********************************搜索成功*************************************************
    searchgoodsList:JSON.parse(window.sessionStorage.getItem("searchgoodsList")) || [],
    priceList:[],
    activeid:"1"


  },
  mutations: {
    // typeList页面
    //主页面传参高亮
    homeActive(state,obj){
      state.tId =obj.id;
      state.HXactiveId = obj.id;
      state.navIndex = obj.index;
      window.sessionStorage.setItem("HXactiveId", JSON.stringify(obj.id))
    },

    //竖向
    getNavIndex(state, index) {
      state.navIndex = index.idx;


      state.tId = index.id
      state.HXactiveId = index.id
      window.sessionStorage.setItem("HXactiveId", JSON.stringify(index.id))


      state.allId = index.id
      state.navBoxIndex = -1
      state.pageNo = 1
    },
    getNavlist(state, data) {
      state.conNav = data.data
    },
    getgoodsInfo(state, data) {
      state.goodsList = data
    },
    getMoregoodsInfo(state, data) {
      state.goodsList = [...state.goodsList, ...data]
      if (data.length == 0) {
        state.flag = false
      }
    },
    // 横向
    navBoxIndex(state, index) {
      state.navBoxIndex = index.index;
      state.tId = index.id
      state.pageNo = 1
    },
    changeIndex(state) {
      state.navBoxIndex = -1
      state.tId = state.allId
      state.pageNo = 1
    },
    // ****************************************************************8
    // 搜索页面
    getHotlist(state, data) {
      state.hotList = data.list
    },
    getinputVal(state, data) {
      let obj = data.key.obj;
      let arr = []
      for (var key in obj) {
        arr.push(key)
      }
      state.resList = arr
      state.inputVal = data.val
    },

    // 取消按钮
    changesearchFlag(state) {
      state.inputVal = ""
      if(state.inputVal == ""){
        state.resList = []
      }
      state.searchFlag = !state.searchFlag;
    },



    changeActionPage(state,item){
      state.inputVal = item;
      state.pageNo = 1;
      if(state.inputVal == ""){
        state.resList = []
      }
      state.searchFlag = !state.searchFlag;
      state.historyList.push(state.inputVal);
      window.sessionStorage.setItem("historyList", JSON.stringify(state.historyList))
    },




    claerHis(state){
      state.historyList = []
      window.sessionStorage.removeItem("historyList")
    },
  // *********************************搜索成功*************************************************
  getseaGoodsList(state,data){
    state.searchgoodsList = data.list;
    window.sessionStorage.setItem("searchgoodsList", JSON.stringify(data.list))
    
  },
  getseaMoreGoodsList(state,data){
    state.searchgoodsList =[...state.searchgoodsList,...data.list];
    // window.sessionStorage.setItem("searchgoodsList", JSON.stringify([...state.searchgoodsList,...data.list]))
    // console.log(data.list)
    if (data.list.length == 0) {
      state.flag = false
    }
  },
// 排序
sortHandler(state,val){
  
  if(val == 1){
    state.activeid = val
    state.searchgoodsList.sort(function(a,b){
      return a.goodsType - b.goodsType
    })
  }else if(val == 2){
    state.activeid = val
    state.searchgoodsList.sort(function(a,b){
      return a.goodsClass - b.goodsClass
    })
  }else if(val == 3){
    state.activeid = val
    state.searchgoodsList.sort(function(a,b){
      return b.mallPrice - a.mallPrice
    })
  }else if(val == 4){
    state.activeid = val
    state.searchgoodsList.sort(function(a,b){
      return a.mallPrice - b.mallPrice
    })
  }
}

  },
  actions: {
    // *********************type页面***************************
    getNavlist({ commit }, index) {
      axios.get("/api/goods/classify").then((data) => {
        commit("getNavlist", { index: index, data: data.data.list })
      })
    },
    getgoodsInfo({ commit }) {
      axios.get("/api/goods/list?sorts=hits+asc&tid=" + this.state.type.tId + "&pageNo=" + this.state.type.pageNo).then((data) => {

        window.sessionStorage.setItem("goodsList", JSON.stringify(data.data.list))
        commit("getgoodsInfo", data.data.list)
      })
    },
    getMoregoodsInfo({ commit }) {
      axios.get("/api/goods/list?sorts=hits+asc&tid=" + this.state.type.tId + "&pageNo=" + this.state.type.pageNo).then((data) => {
        commit("getMoregoodsInfo", data.data.list)
      })
    },

    // 竖向
    getNavIndex({ commit }, index) {
      commit("getNavIndex", index)
    },
    navBoxIndex({ commit }, index) {
      commit("navBoxIndex", index)
    },
    // **********************搜索页面*****************************************
    getHotlist({ commit }) {
      // http://api.egu365.cn/goods/hotWords?seat=109
      axios.get("/api/goods/hotWords?seat=109").then((data) => {
        commit("getHotlist", data.data)
      })
    },
    getActioninputVal({ commit }, val) {
      // console.log(val)
      console.log(this.state.type.inputVal)
      if (val) {
        axios.get("api/goods/words?key=" + val).then((word) => {
          // console.log(word.data.obj)
          commit("getinputVal", { key: word.data, val: val })
        })
      }

    },
    changeActionPage({commit},item){
      commit("changeActionPage",item)
    },

    // *********************************搜索成功***************************************************
    getseaGoodsList({commit},item){
      axios.get("api/goods/list?sorts=hits+asc&key="+item+"&pageNo="+this.state.type.pageNo).then((data)=>{
        window.sessionStorage.setItem("searchgoodsList", JSON.stringify(data.data.list))
        // console.log(data.data.list)
        commit("getseaGoodsList",data.data)
      })
    },
    getseaMoreGoodsList({commit}){
      axios.get("api/goods/list?sorts=hits+asc&key="+this.state.type.inputVal+"&pageNo="+this.state.type.pageNo).then((data)=>{
        // window.sessionStorage.setItem("searchgoodsList", JSON.stringify(data.data.list))
        commit("getseaMoreGoodsList",data.data)
      })
    },

    sortHandler({commit},val){
      commit("sortHandler",val)
    },


    // 主页面传参
    homeActive({commit},obj){
      commit("homeActive",obj)
    }
  },
  namespaced: true
}

