import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import mintUI from "mint-ui";
import axios from './axios';
import VueTouch from "vue-touch";
import LazyLoad from 'vue-lazyload'
Vue.prototype.$axios = axios;

Vue.use(LazyLoad, {
  error: require('@/component/home/img/notice_bg.jpg'),  //错误的时候显示图片
  loading: require('@/component/home/img/guess_you_like.jpg'),  // 正在加载中的图片
  attempt: 1  // 每次加载几张
})

import Header from "@/common/header/index.vue";
import BScroll from "@/common/BScroll";
import MyMask from "@/common/mask/index.vue"


Vue.component("MyMask",MyMask);
Vue.component("BScroll",BScroll);
Vue.component("Header",Header);


Vue.config.productionTip = false

Vue.use(mintUI);
Vue.use(VueTouch, {name: 'v-touch'});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
