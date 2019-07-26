import Vue from 'vue'
import Vuex from 'vuex'
import Home from './home'
import type from './type/index.js'
import Card from './card'
import Shopcar from './shopcar'
import Mine from './mine'
import City from './city'
import WcType from './wc/type'
import WcList from './wc/list'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Home,
    type,
    Card,
    Shopcar,
    Mine,
    City,
    WcType,
    WcList
  }
 
})
