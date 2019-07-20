import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import mintUI from "mint-ui";
import axios from 'axios';
import VueTouch from "vue-touch";

Vue.prototype.$axios = axios;
import Header from "@/common/header/index.vue"
import MyMask from "@/common/mask/index.vue"
Vue.component("MyMask",MyMask);
Vue.component("Header",Header);

Vue.config.productionTip = false
Vue.use(mintUI);
Vue.use(VueTouch, {name: 'v-touch'});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
