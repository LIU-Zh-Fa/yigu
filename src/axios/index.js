import Axios from "axios";
import Vuex from 'vuex'

Axios.interceptors.response.use(function (response) {
    // this.$store.commit('showLoading');
    // if(response.data){
    //   this.$store.commit('hideLoading');
    // }

    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });


  export default Axios