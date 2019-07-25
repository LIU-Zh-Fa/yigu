import axios from 'axios';
export default {
    state: {
        areaList: window.sessionStorage.areaList ? JSON.parse(window.sessionStorage.areaList) : {},
        provinceList: window.sessionStorage.provinceList ? JSON.parse(window.sessionStorage.provinceList) : [],
        cityList: window.sessionStorage.cityList ? JSON.parse(window.sessionStorage.cityList) : {}, 
        countyList: window.sessionStorage.countyList ? JSON.parse(window.sessionStorage.countyList) : {},
        provkey: '',
        citykey: '',
        countykey: '',
    },
    mutations: {
        getArea(state,param){
            for(var key in param.province_list){
                state.provinceList.push({[key]:param.province_list[key]})
            }
            var provinceKey = ''
            for(var key in param.city_list){
                var province = key.substr(0,2)+'0000000';
                if(province !== provinceKey){
                    state.cityList[province] = [];
                    provinceKey = province
                }
                state.cityList[province].push({[key]:param.city_list[key]});
            }
            var cityKey = ''
            for(var key in param.county_list){
                var city = key.substr(0,4)+'00000';
                if(city !== cityKey){
                    state.countyList[city] = [];
                    cityKey = city
                }
                state.countyList[city].push({[key]:param.county_list[key]})
            }
            state.provkey = '010000000';
            state.citykey = '010100000';
            state.countykey = '010101000';
            window.sessionStorage.provinceList = JSON.stringify(state.provinceList);
            window.sessionStorage.cityList = JSON.stringify(state.cityList);
            window.sessionStorage.countyList = JSON.stringify(state.countyList);
            window.sessionStorage.areaList = JSON.stringify(param);
        },
        initCitykey(state){
            state.provkey = window.sessionStorage.provkey ? JSON.parse(window.sessionStorage.provkey).key : '010000000';
            state.citykey = window.sessionStorage.citykey ? JSON.parse(window.sessionStorage.citykey).key : '010100000';
            state.countykey = window.sessionStorage.countykey ? JSON.parse(window.sessionStorage.countykey).key : '010101000';
        },
        changekey(state,param){
            if(param.type === "prov"){
                if(state.provkey !== param.key){
                    state.provkey = param.key;
                    state.citykey = Object.keys(state.cityList[state.provkey][0])[0];
                    state.countykey = Object.keys(state.countyList[state.citykey][0])[0];
                }
            }else if(param.type === "city"){
                if(state.citykey !== param.key){
                    state.citykey = param.key;
                    state.countykey =  Object.keys(state.countyList[state.citykey][0])[0];
                }
            }else if(param.type === "county"){
                if(state.countykey !== param.ke){
                    state.countykey = param.key;
                }
            }
        },
        saveCity(state){
            window.sessionStorage.provkey = JSON.stringify({key:state.provkey,name:state.areaList.province_list[state.provkey]});
            window.sessionStorage.citykey = JSON.stringify({key:state.citykey,name:state.areaList.city_list[state.citykey]});
            window.sessionStorage.countykey = JSON.stringify({key:state.countykey,name:state.areaList.county_list[state.countykey]});
        }
    },
    actions: {
        getArea({commit}){
            if(!window.sessionStorage.provinceList){
                axios.get("/mapi/json/area.json").then((res)=>{
                    commit("getArea",res.data);
                })
            }else{
                commit("initCitykey")
            }
        },
        changekey({commit},params){
            commit("changekey",params);
        },
        saveCity({commit}){
            commit("saveCity")
        },
        initCitykey({commit}){
            commit("initCitykey")
        }
    },
    getters: {
        getcityList(state){
            return state.cityList[state.provkey];
        },
        getcountyList(state){
            return state.countyList[state.citykey];
        }
    },
    namespaced: true
  }
  
    