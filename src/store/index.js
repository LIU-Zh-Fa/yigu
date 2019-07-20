import Vue from 'vue'
import Vuex from 'vuex'
import Home from './home'
import Type from './type'
import Card from './card'
import Shopcar from './shopcar'
import Mine from './mine'
import City from './city'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Home,
    Type,
    Card,
    Shopcar,
    Mine,
    City
  }
 
})
