import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import mintUI from "mint-ui";
import axios from 'axios';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(mintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
