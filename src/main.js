import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import mintUI from "mint-ui";
import Header from "@/common/header/index.vue";

import BScroll from "@/common/BScroll";

import Loadmore from "@/common/Loadmore";

import VueTouch from "vue-touch";
Vue.use(VueTouch,{name:'v-touch'})
Vue.component("Header",Header);
Vue.config.productionTip = false
Vue.use(mintUI);
Vue.component("BScroll",BScroll);
Vue.component("Loadmore",Loadmore);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
