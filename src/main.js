import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import mintUI from "mint-ui";
import axios from './axios';
import VueTouch from "vue-touch";
import LazyLoad from 'vue-lazyload'
Vue.prototype.$axios = axios;
import MyMask from "@/common/mask/index.vue"
Vue.use(LazyLoad, {
  error: require('@/component/home/img/notice_bg.jpg'),  //错误的时候显示图片
  loading: require('@/component/home/img/guess_you_like.jpg'),  // 正在加载中的图片
  attempt: 1  // 每次加载几张
})
Vue.component("MyMask",MyMask);
import Header from "@/common/header/index.vue";

import BScroll from "@/common/BScroll";

import Loadmore from "@/common/Loadmore";


Vue.component("Header",Header);

Vue.config.productionTip = false
Vue.use(mintUI);
Vue.use(VueTouch, {name: 'v-touch'});
Vue.component("BScroll",BScroll);
Vue.component("Loadmore",Loadmore);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
